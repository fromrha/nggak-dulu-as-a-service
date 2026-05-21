import { NextResponse } from "next/server";
import { getRandomReason, isCategory, isTone } from "@/lib/getRandomReason";

// In-memory store for rate limiting (fallback for local development).
// NOTE: In serverless environments (like Vercel), global variables are not shared
// across different container instances, and are reset when instances spin down.
// This is only reliable for local development. For production, configure Vercel KV or Upstash Redis.
interface RateLimitData {
  count: number;
  resetTime: number;
}
const rateLimitStore = new Map<string, RateLimitData>();

const LIMIT = 30;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

function checkInMemoryRateLimit(ip: string): { success: boolean } {
  const now = Date.now();
  const data = rateLimitStore.get(ip);

  // Periodic pruning of the map if it grows too large to prevent leaks
  if (rateLimitStore.size > 5000) {
    for (const [key, val] of rateLimitStore.entries()) {
      if (now > val.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }

  if (!data || now > data.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + WINDOW_MS });
    return { success: true };
  }

  if (data.count >= LIMIT) {
    return { success: false };
  }

  data.count += 1;
  rateLimitStore.set(ip, data);
  return { success: true };
}

async function checkKvRateLimit(ip: string, kvUrl: string, kvToken: string): Promise<{ success: boolean }> {
  try {
    const key = `ratelimit:${ip}`;
    // Pipeline INCR and TTL to keep it to one round-trip
    const response = await fetch(`${kvUrl.replace(/\/$/, "")}/pipeline`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${kvToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        ["INCR", key],
        ["TTL", key]
      ]),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`KV pipeline failed: ${response.statusText}`);
    }

    const results = await response.json();
    const count = results[0]?.result;
    const ttl = results[1]?.result;

    // If it's a new key (TTL is -1 or count is 1), set EXPIRE to 600 seconds
    if (count === 1 || ttl === -1) {
      await fetch(`${kvUrl.replace(/\/$/, "")}/expire/${key}/600`, {
        method: "POST",
        headers: { Authorization: `Bearer ${kvToken}` },
        cache: "no-store",
      });
    }

    return { success: count <= LIMIT };
  } catch (error) {
    console.error("KV rate limit error, falling back to in-memory:", error);
    return checkInMemoryRateLimit(ip);
  }
}

async function incrementGlobalRejections(kvUrl: string, kvToken: string) {
  try {
    await fetch(`${kvUrl.replace(/\/$/, "")}/incr/global_rejections`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${kvToken}`,
      },
      cache: "no-store",
    });
  } catch (error) {
    console.error("Failed to increment global rejections:", error);
  }
}

export async function GET(request: Request) {
  // 1. IP Detection
  const xForwardedFor = request.headers.get("x-forwarded-for");
  const ip = xForwardedFor
    ? xForwardedFor.split(",")[0].trim()
    : request.headers.get("x-real-ip") ||
      request.headers.get("cf-connecting-ip") ||
      "127.0.0.1";

  // 2. Rate Limiting Check
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  let rateLimitResult = { success: true };
  if (kvUrl && kvToken) {
    rateLimitResult = await checkKvRateLimit(ip, kvUrl, kvToken);
  } else {
    rateLimitResult = checkInMemoryRateLimit(ip);
  }

  if (!rateLimitResult.success) {
    return NextResponse.json(
      {
        error: "Rate limit exceeded. Nggak dulu ya, coba lagi sebentar lagi.",
        limit: LIMIT,
        window: "10 minutes",
      },
      { status: 429 }
    );
  }

  // 3. Request Parameters & Generation
  const { searchParams } = new URL(request.url);
  const categoryParam = searchParams.get("category");
  const toneParam = searchParams.get("tone");

  if (categoryParam && !isCategory(categoryParam)) {
    return NextResponse.json(
      { error: "No matching reason found." },
      { status: 404 }
    );
  }

  if (toneParam && !isTone(toneParam)) {
    return NextResponse.json(
      { error: "No matching reason found." },
      { status: 404 }
    );
  }

  const category = isCategory(categoryParam) ? categoryParam : undefined;
  const tone = isTone(toneParam) ? toneParam : undefined;

  const reason = getRandomReason({
    category,
    tone,
  });

  if (!reason) {
    return NextResponse.json(
      { error: "No matching reason found." },
      { status: 404 }
    );
  }

  // 4. Increment global counter in KV if available
  if (kvUrl && kvToken) {
    // Fire and forget so we don't block response latency
    incrementGlobalRejections(kvUrl, kvToken);
  }

  return NextResponse.json({
    text: reason.text,
    category: reason.category,
    tone: reason.tone,
  });
}

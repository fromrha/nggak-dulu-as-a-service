import { NextResponse } from "next/server";

export async function GET() {
  const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!kvUrl || !kvToken) {
    // If persistent storage is not configured, fail gracefully.
    return NextResponse.json({ globalRejections: null });
  }

  try {
    const url = `${kvUrl.replace(/\/$/, "")}/get/global_rejections`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${kvToken}`,
      },
      next: { revalidate: 10 }, // Cache for 10 seconds
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from KV: ${response.statusText}`);
    }

    const data = await response.json();
    const globalRejections = data.result ? parseInt(data.result, 10) : 0;

    return NextResponse.json({ globalRejections });
  } catch (error) {
    console.error("Error reading global rejections count:", error);
    return NextResponse.json({ globalRejections: null });
  }
}

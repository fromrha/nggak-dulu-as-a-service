import { NextResponse } from "next/server";
import { getRandomReason, isCategory, isTone } from "@/lib/getRandomReason";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryParam = searchParams.get("category");
  const toneParam = searchParams.get("tone");

  if (categoryParam && !isCategory(categoryParam)) {
    return NextResponse.json(
      { error: "No matching reason found." },
      { status: 404 },
    );
  }

  if (toneParam && !isTone(toneParam)) {
    return NextResponse.json(
      { error: "No matching reason found." },
      { status: 404 },
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
      { status: 404 },
    );
  }

  return NextResponse.json({
    id: reason.id,
    text: reason.text,
    category: reason.category,
    tone: reason.tone,
  });
}

import reasons from "@/data/reasons.json";
import type { Category, Reason, Tone } from "./types";
import { CATEGORIES, TONES } from "./types";

const typedReasons = reasons as Reason[];

export function isCategory(value: string | null): value is Category {
  return value !== null && CATEGORIES.includes(value as Category);
}

export function isTone(value: string | null): value is Tone {
  return value !== null && TONES.includes(value as Tone);
}

type RandomReasonInput = {
  category?: Category;
  tone?: Tone;
};

export function getRandomReason({ category, tone }: RandomReasonInput = {}) {
  const filtered = typedReasons.filter((reason) => {
    const categoryMatches = category ? reason.category === category : true;
    const toneMatches = tone ? reason.tone === tone : true;

    return categoryMatches && toneMatches;
  });

  if (filtered.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * filtered.length);
  return filtered[randomIndex];
}

export function getAllReasons() {
  return typedReasons;
}

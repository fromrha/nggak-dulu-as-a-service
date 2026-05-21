import reasonsJson from "@/data/reasons.json";
import type { Category, Tone } from "./types";
import { CATEGORIES, TONES } from "./types";

const reasons = reasonsJson as Record<Category, Record<Tone, string[]>>;

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

type SelectedReason = {
  text: string;
  category: Category;
  tone: Tone;
};

export function getRandomReason({ 
  category, 
  tone, 
  excludeTexts = [] 
}: RandomReasonInput & { excludeTexts?: string[] } = {}): SelectedReason | null {
  const pool: SelectedReason[] = [];

  const catsToSearch = category ? [category] : CATEGORIES;
  const tonesToSearch = tone ? [tone] : TONES;

  for (const cat of catsToSearch) {
    for (const t of tonesToSearch) {
      const list = reasons[cat]?.[t] || [];
      for (const text of list) {
        if (!excludeTexts.includes(text)) {
          pool.push({ text, category: cat, tone: t });
        }
      }
    }
  }

  if (pool.length === 0) {
    // If all matches were excluded, reset exclusion list to avoid empty result
    if (excludeTexts.length > 0) {
      return getRandomReason({ category, tone, excludeTexts: [] });
    }
    return null;
  }

  const randomIndex = Math.floor(Math.random() * pool.length);
  return pool[randomIndex];
}

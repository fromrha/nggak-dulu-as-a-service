export const CATEGORIES = ["general", "corporate", "kampus", "teman", "freelance"] as const;
export const TONES = ["sopan", "witty", "dingin", "lucu", "tegas"] as const;

export type Category = (typeof CATEGORIES)[number];
export type Tone = (typeof TONES)[number];

export type Reason = {
  id: string;
  text: string;
  category: Category;
  tone: Tone;
};

export type ApiSuccess = {
  text: string;
  category: Category;
  tone: Tone;
};

export type ApiError = {
  error: string;
};

export type ApiResponse = ApiSuccess | ApiError;

export const CATEGORY_LABELS: Record<Category, string> = {
  general: "General",
  corporate: "Corporate",
  kampus: "Kampus",
  teman: "Teman",
  freelance: "Freelance",
};

export const TONE_LABELS: Record<Tone, string> = {
  sopan: "Sopan",
  witty: "Witty",
  dingin: "Dingin",
  lucu: "Lucu",
  tegas: "Tegas",
};

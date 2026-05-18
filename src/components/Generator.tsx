"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, TONES, CATEGORY_LABELS, TONE_LABELS, type ApiResponse, type Category, type Tone } from "@/lib/types";

type FilterValue<T extends string> = T | "";

const initialText = "Klik generate, nanti sistem bilang nggak dulu dengan lebih elegan daripada ghosting.";

export function Generator() {
  const [category, setCategory] = useState<FilterValue<Category>>("");
  const [tone, setTone] = useState<FilterValue<Tone>>("");
  const [result, setResult] = useState(initialText);
  const [meta, setMeta] = useState("random / santai");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const endpoint = useMemo(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (tone) params.set("tone", tone);
    const query = params.toString();
    return query ? `/api/no?${query}` : "/api/no";
  }, [category, tone]);

  async function generateReason() {
    setIsLoading(true);
    setCopied(false);
    setError("");

    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      const data = (await response.json()) as ApiResponse;

      if (!response.ok || "error" in data) {
        setError("Filter ini belum punya jawaban. Coba kombinasi lain.");
        return;
      }

      setResult(data.text);
      setMeta(`${CATEGORY_LABELS[data.category]} / ${TONE_LABELS[data.tone]}`);
    } catch {
      setError("Gagal generate. Coba lagi sebentar.");
    } finally {
      setIsLoading(false);
    }
  }

  async function copyResult() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
  }

  return (
    <section id="generator" className="px-6 py-24 lg:px-8" aria-labelledby="generator-title">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-fuchsia-600">Generator</p>
          <h2 id="generator-title" className="mt-3 text-4xl font-black tracking-tight text-stone-950 sm:text-5xl">
            Pilih konteks, pilih tone, terus bilang nggak dulu.
          </h2>
          <p className="mt-5 text-lg leading-8 text-stone-600">
            Cocok buat ajakan nongkrong, proyek mepet, rapat mendadak, sampai grup kampus yang terlalu semangat.
          </p>
        </div>

        <div className="rounded-[2.5rem] border border-white/70 bg-white/80 p-5 shadow-[0_30px_100px_rgba(120,53,15,0.18)] backdrop-blur-xl sm:p-8">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block" htmlFor="category-select">
              <span className="mb-2 block text-sm font-bold text-stone-700">Category</span>
              <select
                id="category-select"
                value={category}
                onChange={(event) => setCategory(event.target.value as FilterValue<Category>)}
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 font-semibold text-stone-900 outline-none transition focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-500/10"
              >
                <option value="">Random</option>
                {CATEGORIES.map((item) => (
                  <option key={item} value={item}>{CATEGORY_LABELS[item]}</option>
                ))}
              </select>
            </label>

            <label className="block" htmlFor="tone-select">
              <span className="mb-2 block text-sm font-bold text-stone-700">Tone</span>
              <select
                id="tone-select"
                value={tone}
                onChange={(event) => setTone(event.target.value as FilterValue<Tone>)}
                className="w-full rounded-2xl border border-stone-200 bg-white px-4 py-3 font-semibold text-stone-900 outline-none transition focus:border-amber-500 focus:ring-4 focus:ring-amber-500/10"
              >
                <option value="">Random</option>
                {TONES.map((item) => (
                  <option key={item} value={item}>{TONE_LABELS[item]}</option>
                ))}
              </select>
            </label>
          </div>

          <div className="mt-6 overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#1c102f,#3b174d_45%,#f59e0b)] p-[1px]">
            <div className="rounded-[calc(2rem-1px)] bg-stone-950 p-6 text-white sm:p-8">
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.25em] text-amber-300">{meta}</p>
              <blockquote className="min-h-32 text-pretty text-2xl font-black leading-tight sm:text-3xl">
                “{result}”
              </blockquote>
              {error ? <p className="mt-4 rounded-2xl bg-red-400/15 p-3 text-sm font-semibold text-red-100">{error}</p> : null}
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              id="generate-button"
              type="button"
              onClick={generateReason}
              disabled={isLoading}
              className="flex-1 rounded-full bg-stone-950 px-6 py-4 font-black text-white shadow-xl shadow-stone-950/20 transition hover:-translate-y-1 hover:bg-fuchsia-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Lagi mikir alasan..." : "Generate"}
            </button>
            <button
              id="copy-button"
              type="button"
              onClick={copyResult}
              className="rounded-full border border-stone-200 bg-white px-6 py-4 font-black text-stone-950 transition hover:-translate-y-1 hover:border-amber-300 hover:bg-amber-100"
            >
              {copied ? "Copied!" : "Copy"}
            </button>
            <button
              id="regenerate-button"
              type="button"
              onClick={generateReason}
              aria-label="Regenerate rejection sentence"
              className="rounded-full border border-stone-200 bg-white px-5 py-4 text-xl font-black text-stone-950 transition hover:-translate-y-1 hover:border-fuchsia-300 hover:bg-fuchsia-50"
            >
              ↻
            </button>
          </div>

          <p className="mt-4 text-sm font-medium text-stone-500">Current endpoint: <code className="rounded-lg bg-stone-100 px-2 py-1 text-stone-700">{endpoint}</code></p>
        </div>
      </div>
    </section>
  );
}

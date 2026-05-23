"use client";

import { useMemo, useState, useEffect } from "react";
import { 
  CATEGORIES, 
  TONES, 
  CATEGORY_LABELS, 
  TONE_LABELS, 
  type ApiResponse, 
  type Category, 
  type Tone,
  type Reason
} from "@/lib/types";
import { 
  Copy, 
  Check, 
  RotateCw, 
  Bookmark, 
  BookmarkCheck, 
  Trash2, 
  Terminal, 
  MessageSquareOff,
  Folder,
  Sliders,
  Undo2
} from "lucide-react";

interface GeneratorProps {
  onToneChange: (tone: Tone | "") => void;
  activeTone: Tone | "";
}

const initialText = "Klik generate, nanti sistem bilang nggak dulu dengan lebih elegan daripada ghosting.";

export function Generator({ onToneChange, activeTone }: GeneratorProps) {
  const [category, setCategory] = useState<Category | "">("");
  const [result, setResult] = useState(initialText);
  const [meta, setMeta] = useState("random / santai");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  
  // Favorites State
  const [favorites, setFavorites] = useState<Reason[]>([]);
  const [favCopiedId, setFavCopiedId] = useState<string | null>(null);

  // History State (max 3 items)
  const [history, setHistory] = useState<{
    text: string;
    meta: string;
    category: Category | "";
    tone: Tone | "";
  }[]>([]);

  // Stats State
  const [localCount, setLocalCount] = useState<number>(0);
  const [globalCount, setGlobalCount] = useState<number | null>(null);

  // Initialize data on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("nggak_dulu_favs");
      if (saved) {
        setFavorites(JSON.parse(saved) as Reason[]);
      }
    } catch (e) {
      console.error("Gagal membaca favorites dari localStorage", e);
    }

    try {
      const savedCount = localStorage.getItem("nggakDuluLocalCount");
      if (savedCount) {
        setLocalCount(parseInt(savedCount, 10) || 0);
      }
    } catch (e) {
      console.error("Gagal membaca local count dari localStorage", e);
    }

    async function fetchGlobalStats() {
      try {
        const response = await fetch("/api/stats");
        if (response.ok) {
          const data = await response.json();
          setGlobalCount(data.globalRejections);
        }
      } catch (e) {
        console.error("Gagal mengambil global stats", e);
      }
    }
    fetchGlobalStats();
  }, []);

  const endpoint = useMemo(() => {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (activeTone) params.set("tone", activeTone);
    const query = params.toString();
    return query ? `/api/no?${query}` : "/api/no";
  }, [category, activeTone]);

  async function generateReason() {
    setIsLoading(true);
    setCopied(false);
    setError("");

    try {
      const response = await fetch(endpoint, { cache: "no-store" });
      const data = (await response.json()) as ApiResponse;

      if (!response.ok || "error" in data) {
        if (response.status === 429 && "error" in data) {
          setError(data.error);
        } else {
          setError("Kombinasi kategori & tone ini belum punya template alasan. Coba kombinasi lain!");
        }
        return;
      }

      // Save current state to history before updating with new generation
      if (result !== initialText) {
        setHistory((prev) => [
          { text: result, meta, category, tone: activeTone },
          ...prev
        ].slice(0, 3));
      }

      setResult(data.text);
      setMeta(`${CATEGORY_LABELS[data.category]} / ${TONE_LABELS[data.tone]}`);

      // Increment local count
      setLocalCount((prev) => {
        const next = prev + 1;
        try {
          localStorage.setItem("nggakDuluLocalCount", next.toString());
        } catch (e) {
          console.error("Gagal menyimpan local count ke localStorage", e);
        }
        return next;
      });
    } catch {
      setError("Gagal menghubungi server. Coba lagi beberapa saat lagi.");
    } finally {
      setIsLoading(false);
    }
  }

  function goBack() {
    if (history.length === 0) return;

    const [prev, ...rest] = history;
    setResult(prev.text);
    setMeta(prev.meta);
    setCategory(prev.category);
    onToneChange(prev.tone);
    setHistory(rest);
    setError("");
    setCopied(false);
  }

  async function copyResult() {
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  // Favorites logic
  const isBookmarked = useMemo(() => {
    if (result === initialText) return false;
    return favorites.some(fav => fav.text === result);
  }, [favorites, result]);

  function toggleBookmark() {
    if (result === initialText) return;
    
    let updated: Reason[];
    if (isBookmarked) {
      updated = favorites.filter(fav => fav.text !== result);
    } else {
      const newFav: Reason = {
        id: `fav-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        text: result,
        category: (category as Category) || "general",
        tone: (activeTone as Tone) || "sopan"
      };
      updated = [newFav, ...favorites];
    }
    
    setFavorites(updated);
    localStorage.setItem("nggak_dulu_favs", JSON.stringify(updated));
  }

  function deleteFavorite(id: string) {
    const updated = favorites.filter(fav => fav.id !== id);
    setFavorites(updated);
    localStorage.setItem("nggak_dulu_favs", JSON.stringify(updated));
  }

  async function copyFavorite(text: string, id: string) {
    await navigator.clipboard.writeText(text);
    setFavCopiedId(id);
    setTimeout(() => setFavCopiedId(null), 2000);
  }

  return (
    <section id="generator" className="px-6 py-16 md:py-24 relative overflow-hidden" aria-labelledby="generator-title">
      {/* Ambient background glows */}
      <div className="absolute top-1/3 right-[15%] w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[110px] pointer-events-none -z-10" />
      <div className="absolute bottom-[20%] left-[20%] w-[350px] h-[350px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none -z-10" />

      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        {/* Left Column: Heading and info */}
        <div className="lg:sticky lg:top-8">
          <div className="theme-transition inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[rgb(var(--accent-primary)/0.08)] border border-[rgb(var(--accent-primary)/0.2)] text-[rgb(var(--accent-primary))] text-xs font-bold uppercase tracking-wider">
            <Sliders className="h-3 w-3" />
            <span>Interactive Tool</span>
          </div>
          <h2 id="generator-title" className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl leading-[1.1]">
            Custom Kalimat Penolakan Anda.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-400">
            Pilih konteks serta tone kalimat yang paling sesuai dengan situasi Anda. Mulai dari urusan profesional corporate hingga grup chat teman nongkrong yang super maksa.
          </p>

          {/* Quick guide info card */}
          <div className="mt-8 p-5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 flex gap-4">
            <div className="theme-transition p-2.5 rounded-xl bg-[rgb(var(--accent-secondary)/0.08)] text-[rgb(var(--accent-secondary))] h-fit">
              <MessageSquareOff className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-zinc-200">Anti Ghosting</h4>
              <p className="mt-1 text-xs leading-normal text-zinc-400">
                Menolak secara transparan menjaga reputasi profesional Anda. Sistem kami merancang kalimat yang diplomatis namun tetap tegas.
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="terminal-acrylic p-4 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[100px] relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 crt-scanlines opacity-5 pointer-events-none" />
              <span className="text-xs font-bold text-zinc-400 relative z-10">Your Requests Rejected</span>
              <span className="mt-3 text-3xl font-extrabold text-white font-mono leading-none relative z-10" style={{ textShadow: "0 0 8px rgb(var(--accent-primary) / 0.6)" }}>{localCount}</span>
            </div>
            
            <div className="terminal-acrylic p-4 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[100px] relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 crt-scanlines opacity-5 pointer-events-none" />
              <span className="text-xs font-bold text-zinc-400 relative z-10">Total Global Rejections</span>
              <span className="mt-3 text-3xl font-extrabold text-white font-mono leading-none relative z-10" style={{ textShadow: "0 0 8px rgb(var(--accent-primary) / 0.6)" }}>
                {globalCount !== null ? globalCount.toLocaleString("id-ID") : "—"}
              </span>
            </div>
            
            <div className="terminal-acrylic p-4 rounded-2xl border border-white/5 flex flex-col justify-between min-h-[100px] relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 crt-scanlines opacity-5 pointer-events-none" />
              <span className="text-xs font-bold text-zinc-400 relative z-10">Approval Rate</span>
              <span className="mt-3 text-3xl font-extrabold text-rose-500 font-mono leading-none glow-text-amber relative z-10">0%</span>
            </div>
          </div>
        </div>

        {/* Right Column: Generator GUI */}
        <div className="space-y-6">
          <div className="terminal-acrylic rounded-[2rem] p-6 md:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.45)] border border-white/5 relative overflow-hidden">
            {/* Ambient card background glow */}
            <div className="theme-transition absolute -bottom-24 -right-24 -z-10 h-72 w-72 rounded-full bg-[rgb(var(--accent-primary)/0.08)] blur-[80px] pointer-events-none" />

            <div className="space-y-6">
              {/* Category selector pills */}
              <div>
                <label className="mb-3 flex items-center gap-1.5 text-sm font-bold text-zinc-300">
                  <Folder className="h-4 w-4 text-zinc-400" />
                  Kategori / Konteks
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setCategory("")}
                    className={`theme-transition px-4 py-2 text-xs font-semibold rounded-full border cursor-pointer ${
                      category === ""
                        ? "bg-zinc-100 text-zinc-950 border-zinc-100 shadow-md shadow-white/5 font-bold"
                        : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    Random
                  </button>
                  {CATEGORIES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setCategory(item)}
                      className={`theme-transition px-4 py-2 text-xs font-semibold rounded-full border cursor-pointer ${
                        category === item
                          ? "bg-[rgb(var(--accent-primary))] text-white border-[rgb(var(--accent-primary))] shadow-lg shadow-[rgb(var(--accent-primary))/0.15] font-bold"
                          : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
                      }`}
                    >
                      {CATEGORY_LABELS[item]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tone selector pills */}
              <div>
                <label className="mb-3 flex items-center gap-1.5 text-sm font-bold text-zinc-300">
                  <Sliders className="h-4 w-4 text-zinc-400" />
                  Tone Kalimat
                </label>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onToneChange("");
                    }}
                    className={`theme-transition px-4 py-2 text-xs font-semibold rounded-full border cursor-pointer ${
                      activeTone === ""
                        ? "bg-zinc-100 text-zinc-950 border-zinc-100 shadow-md shadow-white/5 font-bold"
                        : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
                    }`}
                  >
                    Random
                  </button>
                  {TONES.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        onToneChange(item);
                      }}
                      className={`theme-transition px-4 py-2 text-xs font-semibold rounded-full border cursor-pointer ${
                        activeTone === item
                          ? "bg-[rgb(var(--accent-primary))] text-white border-[rgb(var(--accent-primary))] shadow-lg shadow-[rgb(var(--accent-primary))/0.15] font-bold"
                          : "bg-zinc-900/60 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-zinc-200"
                      }`}
                    >
                      {TONE_LABELS[item]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Display Result Panel (Terminal Style) */}
              <div className="theme-transition rounded-[2rem] bg-gradient-to-br from-[rgb(var(--accent-primary)/0.35)] via-[rgb(var(--accent-secondary)/0.15)] to-transparent p-[1px] relative overflow-hidden">
                <div className="rounded-[calc(2rem-1px)] bg-[#0b1021]/80 p-6 md:p-8 min-h-[220px] flex flex-col justify-between relative overflow-hidden border border-white/5">
                  
                  {/* CRT Screen Effects */}
                  <div className="absolute inset-0 crt-scanlines opacity-20 pointer-events-none z-20" />
                  <div className="absolute inset-0 crt-noise pointer-events-none z-20" />
                  <div className="absolute inset-0 crt-vignette pointer-events-none z-20" />

                  {/* Top Bar inside Terminal styling */}
                  <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 relative z-10">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                      <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                      <span className="ml-2 font-mono text-[10px] tracking-wide text-zinc-500 uppercase flex items-center gap-1">
                        <Terminal className="h-3 w-3" />
                        System.Rejection
                      </span>
                    </div>
                    <span className="theme-transition font-mono text-[11px] font-bold uppercase tracking-wider text-[rgb(var(--accent-primary))] bg-[rgb(var(--accent-primary)/0.08)] border border-[rgb(var(--accent-primary)/0.15)] px-2 py-0.5 rounded relative z-10 shadow-[0_0_8px_rgb(var(--accent-primary)/0.2)]">
                      {meta}
                    </span>
                  </div>

                  {/* Generated Text Block */}
                  <div className="flex-1 flex flex-col justify-center py-2 relative z-10">
                    <blockquote className="text-pretty text-xl font-bold leading-relaxed text-emerald-400 sm:text-2xl font-mono glow-text-emerald">
                      “{result}”
                    </blockquote>
                    
                    {error && (
                      <p className="mt-4 rounded-xl bg-red-500/10 border border-red-500/20 p-3 text-xs font-semibold text-red-400">
                        {error}
                      </p>
                    )}
                  </div>

                  {/* Action row at bottom of quote */}
                  <div className="mt-6 flex justify-end gap-2 border-t border-white/5 pt-4 relative z-10">
                    {/* Save to favorites */}
                    <button
                      type="button"
                      onClick={toggleBookmark}
                      disabled={result === initialText}
                      title={isBookmarked ? "Hapus dari Favorit" : "Simpan ke Favorit"}
                      className={`theme-transition p-2.5 rounded-xl border cursor-pointer ${
                        result === initialText 
                          ? "opacity-35 cursor-not-allowed border-zinc-900 text-zinc-700"
                          : isBookmarked
                          ? "bg-[rgb(var(--accent-secondary)/0.1)] border-[rgb(var(--accent-secondary)/0.3)] text-[rgb(var(--accent-secondary))]"
                          : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200 hover:border-zinc-700"
                      }`}
                    >
                      {isBookmarked ? (
                        <BookmarkCheck className="h-4.5 w-4.5" />
                      ) : (
                        <Bookmark className="h-4.5 w-4.5" />
                      )}
                    </button>
                    
                    {/* Copy to clipboard */}
                    <button
                      type="button"
                      onClick={copyResult}
                      disabled={result === initialText}
                      title="Salin Kalimat"
                      className={`theme-transition flex items-center gap-2 px-4 py-2.5 rounded-xl border font-bold text-xs cursor-pointer ${
                        result === initialText 
                          ? "opacity-35 cursor-not-allowed border-zinc-900 text-zinc-700"
                          : copied
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                          : "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700"
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="h-4 w-4" />
                          <span>Disalin!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </div>

              {/* Main Controls Row */}
              <div className="flex gap-3">
                <button
                  id="back-button"
                  type="button"
                  onClick={goBack}
                  disabled={isLoading || history.length === 0}
                  title="Kembali ke alasan sebelumnya"
                  className="theme-transition flex items-center justify-center gap-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white px-5 py-4 font-bold text-sm cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Undo2 className="h-4 w-4" />
                  <span className="hidden sm:inline">Kembali</span>
                </button>

                <button
                  id="generate-button"
                  type="button"
                  onClick={generateReason}
                  disabled={isLoading}
                  className="theme-transition flex-1 flex items-center justify-center gap-2 rounded-xl bg-white hover:bg-zinc-100 px-6 py-4 font-bold text-sm text-zinc-950 shadow-xl shadow-black/20 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <RotateCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                  <span>{isLoading ? "Lagi mikir alasan..." : "Generate Alasan"}</span>
                </button>
              </div>

              {/* API status display */}
              <div className="flex items-center justify-between text-[11px] text-zinc-500 border-t border-zinc-900/60 pt-4">
                <span>Active API endpoint:</span>
                <span className="font-mono bg-zinc-900 border border-zinc-850 px-2 py-0.5 rounded text-zinc-400">
                  {endpoint}
                </span>
              </div>
            </div>
          </div>

          {/* Favorites (Saved Items) Section */}
          <div className="terminal-acrylic rounded-[2rem] p-6 md:p-8 shadow-xl border border-white/5 relative overflow-hidden">
            <div className="absolute inset-0 crt-scanlines opacity-5 pointer-events-none" />
            <h3 className="text-lg font-bold text-white flex items-center gap-2 relative z-10">
              <Bookmark className="h-5 w-5 text-amber-400 glow-text-amber" />
              <span>Alasan Tersimpan ({favorites.length})</span>
            </h3>
            
            {favorites.length === 0 ? (
              <p className="mt-3 text-xs leading-relaxed text-zinc-500">
                Belum ada alasan tersimpan. Cari kalimat penolakan terbaik di atas lalu klik ikon bookmark untuk menyimpannya di browser ini.
              </p>
            ) : (
              <div className="mt-4 divide-y divide-zinc-900 max-h-[280px] overflow-y-auto pr-2 space-y-3">
                {favorites.map((fav) => (
                  <div key={fav.id} className="pt-3 first:pt-0 flex items-start justify-between gap-4 group">
                    <div className="space-y-1.5 flex-1">
                      <p className="text-sm text-zinc-300 leading-normal font-mono">
                        “{fav.text}”
                      </p>
                      <div className="flex gap-2">
                        <span className="text-[10px] bg-zinc-900 border border-zinc-850 text-zinc-400 px-2 py-0.5 rounded">
                          {CATEGORY_LABELS[fav.category]}
                        </span>
                        <span className="text-[10px] bg-zinc-900 border border-zinc-850 text-zinc-400 px-2 py-0.5 rounded">
                          {TONE_LABELS[fav.tone]}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => copyFavorite(fav.text, fav.id)}
                        className={`theme-transition p-2 rounded-lg border cursor-pointer ${
                          favCopiedId === fav.id
                            ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                            : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                        }`}
                        title="Salin"
                      >
                        {favCopiedId === fav.id ? (
                          <Check className="h-3.5 w-3.5" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                      
                      <button
                        type="button"
                        onClick={() => deleteFavorite(fav.id)}
                        className="theme-transition p-2 rounded-lg border border-zinc-850 bg-zinc-900 text-zinc-400 hover:text-red-400 hover:border-red-500/30 cursor-pointer"
                        title="Hapus"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

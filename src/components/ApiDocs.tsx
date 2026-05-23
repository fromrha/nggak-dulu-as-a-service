"use client";

import { useState, useMemo } from "react";
import { CATEGORIES, TONES, CATEGORY_LABELS, TONE_LABELS, type Tone } from "@/lib/types";
import { 
  Terminal, 
  Copy, 
  Check, 
  BookOpen, 
  Cpu, 
  Code, 
  ChevronRight, 
  Server
} from "lucide-react";

interface ApiDocsProps {
  activeTone?: Tone | "";
}

export function ApiDocs({ activeTone = "" }: ApiDocsProps) {
  const [activeTab, setActiveTab] = useState<"curl" | "js" | "python">("curl");
  const [copiedTextId, setCopiedTextId] = useState<string | null>(null);

  const selectedToneStr = activeTone || "sopan";
  
  const exampleResponse = `{
  "id": "corporate-${selectedToneStr}-001",
  "text": "Terima kasih atas tawarannya, namun saat ini fokus kami sedang dialokasikan ke inisiatif lain.",
  "category": "corporate",
  "tone": "${selectedToneStr}"
}`;

  const codeSnippets = useMemo(() => {
    return {
      curl: `curl "https://nggakdulu.id/api/no?category=corporate&tone=${selectedToneStr}"`,
      js: `// Mengambil kalimat penolakan menggunakan Fetch API
fetch("https://nggakdulu.id/api/no?category=corporate&tone=${selectedToneStr}")
  .then((res) => res.json())
  .then((data) => console.log(data.text));`,
      python: `# Mengambil kalimat penolakan menggunakan Requests
import requests

url = "https://nggakdulu.id/api/no"
params = {
    "category": "corporate",
    "tone": "${selectedToneStr}"
}

response = requests.get(url, params=params)
data = response.json()
print(data["text"])`
    };
  }, [selectedToneStr]);

  async function copyCode(text: string, id: string) {
    await navigator.clipboard.writeText(text);
    setCopiedTextId(id);
    setTimeout(() => setCopiedTextId(null), 2000);
  }

  return (
    <section id="api-docs" className="px-6 py-20 md:py-28 relative" aria-labelledby="api-title">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.06),transparent_50%)]" />

      <div className="mx-auto max-w-6xl">
        {/* Header Block */}
        <div className="mb-12 max-w-2xl">
          <div className="theme-transition inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[rgb(var(--accent-secondary)/0.08)] border border-[rgb(var(--accent-secondary)/0.2)] text-[rgb(var(--accent-secondary))] text-xs font-bold uppercase tracking-wider">
            <Server className="h-3 w-3" />
            <span>Developer API</span>
          </div>
          <h2 id="api-title" className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl leading-[1.1]">
            Integrasikan API Kami.
          </h2>
          <p className="mt-4 text-base text-zinc-400">
            Dapatkan respon JSON secara terprogram untuk disematkan dalam Slack bot, automasi email, atau script penolakan otomatis Anda.
          </p>
        </div>

        {/* Workspace Layout */}
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-start">
          
          {/* Left Column: API Console Codebox */}
          <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl border border-zinc-800/80">
            
            {/* Terminal Tab Bar header */}
            <div className="bg-zinc-950 px-5 py-4 border-b border-zinc-900 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 font-mono text-[11px] text-zinc-500 uppercase tracking-wide">Developer Console</span>
              </div>
              
              {/* Tab Selector Buttons */}
              <div className="flex bg-zinc-900 rounded-lg p-0.5 border border-zinc-850">
                {(["curl", "js", "python"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 text-xs font-mono rounded-md uppercase cursor-pointer transition-all ${
                      activeTab === tab
                        ? "bg-zinc-800 text-white font-bold"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {tab === "js" ? "JS" : tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Request Snippet Block */}
            <div className="bg-zinc-950 p-6 relative group">
              <button
                type="button"
                onClick={() => copyCode(codeSnippets[activeTab], "req")}
                className="absolute top-4 right-4 p-2 rounded-lg border border-zinc-850 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700 transition opacity-0 group-hover:opacity-100 cursor-pointer"
                title="Salin Code"
              >
                {copiedTextId === "req" ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>

              <p className="font-mono text-xs text-zinc-600 mb-2">// Request Example ({activeTab.toUpperCase()})</p>
              <pre className="font-mono text-xs sm:text-sm text-zinc-200 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                <code>{codeSnippets[activeTab]}</code>
              </pre>
            </div>

            {/* Response Preview Block */}
            <div className="bg-zinc-950/80 p-6 border-t border-zinc-900 relative group">
              <button
                type="button"
                onClick={() => copyCode(exampleResponse, "res")}
                className="absolute top-4 right-4 p-2 rounded-lg border border-zinc-850 bg-zinc-900/60 text-zinc-400 hover:text-white hover:border-zinc-700 transition opacity-0 group-hover:opacity-100 cursor-pointer"
                title="Salin JSON"
              >
                {copiedTextId === "res" ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>

              <p className="font-mono text-xs text-zinc-600 mb-2">// Response Preview (JSON)</p>
              <pre className="font-mono text-xs sm:text-sm text-emerald-400/90 overflow-x-auto leading-relaxed">
                <code>{exampleResponse}</code>
              </pre>
            </div>
            
            {/* Quick API status indicator */}
            <div className="bg-zinc-900/40 px-6 py-3 border-t border-zinc-900/80 flex items-center gap-2 text-xs text-zinc-500 font-mono">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Status: Operational</span>
              <span className="text-zinc-700">|</span>
              <span>Latency: ~12ms</span>
            </div>
          </div>

          {/* Right Column: Parameters and Info */}
          <div className="space-y-6">
            {/* Query parameters definition card */}
            <div className="glass-panel rounded-3xl p-6 border border-zinc-800/80 shadow-lg">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code className="h-4.5 w-4.5 text-zinc-400" />
                Query Parameters
              </h3>
              
              <div className="mt-4 border border-zinc-900 rounded-2xl overflow-hidden">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-zinc-950 text-zinc-400 border-b border-zinc-900">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Param</th>
                      <th className="px-4 py-3 font-semibold">Type</th>
                      <th className="px-4 py-3 font-semibold">Desc</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900/60 text-zinc-350 bg-zinc-950/20">
                    <tr>
                      <td className="px-4 py-3 text-zinc-200 font-bold">category</td>
                      <td className="px-4 py-3 text-zinc-500">string</td>
                      <td className="px-4 py-3 text-zinc-400">Filter reject reason (e.g. `corporate`, `kampus`)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-zinc-200 font-bold">tone</td>
                      <td className="px-4 py-3 text-zinc-500">string</td>
                      <td className="px-4 py-3 text-zinc-400">Filter tone (e.g. `sopan`, `lucu`, `dingin`)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* List of valid options cards */}
            <div className="glass-panel rounded-3xl p-6 border border-zinc-800/80 shadow-lg space-y-4 bg-zinc-950/40">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent-primary))]" />
                  Categories
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <span 
                      key={cat} 
                      className="px-2.5 py-1 text-[11px] font-semibold bg-zinc-900/60 border border-zinc-850 rounded-lg text-zinc-300 font-mono hover:border-zinc-700 transition-colors"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent-secondary))]" />
                  Tones
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {TONES.map((tone) => (
                    <span 
                      key={tone} 
                      className={`theme-transition px-2.5 py-1 text-[11px] font-semibold rounded-lg font-mono border transition-colors ${
                        activeTone === tone
                          ? "bg-[rgb(var(--accent-primary)/0.08)] border-[rgb(var(--accent-primary)/0.3)] text-[rgb(var(--accent-primary))] font-bold"
                          : "bg-zinc-900/60 border-zinc-850 text-zinc-300 hover:border-zinc-700"
                      }`}
                    >
                      {tone}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

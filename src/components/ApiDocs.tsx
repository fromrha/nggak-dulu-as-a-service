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

interface CodeSnippetHighlighterProps {
  code: string;
  language: "curl" | "js" | "python";
}

function CodeSnippetHighlighter({ code, language }: CodeSnippetHighlighterProps) {
  const lines = code.split("\n");
  
  if (language === "curl") {
    return (
      <pre className="font-mono text-xs sm:text-sm text-slate-350 overflow-x-auto whitespace-pre-wrap leading-relaxed">
        <code>
          {lines.map((line, i) => {
            if (line.startsWith("curl ")) {
              const urlMatch = line.match(/(curl\s+)"([^"]+)"/);
              if (urlMatch) {
                return (
                  <span key={i} className="block">
                    <span className="text-cyan-400 glow-text-cyan mr-1.5 font-bold">$</span>
                    <span className="text-zinc-355">{urlMatch[1]}</span>
                    <span className="text-emerald-400 glow-text-emerald">"{urlMatch[2]}"</span>
                  </span>
                );
              }
              return (
                <span key={i} className="block">
                  <span className="text-cyan-400 glow-text-cyan mr-1.5 font-bold">$</span>
                  <span className="text-zinc-355">{line}</span>
                </span>
              );
            }
            return <span key={i} className="block">{line}</span>;
          })}
        </code>
      </pre>
    );
  }

  if (language === "js") {
    return (
      <pre className="font-mono text-xs sm:text-sm text-slate-355 overflow-x-auto leading-relaxed">
        <code>
          {lines.map((line, i) => {
            if (line.trim().startsWith("//")) {
              return <div key={i} className="text-zinc-500">{line}</div>;
            }
            
            const html = line
              .replace(/(fetch|\.then|console\.log|function)/g, '<span class="text-cyan-400 glow-text-cyan">$1</span>')
              .replace(/("https:\/\/[^"]+")/g, '<span class="text-emerald-400 glow-text-emerald">$1</span>')
              .replace(/(\.json\(\))/g, '<span class="text-amber-400">$1</span>');
            
            return (
              <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
            );
          })}
        </code>
      </pre>
    );
  }

  if (language === "python") {
    return (
      <pre className="font-mono text-xs sm:text-sm text-slate-355 overflow-x-auto leading-relaxed">
        <code>
          {lines.map((line, i) => {
            if (line.trim().startsWith("#")) {
              return <div key={i} className="text-zinc-500">{line}</div>;
            }
            
            const html = line
              .replace(/(import|print)/g, '<span class="text-cyan-400 glow-text-cyan">$1</span>')
              .replace(/(requests\.get)/g, '<span class="text-cyan-400 glow-text-cyan">requests</span><span class="text-zinc-400">.</span><span class="text-cyan-300">get</span>')
              .replace(/("https:\/\/[^"]+"|"category"|"tone"|"[^"]+")/g, '<span class="text-emerald-400 glow-text-emerald">$1</span>')
              .replace(/(url =|params =|response =|data =)/g, '<span class="text-zinc-300">$1</span>');
            
            return (
              <div key={i} dangerouslySetInnerHTML={{ __html: html }} />
            );
          })}
        </code>
      </pre>
    );
  }

  return (
    <pre className="font-mono text-xs sm:text-sm text-slate-355 overflow-x-auto whitespace-pre-wrap leading-relaxed">
      <code>{code}</code>
    </pre>
  );
}

interface JsonHighlighterProps {
  json: string;
}

function JsonHighlighter({ json }: JsonHighlighterProps) {
  const lines = json.split("\n");
  return (
    <pre className="font-mono text-xs sm:text-sm text-zinc-350 overflow-x-auto leading-relaxed">
      <code>
        {lines.map((line, i) => {
          const keyMatch = line.match(/^(\s*)("([^"]+)")(\s*:\s*)(.*)$/);
          if (keyMatch) {
            const indent = keyMatch[1];
            const key = keyMatch[2];
            const colon = keyMatch[4];
            const rest = keyMatch[5];

            let valueElement = <span className="text-zinc-300">{rest}</span>;
            if (rest.startsWith('"')) {
              const commaIndex = rest.lastIndexOf(',');
              if (commaIndex !== -1) {
                const val = rest.substring(0, commaIndex);
                const comma = rest.substring(commaIndex);
                valueElement = (
                  <>
                    <span className="text-emerald-400 glow-text-emerald">{val}</span>
                    <span className="text-zinc-500">{comma}</span>
                  </>
                );
              } else {
                valueElement = <span className="text-emerald-400 glow-text-emerald">{rest}</span>;
              }
            } else if (rest.match(/^(true|false|null|\d+)/)) {
              const commaIndex = rest.lastIndexOf(',');
              if (commaIndex !== -1) {
                const val = rest.substring(0, commaIndex);
                const comma = rest.substring(commaIndex);
                valueElement = (
                  <>
                    <span className="text-amber-400 glow-text-amber">{val}</span>
                    <span className="text-zinc-500">{comma}</span>
                  </>
                );
              } else {
                valueElement = <span className="text-amber-400 glow-text-amber">{rest}</span>;
              }
            }

            return (
              <div key={i}>
                <span>{indent}</span>
                <span className="text-cyan-400 glow-text-cyan">{key}</span>
                <span className="text-zinc-500">{colon}</span>
                {valueElement}
              </div>
            );
          }
          
          return (
            <div key={i} className="text-zinc-500">
              {line}
            </div>
          );
        })}
      </code>
    </pre>
  );
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
    <section id="api-docs" className="px-6 py-20 md:py-28 relative overflow-hidden" aria-labelledby="api-title">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_bottom_right,rgba(236,72,153,0.06),transparent_50%)]" />
      
      {/* Backdrop lighting behind acrylic panel */}
      <div className="absolute top-1/2 left-[20%] -translate-y-1/2 w-[350px] h-[350px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none -z-10 animate-pulse-glow" />
      <div className="absolute top-[40%] left-[35%] -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/8 rounded-full blur-[90px] pointer-events-none -z-10" />

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
          {/* Left Column: API Console Codebox */}
          <div className="terminal-acrylic rounded-3xl overflow-hidden relative shadow-[0_0_50px_rgba(15,23,42,0.45)]">
            {/* CRT Screen Effects */}
            <div className="absolute inset-0 crt-scanlines opacity-20 pointer-events-none z-20" />
            <div className="absolute inset-0 crt-noise pointer-events-none z-20" />
            <div className="absolute inset-0 crt-vignette pointer-events-none z-20" />

            {/* Terminal Tab Bar header */}
            <div className="bg-slate-950/40 px-5 py-4 border-b border-white/5 flex items-center justify-between z-10 relative">
              <div className="flex items-center gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                <div className="h-2.5 w-2.5 rounded-full bg-[#27c93f]" />
                <span className="ml-2 font-mono text-[11px] text-zinc-500 uppercase tracking-wide">Developer Console</span>
              </div>
              
              {/* Tab Selector Buttons */}
              <div className="flex bg-slate-950/60 rounded-lg p-0.5 border border-white/5 relative z-10">
                {(["curl", "js", "python"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1 text-xs font-mono rounded-md uppercase cursor-pointer transition-all duration-300 relative ${
                      activeTab === tab
                        ? "text-white font-bold"
                        : "text-zinc-500 hover:text-zinc-300"
                    }`}
                  >
                    {activeTab === tab && (
                      <span 
                        className="absolute inset-0 rounded-md -z-10 shadow-[0_0_12px_rgb(var(--accent-primary)/0.4)]"
                        style={{
                          background: "rgb(var(--accent-primary))"
                        }}
                      />
                    )}
                    {tab === "js" ? "JS" : tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Request Snippet Block */}
            <div className="bg-slate-950/20 p-6 relative group z-10">
              <button
                type="button"
                onClick={() => copyCode(codeSnippets[activeTab], "req")}
                className="absolute top-4 right-4 p-2 rounded-lg border border-white/5 bg-slate-950/40 text-zinc-400 hover:text-white hover:border-white/10 transition opacity-0 group-hover:opacity-100 cursor-pointer z-30"
                title="Salin Code"
              >
                {copiedTextId === "req" ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>

              <p className="font-mono text-xs text-zinc-600 mb-2.5">// Request Example ({activeTab.toUpperCase()})</p>
              <CodeSnippetHighlighter code={codeSnippets[activeTab]} language={activeTab} />
            </div>

            {/* Response Preview Block */}
            <div className="bg-slate-950/40 p-6 border-t border-white/5 relative group z-10">
              <button
                type="button"
                onClick={() => copyCode(exampleResponse, "res")}
                className="absolute top-4 right-4 p-2 rounded-lg border border-white/5 bg-slate-950/40 text-zinc-400 hover:text-white hover:border-white/10 transition opacity-0 group-hover:opacity-100 cursor-pointer z-30"
                title="Salin JSON"
              >
                {copiedTextId === "res" ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>

              <p className="font-mono text-xs text-zinc-600 mb-2.5">// Response Preview (JSON)</p>
              <JsonHighlighter json={exampleResponse} />
            </div>
            
            {/* Quick API status indicator */}
            <div className="bg-slate-950/50 px-6 py-3 border-t border-white/5 flex items-center gap-2 text-xs text-zinc-500 font-mono z-10">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              <span>Status: Operational</span>
              <span className="text-zinc-700">|</span>
              <span>Latency: ~12ms</span>
            </div>
          </div>

          {/* Right Column: Parameters and Info */}
          <div className="space-y-6">
            {/* Query parameters definition card */}
            <div className="terminal-acrylic rounded-3xl p-6 border border-white/5 shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 crt-scanlines opacity-5 pointer-events-none" />
              <h3 className="text-base font-bold text-white flex items-center gap-2 relative z-10">
                <Code className="h-4.5 w-4.5 text-zinc-400" />
                Query Parameters
              </h3>
              
              <div className="mt-4 border border-white/5 rounded-2xl overflow-hidden relative z-10">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-slate-950/50 text-zinc-400 border-b border-white/5">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Param</th>
                      <th className="px-4 py-3 font-semibold">Type</th>
                      <th className="px-4 py-3 font-semibold">Desc</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-900/60 text-zinc-350 bg-slate-950/10">
                    <tr>
                      <td className="px-4 py-3 text-zinc-200 font-bold">category</td>
                      <td className="px-4 py-3 text-zinc-500">string</td>
                      <td className="px-4 py-3 text-zinc-400 font-sans">Filter reject reason (e.g. `corporate`, `kampus`)</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 text-zinc-200 font-bold">tone</td>
                      <td className="px-4 py-3 text-zinc-500">string</td>
                      <td className="px-4 py-3 text-zinc-400 font-sans">Filter tone (e.g. `sopan`, `lucu`, `dingin`)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* List of valid options cards */}
            <div className="terminal-acrylic rounded-3xl p-6 border border-white/5 shadow-lg space-y-4 relative overflow-hidden">
              <div className="absolute inset-0 crt-scanlines opacity-5 pointer-events-none" />
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent-primary))]" style={{ boxShadow: "0 0 8px rgb(var(--accent-primary))" }} />
                  Categories
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <span 
                      key={cat} 
                      className="px-2.5 py-1 text-[11px] font-semibold bg-slate-950/40 border border-white/5 rounded-lg text-zinc-300 font-mono hover:border-zinc-500 transition-colors"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
              </div>

              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--accent-secondary))]" style={{ boxShadow: "0 0 8px rgb(var(--accent-secondary))" }} />
                  Tones
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {TONES.map((tone) => (
                    <span 
                      key={tone} 
                      className={`theme-transition px-2.5 py-1 text-[11px] font-semibold rounded-lg font-mono border transition-colors ${
                        activeTone === tone
                          ? "bg-[rgb(var(--accent-primary)/0.12)] border-[rgb(var(--accent-primary)/0.4)] text-[rgb(var(--accent-primary))] font-bold shadow-[0_0_10px_rgb(var(--accent-primary)/0.2)]"
                          : "bg-slate-950/40 border-white/5 text-zinc-300 hover:border-zinc-500"
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

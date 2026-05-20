import { Sparkles, ArrowRight, Code } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8 flex flex-col items-center justify-center" aria-labelledby="hero-title">
      {/* Decorative radial gradient for general background ambient illumination */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.08),transparent_50%)]" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none" />

      <div className="mx-auto max-w-4xl text-center relative">
        {/* Glow behind header */}
        <div className="theme-transition absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[300px] w-[300px] rounded-full bg-[rgb(var(--accent-primary)/0.12)] blur-[100px] pointer-events-none" />

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-xs font-semibold text-zinc-300 shadow-xl backdrop-blur-md">
          <Sparkles className="theme-transition h-3.5 w-3.5 text-[rgb(var(--accent-primary))]" />
          <span>Indonesian Rejection API & Generator</span>
        </div>

        {/* Main Heading */}
        <h1 
          id="hero-title" 
          className="text-balance text-5xl font-extrabold tracking-tight text-white sm:text-7xl leading-[1.1] md:leading-[1.05]"
        >
          Bilang{" "}
          <span className="theme-transition bg-gradient-to-r from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] bg-clip-text text-transparent">
            Nggak Dulu
          </span>{" "}
          Dengan Elegan
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
          Generator kalimat penolakan profesional, santai, dan taktis untuk membantu Anda berkata tidak. Lengkap dengan public API siap pakai untuk integrasi instan.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            id="hero-generate-link"
            href="#generator"
            className="theme-transition group flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-zinc-950 shadow-[0_20px_50px_rgba(255,255,255,0.08)] hover:-translate-y-0.5 hover:bg-zinc-100"
          >
            Mulai Generator
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
          
          <a
            id="hero-api-link"
            href="#api-docs"
            className="theme-transition flex items-center gap-2 rounded-xl border border-zinc-850 bg-zinc-900/50 hover:bg-zinc-900/90 px-6 py-3.5 text-sm font-semibold text-zinc-300 backdrop-blur hover:-translate-y-0.5"
          >
            <Code className="h-4 w-4 text-zinc-400" />
            Integrasi API
          </a>
        </div>
      </div>
    </section>
  );
}

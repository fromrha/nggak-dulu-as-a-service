import { Sparkles, ArrowRight, Code } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden px-6 min-h-screen flex flex-col items-center justify-center" aria-labelledby="hero-title">
      {/* Decorative radial gradient for general background ambient illumination */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.08),transparent_50%)]" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none" />

      <div className="mx-auto max-w-4xl text-center relative flex flex-col items-center">
        {/* Glow behind header */}
        <div className="theme-transition absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 h-[300px] w-[300px] rounded-full bg-[rgb(var(--accent-primary)/0.12)] blur-[100px] pointer-events-none" />

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900/80 px-4 py-1.5 text-xs font-semibold text-zinc-300 shadow-xl backdrop-blur-md">
          <Sparkles className="theme-transition h-3.5 w-3.5 text-[rgb(var(--accent-primary))]" />
          <span>Public API untuk menolak dengan sedikit martabat.</span>
        </div>

        {/* Main Heading */}
        <h1
          id="hero-title"
          className="text-balance text-5xl font-medium tracking-tight text-white sm:text-7xl leading-[1.3] md:leading-[1.2]"
        >
          Untuk semua ajakan yang harusnya{" "}
          <span className="theme-transition bg-gradient-to-r from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] bg-clip-text text-transparent block sm:inline mt-2 sm:mt-0 font-serif font-medium italic pr-2">
            tidak kamu iyakan
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-base leading-relaxed text-zinc-400 sm:text-lg">
          Buat kamu si gak enakan yang tiap ada ajakan langsung anxiety duluan. Padahal nggak mau. Padahal capek. Tapi tetep bilang iya juga. — bestie, <span className="theme-transition bg-gradient-to-r from-[rgb(var(--accent-primary))] to-[rgb(var(--accent-secondary))] bg-clip-text text-transparent block sm:inline mt-2 sm:mt-0 font-serif font-medium italic pr-2">please stop!</span>This is for your own good.
        </p>

        {/* Actions */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4">
          <a
            id="hero-generate-link"
            href="#generator"
            className="theme-transition group flex items-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-zinc-950 shadow-[0_20px_50px_rgba(255,255,255,0.08)] hover:-translate-y-0.5 hover:bg-zinc-100 cursor-pointer"
          >
            Generate Nggak Dulu
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>

          <a
            id="hero-api-link"
            href="#api-docs"
            className="theme-transition flex items-center gap-1.5 text-xs font-bold text-zinc-400 hover:text-white cursor-pointer transition-colors pt-2 uppercase tracking-wider"
          >
            <Code className="h-3.5 w-3.5 text-zinc-500" />
            <span>Panggil API-nya</span>
          </a>
        </div>
      </div>
    </section>
  );
}

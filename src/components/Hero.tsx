export function Hero() {
  return (
    <section className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:px-8" aria-labelledby="hero-title">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(255,122,0,0.28),transparent_32%),radial-gradient(circle_at_75%_10%,rgba(255,214,10,0.18),transparent_28%),linear-gradient(135deg,#140f2d_0%,#241146_48%,#0c0a16_100%)]" />
      <div className="absolute left-1/2 top-20 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />

      <div className="mx-auto max-w-5xl text-center">
        <p className="mb-6 inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-amber-100 shadow-2xl shadow-amber-500/10 backdrop-blur">
          API lucu buat bilang tidak tanpa bikin suasana tegang
        </p>
        <h1 id="hero-title" className="text-balance text-5xl font-black tracking-tight text-white sm:text-7xl">
          Nggak Dulu as a Service
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-8 text-amber-50/80 sm:text-xl">
          Generator kalimat penolakan untuk orang Indonesia yang ingin bilang tidak, tanpa bikin suasana jadi aneh.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            id="hero-generate-link"
            href="#generator"
            className="group rounded-full bg-amber-300 px-7 py-4 text-base font-bold text-stone-950 shadow-[0_20px_80px_rgba(251,191,36,0.35)] transition hover:-translate-y-1 hover:bg-amber-200"
          >
            Generate Nggak Dulu
            <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
          </a>
          <a
            id="hero-api-link"
            href="#api-docs"
            className="rounded-full border border-white/15 bg-white/10 px-7 py-4 text-base font-semibold text-white backdrop-blur transition hover:-translate-y-1 hover:bg-white/15"
          >
            Lihat API Docs
          </a>
        </div>
      </div>
    </section>
  );
}

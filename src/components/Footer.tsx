export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 px-6 py-10 text-stone-300 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-extrabold text-white">Nggak Dulu as a Service</p>
          <p className="mt-1 text-sm text-stone-400">Open source, ringan, dan cukup absurd buat dishare.</p>
        </div>
        <div className="flex flex-wrap gap-3 text-sm font-semibold">
          <a id="footer-github-link" className="transition hover:text-amber-300" href="https://github.com/fromrha/nggak-dulu-as-a-service" target="_blank" rel="noreferrer">
            GitHub
          </a>
          <span className="text-stone-600">/</span>
          <a id="footer-sponsor-link" className="transition hover:text-amber-300" href="#" aria-label="Sponsor placeholder">
            Sponsor soon™
          </a>
        </div>
      </div>
    </footer>
  );
}

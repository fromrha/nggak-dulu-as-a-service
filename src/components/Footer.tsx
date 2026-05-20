import { Heart } from "lucide-react";

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={props.className}
    >
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-zinc-950/80 px-6 py-12 text-zinc-400 lg:px-8 relative overflow-hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 sm:flex-row sm:items-center sm:justify-between relative z-10">
        <div>
          <p className="font-extrabold text-white tracking-tight">Nggak Dulu as a Service</p>
          <p className="mt-1.5 text-xs text-zinc-500 max-w-md leading-relaxed">
            API dan Generator penolakan open source gratis untuk membantu menjaga work-life balance dan kesejahteraan mental Anda.
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold">
          <a 
            id="footer-github-link" 
            className="flex items-center gap-1.5 transition-colors hover:text-white" 
            href="https://github.com/fromrha/nggak-dulu-as-a-service" 
            target="_blank" 
            rel="noreferrer"
          >
            <GithubIcon className="h-4 w-4 text-zinc-500 hover:text-white" />
            <span>GitHub</span>
          </a>
          <span className="text-zinc-800">|</span>
          <a 
            id="footer-sponsor-link" 
            className="flex items-center gap-1.5 transition-colors hover:text-rose-400 group" 
            href="#" 
            aria-label="Sponsor placeholder"
          >
            <Heart className="h-4 w-4 text-zinc-500 group-hover:text-rose-400 transition-colors" />
            <span>Sponsor soon™</span>
          </a>
        </div>
      </div>
      
      {/* Decorative tiny accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[rgb(var(--accent-primary)/0.3)] to-transparent pointer-events-none" />
    </footer>
  );
}

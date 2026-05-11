import Link from "next/link";
import { Clapperboard } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const nav = [
  {
    heading: "Product",
    links: [
      { label: "Templates", href: "/templates", external: false },
      { label: "Docs", href: "/docs", external: false },
      { label: "How it works", href: "/#workflow", external: false },
    ],
  },
  {
    heading: "Community",
    links: [
      { label: "Community", href: "/community", external: false },
      { label: "GitHub", href: "https://github.com/zz41354899/SwiftClip", external: true },
      { label: "SwiftMographer ↗", href: "https://github.com/zz41354899/SwiftMographer/tree/main", external: true },
      { label: "Remotion docs", href: "https://remotion.dev/docs", external: true },
    ],
  },
  {
    heading: "Legal",
    links: [
      { label: "Privacy", href: "/privacy", external: false },
      { label: "Terms", href: "/terms", external: false },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10  bg-background pt-16 pb-8">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-10 mb-16">
        <div className="col-span-2 sm:col-span-3 lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-2 text-black font-semibold text-base mb-4 tracking-tight">
            <Clapperboard className="w-[18px] h-[18px]" strokeWidth={2} />
            SwiftClip
          </Link>
          <p className="text-black/50 text-[13px] leading-relaxed max-w-xs mb-6 font-light">
            Production-ready Remotion video templates built with React &amp; TypeScript.
          </p>
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/zz41354899/SwiftClip"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full border border-black/10 flex items-center justify-center text-black/40 hover:text-black hover:border-black/20 transition-colors"
              aria-label="GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {nav.map(({ heading, links }) => (
          <div key={heading}>
            <p className="text-[12px] font-semibold tracking-wider text-black mb-4">
              {heading}
            </p>
            <ul className="space-y-3">
              {links.map(({ label, href, external }) => (
                <li key={label}>
                  {external ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[13px] text-black/60 hover:text-black transition-colors"
                    >
                      {label}
                    </a>
                  ) : (
                    <Link
                      href={href}
                      className="text-[13px] text-black/60 hover:text-black transition-colors"
                    >
                      {label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-black/5 px-6 pt-8 pb-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-[12px] text-black/40 font-medium tracking-wide">
          <p>&copy; {year} SwiftClip</p>
          <p>
            Built with{" "}
            <a href="https://remotion.dev" target="_blank" rel="noopener noreferrer" className="text-black/70 hover:text-black hover:underline underline-offset-2">
              Remotion
            </a>
            {" · "}
            <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-black/70 hover:text-black hover:underline underline-offset-2">
              Next.js
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

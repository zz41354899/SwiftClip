"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Clapperboard, Menu, X } from "lucide-react";
import { clsx } from "clsx";
import { AnimatePresence, motion } from "framer-motion";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Templates", href: "/templates" },
  { label: "Community", href: "/community" },
  { label: "Docs", href: "/docs" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 768) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <header className="fixed top-4 md:top-6 inset-x-0 z-50 pointer-events-none flex justify-center px-4">
      {/* Dynamic Island pill */}
      <motion.nav
        layout
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={clsx(
          "pointer-events-auto flex flex-col rounded-[28px] border transition-all duration-300 ease-out overflow-hidden w-full",
          scrolled || menuOpen
            ? "max-w-2xl bg-white/90 border-zinc-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.10)]"
            : "max-w-4xl bg-white/55 border-zinc-200/40 shadow-[0_4px_20px_rgb(0,0,0,0.05)]"
        )}
        style={{
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-3 py-2">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 text-zinc-900 font-semibold text-[15px] tracking-tight hover:opacity-75 transition-opacity pl-2"
          >
            <Clapperboard className="w-4 h-4 text-indigo-500" strokeWidth={2.5} />
            <span>SwiftClip</span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-7 text-[13px] font-medium text-zinc-500">
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link href={href} className="hover:text-zinc-900 transition-colors">
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden md:flex items-center gap-4">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors" aria-label="GitHub">
              <GithubIcon className="w-[16px] h-[16px]" />
            </a>
            <Link
              href="/templates"
              className="flex h-8 items-center justify-center px-4 rounded-full bg-zinc-900 text-white text-[12px] font-semibold hover:bg-black transition-colors hover:scale-[1.02] active:scale-[0.98]"
            >
              Get started
            </Link>
          </div>

          {/* Mobile: icons + hamburger */}
          <div className="flex md:hidden items-center gap-3 pr-1">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-zinc-900 transition-colors" aria-label="GitHub">
              <GithubIcon className="w-[15px] h-[15px]" />
            </a>
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="w-8 h-8 flex items-center justify-center rounded-full text-zinc-500 hover:bg-zinc-100 transition-colors"
              aria-label="Toggle menu"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <X className="w-4 h-4" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="open"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                  >
                    <Menu className="w-4 h-4" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="md:hidden overflow-hidden"
            >
              <div className="px-4 pb-4 pt-1 border-t border-zinc-100">
                <ul className="flex flex-col gap-1 mb-4">
                  {NAV_LINKS.map(({ label, href }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center h-10 px-3 rounded-xl text-[15px] font-medium text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/templates"
                  onClick={() => setMenuOpen(false)}
                  className="flex w-full h-10 items-center justify-center rounded-full bg-zinc-900 text-white text-[14px] font-semibold hover:bg-black transition-colors"
                >
                  Get started
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </header>
  );
}

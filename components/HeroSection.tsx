"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const FADE_UP = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 90, damping: 20 } },
};

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-24 overflow-hidden bg-white">
      <div className="absolute inset-0 hero-grid opacity-100 pointer-events-none" />

      <motion.div
        className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center text-center"
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.09 } },
        }}
      >
        <motion.h1
          variants={FADE_UP}
          className="text-[56px] sm:text-[72px] md:text-[88px] leading-[0.95] font-semibold text-zinc-900 tracking-[-0.04em] mb-7"
        >
          Ship videos faster
          <br />
          <span className="text-zinc-300">with React &amp; Remotion</span>
        </motion.h1>

        <motion.p
          variants={FADE_UP}
          className="text-[17px] sm:text-[19px] max-w-xl text-zinc-500 leading-relaxed font-light mb-12"
        >
          Production-ready Remotion video templates. Copy, customise, and render in minutes — or install the Claude workflow to plan, generate, and register compositions in your Remotion project.
        </motion.p>

        <motion.div
          variants={FADE_UP}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <Link
            href="/templates"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-zinc-900 text-white text-[14px] font-semibold hover:bg-black transition-colors hover:scale-[1.02] active:scale-[0.97]"
          >
            Browse templates
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/docs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-zinc-50 border border-zinc-200 text-[14px] font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors hover:scale-[1.02] active:scale-[0.97]"
          >
            Read docs
          </Link>

          <Link
            href="/docs"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-indigo-50 border border-indigo-200 text-[14px] font-semibold text-indigo-700 hover:bg-indigo-100 transition-colors hover:scale-[1.02] active:scale-[0.97]"
          >
            Claude workflow
          </Link>
        </motion.div>

        <motion.div
          variants={FADE_UP}
          className="mt-20 pt-8 border-t border-zinc-100 w-full max-w-xs flex items-center justify-center gap-8 text-[12px] font-medium text-zinc-400"
        >
          <span>30+ templates</span>
          <span className="w-1 h-1 rounded-full bg-zinc-200" />
          <span>Open source</span>
          <span className="w-1 h-1 rounded-full bg-zinc-200" />
          <span>MIT license</span>
        </motion.div>
      </motion.div>
    </section>
  );
}

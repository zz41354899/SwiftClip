"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-28 px-6 bg-background border-t border-black/5  overflow-hidden relative">
      <div className="relative max-w-3xl mx-auto text-center">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-[12px] font-semibold tracking-widest uppercase text-black/50  mb-4"
        >
          Get started
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.05 }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold text-black  tracking-tight leading-[1.08] mb-6"
        >
          Start rendering
          <br />
          <span className="text-black/40">today.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="text-black/60  text-lg leading-relaxed mb-10 max-w-lg mx-auto font-light"
        >
          30 free Remotion templates. Pick one, copy the code, done.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 px-8 h-12 rounded-full bg-zinc-900 text-white   text-[15px] font-medium hover:scale-105 active:scale-95 transition-transform"
          >
            Browse templates
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
          <a
            href="https://remotion.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 h-12 rounded-full border border-black/10  bg-transparent text-black/80  text-[15px] font-medium hover:bg-zinc-100  active:scale-95 transition-all"
          >
            Learn Remotion ↗
          </a>
        </motion.div>
      </div>
    </section>
  );
}

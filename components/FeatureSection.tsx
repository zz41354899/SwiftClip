"use client";

import { motion } from "framer-motion";
import { Zap, Code2, Sliders, Layers, RefreshCw, Shield } from "lucide-react";

const FEATURES = [
  {
    Icon: Zap,
    title: "Blazing fast renders",
    description: "Remotion parallelises rendering across all CPU cores. A 30-second 4K video renders in seconds.",
  },
  {
    Icon: Code2,
    title: "Pure React & TypeScript",
    description: "Write animations with the same tools you already know. No proprietary DSLs or GUI editors.",
  },
  {
    Icon: Sliders,
    title: "Fully customisable props",
    description: "Every template exposes typed props. Pass your data at render time to generate unique videos.",
  },
  {
    Icon: Layers,
    title: "Composable components",
    description: "Build a LowerThird once and reuse it across every composition in your project.",
  },
  {
    Icon: RefreshCw,
    title: "Hot reload in Studio",
    description: "Changes to your composition reflect instantly in Remotion Studio — no restart required.",
  },
  {
    Icon: Shield,
    title: "MIT licensed",
    description: "All templates are open source. Use them in personal and commercial projects without restriction.",
  },
];

export function FeatureSection() {
  return (
    <section id="features" className="py-32 px-6 bg-surface">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-24"
        >
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold text-black tracking-tight mb-6">
            Everything you need to ship videos fast
          </h2>
          <p className="text-black/60 text-[17px] max-w-2xl mx-auto leading-relaxed font-light">
            Built on Remotion, SwiftClip templates give you production-quality animations with zero configuration.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.6,
                ease: [0.16, 1, 0.3, 1],
                delay: (i % 3) * 0.1,
              }}
            >
              <div className="group h-full p-8 rounded-3xl bg-background border border-black/5 hover:bg-zinc-100 transition-colors duration-500 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-zinc-100 border border-black/5 flex items-center justify-center mb-6">
                  <Icon className="w-4 h-4 text-black/80" />
                </div>
                <h3 className="text-black font-medium text-[17px] mb-3 tracking-tight">{title}</h3>
                <p className="text-black/60 text-[15px] leading-relaxed font-light">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

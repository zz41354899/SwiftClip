"use client";

import { motion } from "framer-motion";
import { Zap, Code2, Sliders, Layers, RefreshCw, Shield } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Blazing Fast Render",
    description: "Remotion parallelises rendering across CPU cores for instant local playback and rapid 4K final exports.",
  },
  {
    icon: Code2,
    title: "Code-Driven Context",
    description: "No keyframes to drag. Just pure, functional components that use variables and data mapping via props.",
  },
  {
    icon: Sliders,
    title: "Infinitely Customisable",
    description: "Colors, fonts, duration, layout. Templates represent a skeleton you uniquely brand using standard React props.",
  },
  {
    icon: Layers,
    title: "Composable by Design",
    description: "Stack a hero, feature, and outro using simple Sequence wrappers to create complex long-form videos.",
  },
  {
    icon: RefreshCw,
    title: "Live Preview",
    description: "Design alongside a hot-reloading browser window. No more export-wait loops just to check font sizes.",
  },
  {
    icon: Shield,
    title: "Production-Ready",
    description: "Fully typed with sensible bounds, responsive scale awareness, and guaranteed high-res crisp outputs.",
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
          <h2 className="text-[32px] sm:text-[40px] md:text-[48px] font-semibold text-black  tracking-tight mb-6">
            Engineered for speed.
          </h2>
          <p className="text-black/60  text-[17px] max-w-2xl mx-auto leading-relaxed font-light">
            Skip After Effects. Leverage React's composability to author video content without ever leaving your editor.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description }, i) => (
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
              <div className="group h-full p-8 rounded-3xl bg-background border border-black/5  hover:bg-zinc-100  transition-colors duration-500 shadow-sm ">
                <div className="w-10 h-10 rounded-full bg-zinc-100  border border-black/5  flex items-center justify-center mb-6">
                  <Icon className="w-4 h-4 text-black/80 " />
                </div>
                <h3 className="text-black  font-medium text-[17px] mb-3 tracking-tight">{title}</h3>
                <p className="text-black/60  text-[15px] leading-relaxed font-light">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

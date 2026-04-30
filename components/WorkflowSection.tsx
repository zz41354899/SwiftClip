"use client";

import { motion } from "framer-motion";
import { FileCode2, Settings2, Rocket } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: FileCode2,
    title: "Pick a template",
    description: "Browse curated Remotion templates. Each one is fully typed and ready to drop into any React project.",
  },
  {
    number: "02",
    icon: Settings2,
    title: "Customise via code",
    description: "Swap data, design tokens, and timings straight through props. No timeline. Just your code editor.",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Render & scale",
    description: "Export crisp MP4s via the command line or hook it up to Lambda for massive programmatic video pipelines.",
  },
];

export function WorkflowSection() {
  return (
    <section className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 max-w-xl"
        >
          <h2 className="text-[40px] sm:text-[48px] font-semibold text-black  tracking-[-0.03em] leading-[1.1] mb-6">
            Developer-first <br />
            <span className="text-black/40 ">video creation.</span>
          </h2>
          <p className="text-black/60  text-[17px] leading-relaxed font-light">
            Skip After Effects. Leverage the familiar React lifecycle to automate video production without compromises.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map(({ number, icon: Icon, title, description }, i) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
              className="relative group h-full"
            >
              <div className="relative z-10 bg-surface border border-black/5  rounded-3xl p-8 h-full transition-colors duration-500">
                <div className="flex items-start justify-between mb-8">
                  <div className="w-10 h-10 rounded-full bg-zinc-100  flex items-center justify-center text-black ">
                    <Icon className="w-4 h-4 opacity-80" />
                  </div>
                  <span className="text-xl font-medium text-black/20  tabular-nums">
                    {number}
                  </span>
                </div>
                <h3 className="text-black  font-medium text-[17px] tracking-tight mb-3">{title}</h3>
                <p className="text-black/60  text-[15px] leading-relaxed font-light">{description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-60px" }}
           transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
           className="mt-12 flex justify-center"
        >
          <div className="bg-surface border border-black/5  rounded-2xl px-6 py-4 flex items-center gap-4 max-w-2xl w-full shadow-sm ">
            <span className="text-black/30  text-[13px] font-mono select-none">$</span>
            <code className="text-black/70  text-[13px] font-mono flex-1">
              npx remotion render remotion/index.tsx ProductLaunch output.mp4
            </code>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

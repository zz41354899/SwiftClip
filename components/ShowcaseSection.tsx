"use client";

import { motion } from "framer-motion";

function CodeBlock() {
  return (
    <div className="bg-[#1d1d1f] rounded-2xl overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] border border-black/5">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200 bg-[#2d2d2f]">
        <div className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        </div>
        <span className="text-[11px] text-zinc-400 font-mono">ProductLaunch.tsx</span>
      </div>
      <pre className="p-5 text-[13px] font-mono leading-relaxed overflow-x-auto text-zinc-100/80 bg-[#1d1d1f]">
        <code>
          <span className="text-[#ff7b72]">import</span>
          <span> {"{"} </span>
          <span className="text-zinc-100">AbsoluteFill, useCurrentFrame, interpolate</span>
          <span> {"}"} </span>
          <span className="text-[#ff7b72]">from</span>
          <span className="text-[#a5d6ff]"> &apos;remotion&apos;</span>
          {"\n\n"}
          <span className="text-[#ff7b72]">export</span>
          <span className="text-[#ff7b72]"> const</span>
          <span className="text-[#d2a8ff]"> ProductLaunch</span>
          <span> = () {"=>"} {"{"}</span>
          {"\n"}
          <span>  </span>
          <span className="text-[#ff7b72]">const</span>
          <span> frame = </span>
          <span className="text-[#d2a8ff]">useCurrentFrame</span>
          <span>();</span>
          {"\n"}
          <span>  </span>
          <span className="text-[#ff7b72]">const</span>
          <span> opacity = </span>
          <span className="text-[#d2a8ff]">interpolate</span>
          <span>(frame, [</span>
          <span className="text-[#79c0ff]">0</span>
          <span>, </span>
          <span className="text-[#79c0ff]">30</span>
          <span>], [</span>
          <span className="text-[#79c0ff]">0</span>
          <span>, </span>
          <span className="text-[#79c0ff]">1</span>
          <span>]);</span>
          {"\n\n"}
          <span>  </span>
          <span className="text-[#ff7b72]">return</span>
          <span> (</span>
          {"\n"}
          <span>    </span>
          <span className="text-zinc-500">{"<"}</span>
          <span className="text-[#7ee787]">AbsoluteFill</span>
          <span> style={"{{"}opacity{"}}"}{">"}</span>
          {"\n"}
          <span>      </span>
          <span className="text-zinc-500">{"<"}</span>
          <span className="text-[#7ee787]">h1</span>
          <span className="text-zinc-500">{">"}</span>
          <span>Product Launch</span>
          <span className="text-zinc-500">{"</h1>"}</span>
          {"\n"}
          <span>    </span>
          <span className="text-zinc-500">{"</AbsoluteFill>"}</span>
          {"\n"}
          <span>  );</span>
          {"\n"}
          <span>{"}"}</span>
        </code>
      </pre>
    </div>
  );
}

function StatsCard() {
  const bars = [65, 85, 45, 90, 70, 55, 95];
  return (
    <div className="bg-surface border border-black/5 rounded-2xl shadow-sm p-8 h-full">
      <p className="text-[11px] font-medium text-black/30 uppercase tracking-[0.2em] mb-6">Render output</p>
      <div className="flex items-end gap-2 h-32 mb-6 opacity-80">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t-sm bg-zinc-100 relative overflow-hidden">
            <motion.div
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-0 inset-x-0 bg-zinc-800 rounded-t-sm"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between border-t border-black/5 pt-6">
        <div>
          <p className="text-[20px] font-semibold text-black tracking-tight">Up to 4K</p>
          <p className="text-[13px] text-black/40">MP4 · GIF · WebM</p>
        </div>
        <span className="px-3 py-1.5 rounded-full bg-zinc-100 text-black/70 text-[11px] font-medium border border-black/10 uppercase tracking-wider">
          GPU ready
        </span>
      </div>
    </div>
  );
}

const rows = [
  {
    eyebrow: "Write once, render anywhere",
    title: "Animations as\nReact components",
    body: "Every SwiftClip template is a plain .tsx file. Drop it in, register the Composition, and your video is ready to render — no separate design tool required.",
    bullets: [
      "Frame-perfect animations with useCurrentFrame()",
      "Typed props for easy customisation",
      "Hot reload in Remotion Studio",
    ],
    visual: <CodeBlock />,
    flip: false,
  },
  {
    eyebrow: "Scale without limits",
    title: "Programmatic video\nat any resolution",
    body: "Remotion renders each frame server-side using Chromium. Generate thousands of personalised videos from a single template with different data.",
    bullets: [
      "Parallelised rendering across CPU cores",
      "Supports up to 4K resolution",
      "CI/CD ready — render in GitHub Actions or Docker",
    ],
    visual: <StatsCard />,
    flip: true,
  },
];

export function ShowcaseSection() {
  return (
    <section className="py-32 px-6 bg-background">
      <div className="max-w-6xl mx-auto space-y-32">
        {rows.map(({ eyebrow, title, body, bullets, visual, flip }) => (
          <motion.div
            key={eyebrow}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center ${
              flip ? "lg:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div>
              <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-black/40 mb-4">
                {eyebrow}
              </p>
              <h2 className="text-[32px] sm:text-[40px] font-semibold text-black tracking-tight leading-[1.15] mb-6 whitespace-pre-line">
                {title}
              </h2>
              <p className="text-black/60 text-[17px] leading-relaxed mb-8">{body}</p>
              <ul className="space-y-4">
                {bullets.map((b) => (
                  <li key={b} className="flex items-center gap-4 text-black/70 text-[15px]">
                    <span className="w-4 h-4 rounded-full bg-zinc-100 border border-black/10 flex items-center justify-center shrink-0">
                      <svg viewBox="0 0 12 12" className="w-2.5 h-2.5 text-black/80" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 6l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className={flip ? "order-first lg:order-none" : ""}>{visual}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

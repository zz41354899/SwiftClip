"use client";

const LOGOS = [
  "React",
  "TypeScript",
  "Remotion",
  "Next.js",
  "Node.js",
  "Vite",
  "GitHub",
  "Tailwind CSS",
  "FFmpeg",
  "Framer Motion",
];

export function LogoMarquee() {
  const doubled = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <section className="py-12 overflow-hidden bg-background border-y border-black/5 ">
      <p className="text-center text-[11px] font-medium uppercase tracking-[0.3em] text-black/30  mb-8">
        Built for the modern stack
      </p>

      <div className="relative">
        <div className="pointer-events-none absolute left-0 inset-y-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute right-0 inset-y-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        <div className="flex items-center animate-marquee whitespace-nowrap">
          {doubled.map((name, i) => (
             <span key={i} className="flex items-center gap-6 px-4 shrink-0 opacity-40 hover:opacity-100 transition-opacity duration-300">
               <span className="text-[17px] font-semibold text-black  tracking-tight">{name}</span>
             </span>
          ))}
        </div>
      </div>
    </section>
  );
}

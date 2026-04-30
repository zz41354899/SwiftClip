"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import { templates } from "@/lib/templates";

const featured = templates.slice(0, 3);

function PreviewCard({
  template,
  index,
}: {
  template: (typeof templates)[number];
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const thumbnailSrc = template.videoUrl.replace('/videos/', '/thumbnails/').replace('.mp4', '.jpg');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="group"
    >
      <Link
        href={`/templates/${template.id}`}
        className="block bg-surface border border-black/5  rounded-3xl overflow-hidden hover:bg-zinc-100  transition-colors duration-500"
      >
        <div
          className="relative aspect-video overflow-hidden bg-zinc-100"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered ? (
            <video
              key="video"
              src={template.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              className={`w-full h-full transition-transform duration-700 group-hover:scale-[1.02] ${
                template.height > template.width ? 'object-contain' : 'object-cover'
              }`}
            />
          ) : (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              key="img"
              src={thumbnailSrc}
              alt={template.title}
              loading="lazy"
              className={`w-full h-full transition-transform duration-700 group-hover:scale-[1.02] ${
                template.height > template.width ? 'object-contain' : 'object-cover'
              }`}
            />
          )}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80  backdrop-blur-md text-[11px] text-black/90  font-medium border border-black/10  shadow-sm">
            <Clock className="w-3 h-3 text-black/60 " />
            {template.duration}
          </div>
          {template.height > template.width && (
            <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-white/80  backdrop-blur-md text-[11px] text-black/90  font-medium border border-black/10  uppercase tracking-wider shadow-sm">
              9:16
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-black  font-medium text-[17px] mb-2 tracking-tight group-hover:text-black/80  transition-colors">
            {template.title}
          </h3>
          <p className="text-black/50  text-[14px] leading-relaxed line-clamp-2 mb-4">
            {template.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-100  text-black/60  border border-black/5 "
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function TemplateShowcase() {
  return (
    <section className="py-32 px-6 bg-background border-t border-black/5 ">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2 className="text-[32px] sm:text-[40px] font-semibold text-black  tracking-tight leading-[1.1]">
              Ready to render
              <br />
              <span className="text-black/40 ">out of the box.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 text-[14px] font-medium text-black/50  hover:text-black  transition-colors group"
            >
              View all {templates.length} templates
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((t, i) => (
            <PreviewCard key={t.id} template={t} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 px-8 h-12 rounded-full bg-zinc-900 text-white   text-[15px] font-medium hover:scale-105 active:scale-95 transition-transform"
          >
            Explore Library
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

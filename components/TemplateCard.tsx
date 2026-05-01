"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, ArrowRight, Code } from "lucide-react";
import { GlassCard } from "./ui/GlassCard";
import { Button } from "./ui/Button";
import { type Template, TAG_COLORS } from "@/lib/templates";

interface TemplateCardProps {
  template: Template;
  index: number;
}

export function TemplateCard({ template, index }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const thumbnailSrc = template.videoUrl.replace('/videos/', '/thumbnails/').replace('.mp4', '.jpg');

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        ease: "easeOut" as const,
        delay: (index % 3) * 0.08,
      }}
      className="h-full"
    >
      <GlassCard hover className="flex flex-col overflow-hidden h-full group">
        {/* Thumbnail — clicking navigates to template page */}
        <Link
          href={`/templates/${template.id}`}
          className="block relative aspect-video overflow-hidden"
          style={{ background: template.height > template.width ? '#0a0a14' : undefined }}
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
              className={`w-full h-full transition-transform duration-300 group-hover:scale-[1.02] ${
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
              className={`w-full h-full transition-transform duration-300 group-hover:scale-[1.02] ${
                template.height > template.width ? 'object-contain' : 'object-cover'
              }`}
            />
          )}
          {/* Duration badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-md bg-white/90 backdrop-blur-sm text-[10px] text-zinc-600 font-semibold shadow-sm border border-zinc-200/60 z-10">
            <Clock className="w-3 h-3" />
            {template.duration}
          </div>
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-zinc-950/0 group-hover:bg-zinc-950/10 transition-colors duration-200 flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl text-xs font-semibold text-zinc-900 shadow">
              View template <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </Link>

        {/* Card body */}
        <div className="p-5 flex flex-col gap-3 flex-1">
          {/* Title */}
          <Link href={`/templates/${template.id}`}>
            <h3 className="text-zinc-900 font-semibold text-base leading-tight hover:text-indigo-600 transition-colors duration-150">
              {template.title}
            </h3>
          </Link>

          {/* Description */}
          <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2 flex-1">
            {template.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {template.tags.map((tag) => (
              <span
                key={tag}
                className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${
                  TAG_COLORS[tag] ?? "bg-zinc-100 text-zinc-500 border-zinc-200"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex gap-2 pt-1">
            <Link href={`/templates/${template.id}`} className="flex-1">
              <Button variant="ghost" size="sm" className="w-full">
                <Code className="w-3 h-3" />
                View code
              </Button>
            </Link>
            <Link href={`/templates/${template.id}`} className="flex-1">
              <Button variant="primary" size="sm" className="w-full">
                <ArrowRight className="w-3.5 h-3.5" />
                Open
              </Button>
            </Link>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

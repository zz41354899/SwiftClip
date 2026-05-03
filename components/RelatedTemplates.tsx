"use client";

import Image from "next/image";
import Link from "next/link";
import { Play } from "lucide-react";
import { type Template, TAG_COLORS } from "@/lib/templates";

function RelatedCard({ rel }: { rel: Template }) {
  const isPortrait = rel.height > rel.width;

  return (
    <Link
      key={rel.id}
      href={`/templates/${rel.id}`}
      className="group block bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-200"
    >
      <div
        className="relative aspect-video overflow-hidden"
        style={{ background: isPortrait ? "#0a0a14" : "#f4f4f5" }}
      >
        <div
          className={`absolute inset-0 transition-transform duration-300 group-hover:scale-[1.03] ${
            isPortrait ? "flex items-center justify-center" : ""
          }`}
        >
          <div
            className="relative"
            style={
              isPortrait
                ? { aspectRatio: `${rel.width} / ${rel.height}`, height: "100%" }
                : { width: "100%", height: "100%" }
            }
          >
            <Image
              src={`/thumbnails/${rel.id}.jpg`}
              alt={rel.title}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-xl text-xs font-semibold text-zinc-900 shadow">
            <Play className="w-3 h-3 fill-current" /> View
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-sm font-semibold text-zinc-900 group-hover:text-indigo-600 transition-colors mb-1">
          {rel.title}
        </h3>
        <div className="flex flex-wrap gap-1">
          {rel.tags.map((tag) => (
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
      </div>
    </Link>
  );
}

export function RelatedTemplates({ templates }: { templates: Template[] }) {
  if (templates.length === 0) return null;

  return (
    <section className="border-t border-zinc-100 bg-zinc-50 py-14 px-6 mt-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg font-semibold text-zinc-950 mb-6">Related templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((rel) => (
            <RelatedCard key={rel.id} rel={rel} />
          ))}
        </div>
      </div>
    </section>
  );
}

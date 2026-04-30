"use client";

import Link from "next/link";
import { Play } from "lucide-react";
import { type Template, TAG_COLORS } from "@/lib/templates";

export function RelatedTemplates({ templates }: { templates: Template[] }) {
  if (templates.length === 0) return null;

  return (
    <section className="border-t border-zinc-100 bg-zinc-50 py-14 px-6 mt-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg font-semibold text-zinc-950 mb-6">Related templates</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {templates.map((rel) => (
            <Link
              key={rel.id}
              href={`/templates/${rel.id}`}
              className="group block bg-white border border-zinc-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-zinc-300 transition-all duration-200"
            >
              <div
                className="relative aspect-video overflow-hidden"
                style={{ background: rel.height > rel.width ? '#0a0a14' : '#f4f4f5' }}
              >
                <video
                  src={rel.videoUrl}
                  className={`w-full h-full transition-transform duration-300 group-hover:scale-[1.03] ${
                    rel.height > rel.width ? 'object-contain' : 'object-cover'
                  }`}
                  muted
                  loop
                  playsInline
                  onMouseEnter={(e) => (e.currentTarget as HTMLVideoElement).play()}
                  onMouseLeave={(e) => {
                    const v = e.currentTarget as HTMLVideoElement;
                    v.pause();
                    v.currentTime = 0;
                  }}
                />
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
          ))}
        </div>
      </div>
    </section>
  );
}

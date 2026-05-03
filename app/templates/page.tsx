"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { templates, type Template } from "@/lib/templates";
import { Search, X, Clock, PlaySquare, SlidersHorizontal, ChevronDown } from "lucide-react";
import { clsx } from "clsx";

function TemplateMediaCard({ template, priority = false }: { template: Template; priority?: boolean }) {
  const isPortrait = template.height > template.width;

  return (
    <Link
      href={`/templates/${template.id}`}
      className="group flex flex-col bg-white border border-zinc-200 hover:border-zinc-300 rounded-3xl overflow-hidden hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-all duration-300"
    >
      <div
        className="relative aspect-[4/3] overflow-hidden"
        style={{ background: isPortrait ? "#0a0a14" : "#f4f4f5" }}
      >
        <div
          className={clsx(
            "absolute inset-0 transition-transform duration-700 group-hover:scale-105",
            isPortrait && "flex items-center justify-center py-4"
          )}
        >
          <div
            className="relative"
            style={
              isPortrait
                ? { aspectRatio: `${template.width} / ${template.height}`, height: "100%" }
                : { width: "100%", height: "100%" }
            }
          >
            <Image
              src={`/thumbnails/${template.id}.jpg`}
              alt={template.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
              className="object-cover"
              loading={priority ? "eager" : "lazy"}
              priority={priority}
            />
          </div>
        </div>
        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-black/5 text-[11px] font-semibold text-zinc-700 shadow-sm">
          <Clock className="w-3.5 h-3.5 text-zinc-400" />
          {template.duration}
        </div>
        {isPortrait && (
          <div className="absolute top-3 right-3 flex items-center px-2 py-1.5 rounded-lg bg-zinc-900/80 backdrop-blur-md border border-white/10 text-[10px] font-bold text-white shadow-sm uppercase tracking-wider">
            9:16
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur shadow-xl flex items-center justify-center text-zinc-900 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <PlaySquare className="w-5 h-5 ml-0.5" />
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-[17px] font-semibold text-zinc-900 mb-2 truncate">
          {template.title}
        </h3>
        <p className="text-sm text-zinc-500 line-clamp-2 leading-relaxed mb-4 min-h-[40px]">
          {template.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {template.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 text-[11px] font-medium bg-zinc-100 text-zinc-600 rounded-lg">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    templates.forEach((tpl) => tpl.tags.forEach((tag) => tags.add(tag)));
    return Array.from(tags).sort();
  }, []);

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return templates.filter((tpl) => {
      const matchSearch =
        tpl.title.toLowerCase().includes(q) ||
        tpl.description.toLowerCase().includes(q);
      const matchTag = activeTag ? tpl.tags.includes(activeTag) : true;
      return matchSearch && matchTag;
    });
  }, [searchQuery, activeTag]);

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col selection:bg-indigo-100">
      <Navbar />

      <div className="pt-40 pb-16 px-6 relative overflow-hidden bg-white border-b border-zinc-200">
        <div className="absolute inset-0 hero-grid opacity-30 pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight mb-6"
          >
            Template library
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-zinc-500 max-w-2xl mx-auto mb-10"
          >
            {templates.length} production-ready Remotion templates. Free, open-source, copy-and-paste.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto flex flex-col md:flex-row items-center gap-4"
          >
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-12 rounded-full border border-zinc-200 focus:border-indigo-400 focus:ring-4 focus:ring-indigo-400/10 text-zinc-900 bg-white placeholder:text-zinc-400 text-[15px] outline-none transition-all shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-zinc-100 text-zinc-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="lg:hidden max-w-[1400px] w-full mx-auto px-6 pt-6">
        <button
          onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
          className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 transition-all shadow-sm mb-3"
        >
          <SlidersHorizontal className="w-4 h-4 text-zinc-400" />
          Categories
          {activeTag && (
            <span className="ml-1 flex items-center justify-center w-5 h-5 rounded-full bg-zinc-900 text-white text-[10px] font-bold">
              1
            </span>
          )}
          <ChevronDown
            className={clsx(
              "w-4 h-4 text-zinc-400 ml-auto transition-transform duration-200",
              mobileFilterOpen && "rotate-180"
            )}
          />
        </button>

        <AnimatePresence>
          {mobileFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm mb-4">
                <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-3 px-1">
                  Filter by category
                </p>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => { setActiveTag(null); setMobileFilterOpen(false); }}
                    className={clsx(
                      "text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                      activeTag === null ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"
                    )}
                  >
                    All templates
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => { setActiveTag(activeTag === tag ? null : tag); setMobileFilterOpen(false); }}
                      className={clsx(
                        "text-left px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
                        activeTag === tag ? "bg-zinc-900 text-white" : "text-zinc-600 hover:bg-zinc-100"
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {activeTag && (
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-zinc-500">Filtering by</span>
            <button
              onClick={() => setActiveTag(null)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900 text-white text-xs font-medium"
            >
              {activeTag}
              <X className="w-3 h-3" />
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12">
        <aside className="hidden lg:block lg:w-64 shrink-0">
          <div className="sticky top-32">
            <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-4 px-2">Categories</h3>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setActiveTag(null)}
                className={clsx(
                  "text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  activeTag === null ? "bg-zinc-900 text-white shadow-md" : "text-zinc-600 hover:bg-zinc-200"
                )}
              >
                All templates
              </button>
              {allTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                  className={clsx(
                    "text-left px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                    activeTag === tag ? "bg-zinc-900 text-white shadow-md" : "text-zinc-600 hover:bg-zinc-200"
                  )}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <AnimatePresence mode="popLayout">
            {filtered.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-24 text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-zinc-100 mb-4">
                  <Search className="w-6 h-6 text-zinc-400" />
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-2">No results found</h3>
                <p className="text-zinc-500">No templates match &quot;{searchQuery}&quot;</p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filtered.map((template, idx) => (
                  <motion.div
                    layout
                    key={template.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.4) }}
                  >
                    <TemplateMediaCard template={template} priority={idx < 6} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      <Footer />
    </div>
  );
}

import { notFound } from "next/navigation";
import Link from "next/link";
import { templates, TAG_COLORS } from "@/lib/templates";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TemplateCopyButton } from "@/components/TemplateCopyButton";
import { CollapsibleCode } from "@/components/CollapsibleCode";
import { RelatedTemplates } from "@/components/RelatedTemplates";
import { ArrowLeft, Clock } from "lucide-react";

export function generateStaticParams() {
  return templates.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const template = templates.find((t) => t.id === id);
  if (!template) return { title: "Template not found" };
  return {
    title: `${template.title} — SwiftClip`,
    description: template.description,
  };
}

export default async function TemplatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const template = templates.find((t) => t.id === id);
  if (!template) notFound();

  const related = templates.filter(
    (t) => t.id !== template.id && t.tags.some((tag) => template.tags.includes(tag))
  ).slice(0, 3);

  const renderCmd = `npx remotion render remotion/index.tsx ${template.remotionId} output.mp4`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24">
        {/* Back link */}
        <div className="max-w-6xl mx-auto px-6 pt-6 pb-2">
          <Link
            href="/templates"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            All templates
          </Link>
        </div>

        {/* Two-column layout */}
        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 items-start">
          {/* Left: video + code */}
          <div>
            {/* Video player */}
            <div
              className="relative w-full bg-zinc-950 rounded-2xl overflow-hidden border border-zinc-200 shadow-sm mb-8"
              style={{ aspectRatio: `${template.width} / ${template.height}` }}
            >
              <video
                src={template.videoUrl}
                className="w-full h-full object-cover"
                controls
                autoPlay
                loop
                muted
                playsInline
              />
            </div>

            {/* Code blocks */}
            <div className="space-y-4">
              {/* Render command */}
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                  Render with Remotion CLI
                </p>
                <div className="relative rounded-xl bg-zinc-950 border border-zinc-800 p-4">
                  <pre className="text-xs text-zinc-300 font-mono overflow-x-auto">
                    {renderCmd}
                  </pre>
                  <TemplateCopyButton text={renderCmd} label="Copy command" />
                </div>
              </div>

              {/* Code snippet */}
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                  Composition code
                </p>
                <CollapsibleCode code={template.codeSnippet} />
              </div>
            </div>
          </div>

          {/* Right: sidebar info */}
          <div className="lg:sticky lg:top-28 space-y-6">
            {/* Title + tags */}
            <div>
              <h1 className="text-3xl font-bold text-zinc-950 tracking-tight mb-3">
                {template.title}
              </h1>
              <p className="text-zinc-500 text-base leading-relaxed mb-5">
                {template.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {template.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/templates?tag=${tag}`}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-opacity hover:opacity-80 ${
                      TAG_COLORS[tag] ?? "bg-zinc-100 text-zinc-500 border-zinc-200"
                    }`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Metadata */}
            <div className="border border-zinc-100 rounded-2xl divide-y divide-zinc-100 bg-zinc-50">
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-xs text-zinc-500 font-medium">Duration</span>
                <span className="flex items-center gap-1 text-xs font-semibold text-zinc-900">
                  <Clock className="w-3.5 h-3.5 text-zinc-400" />
                  {template.duration}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-xs text-zinc-500 font-medium">Resolution</span>
                <span className="text-xs font-semibold text-zinc-900">
                  {template.width} × {template.height}
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-xs text-zinc-500 font-medium">Frame rate</span>
                <span className="text-xs font-semibold text-zinc-900">
                  {template.fps} fps
                </span>
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <span className="text-xs text-zinc-500 font-medium">Frames</span>
                <span className="text-xs font-semibold text-zinc-900">
                  {template.durationInFrames}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="space-y-2">
              <TemplateCopyButton
                text={template.codeSnippet}
                label="Copy code"
                variant="primary"
              />
              <Link
                href="/templates"
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl border border-zinc-200 text-sm font-medium text-zinc-700 bg-white hover:bg-zinc-50 hover:border-zinc-300 transition-all duration-200 shadow-sm"
              >
                Browse all templates
              </Link>
            </div>

            {/* Hint */}
            <p className="text-xs text-zinc-400 leading-relaxed">
              Copy the code snippet into your Remotion project and run the render command to generate this template locally.
            </p>
          </div>
        </div>

        {/* Related templates */}
        <RelatedTemplates templates={related} />
      </main>

      <Footer />
    </div>
  );
}

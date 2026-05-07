import { notFound } from "next/navigation";
import { readFileSync } from "fs";
import { join } from "path";
import Link from "next/link";
import { templates, TAG_COLORS } from "@/lib/templates";
import { RemotionPlayer } from "@/components/RemotionPlayer";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { TemplateCopyButton } from "@/components/TemplateCopyButton";
import { CollapsibleCode } from "@/components/CollapsibleCode";
import { RelatedTemplates } from "@/components/RelatedTemplates";
import { ArrowLeft, Clock, FlaskConical, ExternalLink } from "lucide-react";

export function generateStaticParams() {
  return templates.map((t) => ({ id: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const template = templates.find((t) => t.id === id);
  if (!template) return { title: "Template not found — SwiftClip" };
  return {
    title: `${template.title} — SwiftClip`,
    description: template.description,
  };
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const template = templates.find((t) => t.id === id);
  if (!template) notFound();

  let codeSnippet = "";
  try {
    codeSnippet = readFileSync(
      join(process.cwd(), "remotion", `${template.remotionId}.tsx`),
      "utf8"
    );
  } catch {
    codeSnippet = `// Source file not found for ${template.remotionId}`;
  }

  const related = templates
    .filter(
      (x) => x.id !== template.id && x.tags.some((tag) => template.tags.includes(tag))
    )
    .slice(0, 3);

  const renderCmd = template.htmlInCanvas
    ? `npx remotion render remotion/index.tsx ${template.remotionId} output.mp4 --codec=h264 --gl=angle`
    : `npx remotion render remotion/index.tsx ${template.remotionId} output.mp4 --codec=h264`;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-24">
        <div className="max-w-6xl mx-auto px-6 pt-6 pb-2">
          <Link
            href="/templates"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to templates
          </Link>
        </div>

        <div className="max-w-6xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[680px_1fr] gap-10 items-start">
          <div>
            <div
              className="relative w-full bg-zinc-100 rounded-2xl overflow-hidden border border-zinc-200 shadow-sm mb-8"
              style={{ aspectRatio: `${template.width} / ${template.height}` }}
            >
              <RemotionPlayer templateId={template.id} />
            </div>

            {template.htmlInCanvas && (
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3.5 mb-8">
                <div className="flex items-start gap-3">
                  <FlaskConical className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <div className="space-y-1.5">
                    <p className="text-sm font-semibold text-amber-900">
                      Beta — Requires HTML-in-Canvas
                    </p>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      The full CRT WebGL effects use Remotion&apos;s{" "}
                      <a
                        href="https://www.remotion.dev/docs/html-in-canvas"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline underline-offset-2 hover:text-amber-900"
                      >
                        HTML-in-Canvas API
                      </a>
                      , which is experimental and only available in{" "}
                      <a
                        href="https://www.google.com/chrome/canary/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium underline underline-offset-2 hover:text-amber-900"
                      >
                        Chrome Canary
                      </a>
                      . To preview in Remotion Studio:
                    </p>
                    <ol className="text-xs text-amber-800 list-decimal list-inside space-y-0.5 pl-0.5">
                      <li>Install Chrome Canary (v149+)</li>
                      <li>
                        Open{" "}
                        <code className="bg-amber-100 px-1 rounded font-mono text-amber-900">
                          chrome://flags/#canvas-draw-element
                        </code>
                      </li>
                      <li>Set the flag to <strong>Enabled</strong> and restart</li>
                    </ol>
                    <p className="text-xs text-amber-700">
                      Rendering via <code className="bg-amber-100 px-1 rounded font-mono">remotion render</code> works without any extra setup. For WebGL shaders, add{" "}
                      <code className="bg-amber-100 px-1 rounded font-mono">--gl=angle</code>.
                    </p>
                  </div>
                  <a
                    href="https://www.remotion.dev/docs/html-in-canvas"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto shrink-0 text-amber-500 hover:text-amber-700"
                    aria-label="Open HTML-in-Canvas docs"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                  Render CLI
                </p>
                <div className="relative rounded-xl bg-zinc-950 border border-zinc-800 p-4">
                  <pre className="text-xs text-zinc-300 font-mono overflow-x-auto">
                    {renderCmd}
                  </pre>
                  <TemplateCopyButton text={renderCmd} label="Copy command" />
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-2">
                  Composition code
                </p>
                <CollapsibleCode code={codeSnippet} />
              </div>
            </div>
          </div>

          <div className="lg:sticky lg:top-28 space-y-6">
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
                    href={`/templates?tag=${encodeURIComponent(tag)}`}
                    className={`px-3 py-1 rounded-full text-xs font-semibold border transition-opacity hover:opacity-80 ${
                      TAG_COLORS[tag] ?? "bg-zinc-100 text-zinc-500 border-zinc-200"
                    }`}
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            </div>

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

            <div className="space-y-2">
              <TemplateCopyButton
                text={codeSnippet}
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

            <p className="text-xs text-zinc-400 leading-relaxed">
              This is a free, open-source template. Copy the code and drop it into your Remotion project.
            </p>
          </div>
        </div>

        <RelatedTemplates templates={related} />
      </main>

      <Footer />
    </div>
  );
}

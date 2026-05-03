"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookOpen, PackageOpen, Rocket, Layers, Scissors, Music, ArrowRight, Video, Terminal, BookMarked, ChevronDown } from "lucide-react";
import { clsx } from "clsx";

function C({ children }: { children: React.ReactNode }) {
  return <code className="px-1.5 py-0.5 rounded-md bg-zinc-100 text-zinc-800 text-[0.85em] font-mono border border-zinc-200">{children}</code>;
}
function CB({ children, label }: { children: string; label?: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-zinc-200 my-5">
      {label && <div className="bg-zinc-100 border-b border-zinc-200 px-4 py-2 text-[11px] font-mono text-zinc-500">{label}</div>}
      <pre className="bg-zinc-900 text-zinc-100 text-sm font-mono p-5 overflow-x-auto leading-relaxed whitespace-pre"><code>{children}</code></pre>
    </div>
  );
}
function Note({ type = "info", children }: { type?: "info" | "tip" | "warn"; children: React.ReactNode }) {
  const s = { info: "bg-indigo-50 border-indigo-200 text-indigo-900", tip: "bg-green-50 border-green-200 text-green-900", warn: "bg-amber-50 border-amber-200 text-amber-900" }[type];
  const p = { info: "ℹ️", tip: "💡", warn: "⚠️" }[type];
  return <div className={`border rounded-xl px-5 py-4 my-5 text-sm leading-relaxed ${s}`}>{p} {children}</div>;
}
function ExtLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">{children}</a>;
}
function DocRef({ href, label }: { href: string; label: string }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-700 text-sm font-medium hover:bg-indigo-100 transition-colors">
      <BookOpen className="w-3.5 h-3.5 shrink-0" />
      {label}
      <ArrowRight className="w-3 h-3 ml-auto" />
    </a>
  );
}

const DOCS_CONTENT: Record<string, { title: string; content: React.ReactNode }> = {
  introduction: {
    title: "Introduction",
    content: (
      <>
        <p className="text-xl text-zinc-500 font-light leading-relaxed mb-6">
          SwiftClip is a curated library of production-ready <ExtLink href="https://remotion.dev">Remotion</ExtLink> video templates written entirely in React and TypeScript.
        </p>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Instead of dragging keyframes in After Effects or Premiere, you write React components. Remotion maps every frame of your video to a point in time, so you can use <C>useCurrentFrame()</C> to drive any CSS property, SVG attribute, or Canvas draw call with frame-perfect precision.
        </p>
        <p className="text-zinc-600 leading-relaxed mb-8">
          SwiftClip packages the best-practice patterns on top of Remotion into copy-paste compositions. Each template is a single <C>.tsx</C> file with fully typed props — no configuration required beyond dropping it into your <C>remotion/</C> folder.
        </p>

        <hr className="border-zinc-100 my-8" />

        <h2 className="text-2xl font-bold text-zinc-900 mb-5">Why code over a timeline?</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          {[
            ["🔀 Version Control", "Every keyframe change is a Git commit. Review, revert, and diff animations like any other code."],
            ["⚡ Dynamic Data", "Pass a JSON payload at render time to generate hundreds of personalised videos from a single template."],
            ["♻️ Reusability", "Build a <LowerThird> component once and import it across every composition in your library."],
            ["🚀 Performance", "Remotion parallelises rendering across all CPU cores. A 30-second 4K video renders in seconds on modern hardware."],
            ["🧩 Full Web Stack", "Anything that runs in a browser — CSS animations, SVG, WebGL, Lottie, charts — works inside a Remotion composition."],
            ["🔗 CI/CD Ready", "Render videos headlessly in GitHub Actions, Docker, or any Node.js environment."],
          ].map(([t, b]) => (
            <div key={String(t)} className="bg-zinc-50 border border-zinc-100 rounded-2xl p-5">
              <p className="font-semibold text-zinc-900 mb-1.5 text-sm">{t}</p>
              <p className="text-zinc-500 text-sm leading-relaxed">{b}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mb-4">How Remotion works</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Remotion uses <ExtLink href="https://remotion.dev/docs/the-fundamentals">the concept of a "current frame"</ExtLink>. When you call <C>useCurrentFrame()</C> inside a component, Remotion passes a different integer on every render pass — from <C>0</C> to <C>durationInFrames - 1</C>. FFmpeg then stitches all those frames into a video file.
        </p>
        <CB label="Example — frame-driven animation">{`import { useCurrentFrame, interpolate } from 'remotion';

export function FadeIn() {
  const frame = useCurrentFrame();

  // Interpolate opacity from 0→1 over the first 20 frames
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return <div style={{ opacity }}>Hello, Remotion!</div>;
}`}</CB>

        <div className="flex flex-wrap gap-3 mt-6">
          <DocRef href="https://remotion.dev/docs" label="Remotion official docs" />
          <DocRef href="https://remotion.dev/docs/the-fundamentals" label="The fundamentals" />
        </div>
      </>
    ),
  },
  installation: {
    title: "Installation",
    content: (
      <>
        <p className="text-xl text-zinc-500 font-light leading-relaxed mb-8">
          Get a Remotion project running locally in under 2 minutes.
        </p>

        <Note type="info">
          SwiftClip supports two setup paths: copy-paste templates into a Remotion project, or install the Claude Code marketplace workflow to align briefs, generate a derivative component, and register it in <C>remotion/Root.tsx</C>.
        </Note>

        <h2 className="text-2xl font-bold text-zinc-900 mb-4">Prerequisites</h2>
        <div className="border border-zinc-200 rounded-2xl overflow-hidden mb-8">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-zinc-700">Requirement</th>
                <th className="px-4 py-3 font-semibold text-zinc-700">Minimum version</th>
                <th className="px-4 py-3 font-semibold text-zinc-700">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              <tr><td className="px-4 py-3 font-medium text-zinc-800">Node.js</td><td className="px-4 py-3 text-zinc-500">v16</td><td className="px-4 py-3 text-zinc-400">v18+ recommended</td></tr>
              <tr><td className="px-4 py-3 font-medium text-zinc-800">Package manager</td><td className="px-4 py-3 text-zinc-500">npm / yarn / pnpm / bun</td><td className="px-4 py-3 text-zinc-400">Any works</td></tr>
              <tr><td className="px-4 py-3 font-medium text-zinc-800">Chrome / Chromium</td><td className="px-4 py-3 text-zinc-500">Auto-installed</td><td className="px-4 py-3 text-zinc-400">Used for rendering frames</td></tr>
              <tr><td className="px-4 py-3 font-medium text-zinc-800">FFmpeg</td><td className="px-4 py-3 text-zinc-500">Auto-installed</td><td className="px-4 py-3 text-zinc-400">Used for encoding the final video</td></tr>
            </tbody>
          </table>
        </div>
        <Note type="info">
          Remotion automatically downloads a compatible Chromium and FFmpeg binary into <C>node_modules</C> on first install — you don&apos;t need to install them globally.
        </Note>

        <h2 className="text-2xl font-bold text-zinc-900 mb-3 mt-10">1. Scaffold a new project</h2>
        <CB label="Terminal">{`npx create-video@latest`}</CB>
        <p className="text-zinc-600 leading-relaxed mb-2">
          You&apos;ll be prompted to pick a starter template. For a blank canvas, choose <strong className="text-zinc-800">Hello World</strong>. The CLI creates a project folder, installs dependencies, and sets up <C>remotion/Root.tsx</C> automatically.
        </p>
        <CB label="Terminal">{`cd my-video-project`}</CB>

        <h2 className="text-2xl font-bold text-zinc-900 mb-3 mt-10">2. Open Remotion Studio</h2>
        <CB label="Terminal">{`npm run dev`}</CB>
        <p className="text-zinc-600 leading-relaxed mb-2">
          This starts the Remotion Studio at <C>localhost:3000</C>. You can scrub the timeline, edit props, and export compositions directly from the browser UI.
        </p>
        <Note type="tip">
          Keep the Studio open while you edit your <C>.tsx</C> files — changes hot-reload instantly without re-running the command.
        </Note>

        <h2 className="text-2xl font-bold text-zinc-900 mb-3 mt-10">3. Add a SwiftClip template</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Browse the <Link href="/templates" className="text-indigo-600 hover:underline">Template Library</Link>, click <strong className="text-zinc-800">Copy code</strong> on any card, and paste the file into <C>remotion/</C>.
          Then register it in <C>remotion/Root.tsx</C>:
        </p>
        <CB label="remotion/Root.tsx">{`import { Composition } from 'remotion';
import { ProductLaunch } from './ProductLaunch';

export const RemotionRoot = () => (
  <Composition
    id="ProductLaunch"
    component={ProductLaunch}
    durationInFrames={450}
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{ title: 'My Product', subtitle: 'Ship faster.' }}
  />
);`}</CB>

        <div className="flex flex-wrap gap-3 mt-6">
          <DocRef href="https://remotion.dev/docs" label="Remotion getting started" />
          <DocRef href="https://remotion.dev/docs/brownfield" label="Add to existing project" />
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mb-3 mt-10">4. Enable the Claude workflow</h2>
        <p className="text-zinc-600 leading-relaxed mb-4">
          If you want SwiftClip to help plan the brief, choose an internal base template, emit a preflight JSON plus storyboard, and then generate a component for you, install the Claude Code marketplace plugin inside your existing Remotion project.
        </p>
        <Note type="warn">
          The Claude workflow is not a replacement for Remotion setup. You still need a working Remotion project with <C>remotion</C> installed and a <C>remotion/Root.tsx</C> file before enabling it.
        </Note>
        <CB label="Claude Code">{`/plugin marketplace add zz41354899/SwiftClip
/plugin install swiftclip-remotion@swiftclip-tools
/reload-plugins`}</CB>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Prefer the CLI form? Run the following from your Remotion project root:
        </p>
        <CB label="Terminal">{`claude plugin marketplace add zz41354899/SwiftClip
claude plugin install swiftclip-remotion@swiftclip-tools --scope project`}</CB>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Once enabled, the workflow guides the user through brief alignment, recommends one internal execution base, confirms storyboard beats, generates a derivative component under <C>remotion/</C>, and registers the matching <C>{"<Composition>"}</C> in <C>remotion/Root.tsx</C>.
        </p>
        <div className="flex flex-wrap gap-3 mt-6">
          <DocRef href="https://code.claude.com/docs/zh-TW/discover-plugins" label="Claude plugin install docs" />
          <DocRef href="https://code.claude.com/docs/zh-TW/plugin-marketplaces" label="Claude marketplace publish docs" />
        </div>
      </>
    ),
  },
  "quick-start": {
    title: "Quick Start",
    content: (
      <>
        <p className="text-xl text-zinc-500 font-light leading-relaxed mb-8">
          Your first rendered video in under 5 minutes.
        </p>

        <div className="space-y-8">
          {/* Step 1 */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-900 text-white text-xs font-bold shrink-0">1</span>
              <h2 className="text-xl font-bold text-zinc-900">Pick a template</h2>
            </div>
            <p className="text-zinc-600 mb-3 ml-10">
              Go to the <Link href="/templates" className="text-indigo-600 hover:underline">Template Library</Link> and find a composition that fits your use case. Click the card to preview the video, then click <strong className="text-zinc-800">Copy code</strong>.
            </p>
            <p className="text-zinc-600 ml-10">Paste the file into your <C>remotion/</C> folder — e.g. <C>remotion/ProductLaunch.tsx</C>.</p>
          </div>

          {/* Step 2 */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-900 text-white text-xs font-bold shrink-0">2</span>
              <h2 className="text-xl font-bold text-zinc-900">Register the composition</h2>
            </div>
            <p className="text-zinc-600 mb-3 ml-10">Import your template in <C>remotion/Root.tsx</C> and wrap it in a <C>{"<Composition>"}</C>:</p>
            <div className="ml-10">
              <CB label="remotion/Root.tsx">{`import { Composition } from 'remotion';
import { ProductLaunch } from './ProductLaunch';

export const RemotionRoot = () => (
  <Composition
    id="ProductLaunch"
    component={ProductLaunch}
    durationInFrames={450}   // 15 s at 30 fps
    fps={30}
    width={1920}
    height={1080}
    defaultProps={{
      title: 'My Product',
      subtitle: 'Ship faster with Remotion',
      accentColor: '#6366f1',
    }}
  />
);`}</CB>
            </div>
          </div>

          {/* Step 3 */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-900 text-white text-xs font-bold shrink-0">3</span>
              <h2 className="text-xl font-bold text-zinc-900">Preview in Remotion Studio</h2>
            </div>
            <div className="ml-10">
              <CB label="Terminal">{`npm run dev`}</CB>
              <p className="text-zinc-600">
                Open <C>localhost:3000</C> and your composition will appear in the sidebar. Scrub the timeline, edit <C>defaultProps</C> live, and check every frame before rendering.
              </p>
            </div>
          </div>

          {/* Step 4 */}
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-zinc-900 text-white text-xs font-bold shrink-0">4</span>
              <h2 className="text-xl font-bold text-zinc-900">Render to MP4</h2>
            </div>
            <div className="ml-10">
              <CB label="Terminal">{`npx remotion render remotion/index.tsx ProductLaunch output.mp4`}</CB>
              <p className="text-zinc-600 mb-3">
                Remotion opens Chrome headlessly, captures every frame, and encodes the result with FFmpeg. Output quality defaults to H.264 at CRF 18 — broadcast-ready out of the box.
              </p>
              <Note type="tip">
                Speed up rendering by adding <C>--concurrency=8</C> to use 8 parallel Chrome threads. On an M-series Mac, most 30-second compositions render in under 30 seconds.
              </Note>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-8">
          <DocRef href="https://remotion.dev/docs/the-fundamentals" label="Remotion fundamentals" />
          <DocRef href="https://remotion.dev/docs/render" label="Render API reference" />
        </div>
      </>
    ),
  },
  compositions: {
    title: "Compositions",
    content: (
      <>
        <p className="text-xl text-zinc-500 font-light leading-relaxed mb-6">
          A <strong>Composition</strong> is the root unit of every Remotion video — it defines the canvas size, frame rate, duration, and the React component to render.
        </p>
        <p className="text-zinc-600 leading-relaxed mb-6">
          All compositions are registered in <C>remotion/Root.tsx</C> by returning one or more <C>{"<Composition>"}</C> elements from your <C>RemotionRoot</C> component. You can register as many as you like — each appears as a separate entry in Remotion Studio.
        </p>

        <CB label="remotion/Root.tsx">{`import { Composition } from 'remotion';
import { ProductLaunch } from './ProductLaunch';
import { SocialStory } from './SocialStory';

export const RemotionRoot = () => (
  <>
    <Composition
      id="ProductLaunch"        // Used in the render CLI command
      component={ProductLaunch}
      durationInFrames={450}    // Total frames (450 / 30fps = 15 s)
      fps={30}
      width={1920}
      height={1080}
      defaultProps={{ title: 'My Product' }}
    />
    <Composition
      id="SocialStory"
      component={SocialStory}
      durationInFrames={300}    // 10 s
      fps={30}
      width={1080}
      height={1920}             // 9:16 portrait for Reels / TikTok
      defaultProps={{ headline: 'New drop 🔥' }}
    />
  </>
);`}</CB>

        <h2 className="text-2xl font-bold text-zinc-900 mb-4 mt-10">Key props</h2>
        <div className="border border-zinc-200 rounded-2xl overflow-hidden mb-6">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-zinc-700">Prop</th>
                <th className="px-4 py-3 font-semibold text-zinc-700">Type</th>
                <th className="px-4 py-3 font-semibold text-zinc-700">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-600">
              <tr><td className="px-4 py-3 font-mono text-xs text-indigo-700">id</td><td className="px-4 py-3">string</td><td className="px-4 py-3">Unique identifier, used in CLI render command</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs text-indigo-700">component</td><td className="px-4 py-3">React component</td><td className="px-4 py-3">The component to render on every frame</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs text-indigo-700">durationInFrames</td><td className="px-4 py-3">number</td><td className="px-4 py-3">Total video length in frames (<C>seconds × fps</C>)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs text-indigo-700">fps</td><td className="px-4 py-3">number</td><td className="px-4 py-3">Frames per second — typically 24, 30, or 60</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs text-indigo-700">width / height</td><td className="px-4 py-3">number</td><td className="px-4 py-3">Canvas dimensions in pixels</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs text-indigo-700">defaultProps</td><td className="px-4 py-3">object</td><td className="px-4 py-3">Initial prop values shown in Remotion Studio</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mb-4 mt-10">useCurrentFrame & interpolate</h2>
        <p className="text-zinc-600 mb-3">Inside any composition component, use these two hooks to drive animations:</p>
        <CB label="Example">{`import { useCurrentFrame, interpolate } from 'remotion';

export function Title({ text }: { text: string }) {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const y = interpolate(frame, [0, 20], [24, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <h1 style={{ opacity, transform: \`translateY(\${y}px)\` }}>
      {text}
    </h1>
  );
}`}</CB>
        <Note type="info">
          <C>interpolate(frame, inputRange, outputRange)</C> is Remotion&apos;s core animation primitive — it maps a frame number to any numeric value (opacity, scale, position, color channel, etc.).
        </Note>

        <div className="flex flex-wrap gap-3 mt-6">
          <DocRef href="https://remotion.dev/docs/composition" label="<Composition> API" />
          <DocRef href="https://remotion.dev/docs/use-current-frame" label="useCurrentFrame()" />
          <DocRef href="https://remotion.dev/docs/interpolate" label="interpolate()" />
        </div>
      </>
    ),
  },
  sequences: {
    title: "Sequences",
    content: (
      <>
        <p className="text-xl text-zinc-500 font-light leading-relaxed mb-6">
          <C>{"<Sequence>"}</C> lets you offset and clip child components in time — it&apos;s the primary tool for composing multi-part animations.
        </p>
        <p className="text-zinc-600 leading-relaxed mb-4">
          Wrapping a component in <C>{"<Sequence from={30}>"}</C> shifts its internal frame counter so that <C>useCurrentFrame()</C> returns <C>0</C> when the outer video is at frame 30. This means you can write every sub-component as if it starts at frame 0, and position it anywhere in the timeline by changing the <C>from</C> prop.
        </p>

        <CB label="Multi-part composition">{`import { Sequence } from 'remotion';
import { Logo } from './Logo';
import { Headline } from './Headline';
import { CTA } from './CTA';

export function ProductLaunch() {
  return (
    <>
      {/* Logo fades in immediately */}
      <Sequence from={0} durationInFrames={60}>
        <Logo />
      </Sequence>

      {/* Headline starts at frame 30 (1 s) */}
      <Sequence from={30}>
        <Headline text="Introducing SwiftClip" />
      </Sequence>

      {/* CTA appears at frame 90 (3 s) */}
      <Sequence from={90}>
        <CTA label="Get started free" />
      </Sequence>
    </>
  );
}`}</CB>

        <h2 className="text-2xl font-bold text-zinc-900 mb-4 mt-10">Key props</h2>
        <div className="border border-zinc-200 rounded-2xl overflow-hidden mb-6">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-zinc-700">Prop</th>
                <th className="px-4 py-3 font-semibold text-zinc-700">Type</th>
                <th className="px-4 py-3 font-semibold text-zinc-700">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-600">
              <tr><td className="px-4 py-3 font-mono text-xs text-indigo-700">from</td><td className="px-4 py-3">number</td><td className="px-4 py-3">The frame at which the sequence starts (default: 0)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs text-indigo-700">durationInFrames</td><td className="px-4 py-3">number</td><td className="px-4 py-3">How many frames the sequence lasts. Omit to run to end.</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs text-indigo-700">name</td><td className="px-4 py-3">string</td><td className="px-4 py-3">Label shown in Remotion Studio timeline (optional)</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs text-indigo-700">layout</td><td className="px-4 py-3">"absolute-fill" | "none"</td><td className="px-4 py-3">CSS layout of the sequence container (default: absolute-fill)</td></tr>
            </tbody>
          </table>
        </div>

        <Note type="tip">
          Use <C>{"<Series>"}</C> from <C>remotion</C> when you want sequences to play one after another automatically — it calculates <C>from</C> values for you based on each child&apos;s <C>durationInFrames</C>.
        </Note>
        <CB label="Series example">{`import { Series } from 'remotion';

export function Slideshow() {
  return (
    <Series>
      <Series.Sequence durationInFrames={60}><Slide1 /></Series.Sequence>
      <Series.Sequence durationInFrames={90}><Slide2 /></Series.Sequence>
      <Series.Sequence durationInFrames={60}><Slide3 /></Series.Sequence>
    </Series>
  );
}`}</CB>

        <div className="flex flex-wrap gap-3 mt-6">
          <DocRef href="https://remotion.dev/docs/sequence" label="<Sequence> API" />
          <DocRef href="https://remotion.dev/docs/series" label="<Series> API" />
        </div>
      </>
    ),
  },
  "audio-assets": {
    title: "Audio & Assets",
    content: (
      <>
        <p className="text-xl text-zinc-500 font-light leading-relaxed mb-6">
          Remotion provides first-class support for audio tracks, video clips, images, and fonts — all synced to the composition&apos;s frame clock.
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 mb-3">Static assets with staticFile()</h2>
        <p className="text-zinc-600 mb-3">
          Place any file in the <C>public/</C> folder and reference it with <C>staticFile()</C>. This works for audio, video, images, fonts, and JSON data.
        </p>
        <CB label="remotion/MyComp.tsx">{`import { Audio, Img, staticFile } from 'remotion';

export function MyComp() {
  return (
    <>
      {/* Background music at 40% volume */}
      <Audio src={staticFile('music/bg-track.mp3')} volume={0.4} />

      {/* Logo image */}
      <Img src={staticFile('images/logo.png')} style={{ width: 200 }} />
    </>
  );
}`}</CB>

        <h2 className="text-2xl font-bold text-zinc-900 mb-3 mt-10">{"<Audio>"} props</h2>
        <div className="border border-zinc-200 rounded-2xl overflow-hidden mb-6">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-zinc-700">Prop</th>
                <th className="px-4 py-3 font-semibold text-zinc-700">Type</th>
                <th className="px-4 py-3 font-semibold text-zinc-700">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-600">
              <tr><td className="px-4 py-3 font-mono text-xs text-indigo-700">src</td><td className="px-4 py-3">string</td><td className="px-4 py-3">URL or <C>staticFile()</C> path to audio file</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs text-indigo-700">volume</td><td className="px-4 py-3">number | function</td><td className="px-4 py-3">0–1 scalar, or a frame-by-frame function for fades</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs text-indigo-700">startFrom</td><td className="px-4 py-3">number</td><td className="px-4 py-3">Skip the first N frames of the audio source</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs text-indigo-700">endAt</td><td className="px-4 py-3">number</td><td className="px-4 py-3">Stop playing after this frame</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs text-indigo-700">loop</td><td className="px-4 py-3">boolean</td><td className="px-4 py-3">Loop the audio until the composition ends</td></tr>
              <tr><td className="px-4 py-3 font-mono text-xs text-indigo-700">playbackRate</td><td className="px-4 py-3">number</td><td className="px-4 py-3">Speed multiplier (0.5 = half speed, 2 = double)</td></tr>
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mb-3 mt-10">Volume fade example</h2>
        <p className="text-zinc-600 mb-3">Pass a function to <C>volume</C> to animate it over time — great for fade-ins and fade-outs:</p>
        <CB label="Fade in over 30 frames, fade out over last 30">{`import { Audio, staticFile, interpolate } from 'remotion';

const DURATION = 300; // composition durationInFrames

export function WithMusic() {
  return (
    <Audio
      src={staticFile('music/bg.mp3')}
      volume={(frame) =>
        interpolate(
          frame,
          [0, 30, DURATION - 30, DURATION],
          [0, 1, 1, 0],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        )
      }
    />
  );
}`}</CB>

        <h2 className="text-2xl font-bold text-zinc-900 mb-3 mt-10">Embedding video clips</h2>
        <CB label="Embed a video clip">{`import { Video, staticFile, Sequence } from 'remotion';

export function WithClip() {
  return (
    <Sequence from={30}>
      <Video
        src={staticFile('clips/product-demo.mp4')}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        volume={0}         // mute the clip's own audio
        startFrom={0}
      />
    </Sequence>
  );
}`}</CB>
        <Note type="warn">
          Remote URLs (e.g. from a CDN) are supported but must be accessible at render time. Use <C>delayRender()</C> and <C>continueRender()</C> to wait for async resources before frame capture begins.
        </Note>

        <div className="flex flex-wrap gap-3 mt-6">
          <DocRef href="https://remotion.dev/docs/audio" label="<Audio> API" />
          <DocRef href="https://remotion.dev/docs/video" label="<Video> API" />
          <DocRef href="https://remotion.dev/docs/staticfile" label="staticFile()" />
          <DocRef href="https://remotion.dev/docs/delay-render" label="delayRender()" />
        </div>
      </>
    ),
  },
  rendering: {
    title: "Rendering",
    content: (
      <>
        <p className="text-xl text-zinc-500 font-light leading-relaxed mb-6">
          Remotion renders every frame by screenshotting it in headless Chrome, then encodes the frame sequence into a video file using FFmpeg — meaning any CSS, SVG, or Canvas effect works perfectly.
        </p>

        <h2 className="text-2xl font-bold text-zinc-900 mb-3">Basic render command</h2>
        <CB label="Terminal">{`npx remotion render <entry-file> <composition-id> <output-file>`}</CB>
        <CB label="Example">{`npx remotion render remotion/index.tsx ProductLaunch output.mp4`}</CB>

        <h2 className="text-2xl font-bold text-zinc-900 mb-3 mt-10">Common flags</h2>
        <div className="space-y-3 mb-6">
          {[
            { flag: "--concurrency=<n>", desc: "Number of parallel Chrome tabs. Defaults to 50% of CPU cores. Increase for faster renders on multi-core machines." },
            { flag: "--codec=h264 | h265 | vp8 | vp9 | prores | gif", desc: "Output codec. Defaults to h264. Use prores for post-production, vp8/vp9 for transparency." },
            { flag: "--crf=<0-51>", desc: "Constant Rate Factor — lower = higher quality, larger file. Default is 18 (near-lossless)." },
            { flag: "--frames=<from>-<to>", desc: "Only render a sub-range of frames. Useful for previewing a section." },
            { flag: "--props='{...}'", desc: "Override defaultProps at render time. Accepts a JSON string." },
            { flag: "--scale=<n>", desc: "Scale the output canvas. Use 2 for 2× resolution (e.g. 4K from a 1080p composition)." },
            { flag: "--muted", desc: "Strip all audio from the output file." },
            { flag: "--image-format=png | jpeg", desc: "Export as individual image frames instead of a video." },
          ].map(({ flag, desc }) => (
            <div key={flag} className="border border-zinc-200 rounded-xl p-4">
              <code className="block text-xs font-mono text-indigo-700 mb-1.5">{flag}</code>
              <p className="text-zinc-500 text-sm">{desc}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mb-3 mt-10">Output format guide</h2>
        <div className="border border-zinc-200 rounded-2xl overflow-hidden mb-6">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 border-b border-zinc-200">
              <tr>
                <th className="px-4 py-3 font-semibold text-zinc-700">Format</th>
                <th className="px-4 py-3 font-semibold text-zinc-700">Flag</th>
                <th className="px-4 py-3 font-semibold text-zinc-700">Best for</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 text-zinc-600">
              {[
                ["MP4 (H.264)", "--codec=h264", "Web, social media, universal delivery"],
                ["MP4 (H.265/HEVC)", "--codec=h265", "Smaller files on modern devices"],
                ["WebM (VP8)", "--codec=vp8", "Browser video with alpha transparency"],
                ["WebM (VP9)", "--codec=vp9", "Better quality than VP8, still supports alpha"],
                ["ProRes 4444", "--codec=prores", "Post-production: DaVinci Resolve, After Effects"],
                ["GIF", "--codec=gif", "Short loops for docs, Slack, email"],
                ["PNG sequence", "--image-format=png", "Frame-by-frame compositing in other tools"],
              ].map(([fmt, flag, use]) => (
                <tr key={String(fmt)} className="hover:bg-zinc-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-zinc-800">{fmt}</td>
                  <td className="px-4 py-3 font-mono text-xs text-indigo-700">{flag}</td>
                  <td className="px-4 py-3 text-zinc-500">{use}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="text-2xl font-bold text-zinc-900 mb-3 mt-10">Render at 4K</h2>
        <CB label="Terminal">{`# Scale a 1920×1080 composition up to 3840×2160
npx remotion render remotion/index.tsx ProductLaunch output-4k.mp4 \\
  --scale=2 \\
  --codec=prores`}</CB>

        <h2 className="text-2xl font-bold text-zinc-900 mb-3 mt-10">Serverless rendering with Lambda</h2>
        <p className="text-zinc-600 mb-3">
          <ExtLink href="https://remotion.dev/lambda">Remotion Lambda</ExtLink> lets you offload rendering to AWS Lambda for massive parallelism. A 10-minute video can be split across hundreds of Lambda functions and rendered in under a minute.
        </p>
        <CB label="Terminal">{`# Install the Lambda package
npm i @remotion/lambda

# Deploy a Lambda function
npx remotion lambda functions deploy

# Render via Lambda
npx remotion lambda render remotion/index.tsx ProductLaunch \\
  --region=us-east-1`}</CB>
        <Note type="warn">
          Remotion Lambda requires an AWS account with appropriate IAM permissions. See the <ExtLink href="https://remotion.dev/docs/lambda/setup">Lambda setup guide</ExtLink> before deploying.
        </Note>

        <div className="flex flex-wrap gap-3 mt-6">
          <DocRef href="https://remotion.dev/docs/render" label="Render CLI reference" />
          <DocRef href="https://remotion.dev/docs/encoding" label="Encoding guide" />
          <DocRef href="https://remotion.dev/docs/lambda" label="Remotion Lambda" />
        </div>
      </>
    ),
  },
};

const SIDEBAR_NAV = [
  {
    group: "Getting Started",
    items: [
      { id: "introduction", label: "Introduction", icon: BookOpen },
      { id: "installation", label: "Installation", icon: PackageOpen },
      { id: "quick-start", label: "Quick Start", icon: Rocket },
    ],
  },
  {
    group: "Core Concepts",
    items: [
      { id: "compositions", label: "Compositions", icon: Layers },
      { id: "sequences", label: "Sequences", icon: Scissors },
      { id: "audio-assets", label: "Audio & Assets", icon: Music },
      { id: "rendering", label: "Rendering", icon: Video },
    ],
  },
];

export default function DocsPage() {
  const [activeId, setActiveId] = useState("introduction");
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const doc = DOCS_CONTENT[activeId];
  const activeItem = SIDEBAR_NAV.flatMap(s => s.items).find(i => i.id === activeId);

  return (
    <div className="min-h-screen bg-white selection:bg-indigo-100 flex flex-col">
      <Navbar />

      {/* Mobile sidebar-style nav — visible below md */}
      <div className="md:hidden max-w-[1400px] w-full mx-auto px-6 pt-24 pb-2">
        {/* Toggle button */}
        <button
          onClick={() => setMobileNavOpen(!mobileNavOpen)}
          className="flex items-center gap-2.5 w-full px-4 py-2.5 rounded-xl border border-zinc-200 bg-white text-sm font-medium text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 transition-all shadow-sm mb-3"
        >
          <BookMarked className="w-4 h-4 text-zinc-400" />
          <span className="flex-1 text-left">
            {activeItem ? activeItem.label : "Docs"}
          </span>
          <ChevronDown
            className={clsx(
              "w-4 h-4 text-zinc-400 transition-transform duration-200",
              mobileNavOpen && "rotate-180"
            )}
          />
        </button>

        {/* Expandable nav panel */}
        <AnimatePresence>
          {mobileNavOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.22, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="bg-white border border-zinc-200 rounded-2xl p-4 shadow-sm mb-4">
                {SIDEBAR_NAV.map((section) => (
                  <div key={section.group} className="mb-4 last:mb-0">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 mb-2 px-1">
                      {section.group}
                    </p>
                    <div className="flex flex-col gap-0.5">
                      {section.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => { setActiveId(item.id); setMobileNavOpen(false); }}
                          className={clsx(
                            "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left",
                            activeId === item.id
                              ? "bg-zinc-100 text-indigo-600"
                              : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                          )}
                        >
                          <item.icon className="w-4 h-4 shrink-0" />
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex-1 max-w-[1400px] w-full mx-auto px-6 flex flex-col md:flex-row gap-12 pt-6 md:pt-32 pb-12">
        {/* Sidebar Navigation — desktop only */}
        <aside className="hidden md:block md:w-56 shrink-0">
          <div className="sticky top-36 space-y-7">
            {SIDEBAR_NAV.map((section) => (
              <div key={section.group}>
                <h4 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-3 px-2">
                  {section.group}
                </h4>
                <ul className="space-y-0.5">
                  {section.items.map((item) => (
                    <li key={item.id}>
                      <button
                        onClick={() => setActiveId(item.id)}
                        className={clsx(
                          "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 text-left",
                          activeId === item.id
                            ? "bg-zinc-100 text-indigo-600"
                            : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
                        )}
                      >
                        <item.icon className="w-4 h-4 shrink-0" />
                        {item.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 min-w-0 pb-20 md:border-l md:border-zinc-100 md:pl-10">
          <h1 className="text-4xl font-bold text-zinc-900 mb-8 tracking-tight">{doc.title}</h1>
          <div className="max-w-3xl">
            {doc.content}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

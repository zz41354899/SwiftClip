"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Play, Loader2 } from "lucide-react";
import { templates } from "@/lib/templates";
import { TEMPLATE_LOADERS } from "@/lib/templateLoaders";

/**
 * The Player bundle is only imported on the client AND only after the user
 * clicks play (or when an idle callback warms it up), so idle visitors and
 * SSR never pay for it.
 */
const Player = dynamic(
  () => import("@remotion/player").then((m) => m.Player),
  { ssr: false, loading: () => null }
);

/** Schedule low-priority work without competing with critical rendering. */
function whenIdle(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const w = window as Window & {
    requestIdleCallback?: (cb: IdleRequestCallback, opts?: IdleRequestOptions) => number;
    cancelIdleCallback?: (handle: number) => void;
  };
  if (typeof w.requestIdleCallback === "function") {
    const id = w.requestIdleCallback(() => cb(), { timeout: 2000 });
    return () => w.cancelIdleCallback?.(id);
  }
  const id = window.setTimeout(cb, 600);
  return () => window.clearTimeout(id);
}

export function RemotionPlayer({ templateId }: { templateId: string }) {
  const t = templates.find((x) => x.id === templateId);
  const loader = TEMPLATE_LOADERS[templateId];

  // 1) Static thumbnail until the user clicks.
  // 2) Show a spinner while chunks resolve.
  // 3) Mount the Player once the chunks are ready.
  const [phase, setPhase] = useState<"poster" | "loading" | "playing">("poster");
  const cleanupRef = useRef<(() => void) | null>(null);

  // Warm chunks during browser idle time (after first paint, low priority).
  useEffect(() => {
    if (!loader || phase !== "poster") return;
    const cancel = whenIdle(() => {
      void import("@remotion/player");
      void loader();
    });
    return cancel;
  }, [loader, phase]);

  // Cancel any in-flight watchers on unmount.
  useEffect(() => () => cleanupRef.current?.(), []);

  const handlePlay = useCallback(() => {
    if (!loader) return;
    setPhase("loading");
    Promise.all([import("@remotion/player"), loader()])
      .then(() => setPhase("playing"))
      .catch(() => setPhase("poster"));
  }, [loader]);

  if (!t || !loader) {
    return (
      <div className="absolute inset-0">
        <Image
          src={`/thumbnails/${templateId}.jpg`}
          alt={t?.title ?? templateId}
          fill
          sizes="(max-width: 1024px) 100vw, 680px"
          priority
          className="object-cover"
        />
      </div>
    );
  }

  if (phase === "playing") {
    return (
      <div className="absolute inset-0">
        <Player
          lazyComponent={loader}
          durationInFrames={t.durationInFrames}
          fps={t.fps}
          compositionWidth={t.width}
          compositionHeight={t.height}
          style={{ width: "100%", height: "100%" }}
          controls
          autoPlay
          loop
          initiallyMuted
          clickToPlay
          doubleClickToFullscreen
          spaceKeyToPlayOrPause
          acknowledgeRemotionLicense
        />
      </div>
    );
  }

  const isLoading = phase === "loading";
  return (
    <button
      type="button"
      onClick={handlePlay}
      disabled={isLoading}
      aria-label={`Play ${t.title}`}
      className="group absolute inset-0 block cursor-pointer disabled:cursor-wait"
    >
      <Image
        src={`/thumbnails/${templateId}.jpg`}
        alt={t.title}
        fill
        sizes="(max-width: 1024px) 100vw, 680px"
        priority
        className="object-cover"
      />
      <div
        className={`absolute inset-0 flex items-center justify-center transition-colors duration-200 ${
          isLoading ? "bg-black/30" : "bg-black/0 group-hover:bg-black/20"
        }`}
      >
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/90 backdrop-blur-md shadow-xl text-zinc-900 group-hover:scale-105 transition-transform duration-200">
          {isLoading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <Play className="w-6 h-6 ml-0.5 fill-current" />
          )}
        </div>
      </div>
    </button>
  );
}

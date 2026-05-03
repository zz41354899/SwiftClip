"use client";

import { useState } from "react";

import { Copy, Check } from "lucide-react";
import { clsx } from "clsx";

interface Props {
  text: string;
  label?: string;
  variant?: "ghost" | "primary";
}

export function TemplateCopyButton({ text, label, variant = "ghost" }: Props) {
  const displayLabel = label ?? "Copy";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API not available
    }
  };

  if (variant === "primary") {
    return (
      <button
        onClick={handleCopy}
        className={clsx(
          "flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 shadow-sm",
          copied
            ? "bg-green-600 text-white"
            : "bg-zinc-950 text-white hover:bg-zinc-800 active:scale-95"
        )}
      >
        {copied ? (
          <>
            <Check className="w-4 h-4" />
            "Copied!"
          </>
        ) : (
          <>
            <Copy className="w-4 h-4" />
            {displayLabel}
          </>
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white text-xs font-medium transition-all duration-150"
      aria-label={displayLabel}
    >
      {copied ? (
        <>
          <Check className="w-3 h-3 text-green-400" />
          "Copied!"
        </>
      ) : (
        <>
          <Copy className="w-3 h-3" />
          {displayLabel}
        </>
      )}
    </button>
  );
}

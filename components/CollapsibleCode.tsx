"use client";

import { useState } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";
import { TemplateCopyButton } from "./TemplateCopyButton";

const PREVIEW_LINES = 12;

export function CollapsibleCode({ code }: { code: string }) {
  const [expanded, setExpanded] = useState(false);
  const lines = code.split("\n");
  const isTruncatable = lines.length > PREVIEW_LINES;
  const visibleCode = !expanded && isTruncatable
    ? lines.slice(0, PREVIEW_LINES).join("\n")
    : code;

  return (
    <div className="relative rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden">
      <pre className="text-xs text-zinc-300 font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto p-4 pb-2">
        {visibleCode}
      </pre>

      {isTruncatable && !expanded && (
        <div className="absolute bottom-0 left-0 right-0">
          <div className="h-16 bg-gradient-to-t from-zinc-950 to-transparent" />
          <div className="bg-zinc-950 pb-3 flex justify-center">
            <button
              onClick={() => setExpanded(true)}
              className="inline-flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors px-3 py-1.5 rounded-lg border border-zinc-800 hover:border-indigo-500/40"
            >
              <ChevronDown className="w-3.5 h-3.5" />
              Show full code
            </button>
          </div>
        </div>
      )}

      {isTruncatable && expanded && (
        <div className="px-4 pb-3 flex justify-center border-t border-zinc-800 mt-1">
          <button
            onClick={() => setExpanded(false)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-300 transition-colors mt-3"
          >
            <ChevronUp className="w-3.5 h-3.5" />
            Collapse
          </button>
        </div>
      )}

      <TemplateCopyButton text={code} label="Copy code" />
    </div>
  );
}

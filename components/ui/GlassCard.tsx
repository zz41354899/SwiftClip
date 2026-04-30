import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className, hover = false }: GlassCardProps) {
  return (
    <div
      className={twMerge(
        clsx(
          "bg-white border border-zinc-200 rounded-2xl shadow-sm",
          hover &&
            "transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-zinc-300",
          className
        )
      )}
    >
      {children}
    </div>
  );
}

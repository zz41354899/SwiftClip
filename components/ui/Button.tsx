import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "ghost";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        clsx(
          "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 cursor-pointer select-none",
          // Sizes
          size === "sm" && "px-3 py-1.5 text-xs",
          size === "md" && "px-4 py-2 text-sm",
          size === "lg" && "px-6 py-3 text-base",
          // Variants
          variant === "primary" && [
            "bg-zinc-950 text-white",
            "hover:bg-zinc-800",
            "active:scale-95",
            "shadow-sm",
          ],
          variant === "ghost" && [
            "border border-zinc-200 text-zinc-700 bg-white",
            "hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-900",
            "active:scale-95",
            "shadow-sm",
          ],
          className
        )
      )}
      {...props}
    >
      {children}
    </button>
  );
}

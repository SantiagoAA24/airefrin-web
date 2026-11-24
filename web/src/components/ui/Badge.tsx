import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "accent" | "ok";
  children: ReactNode;
}

export function Badge({
  tone = "accent",
  children,
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-pill px-[11px] py-1.5 font-sans text-caption font-extrabold tracking-[0.05em] uppercase",
        tone === "ok"
          ? "bg-green-100 text-green-700"
          : "bg-orange-500 text-navy-950",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

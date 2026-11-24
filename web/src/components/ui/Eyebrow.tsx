import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface EyebrowProps extends HTMLAttributes<HTMLParagraphElement> {
  onDark?: boolean;
  children: ReactNode;
}

export function Eyebrow({
  onDark = false,
  children,
  className,
  ...rest
}: EyebrowProps) {
  return (
    <p
      className={cn(
        "m-0 flex items-center gap-2.5 font-sans text-eyebrow font-extrabold tracking-[0.04em] uppercase before:inline-block before:h-[3px] before:w-5 before:bg-current before:content-['']",
        onDark ? "text-cyan-300" : "text-blue-600",
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
}

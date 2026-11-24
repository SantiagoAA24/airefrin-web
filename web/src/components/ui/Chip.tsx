"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  pressed?: boolean;
  children: ReactNode;
}

export function Chip({
  pressed = false,
  children,
  className,
  disabled,
  type = "button",
  ...rest
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={pressed}
      disabled={disabled}
      className={cn(
        "h-[46px] min-w-16 cursor-pointer rounded-pill border-2 border-border-control bg-white px-5 font-sans text-[15px] font-bold leading-none text-navy-800 transition-colors focus-visible:focus-ring disabled:cursor-not-allowed disabled:opacity-50",
        pressed && "border-blue-600 bg-blue-600 text-white",
        !pressed && !disabled && "hover:bg-sky-25",
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

export type ButtonVariant =
  | "primary"
  | "outline"
  | "outline-light"
  | "whatsapp"
  | "accent";

export type ButtonSize = "md" | "sm";

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  target?: string;
  rel?: string;
  arrow?: boolean;
  icon?: IconName;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-cta text-white shadow-button hover:brightness-105 disabled:hover:brightness-100",
  outline:
    "bg-transparent text-blue-600 border-blue-600 hover:bg-sky-50 disabled:hover:bg-transparent",
  "outline-light":
    "bg-[rgba(4,19,55,0.35)] text-white border-cyan-400 hover:bg-[rgba(4,19,55,0.5)] disabled:hover:bg-[rgba(4,19,55,0.35)]",
  whatsapp:
    "bg-green-700 text-white hover:brightness-110 disabled:hover:brightness-100",
  accent:
    "bg-orange-500 text-navy-950 hover:brightness-105 disabled:hover:brightness-100",
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  target,
  rel,
  arrow,
  icon,
  children,
  className,
  disabled,
  type = "button",
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center gap-2.5 rounded-pill border-2 border-transparent font-sans text-button font-bold no-underline box-border cursor-pointer transition-[filter,background-color] focus-visible:focus-ring disabled:cursor-not-allowed disabled:opacity-50",
    size === "sm" ? "px-6 py-3.5 text-[15px]" : "px-[30px] py-[17px]",
    variants[variant],
    className,
  );

  const content = (
    <>
      {icon ? <Icon name={icon} size={22} stroke={2} /> : null}
      {children}
      {arrow ? <Icon name="arrow" size={18} stroke={2.4} /> : null}
    </>
  );

  if (href && !disabled) {
    return (
      <a href={href} className={classes} target={target} rel={rel}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} className={classes} disabled={disabled} {...rest}>
      {content}
    </button>
  );
}

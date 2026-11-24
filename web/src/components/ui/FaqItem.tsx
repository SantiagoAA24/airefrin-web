"use client";

import { useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface FaqItemProps {
  question: string;
  open?: boolean;
  onToggle?: () => void;
  children: ReactNode;
  className?: string;
}

export function FaqItem({
  question,
  open: openProp,
  onToggle,
  children,
  className,
}: FaqItemProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const controlled = openProp !== undefined;
  const open = controlled ? openProp : internalOpen;

  function handleToggle() {
    if (onToggle) {
      onToggle();
      return;
    }
    setInternalOpen((current) => !current);
  }

  return (
    <div
      className={cn(
        "rounded-md border-[1.5px] border-line bg-white font-sans",
        className,
      )}
    >
      <button
        type="button"
        className="flex w-full cursor-pointer items-center justify-between gap-space-4 border-0 bg-transparent px-6 py-5 text-left font-sans text-[17px] leading-[1.4] font-bold text-navy-800 focus-visible:focus-ring"
        aria-expanded={open}
        onClick={handleToggle}
      >
        {question}
        <span className="text-2xl text-blue-600" aria-hidden>
          {open ? "−" : "+"}
        </span>
      </button>
      {open ? (
        <div className="px-6 pb-[22px] text-body font-medium text-text">
          {children}
        </div>
      ) : null}
    </div>
  );
}

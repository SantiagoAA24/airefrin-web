import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export interface LogoProps {
  className?: string;
  onDark?: boolean;
}

export function Logo({ className, onDark = false }: LogoProps) {
  return (
    <Link
      href="/"
      aria-label={`${site.shortName}, inicio`}
      className={cn(
        "inline-flex items-center gap-2.5 focus-visible:focus-ring",
        onDark ? "text-white" : "text-navy-800",
        className,
      )}
    >
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        className="text-cyan-brand"
        strokeWidth="2.6"
        strokeLinecap="round"
        aria-hidden
      >
        <path d="M12 2v20M3.3 7l17.4 10M3.3 17L20.7 7" />
      </svg>
      <span className="text-[30px] font-extrabold tracking-[0.01em]">
        AIREFRIN
      </span>
    </Link>
  );
}

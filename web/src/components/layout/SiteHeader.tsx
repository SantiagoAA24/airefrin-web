"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { mainNav } from "@/lib/site";
import { Logo } from "./Logo";

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-line bg-white">
      <div className="container-page flex flex-wrap items-center justify-between gap-space-4 py-space-4">
        <Logo />
        <nav
          aria-label="Principal"
          className="hidden items-center gap-[34px] text-[15px] font-semibold text-ink min-[981px]:flex"
        >
          {mainNav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "border-b-[3px] border-transparent py-1.5 focus-visible:focus-ring",
                  active && "border-blue-600 text-blue-600",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
        <Button href="/contacto" size="sm" arrow>
          Solicitar cotización
        </Button>
      </div>
    </header>
  );
}

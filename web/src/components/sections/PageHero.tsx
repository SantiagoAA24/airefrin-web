import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui";
import { cn } from "@/lib/cn";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description: string;
  breadcrumbs: BreadcrumbItem[];
  aside?: ReactNode;
  className?: string;
};

export function PageHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  aside,
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "bg-gradient-hero px-space-5 py-space-8 md:py-[56px]",
        className,
      )}
    >
      <div className="container-page flex flex-wrap items-center gap-space-7 px-0">
        <div className="min-w-0 flex-[1_1_480px]">
          <nav
            aria-label="Migas de pan"
            className="text-small font-semibold text-on-dark"
          >
            {breadcrumbs.map((item, index) => (
              <span key={`${item.label}-${index}`}>
                {index > 0 ? (
                  <span className="mx-1.5 opacity-60" aria-hidden>
                    /
                  </span>
                ) : null}
                {item.href ? (
                  <a
                    href={item.href}
                    className="text-cyan-300 focus-visible:focus-ring"
                  >
                    {item.label}
                  </a>
                ) : (
                  <span className="text-white">{item.label}</span>
                )}
              </span>
            ))}
          </nav>
          <div className="mt-[22px]">
            <Eyebrow onDark>{eyebrow}</Eyebrow>
          </div>
          <h1 className="mt-space-3 text-[clamp(34px,4.6vw,58px)] leading-[1.04] font-extrabold tracking-[-0.01em] text-white uppercase">
            {title}
          </h1>
          <p className="mt-[18px] max-w-[620px] text-[19px] leading-[1.55] text-on-dark">
            {description}
          </p>
        </div>
        {aside ? (
          <div className="min-w-[280px] flex-[0_1_400px]">{aside}</div>
        ) : null}
      </div>
    </section>
  );
}

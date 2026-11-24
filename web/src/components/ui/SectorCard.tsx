import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

export interface SectorCardProps {
  icon: IconName;
  label: string;
  description?: string;
  from?: string;
  to?: string;
  href?: string;
  className?: string;
}

export function SectorCard({
  icon,
  label,
  description,
  from = "#5e8fd6",
  to = "#16396f",
  href = "#",
  className,
}: SectorCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "relative flex h-[270px] flex-col overflow-hidden rounded-md px-5 py-5 font-sans text-white no-underline shadow-card focus-visible:focus-ring",
        description ? "items-start justify-end" : "items-center justify-end",
        className,
      )}
      style={{
        background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <span
        className={cn(
          "pointer-events-none absolute text-white/22",
          description
            ? "top-[22px] right-[18px]"
            : "top-[34px] left-1/2 -ml-[60px]",
        )}
      >
        <Icon name={icon} size={description ? 90 : 120} stroke={0.8} />
      </span>
      {description ? (
        <div className="relative">
          <div className="text-[20px] leading-[1.2] font-extrabold">{label}</div>
          <div className="mt-1.5 text-small leading-[1.45] text-on-dark">
            {description}
          </div>
        </div>
      ) : (
        <div className="relative flex flex-col items-center gap-space-2 text-[18px] leading-[1.2] font-bold">
          <Icon name={icon} size={30} />
          <div>{label}</div>
        </div>
      )}
    </a>
  );
}

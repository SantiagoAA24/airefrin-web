import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

export interface SectorCardProps {
  icon: IconName;
  label: string;
  from?: string;
  to?: string;
  href?: string;
  className?: string;
}

export function SectorCard({
  icon,
  label,
  from = "#5e8fd6",
  to = "#16396f",
  href = "#",
  className,
}: SectorCardProps) {
  return (
    <a
      href={href}
      className={cn(
        "relative flex h-[270px] flex-col items-center justify-end overflow-hidden rounded-md px-5 py-5 font-sans text-white no-underline shadow-card focus-visible:focus-ring",
        className,
      )}
      style={{
        background: `linear-gradient(180deg, ${from} 0%, ${to} 100%)`,
      }}
    >
      <span className="pointer-events-none absolute top-[34px] left-1/2 -ml-[60px] text-white/22">
        <Icon name={icon} size={120} stroke={0.8} />
      </span>
      <div className="relative flex flex-col items-center gap-space-2 text-[18px] leading-[1.2] font-bold">
        <Icon name={icon} size={30} />
        <div>{label}</div>
      </div>
    </a>
  );
}

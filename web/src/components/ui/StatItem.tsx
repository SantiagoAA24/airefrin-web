import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

export interface StatItemProps {
  icon: IconName;
  value: string;
  label: string;
  className?: string;
}

export function StatItem({ icon, value, label, className }: StatItemProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-space-4 font-sans text-cyan-400",
        className,
      )}
    >
      <Icon name={icon} size={52} stroke={1.5} />
      <div>
        <div className="text-stat font-extrabold text-cyan-400">{value}</div>
        <div className="mt-1.5 text-[15px] leading-[1.35] font-medium text-on-dark">
          {label}
        </div>
      </div>
    </div>
  );
}

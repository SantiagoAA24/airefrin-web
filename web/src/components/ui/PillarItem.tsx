import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

export interface PillarItemProps {
  icon: IconName;
  title: string;
  description: string;
  className?: string;
}

export function PillarItem({
  icon,
  title,
  description,
  className,
}: PillarItemProps) {
  return (
    <div className={cn("flex items-center gap-space-4 font-sans", className)}>
      <div className="flex w-[52px] shrink-0 items-center justify-center text-blue-600">
        <Icon name={icon} size={48} stroke={1.6} />
      </div>
      <div>
        <div className="text-title font-bold text-ink">{title}</div>
        <div className="mt-space-1 text-[15px] leading-[1.45] font-medium text-text">
          {description}
        </div>
      </div>
    </div>
  );
}

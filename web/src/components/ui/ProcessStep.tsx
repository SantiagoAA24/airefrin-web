import { cn } from "@/lib/cn";
import { Icon, type IconName } from "./Icon";

export interface ProcessStepProps {
  icon: IconName;
  label: string;
  className?: string;
}

export function ProcessStep({ icon, label, className }: ProcessStepProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-2.5 font-sans text-white",
        className,
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 shadow-[0_0_0_4px_rgba(56,192,245,0.5)]">
        <Icon name={icon} size={30} stroke={2} />
      </div>
      <div className="text-center text-button font-bold">{label}</div>
    </div>
  );
}

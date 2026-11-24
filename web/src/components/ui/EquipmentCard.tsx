import Image from "next/image";
import { cn } from "@/lib/cn";
import { Button } from "./Button";
import { Icon } from "./Icon";

export interface EquipmentCardProps {
  brand: string;
  name: string;
  btu: string;
  model: string;
  image?: string;
  href?: string;
  cta?: string;
  className?: string;
}

export function EquipmentCard({
  brand,
  name,
  btu,
  model,
  image,
  href = "#",
  cta = "Cotizar este equipo",
  className,
}: EquipmentCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 rounded-md border-[1.5px] border-line bg-white p-[22px] font-sans",
        className,
      )}
    >
      <div className="flex h-[120px] items-center justify-center rounded-[12px] bg-sky-50 text-text-muted">
        {image ? (
          <Image
            src={image}
            alt=""
            width={160}
            height={100}
            className="max-h-[100px] w-auto object-contain"
          />
        ) : (
          <Icon name="snow" size={54} stroke={1.4} />
        )}
      </div>
      <div className="text-[13px] leading-[1.2] font-extrabold tracking-[0.05em] text-blue-600 uppercase">
        {brand}
      </div>
      <div className="text-title font-bold text-navy-800">{name}</div>
      <div className="text-small font-medium text-text">
        {btu} BTU · Ref. {model}
      </div>
      <Button variant="outline" size="sm" href={href}>
        {cta}
      </Button>
    </div>
  );
}

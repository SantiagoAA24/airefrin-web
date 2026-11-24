"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "@/components/ui";
import { cn } from "@/lib/cn";

type EquipmentGalleryProps = {
  images: string[];
  alt: string;
};

export function EquipmentGallery({ images, alt }: EquipmentGalleryProps) {
  const [active, setActive] = useState(0);
  const hasImages = images.length > 0;
  const current = hasImages ? images[Math.min(active, images.length - 1)] : null;

  return (
    <div>
      <div className="flex h-[380px] items-center justify-center rounded-[22px] bg-gradient-to-br from-sky-50 to-[#CFE3FB] text-text-muted">
        {current ? (
          <Image
            src={current}
            alt={alt}
            width={480}
            height={360}
            className="max-h-[340px] w-auto object-contain"
            priority
          />
        ) : (
          <Icon name="snow" size={150} stroke={0.9} />
        )}
      </div>

      <div className="mt-3.5 flex gap-3">
        {(hasImages ? images : ["placeholder-1", "placeholder-2", "placeholder-3", "placeholder-4"]).map(
          (image, index) => {
            const isActive = index === active;
            return (
              <button
                key={image}
                type="button"
                aria-label={`Ver imagen ${index + 1}`}
                aria-pressed={isActive}
                onClick={() => setActive(index)}
                className={cn(
                  "flex h-[84px] flex-1 items-center justify-center rounded-md bg-sky-50 focus-visible:focus-ring",
                  isActive ? "border-2 border-blue-600" : "border-2 border-line",
                )}
              >
                {hasImages ? (
                  <Image
                    src={image}
                    alt=""
                    width={120}
                    height={80}
                    className="max-h-[70px] w-auto object-contain"
                  />
                ) : (
                  <Icon name="snow" size={28} stroke={1.3} className="text-text-muted" />
                )}
              </button>
            );
          },
        )}
      </div>

      {!hasImages ? (
        <p className="mt-2.5 text-caption text-text-muted">
          [Fotos reales del equipo]
        </p>
      ) : null}
    </div>
  );
}

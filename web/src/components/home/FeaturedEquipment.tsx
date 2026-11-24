"use client";

import { useState } from "react";
import {
  featuredBrandFilters,
  getFeaturedEquipment,
  quoteEquipmentMessage,
  type FeaturedBrandFilter,
} from "@/content/equipos";
import { Chip, EquipmentCard, Eyebrow } from "@/components/ui";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

export function FeaturedEquipment() {
  const [brand, setBrand] = useState<FeaturedBrandFilter>("Todas");
  const products = getFeaturedEquipment(brand);

  return (
    <section id="equipos" className="bg-white">
      <div className="container-page py-space-9">
        <div className="flex flex-wrap items-end justify-between gap-space-4">
          <div>
            <Eyebrow>Suministro</Eyebrow>
            <h2 className="mt-space-3 text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold text-navy-800 uppercase">
              Equipos destacados
            </h2>
          </div>
          <a
            href="/equipos"
            className="text-button font-bold text-blue-600 focus-visible:focus-ring"
          >
            Ver los {site.equipmentCount} equipos →
          </a>
        </div>

        <div
          className="mt-[26px] flex flex-wrap gap-space-3"
          role="group"
          aria-label="Filtrar por marca"
        >
          {featuredBrandFilters.map((filter) => (
            <Chip
              key={filter}
              pressed={brand === filter}
              onClick={() => setBrand(filter)}
              className="h-10 px-[18px] text-small"
            >
              {filter}
            </Chip>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap gap-5">
          {products.map((product) => (
            <EquipmentCard
              key={product.slug}
              brand={product.brand}
              name={product.name}
              btu={product.btu}
              model={product.model}
              href={whatsappUrl(quoteEquipmentMessage(product))}
              className="min-w-0 flex-[1_1_250px]"
            />
          ))}
        </div>

        <p className="mt-[14px] text-caption text-text-muted">
          [Fotos de producto reales por referencia; el catálogo completo tendría
          ficha técnica, filtros por BTU, marca y tipo, y comparador]
        </p>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Chip, EquipmentCard, Eyebrow } from "@/components/ui";
import type { EquipoListItem } from "@/lib/api";
import { formatBtu } from "@/lib/format";
import { site } from "@/lib/site";

const brandFilters = ["Todas", "LG", "Samsung", "Confortfresh"] as const;
type BrandFilter = (typeof brandFilters)[number];

type FeaturedEquipmentProps = {
  equipos: EquipoListItem[];
  error?: string;
};

export function FeaturedEquipment({ equipos, error }: FeaturedEquipmentProps) {
  const [brand, setBrand] = useState<BrandFilter>("Todas");

  const products = useMemo(() => {
    if (brand === "Todas") return equipos;
    return equipos.filter((item) => item.marca.nombre === brand);
  }, [brand, equipos]);

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
          <Link
            href="/equipos"
            className="text-button font-bold text-blue-600 focus-visible:focus-ring"
          >
            Ver los {site.equipmentCount} equipos →
          </Link>
        </div>

        <div
          className="mt-[26px] flex flex-wrap gap-space-3"
          role="group"
          aria-label="Filtrar por marca"
        >
          {brandFilters.map((filter) => (
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

        {error ? (
          <p className="mt-7 rounded-lg border-[1.5px] border-line bg-sky-50 px-space-5 py-space-5 text-body text-text">
            {error}
          </p>
        ) : null}

        {!error && products.length === 0 ? (
          <p className="mt-7 text-body text-text-muted">
            No hay equipos destacados para esta marca.
          </p>
        ) : null}

        {!error && products.length > 0 ? (
          <div className="mt-7 flex flex-wrap gap-5">
            {products.map((product) => (
              <EquipmentCard
                key={product.slug}
                brand={product.marca.nombre}
                name={product.nombre}
                btu={formatBtu(product.capacidad_btu)}
                model={product.referencia}
                image={product.imagenes[0]}
                href={`/equipos/${product.slug}`}
                cta="Ver ficha"
                className="min-w-0 flex-[1_1_250px]"
              />
            ))}
          </div>
        ) : null}

        <p className="mt-[14px] text-caption text-text-muted">
          [Fotos de producto reales por referencia; faltan 15 equipos del
          catálogo completo]
        </p>
      </div>
    </section>
  );
}

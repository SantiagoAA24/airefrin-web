"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Chip } from "@/components/ui";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const TIPOS = [
  { slug: "mini-split-pared", label: "Mini split pared" },
  { slug: "cassette-techo", label: "Cassette techo" },
] as const;

const BTU_OPTIONS = [9000, 12000, 18000, 24000, 36000, 54000] as const;

function slugifyBrand(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
}

type CatalogFiltersProps = {
  className?: string;
};

export function CatalogFilters({ className }: CatalogFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedMarca = searchParams.get("marca");
  const selectedTipo = searchParams.get("tipo");
  const btuMin = searchParams.get("btu_min");
  const btuMax = searchParams.get("btu_max");
  const selectedBtu =
    btuMin && btuMax && btuMin === btuMax ? Number(btuMin) : null;

  const updateParams = useCallback(
    (mutate: (params: URLSearchParams) => void) => {
      const params = new URLSearchParams(searchParams.toString());
      mutate(params);
      params.delete("page");
      const query = params.toString();
      router.push(query ? `/equipos?${query}` : "/equipos");
    },
    [router, searchParams],
  );

  return (
    <aside
      className={cn(
        "min-w-0 flex-[0_1_260px] rounded-lg border-[1.5px] border-line bg-white p-space-5",
        className,
      )}
      aria-label="Filtros del catálogo"
    >
      <h2 className="text-[18px] font-extrabold text-navy-800">Filtros</h2>

      <fieldset className="mt-5 border-0 p-0">
        <legend className="text-small font-extrabold tracking-[0.04em] text-blue-600 uppercase">
          Marca
        </legend>
        <div className="mt-3 flex flex-col gap-2.5">
          {site.brands.map((brand) => {
            const slug = slugifyBrand(brand);
            const checked = selectedMarca === slug;
            return (
              <label
                key={brand}
                className="flex cursor-pointer items-center gap-2.5 text-[15px] font-semibold text-ink"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  className="size-4 accent-blue-600"
                  onChange={() =>
                    updateParams((params) => {
                      if (checked) params.delete("marca");
                      else params.set("marca", slug);
                    })
                  }
                />
                {brand}
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-6 border-0 p-0">
        <legend className="text-small font-extrabold tracking-[0.04em] text-blue-600 uppercase">
          Tipo
        </legend>
        <div className="mt-3 flex flex-col gap-2.5">
          {TIPOS.map((tipo) => {
            const checked = selectedTipo === tipo.slug;
            return (
              <label
                key={tipo.slug}
                className="flex cursor-pointer items-center gap-2.5 text-[15px] font-semibold text-ink"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  className="size-4 accent-blue-600"
                  onChange={() =>
                    updateParams((params) => {
                      if (checked) params.delete("tipo");
                      else params.set("tipo", tipo.slug);
                    })
                  }
                />
                {tipo.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      <fieldset className="mt-6 border-0 p-0">
        <legend className="text-small font-extrabold tracking-[0.04em] text-blue-600 uppercase">
          Capacidad
        </legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {BTU_OPTIONS.map((btu) => {
            const pressed = selectedBtu === btu;
            return (
              <Chip
                key={btu}
                pressed={pressed}
                className="h-9 px-3 text-caption"
                onClick={() =>
                  updateParams((params) => {
                    if (pressed) {
                      params.delete("btu_min");
                      params.delete("btu_max");
                    } else {
                      params.set("btu_min", String(btu));
                      params.set("btu_max", String(btu));
                    }
                  })
                }
              >
                {new Intl.NumberFormat("es-CO").format(btu)}
              </Chip>
            );
          })}
        </div>
      </fieldset>
    </aside>
  );
}

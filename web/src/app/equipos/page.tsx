import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CatalogFilters } from "@/components/catalogo/CatalogFilters";
import {
  CatalogEmpty,
  CatalogError,
  CatalogLoading,
} from "@/components/catalogo/CatalogStates";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { EquipmentCard } from "@/components/ui";
import {
  ApiError,
  listEquipos,
  type EquipoListResponse,
} from "@/lib/api";
import { cn } from "@/lib/cn";
import { formatBtu } from "@/lib/format";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Equipos",
  description:
    "Catálogo de equipos de aire acondicionado: filtra por marca, tipo y capacidad, y cotiza por WhatsApp.",
  openGraph: {
    title: `Equipos | ${site.shortName}`,
    description:
      "Catálogo de climatización con marcas LG, Samsung, Confortfresh y más.",
  },
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function firstValue(
  value: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(value)) return value[0];
  return value;
}

function parsePositiveInt(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : undefined;
}

async function loadCatalog(
  searchParams: Record<string, string | string[] | undefined>,
): Promise<{ data?: EquipoListResponse; error?: string }> {
  const marca = firstValue(searchParams.marca);
  const tipo = firstValue(searchParams.tipo);
  const btuMin = parsePositiveInt(firstValue(searchParams.btu_min));
  const btuMax = parsePositiveInt(firstValue(searchParams.btu_max));
  const page = parsePositiveInt(firstValue(searchParams.page)) ?? 1;

  try {
    const data = await listEquipos({
      marca,
      tipo,
      btu_min: btuMin,
      btu_max: btuMax,
      page,
      page_size: 12,
    });
    return { data };
  } catch (error) {
    const message =
      error instanceof ApiError
        ? error.message
        : "No pudimos cargar el catálogo en este momento.";
    return { error: message };
  }
}

function pageHref(
  searchParams: Record<string, string | string[] | undefined>,
  page: number,
): string {
  const params = new URLSearchParams();
  for (const key of ["marca", "tipo", "btu_min", "btu_max"] as const) {
    const value = firstValue(searchParams[key]);
    if (value) params.set(key, value);
  }
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `/equipos?${query}` : "/equipos";
}

export default async function EquiposPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const { data, error } = await loadCatalog(params);

  return (
    <main>
      <PageHero
        eyebrow="Suministro"
        title="Equipos de climatización"
        description="Explora marcas como LG, Samsung, Confortfresh y más. Filtra por tipo y capacidad, y cotiza por WhatsApp."
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Equipos" },
        ]}
      />

      <section className="bg-white px-space-5 py-space-8">
        <div className="container-page flex flex-wrap items-start gap-space-6 px-0">
          <Suspense fallback={<CatalogLoading className="flex-[0_1_260px]" />}>
            <CatalogFilters />
          </Suspense>

          <div className="min-w-0 flex-[1_1_640px]">
            {error ? <CatalogError message={error} /> : null}

            {!error && data && data.total === 0 ? <CatalogEmpty /> : null}

            {!error && data && data.total > 0 ? (
              <>
                <div className="flex flex-wrap items-center justify-between gap-space-3">
                  <p className="text-[17px] font-bold text-navy-800">
                    {data.total}{" "}
                    {data.total === 1 ? "equipo" : "equipos"}
                  </p>
                  <p className="text-small font-semibold text-text-muted">
                    Ordenar por · Capacidad ↑
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap gap-5">
                  {data.items.map((equipo) => (
                    <EquipmentCard
                      key={equipo.slug}
                      brand={equipo.marca.nombre}
                      name={equipo.nombre}
                      btu={formatBtu(equipo.capacidad_btu)}
                      model={equipo.referencia}
                      image={equipo.imagenes[0]}
                      href={`/equipos/${equipo.slug}`}
                      cta="Ver ficha"
                      className="min-w-0 flex-[1_1_250px]"
                    />
                  ))}
                </div>

                {data.pages > 1 ? (
                  <nav
                    aria-label="Paginación del catálogo"
                    className="mt-8 flex flex-wrap gap-2"
                  >
                    {Array.from({ length: data.pages }, (_, index) => {
                      const page = index + 1;
                      const pressed = page === data.page;
                      return (
                        <Link
                          key={page}
                          href={pageHref(params, page)}
                          aria-current={pressed ? "page" : undefined}
                          className={cn(
                            "inline-flex h-10 min-w-10 items-center justify-center rounded-pill border-2 px-3 text-[15px] font-bold focus-visible:focus-ring",
                            pressed
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-border-control bg-white text-navy-800 hover:bg-sky-25",
                          )}
                        >
                          {page}
                        </Link>
                      );
                    })}
                  </nav>
                ) : null}

                <p className="mt-4 text-caption text-text-muted">
                  [Catálogo parcial: faltan 15 equipos por cargar con el
                  cliente]
                </p>
              </>
            ) : null}
          </div>
        </div>
      </section>

      <CtaBanner
        title="¿No encuentras el equipo?"
        body="Cuéntanos qué necesitas y te orientamos con la marca y capacidad adecuadas."
        whatsappMessage="Hola Airefrin, no encontré el equipo que busco en el catálogo y quiero una cotización."
      />
    </main>
  );
}

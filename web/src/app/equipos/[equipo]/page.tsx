import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { EquipmentGallery } from "@/components/catalogo/EquipmentGallery";
import { CatalogError } from "@/components/catalogo/CatalogStates";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { Button, EquipmentCard, Eyebrow } from "@/components/ui";
import {
  ApiError,
  getEquipoBySlug,
  type EquipoDetalle,
} from "@/lib/api";
import { formatBtu } from "@/lib/format";
import { quoteEquipmentMessage } from "@/lib/quote";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

type PageProps = {
  params: Promise<{ equipo: string }>;
};

async function loadEquipo(
  slug: string,
): Promise<{ data?: EquipoDetalle; notFound?: boolean; error?: string }> {
  try {
    const data = await getEquipoBySlug(slug);
    return { data };
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return { notFound: true };
    }
    const message =
      error instanceof ApiError
        ? error.message
        : "No pudimos cargar la ficha del equipo.";
    return { error: message };
  }
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { equipo: slug } = await params;
  const result = await loadEquipo(slug);
  if (!result.data) {
    return { title: "Equipo" };
  }
  const equipo = result.data;
  const title = `${equipo.marca.nombre} ${equipo.nombre} ${formatBtu(equipo.capacidad_btu)} BTU`;
  return {
    title,
    description: equipo.descripcion,
    openGraph: {
      title: `${title} | ${site.shortName}`,
      description: equipo.descripcion,
    },
  };
}

export default async function EquipoPage({ params }: PageProps) {
  const { equipo: slug } = await params;
  const result = await loadEquipo(slug);

  if (result.notFound) {
    notFound();
  }

  if (result.error || !result.data) {
    return (
      <main className="container-page py-space-9">
        <CatalogError message={result.error} />
      </main>
    );
  }

  const equipo = result.data;
  const displayName = `${equipo.nombre} ${formatBtu(equipo.capacidad_btu)} BTU`;
  const quoteMessage = quoteEquipmentMessage({
    brand: equipo.marca.nombre,
    name: equipo.nombre,
    btu: formatBtu(equipo.capacidad_btu),
    model: equipo.referencia,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${equipo.marca.nombre} ${displayName}`,
    description: equipo.descripcion,
    sku: equipo.referencia,
    brand: {
      "@type": "Brand",
      name: equipo.marca.nombre,
    },
    url: `${site.url}/equipos/${equipo.slug}`,
    ...(equipo.imagenes[0] ? { image: equipo.imagenes } : {}),
  };

  const approxSqm = Math.round(equipo.capacidad_btu / 600);

  const specs = [
    { label: "Marca", value: equipo.marca.nombre },
    { label: "Capacidad", value: `${formatBtu(equipo.capacidad_btu)} BTU` },
    { label: "Tipo", value: equipo.tipo },
    { label: "Tecnología", value: equipo.tecnologia },
    { label: "Referencia", value: equipo.referencia },
    {
      label: "Otras especificaciones",
      value: "[por cargar]",
    },
  ];

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="bg-white px-space-5 pt-10 pb-14">
        <div className="container-page px-0">
          <nav
            aria-label="Migas de pan"
            className="mb-6 text-small font-semibold text-text-muted"
          >
            <Link href="/" className="text-blue-600 focus-visible:focus-ring">
              Inicio
            </Link>
            {" / "}
            <Link
              href="/equipos"
              className="text-blue-600 focus-visible:focus-ring"
            >
              Equipos
            </Link>
            {" / "}
            <span>{displayName}</span>
          </nav>

          <div className="flex flex-wrap gap-12">
            <div className="min-w-0 flex-[1_1_460px]">
              <EquipmentGallery
                images={equipo.imagenes}
                alt={`${equipo.marca.nombre} ${displayName}`}
              />
            </div>

            <div className="min-w-0 flex-[1_1_440px]">
              <div className="text-[14px] font-extrabold tracking-[0.05em] text-blue-600 uppercase">
                {equipo.marca.nombre}
              </div>
              <h1 className="mt-2 text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold text-navy-800">
                {displayName}
              </h1>

              <div className="mt-3 flex flex-wrap gap-2.5">
                <span className="rounded-pill bg-sky-50 px-[11px] py-1.5 text-caption font-extrabold tracking-[0.05em] text-blue-600 uppercase">
                  {equipo.tecnologia}
                </span>
                <span className="rounded-pill bg-sky-25 px-[11px] py-1.5 text-caption font-extrabold tracking-[0.05em] text-text uppercase">
                  Ref. {equipo.referencia}
                </span>
              </div>

              <p className="mt-4 text-body leading-[1.6] text-text">
                {equipo.descripcion}
              </p>

              <dl className="mt-[22px]">
                {specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex justify-between gap-4 border-b border-line py-3 text-[15px]"
                  >
                    <dt className="text-text">{spec.label}</dt>
                    <dd className="text-right font-bold text-ink">
                      {spec.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <div className="mt-[26px] flex flex-wrap gap-[14px]">
                <Button
                  variant="whatsapp"
                  href={whatsappUrl(quoteMessage)}
                  icon="whatsapp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cotizar por WhatsApp
                </Button>
              </div>

              <div className="mt-[22px] rounded-lg bg-sky-50 p-5">
                <div className="text-[15px] font-extrabold text-navy-800">
                  ¿Sirve para tu espacio?
                </div>
                <p className="mt-1.5 text-[15px] leading-[1.5] text-text">
                  Como referencia, {formatBtu(equipo.capacidad_btu)} BTU cubren
                  cerca de {approxSqm} m² con exposición normal. Una visita
                  técnica confirma la capacidad exacta.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {equipo.relacionados && equipo.relacionados.length > 0 ? (
        <section className="bg-sky-25 px-space-5 py-space-8">
          <div className="container-page px-0">
            <Eyebrow>También te puede interesar</Eyebrow>
            <h2 className="mt-3 text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold text-navy-800 uppercase">
              Equipos relacionados
            </h2>
            <div className="mt-8 flex flex-wrap gap-5">
              {equipo.relacionados.map((related) => (
                <EquipmentCard
                  key={related.slug}
                  brand={related.marca.nombre}
                  name={related.nombre}
                  btu={formatBtu(related.capacidad_btu)}
                  model={related.referencia}
                  image={related.imagenes[0]}
                  href={`/equipos/${related.slug}`}
                  cta="Ver ficha"
                  className="min-w-0 flex-[1_1_250px]"
                />
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <CtaBanner
        title="¿Lo instalamos por ti?"
        body="Cotiza el equipo con instalación y mantenimiento incluidos en un solo contacto."
        whatsappMessage={quoteMessage}
      />
    </main>
  );
}

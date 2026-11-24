import type { Metadata } from "next";
import { Eyebrow, Icon, StatItem } from "@/components/ui";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { companyCommitments, homeFacts } from "@/content/home";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Empresa",
  description:
    "Airefrin S.A.S. climatiza espacios en Bogotá, Cundinamarca y Meta desde 2012. Venta, instalación y mantenimiento de aire acondicionado y refrigeración.",
  openGraph: {
    title: `Empresa | ${site.shortName}`,
    description:
      "Conoce Airefrin: fundación, marcas aliadas y cobertura en Bogotá, Cundinamarca y Meta.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  foundingDate: String(site.foundedYear),
  email: site.email,
  telephone: site.phoneDisplay,
  sameAs: [site.facebookHref],
  areaServed: site.coverageAreas,
};

export default function EmpresaPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Empresa"
        title="Climatización en Bogotá desde 2012"
        description="Somos una empresa dedicada a la venta, instalación y mantenimiento de aire acondicionado y refrigeración comercial e industrial."
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Empresa" },
        ]}
        aside={
          <div className="relative flex h-[300px] items-center justify-center overflow-hidden rounded-lg bg-[linear-gradient(135deg,#7FA8E6,#1C4FB0)] text-white/35">
            <Icon name="snow" size={140} stroke={0.9} />
            <div className="absolute bottom-[14px] left-[18px] text-caption text-white">
              [Foto del equipo de Airefrin]
            </div>
          </div>
        }
      />

      <section className="bg-navy-900">
        <div className="container-page flex flex-wrap py-[30px]">
          {homeFacts.map((fact) => (
            <div
              key={fact.label}
              className="flex min-w-0 flex-[1_1_220px] items-center gap-space-4 px-space-5 py-space-3"
            >
              <StatItem
                icon={fact.icon}
                value={fact.value}
                label={fact.label}
              />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white px-space-5 py-space-9">
        <div className="container-page flex flex-wrap items-center gap-12 px-0">
          <div className="min-w-0 flex-[1_1_440px]">
            <Eyebrow>Quiénes somos</Eyebrow>
            <h2 className="mt-space-3 text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold text-navy-800 uppercase">
              Una empresa, cuatro compromisos
            </h2>
            <p className="mt-space-4 text-[18px] leading-[1.6] text-text">
              [Historia de la empresa: cómo nació, a quién atiende y qué la
              distingue. Texto pendiente del cliente.]
            </p>
            <p className="mt-space-4 text-[18px] leading-[1.6] text-text">
              Atendemos hogares, negocios e industrias en{" "}
              {site.coverageAreas.join(", ").replace(/, ([^,]*)$/, " y $1")}.
            </p>
          </div>
          <div className="flex min-w-0 flex-[1_1_380px] flex-col gap-space-4">
            {companyCommitments.map((item) => (
              <div
                key={item.title}
                className="flex items-start gap-space-4 rounded-md bg-sky-50 p-5"
              >
                <div className="shrink-0 text-blue-600">
                  <Icon name={item.icon} size={34} stroke={1.7} />
                </div>
                <div>
                  <div className="text-[18px] font-bold text-navy-800">
                    {item.title}
                  </div>
                  <div className="mt-1 text-[15px] leading-[1.5] text-text">
                    {item.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-25 px-space-5 py-space-9">
        <div className="container-page px-0">
          <Eyebrow>Marcas aliadas</Eyebrow>
          <h2 className="mt-space-3 text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold text-navy-800 uppercase">
            Equipos de {site.brands.length} marcas
          </h2>
          <div className="mt-space-6 flex flex-wrap gap-space-4">
            {site.brands.map((brand) => (
              <div
                key={brand}
                className="flex h-[90px] min-w-0 flex-[1_1_200px] items-center justify-center rounded-md border-[1.5px] border-line bg-white text-[20px] font-extrabold text-navy-800"
              >
                {brand}
              </div>
            ))}
          </div>
          <p className="mt-space-3 text-caption text-text-muted">
            [Se reemplazan por los logos oficiales de cada marca]
          </p>
        </div>
      </section>

      <section className="bg-white px-space-5 py-space-9">
        <div className="container-page flex flex-wrap items-center gap-12 px-0">
          <div className="min-w-0 flex-[1_1_400px]">
            <Eyebrow>Cobertura</Eyebrow>
            <h2 className="mt-space-3 text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold text-navy-800 uppercase">
              Llegamos donde está tu equipo
            </h2>
            <p className="mt-space-4 text-[18px] leading-[1.6] text-text">
              Atendemos en{" "}
              {site.coverageAreas.join(", ").replace(/, ([^,]*)$/, " y $1")}.
            </p>
            <div className="mt-space-5 flex flex-wrap gap-space-3">
              {site.coverageAreas.map((area) => (
                <span
                  key={area}
                  className="inline-flex h-11 items-center rounded-pill border-2 border-blue-600 bg-blue-600 px-5 text-[15px] font-bold text-white"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
          <div className="relative flex h-[320px] min-w-0 flex-[1_1_400px] items-center justify-center rounded-lg bg-sky-50">
            <svg width="180" height="220" viewBox="0 0 140 170" aria-hidden>
              <path
                d="M60 6l22 8 16 18 22 4 6 22-12 14 8 22-14 18-4 26-20 14-18-10-8-24-18-12 4-22-20-20 6-22 18-6 12-24z"
                fill="#1E6BDB"
                stroke="#7FD6FF"
                strokeWidth="2"
              />
              <circle cx="78" cy="96" r="4" fill="#fff" />
              <circle cx="92" cy="110" r="3" fill="#fff" />
              <circle cx="64" cy="82" r="3" fill="#fff" />
            </svg>
            <div className="absolute bottom-[14px] left-[18px] text-caption text-text-muted">
              [Mapa de cobertura]
            </div>
          </div>
        </div>
      </section>

      <CtaBanner
        title="Conversemos sobre tu proyecto"
        body="Un asesor te orienta sin compromiso."
        whatsappMessage="Hola Airefrin, quiero hablar sobre un proyecto."
      />
    </main>
  );
}

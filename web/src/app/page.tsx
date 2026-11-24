import type { Metadata } from "next";
import {
  Badge,
  Button,
  Eyebrow,
  Icon,
  PillarItem,
  ProcessStep,
  SectorCard,
  StatItem,
} from "@/components/ui";
import { CapacityCalculator } from "@/components/home/CapacityCalculator";
import { FeaturedEquipment } from "@/components/home/FeaturedEquipment";
import { HomeFaq } from "@/components/home/HomeFaq";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeQuoteForm } from "@/components/home/HomeQuoteForm";
import { VisitCardExample } from "@/components/sections/VisitCardExample";
import {
  homeFacts,
  homeMaintenancePerks,
  homePillars,
  homeProcessSteps,
  homeSectors,
  homeVisitChecks,
} from "@/content/home";
import { ApiError, listDestacados, type EquipoListItem } from "@/lib/api";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `${site.shortName} — Aire acondicionado y refrigeración`,
  },
  description:
    "Venta, instalación, mantenimiento y reparación de aire acondicionado y refrigeración comercial e industrial en Bogotá, Cundinamarca y Meta.",
  openGraph: {
    title: `${site.shortName} — Aire acondicionado y refrigeración`,
    description:
      "Soluciones de climatización y refrigeración en Bogotá, Cundinamarca y Meta.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: site.name,
  url: site.url,
  telephone: site.phoneDisplay,
  email: site.email,
  foundingDate: String(site.foundedYear),
  areaServed: site.coverageAreas.map((area) => ({
    "@type": "AdministrativeArea",
    name: area,
  })),
  description:
    "Venta, instalación, mantenimiento y reparación de aire acondicionado y refrigeración comercial e industrial.",
};

async function loadFeatured(): Promise<{
  equipos: EquipoListItem[];
  error?: string;
}> {
  try {
    const equipos = await listDestacados();
    return { equipos };
  } catch (error) {
    const message =
      error instanceof ApiError
        ? error.message
        : "No pudimos cargar los equipos destacados.";
    return { equipos: [], error: message };
  }
}

export default async function Home() {
  const featured = await loadFeatured();

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HomeHero />

      <section
        aria-label="Servicios principales"
        className="relative z-10 -mt-[84px] px-space-5"
      >
        <div className="container-page flex flex-wrap rounded-lg bg-white py-space-3 shadow-float">
          {homePillars.map((pillar) => (
            <a
              key={pillar.title}
              href={pillar.href}
              className="min-w-0 flex-[1_1_250px] px-7 py-[26px] focus-visible:focus-ring"
            >
              <PillarItem
                icon={pillar.icon}
                title={pillar.title}
                description={pillar.description}
              />
            </a>
          ))}
        </div>
      </section>

      <section
        id="empresa"
        aria-label="Datos de la empresa"
        className="mt-11 bg-navy-900 text-white"
      >
        <div className="container-page flex flex-wrap py-[34px]">
          {homeFacts.map((fact) => (
            <div
              key={fact.label}
              className="flex min-w-0 flex-[1_1_250px] items-center gap-space-4 px-space-5 py-space-3"
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

      <section id="servicios" className="bg-white">
        <div className="container-page flex flex-wrap items-center gap-space-7 py-space-9">
          <div className="min-w-0 flex-[1_1_300px]">
            <Eyebrow>Sectores</Eyebrow>
            <h2 className="mt-space-3 text-[clamp(32px,3.6vw,46px)] leading-[1.05] font-extrabold text-navy-800 uppercase">
              Una solución para cada espacio
            </h2>
            <p className="mt-[18px] text-[18px] leading-[1.55] text-[#2B3B55]">
              Atendemos hogares, negocios e industrias con soluciones a la
              medida.
            </p>
            <Button
              variant="outline"
              href="/servicios"
              arrow
              className="mt-[26px]"
            >
              Conoce nuestros sectores
            </Button>
          </div>
          <div className="flex min-w-0 flex-[3_1_640px] flex-wrap gap-[18px]">
            {homeSectors.map((sector) => (
              <SectorCard
                key={sector.label}
                icon={sector.icon}
                label={sector.label}
                from={sector.from}
                to={sector.to}
                href="/servicios"
                className="min-w-0 flex-[1_1_200px]"
              />
            ))}
          </div>
        </div>
        <div className="container-page -mt-11 pb-space-7 text-caption text-text-muted">
          [Las tarjetas de sector se reemplazan por fotos reales de proyectos]
        </div>
      </section>

      <CapacityCalculator />
      <FeaturedEquipment equipos={featured.equipos} error={featured.error} />

      <section
        id="proceso"
        className="flex flex-wrap bg-gradient-process"
      >
        <div className="relative flex min-h-[300px] min-w-0 flex-[1_1_380px] items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#7FA8E6_0%,#1C4FB0_100%)]">
          <Icon
            name="snow"
            size={220}
            stroke={1}
            className="text-white/35"
          />
          <div className="absolute bottom-[14px] left-[18px] text-caption text-on-dark">
            [Foto del técnico Airefrin en una instalación]
          </div>
        </div>
        <div className="min-w-0 flex-[2_1_560px] box-border px-space-7 py-[56px] text-white md:px-space-7">
          <div className="text-[15px] font-bold tracking-[0.05em] text-cyan-300 uppercase">
            Cómo trabajamos
          </div>
          <h2 className="mt-space-2 text-[clamp(28px,3vw,40px)] leading-[1.1] font-extrabold">
            Un proceso simple y eficiente
          </h2>
          <p className="mt-space-3 max-w-[560px] text-[17px] leading-[1.55] text-on-dark">
            Desde la cotización hasta el servicio, nos enfocamos en brindarte
            una experiencia confiable y profesional.
          </p>
          <div className="mt-[30px] flex flex-wrap items-start gap-x-space-2 gap-y-5">
            {homeProcessSteps.map((step, index) => (
              <div
                key={step.label}
                className="flex min-w-0 flex-[1_1_130px] items-start gap-space-2"
              >
                <ProcessStep
                  icon={step.icon}
                  label={step.label}
                  className="flex-1"
                />
                {index < homeProcessSteps.length - 1 ? (
                  <span
                    className="hidden text-[22px] leading-16 text-cyan-300 sm:block"
                    aria-hidden
                  >
                    →
                  </span>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="portal" className="bg-white">
        <div className="container-page flex flex-wrap items-center gap-12 py-space-9">
          <div className="min-w-0 flex-[1_1_420px]">
            <Badge>Nuevo</Badge>
            <h2 className="mt-space-3 text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold text-navy-800 uppercase">
              Mantenimiento cada 3 meses, con registro
            </h2>
            <p className="mt-space-4 text-[18px] leading-[1.6] text-[#2B3B55]">
              Programe su visita en línea y reciba una ficha por cada servicio:
              qué se revisó, qué se encontró y cuándo toca la próxima. Todo
              queda en su portal de cliente.
            </p>
            <ul className="mt-5 flex list-none flex-col gap-space-3 p-0 text-[17px] text-ink">
              {homeMaintenancePerks.map((perk) => (
                <li key={perk} className="flex items-start gap-space-3">
                  <span className="mt-px shrink-0 text-blue-600">
                    <Icon name="check" size={24} stroke={2.4} />
                  </span>
                  <span>{perk}</span>
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-wrap gap-[14px]">
              <Button href="/agendar-mantenimiento">
                Agendar mantenimiento
              </Button>
              <Button variant="outline" href="/portal">
                Entrar al portal
              </Button>
            </div>
          </div>
          <div className="min-w-0 flex-[1_1_380px]">
            <VisitCardExample checks={homeVisitChecks} />
          </div>
        </div>
      </section>

      <HomeFaq />
      <HomeQuoteForm />
    </main>
  );
}

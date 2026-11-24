import type { Metadata } from "next";
import {
  Button,
  Eyebrow,
  Icon,
  ProcessStep,
  SectorCard,
} from "@/components/ui";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { homeProcessSteps, homeSectors } from "@/content/home";
import { servicios } from "@/content/servicios";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Servicios",
  description:
    "Venta, instalación, mantenimiento y reparación de aire acondicionado y refrigeración comercial e industrial.",
  openGraph: {
    title: `Servicios | ${site.shortName}`,
    description:
      "Cinco servicios de climatización y refrigeración en Bogotá, Cundinamarca y Meta.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Servicios Airefrin",
  itemListElement: servicios.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: service.title,
    url: `${site.url}/servicios/${service.slug}`,
  })),
};

export default function ServiciosPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Servicios"
        title="Todo para tu equipo, de principio a fin"
        description="Venta, instalación, mantenimiento y reparación de aire acondicionado y refrigeración comercial e industrial."
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios" },
        ]}
        aside={
          <div className="rounded-lg bg-white p-7 text-ink shadow-float">
            <div className="text-[20px] font-extrabold text-navy-800">
              ¿No sabes por dónde empezar?
            </div>
            <div className="mt-space-2 text-[15px] leading-[1.5] text-text">
              Cuéntanos tu caso y un asesor te orienta.
            </div>
            <div className="mt-5 flex flex-col gap-space-3">
              <Button
                variant="whatsapp"
                href={site.whatsappHref}
                icon="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
                size="sm"
              >
                Escribir por WhatsApp
              </Button>
              <Button
                variant="outline"
                href={site.phoneHref}
                icon="phone"
                className="w-full"
                size="sm"
              >
                Llamar {site.phoneDisplay}
              </Button>
            </div>
          </div>
        }
      />

      <section className="bg-sky-25 px-space-5 py-space-9">
        <div className="container-page px-0">
          <Eyebrow>Qué hacemos</Eyebrow>
          <h2 className="mt-space-3 text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold text-navy-800 uppercase">
            Cinco servicios, un solo equipo
          </h2>
          <div className="mt-9 flex flex-wrap gap-5">
            {servicios.map((service) => (
              <article
                key={service.slug}
                className="flex min-w-0 flex-[1_1_220px] flex-col gap-[14px] rounded-md border-[1.5px] border-line bg-white p-[26px]"
              >
                <div className="flex h-[60px] w-[60px] items-center justify-center rounded-md bg-sky-50 text-blue-600">
                  <Icon name={service.icon} size={30} stroke={1.7} />
                </div>
                <h3 className="text-[21px] font-extrabold text-navy-800">
                  {service.title}
                </h3>
                <p className="text-[15px] leading-[1.55] text-text">
                  {service.summary}
                </p>
                <ul className="m-0 flex list-none flex-col gap-space-2 p-0">
                  {service.cardPoints.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2.5 text-[15px] text-text"
                    >
                      <span className="mt-0.5 shrink-0 text-blue-600">
                        <Icon name="check" size={18} stroke={2.4} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <a
                  href={service.listHref ?? `/servicios/${service.slug}`}
                  className="mt-auto flex items-center gap-space-2 text-[15px] font-bold text-blue-600 focus-visible:focus-ring"
                >
                  {service.listCtaLabel}
                  <Icon name="arrow" size={16} stroke={2.4} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-space-5 py-space-9">
        <div className="container-page px-0">
          <Eyebrow>Sectores</Eyebrow>
          <h2 className="mt-space-3 text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold text-navy-800 uppercase">
            Una solución para cada espacio
          </h2>
          <div className="mt-space-6 flex flex-wrap gap-[18px]">
            {homeSectors.map((sector) => (
              <SectorCard
                key={sector.label}
                icon={sector.icon}
                label={sector.label}
                description={sector.description}
                from={sector.from}
                to={sector.to}
                href="/contacto"
                className="h-[230px] min-w-0 flex-[1_1_220px]"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-process px-space-5 py-[56px] text-white">
        <div className="container-page px-0">
          <Eyebrow onDark>Cómo trabajamos</Eyebrow>
          <h2 className="mt-space-2 text-[clamp(28px,3vw,40px)] leading-[1.1] font-extrabold">
            Un proceso simple y eficiente
          </h2>
          <div className="mt-space-6 flex flex-wrap gap-space-5">
            {homeProcessSteps.map((step) => (
              <ProcessStep
                key={step.label}
                icon={step.icon}
                label={step.label}
                className="min-w-0 flex-[1_1_150px]"
              />
            ))}
          </div>
        </div>
      </section>

      <CtaBanner
        title="Solicita tu cotización"
        body="Cuéntanos qué necesitas y te respondemos por WhatsApp o teléfono."
        whatsappMessage="Hola Airefrin, quiero cotizar un servicio."
      />
    </main>
  );
}

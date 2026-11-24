import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Eyebrow, Icon } from "@/components/ui";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { PageHero } from "@/components/sections/PageHero";
import { VisitCardExample } from "@/components/sections/VisitCardExample";
import { ServiceFaqList } from "@/components/servicios/ServiceFaqList";
import { ServiceQuoteForm } from "@/components/servicios/ServiceQuoteForm";
import { getAllServiceSlugs, getServicio } from "@/content/servicios";
import { site } from "@/lib/site";

type PageProps = {
  params: Promise<{ servicio: string }>;
};

export function generateStaticParams() {
  return getAllServiceSlugs().map((servicio) => ({ servicio }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { servicio: slug } = await params;
  const service = getServicio(slug);
  if (!service) {
    return { title: "Servicio" };
  }
  return {
    title: service.meta.title,
    description: service.meta.description,
    openGraph: {
      title: `${service.meta.title} | ${site.shortName}`,
      description: service.meta.description,
    },
  };
}

export default async function ServicioDetallePage({ params }: PageProps) {
  const { servicio: slug } = await params;
  const service = getServicio(slug);
  if (!service) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.meta.description,
    provider: {
      "@type": "LocalBusiness",
      name: site.name,
      telephone: site.phoneDisplay,
      url: site.url,
    },
    areaServed: site.coverageAreas,
    url: `${site.url}/servicios/${service.slug}`,
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Servicio"
        title={service.heroTitle}
        description={service.summary}
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Servicios", href: "/servicios" },
          { label: service.shortTitle },
        ]}
        aside={
          <ServiceQuoteForm
            serviceTitle={service.title}
            heading={`Cotizar ${service.shortTitle.toLowerCase()}`}
          />
        }
      />

      <section className="bg-white px-space-5 py-space-9">
        <div className="container-page flex flex-wrap items-start gap-12 px-0">
          <div className="min-w-0 flex-[1_1_440px]">
            <Eyebrow>Qué incluye</Eyebrow>
            <h2 className="mt-space-3 text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold text-navy-800 uppercase">
              {service.slug === "mantenimiento"
                ? "Mantenimiento con registro"
                : service.title}
            </h2>
            <ul className="mt-[26px] flex list-none flex-col gap-[14px] p-0">
              {service.benefits.map((benefit) => (
                <li
                  key={benefit}
                  className="flex items-start gap-space-3 text-[17px] leading-[1.5] text-ink"
                >
                  <span className="mt-px shrink-0 text-blue-600">
                    <Icon name="check" size={24} stroke={2.4} />
                  </span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          {service.slug === "mantenimiento" ? (
            <div className="min-w-0 flex-[1_1_380px]">
              <VisitCardExample />
            </div>
          ) : (
            <div className="min-w-0 flex-[1_1_380px] rounded-lg bg-sky-50 p-[30px]">
              <div className="text-[15px] font-extrabold tracking-[0.04em] text-blue-600 uppercase">
                Proceso
              </div>
              <div className="mt-space-5 flex flex-wrap gap-space-5">
                {service.processSteps.map((step) => (
                  <div
                    key={step.label}
                    className="flex min-w-0 flex-[1_1_120px] flex-col items-center gap-space-3 text-navy-800"
                  >
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-blue-600 shadow-[0_0_0_4px_rgba(56,192,245,0.35)]">
                      <Icon name={step.icon} size={28} stroke={2} />
                    </div>
                    <div className="text-center text-button font-bold">
                      {step.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-sky-25 px-space-5 py-[56px]">
        <div className="container-page flex flex-wrap gap-5 px-0">
          {service.highlights.map((item) => (
            <div
              key={item.title}
              className="min-w-0 flex-[1_1_250px] rounded-md border-[1.5px] border-line bg-white p-[26px]"
            >
              <div className="text-blue-600">
                <Icon name={item.icon} size={36} stroke={1.6} />
              </div>
              <div className="mt-[14px] text-[19px] font-bold text-navy-800">
                {item.title}
              </div>
              <div className="mt-space-2 text-[15px] leading-[1.55] text-text">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </section>

      <ServiceFaqList
        title={`Preguntas sobre ${service.shortTitle.toLowerCase()}`}
        items={service.faq}
      />

      <CtaBanner
        title={service.cta.bannerTitle}
        body={service.cta.bannerBody}
        primaryHref={service.cta.primaryHref}
        primaryLabel={service.cta.primaryLabel}
        whatsappMessage={`Hola Airefrin, quiero información sobre ${service.title}.`}
      />
    </main>
  );
}

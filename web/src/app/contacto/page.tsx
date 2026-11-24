import type { Metadata } from "next";
import { ContactChannels } from "@/components/contacto/ContactChannels";
import { ContactForm } from "@/components/contacto/ContactForm";
import { ContactMeta } from "@/components/contacto/ContactMeta";
import { PageHero } from "@/components/sections/PageHero";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Escríbenos por WhatsApp, teléfono o correo, o déjanos tus datos y te contactamos. Airefrin en Bogotá, Cundinamarca y Meta.",
  openGraph: {
    title: `Contacto | ${site.shortName}`,
    description:
      "Canales de contacto y formulario de cotización de Airefrin S.A.S.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contacto | ${site.shortName}`,
  url: `${site.url}/contacto`,
  mainEntity: {
    "@type": "LocalBusiness",
    name: site.name,
    telephone: site.phoneDisplay,
    email: site.email,
    url: site.url,
    areaServed: site.coverageAreas,
    sameAs: [site.facebookHref],
  },
};

export default function ContactoPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <PageHero
        eyebrow="Contacto"
        title="Hablemos de tu equipo"
        description="Escríbenos por el canal que prefieras o déjanos tus datos y te contactamos."
        breadcrumbs={[
          { label: "Inicio", href: "/" },
          { label: "Contacto" },
        ]}
      />

      <section className="bg-sky-25 px-space-5 py-space-8 pb-[76px]">
        <div className="container-page flex flex-wrap items-start gap-9 px-0">
          <div className="flex min-w-0 flex-[1_1_400px] flex-col gap-3.5">
            <ContactChannels />
            <ContactMeta />
          </div>
          <div className="min-w-0 flex-[1_1_460px]">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}

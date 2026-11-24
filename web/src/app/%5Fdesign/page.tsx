import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import {
  Badge,
  Button,
  Chip,
  EquipmentCard,
  Eyebrow,
  FaqItem,
  Field,
  Icon,
  PillarItem,
  ProcessStep,
  SectorCard,
  StatItem,
  type IconName,
} from "@/components/ui";

export const metadata = {
  title: "Sistema de diseño",
  robots: { index: false, follow: false },
};

const iconNames: IconName[] = [
  "wrench",
  "snow",
  "gear",
  "therm",
  "cal",
  "shield",
  "hand",
  "build",
  "home",
  "shop",
  "fact",
  "clip",
  "tool",
  "check",
  "phone",
  "whatsapp",
  "mail",
  "pin",
  "arrow",
];

const colorTokens = [
  "white",
  "sky-25",
  "sky-50",
  "line",
  "border-control",
  "ink",
  "text",
  "text-muted",
  "navy-950",
  "navy-900",
  "navy-800",
  "navy-700",
  "blue-700",
  "blue-600",
  "blue-500",
  "cyan-400",
  "cyan-300",
  "cyan-brand",
  "orange-500",
  "green-700",
  "green-100",
  "on-dark",
  "on-dark-muted",
] as const;

const spaceTokens = [1, 2, 3, 4, 5, 6, 7, 8, 9] as const;
const radiusTokens = ["sm", "md", "lg", "xl", "pill"] as const;
const shadowTokens = ["button", "card", "panel", "float"] as const;
const gradientTokens = ["cta", "hero", "process", "cover"] as const;

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-space-5 border-b border-line py-space-8">
      <h2 className="text-heading-2 font-extrabold text-navy-800 uppercase">
        {title}
      </h2>
      {children}
    </section>
  );
}

export default function DesignSystemPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return (
    <main className="container-page py-space-8">
      <Eyebrow>Desarrollo</Eyebrow>
      <h1 className="mt-space-3 text-heading-1 font-extrabold text-navy-800 uppercase">
        Sistema de diseño
      </h1>
      <p className="mt-space-3 max-w-2xl text-body text-text">
        Vista interna para comparar tokens y componentes con{" "}
        <code className="text-small">design/sistema-de-diseno</code>. Solo
        disponible en desarrollo.
      </p>

      <Section title="Colores">
        <div className="grid grid-cols-2 gap-space-3 sm:grid-cols-4 md:grid-cols-6">
          {colorTokens.map((token) => (
            <div key={token} className="space-y-space-2">
              <div
                className="h-16 rounded-md border border-line"
                style={{ background: `var(--${token})` }}
              />
              <div className="text-caption font-semibold text-text-muted">
                {token}
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Tipografía">
        <div className="space-y-space-4">
          <p className="text-display font-extrabold uppercase">Display 76</p>
          <p className="text-heading-1 font-extrabold uppercase">Heading 1</p>
          <p className="text-heading-2 font-extrabold uppercase">Heading 2</p>
          <p className="text-title font-bold">Title 19</p>
          <p className="text-lead font-medium">Lead 20 — subtítulo del hero</p>
          <p className="text-body font-medium">Body 16 — párrafo estándar</p>
          <p className="text-small font-medium">Small 14</p>
          <p className="text-caption font-semibold">Caption 12</p>
          <p className="text-eyebrow font-extrabold tracking-[0.04em] uppercase">
            Eyebrow 15
          </p>
          <p className="text-stat font-extrabold text-cyan-400">2012</p>
        </div>
      </Section>

      <Section title="Espaciados">
        <div className="flex flex-wrap items-end gap-space-4">
          {spaceTokens.map((n) => (
            <div key={n} className="flex flex-col items-center gap-space-2">
              <div
                className="w-8 bg-blue-600"
                style={{ height: `var(--space-${n})` }}
              />
              <span className="text-caption text-text-muted">space-{n}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Radios">
        <div className="flex flex-wrap gap-space-4">
          {radiusTokens.map((token) => (
            <div
              key={token}
              className="flex h-20 w-28 items-center justify-center border-2 border-blue-600 bg-sky-50"
              style={{ borderRadius: `var(--radius-${token})` }}
            >
              <span className="text-caption font-semibold">{token}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Sombras">
        <div className="flex flex-wrap gap-space-5">
          {shadowTokens.map((token) => (
            <div
              key={token}
              className="flex h-24 w-40 items-center justify-center rounded-lg bg-white"
              style={{ boxShadow: `var(--shadow-${token})` }}
            >
              <span className="text-caption font-semibold">shadow-{token}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Degradados">
        <div className="grid gap-space-4 sm:grid-cols-2">
          {gradientTokens.map((token) => (
            <div
              key={token}
              className="flex h-28 items-end rounded-lg p-space-4 text-white"
              style={{ background: `var(--gradient-${token})` }}
            >
              <span className="text-small font-bold">gradient-{token}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Contenedores">
        <div className="space-y-space-3 text-small text-text">
          <div className="rounded-md bg-sky-50 py-space-3 text-center">
            container · 1240px
          </div>
          <div className="mx-auto max-w-container-narrow rounded-md bg-sky-25 py-space-3 text-center">
            container-narrow · 900px
          </div>
        </div>
      </Section>

      <Section title="Icon">
        <div className="flex flex-wrap gap-space-6 text-blue-600">
          {iconNames.map((name) => (
            <div
              key={name}
              className="flex w-16 flex-col items-center gap-space-2 text-text"
            >
              <Icon name={name} size={36} />
              <span className="text-caption font-medium">{name}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Button">
        <div className="flex flex-wrap gap-space-4">
          <Button variant="primary" arrow>
            Solicitar cotización
          </Button>
          <Button variant="outline">Conoce nuestros sectores</Button>
          <Button variant="whatsapp" icon="whatsapp">
            Escribir por WhatsApp
          </Button>
          <Button variant="accent">Agendar</Button>
          <Button size="sm" arrow>
            Cotizar
          </Button>
          <Button disabled>Deshabilitado</Button>
        </div>
        <div className="mt-space-5 flex flex-wrap gap-space-4 rounded-md bg-navy-900 p-5">
          <Button variant="primary" arrow>
            Solicitar cotización
          </Button>
          <Button variant="outline-light" icon="whatsapp">
            Escribir por WhatsApp
          </Button>
        </div>
      </Section>

      <Section title="Chip">
        <div role="group" aria-label="Área del espacio" className="flex flex-wrap gap-2.5">
          <Chip pressed>40</Chip>
          <Chip>60</Chip>
          <Chip disabled>100</Chip>
        </div>
      </Section>

      <Section title="Badge y Eyebrow">
        <div className="flex flex-wrap items-center gap-space-4">
          <Badge>Nuevo</Badge>
          <Badge tone="ok">Revisado</Badge>
          <Eyebrow>Sectores</Eyebrow>
        </div>
        <div className="mt-space-4 rounded-md bg-navy-900 p-space-4">
          <Eyebrow onDark>Cómo trabajamos</Eyebrow>
        </div>
      </Section>

      <Section title="PillarItem">
        <div className="flex flex-wrap gap-space-6 rounded-lg bg-white p-space-3 shadow-float">
          <PillarItem
            icon="wrench"
            title="Instalación"
            description="Proyectos y montajes profesionales."
          />
          <PillarItem
            icon="snow"
            title="Suministro"
            description="Equipos de climatización."
          />
          <PillarItem
            icon="gear"
            title="Mantenimiento"
            description="Preventivo y correctivo."
          />
        </div>
      </Section>

      <Section title="StatItem">
        <div className="flex flex-wrap gap-space-6 rounded-md bg-navy-900 p-space-5">
          <StatItem icon="cal" value="2012" label="Año de fundación" />
          <StatItem
            icon="shield"
            value="3 meses"
            label="Mantenimiento recomendado"
          />
          <StatItem icon="hand" value="8" label="Marcas aliadas" />
        </div>
      </Section>

      <Section title="SectorCard">
        <div className="grid gap-space-4 sm:grid-cols-2 lg:grid-cols-4">
          <SectorCard icon="home" label="Residencial" />
          <SectorCard
            icon="shop"
            label="Comercial"
            from="#3e78d0"
            to="#0f2e69"
          />
          <SectorCard
            icon="fact"
            label="Industrial"
            from="#6b7f9e"
            to="#1b2a44"
          />
          <SectorCard
            icon="snow"
            label="Cuartos fríos"
            from="#7db7e3"
            to="#1e4f86"
          />
        </div>
      </Section>

      <Section title="EquipmentCard">
        <div className="grid gap-space-5 sm:grid-cols-2 lg:grid-cols-3">
          <EquipmentCard
            brand="Confortfresh"
            name="Minisplit Inverter"
            btu="24.000"
            model="INMS"
          />
          <EquipmentCard
            brand="LG"
            name="Cassette Techo"
            btu="54.000"
            model="ATNQ54GMLE3"
          />
          <EquipmentCard
            brand="Samsung"
            name="Mini Split Pared"
            btu="18.000"
            model="AR18KVSPDGM/CB"
          />
        </div>
      </Section>

      <Section title="Field">
        <div className="grid max-w-md gap-space-3 rounded-md bg-navy-900 p-space-5">
          <Field id="demo-name" placeholder="Nombre" />
          <Field id="demo-phone" placeholder="Teléfono o WhatsApp" type="tel" />
          <Field
            id="demo-need"
            placeholder="¿Qué necesitas?"
            options={[
              "Mantenimiento",
              "Reparación",
              "Instalación",
              "Compra de equipo",
            ]}
          />
        </div>
        <div className="mt-space-4 max-w-md">
          <Field id="demo-light" placeholder="Sobre fondo claro" onLight />
        </div>
      </Section>

      <Section title="FaqItem">
        <div className="mx-auto max-w-container-narrow space-y-space-3 rounded-md bg-sky-50 p-space-5">
          <FaqItem question="¿Cada cuánto debo hacer mantenimiento?">
            Recomendamos un mantenimiento preventivo como máximo cada 3 meses.
          </FaqItem>
          <FaqItem question="¿En qué zonas atienden?">
            En Bogotá, Cundinamarca y Meta.
          </FaqItem>
        </div>
      </Section>

      <Section title="ProcessStep">
        <div className="flex flex-wrap gap-7 rounded-md bg-gradient-process p-space-6">
          <ProcessStep icon="clip" label="Cotiza" />
          <ProcessStep icon="cal" label="Agendamos" />
          <ProcessStep icon="tool" label="Ejecutamos" />
          <ProcessStep icon="check" label="Confirmamos" />
        </div>
      </Section>
    </main>
  );
}

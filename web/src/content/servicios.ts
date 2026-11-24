import type { IconName } from "@/components/ui";
import { site } from "@/lib/site";

export type ServiceFaq = {
  question: string;
  answer: string;
};

export type ServiceProcessStep = {
  icon: IconName;
  label: string;
};

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  heroTitle: string;
  icon: IconName;
  cardPoints: readonly [string, string];
  benefits: readonly string[];
  processSteps: readonly ServiceProcessStep[];
  highlights: readonly {
    icon: IconName;
    title: string;
    description: string;
  }[];
  faq: readonly ServiceFaq[];
  meta: {
    title: string;
    description: string;
  };
  cta: {
    bannerTitle: string;
    bannerBody: string;
    primaryHref: string;
    primaryLabel: string;
  };
  listCtaLabel: string;
  listHref?: string;
};

export const servicios: readonly Service[] = [
  {
    slug: "mantenimiento",
    title: "Mantenimiento",
    shortTitle: "Mantenimiento",
    summary:
      "Preventivo, con mano de obra, herramientas y repuestos menores. Limpieza y revisión de unidades, circuito de refrigeración y sistema eléctrico.",
    heroTitle: "Mantenimiento preventivo y correctivo",
    icon: "gear",
    cardPoints: ["Cada 3 meses como máximo", "Ficha por cada visita"],
    benefits: [
      "Limpieza y revisión de las unidades interior y exterior",
      "Revisión del circuito de refrigeración",
      "Revisión del sistema eléctrico",
      "Mano de obra, herramientas y repuestos menores",
      "Ficha de cada visita con partes revisadas y anomalías",
      "Repuestos originales nuevos si hay que reponer una pieza",
    ],
    processSteps: [
      { icon: "clip", label: "Cotiza" },
      { icon: "cal", label: "Agendamos" },
      { icon: "tool", label: "Ejecutamos" },
      { icon: "check", label: "Confirmamos" },
    ],
    highlights: [
      {
        icon: "cal",
        title: "Cada 3 meses",
        description:
          "Recomendamos un mantenimiento preventivo como máximo cada 3 meses.",
      },
      {
        icon: "shield",
        title: "Con ficha",
        description:
          "Queda registro de las partes revisadas y de las anomalías encontradas.",
      },
      {
        icon: "build",
        title: "Repuestos originales",
        description:
          "Si hay que reponer una pieza, se usa repuesto original nuevo.",
      },
      {
        icon: "hand",
        title: "Personal calificado",
        description:
          "Técnicos calificados y certificados para cada tipo de equipo.",
      },
    ],
    faq: [
      {
        question: "¿Cada cuánto debo hacer mantenimiento?",
        answer:
          "Recomendamos un mantenimiento preventivo como máximo cada 3 meses. Cada visita deja una ficha con lo revisado.",
      },
      {
        question: "¿Qué incluye el mantenimiento preventivo?",
        answer:
          "Mano de obra, herramientas y repuestos menores, con limpieza y revisión de las unidades, el circuito de refrigeración y el sistema eléctrico.",
      },
      {
        question: "¿Qué pasa si el equipo necesita una reparación?",
        answer:
          "Se hace mantenimiento correctivo y se reponen las piezas dañadas con repuestos originales nuevos.",
      },
      {
        question: "¿En qué zonas atienden?",
        answer: `En ${site.coverageAreas.join(", ").replace(/, ([^,]*)$/, " y $1")}.`,
      },
    ],
    meta: {
      title: "Mantenimiento de aire acondicionado",
      description:
        "Mantenimiento preventivo y correctivo con ficha de visita. Recomendado cada 3 meses en Bogotá, Cundinamarca y Meta.",
    },
    cta: {
      bannerTitle: "Agenda tu mantenimiento",
      bannerBody: "Elige día y franja en línea, o escríbenos por WhatsApp.",
      primaryHref: "/agendar-mantenimiento",
      primaryLabel: "Agendar mantenimiento",
    },
    listCtaLabel: "Ver servicio",
  },
  {
    slug: "reparacion",
    title: "Reparación",
    shortTitle: "Reparación",
    summary:
      "Mantenimiento correctivo y reposición de piezas dañadas con repuestos originales nuevos.",
    heroTitle: "Reparación con repuestos originales",
    icon: "tool",
    cardPoints: ["Diagnóstico del equipo", "Repuestos originales nuevos"],
    benefits: [
      "Diagnóstico del falla y del estado del equipo",
      "Mantenimiento correctivo con mano de obra calificada",
      "Reposición de piezas dañadas con repuestos originales nuevos",
      "Revisión del circuito de refrigeración y del sistema eléctrico",
      "Informe de lo encontrado y de lo corregido",
      "Cobertura en Bogotá, Cundinamarca y Meta",
    ],
    processSteps: [
      { icon: "clip", label: "Diagnóstico" },
      { icon: "cal", label: "Cotizamos" },
      { icon: "tool", label: "Reparamos" },
      { icon: "check", label: "Confirmamos" },
    ],
    highlights: [
      {
        icon: "tool",
        title: "Diagnóstico",
        description:
          "Revisamos el equipo para identificar la falla antes de cotizar la reparación.",
      },
      {
        icon: "build",
        title: "Repuestos originales",
        description:
          "Las piezas dañadas se reponen con repuestos originales nuevos.",
      },
      {
        icon: "shield",
        title: "Registro",
        description:
          "Queda constancia de lo revisado y de las piezas cambiadas.",
      },
      {
        icon: "hand",
        title: "Personal calificado",
        description:
          "Técnicos calificados y certificados para cada tipo de equipo.",
      },
    ],
    faq: [
      {
        question: "¿Usan repuestos originales?",
        answer:
          "Sí. En las reparaciones se reponen las piezas dañadas con repuestos originales nuevos.",
      },
      {
        question: "¿Qué incluye la visita de reparación?",
        answer:
          "Diagnóstico, mano de obra y, si aplica, reposición de piezas con repuestos originales nuevos.",
      },
      {
        question: "¿Atienden equipos de cualquier marca?",
        answer: `Trabajamos con equipos de ${site.brands.slice(0, 4).join(", ")} y otras marcas del mercado.`,
      },
      {
        question: "¿En qué zonas atienden?",
        answer: `En ${site.coverageAreas.join(", ").replace(/, ([^,]*)$/, " y $1")}.`,
      },
    ],
    meta: {
      title: "Reparación de aire acondicionado",
      description:
        "Reparación y mantenimiento correctivo con repuestos originales en Bogotá, Cundinamarca y Meta.",
    },
    cta: {
      bannerTitle: "Solicita tu reparación",
      bannerBody: "Cuéntanos qué falla presenta el equipo y te orientamos.",
      primaryHref: "/contacto",
      primaryLabel: "Solicitar cotización",
    },
    listCtaLabel: "Ver servicio",
  },
  {
    slug: "instalacion",
    title: "Instalación",
    shortTitle: "Instalación",
    summary:
      "Personal calificado y certificado, con los accesorios de refrigeración necesarios.",
    heroTitle: "Instalación profesional de equipos",
    icon: "wrench",
    cardPoints: ["Residencial, comercial e industrial", "Montaje profesional"],
    benefits: [
      "Personal calificado y certificado",
      "Accesorios de refrigeración necesarios incluidos en el montaje",
      "Instalación residencial, comercial e industrial",
      "Revisión de ubicación, drenaje y conexiones eléctricas",
      "Puesta en marcha y verificación del equipo",
      "Orientación sobre uso y mantenimiento",
    ],
    processSteps: [
      { icon: "clip", label: "Cotiza" },
      { icon: "cal", label: "Agendamos" },
      { icon: "wrench", label: "Instalamos" },
      { icon: "check", label: "Confirmamos" },
    ],
    highlights: [
      {
        icon: "wrench",
        title: "Montaje profesional",
        description:
          "Instalamos con los accesorios de refrigeración necesarios para cada equipo.",
      },
      {
        icon: "home",
        title: "Todos los sectores",
        description:
          "Residencial, comercial e industrial, según el espacio y la capacidad.",
      },
      {
        icon: "hand",
        title: "Personal calificado",
        description:
          "Cada instalación la hace personal calificado y certificado.",
      },
      {
        icon: "check",
        title: "Puesta en marcha",
        description:
          "Verificamos el equipo al terminar e indicamos el uso correcto.",
      },
    ],
    faq: [
      {
        question: "¿Qué incluye la instalación?",
        answer:
          "Mano de obra calificada, accesorios de refrigeración necesarios, puesta en marcha y verificación del equipo.",
      },
      {
        question: "¿Instalan en casa, local e industria?",
        answer:
          "Sí. Atendemos instalaciones residenciales, comerciales e industriales.",
      },
      {
        question: "¿También venden el equipo?",
        answer:
          "Sí. Podemos cotizar suministro e instalación juntos, o solo el montaje del equipo que ya tiene.",
      },
      {
        question: "¿En qué zonas atienden?",
        answer: `En ${site.coverageAreas.join(", ").replace(/, ([^,]*)$/, " y $1")}.`,
      },
    ],
    meta: {
      title: "Instalación de aire acondicionado",
      description:
        "Instalación profesional de aire acondicionado residencial, comercial e industrial en Bogotá, Cundinamarca y Meta.",
    },
    cta: {
      bannerTitle: "Cotiza tu instalación",
      bannerBody: "Cuéntanos el espacio y el equipo; te respondemos pronto.",
      primaryHref: "/contacto",
      primaryLabel: "Solicitar cotización",
    },
    listCtaLabel: "Ver servicio",
  },
  {
    slug: "venta-de-equipos",
    title: "Venta de equipos",
    shortTitle: "Venta de equipos",
    summary: `Equipos de ${site.brands.join(", ")}.`,
    heroTitle: "Suministro de equipos de climatización",
    icon: "snow",
    cardPoints: [
      `${site.equipmentCount} equipos en el catálogo`,
      "Cotización por WhatsApp",
    ],
    benefits: [
      `Catálogo con ${site.equipmentCount} equipos`,
      `Marcas: ${site.brands.join(", ")}`,
      "Orientación de capacidad según el espacio",
      "Cotización por WhatsApp con el equipo elegido",
      "Opción de instalación con el mismo equipo",
      "Fichas técnicas por referencia",
    ],
    processSteps: [
      { icon: "clip", label: "Elige" },
      { icon: "cal", label: "Cotizamos" },
      { icon: "snow", label: "Suministramos" },
      { icon: "check", label: "Confirmamos" },
    ],
    highlights: [
      {
        icon: "snow",
        title: `${site.equipmentCount} equipos`,
        description:
          "Catálogo con referencias de mini split, cassette y más.",
      },
      {
        icon: "hand",
        title: "8 marcas",
        description: `Trabajamos con ${site.brands.slice(0, 4).join(", ")} y más.`,
      },
      {
        icon: "therm",
        title: "Capacidad orientada",
        description:
          "Te ayudamos a estimar la capacidad en BTU según el espacio.",
      },
      {
        icon: "whatsapp",
        title: "Cotización rápida",
        description:
          "Solicita la cotización del equipo por WhatsApp o desde el catálogo.",
      },
    ],
    faq: [
      {
        question: "¿Qué marcas manejan?",
        answer: `LG, Trane, Samsung, Carrier, York, Panasonic, Confortfresh y Daikin.`,
      },
      {
        question: "¿Cuántos equipos hay en el catálogo?",
        answer: `Hay ${site.equipmentCount} equipos en el catálogo, con ficha por referencia.`,
      },
      {
        question: "¿Pueden instalar el equipo que compro?",
        answer:
          "Sí. Podemos cotizar suministro e instalación juntos.",
      },
      {
        question: "¿En qué zonas atienden?",
        answer: `En ${site.coverageAreas.join(", ").replace(/, ([^,]*)$/, " y $1")}.`,
      },
    ],
    meta: {
      title: "Venta de aires acondicionados",
      description: `Catálogo de ${site.equipmentCount} equipos de ${site.brands.slice(0, 4).join(", ")} y más. Cotiza por WhatsApp.`,
    },
    cta: {
      bannerTitle: "Encuentra el equipo para tu espacio",
      bannerBody: "Revisa el catálogo o escríbenos por WhatsApp.",
      primaryHref: "/equipos",
      primaryLabel: "Ver catálogo",
    },
    listCtaLabel: "Ver equipos",
    listHref: "/equipos",
  },
  {
    slug: "refrigeracion",
    title: "Refrigeración comercial e industrial",
    shortTitle: "Refrigeración",
    summary:
      "Instalación, mantenimiento y reparación de sistemas de refrigeración y cuartos fríos.",
    heroTitle: "Refrigeración comercial e industrial",
    icon: "therm",
    cardPoints: ["Comercios e industria", "Cuartos fríos"],
    benefits: [
      "Instalación de sistemas de refrigeración comercial e industrial",
      "Mantenimiento preventivo y correctivo",
      "Reparación de fallas en cuartos fríos y líneas de frío",
      "Revisión de circuito de refrigeración y sistema eléctrico",
      "Personal calificado para entornos comerciales e industriales",
      "Cobertura en Bogotá, Cundinamarca y Meta",
    ],
    processSteps: [
      { icon: "clip", label: "Cotiza" },
      { icon: "cal", label: "Agendamos" },
      { icon: "therm", label: "Ejecutamos" },
      { icon: "check", label: "Confirmamos" },
    ],
    highlights: [
      {
        icon: "therm",
        title: "Cuartos fríos",
        description:
          "Instalación, mantenimiento y reparación de cuartos fríos.",
      },
      {
        icon: "fact",
        title: "Comercio e industria",
        description:
          "Soluciones de refrigeración para negocios e instalaciones industriales.",
      },
      {
        icon: "shield",
        title: "Mantenimiento",
        description:
          "Preventivo y correctivo para cuidar la operación y el producto.",
      },
      {
        icon: "hand",
        title: "Personal calificado",
        description:
          "Técnicos calificados para sistemas de refrigeración exigentes.",
      },
    ],
    faq: [
      {
        question: "¿Qué tipo de refrigeración atienden?",
        answer:
          "Sistemas de refrigeración comercial e industrial, incluyendo cuartos fríos.",
      },
      {
        question: "¿Hacen instalación y mantenimiento?",
        answer:
          "Sí. Instalamos, mantenemos y reparamos sistemas de refrigeración.",
      },
      {
        question: "¿Con qué frecuencia recomiendan mantenimiento?",
        answer:
          "Recomendamos un mantenimiento preventivo como máximo cada 3 meses.",
      },
      {
        question: "¿En qué zonas atienden?",
        answer: `En ${site.coverageAreas.join(", ").replace(/, ([^,]*)$/, " y $1")}.`,
      },
    ],
    meta: {
      title: "Refrigeración comercial e industrial",
      description:
        "Instalación, mantenimiento y reparación de refrigeración y cuartos fríos en Bogotá, Cundinamarca y Meta.",
    },
    cta: {
      bannerTitle: "Cotiza tu proyecto de refrigeración",
      bannerBody: "Cuéntanos el tipo de espacio y te orientamos.",
      primaryHref: "/contacto",
      primaryLabel: "Solicitar cotización",
    },
    listCtaLabel: "Ver servicio",
  },
] as const;

export type ServiceSlug = (typeof servicios)[number]["slug"];

export function getServicio(slug: string): Service | undefined {
  return servicios.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): ServiceSlug[] {
  return servicios.map((service) => service.slug);
}

import type { IconName } from "@/components/ui";
import { site } from "@/lib/site";

export const homePillars = [
  {
    icon: "wrench" as IconName,
    title: "Instalación",
    description: "Proyectos y montajes profesionales.",
    href: "/servicios/instalacion",
  },
  {
    icon: "snow" as IconName,
    title: "Suministro",
    description: "Equipos de climatización.",
    href: "/servicios/venta-de-equipos",
  },
  {
    icon: "gear" as IconName,
    title: "Mantenimiento",
    description: "Preventivo y correctivo.",
    href: "/servicios/mantenimiento",
  },
  {
    icon: "therm" as IconName,
    title: "Refrigeración",
    description: "Soluciones comerciales e industriales.",
    href: "/servicios/refrigeracion",
  },
] as const;

export const homeFacts = [
  {
    icon: "cal" as IconName,
    value: String(site.foundedYear),
    label: "Año de fundación",
  },
  {
    icon: "shield" as IconName,
    value: `${site.maintenanceMonths} meses`,
    label: "Mantenimiento recomendado",
  },
  {
    icon: "hand" as IconName,
    value: String(site.brands.length),
    label: "Marcas aliadas",
  },
  {
    icon: "build" as IconName,
    value: String(site.equipmentCount),
    label: "Equipos en el catálogo",
  },
] as const;

export const homeSectors = [
  {
    icon: "home" as IconName,
    label: "Residencial",
    description: "Mini splits para apartamentos y casas.",
    from: "#5E8FD6",
    to: "#16396F",
  },
  {
    icon: "shop" as IconName,
    label: "Comercial",
    description: "Locales, oficinas y establecimientos.",
    from: "#3E78D0",
    to: "#0F2E69",
  },
  {
    icon: "fact" as IconName,
    label: "Industrial",
    description: "Sistemas de mayor capacidad.",
    from: "#6B7F9E",
    to: "#1B2A44",
  },
  {
    icon: "snow" as IconName,
    label: "Cuartos fríos",
    description: "Instalación, mantenimiento y reparación.",
    from: "#7DB7E3",
    to: "#1E4F86",
  },
] as const;

export const homeProcessSteps = [
  { icon: "clip" as IconName, label: "Cotiza" },
  { icon: "cal" as IconName, label: "Agendamos" },
  { icon: "tool" as IconName, label: "Ejecutamos" },
  { icon: "check" as IconName, label: "Confirmamos" },
] as const;

export const homeMaintenancePerks = [
  "Visita programada cada 3 meses como máximo",
  "Ficha de cada visita con las partes revisadas",
  "Historial de equipos y servicios en el portal",
  "Recordatorio por WhatsApp antes de la próxima visita",
] as const;

export const homeVisitChecks = [
  "Limpieza de unidades interior y exterior",
  "Circuito de refrigeración",
  "Sistema eléctrico",
  "Drenaje y filtros",
] as const;

export const homeFaq = [
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
    question: "¿Usan repuestos originales?",
    answer:
      "Sí. En las reparaciones se reponen las piezas dañadas con repuestos originales nuevos.",
  },
  {
    question: "¿En qué zonas atienden?",
    answer: `En ${site.coverageAreas.join(", ").replace(/, ([^,]*)$/, " y $1")}.`,
  },
] as const;

export const quoteNeedOptions = [
  "Mantenimiento",
  "Reparación",
  "Instalación",
  "Compra de equipo",
  "Refrigeración / cuarto frío",
] as const;

export const companyCommitments = [
  {
    icon: "hand" as IconName,
    title: "Personal calificado y certificado",
    description: "Cada instalación y servicio lo hace gente capacitada.",
  },
  {
    icon: "build" as IconName,
    title: "Repuestos originales",
    description: "Las reparaciones se hacen con repuestos originales nuevos.",
  },
  {
    icon: "cal" as IconName,
    title: "Mantenimiento cada 3 meses",
    description: "Como máximo, para cuidar el equipo y el consumo.",
  },
  {
    icon: "clip" as IconName,
    title: "Registro de cada visita",
    description: "Una ficha con partes revisadas y anomalías encontradas.",
  },
] as const;

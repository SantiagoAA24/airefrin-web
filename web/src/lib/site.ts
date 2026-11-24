/** Datos reales de Airefrin — fuente: docs/datos-del-cliente.md */

export const site = {
  name: "Airefrin S.A.S.",
  shortName: "Airefrin",
  tagline:
    "Venta, instalación y mantenimiento de aire acondicionado y refrigeración comercial e industrial.",
  foundedYear: 2012,
  coverage: "Bogotá · Cundinamarca · Meta",
  coverageAreas: ["Bogotá", "Cundinamarca", "Meta"] as const,
  phoneDisplay: "601 571 4350",
  phoneHref: "tel:+576015714350",
  whatsappDisplay: "310 474 5946",
  whatsappHref: "https://wa.me/573104745946",
  email: "soporte@aireacondicionadosas.com",
  emailHref: "mailto:soporte@aireacondicionadosas.com",
  facebook: "AirefrinSas",
  facebookHref: "https://www.facebook.com/AirefrinSas",
  brands: [
    "LG",
    "Trane",
    "Samsung",
    "Carrier",
    "York",
    "Panasonic",
    "Confortfresh",
    "Daikin",
  ] as const,
  equipmentCount: 19,
  maintenanceMonths: 3,
  analytics: {
    ga4: "G-019PPWTPL6",
    googleAds: "AW-1008038724",
    gtm: "GTM-MR6B733",
  },
  url: "https://aireacondicionadosas.com",
} as const;

export const mainNav = [
  { href: "/", label: "Inicio" },
  { href: "/servicios", label: "Servicios" },
  { href: "/equipos", label: "Equipos" },
  { href: "/empresa", label: "Empresa" },
  { href: "/contacto", label: "Contacto" },
] as const;

export const COOKIE_CONSENT_KEY = "airefrin-cookie-consent";

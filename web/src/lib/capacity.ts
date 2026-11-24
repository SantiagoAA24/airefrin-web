import { whatsappUrl } from "./whatsapp";

export const AREA_OPTIONS = [15, 25, 40, 60, 100] as const;
export const PERSON_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8] as const;
export const HEAT_EQUIPMENT_OPTIONS = [0, 1, 2, 3] as const;

/** Capacidades comerciales alineadas al filtro del catálogo. */
export const STANDARD_BTU = [
  9000, 12000, 18000, 24000, 36000, 54000,
] as const;

export type Exposicion = "normal" | "mucho_sol";

export type CapacityInput = {
  areaM2: number;
  personas: number;
  exposicion: Exposicion;
  equiposCalor: number;
};

export type CapacityResult = {
  needBtu: number;
  commercialBtu: number | null;
  catalogHref: string | null;
  whatsappHref: string;
};

const BTU_PER_M2 = 600;
const INCLUDED_PEOPLE = 2;
const BTU_PER_EXTRA_PERSON = 600;
const BTU_PER_HEAT_EQUIPMENT = 1200;
const SUN_FACTOR = 1.15;
const ROUND_TO = 500;

/**
 * Estimación orientativa de capacidad en BTU.
 * Supuestos: 600 BTU/m²; 2 personas incluidas; +600 por persona extra;
 * +1200 por equipo de calor; +15 % con mucho sol; redondeo a 500;
 * match a capacidad comercial del catálogo.
 */
export function estimateCapacity(input: CapacityInput): CapacityResult {
  const areaM2 = Math.max(0, input.areaM2);
  const personas = Math.max(0, Math.floor(input.personas));
  const equiposCalor = Math.max(0, Math.floor(input.equiposCalor));

  let raw =
    areaM2 * BTU_PER_M2 +
    Math.max(0, personas - INCLUDED_PEOPLE) * BTU_PER_EXTRA_PERSON +
    equiposCalor * BTU_PER_HEAT_EQUIPMENT;

  if (input.exposicion === "mucho_sol") {
    raw *= SUN_FACTOR;
  }

  const needBtu = Math.round(raw / ROUND_TO) * ROUND_TO;
  const commercialBtu =
    STANDARD_BTU.find((value) => value >= needBtu) ?? null;

  const catalogHref = commercialBtu
    ? `/equipos?btu_min=${commercialBtu}&btu_max=${commercialBtu}`
    : null;

  return {
    needBtu,
    commercialBtu,
    catalogHref,
    whatsappHref: whatsappUrl(capacityQuoteMessage({ ...input, needBtu, commercialBtu })),
  };
}

export function capacityQuoteMessage(params: {
  areaM2: number;
  personas: number;
  exposicion: Exposicion;
  equiposCalor: number;
  needBtu: number;
  commercialBtu: number | null;
}): string {
  const sun =
    params.exposicion === "mucho_sol" ? " con mucho sol o calor" : "";
  const heat =
    params.equiposCalor > 0
      ? `, ${params.equiposCalor} equipo${params.equiposCalor === 1 ? "" : "s"} de calor`
      : "";
  const capacity = params.commercialBtu
    ? `${params.commercialBtu}`
    : `${params.needBtu} (requiere estudio técnico)`;

  return (
    `Hola Airefrin, quiero cotizar un equipo de ${capacity} BTU ` +
    `para un espacio de ${params.areaM2} m²` +
    `${sun}, ${params.personas} persona${params.personas === 1 ? "" : "s"}` +
    `${heat}.`
  );
}

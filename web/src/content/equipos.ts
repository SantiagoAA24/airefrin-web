/**
 * Featured equipment content.
 * Typed source that will later be replaced by the API catalog.
 */

export type FeaturedEquipment = {
  slug: string;
  brand: string;
  name: string;
  btu: string;
  model: string;
};

export const featuredEquipment: readonly FeaturedEquipment[] = [
  {
    slug: "confortfresh-minisplit-inverter-24000",
    brand: "Confortfresh",
    name: "Minisplit Inverter",
    btu: "24.000",
    model: "INMS",
  },
  {
    slug: "samsung-ar18kvspdgm-cb",
    brand: "Samsung",
    name: "Mini Split Pared",
    btu: "18.000",
    model: "AR18KVSPDGM/CB",
  },
  {
    slug: "lg-atnq54gmle3",
    brand: "LG",
    name: "Cassette Techo",
    btu: "54.000",
    model: "ATNQ54GMLE3",
  },
  {
    slug: "lg-vm182c7",
    brand: "LG",
    name: "Mini Split Pared",
    btu: "18.000",
    model: "VM182C7",
  },
] as const;

export const featuredBrandFilters = [
  "Todas",
  "LG",
  "Samsung",
  "Confortfresh",
] as const;

export type FeaturedBrandFilter = (typeof featuredBrandFilters)[number];

/** Temporary content accessor; will call the API when the catalog endpoint exists. */
export function getFeaturedEquipment(
  brand: FeaturedBrandFilter = "Todas",
): FeaturedEquipment[] {
  if (brand === "Todas") {
    return [...featuredEquipment];
  }
  return featuredEquipment.filter((item) => item.brand === brand);
}

export function quoteEquipmentMessage(item: FeaturedEquipment): string {
  return `Hola Airefrin, quiero cotizar el equipo ${item.brand} ${item.name} ${item.btu} BTU (ref. ${item.model}).`;
}

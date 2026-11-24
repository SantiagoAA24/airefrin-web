/** Formats BTU capacity for display (e.g. 24000 → "24.000"). */
export function formatBtu(value: number): string {
  return new Intl.NumberFormat("es-CO").format(value);
}

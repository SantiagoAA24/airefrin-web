type QuoteEquipment = {
  brand: string;
  name: string;
  btu: string;
  model: string;
};

export function quoteEquipmentMessage(item: QuoteEquipment): string {
  return `Hola Airefrin, quiero cotizar el equipo ${item.brand} ${item.name} ${item.btu} BTU (ref. ${item.model}).`;
}

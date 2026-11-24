import { Badge } from "@/components/ui";

const defaultChecks = [
  "Limpieza de unidades",
  "Circuito de refrigeración",
  "Sistema eléctrico",
  "Drenaje y filtros",
] as const;

type VisitCardExampleProps = {
  checks?: readonly string[];
};

export function VisitCardExample({
  checks = defaultChecks,
}: VisitCardExampleProps) {
  return (
    <div className="rounded-lg bg-sky-50 p-[30px]">
      <div className="rounded-md bg-white p-6 shadow-panel">
        <div className="flex items-center justify-between gap-space-3">
          <div className="text-[13px] font-extrabold tracking-[0.05em] text-blue-600">
            FICHA DE VISITA · EJEMPLO
          </div>
          <Badge tone="ok">Revisado</Badge>
        </div>
        <div className="mt-[14px] text-[17px] font-bold text-navy-800">
          Mantenimiento preventivo · Mini split 18.000 BTU
        </div>
        <div className="mt-[14px] flex flex-col gap-2.5 text-[15px] text-text">
          {checks.map((item) => (
            <div
              key={item}
              className="flex justify-between gap-space-3 border-b border-dashed border-[#C9D6EC] pb-space-2"
            >
              <span>{item}</span>
              <span className="font-bold text-green-700">OK</span>
            </div>
          ))}
        </div>
        <div className="mt-space-4 text-small text-text">
          Próxima visita sugerida: en 3 meses.
        </div>
      </div>
    </div>
  );
}

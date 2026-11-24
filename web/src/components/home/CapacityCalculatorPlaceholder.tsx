import { Badge } from "@/components/ui";
import { cn } from "@/lib/cn";

function PlaceholderChip({
  children,
  pressed = false,
  className,
}: {
  children: string;
  pressed?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-[46px] min-w-16 items-center justify-center rounded-pill border-2 px-5 text-[15px] font-bold leading-none",
        pressed
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-border-control bg-white text-navy-800",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Provisional slot for the BTU calculator until the technical rule is validated. */
export function CapacityCalculatorPlaceholder() {
  return (
    <section aria-labelledby="calc-heading" className="bg-sky-50">
      <div className="container-page flex flex-wrap items-center gap-12 py-space-9">
        <div className="min-w-0 flex-[1_1_380px]">
          <Badge>Nuevo</Badge>
          <h2
            id="calc-heading"
            className="mt-space-3 text-[clamp(30px,3.4vw,44px)] leading-[1.08] font-extrabold text-navy-800 uppercase"
          >
            ¿Qué equipo necesita su espacio?
          </h2>
          <p className="mt-space-4 text-[18px] leading-[1.6] text-[#2B3B55]">
            Elija el área y la exposición: le sugerimos la capacidad en BTU y le
            enviamos la cotización por WhatsApp. Una visita técnica confirma el
            cálculo exacto.
          </p>
        </div>
        <div className="min-w-0 flex-[1_1_440px] rounded-lg bg-white p-space-6 shadow-panel">
          <p className="rounded-md border border-dashed border-line bg-sky-25 px-space-4 py-space-3 text-small text-text-muted">
            [Calculadora de capacidad · provisional · regla BTU por validar con
            el equipo técnico]
          </p>
          <div className="mt-space-5 text-small font-bold text-text">
            Área del espacio (m²)
          </div>
          <div className="mt-2.5 flex flex-wrap gap-2.5" aria-hidden>
            {["15", "25", "40", "60", "100"].map((size, index) => (
              <PlaceholderChip key={size} pressed={index === 2}>
                {size}
              </PlaceholderChip>
            ))}
          </div>
          <div className="mt-5 text-small font-bold text-text">Exposición</div>
          <div className="mt-2.5 flex flex-wrap gap-2.5" aria-hidden>
            <PlaceholderChip pressed className="min-w-[140px] flex-1">
              Normal
            </PlaceholderChip>
            <PlaceholderChip className="min-w-[140px] flex-1">
              Mucho sol o calor
            </PlaceholderChip>
          </div>
          <div className="mt-space-5 border-t border-line pt-[22px]">
            <div className="text-small text-text">Capacidad estimada</div>
            <div className="text-[46px] leading-[1.1] font-extrabold text-navy-800">
              —{" "}
              <span className="text-[18px] font-bold text-text">BTU/h</span>
            </div>
            <p className="mt-space-3 text-[13px] leading-[1.5] text-text-muted">
              Estimación orientativa de referencia. Debe validarse con el equipo
              técnico.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

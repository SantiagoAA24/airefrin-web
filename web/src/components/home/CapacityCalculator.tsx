"use client";

import { useState } from "react";
import { Badge, Button, Chip } from "@/components/ui";
import {
  AREA_OPTIONS,
  estimateCapacity,
  HEAT_EQUIPMENT_OPTIONS,
  PERSON_OPTIONS,
  type Exposicion,
} from "@/lib/capacity";
import { formatBtu } from "@/lib/format";

export function CapacityCalculator() {
  const [areaM2, setAreaM2] = useState<(typeof AREA_OPTIONS)[number]>(40);
  const [personas, setPersonas] = useState<(typeof PERSON_OPTIONS)[number]>(2);
  const [exposicion, setExposicion] = useState<Exposicion>("normal");
  const [equiposCalor, setEquiposCalor] =
    useState<(typeof HEAT_EQUIPMENT_OPTIONS)[number]>(0);

  const result = estimateCapacity({
    areaM2,
    personas,
    exposicion,
    equiposCalor,
  });

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
          <p className="mt-space-4 text-[18px] leading-[1.6] text-text">
            Indique el área, las personas, la exposición y los equipos de calor:
            le sugerimos la capacidad en BTU y le enviamos la cotización por
            WhatsApp. Una visita técnica confirma el cálculo exacto.
          </p>
        </div>

        <div className="min-w-0 flex-[1_1_440px] rounded-lg bg-white p-space-6 shadow-panel">
          <fieldset className="border-0 p-0">
            <legend className="text-small font-bold text-text">
              Área del espacio (m²)
            </legend>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {AREA_OPTIONS.map((size) => (
                <Chip
                  key={size}
                  pressed={areaM2 === size}
                  onClick={() => setAreaM2(size)}
                  aria-label={`${size} metros cuadrados`}
                >
                  {String(size)}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5 border-0 p-0">
            <legend className="text-small font-bold text-text">
              Personas en el espacio
            </legend>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {PERSON_OPTIONS.map((count) => (
                <Chip
                  key={count}
                  pressed={personas === count}
                  onClick={() => setPersonas(count)}
                  aria-label={`${count} persona${count === 1 ? "" : "s"}`}
                >
                  {String(count)}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-5 border-0 p-0">
            <legend className="text-small font-bold text-text">Exposición</legend>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              <Chip
                pressed={exposicion === "normal"}
                onClick={() => setExposicion("normal")}
                className="min-w-[140px] flex-1"
              >
                Normal
              </Chip>
              <Chip
                pressed={exposicion === "mucho_sol"}
                onClick={() => setExposicion("mucho_sol")}
                className="min-w-[140px] flex-1"
              >
                Mucho sol o calor
              </Chip>
            </div>
          </fieldset>

          <fieldset className="mt-5 border-0 p-0">
            <legend className="text-small font-bold text-text">
              Equipos de calor
            </legend>
            <div className="mt-2.5 flex flex-wrap gap-2.5">
              {HEAT_EQUIPMENT_OPTIONS.map((count) => (
                <Chip
                  key={count}
                  pressed={equiposCalor === count}
                  onClick={() => setEquiposCalor(count)}
                  aria-label={
                    count === 0
                      ? "Sin equipos de calor"
                      : `${count} equipo${count === 1 ? "" : "s"} de calor`
                  }
                >
                  {String(count)}
                </Chip>
              ))}
            </div>
          </fieldset>

          <div className="mt-space-5 border-t border-line pt-[22px]">
            <div className="text-small text-text">Capacidad estimada</div>
            <div
              className="text-[46px] leading-[1.1] font-extrabold text-navy-800"
              aria-live="polite"
            >
              {formatBtu(result.needBtu)}{" "}
              <span className="text-[18px] font-bold text-text">BTU/h</span>
            </div>
            <p className="mt-2 text-[15px] font-bold text-navy-800">
              {result.commercialBtu
                ? `Equipo sugerido: ${formatBtu(result.commercialBtu)} BTU`
                : "Requiere estudio técnico"}
            </p>
            <p className="mt-space-3 text-[13px] leading-[1.5] text-text-muted">
              Estimación orientativa de referencia. Debe validarse con el equipo
              técnico.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              {result.catalogHref ? (
                <Button href={result.catalogHref} variant="outline" size="sm">
                  Ver equipos
                </Button>
              ) : null}
              <Button
                href={result.whatsappHref}
                variant="whatsapp"
                size="sm"
                icon="whatsapp"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cotizar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

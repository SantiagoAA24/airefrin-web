import { Icon } from "@/components/ui";
import { site } from "@/lib/site";

export function ContactMeta() {
  return (
    <div className="flex flex-col gap-3.5">
      <div className="flex items-center gap-4 rounded-lg bg-sky-50 p-5">
        <div className="shrink-0 text-blue-600" aria-hidden>
          <Icon name="pin" size={30} />
        </div>
        <div className="text-[15px] leading-[1.5] text-text">
          <strong className="text-navy-800">Cobertura:</strong>{" "}
          {site.coverageAreas.join(", ").replace(/, ([^,]*)$/, " y $1")}.
          <br />
          <strong className="text-navy-800">Horario:</strong>{" "}
          [por confirmar con el cliente]
          <br />
          <strong className="text-navy-800">Facebook:</strong>{" "}
          <a
            href={site.facebookHref}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline-offset-2 hover:underline focus-visible:focus-ring"
          >
            {site.facebook}
          </a>
        </div>
      </div>
      <div
        className="flex h-[220px] items-center justify-center rounded-lg bg-line text-[13px] text-text-muted"
        role="img"
        aria-label="Mapa pendiente de la ubicación de la oficina"
      >
        [Mapa con la ubicación de la oficina]
      </div>
    </div>
  );
}

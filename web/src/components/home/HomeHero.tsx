import { Button } from "@/components/ui";
import { site } from "@/lib/site";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero">
      <div
        className="pointer-events-none absolute top-0 right-0 hidden h-full w-[62%] min-w-[560px] opacity-95 md:block"
        aria-hidden
      >
        <svg
          viewBox="0 0 900 560"
          preserveAspectRatio="xMaxYMid slice"
          className="h-full w-full"
        >
          <defs>
            <linearGradient id="home-air" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#7FD6FF" stopOpacity="0.95" />
              <stop offset="1" stopColor="#1E7BFF" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="home-win" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#5AA9F5" stopOpacity="0.55" />
              <stop offset="1" stopColor="#0B3A8E" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="home-panel" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F4F8FF" />
              <stop offset="1" stopColor="#B9C9E4" />
            </linearGradient>
          </defs>
          <rect x="330" y="150" width="110" height="300" fill="url(#home-win)" />
          <rect x="450" y="150" width="110" height="300" fill="url(#home-win)" />
          <rect x="570" y="150" width="110" height="300" fill="url(#home-win)" />
          <rect x="690" y="150" width="110" height="300" fill="url(#home-win)" />
          <g
            fill="none"
            stroke="url(#home-air)"
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.9"
          >
            <path d="M520 150 C470 230 440 300 330 380" />
            <path d="M550 152 C520 240 500 320 430 410" />
            <path d="M590 154 C590 250 590 330 580 430" />
            <path d="M630 152 C660 240 690 320 760 410" />
            <path d="M660 150 C720 230 770 300 860 370" />
          </g>
          <polygon
            points="430,60 720,40 790,120 470,160"
            fill="url(#home-panel)"
            stroke="#DCE7F8"
            strokeWidth="2"
          />
        </svg>
      </div>

      <div className="relative container-page pt-[72px] pb-[150px]">
        <div className="max-w-[700px]">
          <div className="text-[15px] font-bold tracking-[0.06em] text-cyan-400 uppercase">
            Refrigeración y aire acondicionado
          </div>
          <h1 className="mt-[14px] text-[clamp(40px,5.6vw,76px)] leading-[1.02] font-extrabold tracking-[-0.01em] text-white uppercase">
            Climatizamos tus espacios.
            <br />
            <span className="italic text-cyan-400">
              Impulsamos tu operación.
            </span>
          </h1>
          <p className="mt-space-5 max-w-[560px] text-[clamp(17px,1.6vw,21px)] leading-[1.55] text-on-dark">
            Soluciones de suministro, instalación, mantenimiento y refrigeración
            comercial e industrial.
          </p>
          <div className="mt-[34px] flex flex-wrap gap-space-4">
            <Button href="/contacto" arrow className="text-[17px] px-[34px] py-[18px]">
              Solicitar cotización
            </Button>
            <Button
              variant="outline-light"
              href={site.whatsappHref}
              icon="whatsapp"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[17px]"
            >
              Escribir por WhatsApp
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute right-space-5 bottom-24 text-right text-caption text-[#9FC4F0]">
        [Ilustración provisional · se reemplaza por foto real de una instalación]
      </div>
    </section>
  );
}

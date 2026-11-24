import { Button } from "@/components/ui";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

type CtaBannerProps = {
  title: string;
  body: string;
  primaryHref?: string;
  primaryLabel?: string;
  whatsappMessage?: string;
};

export function CtaBanner({
  title,
  body,
  primaryHref = "/contacto",
  primaryLabel = "Solicitar cotización",
  whatsappMessage = "Hola Airefrin, quiero una cotización.",
}: CtaBannerProps) {
  return (
    <section className="bg-white px-space-5 pt-5 pb-[70px]">
      <div className="container-page flex flex-wrap items-center justify-between gap-7 rounded-xl bg-gradient-cover p-space-7 text-white">
        <div className="min-w-0 flex-[1_1_360px]">
          <div className="text-[clamp(24px,2.6vw,34px)] leading-[1.1] font-extrabold">
            {title}
          </div>
          <div className="mt-2.5 text-body leading-[1.5] text-on-dark">
            {body}
          </div>
        </div>
        <div className="flex flex-wrap gap-[14px]">
          <Button href={primaryHref} arrow>
            {primaryLabel}
          </Button>
          <Button
            variant="outline-light"
            href={whatsappUrl(whatsappMessage)}
            icon="whatsapp"
            rel="noopener noreferrer"
            target="_blank"
          >
            Escribir por WhatsApp
          </Button>
        </div>
      </div>
      <p className="sr-only">
        También puede llamar al {site.phoneDisplay}.
      </p>
    </section>
  );
}

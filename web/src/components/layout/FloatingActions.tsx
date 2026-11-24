import { Icon } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export function FloatingActions() {
  return (
    <div className="fixed right-5 bottom-5 z-40 flex flex-col items-end gap-space-3">
      <a
        href={site.phoneHref}
        aria-label={`Llamar a ${site.phoneDisplay}`}
        className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-navy-800 text-white shadow-[0_8px_22px_rgba(5,36,96,0.35)] transition hover:brightness-110 focus-visible:focus-ring"
      >
        <Icon name="phone" size={26} stroke={2} />
      </a>
      <a
        href={site.whatsappHref}
        aria-label="Escribir por WhatsApp"
        rel="noopener noreferrer"
        target="_blank"
        className="flex h-[58px] w-[58px] items-center justify-center rounded-full bg-green-700 text-white shadow-[0_8px_22px_rgba(14,122,63,0.4)] transition hover:brightness-110 focus-visible:focus-ring"
      >
        <Icon name="whatsapp" size={30} stroke={2} />
      </a>
    </div>
  );
}

import { Button, Icon } from "@/components/ui";
import { site } from "@/lib/site";

const channels = [
  {
    key: "whatsapp",
    title: "WhatsApp",
    value: site.whatsappDisplay,
    href: site.whatsappHref,
    icon: "whatsapp" as const,
    action: "Escribir",
    variant: "whatsapp" as const,
  },
  {
    key: "phone",
    title: "Teléfono",
    value: site.phoneDisplay,
    href: site.phoneHref,
    icon: "phone" as const,
    action: "Llamar",
    variant: "outline" as const,
  },
  {
    key: "email",
    title: "Correo",
    value: site.email,
    href: site.emailHref,
    icon: "mail" as const,
    action: "Enviar",
    variant: "outline" as const,
  },
] as const;

export function ContactChannels() {
  return (
    <div className="flex flex-col gap-3.5">
      {channels.map((channel) => (
        <div
          key={channel.key}
          className="flex items-center gap-4 rounded-lg border-[1.5px] border-line bg-white p-5"
        >
          <div
            className="flex size-[52px] shrink-0 items-center justify-center rounded-[14px] bg-sky-50 text-blue-600"
            aria-hidden
          >
            <Icon name={channel.icon} size={26} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-[17px] font-extrabold text-navy-800">
              {channel.title}
            </div>
            <div className="mt-0.5 text-[15px] text-text">{channel.value}</div>
          </div>
          <Button
            href={channel.href}
            variant={channel.variant}
            size="sm"
            target={channel.key === "whatsapp" ? "_blank" : undefined}
            rel={channel.key === "whatsapp" ? "noopener noreferrer" : undefined}
          >
            {channel.action}
          </Button>
        </div>
      ))}
    </div>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Button, Field } from "@/components/ui";
import { whatsappUrl } from "@/lib/whatsapp";

const spaceOptions = [
  "Residencial",
  "Comercial",
  "Industrial",
  "Cuarto frío",
] as const;

type ServiceQuoteFormProps = {
  serviceTitle: string;
  heading?: string;
};

export function ServiceQuoteForm({
  serviceTitle,
  heading = "Cotizar servicio",
}: ServiceQuoteFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [space, setSpace] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = `Hola Airefrin, soy ${name || "[nombre]"}. Quiero cotizar ${serviceTitle}. Tipo de espacio: ${space || "[espacio]"}. Mi contacto: ${phone || "[teléfono]"}.`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg bg-white p-7 text-ink shadow-float"
    >
      <div className="text-[20px] font-extrabold text-navy-800">{heading}</div>
      <div className="mt-1.5 text-small text-text">
        Te respondemos por WhatsApp o teléfono.
      </div>
      <div className="mt-5 flex flex-col gap-[14px]">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="service-quote-name"
            className="text-small font-bold text-ink"
          >
            Nombre
          </label>
          <Field
            id="service-quote-name"
            placeholder="Tu nombre"
            onLight
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="service-quote-phone"
            className="text-small font-bold text-ink"
          >
            Teléfono o WhatsApp
          </label>
          <Field
            id="service-quote-phone"
            type="tel"
            placeholder="300 000 0000"
            onLight
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="service-quote-space"
            className="text-small font-bold text-ink"
          >
            Tipo de espacio
          </label>
          <Field
            id="service-quote-space"
            placeholder="Selecciona"
            options={[...spaceOptions]}
            onLight
            name="space"
            value={space}
            onChange={(e) => setSpace(e.target.value)}
            required
          />
        </div>
      </div>
      <div className="mt-[18px]">
        <Button type="submit" arrow className="w-full">
          Enviar solicitud
        </Button>
      </div>
    </form>
  );
}

"use client";

import { useState, type FormEvent } from "react";
import { Button, Field } from "@/components/ui";
import { quoteNeedOptions } from "@/content/home";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";

export function HomeQuoteForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [need, setNeed] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const message = `Hola Airefrin, soy ${name || "[nombre]"}. Necesito: ${need || "[servicio]"}. Mi contacto: ${phone || "[teléfono]"}.`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="cotizar" className="bg-white px-space-5 py-[60px] pb-[70px]">
      <div className="container-page flex flex-wrap items-center gap-9 rounded-xl bg-gradient-cover p-space-7 text-white">
        <div className="flex min-w-0 flex-[1_1_300px] items-center gap-[18px]">
          <svg
            width="46"
            height="46"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="shrink-0 text-cyan-400"
            aria-hidden
          >
            <path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12zm0-9a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
          </svg>
          <div>
            <div className="text-[clamp(24px,2.4vw,32px)] leading-[1.1] font-extrabold">
              Llegamos donde está tu equipo
            </div>
            <div className="mt-2.5 text-[15px] leading-[1.5] text-[#D3E1F8]">
              Atendemos en {site.coverageAreas.join(", ").replace(/, ([^,]*)$/, " y $1")}.
            </div>
          </div>
        </div>

        <div className="hidden flex-[0_0_150px] justify-center lg:flex" aria-hidden>
          <svg width="140" height="170" viewBox="0 0 140 170">
            <path
              d="M60 6l22 8 16 18 22 4 6 22-12 14 8 22-14 18-4 26-20 14-18-10-8-24-18-12 4-22-20-20 6-22 18-6 12-24z"
              fill="#1E6BDB"
              stroke="#7FD6FF"
              strokeWidth="2"
              opacity="0.9"
            />
            <circle cx="78" cy="96" r="4" fill="#fff" />
            <circle cx="92" cy="110" r="3" fill="#fff" />
            <circle cx="64" cy="82" r="3" fill="#fff" />
          </svg>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex min-w-0 flex-[2_1_520px] flex-wrap gap-space-3"
        >
          <div className="w-full text-[18px] font-bold">
            Solicita tu cotización
          </div>
          <div className="min-w-0 flex-[1_1_200px]">
            <Field
              id="home-name"
              placeholder="Nombre"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="min-w-0 flex-[1_1_200px]">
            <Field
              id="home-phone"
              type="tel"
              placeholder="Teléfono o WhatsApp"
              name="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="min-w-0 flex-[1_1_240px]">
            <Field
              id="home-need"
              placeholder="¿Qué necesitas?"
              options={[...quoteNeedOptions]}
              name="need"
              value={need}
              onChange={(e) => setNeed(e.target.value)}
              required
            />
          </div>
          <Button
            type="submit"
            arrow
            className="h-[52px] min-w-0 flex-[1_1_200px] rounded-sm px-space-4"
          >
            Enviar solicitud
          </Button>
          <p className="w-full text-caption leading-[1.5] text-on-dark-muted">
            Al enviar acepta el tratamiento de sus datos.{" "}
            <span className="underline">[ENLACE A POLÍTICA DE DATOS]</span>
          </p>
        </form>
      </div>
    </section>
  );
}

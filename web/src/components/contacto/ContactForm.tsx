"use client";

import { useState, type FormEvent } from "react";
import { Button, Field } from "@/components/ui";
import {
  contactNeedOptions,
  contactSpaceOptions,
} from "@/content/contacto";
import { trackEvent } from "@/lib/analytics";
import { ApiError, submitContacto } from "@/lib/api";
import { cn } from "@/lib/cn";

type FormErrors = Partial<
  Record<
    "nombre" | "telefono" | "correo" | "necesidad" | "tipo_espacio" | "autorizacion",
    string
  >
>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(values: {
  nombre: string;
  telefono: string;
  correo: string;
  necesidad: string;
  tipoEspacio: string;
  autorizacion: boolean;
}): FormErrors {
  const errors: FormErrors = {};
  if (values.nombre.trim().length < 2) {
    errors.nombre = "Ingresa tu nombre.";
  }
  if (values.telefono.trim().length < 7) {
    errors.telefono = "Ingresa un teléfono o WhatsApp válido.";
  }
  if (values.correo.trim() && !EMAIL_RE.test(values.correo.trim())) {
    errors.correo = "Ingresa un correo válido.";
  }
  if (!values.necesidad) {
    errors.necesidad = "Selecciona qué necesitas.";
  }
  if (!values.tipoEspacio) {
    errors.tipo_espacio = "Selecciona el tipo de espacio.";
  }
  if (!values.autorizacion) {
    errors.autorizacion =
      "Debes autorizar el tratamiento de datos personales (Ley 1581 de 2012).";
  }
  return errors;
}

export function ContactForm() {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [correo, setCorreo] = useState("");
  const [necesidad, setNecesidad] = useState("");
  const [tipoEspacio, setTipoEspacio] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [autorizacion, setAutorizacion] = useState(false);
  const [website, setWebsite] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate({
      nombre,
      telefono,
      correo,
      necesidad,
      tipoEspacio,
      autorizacion,
    });
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("loading");
    setServerMessage(null);

    try {
      const response = await submitContacto({
        nombre: nombre.trim(),
        telefono: telefono.trim(),
        correo: correo.trim() || null,
        necesidad: necesidad as (typeof contactNeedOptions)[number],
        tipo_espacio: tipoEspacio as (typeof contactSpaceOptions)[number],
        mensaje: mensaje.trim(),
        autorizacion_datos: true,
        website,
      });
      trackEvent("form_submit", { form: "contacto" });
      setStatus("success");
      setServerMessage(response.message);
      setNombre("");
      setTelefono("");
      setCorreo("");
      setNecesidad("");
      setTipoEspacio("");
      setMensaje("");
      setAutorizacion(false);
      setWebsite("");
    } catch (error) {
      setStatus("error");
      setServerMessage(
        error instanceof ApiError
          ? error.message
          : "No pudimos enviar tu solicitud. Intenta de nuevo.",
      );
    }
  }

  if (status === "success") {
    return (
      <div
        className="rounded-[22px] border-[1.5px] border-line bg-white p-8 shadow-panel"
        role="status"
      >
        <div className="text-[24px] font-extrabold text-navy-800">
          Solicitud enviada
        </div>
        <p className="mt-3 text-[15px] leading-[1.6] text-text">
          {serverMessage ??
            "Recibimos tu solicitud. Te contactaremos pronto."}
        </p>
        <Button
          type="button"
          className="mt-6"
          onClick={() => {
            setStatus("idle");
            setServerMessage(null);
          }}
        >
          Enviar otra solicitud
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="relative rounded-[22px] border-[1.5px] border-line bg-white p-8 shadow-panel"
    >
      <div className="text-[24px] font-extrabold text-navy-800">
        Solicita tu cotización
      </div>
      <p className="mt-1.5 text-[15px] text-text">
        Los campos nos ayudan a responderte más rápido.
      </p>

      <div className="mt-6 flex flex-wrap gap-4">
        <div className="min-w-0 flex-[1_1_220px]">
          <Field
            id="contacto-nombre"
            label="Nombre"
            placeholder="Tu nombre"
            name="nombre"
            showLabel
            onLight
            required
            value={nombre}
            error={errors.nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="min-w-0 flex-[1_1_220px]">
          <Field
            id="contacto-telefono"
            label="Teléfono o WhatsApp"
            type="tel"
            placeholder="300 000 0000"
            name="telefono"
            showLabel
            onLight
            required
            value={telefono}
            error={errors.telefono}
            onChange={(e) => setTelefono(e.target.value)}
          />
        </div>
        <div className="min-w-0 flex-[1_1_220px]">
          <Field
            id="contacto-correo"
            label="Correo (opcional)"
            type="email"
            placeholder="correo@ejemplo.com"
            name="correo"
            showLabel
            onLight
            value={correo}
            error={errors.correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </div>
        <div className="min-w-0 flex-[1_1_220px]">
          <Field
            id="contacto-necesidad"
            label="¿Qué necesitas?"
            placeholder="Selecciona"
            name="necesidad"
            showLabel
            onLight
            required
            options={[...contactNeedOptions]}
            value={necesidad}
            error={errors.necesidad}
            onChange={(e) => setNecesidad(e.target.value)}
          />
        </div>
        <div className="min-w-0 flex-[1_1_220px]">
          <Field
            id="contacto-espacio"
            label="Tipo de espacio"
            placeholder="Selecciona"
            name="tipo_espacio"
            showLabel
            onLight
            required
            options={[...contactSpaceOptions]}
            value={tipoEspacio}
            error={errors.tipo_espacio}
            onChange={(e) => setTipoEspacio(e.target.value)}
          />
        </div>
        <div className="min-w-0 flex-[1_1_100%]">
          <Field
            id="contacto-mensaje"
            label="Cuéntanos más"
            placeholder="Equipo, ubicación, urgencia…"
            name="mensaje"
            showLabel
            onLight
            multiline
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
          />
        </div>
      </div>

      {/* Honeypot — hidden from users */}
      <div className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden" aria-hidden>
        <label htmlFor="contacto-website">Sitio web</label>
        <input
          id="contacto-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="mt-[18px]">
        <label className="flex cursor-pointer items-start gap-2.5 text-[13px] leading-[1.5] text-text-muted">
          <input
            type="checkbox"
            name="autorizacion_datos"
            checked={autorizacion}
            onChange={(e) => setAutorizacion(e.target.checked)}
            className={cn(
              "mt-0.5 size-[18px] shrink-0 rounded-[5px] border-2 border-border-control accent-blue-600 focus-visible:focus-ring",
              errors.autorizacion && "border-orange-500",
            )}
            aria-invalid={errors.autorizacion ? true : undefined}
            aria-describedby={
              errors.autorizacion ? "contacto-autorizacion-error" : undefined
            }
          />
          <span>
            Autorizo el tratamiento de mis datos personales conforme a la Ley
            1581 de 2012.{" "}
            <span className="text-blue-600">[ENLACE A POLÍTICA DE DATOS]</span>
          </span>
        </label>
        {errors.autorizacion ? (
          <p
            id="contacto-autorizacion-error"
            className="mt-1.5 text-caption font-semibold text-orange-500"
            role="alert"
          >
            {errors.autorizacion}
          </p>
        ) : null}
      </div>

      {status === "error" && serverMessage ? (
        <p className="mt-4 text-small font-semibold text-orange-500" role="alert">
          {serverMessage}
        </p>
      ) : null}

      <div className="mt-5">
        <Button
          type="submit"
          arrow
          disabled={status === "loading"}
          className="w-full"
        >
          {status === "loading" ? "Enviando…" : "Enviar solicitud"}
        </Button>
      </div>
    </form>
  );
}

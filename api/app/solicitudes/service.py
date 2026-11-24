from __future__ import annotations

from sqlalchemy.orm import Session

from app.core.mail import send_email
from app.solicitudes.models import Solicitud
from app.solicitudes.schemas import ContactoCreate, ContactoResponse


def _build_email_body(solicitud: Solicitud) -> str:
    correo = solicitud.correo or "(no indicado)"
    return (
        "Nueva solicitud de contacto\n"
        "===========================\n\n"
        f"Nombre: {solicitud.nombre}\n"
        f"Teléfono: {solicitud.telefono}\n"
        f"Correo: {correo}\n"
        f"Necesidad: {solicitud.necesidad}\n"
        f"Tipo de espacio: {solicitud.tipo_espacio}\n"
        f"Canal: {solicitud.canal_origen}\n"
        f"Estado: {solicitud.estado}\n\n"
        f"Mensaje:\n{solicitud.mensaje or '(sin mensaje)'}\n"
    )


def create_contacto(db: Session, payload: ContactoCreate) -> ContactoResponse:
    # Honeypot: bots fill hidden fields; pretend success without persisting.
    if payload.website.strip():
        return ContactoResponse(id=None)

    solicitud = Solicitud(
        nombre=payload.nombre,
        telefono=payload.telefono,
        correo=payload.correo,
        necesidad=payload.necesidad.value,
        tipo_espacio=payload.tipo_espacio.value,
        mensaje=payload.mensaje,
        autorizacion_datos=payload.autorizacion_datos,
        canal_origen="contacto",
        estado="nueva",
    )
    db.add(solicitud)
    db.commit()
    db.refresh(solicitud)

    send_email(
        subject=f"Nueva solicitud de contacto — {solicitud.nombre}",
        body=_build_email_body(solicitud),
    )

    return ContactoResponse(id=solicitud.id)

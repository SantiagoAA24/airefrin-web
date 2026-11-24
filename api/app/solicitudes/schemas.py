from __future__ import annotations

import re
from enum import StrEnum
from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field, field_validator


class Necesidad(StrEnum):
    MANTENIMIENTO = "Mantenimiento"
    REPARACION = "Reparación"
    INSTALACION = "Instalación"
    COMPRA = "Compra de equipo"
    REFRIGERACION = "Refrigeración / cuarto frío"


class TipoEspacio(StrEnum):
    RESIDENCIAL = "Residencial"
    COMERCIAL = "Comercial"
    INDUSTRIAL = "Industrial"
    CUARTO_FRIO = "Cuarto frío"


EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


class ContactoCreate(BaseModel):
    nombre: Annotated[str, Field(min_length=2, max_length=120)]
    telefono: Annotated[str, Field(min_length=7, max_length=40)]
    correo: Annotated[str | None, Field(default=None, max_length=254)]
    necesidad: Necesidad
    tipo_espacio: TipoEspacio
    mensaje: Annotated[str, Field(default="", max_length=2000)]
    autorizacion_datos: bool
    website: Annotated[str, Field(default="", max_length=200)] = ""

    @field_validator("nombre", "telefono", "mensaje", mode="before")
    @classmethod
    def strip_text(cls, value: object) -> object:
        if isinstance(value, str):
            return value.strip()
        return value

    @field_validator("correo", mode="before")
    @classmethod
    def empty_email_to_none(cls, value: object) -> object:
        if value is None:
            return None
        if isinstance(value, str):
            stripped = value.strip()
            return stripped or None
        return value

    @field_validator("correo")
    @classmethod
    def validate_email(cls, value: str | None) -> str | None:
        if value is None:
            return None
        if not EMAIL_RE.match(value):
            raise ValueError("Ingresa un correo válido.")
        return value

    @field_validator("autorizacion_datos")
    @classmethod
    def require_authorization(cls, value: bool) -> bool:
        if not value:
            raise ValueError(
                "Debes autorizar el tratamiento de datos personales (Ley 1581 de 2012)."
            )
        return value


class ContactoResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int | None = None
    ok: bool = True
    message: str = "Recibimos tu solicitud. Te contactaremos pronto."

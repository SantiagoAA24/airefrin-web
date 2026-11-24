from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, DateTime, Integer, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.db import Base


class Solicitud(Base):
    __tablename__ = "solicitudes"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nombre: Mapped[str] = mapped_column(String(120), nullable=False)
    telefono: Mapped[str] = mapped_column(String(40), nullable=False)
    correo: Mapped[str | None] = mapped_column(String(254), nullable=True)
    necesidad: Mapped[str] = mapped_column(String(80), nullable=False)
    tipo_espacio: Mapped[str] = mapped_column(String(80), nullable=False)
    mensaje: Mapped[str] = mapped_column(Text, nullable=False, default="")
    autorizacion_datos: Mapped[bool] = mapped_column(Boolean, nullable=False)
    canal_origen: Mapped[str] = mapped_column(
        String(40), nullable=False, default="contacto"
    )
    estado: Mapped[str] = mapped_column(String(40), nullable=False, default="nueva")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

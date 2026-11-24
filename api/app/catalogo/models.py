from __future__ import annotations

from sqlalchemy import Boolean, ForeignKey, Integer, String, Text, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.types import JSON

from app.core.db import Base


class Marca(Base):
    __tablename__ = "marcas"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)
    slug: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)

    equipos: Mapped[list[Equipo]] = relationship(back_populates="marca")


class Categoria(Base):
    __tablename__ = "categorias"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nombre: Mapped[str] = mapped_column(String(100), nullable=False)
    slug: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)

    equipos: Mapped[list[Equipo]] = relationship(back_populates="categoria")


class Equipo(Base):
    __tablename__ = "equipos"
    __table_args__ = (UniqueConstraint("slug", name="uq_equipos_slug"),)

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    nombre: Mapped[str] = mapped_column(String(200), nullable=False)
    slug: Mapped[str] = mapped_column(String(220), nullable=False)
    marca_id: Mapped[int] = mapped_column(ForeignKey("marcas.id"), nullable=False)
    categoria_id: Mapped[int] = mapped_column(
        ForeignKey("categorias.id"), nullable=False
    )
    capacidad_btu: Mapped[int] = mapped_column(Integer, nullable=False)
    tipo: Mapped[str] = mapped_column(String(120), nullable=False)
    tecnologia: Mapped[str] = mapped_column(String(80), nullable=False)
    referencia: Mapped[str] = mapped_column(String(120), nullable=False)
    descripcion: Mapped[str] = mapped_column(Text, nullable=False)
    imagenes: Mapped[list[str]] = mapped_column(JSON, nullable=False, default=list)
    destacado: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    publicado: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)

    marca: Mapped[Marca] = relationship(back_populates="equipos")
    categoria: Mapped[Categoria] = relationship(back_populates="equipos")

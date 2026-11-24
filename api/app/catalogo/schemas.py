from __future__ import annotations

from pydantic import BaseModel, ConfigDict, Field


class MarcaOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nombre: str
    slug: str


class CategoriaOut(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nombre: str
    slug: str


class EquipoListItem(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    nombre: str
    slug: str
    marca: MarcaOut
    categoria: CategoriaOut
    capacidad_btu: int
    tipo: str
    tecnologia: str
    referencia: str
    descripcion: str
    imagenes: list[str]
    destacado: bool


class EquipoDetalle(EquipoListItem):
    relacionados: list[EquipoListItem] = Field(default_factory=list)


class EquipoListResponse(BaseModel):
    items: list[EquipoListItem]
    total: int
    page: int
    page_size: int
    pages: int

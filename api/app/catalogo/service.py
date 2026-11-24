from __future__ import annotations

import math
from typing import Any

from sqlalchemy import func, or_, select
from sqlalchemy.orm import Session, joinedload

from app.catalogo.models import Categoria, Equipo, Marca
from app.catalogo.schemas import (
    EquipoDetalle,
    EquipoListItem,
    EquipoListResponse,
    MarcaOut,
)


def list_equipos(
    db: Session,
    *,
    marca: str | None = None,
    tipo: str | None = None,
    btu_min: int | None = None,
    btu_max: int | None = None,
    destacado: bool | None = None,
    page: int = 1,
    page_size: int = 12,
) -> EquipoListResponse:
    page = max(page, 1)
    page_size = min(max(page_size, 1), 50)

    filters: list[Any] = [Equipo.publicado.is_(True)]
    if marca:
        filters.append(Equipo.marca.has(Marca.slug == marca))
    if tipo:
        filters.append(Equipo.categoria.has(Categoria.slug == tipo))
    if btu_min is not None:
        filters.append(Equipo.capacidad_btu >= btu_min)
    if btu_max is not None:
        filters.append(Equipo.capacidad_btu <= btu_max)
    if destacado is not None:
        filters.append(Equipo.destacado.is_(destacado))

    total = db.scalar(select(func.count()).select_from(Equipo).where(*filters)) or 0
    pages = math.ceil(total / page_size) if total else 0

    stmt = (
        select(Equipo)
        .where(*filters)
        .options(joinedload(Equipo.marca), joinedload(Equipo.categoria))
        .order_by(Equipo.capacidad_btu.asc(), Equipo.nombre.asc())
        .offset((page - 1) * page_size)
        .limit(page_size)
    )
    equipos = list(db.scalars(stmt).unique().all())
    items = [EquipoListItem.model_validate(e) for e in equipos]

    return EquipoListResponse(
        items=items,
        total=total,
        page=page,
        page_size=page_size,
        pages=pages,
    )


def get_equipo_by_slug(db: Session, slug: str) -> EquipoDetalle | None:
    equipo = db.scalars(
        select(Equipo)
        .where(Equipo.publicado.is_(True), Equipo.slug == slug)
        .options(joinedload(Equipo.marca), joinedload(Equipo.categoria))
    ).unique().first()
    if equipo is None:
        return None

    relacionados = list(
        db.scalars(
            select(Equipo)
            .where(
                Equipo.publicado.is_(True),
                Equipo.id != equipo.id,
                or_(
                    Equipo.marca_id == equipo.marca_id,
                    Equipo.categoria_id == equipo.categoria_id,
                ),
            )
            .options(joinedload(Equipo.marca), joinedload(Equipo.categoria))
            .order_by(Equipo.destacado.desc(), Equipo.capacidad_btu.asc())
            .limit(3)
        )
        .unique()
        .all()
    )

    detalle = EquipoDetalle.model_validate(equipo)
    detalle.relacionados = [EquipoListItem.model_validate(r) for r in relacionados]
    return detalle


def list_marcas(db: Session) -> list[MarcaOut]:
    stmt = (
        select(Marca)
        .join(Equipo)
        .where(Equipo.publicado.is_(True))
        .distinct()
        .order_by(Marca.nombre.asc())
    )
    marcas = list(db.scalars(stmt).all())
    return [MarcaOut.model_validate(m) for m in marcas]

from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.catalogo import service
from app.catalogo.schemas import EquipoDetalle, EquipoListResponse, MarcaOut
from app.core.db import get_db

router = APIRouter(prefix="/catalogo", tags=["catalogo"])

DbSession = Annotated[Session, Depends(get_db)]


@router.get(
    "/equipos",
    response_model=EquipoListResponse,
    summary="Listar equipos publicados",
)
def list_equipos(
    db: DbSession,
    marca: str | None = Query(None, description="Slug de la marca"),
    tipo: str | None = Query(None, description="Slug de la categoría / tipo"),
    btu_min: int | None = Query(None, ge=0, description="Capacidad mínima en BTU"),
    btu_max: int | None = Query(None, ge=0, description="Capacidad máxima en BTU"),
    destacado: bool | None = Query(None, description="Solo equipos destacados"),
    page: int = Query(1, ge=1),
    page_size: int = Query(12, ge=1, le=50),
) -> EquipoListResponse:
    return service.list_equipos(
        db,
        marca=marca,
        tipo=tipo,
        btu_min=btu_min,
        btu_max=btu_max,
        destacado=destacado,
        page=page,
        page_size=page_size,
    )


@router.get(
    "/equipos/{slug}",
    response_model=EquipoDetalle,
    summary="Obtener ficha de un equipo por slug",
)
def get_equipo(slug: str, db: DbSession) -> EquipoDetalle:
    equipo = service.get_equipo_by_slug(db, slug)
    if equipo is None:
        raise HTTPException(
            status_code=404,
            detail="No encontramos ese equipo en el catálogo.",
        )
    return equipo


@router.get(
    "/marcas",
    response_model=list[MarcaOut],
    summary="Listar marcas con equipos publicados",
)
def list_marcas(db: DbSession) -> list[MarcaOut]:
    return service.list_marcas(db)

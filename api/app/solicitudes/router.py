from __future__ import annotations

from typing import Annotated

from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.core.rate_limit import enforce_contacto_rate_limit
from app.solicitudes import service
from app.solicitudes.schemas import ContactoCreate, ContactoResponse

router = APIRouter(prefix="/solicitudes", tags=["solicitudes"])

DbSession = Annotated[Session, Depends(get_db)]


@router.post(
    "/contacto",
    response_model=ContactoResponse,
    summary="Registrar solicitud de contacto",
)
def crear_contacto(
    payload: ContactoCreate,
    request: Request,
    db: DbSession,
) -> ContactoResponse:
    enforce_contacto_rate_limit(request)
    return service.create_contacto(db, payload)

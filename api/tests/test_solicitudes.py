from __future__ import annotations

from unittest.mock import patch

from fastapi.testclient import TestClient
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.core.rate_limit import contacto_rate_limiter
from app.solicitudes.models import Solicitud

VALID_PAYLOAD = {
    "nombre": "Ana Pérez",
    "telefono": "3104745946",
    "correo": "ana@ejemplo.com",
    "necesidad": "Mantenimiento",
    "tipo_espacio": "Residencial",
    "mensaje": "Equipo LG en Chapinero",
    "autorizacion_datos": True,
    "website": "",
}


def test_crear_contacto_ok(client: TestClient, db_session: Session) -> None:
    contacto_rate_limiter.clear()
    with patch("app.solicitudes.service.send_email") as mock_mail:
        response = client.post("/solicitudes/contacto", json=VALID_PAYLOAD)

    assert response.status_code == 200
    body = response.json()
    assert body["ok"] is True
    assert body["id"] is not None
    assert "Recibimos tu solicitud" in body["message"]

    solicitud = db_session.scalar(
        select(Solicitud).where(Solicitud.id == body["id"])
    )
    assert solicitud is not None
    assert solicitud.nombre == "Ana Pérez"
    assert solicitud.canal_origen == "contacto"
    assert solicitud.estado == "nueva"
    mock_mail.assert_called_once()


def test_crear_contacto_sin_autorizacion(client: TestClient) -> None:
    contacto_rate_limiter.clear()
    payload = {**VALID_PAYLOAD, "autorizacion_datos": False}
    response = client.post("/solicitudes/contacto", json=payload)
    assert response.status_code == 422


def test_crear_contacto_honeypot(client: TestClient, db_session: Session) -> None:
    contacto_rate_limiter.clear()
    payload = {**VALID_PAYLOAD, "website": "http://spam.example"}
    with patch("app.solicitudes.service.send_email") as mock_mail:
        response = client.post("/solicitudes/contacto", json=payload)

    assert response.status_code == 200
    body = response.json()
    assert body["ok"] is True
    assert body["id"] is None
    assert db_session.scalar(select(Solicitud)) is None
    mock_mail.assert_not_called()


def test_crear_contacto_correo_invalido(client: TestClient) -> None:
    contacto_rate_limiter.clear()
    payload = {**VALID_PAYLOAD, "correo": "no-es-correo"}
    response = client.post("/solicitudes/contacto", json=payload)
    assert response.status_code == 422


def test_crear_contacto_rate_limit(client: TestClient) -> None:
    contacto_rate_limiter.clear()
    with patch("app.solicitudes.service.send_email"):
        for _ in range(5):
            assert (
                client.post("/solicitudes/contacto", json=VALID_PAYLOAD).status_code
                == 200
            )
        blocked = client.post("/solicitudes/contacto", json=VALID_PAYLOAD)

    assert blocked.status_code == 429
    assert "Demasiadas solicitudes" in blocked.json()["detail"]

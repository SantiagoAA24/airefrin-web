from __future__ import annotations

from collections.abc import Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.catalogo.models import Categoria, Equipo, Marca
from app.core.db import Base, get_db
from app.main import app
from app.solicitudes.models import Solicitud  # noqa: F401

DESCRIPCION = "[Descripción corta del equipo, pendiente de confirmar con el cliente]"


@pytest.fixture()
def db_session() -> Generator[Session, None, None]:
    engine = create_engine(
        "sqlite+pysqlite://",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(bind=engine)
    TestingSessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
    session = TestingSessionLocal()

    marcas = {
        "lg": Marca(nombre="LG", slug="lg"),
        "samsung": Marca(nombre="Samsung", slug="samsung"),
        "confortfresh": Marca(nombre="Confortfresh", slug="confortfresh"),
        "trane": Marca(nombre="Trane", slug="trane"),
    }
    categorias = {
        "mini-split-pared": Categoria(
            nombre="Mini Split Pared",
            slug="mini-split-pared",
        ),
        "cassette-techo": Categoria(
            nombre="Cassette Techo",
            slug="cassette-techo",
        ),
    }
    session.add_all([*marcas.values(), *categorias.values()])
    session.flush()

    session.add_all(
        [
            Equipo(
                nombre="Minisplit Inverter",
                slug="confortfresh-minisplit-inverter-24000",
                marca_id=marcas["confortfresh"].id,
                categoria_id=categorias["mini-split-pared"].id,
                capacidad_btu=24000,
                tipo="Mini Split Pared",
                tecnologia="Inverter",
                referencia="INMS",
                descripcion=DESCRIPCION,
                imagenes=[],
                destacado=True,
                publicado=True,
            ),
            Equipo(
                nombre="Mini Split Pared",
                slug="samsung-ar18kvspdgm-cb",
                marca_id=marcas["samsung"].id,
                categoria_id=categorias["mini-split-pared"].id,
                capacidad_btu=18000,
                tipo="Mini Split Pared",
                tecnologia="Inverter",
                referencia="AR18KVSPDGM/CB",
                descripcion=DESCRIPCION,
                imagenes=[],
                destacado=True,
                publicado=True,
            ),
            Equipo(
                nombre="Cassette Techo",
                slug="lg-atnq54gmle3",
                marca_id=marcas["lg"].id,
                categoria_id=categorias["cassette-techo"].id,
                capacidad_btu=54000,
                tipo="Cassette Techo",
                tecnologia="Inverter",
                referencia="ATNQ54GMLE3",
                descripcion=DESCRIPCION,
                imagenes=[],
                destacado=True,
                publicado=True,
            ),
            Equipo(
                nombre="Mini Split Pared",
                slug="lg-vm182c7",
                marca_id=marcas["lg"].id,
                categoria_id=categorias["mini-split-pared"].id,
                capacidad_btu=18000,
                tipo="Mini Split Pared",
                tecnologia="Inverter",
                referencia="VM182C7",
                descripcion=DESCRIPCION,
                imagenes=[],
                destacado=True,
                publicado=True,
            ),
            Equipo(
                nombre="Equipo borrador",
                slug="equipo-no-publicado",
                marca_id=marcas["trane"].id,
                categoria_id=categorias["mini-split-pared"].id,
                capacidad_btu=12000,
                tipo="Mini Split Pared",
                tecnologia="On/Off",
                referencia="DRAFT",
                descripcion=DESCRIPCION,
                imagenes=[],
                destacado=False,
                publicado=False,
            ),
        ]
    )
    session.commit()

    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(bind=engine)
        engine.dispose()


@pytest.fixture()
def client(db_session: Session) -> Generator[TestClient, None, None]:
    def override_get_db() -> Generator[Session, None, None]:
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()

"""Seed catalog brands, categories and the four documented equipment units."""

from __future__ import annotations

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from sqlalchemy import select

from app.catalogo.models import Categoria, Equipo, Marca
from app.core.db import SessionLocal

MARCAS = [
    ("LG", "lg"),
    ("Trane", "trane"),
    ("Samsung", "samsung"),
    ("Carrier", "carrier"),
    ("York", "york"),
    ("Panasonic", "panasonic"),
    ("Confortfresh", "confortfresh"),
    ("Daikin", "daikin"),
]

CATEGORIAS = [
    ("Mini Split Pared", "mini-split-pared"),
    ("Cassette Techo", "cassette-techo"),
]

DESCRIPCION_PENDIENTE = (
    "[Descripción corta del equipo, pendiente de confirmar con el cliente]"
)

EQUIPOS = [
    {
        "nombre": "Minisplit Inverter",
        "slug": "confortfresh-minisplit-inverter-24000",
        "marca_slug": "confortfresh",
        "categoria_slug": "mini-split-pared",
        "capacidad_btu": 24000,
        "tipo": "Mini Split Pared",
        "tecnologia": "Inverter",
        "referencia": "INMS",
        "descripcion": DESCRIPCION_PENDIENTE,
        "imagenes": [],
        "destacado": True,
        "publicado": True,
    },
    {
        "nombre": "Mini Split Pared",
        "slug": "samsung-ar18kvspdgm-cb",
        "marca_slug": "samsung",
        "categoria_slug": "mini-split-pared",
        "capacidad_btu": 18000,
        "tipo": "Mini Split Pared",
        "tecnologia": "Inverter",
        "referencia": "AR18KVSPDGM/CB",
        "descripcion": DESCRIPCION_PENDIENTE,
        "imagenes": [],
        "destacado": True,
        "publicado": True,
    },
    {
        "nombre": "Cassette Techo",
        "slug": "lg-atnq54gmle3",
        "marca_slug": "lg",
        "categoria_slug": "cassette-techo",
        "capacidad_btu": 54000,
        "tipo": "Cassette Techo",
        "tecnologia": "Inverter",
        "referencia": "ATNQ54GMLE3",
        "descripcion": DESCRIPCION_PENDIENTE,
        "imagenes": [],
        "destacado": True,
        "publicado": True,
    },
    {
        "nombre": "Mini Split Pared",
        "slug": "lg-vm182c7",
        "marca_slug": "lg",
        "categoria_slug": "mini-split-pared",
        "capacidad_btu": 18000,
        "tipo": "Mini Split Pared",
        "tecnologia": "Inverter",
        "referencia": "VM182C7",
        "descripcion": DESCRIPCION_PENDIENTE,
        "imagenes": [],
        "destacado": True,
        "publicado": True,
    },
]


def seed() -> None:
    db = SessionLocal()
    try:
        marcas_by_slug: dict[str, Marca] = {}
        for nombre, slug in MARCAS:
            marca = db.scalar(select(Marca).where(Marca.slug == slug))
            if marca is None:
                marca = Marca(nombre=nombre, slug=slug)
                db.add(marca)
            else:
                marca.nombre = nombre
            marcas_by_slug[slug] = marca

        categorias_by_slug: dict[str, Categoria] = {}
        for nombre, slug in CATEGORIAS:
            categoria = db.scalar(select(Categoria).where(Categoria.slug == slug))
            if categoria is None:
                categoria = Categoria(nombre=nombre, slug=slug)
                db.add(categoria)
            else:
                categoria.nombre = nombre
            categorias_by_slug[slug] = categoria

        db.flush()

        for data in EQUIPOS:
            equipo = db.scalar(select(Equipo).where(Equipo.slug == data["slug"]))
            marca = marcas_by_slug[data["marca_slug"]]
            categoria = categorias_by_slug[data["categoria_slug"]]
            fields = {
                "nombre": data["nombre"],
                "marca_id": marca.id,
                "categoria_id": categoria.id,
                "capacidad_btu": data["capacidad_btu"],
                "tipo": data["tipo"],
                "tecnologia": data["tecnologia"],
                "referencia": data["referencia"],
                "descripcion": data["descripcion"],
                "imagenes": data["imagenes"],
                "destacado": data["destacado"],
                "publicado": data["publicado"],
            }
            if equipo is None:
                db.add(Equipo(slug=data["slug"], **fields))
            else:
                for key, value in fields.items():
                    setattr(equipo, key, value)

        db.commit()
        print("Catálogo sembrado: 8 marcas, 2 categorías, 4 equipos.")
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    seed()

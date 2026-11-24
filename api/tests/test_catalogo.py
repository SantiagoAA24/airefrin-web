from __future__ import annotations

from fastapi.testclient import TestClient


def test_list_equipos(client: TestClient) -> None:
    response = client.get("/catalogo/equipos")
    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 4
    assert body["page"] == 1
    assert body["page_size"] == 12
    assert body["pages"] == 1
    assert len(body["items"]) == 4
    slugs = {item["slug"] for item in body["items"]}
    assert "equipo-no-publicado" not in slugs


def test_list_equipos_filtro_marca(client: TestClient) -> None:
    response = client.get("/catalogo/equipos", params={"marca": "lg"})
    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 2
    assert all(item["marca"]["slug"] == "lg" for item in body["items"])


def test_list_equipos_filtro_tipo_y_btu(client: TestClient) -> None:
    response = client.get(
        "/catalogo/equipos",
        params={"tipo": "mini-split-pared", "btu_min": 18000, "btu_max": 24000},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 3
    for item in body["items"]:
        assert item["categoria"]["slug"] == "mini-split-pared"
        assert 18000 <= item["capacidad_btu"] <= 24000


def test_list_equipos_destacados_y_paginacion(client: TestClient) -> None:
    response = client.get(
        "/catalogo/equipos",
        params={"destacado": True, "page": 1, "page_size": 2},
    )
    assert response.status_code == 200
    body = response.json()
    assert body["total"] == 4
    assert body["page_size"] == 2
    assert body["pages"] == 2
    assert len(body["items"]) == 2


def test_get_equipo_por_slug(client: TestClient) -> None:
    response = client.get("/catalogo/equipos/confortfresh-minisplit-inverter-24000")
    assert response.status_code == 200
    body = response.json()
    assert body["slug"] == "confortfresh-minisplit-inverter-24000"
    assert body["marca"]["nombre"] == "Confortfresh"
    assert body["referencia"] == "INMS"
    assert isinstance(body["relacionados"], list)
    assert len(body["relacionados"]) <= 3
    assert all(r["slug"] != body["slug"] for r in body["relacionados"])


def test_get_equipo_no_encontrado(client: TestClient) -> None:
    response = client.get("/catalogo/equipos/no-existe")
    assert response.status_code == 404
    assert response.json()["detail"] == "No encontramos ese equipo en el catálogo."


def test_get_equipo_no_publicado(client: TestClient) -> None:
    response = client.get("/catalogo/equipos/equipo-no-publicado")
    assert response.status_code == 404


def test_list_marcas(client: TestClient) -> None:
    response = client.get("/catalogo/marcas")
    assert response.status_code == 200
    body = response.json()
    slugs = {item["slug"] for item in body}
    assert slugs == {"lg", "samsung", "confortfresh"}
    assert "trane" not in slugs

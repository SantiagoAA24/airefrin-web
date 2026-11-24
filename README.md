# Airefrin — sitio web

Sitio público, agenda, portal de clientes y administración de Airefrin S.A.S.

## Requisitos

- Node.js 22+ y [pnpm](https://pnpm.io/)
- Python 3.12 y [uv](https://docs.astral.sh/uv/)
- Docker (para PostgreSQL en desarrollo)

## Arranque rápido

```bash
# Base de datos
docker compose up -d

# Variables de entorno
cp web/.env.example web/.env
cp api/.env.example api/.env

# Frontend
pnpm --dir web install
pnpm --dir web dev

# API (otra terminal)
cd api && uv sync --group dev
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Comandos

### web/ (Next.js)

| Comando | Descripción |
| --- | --- |
| `pnpm --dir web dev` | Servidor de desarrollo |
| `pnpm --dir web lint` | ESLint |
| `pnpm --dir web typecheck` | TypeScript (`tsc --noEmit`) |
| `pnpm --dir web test` | Vitest |

### api/ (FastAPI)

Ejecutar desde `api/` (o con `cd api && …`):

| Comando | Descripción |
| --- | --- |
| `uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000` | Servidor de desarrollo |
| `uv run ruff check .` | Lint |
| `uv run mypy app` | Typecheck |
| `uv run pytest` | Pruebas |

## Estructura

- `web/` — frontend Next.js (App Router, TypeScript, Tailwind)
- `api/` — backend FastAPI (SQLAlchemy, Alembic, Pydantic)
- `design/` — sistema de diseño y bocetos (solo referencia)
- `docs/` — alcance, plan y datos del cliente
- `docker-compose.yml` — PostgreSQL 16 para desarrollo

from fastapi import FastAPI

from app.catalogo.router import router as catalogo_router
from app.core.config import settings
from app.routers import health

app = FastAPI(title=settings.app_name)
app.include_router(health.router)
app.include_router(catalogo_router)

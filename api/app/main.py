from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.catalogo.router import router as catalogo_router
from app.core.config import settings
from app.routers import health
from app.solicitudes.router import router as solicitudes_router

app = FastAPI(title=settings.app_name)
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.include_router(health.router)
app.include_router(catalogo_router)
app.include_router(solicitudes_router)

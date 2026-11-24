# Airefrin — guía para agentes

Sitio web de Airefrin S.A.S. (aire acondicionado y refrigeración, Bogotá, Cundinamarca y Meta): sitio público, agenda de visitas, portal de clientes con fichas técnicas en PDF, panel de administración y, al final, WhatsApp Business y asistente de IA.

## Fuentes de verdad (léelas antes de planear)
- docs/alcance-y-plan.md: alcance, rutas, fases y riesgos.
- docs/datos-del-cliente.md: datos reales. No inventes datos, precios, horarios, direcciones ni testimonios; si falta uno, usa un marcador visible entre corchetes y anótalo en docs/pendientes.md.
- design/sistema-de-diseno/tokens.json y components/: colores, tipografía, espaciados, radios y componentes.
- design/pantallas/*.dc.html: estructura y contenido de cada pantalla. Son bocetos: reprodúcelos con componentes React propios, no copies su HTML.

## Stack
- web/: Next.js (App Router), TypeScript estricto, Tailwind, pnpm.
- api/: FastAPI (Python 3.12), SQLAlchemy 2, Alembic, Pydantic, pytest.
- PostgreSQL en Docker para desarrollo (docker-compose.yml en la raíz).
- Despliegue previsto en Azure.

## Estructura
web/ (frontend), api/ (backend), design/ (referencia, solo lectura), docs/ (documentación), docker-compose.yml.

## Convenciones
- Interfaz y textos en español de Colombia. Código, nombres y commits en inglés.
- Rutas del sitio exactamente como en docs/alcance-y-plan.md.
- Accesibilidad: contraste AA, foco visible, etiquetas en formularios, alt en imágenes.
- Secretos solo en variables de entorno; mantén .env.example al día; nunca subas .env.
- Datos personales: Ley 1581 de 2012; pide autorización expresa en cada formulario.
- Un commit por tarea con Conventional Commits en inglés (feat:, fix:, chore:, docs:), trabajando sobre main.

## Forma de trabajo
1. Ante cada tarea, primero propone un plan (archivos a crear o cambiar, pasos, riesgos, cómo verificar) y espera aprobación.
2. Implementa solo lo aprobado; no añadas funciones fuera del alcance.
3. Al terminar, ejecuta lint, typecheck y pruebas, y resume qué cambió y qué queda pendiente.
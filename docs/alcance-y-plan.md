# Airefrin — Alcance y plan de desarrollo del nuevo sitio

Nov 21, 2026 · @Santiago Acevedo

Airefrin tendrá un sitio nuevo de 12 pantallas ya diseñadas, construido en cuatro fases, que prioriza cotizar por WhatsApp y suma agenda en línea y un portal con la ficha de cada visita.

## Resumen

Airefrin S.A.S. vende, instala, mantiene y repara aire acondicionado y refrigeración comercial e industrial en Bogotá, Cundinamarca y Meta. El sitio actual no tiene datos estructurados ni Open Graph, y su contenido es inconsistente (por ejemplo, dice «6 años» aunque la empresa se fundó en 2012). El rediseño busca más solicitudes de cotización, mejor posicionamiento en buscadores y un servicio recurrente: el mantenimiento cada 3 meses con registro.

Este documento define qué se construye, con qué tecnología y en qué orden. Se apoya en tres piezas ya hechas: el [análisis del sitio actual](https://claude.ai/artifact/5JCjAdjv9oV22hUa8nnRS4), el [lienzo con los diseños](https://claude.ai/artifact/BHjjHBajERiBDRzmBBMpag) (la imagen del cliente convertida en boceto y las pantallas de la Ronda 4) y el [sistema de diseño](https://claude.ai/artifact/4iJs2xr12KYYMDxfdcFAzg).

## Alcance

La primera entrega es el sitio público con cotización por WhatsApp y formulario; agenda, portal y automatización llegan en fases posteriores.

**Incluye**

- Las 12 pantallas diseñadas: Home, Servicios, detalle de servicio, Catálogo, Ficha de equipo, Empresa, Contacto, Agendar mantenimiento, ingreso, panel y ficha de visita del portal, y administración de solicitudes.
- Diseño responsive para escritorio, tablet y móvil, basado en el sistema de diseño de Airefrin.
- Calculadora de BTU, cotización por WhatsApp con el mensaje armado y formularios que guardan la solicitud.
- Catálogo de los 19 equipos con filtros por marca, tipo y capacidad.
- Panel de administración para solicitudes, catálogo y contenido.
- SEO técnico, analítica de conversiones y migración de las URL actuales.

**Fuera de alcance por ahora**

- Pago en línea o tienda con carrito.
- Aplicación móvil nativa.
- Facturación e integración con un ERP o sistema contable.
- Sitio en otros idiomas.
- Blog y contenidos editoriales, que se proponen como mejora posterior para SEO.
- Versión móvil diseñada pantalla por pantalla: el desarrollo la resuelve con las reglas responsive del sistema, y se valida en revisión.

## Pantallas y rutas

Cada pantalla del lienzo corresponde a una ruta y a una fase de entrega; las dinámicas se generan desde la base de datos.

| Pantalla | Ruta | Fase | Interacción clave |
| --- | --- | --- | --- |
| Home | `/` | 1 | Calculadora de BTU, filtro de equipos, formulario |
| Servicios | `/servicios` | 1 | Cinco servicios, enlaces a detalle |
| Detalle de servicio | `/servicios/[servicio]` | 1 | Preguntas frecuentes, cotización rápida |
| Catálogo de equipos | `/equipos` | 1 | Filtros por marca, tipo y capacidad |
| Ficha de equipo | `/equipos/[equipo]` | 1 | Cotizar por WhatsApp, ficha técnica |
| Empresa | `/empresa` | 1 | Cifras, marcas, cobertura |
| Contacto | `/contacto` | 1 | Formulario y canales directos |
| Agendar mantenimiento | `/agendar-mantenimiento` | 2 | Cuatro pasos con resumen |
| Administración de solicitudes | `/admin/solicitudes` | 2 | Estados, filtros, acciones |
| Ingreso al portal | `/portal` | 3 | Correo y contraseña (código por WhatsApp en la fase 4) |
| Panel del cliente | `/portal/inicio` | 3 | Próxima visita, equipos, fichas |
| Ficha de visita | `/portal/fichas/[id]` | 3 | Descarga en PDF, agendar |

## Funcionalidades por fase

La fase 1 concentra lo que genera solicitudes y posicionamiento; el resto depende de que la anterior esté en producción.

| Funcionalidad | Fase | Qué resuelve |
| --- | --- | --- |
| Cotizar por WhatsApp con mensaje armado | 1 | Reduce pasos entre el interés y el contacto |
| Calculadora de BTU (área y exposición) | 1 | Orienta la compra; la regla es orientativa y se valida con el cliente |
| Formularios de cotización y contacto | 1 | Guarda cada solicitud con su canal de origen |
| Catálogo con filtros y ficha por equipo | 1 | Una URL por equipo, indexable |
| Datos estructurados y Open Graph | 1 | Mejor presencia en buscadores y al compartir |
| Eventos de conversión en GA4 y Google Ads | 1 | Mide clics en WhatsApp, llamadas y formularios |
| Panel de administración de solicitudes | 2 | Estados Nueva, Contactada, Agendada y Cerrada |
| Gestión de catálogo y contenido | 2 | El cliente edita equipos y textos sin pedir cambios |
| Agenda en línea de mantenimiento | 2 | Convierte la solicitud en una visita programada |
| Portal del cliente: equipos y fichas de visita | 3 | Historial y confianza; refuerza el ciclo de 3 meses |
| Ficha de visita en PDF | 3 | Registro de partes revisadas y anomalías |
| Recordatorios del próximo mantenimiento | 3 | Por correo; por WhatsApp en la fase 4 |
| WhatsApp Business API (recordatorios y código de ingreso) | 4 | Mensajes automáticos desde el número de la empresa |
| Asistente de IA sobre catálogo y preguntas frecuentes | 4 | Responde con datos propios y deriva a un asesor |
| Reportes de solicitudes y conversión | 4 | Muestra qué canal trae más cotizaciones |

## Stack y arquitectura

El stack repite el que ya domina el equipo: React con TypeScript en el frente y FastAPI con PostgreSQL en el servidor, alojados en Azure.

&#91;embedded content: arquitectura · 5 piezas y servicios externos\]

El navegador solo habla con Next.js; Next.js llama a FastAPI, y FastAPI es la única pieza que toca la base de datos, los archivos y los servicios externos.

| Capa | Tecnología | Por qué |
| --- | --- | --- |
| Frontend | Next.js, TypeScript y Tailwind | Renderizado en servidor para SEO; los tokens del sistema de diseño pasan a Tailwind |
| Componentes | React, con el catálogo del sistema de diseño | Botón, chip, tarjetas y campos ya definidos |
| API | FastAPI (Python) | Solicitudes, agenda, portal, admin y generación de PDF |
| Base de datos | PostgreSQL | Clientes, equipos, visitas, fichas, catálogo y contenido |
| Autenticación | Sesiones propias con roles (cliente, técnico, administrador) | El portal y el admin comparten usuarios y permisos |
| Catálogo y contenido | Gestionados desde el admin, sin CMS aparte | Un sistema menos que mantener; se puede cambiar a un CMS si el cliente lo pide |
| Alojamiento | Azure; el frontend podría ir en Vercel | Decisión abierta según costo y preferencia del cliente |
| IA (fase 4) | Azure OpenAI y Pinecone (RAG) | Respuestas con el catálogo y las preguntas frecuentes propias |

## SEO, analítica y migración

El sitio nuevo debe salir con SEO técnico completo y sin perder las cuentas de medición que Airefrin ya usa.

- **Estructura:** una URL limpia por servicio y por equipo, títulos y descripciones propios, `sitemap.xml` y `robots.txt` generados.
- **Datos estructurados:** JSON-LD de empresa local, servicio y producto; Open Graph y tarjetas para compartir en WhatsApp y redes.
- **Rendimiento y accesibilidad:** renderizado en servidor, imágenes optimizadas y contraste AA según el sistema de diseño.
- **Analítica existente:** se conservan Google Analytics (G-019PPWTPL6), Google Ads (AW-1008038724) y Google Tag Manager (GTM-MR6B733), con acceso del cliente por confirmar.
- **Eventos de conversión:** clic en WhatsApp, llamada, envío de formulario, cotizar equipo y agenda completada, enviados a GA4 y a Google Ads.
- **Migración:** inventario de las URL actuales y redirecciones 301 hacia las nuevas, para no perder posicionamiento; alta del sitio nuevo en Search Console.
- **Datos personales:** política de tratamiento y casilla de autorización en cada formulario, conforme a la Ley 1581 de 2012.

## Fases de desarrollo

El proyecto completo toma entre 16 y 20 semanas con un desarrollador; la fase 1 es la que pone el sitio nuevo en producción.

&#91;embedded content: hoja de ruta · 5 fases, 4 puntos de control\]

Cada rombo es un punto de control: la fase siguiente empieza cuando el cliente aprueba el entregable anterior. Las duraciones son estimaciones iniciales y se confirman al cerrar la fase 0.

## Riesgos y supuestos

El mayor riesgo es de contenido, no de código: sin fotos, textos y datos del catálogo la fase 1 no puede cerrar.

- **Contenido tardío:** fotos reales, logo oficial, textos de empresa y fichas de los 19 equipos. En el diseño hay 5 tarjetas de catálogo como marcador. Mitigación: pedir el material en la fase 0 y fijar una fecha límite.
- **Calculadora de BTU:** la regla usada (600 BTU por m², más 15 % con mucho sol) es orientativa. Debe validarla el equipo técnico antes de publicarla.
- **WhatsApp Business API:** requiere cuenta verificada y plantillas aprobadas por Meta, con costo por conversación. Por eso se deja para la fase 4 y la fase 1 usa enlaces `wa.me`.
- **Datos personales:** el portal guarda datos de clientes y de sus equipos. Hace falta política de tratamiento, autorización expresa y acceso restringido por rol.
- **Alcance del portal y del admin:** son la parte más grande del proyecto. Si el cliente no los quiere en la primera etapa, las fases 3 y 4 se aplazan sin afectar el sitio público.
- **Estimaciones:** el esfuerzo de cada fase es una estimación inicial para un desarrollador y debe revisarse al cerrar la fase 0.
- **Accesos:** se asume que el cliente entrega dominio, DNS, Analytics, Tag Manager y Google Ads.

## Pendientes y decisiones abiertas

Estos puntos bloquean o cambian el desarrollo; conviene resolverlos en la fase 0.

- [ ] Aprobación del alcance por fases, incluyendo si el portal y el admin entran en la primera etapa
- [ ] Archivo oficial del logo y su versión sobre fondo oscuro
- [ ] Fotos reales: hero, sectores, técnicos y cada equipo
- [ ] Datos de los 19 equipos: marca, nombre, BTU, referencia y ficha técnica
- [ ] Texto de historia de la empresa, horario de atención y ubicación de la oficina
- [ ] Tuteo o usted en todo el sitio (la imagen del cliente usa tuteo)
- [ ] Validación de la regla de BTU por parte del equipo técnico
- [ ] Política de tratamiento de datos y términos
- [ ] Accesos a dominio, DNS, Analytics, Tag Manager y Google Ads
- [ ] Lista de las URL actuales que deben redirigirse
- [ ] Quién atiende las solicitudes y en qué horario, para definir las notificaciones

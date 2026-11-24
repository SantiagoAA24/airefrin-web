# Airefrin

Sistema de diseño del nuevo sitio web de Airefrin S.A.S., empresa de Bogotá que vende, instala, mantiene y repara aire acondicionado y refrigeración comercial e industrial en Bogotá, Cundinamarca y Meta. Nace del boceto de inicio que el cliente aprobó como dirección; sirve para construir el resto de las rutas con la misma cara.

**Cómo usarlo:** `tokens.json` es la fuente de todos los valores (la hoja `tokens.css` se genera de ahí). Los componentes viven en `components/`, con el espacio de nombres global `Airefrin`. Cada componente tiene su guía y una vista en vivo.

## Principios

1. **Claridad antes que adorno.** La persona llega con un problema (hace calor, falla un equipo, necesita cotizar). Cada pantalla le muestra cómo contactarnos en un clic.
2. **Confianza con datos verdaderos.** Se usan solo cifras y hechos que la empresa puede sostener: fundada en 2012, mantenimiento recomendado cada 3 meses, 8 marcas, 19 equipos, cobertura en Bogotá, Cundinamarca y Meta.
3. **WhatsApp es el canal principal.** El teléfono y el WhatsApp son visibles en la barra superior y en el pie. Los botones de cotizar arman el mensaje con lo que la persona ya eligió.
4. **Azul frío, con calidez en los detalles.** Navy y azul dominan; el cian da sensación de aire; el naranja solo señala algo nuevo.

## Contenido

- **Idioma:** español de Colombia. Trato de **tú** en los textos de la imagen del cliente («Solicita tu cotización», «Llegamos donde está tu equipo»). Decisión abierta: el sitio actual usa «usted» en algunos textos; hay que unificar con el cliente.
- **Titulares en mayúsculas**, directos y de una idea: «Una solución para cada espacio», «Un proceso simple y eficiente». El hero lleva dos frases: una que dice qué hacemos y otra, en cursiva y cian, que dice qué ganas.
- **Botones:** verbo en infinitivo o imperativo, dos a cuatro palabras. Principal: «Solicitar cotización». Secundario: «Escribir por WhatsApp». En tarjetas de equipo: «Cotizar este equipo».
- **Sin inventar.** No se publican precios, años de experiencia, cantidad de clientes ni testimonios sin confirmación. El sitio actual dice «6 años» en un texto; con fundación en 2012 la cifra correcta se calcula, no se copia.
- **Estimaciones:** la calculadora de BTU es una referencia y lo dice. La visita técnica confirma.

## Fundamentos visuales

**Color.** Superficies claras (`white`, `sky-25`, `sky-50`) alternadas con bloques navy. `blue-600` es el color de acción sobre claro y `cyan-400` el de acento sobre navy. `orange-500` se usa en etiquetas y detalles, con texto `navy-950`. El verde `green-700` es solo para WhatsApp.

**Tipografía.** Montserrat (Google Fonts), pesos 500 a 800 y cursiva 800. Titulares en 800 y mayúsculas; texto en 500. El titular del hero es fluido: entre 40px y 76px según el ancho.

**Forma.** Píldoras para botones y chips (`radius-pill`), tarjetas de 16 a 22px, bloques grandes de 26px. Todo es redondeado; no se mezclan esquinas rectas.

**Profundidad.** Sombras azules suaves (`shadow-card`, `shadow-panel`, `shadow-float`). La tarjeta de servicios se solapa sobre el hero para unir las dos zonas.

**Fondos.** `gradient-hero` para el hero, `gradient-process` para el proceso y `gradient-cover` para cobertura y cotización. Siempre hay texto blanco o claro encima.

**Layout.** Contenido centrado a `container` (1240px) con 24px de margen lateral; secciones con 76px de padding vertical (`space-9`). Las filas usan flex con wrap, de modo que cuatro columnas pasan a dos y luego a una sin reglas especiales.

**Imágenes.** Fotos reales de equipos instalados y de técnicos de Airefrin, en tonos fríos. Mientras no existan, las tarjetas usan degradados y la ilustración del hero queda marcada como provisional.

## Iconografía

Iconos de trazo de 24px, terminaciones redondeadas y `currentColor` (componente `Icon`). Una sola familia; no se mezclan con rellenos ni con emoji. El isotipo del logo es un asterisco de tres ejes en `cyan-brand`; el wordmark «AIREFRIN» va en 800 y `navy-800`. El archivo oficial del logo debe sustituir al wordmark provisional.

## Accesibilidad

Los pares siguientes están calculados (WCAG 2.1):

| Texto | Fondo | Contraste |
| --- | --- | --- |
| `ink` | `white` | 16.5:1 |
| `text-muted` | `white` | 5.5:1 |
| `text-muted` | `sky-50` | 5.0:1 |
| blanco | `blue-600` | 6.2:1 |
| blanco | `blue-700` | 5.3:1 |
| blanco | `green-700` | 5.4:1 |
| `navy-950` | `orange-500` | 5.8:1 |
| `cyan-400` | `navy-950` | 8.7:1 |
| `cyan-300` | `navy-700` | 7.0:1 |

Cambios frente al boceto: el degradado del botón terminaba en un azul claro (blanco encima daba 2.7:1) y ahora termina en `blue-700`; el verde de WhatsApp pasó de `#128c4a` (4.3:1) a `green-700`. Blanco sobre `orange-500` (3.1:1) y sobre `cyan-brand` (2.6:1) no se usa. Los bordes de campos y chips usan `border-control` (más de 3:1). El foco es un anillo de 3px `cyan-400`.

## Pendiente de confirmar con el cliente

- Archivo oficial del logo y su versión sobre fondo oscuro.
- Fotos reales (hero, sectores, técnico, equipos) y el mapa de cobertura.
- Tuteo o usted en todo el sitio.
- Textos de política de datos y términos.
- Si se mantiene Montserrat o se prefiere otra tipografía de marca.

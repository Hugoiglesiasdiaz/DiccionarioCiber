# DiccionarioCiber

Web de apuntes de ciberseguridad: fichas de herramientas, writeups de
laboratorios y apuntes teóricos, con búsqueda pensada para consultar desde el
móvil. Es un proyecto independiente del portfolio personal.

**Stack:** [Astro](https://astro.build) (HTML estático) + islas de React para las
partes interactivas (buscador). Sin backend; despliegue en GitHub Pages.

> Estado: diseño y contenido en Markdown listos. Siguiente paso: la búsqueda
> híbrida (MiniSearch + Transformers.js); ahora el buscador solo mira título,
> descripción y etiquetas.

## Añadir contenido

1. Copia una plantilla de `plantillas/` (`herramienta.md`, `writeup.md` o `apunte.md`).
2. Pégala en `src/content/<sección>/` con un nombre en minúsculas y guiones:
   `src/content/herramientas/nmap.md` → `/herramientas/nmap/`.
3. Rellena el frontmatter y quita `borrador: true` cuando quieras publicarla.

Frontmatter:

| Campo | Obligatorio | Ejemplo |
| --- | --- | --- |
| `titulo` | sí | `Volatility 3` |
| `descripcion` | sí (máx. 200) | `Framework para analizar volcados de RAM.` |
| `categoria` | sí | `forense`, `redes`, `pentesting`, `hardening`, `osint`, `cripto` |
| `etiquetas` | no | `[memoria, cli]` |
| `actualizado` | sí | `2026-11-22` |
| `borrador` | no | `true` → visible en `npm run dev`, no se publica |

El build **falla** si el frontmatter no es válido y **avisa** si a una ficha o
writeup le falta alguna sección obligatoria de su plantilla.

Extras de Markdown:

- Cajas destacadas con la sintaxis de GitHub: `> [!NOTE]`, `> [!TIP]`,
  `> [!WARNING]`, `> [!ERROR] Título`.
- Bloques ` ```bash ` con botón copiar (omite los comentarios `#`).
  Los bloques ` ```text ` se etiquetan como "salida".
- Los títulos `##` forman el índice de la página.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # genera dist/
npm run check    # comprobación de tipos
```

Requiere Node 22.12 o superior.

## Estructura

```
src/
├── components/
│   ├── Header.astro         Cabecera + barra de navegación inferior (móvil)
│   ├── Footer.astro
│   ├── EntryCard.astro      Tarjeta de entrada en listados
│   ├── FilterableList.astro Listado con filtro por categoría
│   ├── Icon.astro           Iconos SVG en línea
│   └── search/              Buscador (isla de React)
├── content/                 Contenido en Markdown (herramientas, writeups, apuntes)
├── content.config.ts        Colecciones y esquema del frontmatter
├── data/
│   └── site.ts              Identidad, enlaces, navegación, categorías, secciones obligatorias
├── layouts/
│   ├── BaseLayout.astro     <head>, cabecera, pie, botón de copiar en código
│   └── EntryLayout.astro    Página de una entrada con índice lateral
├── lib/
│   ├── entries.ts           Lectura de las colecciones
│   ├── remark-callouts.mjs  Plugin de cajas destacadas
│   └── url.ts               URLs respetando la ruta base de GitHub Pages
├── pages/
│   ├── index.astro          Inicio
│   ├── [section]/index.astro   Listados: herramientas, writeups, apuntes
│   ├── [section]/[slug].astro  Entrada individual
│   ├── buscar.astro
│   └── 404.astro
└── styles/global.css        Sistema de diseño (tokens y componentes base)
plantillas/                  Plantillas para nuevas entradas
```

## Diseño

- Tema oscuro tipo terminal: fondo casi negro, acento verde (acciones, prompts)
  y cian (enlaces, rutas). Cada categoría tiene su color.
- Tipografía: JetBrains Mono (autoalojada) para títulos, UI y código; fuente del
  sistema para el texto largo, más legible en el móvil.
- Mobile-first: barra de navegación inferior en el móvil, índice de la ficha
  como chips desplazables; en escritorio, navegación superior e índice lateral.
- Atajo <kbd>/</kbd> para ir al buscador. Botón "copiar" en todos los bloques de
  código (sin copiar los comentarios).

## Aviso

Contenido con fines educativos. Los datos de las prácticas (IPs, hashes,
nombres) son ficticios; las IPs usan los rangos de documentación (RFC 5737).

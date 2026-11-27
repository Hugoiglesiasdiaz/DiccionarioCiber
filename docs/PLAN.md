# Plan de diseño · DiccionarioCiber

Cuaderno público de ciberseguridad donde anoto los **conceptos** que aprendo y me
resultan útiles, y algunos **casos prácticos**. Lo escribo desde el PC en
Markdown y lo consulto sobre todo desde el móvil.

> Normas del proyecto: Git y GitHub los gestiono yo (nada de commits, push ni
> repositorios automáticos). No es un portfolio; mi portfolio es
> [hugoiglesiasdiaz.es](https://hugoiglesiasdiaz.es).

---

## 1. Modelo de contenido

### Tipos de nota

| Tipo | Sección | Plantilla | Para qué |
| --- | --- | --- | --- |
| `concepto` | Conceptos | Libre (títulos `##`) | Ideas, técnicas, ataques, protocolos, normativa… |
| `herramienta` | Conceptos | **Fija** | Un concepto que es una herramienta concreta. |
| `caso` | Casos prácticos | **Fija** | Práctica o laboratorio paso a paso. |

Las herramientas viven dentro de *Conceptos*. Se distinguen por el filtro
**Herramienta** y por su plantilla fija.

**Plantilla de herramienta:** Qué es · Para qué sirve · Comandos habituales ·
Ejemplo práctico · Errores típicos · Advertencias.

**Plantilla de caso práctico:** Contexto · Entorno · Desarrollo · Conclusiones
(con lo aprendido).

Si a una nota con plantilla fija le falta una sección, el build avisa.

### Filtros

Cada nota puede tener **varios valores en cada grupo**.

**Asignaturas** (obligatorio, al menos una):

| id | Nombre completo | Nombre corto (chips) |
| --- | --- | --- |
| `hacking` | Hacking Ético | Hacking ético |
| `incidentes` | Incidentes de Ciberseguridad | Incidentes |
| `produccion` | Puesta en Producción Segura | Puesta en producción |
| `forense` | Análisis Forense Informático | Forense |
| `normativa` | Normativa de Ciberseguridad | Normativa |
| `bastionado` | Bastionado de Sistemas y Redes | Bastionado |

**Extras** (opcional):

| id | Significado |
| --- | --- |
| Herramienta | Se pone solo si `tipo: herramienta`. |
| `comandos` | La nota tiene comandos para copiar y pegar. |
| `linux` | Aplica a Linux. |
| `windows` | Aplica a Windows. |

**Cómo se combinan:** dentro de un grupo se suman (Forense **o** Incidentes) y
entre grupos se exigen todos (Forense **y** Linux). Los filtros activos se
guardan en la URL (`/conceptos/?asignatura=forense&extra=linux`), así que se
pueden enlazar y el botón "atrás" funciona.

### Frontmatter

```yaml
---
titulo: Volatility 3
descripcion: Framework para analizar volcados de memoria RAM.   # máx. 200
tipo: herramienta                  # concepto | herramienta | caso
asignaturas: [forense, incidentes] # al menos una
extras: [comandos, linux, windows] # opcional
etiquetas: [memoria, ram]          # opcional: solo para mejorar la búsqueda
actualizado: 2026-11-22
---
```

### Organización de archivos

```
src/content/conceptos/volatility.md        → /conceptos/volatility/
src/content/conceptos/orden-de-volatilidad.md
src/content/casos/memoria-equipo-infectado.md → /casos/memoria-equipo-infectado/
plantillas/concepto.md · herramienta.md · caso.md
```

### Notas actuales

| Nota | Tipo | Asignaturas | Extras |
| --- | --- | --- | --- |
| Autopsy | herramienta | Forense | comandos, windows, linux |
| Volatility 3 | herramienta | Forense, Incidentes | comandos, windows, linux |
| PhotoRec | herramienta | Forense | comandos, linux, windows |
| Orden de volatilidad | concepto | Forense, Incidentes | — |
| Cadena de custodia | concepto | Forense, Normativa | — |
| Análisis de memoria de un equipo infectado | caso | Forense, Incidentes | comandos, windows |

---

## 2. Páginas y navegación

Navegación (barra inferior en el móvil, superior en escritorio):
**Inicio · Asignaturas · Conceptos · Casos prácticos · Buscar**

### Inicio (en este orden)
1. **Buscador grande** arriba: escribes y vas directo a los resultados.
2. **Ventana de terminal** decorativa.
3. **Accesos por asignatura**: 6 tarjetas con nombre, color y número de
   conceptos y casos. Cada una abre el temario de esa asignatura
   (`/asignaturas/forense/`).
4. **Últimas notas** añadidas o actualizadas.

### Asignaturas y temario
- `/asignaturas/`: las 6 tarjetas de asignatura.
- `/asignaturas/<id>/`: temario de la asignatura. Los temas (definidos en
  `TEMAS`, en `src/data/site.ts`) aparecen en orden, con sus notas numeradas
  (1.1, 1.2…). Debajo, «Otras notas»: las de la asignatura sin tema.
- Una nota entra en un tema con `tema: forense/introduccion` y `orden: 1`.

### Conceptos y Casos prácticos (listados)
- Filtros combinables por grupos: Asignatura · Extras.
- Contador de resultados y botón para limpiar filtros.
- Tarjetas con título, descripción, chips de asignaturas y fecha.
- Orden: más recientes primero.

### Página de una nota
- Ruta (`~/conceptos/volatility`), tipo, asignaturas, extras y fecha.
- Índice (chips en el móvil, lateral en escritorio).
- Bloques de código con botón **copiar**; cajas `[!TIP]`, `[!WARNING]`, `[!ERROR]`.
- Si tiene tema: «Forense › Tema 1: Introducción · 3/6» encima del título, y
  enlaces a la **nota anterior y la siguiente** del tema al final.
- Al final: **otras notas de la misma asignatura**.

### Buscar
- Búsqueda instantánea por palabras clave en **todo el texto**, incluidos
  comandos y opciones (`--pid`, `windows.pslist`).
- Los mismos filtros que en los listados.
- Términos resaltados y la búsqueda guardada en la URL (`?q=`).
- Atajo de teclado `/` desde cualquier página.

### Otras
- 404 con estilo de terminal.
- Pie de página: aviso legal/educativo, enlace al portfolio y al código.

---

## 3. Diseño visual

- Se mantiene el estilo actual: terminal, mobile-first, JetBrains Mono para
  títulos y código, fuente del sistema para el texto largo.
- Cada **asignatura** tiene su color (sustituyen a las categorías actuales).
- **Tema claro** nuevo:
  - Botón sol/luna en la cabecera.
  - Por defecto sigue la preferencia del sistema; la elección se recuerda.
  - Sin parpadeo al cargar (un script mínimo en `<head>`).
  - Paleta clara: fondo papel, verdes y cianes más oscuros para que tengan
    contraste suficiente (WCAG AA).
- Accesibilidad: foco visible, contraste AA en ambos temas, navegación con
  teclado y respeto a "reducir movimiento".

---

## 4. Búsqueda

- **Ahora:** MiniSearch con el índice generado en el build (título,
  descripción, etiquetas, encabezados, texto y código). Tolera erratas y
  busca por prefijo; no distingue tildes ni mayúsculas.
- **Futuro:** búsqueda semántica con Transformers.js
  (`multilingual-e5-small`). Los embeddings se precalcularán en el build, el
  modelo solo se cargará al activar un interruptor y los resultados de las dos
  búsquedas se combinarán en un único ranking (Reciprocal Rank Fusion).
  La interfaz ya deja preparado ese interruptor.

---

## 5. Publicación

- Sitio estático (`npm run build` → `dist/`), sin backend.
- SEO básico: sitemap, `robots.txt`, metadatos Open Graph y URL canónica.
- Hospedaje y repositorio los gestiono yo. Puedo dejar preparados los
  archivos de despliegue (por ejemplo, un workflow de GitHub Pages) para que los
  suba cuando quiera.

---

## 6. Fases

| Fase | Contenido |
| --- | --- |
| **1. Modelo de contenido** ✅ | Nuevo esquema (tipo, asignaturas, extras), colecciones `conceptos` y `casos`, migrar las 6 notas, plantillas nuevas. |
| **2. Navegación y listados** ✅ | Menú de 4 secciones, filtros por grupos en la URL, inicio nuevo, notas relacionadas. |
| **3. Tema claro** ✅ | Paleta clara AA, botón sol/luna en la cabecera, sigue al sistema hasta que eliges, sin parpadeo; código con github-light. |
| **4. Búsqueda por palabras clave** ✅ | Índice MiniSearch generado en el build (`/search-index.json`) sobre todo el texto y los comandos; prefijos, sin tildes, erratas leves; fragmento con la coincidencia resaltada. |
| **5. Publicación** ✅ | Sitemap, `robots.txt`, Open Graph con imagen (`og.png`), `noindex` en la 404 y workflow de GitHub Pages con dominio configurable. |
| Futuro | Búsqueda semántica. |

## 7. Pendiente de decidir

- ~~**Dominio y hosting**~~ ✅ Decidido: GitHub Pages en
  `ciberseguridad.hugoiglesiasdiaz.es` (CNAME en la zona DNS de OVH).

---
titulo: Metadatos
descripcion: "Qué son los metadatos de fotos y documentos, qué categorías existen (EXIF, XMP, IPTC, Office/PDF), qué revelan en un OSINT y cómo limpiarlos."
tipo: concepto
asignaturas: [hacking, forense]
etiquetas: [metadatos, EXIF, XMP, IPTC, GPS, MakerNotes, OSINT, FOCA, Metagoofil, mat2, sanitización]
tema: hacking/osint
orden: 4
actualizado: 2026-11-27
---

## Concepto

Los **metadatos** son datos que describen otros datos. Van ocultos dentro de casi
cualquier fichero: autor, programa usado, fechas, modelo de cámara, coordenadas GPS…

Una organización que publica documentos sin limpiarlos puede revelar **nombres de
usuario, rutas internas, versiones de software o ubicaciones**. Para un atacante es
información de partida para *phishing* o para buscar vulnerabilidades en esas versiones.

## Categorías

| Categoría | Dónde | Qué contiene | Interés |
| --- | --- | --- | --- |
| **EXIF** | Fotos | Fecha de captura, cámara (`Make`, `Model`), **GPS**, software | Dónde y cuándo se hizo la foto, con qué dispositivo |
| **XMP** | Fotos y documentos (Adobe) | Título, descripción, etiquetas, herramienta de edición | Si se editó y con qué |
| **IPTC** | Fotos de prensa | Autor, copyright, palabras clave | Autoría |
| **MakerNotes** | Fotos | Datos propios del fabricante: número de serie, firmware | Identificar el dispositivo concreto |
| **Miniatura** | Fotos | Una versión pequeña de la imagen | Puede conservar la imagen **antes** de recortarla o editarla |
| **PDF** | Documentos | `Author`, `Creator`, `Producer`, fechas | Personas y software |
| **Office** | docx, xlsx, pptx | `LastModifiedBy`, `Company`, `Template`, revisiones, tiempo de edición | Usuarios internos, nombre de la empresa, plantillas |

> [!NOTE] Pistas de edición
> Si `ModifyDate` es distinta de `DateTimeOriginal`, o `Software` indica un editor (GIMP,
> Photoshop, Snapseed), la imagen probablemente se ha retocado.

## Cómo se aprovecha en un OSINT

1. Localizar los documentos públicos del objetivo: [dorks](../google-dorks/) como
   `site:example.com filetype:pdf`, o rastreando la web con
   [wget](../../herramientas/wget/).
2. Descargarlos y extraer sus metadatos en bloque con
   [ExifTool](../../herramientas/exiftool/).
3. Reunir usuarios, software y rutas, y relacionarlos.

Herramientas clásicas que automatizan todo el proceso son **FOCA** (Windows) y
**Metagoofil**. Hoy se sustituyen a menudo por la combinación de
[theHarvester](../../herramientas/theharvester/), wget y ExifTool.

## Cómo limpiarlos (prevención)

- **Fotos**: borrar todos los metadatos con ExifTool (`exiftool -all=`).
- **PDF y Office**: **mat2** genera una copia limpia (`documento.cleaned.pdf`).
- En Office, *Inspeccionar documento* antes de publicar.
- Muchas redes sociales eliminan el EXIF al subir una foto, pero no todas, ni los
  servicios de mensajería al enviar como fichero.

> [!WARNING] En forense
> Los metadatos se pueden **modificar**: una fecha o un GPS en el EXIF no prueban nada
> por sí solos. Hay que contrastarlos con otras evidencias.

## Resumen

Los metadatos revelan autor, fechas, software, dispositivo y ubicación. En OSINT se
extraen de los documentos públicos del objetivo. Antes de publicar, se limpian con
ExifTool o mat2.

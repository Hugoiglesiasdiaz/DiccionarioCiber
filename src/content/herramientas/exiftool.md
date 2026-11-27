---
titulo: ExifTool
descripcion: "Leer, exportar, modificar y borrar los metadatos de fotos y documentos: GPS, fechas, autor, software y miniaturas."
tipo: herramienta
asignaturas: [hacking, forense]
extras: [comandos, linux, windows]
etiquetas: [ExifTool, metadatos, EXIF, GPS, XMP, IPTC, OSINT, sanitización, libimage-exiftool-perl]
actualizado: 2026-11-27
---

## Qué es

**ExifTool** lee y escribe metadatos de cientos de formatos: imágenes, PDF, Office, audio
y vídeo. Funciona en Linux, Windows y macOS. En Debian y Kali se instala con
`sudo apt install libimage-exiftool-perl`.

Qué categorías de metadatos existen y qué revelan:
[Metadatos](../../conceptos/metadatos/).

## Para qué sirve

- Ver los metadatos de un fichero o de una carpeta entera.
- Extraer coordenadas GPS y localizar dónde se hizo una foto.
- Exportarlos a CSV para analizar muchos ficheros.
- Detectar pistas de edición.
- Borrar los metadatos antes de publicar un fichero.

## Comandos habituales

```bash
exiftool foto.jpg                               # todos los metadatos
exiftool -a -u -G1 foto.jpg                     # todos, con su grupo (EXIF, XMP, IPTC…)
exiftool -make -model -datetimeoriginal -software foto.jpg
exiftool -gps:all foto.jpg                      # solo GPS
exiftool -n -gpslatitude -gpslongitude foto.jpg # GPS en decimal
exiftool documento.pdf                          # también documentos

# Carpetas
exiftool -r -if '$GPSLatitude' -p '$Directory/$FileName' .     # fotos con GPS
exiftool -r -csv -Author -Creator -Producer -GPSPosition -CreateDate carpeta/ > metadatos.csv

# Extraer la miniatura interna
exiftool -b -ThumbnailImage foto.jpg > miniatura.jpg

# Borrar
exiftool -all= foto.jpg                         # todos (deja foto.jpg_original)
exiftool -gps:all= foto.jpg                     # solo GPS
exiftool -all= -overwrite_original foto.jpg     # sin copia de seguridad
```

| Opción | Significado |
| --- | --- |
| `-TAG` | Mostrar solo esa etiqueta |
| `-TAG=valor` / `-TAG=` | Escribir / borrar una etiqueta |
| `-all=` | Borrar todos los metadatos que se pueden borrar |
| `-r` | Recursivo |
| `-csv` | Salida en CSV |
| `-n` | Valores numéricos, sin formatear |
| `-G1` | Muestra el grupo de cada etiqueta |
| `-if` / `-p` | Filtrar ficheros / formato de salida |
| `-b` | Salida binaria (para extraer imágenes) |

## Ejemplo práctico

Revisar qué filtran los documentos descargados de una web (carpeta de ejemplo):

```bash
exiftool -r -csv -Author -Creator -Producer -LastModifiedBy -Company \
  ./documentos > metadatos.csv
```

Al abrir `metadatos.csv` en una hoja de cálculo aparecen los nombres de usuario y el
software que se repiten. Para las fotos con GPS, un enlace a Maps de cada una:

```bash
for f in *.jpg; do
  lat=$(exiftool -n -s3 -gpslatitude "$f")
  lon=$(exiftool -n -s3 -gpslongitude "$f")
  [ -n "$lat" ] && echo "$f → https://maps.google.com/?q=$lat,$lon"
done
```

## Errores típicos

> [!ERROR] Olvidar la copia `_original`
> Al modificar, ExifTool guarda el fichero original como `foto.jpg_original`. Si
> publicas la carpeta entera, publicas también la copia con todos los metadatos.

> [!ERROR] Comillas en `-if`
> En Linux, usa comillas **simples** (`'$GPSLatitude'`). Con dobles, la shell interpreta
> `$GPSLatitude` como una variable vacía.

## Advertencias

> [!WARNING]
> ExifTool también puede **cambiar** fechas, GPS o autor. En una auditoría se usa para
> analizar y limpiar, nunca para alterar una evidencia.

> [!TIP]
> Para limpiar PDF y Office a fondo, **mat2** (`mat2 documento.pdf`) genera una copia
> `documento.cleaned.pdf`.

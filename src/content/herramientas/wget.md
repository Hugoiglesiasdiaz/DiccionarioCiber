---
titulo: wget
descripcion: "Descargar ficheros y webs desde la terminal: descargas sueltas, rastreo recursivo por tipo de fichero, modo spider para listar sin descargar y réplica de un sitio."
tipo: herramienta
asignaturas: [hacking]
extras: [comandos, linux]
etiquetas: [wget, descarga, spider, rastreo, recursivo, OSINT, metadatos]
actualizado: 2026-11-27
---

## Qué es

`wget` descarga ficheros por HTTP, HTTPS y FTP sin interfaz y sin interacción, así que
se puede usar en scripts. Puede seguir los enlaces de una web de forma **recursiva**.
Viene en casi todas las distribuciones Linux.

## Para qué sirve

- Descargar un fichero desde la terminal.
- Listar o descargar todos los documentos de una web para analizar sus
  [metadatos](../../conceptos/metadatos/).
- Hacer una copia local de un sitio.

## Comandos habituales

```bash
wget https://example.com/fichero.zip            # descargar un fichero
wget -O salida.html https://example.com         # elegir el nombre de salida
wget -c https://example.com/grande.iso          # continuar una descarga cortada

# Recursivo: solo ciertos tipos, todo en una carpeta
wget -r -l 2 -A pdf,docx,xlsx -nd -P ./docs https://example.com

# Spider: comprobar enlaces sin descargar nada
wget --spider -r -l 1 https://example.com

# Réplica del sitio para verlo en local
wget -m -k -p https://example.com
```

| Opción | Significado |
| --- | --- |
| `-O` | Nombre del fichero de salida |
| `-c` | Continuar una descarga |
| `-r` / `-l N` | Recursivo / profundidad máxima |
| `-A` / `-R` | Aceptar / rechazar extensiones |
| `-nd` | No crear la estructura de carpetas |
| `-P` | Carpeta de destino |
| `-w N` | Esperar N segundos entre peticiones |
| `--spider` | Solo comprueba que existen; no descarga |
| `-U` | User-Agent que se envía |
| `-m` | Réplica (*mirror*): recursivo e infinito |
| `-k` / `-p` | Convertir enlaces para verlo en local / bajar CSS e imágenes |
| `-q` | Sin mensajes |

## Ejemplo práctico

Inventario de documentos publicados en un subdominio de ejemplo, sin descargarlos:

```bash
wget --spider -r -l 1 -U "Mozilla/5.0" -A pdf,docx,xlsx,jpg \
  https://docs.example.com 2>&1 | tee spider.log \
  | grep -iE '^--.*\.(pdf|docx|xlsx|jpg)$'
```

Y si el dominio es tuyo o está en el alcance, descargarlos despacio para analizarlos con
[ExifTool](../exiftool/):

```bash
wget -r -l 2 -w 1 -A pdf,docx,xlsx,jpg -nd -P ./docs https://docs.example.com
```

## Errores típicos

> [!ERROR] Recursivo sin límite
> Sin `-l`, wget sigue enlaces hasta 5 niveles y puede descargar mucho más de lo previsto.
> Indica siempre la profundidad y los tipos con `-A`.

> [!ERROR] Esperar todo con `--spider`
> wget solo encuentra lo que está **enlazado** desde las páginas que recorre. Los
> ficheros sin enlace no aparecen.

## Advertencias

> [!WARNING]
> Rastrear una web es reconocimiento **activo**: las peticiones llegan al servidor y
> pueden saturarlo. Usa `-w` y hazlo solo con autorización.

> [!TIP]
> Para descargas puntuales o probar APIs, `curl` es la alternativa habitual
> (`curl -O url`, `curl -o nombre url`). Ver
> [Chuleta de comandos Linux](../../conceptos/comandos-linux/).

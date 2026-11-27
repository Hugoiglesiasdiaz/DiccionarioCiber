---
titulo: The Sleuth Kit
descripcion: "Herramientas de línea de comandos para analizar imágenes de disco sin montarlas: particiones, ficheros borrados, inodos y líneas de tiempo."
tipo: herramienta
asignaturas: [forense]
extras: [comandos, linux, windows]
etiquetas: [TSK, mmls, fls, icat, istat, mactime, sistema de ficheros, borrados, cli]
actualizado: 2026-11-27
---

## Qué es

**The Sleuth Kit (TSK)** es un conjunto de herramientas libres que leen **directamente
una imagen de disco** e interpretan sus particiones y sistemas de ficheros (NTFS, FAT,
exFAT, ext2/3/4, HFS+…) **sin montarla**. Así se ven también los ficheros borrados y los
metadatos que el sistema operativo no muestra.

Es el motor de [Autopsy](../autopsy/), que le pone interfaz gráfica.

Las herramientas siguen un patrón de nombres según la capa que analizan:

| Prefijo | Capa | Ejemplos |
| --- | --- | --- |
| `mm` | Particiones (*media management*) | `mmls` |
| `fs` | Sistema de ficheros | `fsstat` |
| `f` | Nombres de ficheros | `fls` |
| `i` | Metadatos (inodos, entradas de la MFT) | `istat`, `icat` |
| `blk` | Bloques de datos | `blkls` |
| `img` | La imagen | `img_stat` |

## Para qué sirve

- Ver la tabla de particiones y en qué sector empieza cada una.
- Listar ficheros, incluidos los **borrados** cuyas entradas aún existen.
- Extraer un fichero por su número de inodo, aunque esté borrado.
- Crear una **línea de tiempo** con las fechas MAC de todos los ficheros.

## Comandos habituales

```bash
mmls imagen.dd                       # particiones con su sector de inicio
fsstat -o 2048 imagen.dd             # datos del sistema de ficheros de esa partición

fls -r -o 2048 imagen.dd             # listado recursivo
fls -r -d -o 2048 imagen.dd          # solo los borrados
istat -o 2048 imagen.dd 12           # metadatos del inodo/entrada 12
icat  -o 2048 imagen.dd 12 > recuperado.txt   # extraer su contenido

blkls -o 2048 imagen.dd > no_asignado.bin     # solo el espacio no asignado

# Línea de tiempo
fls -r -m / -o 2048 imagen.dd > bodyfile.txt
mactime -b bodyfile.txt -d > timeline.csv
```

| Opción | Significado |
| --- | --- |
| `-o` | Desplazamiento de la partición **en sectores** (el `Start` de `mmls`) |
| `-r` | Recursivo |
| `-d` / `-u` | Solo entradas borradas / solo no borradas |
| `-m /` | Salida en formato *bodyfile* para `mactime` |
| `-b 512` | Tamaño de sector, si no es el habitual |

En la salida de `fls`, un `*` delante del nombre indica que el fichero está **borrado**.

## Ejemplo práctico

Una imagen con dos particiones en la que se borró la segunda (valores de ejemplo):

```text
$ mmls imagen.dd
      Slot      Start        End          Length       Description
002:  000:000   0000002048   0000043007   0000040960   DOS FAT16 (0x06)
003:  -------   0000043008   0000262143   0000219136   Unallocated
```

La tabla ya no muestra la segunda partición, pero sus datos siguen ahí. Si se sabe (o se
deduce) que empezaba en el sector 43008:

```bash
fls -o 43008 imagen.dd
```

```text
r/r 4:   conservar.txt
r/r * 6: informe_borrado.txt
```

Borrar la partición solo eliminó la entrada de la tabla: el sistema de ficheros y su
contenido siguen recuperables.

## Errores típicos

> [!ERROR] Poner el desplazamiento en bytes
> `-o` va en **sectores**. Con `losetup --offset` y `mount -o offset` es al revés: van
> en bytes (sector × 512).

> [!ERROR] Esperar recuperar siempre los borrados
> `fls` muestra las entradas que aún existen. Si el espacio se reutilizó, el contenido
> que devuelve `icat` puede ser de otro fichero. Para buscar por contenido, usa
> *carving* ([PhotoRec](../photorec/)).

## Advertencias

> [!TIP]
> TSK no modifica la imagen, pero igualmente trabaja sobre una **copia de trabajo** y
> anota cada comando con su salida.

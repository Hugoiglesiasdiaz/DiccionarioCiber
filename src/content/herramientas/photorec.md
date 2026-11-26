---
titulo: PhotoRec
descripcion: Recuperación de archivos borrados mediante file carving, sin depender del sistema de ficheros.
categoria: forense
etiquetas: [carving, recuperación, cli, testdisk]
actualizado: 2026-11-18
---

## Qué es

**PhotoRec** es una herramienta libre de recuperación de archivos que viene junto a
**TestDisk** (de CGSecurity). A pesar del nombre, no se limita a fotos: reconoce cientos
de formatos (documentos, comprimidos, ejecutables, bases de datos…).

Usa la técnica de **file carving**: recorre el disco bloque a bloque buscando las
**firmas** (cabeceras y finales) de cada tipo de fichero. Por eso funciona aunque el
sistema de ficheros esté dañado, formateado o sea desconocido.

## Para qué sirve

- Recuperar ficheros borrados de discos, tarjetas de memoria, USB o imágenes de disco.
- Rescatar datos de un sistema de ficheros corrupto o formateado.
- En forense, extraer ficheros del **espacio no asignado** de una imagen.

## Comandos habituales

PhotoRec tiene una interfaz de texto (TUI) por menús. Lo habitual es lanzarlo sobre una
imagen y elegir las opciones en pantalla:

```bash
# Sobre una imagen de disco (recomendado)
photorec imagen.dd

# Sobre un dispositivo físico (necesita permisos de administrador)
sudo photorec /dev/sdb

# Indicar directorio de salida y guardar un log de la sesión
photorec /log /d ./recuperados/ imagen.dd
```

Opciones importantes dentro de los menús:

| Menú | Opción | Para qué |
| --- | --- | --- |
| Partición | `Whole` / `Free` | Buscar en toda la partición o solo en el espacio libre (no asignado). |
| `[ Options ]` | `Keep corrupted files` | Conservar ficheros incompletos (útil en forense). |
| `[ File Opt ]` | Lista de formatos | Activar solo los tipos que interesan (tecla `s` invierte la selección). |
| Sistema de ficheros | `ext2/ext3/ext4` / `Other` | Ayuda a PhotoRec a calcular el tamaño de bloque. |

También admite modo no interactivo con `/cmd`, útil para documentar exactamente qué se
ejecutó:

```bash
# Recuperar solo JPG y PDF de toda la imagen
photorec /log /d ./recuperados/ /cmd imagen.dd partition_none,fileopt,everything,disable,jpg,enable,pdf,enable,search
```

## Ejemplo práctico

Escenario ficticio: una tarjeta SD de una cámara se formateó por error. Se ha creado la
imagen `sd-camara.dd` con `dd` y se ha calculado su hash.

1. Lanzar `photorec /log /d ./recuperados/ sd-camara.dd`.
2. Elegir la imagen y pulsar **Proceed**.
3. En **File Opt**, desactivar todo (`s`) y activar solo `jpg` y `mov`.
4. Elegir la partición y el tipo de sistema de ficheros **Other** (FAT/exFAT).
5. Seleccionar **Whole**, ya que tras el formateo todo el espacio se considera libre.
6. Al terminar, los ficheros aparecen en `recuperados.1/`, `recuperados.2/`…, con
   nombres como `f0012345.jpg`.

```text
recuperados.1/f0002048.jpg
recuperados.1/f0002304.jpg
recuperados.1/f0011776.mov
photorec.log
```

## Errores típicos

> [!ERROR] Guardar lo recuperado en el mismo disco
> Escribir en el disco que se está recuperando puede **sobrescribir** justo los datos que
> se buscan. El directorio de salida siempre debe estar en otro disco.

> [!ERROR] Esperar los nombres y carpetas originales
> El carving no lee el sistema de ficheros, así que se pierden nombres, rutas y fechas.
> Para eso, prueba antes TestDisk o las herramientas de The Sleuth Kit.

> [!ERROR] Activar todos los formatos
> Se generan miles de ficheros sin interés (fragmentos, cachés). Filtra por los tipos que
> realmente buscas.

## Advertencias

> [!WARNING]
> Los ficheros **fragmentados** (repartidos en bloques no contiguos) pueden recuperarse
> corruptos o incompletos. Verifica que se abren correctamente.

> [!WARNING]
> En un análisis forense trabaja sobre una imagen y conserva el `photorec.log` y el comando
> exacto: forman parte de la documentación del procedimiento.

> [!TIP]
> En SSD con TRIM activado los bloques borrados suelen quedar a cero, por lo que la
> recuperación es mucho menos probable que en discos mecánicos o tarjetas SD.

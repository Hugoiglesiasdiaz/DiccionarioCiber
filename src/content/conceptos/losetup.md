---
titulo: losetup y montaje en solo lectura
descripcion: "Cómo presentar una imagen forense como un disco con losetup, montarla en solo lectura y comprobar con blockdev que no se puede escribir."
tipo: herramienta
asignaturas: [forense]
extras: [comandos, linux]
etiquetas: [loop device, mount, blockdev, solo lectura, imagen forense, offset]
actualizado: 2026-11-27
---

## Qué es

- **`losetup`** asocia un fichero (una imagen `.dd`) a un **dispositivo loop**
  (`/dev/loop0`, `/dev/loop1`…). El sistema lo trata como si fuera un disco real:
  detecta sus particiones y se puede montar.
- **`mount -o ro`** monta un sistema de ficheros en solo lectura.
- **`blockdev`** consulta o cambia propiedades de un dispositivo de bloques: tamaño
  exacto o modo de solo lectura.

Juntos permiten **examinar una imagen** con las herramientas normales del sistema sin
modificarla.

## Para qué sirve

- Montar una copia de trabajo para ver sus ficheros.
- Acceder a una sola partición de la imagen, o a una partición borrada, indicando su
  desplazamiento.
- Comprobar el tamaño exacto de un dispositivo y marcarlo como solo lectura.

## Comandos habituales

```bash
# Asociar la imagen en solo lectura, detectar particiones y mostrar el loop asignado
LOOP=$(sudo losetup --read-only --partscan --find --show imagen.dd)
lsblk "$LOOP"                          # aparecen loopNp1, loopNp2…

# Montar la primera partición en solo lectura y sin ejecutar nada
sudo mount -o ro,noexec,nosuid,nodev "${LOOP}p1" /mnt/caso

# Una partición concreta por desplazamiento (sector de inicio × 512)
sudo losetup --read-only --find --show \
  --offset $((2048 * 512)) --sizelimit $((40960 * 512)) imagen.dd

# Ver loops activos, desmontar y liberar
losetup -l
sudo umount /mnt/caso
sudo losetup --detach "$LOOP"

# blockdev: tamaño en bytes y solo lectura
sudo blockdev --getsize64 /dev/sdX
sudo blockdev --setro /dev/sdX
sudo blockdev --getro /dev/sdX         # 1 = solo lectura
```

| Opción | Para qué |
| --- | --- |
| `--read-only` / `-r` | El loop no admite escrituras |
| `--partscan` / `-P` | Crea un dispositivo por partición (`loop0p1`…) |
| `--find --show` | Usa el primer loop libre e imprime cuál es |
| `--offset` / `--sizelimit` | Empieza en ese byte y limita el tamaño |
| `mount -o ro` | Monta en solo lectura |
| `noexec,nosuid,nodev` | No ejecuta binarios, ignora setuid y no interpreta dispositivos de la imagen |
| `noload` (ext3/ext4) | No reproduce la *journal* al montar |

## Ejemplo práctico

Comprobar que el análisis no modifica la copia de trabajo:

```bash
sha256sum trabajo.dd > antes.sha256
LOOP=$(sudo losetup -r -P -f --show trabajo.dd)
sudo mount -o ro,noexec,nosuid,nodev "${LOOP}p1" /mnt/caso
ls -laR /mnt/caso > listado.txt
sudo umount /mnt/caso && sudo losetup -d "$LOOP"
sha256sum -c antes.sha256              # «La suma coincide»
```

## Errores típicos

> [!ERROR] Montar sin `ro`
> Basta con montar en lectura y escritura para que cambien las fechas de acceso y se
> escriba en la *journal*. El hash de la imagen deja de coincidir.

> [!ERROR] Olvidar `noload` en ext3/ext4
> Incluso con `ro`, Linux puede **reproducir la journal** si el sistema no se desmontó
> limpiamente, y eso escribe en el dispositivo.

> [!ERROR] Dejar loops asociados
> Al terminar, `umount` y `losetup -d`. Un loop olvidado puede bloquear la imagen o
> confundir en la siguiente prueba.

## Advertencias

> [!WARNING]
> Todo esto es **protección por software**. Sirve para analizar imágenes, pero ante un
> dispositivo original real se usa un **bloqueador de escritura por hardware**.

> [!TIP]
> Para ver la tabla de particiones y los desplazamientos sin montar nada, usa `mmls` de
> [The Sleuth Kit](../the-sleuth-kit/).

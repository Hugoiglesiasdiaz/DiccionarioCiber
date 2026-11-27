---
titulo: Clonación forense de un pendrive
descripcion: "Guía paso a paso para adquirir un pendrive como evidencia: protección contra escritura, imagen con dc3dd o dd, verificación por hash, análisis en solo lectura y custodia."
tipo: caso
asignaturas: [forense]
extras: [comandos, linux]
etiquetas: [dc3dd, dd, hash, write blocker, losetup, imagen forense, cadena de custodia, sleuth kit]
actualizado: 2026-11-27
---

> [!NOTE] Datos ficticios
> Es una guía de procedimiento, no el informe de un caso real. El identificador del
> caso, los dispositivos, las rutas y los hashes son de ejemplo.

## Contexto

Nos entregan un **pendrive USB** relacionado con un incidente y tenemos que hacer una
copia forense que se pueda defender en un informe. El original no se puede modificar,
y cada paso tiene que quedar documentado con su hora.

**Objetivo:** obtener una imagen bit a bit verificada, analizarla sin tocar el original
y dejar registrada la cadena de custodia.

## Entorno

- Estación forense con Linux (Kali, CAINE o similar) y la hora sincronizada con NTP.
- **Bloqueador de escritura por hardware** (*write blocker*) USB.
- Disco de destino con espacio de sobra, borrado previamente o recién formateado.
- Herramientas: [dc3dd](../../conceptos/dc3dd/), [dd](../../conceptos/dd/),
  [sha256sum](../../conceptos/sha256sum/), [losetup y blockdev](../../conceptos/losetup/),
  [Guymager](../../conceptos/guymager/) (opcional) y
  [The Sleuth Kit](../../conceptos/the-sleuth-kit/) (`mmls`, `fls`).

Variables de ejemplo para el resto de la guía:

```bash
CASO=CASO-2026-001
ORIG=/dev/sdX          # el pendrive (se averigua en el paso 3)
DEST=/mnt/destino/$CASO
mkdir -p "$DEST"/{imagenes,hashes,logs,trabajo}
```

## Desarrollo

### 0. Antes de tocar nada

- Comprobar la **autorización por escrito** y el alcance: qué se puede adquirir y
  analizar. Ver [Prueba ilícita](../../conceptos/prueba-ilicita/).
- Abrir el registro de actuaciones. Cada entrada lleva **hora UTC**, persona, acción y
  resultado.

### 1. Recepción y documentación física

Antes de conectarlo:

- Fotografiar el pendrive por ambas caras y su precinto, si lo tiene.
- Anotar marca, modelo, capacidad declarada, número de serie y estado físico.
- Registrar la entrega en la [cadena de custodia](../../conceptos/cadena-de-custodia/):
  quién lo entrega, a quién, cuándo y en qué estado está el precinto.

### 2. Preparar la estación: sin automontaje

Si el sistema monta el pendrive automáticamente, puede escribir en él (fechas de acceso,
ficheros ocultos, la *journal* del sistema de ficheros). Hay que desactivar el
automontaje y comprobarlo **antes** de conectar la evidencia:

```bash
# Escritorios GNOME (en otros escritorios, desde su configuración)
gsettings set org.gnome.desktop.media-handling automount false
gsettings set org.gnome.desktop.media-handling automount-open false

# Ver en directo qué hace el kernel al conectar un USB de pruebas
sudo dmesg -w
```

> [!TIP]
> Haz la prueba primero con un **USB propio sin valor** y comprueba que no aparece en
> `lsblk` con punto de montaje.

### 3. Conectar a través del bloqueador e identificar

```bash
lsblk -o NAME,SIZE,MODEL,SERIAL,RO,MOUNTPOINTS
sudo fdisk -l /dev/sdX
sudo blockdev --getsize64 /dev/sdX     # tamaño exacto en bytes
```

Comprueba que **modelo, serie y tamaño** coinciden con lo anotado en el paso 1, que la
columna `MOUNTPOINTS` está vacía y que `RO` vale 1 (lo marca el bloqueador).

Como refuerzo, también se puede marcar el dispositivo como solo lectura desde el kernel:

```bash
sudo blockdev --setro /dev/sdX
sudo blockdev --getro /dev/sdX         # debe devolver 1
```

> [!WARNING] El error que destruye una evidencia
> Confundir `/dev/sdX` con el disco de destino, o intercambiar `if=` y `of=` en `dd`,
> **sobrescribe el original**. Comprueba el dispositivo dos veces antes de cada comando.
> `blockdev --setro` ayuda, pero **no sustituye** a un bloqueador por hardware.

### 4. Hash del original antes de adquirir

```bash
sudo sha256sum /dev/sdX | tee "$DEST/hashes/origen-antes.sha256"
sudo sha512sum /dev/sdX | tee "$DEST/hashes/origen-antes.sha512"
```

### 5. Adquisición con dc3dd (método recomendado)

[dc3dd](https://sourceforge.net/projects/dc3dd/) es una versión de `dd` pensada para
forense: calcula los hashes mientras copia, informa de los sectores defectuosos y genera
un log.

```bash
sudo dc3dd if=/dev/sdX of="$DEST/imagenes/pendrive.dd" \
  hash=sha256 hash=sha512 log="$DEST/logs/pendrive.dc3dd.log"
echo $? > "$DEST/logs/pendrive.codigo-salida.txt"   # 0 = sin errores
```

El log recoge la hora de inicio y de fin, los bytes copiados, los errores de lectura y
los hashes. Se adjunta al informe.

#### Alternativa: dd

Si solo está disponible `dd`, la copia es igual de válida, pero el hash se calcula
aparte y conviene guardar la salida:

```bash
sudo dd if=/dev/sdX of="$DEST/imagenes/pendrive_dd.dd" bs=4M status=progress conv=fsync \
  2> "$DEST/logs/pendrive.dd.log"
```

| Opción | Qué hace | Cuándo usarla |
| --- | --- | --- |
| `conv=fsync` | Fuerza a escribir los datos en disco antes de terminar | Siempre |
| `conv=noerror` | Sigue adelante si hay errores de lectura | Soportes dañados |
| `conv=sync` | Rellena con ceros los bloques que no se pueden leer, para no desplazar los datos | Junto a `noerror` |
| `conv=notrunc` | No trunca el fichero de salida | No suele hacer falta en una adquisición |

> [!NOTE]
> Con `noerror,sync` y un soporte dañado, la imagen **no tendrá el mismo hash** que el
> original. Hay que documentarlo y anotar qué sectores fallaron (dc3dd lo hace solo).

#### Otros formatos

Para imágenes comprimidas con metadatos del caso se puede usar el formato **E01**
(`ewfacquire` o **Guymager**, que tiene interfaz gráfica). Verifica siempre el hash
resultante contra el del original: no des por buena la verificación de la propia
herramienta sin comprobarla.

### 6. Verificación de integridad

```bash
sha256sum "$DEST"/imagenes/*.dd | tee "$DEST/hashes/imagenes.sha256"
sudo sha256sum /dev/sdX | tee "$DEST/hashes/origen-despues.sha256"

# Si se hicieron dos imágenes, también se pueden comparar byte a byte
cmp "$DEST/imagenes/pendrive.dd" "$DEST/imagenes/pendrive_dd.dd" && echo "Idénticas"
```

| Comprobación | Resultado esperado |
| --- | --- |
| Tamaño de la imagen = `blockdev --getsize64` | Mismo número de bytes |
| Hash del origen antes = hash de la imagen | Coinciden |
| Hash del origen después = hash antes | Coinciden: la adquisición no modificó el original |

Si algo no coincide, **no se corrige**: se documenta, se investiga la causa y, si es
posible, se repite la adquisición.

### 7. Copia de trabajo y protección

El análisis nunca se hace sobre la imagen maestra, sino sobre una copia verificada:

```bash
cp --reflink=never "$DEST/imagenes/pendrive.dd" "$DEST/trabajo/pendrive_trabajo.dd"
sha256sum "$DEST/trabajo/pendrive_trabajo.dd"      # debe coincidir con la maestra
chmod 0444 "$DEST"/imagenes/*.dd "$DEST"/trabajo/*.dd
```

`--reflink=never` obliga a hacer una copia física completa. En sistemas de ficheros como
Btrfs, una copia *reflink* compartiría bloques con la maestra.

### 8. Análisis en solo lectura

```bash
# Asociar la imagen a un dispositivo loop en solo lectura y detectar sus particiones
LOOP=$(sudo losetup --read-only --partscan --find --show "$DEST/trabajo/pendrive_trabajo.dd")
lsblk "$LOOP"

sudo mkdir -p /mnt/caso
sudo mount -o ro,noexec,nosuid,nodev "${LOOP}p1" /mnt/caso
ls -la /mnt/caso
```

> [!TIP] ext3/ext4 en solo lectura
> Con `ro`, Linux puede **reproducir la *journal*** y escribir en el dispositivo. En
> sistemas ext3/ext4 añade `noload` (`-o ro,noload`). Por eso se monta siempre la
> **copia** y nunca el original.

Sin montar nada, The Sleuth Kit lee directamente la imagen e incluye los ficheros
borrados:

```bash
mmls pendrive_trabajo.dd             # tabla de particiones y sus sectores de inicio
fls -r -o 2048 pendrive_trabajo.dd   # listado recursivo de la partición que empieza en el sector 2048
```

### 9. Particiones borradas e imágenes parciales

Si `mmls` muestra espacio no asignado donde antes había una partición, se puede examinar
indicando su **desplazamiento** (sector de inicio × 512 bytes):

```bash
fls -o 43008 pendrive_trabajo.dd                  # ficheros de la antigua partición
sudo losetup --read-only --find --show \
  --offset $((43008 * 512)) --sizelimit $((40960 * 512)) pendrive_trabajo.dd
```

Borrar ficheros o una partición **no borra los datos**: solo elimina las referencias,
hasta que se sobrescriben.

> [!WARNING]
> Una imagen **parcial** (solo un rango de sectores) sirve para practicar o para un
> triaje, pero **no es una evidencia completa**: no permite verificar el soporte entero
> por hash.

### 10. Cierre

```bash
sudo umount /mnt/caso
sudo losetup --detach "$LOOP"
```

1. Desconectar el pendrive, guardarlo en una bolsa antiestática y **precintarlo**,
   anotando el número de precinto.
2. Copiar las imágenes y los manifiestos de hash al soporte de almacenamiento definitivo
   y **verificarlos en el destino** (`sha256sum -c imagenes.sha256`).
3. Registrar la devolución o el almacenamiento en la cadena de custodia.

## Registro de ejemplo

| Hora (UTC) | Elemento | Actuación | Resultado |
| --- | --- | --- | --- |
| 09:00 | EV-01 pendrive 32 GB | Recepción, fotografías y precinto n.º 0001 comprobado | Precinto intacto |
| 09:15 | EV-01 | Conexión con bloqueador e identificación (`lsblk`, `fdisk`) | RO = 1, sin montar |
| 09:20 | EV-01 | Hash previo SHA-256 | `a1b2…` (ejemplo) |
| 09:25 | IMG-01 | Adquisición con dc3dd | Código 0, sin errores |
| 10:05 | IMG-01 | Verificación de hashes antes, imagen y después | Coinciden |
| 10:10 | IMG-01 | Copia de trabajo y análisis en solo lectura | Hashes intactos |
| 11:30 | EV-01 | Precintado (n.º 0002) y entrega al responsable de custodia | Firmado por ambos |

## Conclusiones

Protección contra escritura → hash previo → imagen bit a bit → verificación → copia de
trabajo → análisis en solo lectura → precinto y custodia.

**Lo aprendido:**

- El **hash** demuestra que la imagen es igual al original, pero no sustituye al
  registro de quién hizo qué y cuándo.
- La protección por software (`blockdev --setro`, loop `--read-only`, `mount -o ro`)
  es un complemento. En un caso real se usa **bloqueador por hardware**.
- Documentar las **limitaciones** también es parte del trabajo: errores de lectura,
  relojes desfasados, herramientas que fallaron.

Ver también: [Orden de volatilidad](../../conceptos/orden-de-volatilidad/),
[ISO/IEC 27037](../../conceptos/iso-27037/) y [RFC 3227](../../conceptos/rfc-3227/).

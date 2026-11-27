---
titulo: dd
descripcion: "La herramienta clásica de Unix para copiar datos bloque a bloque: imágenes de discos, copias parciales y borrado de soportes."
tipo: herramienta
asignaturas: [forense]
extras: [comandos, linux]
etiquetas: [imagen forense, adquisición, copia bit a bit, cli, coreutils]
actualizado: 2026-11-27
---

## Qué es

**dd** copia datos **byte a byte** desde una entrada (`if=`) a una salida (`of=`), sin
interpretar el sistema de ficheros. Viene en cualquier Linux (GNU coreutils), y por eso
es la forma más básica de hacer una **imagen bit a bit** de un disco o un pendrive.

No calcula hashes ni guarda un registro: para un uso forense hay que hacerlo aparte, o
usar [dc3dd](../dc3dd/), que lo integra.

## Para qué sirve

- Hacer una imagen completa de un dispositivo (`/dev/sdX` → `imagen.dd`).
- Extraer solo un rango de sectores, por ejemplo una partición.
- Crear ficheros de prueba o soportes simulados.
- Sobrescribir con ceros un disco de destino antes de usarlo.

## Comandos habituales

```bash
# Imagen completa de un dispositivo, mostrando el progreso
sudo dd if=/dev/sdX of=imagen.dd bs=4M status=progress conv=fsync

# Soporte dañado: seguir ante errores y rellenar con ceros lo ilegible
sudo dd if=/dev/sdX of=imagen.dd bs=512 conv=noerror,sync status=progress

# Extraer una partición: 40960 sectores a partir del sector 2048
dd if=imagen.dd of=particion.dd bs=512 skip=2048 count=40960

# Crear un fichero de 256 MiB lleno de ceros (soporte simulado)
dd if=/dev/zero of=pendrive_prueba.img bs=1M count=256

# Borrar con ceros un disco de destino (¡comprueba el dispositivo!)
sudo dd if=/dev/zero of=/dev/sdY bs=4M status=progress conv=fsync
```

| Opción | Significado |
| --- | --- |
| `if=` / `of=` | Fichero o dispositivo de entrada / salida |
| `bs=` | Tamaño de bloque. `4M` es rápido; `512` es más fino ante errores |
| `count=` | Número de bloques que se copian |
| `skip=` / `seek=` | Bloques que se saltan en la entrada / en la salida |
| `status=progress` | Muestra el progreso |
| `conv=fsync` | Escribe todo a disco antes de terminar |
| `conv=noerror` | No se detiene ante errores de lectura |
| `conv=sync` | Rellena con ceros los bloques ilegibles para que no se desplacen los datos |
| `conv=notrunc` | No trunca la salida (útil al escribir dentro de un fichero existente) |

## Ejemplo práctico

Imagen de un pendrive con verificación posterior (datos de ejemplo):

```bash
sudo sha256sum /dev/sdX > origen.sha256
sudo dd if=/dev/sdX of=pendrive.dd bs=4M status=progress conv=fsync 2> pendrive.dd.log
echo $?                         # 0 = terminó sin errores
sha256sum pendrive.dd           # debe coincidir con origen.sha256
```

## Errores típicos

> [!ERROR] Intercambiar `if=` y `of=`
> `dd` no pregunta nada. Si escribes el original en `of=`, lo **sobrescribes**. Comprueba el
> dispositivo con `lsblk` antes de pulsar Intro.

> [!ERROR] Usar `noerror` sin `sync`
> Los bloques ilegibles se saltan sin dejar hueco y todo lo que viene detrás queda
> **desplazado**: la imagen deja de corresponderse con el disco.

> [!ERROR] Dar por buena la copia sin hash
> Que `dd` termine sin errores no demuestra que la imagen sea idéntica. Calcula y compara
> los hashes ([sha256sum](../sha256sum/)).

## Advertencias

> [!WARNING]
> Con `noerror,sync` y sectores dañados, el hash de la imagen **no coincidirá** con el del
> original. Es normal, pero hay que documentarlo.

> [!TIP]
> Guarda la salida de error (`2> fichero.log`) y el código de salida: es la única
> documentación que genera `dd`.

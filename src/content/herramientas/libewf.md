---
titulo: libewf (ewfacquire, ewfverify, ewfmount)
descripcion: "Herramientas libres para crear, verificar, consultar y montar imágenes E01 desde la terminal de Linux."
tipo: herramienta
asignaturas: [forense]
extras: [comandos, linux]
etiquetas: [E01, EWF, ewfacquire, ewfverify, ewfinfo, ewfmount, ewfexport, imagen forense]
actualizado: 2026-11-27
---

## Qué es

**libewf** es una biblioteca libre que lee y escribe el formato **EWF** (las imágenes
`.E01` de EnCase). Incluye las herramientas `ewf*` de línea de comandos, que en Debian,
Ubuntu y Kali se instalan con `apt install ewf-tools`.

| Herramienta | Qué hace |
| --- | --- |
| `ewfacquire` | Adquiere un dispositivo y crea la imagen E01 |
| `ewfverify` | Recalcula el hash de los datos y lo compara con el guardado |
| `ewfinfo` | Muestra los metadatos del caso y los hashes guardados |
| `ewfmount` | Presenta la imagen como un fichero raw para otras herramientas |
| `ewfexport` | Convierte la imagen a raw o a otro formato EWF |

## Para qué sirve

- Adquirir en E01 desde la terminal, con los datos del caso dentro de la imagen.
- Comprobar que una imagen E01 recibida está íntegra.
- Usar una E01 con herramientas que solo leen raw, como [The Sleuth Kit](../the-sleuth-kit/)
  o [losetup](../losetup/).

## Comandos habituales

```bash
# Adquirir: pregunta los datos del caso de forma interactiva
sudo ewfacquire /dev/sdX

# Adquirir sin preguntas, con los datos en la línea de comandos
sudo ewfacquire -u -t pendrive -C CASO-001 -E EV-01 -e "Perito" \
  -D "Pendrive USB de ejemplo" -d sha256 /dev/sdX

ewfinfo pendrive.E01               # metadatos y hashes guardados
ewfverify pendrive.E01             # recalcula y compara

# Montar como raw: aparece /mnt/ewf/ewf1
sudo mkdir -p /mnt/ewf
sudo ewfmount pendrive.E01 /mnt/ewf
sudo umount /mnt/ewf

# Convertir a raw
ewfexport -t pendrive -f raw pendrive.E01
```

| Opción de `ewfacquire` | Significado |
| --- | --- |
| `-u` | Sin preguntas: usa los valores indicados o los de por defecto |
| `-t` | Nombre de la imagen, sin extensión |
| `-C` / `-E` | Número de caso / número de evidencia |
| `-e` / `-D` / `-N` | Examinador / descripción / notas |
| `-d sha1,sha256` | Hashes adicionales al MD5, que siempre se calcula |
| `-c` | Compresión (por ejemplo `deflate:best`) |
| `-S` | Tamaño de cada trozo (`.E01`, `.E02`…) |

## Ejemplo práctico

Comprobar una imagen recibida y analizarla con The Sleuth Kit (datos de ejemplo):

```bash
ewfinfo pendrive.E01 | grep -iE "case|evidence|examiner|sha256"
ewfverify pendrive.E01
```

```text
ewfverify: SUCCESS
```

```bash
sudo ewfmount pendrive.E01 /mnt/ewf
mmls /mnt/ewf/ewf1
fls -r -o 2048 /mnt/ewf/ewf1
```

## Errores típicos

> [!ERROR] Calcular el hash del fichero `.E01`
> `sha256sum pendrive.E01` da el hash del contenedor, con su compresión y metadatos, no
> el de los datos adquiridos. Usa `ewfverify` o calcula el hash de `/mnt/ewf/ewf1`.

> [!ERROR] Abrir solo un trozo
> Si la imagen está dividida, todos los trozos (`.E01`, `.E02`…) deben estar en la misma
> carpeta. Se indica solo el primero.

## Advertencias

> [!WARNING]
> `ewfacquire` no bloquea la escritura en el original: hace falta un bloqueador por
> hardware.

> [!TIP]
> Con interfaz gráfica, [Guymager](../guymager/) crea las mismas imágenes E01.

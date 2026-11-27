---
titulo: dc3dd
descripcion: "Versión forense de dd que calcula hashes mientras copia, informa de los errores de lectura y deja un log de la adquisición."
tipo: herramienta
asignaturas: [forense]
extras: [comandos, linux]
etiquetas: [imagen forense, adquisición, hash, log, dd, DC3]
actualizado: 2026-11-27
---

## Qué es

**dc3dd** es una versión de [dd](../dd/) adaptada para forense por el *Department of
Defense Cyber Crime Center* (DC3) de EE. UU. Hace lo mismo que `dd`, pero añade lo que un
informe necesita:

- Calcula uno o varios **hashes** (MD5, SHA-1, SHA-256, SHA-512) mientras copia.
- Genera un **log** con la hora de inicio y fin, los bytes copiados y los errores.
- Informa de los **sectores defectuosos** y los rellena con ceros sin detenerse.
- Puede verificar la salida, dividir la imagen en trozos y borrar discos.

Viene en Kali y CAINE, o se instala con `apt install dc3dd`.

## Para qué sirve

- Adquirir un disco o un pendrive con los hashes y el log en un solo paso.
- Preparar (borrar y verificar) el disco de destino antes de una adquisición.

## Comandos habituales

```bash
# Adquisición con dos hashes y log
sudo dc3dd if=/dev/sdX of=pendrive.dd hash=sha256 hash=sha512 log=pendrive.log

# Además, vuelve a leer la salida y comprueba que su hash coincide
sudo dc3dd if=/dev/sdX hof=pendrive.dd hash=sha256 log=pendrive.log

# Dividir la imagen en trozos de 2 GB (pendrive.dd.000, .001…)
sudo dc3dd if=/dev/sdX ofs=pendrive.dd.000 ofsz=2G hash=sha256 log=pendrive.log

# Borrar con ceros el disco de destino y verificar el borrado
sudo dc3dd hwipe=/dev/sdY hash=sha256 log=borrado.log
```

| Opción | Significado |
| --- | --- |
| `if=` / `of=` | Entrada / salida, igual que en `dd` |
| `hash=` | Algoritmo de hash. Se puede repetir para calcular varios |
| `log=` | Fichero de log con el resumen de la operación |
| `hlog=` | Log aparte solo con los hashes (incluidos los de cada trozo) |
| `hof=` | Salida con verificación: relee lo escrito y compara el hash |
| `ofs=` + `ofsz=` | Salida dividida en trozos del tamaño indicado |
| `cnt=` / `iskip=` | Número de sectores que se copian / sectores que se saltan en la entrada |
| `wipe=` / `hwipe=` | Borrar un dispositivo con ceros / borrarlo y verificarlo |
| `verb=on` | Salida detallada |

## Ejemplo práctico

```bash
sudo dc3dd if=/dev/sdX of=pendrive.dd hash=sha256 log=pendrive.log
```

Resumen de log (valores de ejemplo):

```text
dc3dd 7.x started at 2026-01-15 09:25:03 +0000
input results for device `/dev/sdX':
   62521344 sectors in
   0 bad sectors replaced by zeros
   a1b2c3...e9f0 (sha256)
output results for file `pendrive.dd':
   62521344 sectors out
dc3dd completed at 2026-01-15 09:38:41 +0000
```

Se comprueba que `0 bad sectors` aparezca, que los sectores de entrada y de salida
coincidan y que el hash sea igual al calculado sobre el original.

## Errores típicos

> [!ERROR] Escribir la salida en el mismo disco que se adquiere
> Además de alterar la evidencia, la imagen nunca terminaría de forma coherente. El
> destino siempre es otro disco.

> [!ERROR] Perder el log
> El log es la prueba de cómo se hizo la adquisición. Guárdalo junto a la imagen y anota
> su hash en el registro.

## Advertencias

> [!WARNING]
> Igual que con `dd`, un error en `if=`/`of=` sobrescribe el original. dc3dd no añade
> ninguna protección contra escritura: usa un **bloqueador por hardware**.

> [!TIP]
> El hash que calcula dc3dd es el del **dispositivo leído**. Para afirmar que el original
> no cambió, compáralo con un hash calculado antes y otro después de la adquisición.

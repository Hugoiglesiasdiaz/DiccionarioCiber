---
titulo: AVML
descripcion: "Volcado de la memoria RAM de un Linux encendido con un único binario, sin compilar nada ni conocer la versión del kernel."
tipo: herramienta
asignaturas: [forense, incidentes]
extras: [comandos, linux]
etiquetas: [RAM, memoria, volcado, Microsoft, LiME, kcore]
actualizado: 2026-11-27
---

## Qué es

**AVML** (*Acquire Volatile Memory for Linux*) es una herramienta libre de Microsoft que
copia la memoria física de un Linux en ejecución. Es un **binario estático**: funciona en
casi cualquier distribución sin instalar dependencias ni compilar un módulo para el
kernel, al contrario que [LiME](../lime/).

Lee la memoria de la primera fuente disponible: `/dev/crash`, `/proc/kcore` o `/dev/mem`.
Guarda el resultado en formato LiME, que [Volatility 3](../volatility/) lee directamente.

## Para qué sirve

- Volcar la RAM de un servidor o un equipo Linux desde un USB.
- Volcar muchos equipos de forma rápida, sin preparar un módulo para cada kernel.
- Comprimir el volcado o enviarlo directamente a un almacenamiento remoto.

## Comandos habituales

```bash
# Volcado básico al USB
sudo ./avml /media/usb/memoria.lime

# Comprimido (ocupa mucho menos) y conversión posterior a LiME sin comprimir
sudo ./avml --compress /media/usb/memoria.lime.compressed
./avml-convert /media/usb/memoria.lime.compressed memoria.lime

# Forzar una fuente concreta
sudo ./avml --source /proc/kcore /media/usb/memoria.lime

sha256sum /media/usb/memoria.lime
```

| Opción | Significado |
| --- | --- |
| `--compress` | Comprime el volcado (se descomprime con `avml-convert`) |
| `--source` | Fuente de la memoria: `/dev/crash`, `/proc/kcore` o `/dev/mem` |
| `--url` | Sube el volcado a una URL (por ejemplo, almacenamiento en la nube) |
| `--delete` | Borra el fichero local tras subirlo |

## Ejemplo práctico

Volcado de un servidor encendido (datos de ejemplo):

```bash
date -u                                   # hora de inicio para el registro
sudo /media/usb/avml /media/usb/srv01.lime
date -u
sha256sum /media/usb/srv01.lime | tee /media/usb/srv01.lime.sha256
```

El volcado se analiza después con `vol -f srv01.lime linux.pslist`, si se dispone de los
símbolos de ese kernel.

## Errores típicos

> [!ERROR] Ejecutarlo sin `sudo`
> Sin privilegios no puede leer ninguna fuente de memoria.

> [!ERROR] Escribir en el disco del sistema
> El destino es siempre el USB o un disco externo, nunca `/tmp` ni el disco del equipo.

## Advertencias

> [!WARNING]
> Algunos kernels con protecciones activas (*lockdown*, *Secure Boot*) restringen
> `/proc/kcore` y `/dev/mem`. Si no hay ninguna fuente disponible, la alternativa es
> [LiME](../lime/).

> [!TIP]
> Para analizar el volcado con Volatility 3 hacen falta los símbolos del kernel exacto:
> anota la salida de `uname -a` antes de volcar.

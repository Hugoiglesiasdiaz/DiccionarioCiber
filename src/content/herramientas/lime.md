---
titulo: LiME
descripcion: "Módulo del kernel de Linux (y Android) para volcar la memoria RAM a un fichero o por red, compilado para el kernel exacto del equipo."
tipo: herramienta
asignaturas: [forense, incidentes]
extras: [comandos, linux]
etiquetas: [RAM, memoria, volcado, módulo del kernel, insmod, Android]
actualizado: 2026-11-27
---

## Qué es

**LiME** (*Linux Memory Extractor*) es un **módulo del kernel** libre que copia la memoria
física de un Linux o un Android en ejecución. Al trabajar dentro del kernel, hace una
copia muy completa, pero el módulo tiene que estar **compilado para la versión exacta del
kernel** del equipo.

Si no se puede preparar ese módulo, [AVML](../avml/) es la alternativa sin compilación.

## Para qué sirve

- Volcar la RAM de un Linux cuando otras herramientas no pueden leerla.
- Volcar la memoria de dispositivos **Android**.
- Enviar el volcado **por red** para no escribir nada en el equipo investigado.

## Comandos habituales

```bash
# Compilar el módulo (en un equipo con el MISMO kernel, no en la evidencia)
git clone https://github.com/504ensicsLabs/LiME
cd LiME/src && make                    # genera lime-<versión>.ko

# Volcado a un fichero en el USB
sudo insmod lime-$(uname -r).ko "path=/media/usb/memoria.lime format=lime"

# Volcado por red: el equipo escucha y el de análisis recibe
sudo insmod lime-$(uname -r).ko "path=tcp:4444 format=lime"
nc 192.0.2.15 4444 > memoria.lime      # en el equipo de análisis

# Descargar el módulo al terminar
sudo rmmod lime
```

| Parámetro | Significado |
| --- | --- |
| `path=` | Fichero de salida, o `tcp:<puerto>` para enviarlo por red |
| `format=lime` | Formato con cabeceras por rango de memoria (el que lee Volatility) |
| `format=raw` / `padded` | Rangos concatenados / con ceros en los huecos |
| `digest=sha256` | Calcula el hash del volcado y lo guarda junto a él |

## Ejemplo práctico

Volcado por red de un servidor (datos de ejemplo, el servidor es `192.0.2.15`):

1. En un equipo de laboratorio con el mismo kernel (`uname -r`), compilar el módulo y
   copiarlo al USB.
2. En el servidor: `sudo insmod /media/usb/lime-6.1.0-18-amd64.ko "path=tcp:4444 format=lime"`.
3. En el equipo de análisis: `nc 192.0.2.15 4444 > srv01.lime`.
4. Al terminar, `sudo rmmod lime` en el servidor y `sha256sum srv01.lime` en el equipo
   de análisis.

## Errores típicos

> [!ERROR] Cargar un módulo de otra versión del kernel
> `insmod` lo rechaza con *Invalid module format*. Hay que compilarlo para la versión
> exacta que da `uname -r`.

> [!ERROR] Compilar el módulo en el equipo investigado
> Instalar compiladores y cabeceras escribe en su disco y altera la evidencia. Se compila
> en un equipo de laboratorio con el mismo kernel.

## Advertencias

> [!WARNING]
> Con *Secure Boot* activo, el kernel puede rechazar módulos sin firmar. En ese caso hay
> que usar otra herramienta y documentarlo.

> [!TIP]
> Prepara de antemano módulos para los kernels más habituales de los equipos que
> gestionas: en una intervención no hay tiempo para compilar.

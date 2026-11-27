---
titulo: Clonación de discos
descripcion: "Copiar un disco bit a bit sin alterarlo: clonadoras hardware, bloqueadores de escritura, herramientas software y distribuciones forenses."
tipo: concepto
asignaturas: [forense]
etiquetas: [clonación, copia bit a bit, bloqueador de escritura, write blocker, clonadora, live CD, Tableau]
tema: forense/adquisicion
orden: 6
actualizado: 2026-11-27
---

## Concepto

**Clonar** es hacer una copia **exacta, bit a bit**, de un disco, incluidos el espacio
libre, los datos borrados y los sectores defectuosos. No vale copiar los ficheros
visibles: se perderían los borrados, el *slack space* y los metadatos.

La copia puede ir:

- **De disco a disco**: un clon.
- **De disco a fichero de imagen**, en uno o varios ficheros
  ([Formatos de imagen forense](../formatos-imagen-forense/)).

Y se verifica siempre con un [hash](../funciones-hash/).

## Clonación por hardware

**Clonadoras forenses** como Tableau TD2u o Atola TaskForce:

| Ventajas | Inconvenientes |
| --- | --- |
| Rápidas, sencillas y fiables | Hay que sacar o acceder al disco físicamente |
| Varias copias en paralelo | Caras (las profesionales pueden costar miles de euros) |
| Bloqueo de escritura y cálculo de hash incluidos | |

El **disco de destino**:

- Debe ser preferiblemente de características similares o mayor capacidad.
- Debe **borrarse con ceros antes de usarlo, aunque sea nuevo**: puede traer datos del
  fabricante o ser reacondicionado, y esos restos se mezclarían con la evidencia.

## Bloqueadores de escritura

Un **bloqueador de escritura** (*write blocker*) se conecta entre el disco de la
evidencia y el equipo, y deja pasar las lecturas pero **bloquea cualquier escritura**.
Es imprescindible al clonar por software.

| Tipo | Ejemplos | Notas |
| --- | --- | --- |
| Hardware | Tableau, estaciones forenses | La opción fiable |
| Software | RaTool en Windows (bloquea USB y otros dispositivos, con lista blanca), `blockdev --setro` y montaje en solo lectura en Linux | Complemento, no sustituto ([losetup](../../herramientas/losetup/)) |

## Clonación por software

| Herramienta | Sistema | Notas |
| --- | --- | --- |
| [dd](../../herramientas/dd/) | Linux | Básica, sin hash ni log |
| [dc3dd](../../herramientas/dc3dd/) / dcfldd | Linux | Versiones forenses de dd: hash, log y errores |
| [Guymager](../../herramientas/guymager/) | Linux | Interfaz gráfica, raw/E01/AFF |
| FTK Imager | Windows | Gráfica y gratuita, raw y E01 |
| OSFClone | Arranque propio | Clonación desde un USB de arranque |

## Distribuciones forenses (live CD/USB)

Sistemas que arrancan desde un USB o DVD con las herramientas ya instaladas. No montan
los discos del equipo, o los montan en **solo lectura**, así que actúan como bloqueador.
Las más usadas: **CAINE**, **SIFT** (SANS), **Tsurugi**, **PALADIN** y **Kali Linux**
en modo forense.

> [!WARNING]
> Arrancar el equipo investigado desde un USB es más cómodo que sacar el disco, pero
> antes comprueba que la BIOS/UEFI no arrancará el sistema instalado por error.

## Resumen

Copia bit a bit con bloqueador de escritura, a un destino borrado, verificada con hash.
Hardware si hay presupuesto y acceso al disco; software (dc3dd, Guymager, FTK Imager)
desde una distribución forense si no. Ejemplo completo:
[Clonación forense de un pendrive](../../casos/clonacion-forense-pendrive/).

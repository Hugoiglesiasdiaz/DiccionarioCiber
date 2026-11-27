---
titulo: Volcado de memoria RAM
descripcion: "Cómo capturar la memoria de un equipo encendido en Windows y Linux, qué herramientas usar y qué diferencia hay entre memoria física y virtual."
tipo: concepto
asignaturas: [forense, incidentes]
extras: [windows, linux]
etiquetas: [RAM, memoria, DumpIt, WinPmem, LiME, AVML, pagefile, hiberfil, crash dump]
tema: forense/adquisicion
orden: 4
actualizado: 2026-11-27
---

## Concepto

Un **volcado de memoria** es una copia del contenido de la RAM en un fichero. Es lo más
delicado de la adquisición en vivo: la RAM desaparece al apagar y cambia
continuamente. Contiene información que no está en el disco:

- Procesos en ejecución, incluido malware que solo vive en memoria.
- Conexiones de red, puertos abiertos y aplicaciones a la escucha.
- Usuarios conectados, en local y en remoto.
- Contraseñas y **claves de cifrado** cargadas.
- Fecha y hora del sistema.

> [!WARNING]
> El volcado se guarda en un **disco externo o USB**, nunca en el propio equipo. Y se
> ejecuta desde un soporte propio, no con programas del sistema.

## Herramientas

| Sistema | Herramientas |
| --- | --- |
| Windows | [WinPmem](../../herramientas/winpmem/), DumpIt, Magnet RAM Capture, Belkasoft RAM Capturer, FTK Imager |
| Linux | [AVML](../../herramientas/avml/) (sin compilar nada), [LiME](../../herramientas/lime/) (módulo para el kernel exacto) |
| Android | [LiME](../../herramientas/lime/) |

Todas copian la RAM a un fichero (raw o formato LiME) y después se calcula su
[hash](../funciones-hash/). El volcado se analiza con
[Volatility 3](../../herramientas/volatility/).

## Memoria física y memoria virtual

Las herramientas anteriores copian la **memoria física**. Pero el sistema también
guarda páginas de memoria en el disco, y conviene recogerlas al adquirir el disco:

| Fichero | Qué contiene |
| --- | --- |
| `pagefile.sys` (Windows) | Páginas de memoria enviadas al disco (intercambio) |
| `swapfile.sys` (Windows) | Lo mismo para aplicaciones UWP |
| `hiberfil.sys` (Windows) | Copia de la RAM al hibernar: puede ser un volcado completo de un momento anterior |
| Partición o fichero *swap* (Linux) | Intercambio |

## Otra vía: el volcado por fallo

Si Windows está configurado para ello, un fallo grave (pantalla azul) genera un **crash
dump**: un minivolcado o un volcado completo en `%SystemRoot%\MEMORY.DMP`. Se puede
provocar a propósito con **NotMyFault** (Sysinternals) y comprobar con **Dumpchk**. Es
una vía de último recurso: reinicia el equipo.

## Errores típicos

> [!ERROR] Esperar el mismo hash en dos volcados
> La RAM cambia sin parar: dos capturas seguidas **nunca** coinciden. El hash solo
> garantiza que cada volcado no cambia después de hacerlo.

> [!ERROR] Usar herramientas pesadas o con interfaz gráfica
> Ocupan más memoria y sobrescriben justo lo que se quiere capturar. Mejor herramientas
> pequeñas de línea de comandos.

## Resumen

Volcar la RAM antes de apagar, desde un USB propio y guardando en un disco externo.
DumpIt o WinPmem en Windows, AVML o LiME en Linux. Calcular el hash del volcado y
recoger también `pagefile.sys` y `hiberfil.sys` al adquirir el disco.

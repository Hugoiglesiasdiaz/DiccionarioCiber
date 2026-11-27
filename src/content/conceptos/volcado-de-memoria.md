---
titulo: Volcado de memoria RAM
descripcion: "Cómo capturar la memoria de un equipo encendido en Windows y Linux, qué herramientas usar y qué diferencia hay entre memoria física y virtual."
tipo: concepto
asignaturas: [forense, incidentes]
extras: [comandos, windows, linux]
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
| Windows | DumpIt, WinPmem, Magnet RAM Capture, Belkasoft RAM Capturer, FTK Imager, Mandiant Memoryze |
| Linux | LiME, AVML |
| Android | LiME (necesita un módulo compilado para ese kernel) |

```bat
:: Windows (consola como administrador, desde el USB)
winpmem_mini_x64.exe E:\caso\memoria.raw
```

```bash
# Linux con AVML: no hace falta saber la distribución ni el kernel
sudo ./avml /media/usb/memoria.lime

# Linux con LiME: módulo del kernel compilado para la versión exacta del sistema
sudo insmod lime-$(uname -r).ko "path=/media/usb/memoria.lime format=lime"

sha256sum /media/usb/memoria.lime
```

- **DumpIt** es lo más sencillo en Windows: se ejecuta, genera un volcado en formato
  raw del tamaño de la RAM y un log en JSON con su hash SHA-256, todo en la carpeta desde
  la que se lanza.
- **AVML** es de Microsoft. Lee la memoria de `/dev/crash`, `/proc/kcore` o `/dev/mem`,
  guarda en formato LiME, puede comprimir y enviar el resultado a un almacenamiento
  remoto.

El volcado se analiza después con [Volatility 3](../volatility/).

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

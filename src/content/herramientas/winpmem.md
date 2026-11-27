---
titulo: WinPmem
descripcion: "Volcado de la memoria RAM de un Windows encendido desde la línea de comandos, con un ejecutable pequeño que se lanza desde un USB."
tipo: herramienta
asignaturas: [forense, incidentes]
extras: [comandos, windows]
etiquetas: [RAM, memoria, volcado, winpmem_mini, Velocidex, raw]
actualizado: 2026-11-27
---

## Qué es

**WinPmem** es una herramienta libre (hoy mantenida por Velocidex, los autores de
Velociraptor) que copia la **memoria física** de un Windows en ejecución a un fichero
raw. Carga un controlador firmado para leer la RAM y no necesita instalación: la versión
`winpmem_mini` es un único ejecutable.

## Para qué sirve

- Volcar la RAM de un equipo Windows encendido para analizarla después con
  [Volatility 3](../volatility/).
- Hacerlo desde un USB propio, sin instalar nada en el equipo investigado.

## Comandos habituales

Desde una consola **como administrador**, con el ejecutable en el USB:

```bat
:: Volcado de la memoria física a un fichero raw en el USB
E:\herramientas\winpmem_mini_x64.exe E:\caso\memoria.raw

:: Hash del volcado
certutil -hashfile E:\caso\memoria.raw SHA256
```

```powershell
Get-FileHash E:\caso\memoria.raw -Algorithm SHA256
```

| Fichero | Para qué |
| --- | --- |
| `winpmem_mini_x64.exe` | Windows de 64 bits (lo habitual) |
| `winpmem_mini_x86.exe` | Windows de 32 bits |

## Ejemplo práctico

Volcado en un equipo encendido (datos de ejemplo):

1. Conectar el USB de trabajo, que aparece como `E:`.
2. Abrir `cmd` como administrador **desde el propio USB** y anotar la hora.
3. Ejecutar `E:\herramientas\winpmem_mini_x64.exe E:\caso\memoria.raw`.
4. Comprobar que el tamaño de `memoria.raw` es similar al de la RAM instalada.
5. Calcular el hash y anotarlo en el registro de la adquisición.

## Errores típicos

> [!ERROR] Lanzarlo sin permisos de administrador
> No puede cargar el controlador y el volcado falla o sale vacío.

> [!ERROR] Guardar el volcado en el disco del equipo
> Escribir en el disco investigado altera la evidencia y sobrescribe espacio libre. La
> salida va siempre al USB o a un disco externo.

## Advertencias

> [!WARNING]
> Algunos antivirus o EDR bloquean el controlador o el ejecutable. Si ocurre, anótalo y
> prueba con otra herramienta (DumpIt, Magnet RAM Capture) en lugar de desactivar
> protecciones sin autorización.

> [!TIP]
> Anota la hora de inicio y de fin: la RAM cambia mientras se copia y el volcado
> corresponde a ese intervalo.

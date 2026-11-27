---
titulo: Volatility 3
descripcion: Framework para extraer artefactos (procesos, conexiones, código inyectado…) de volcados de memoria RAM.
tipo: herramienta
asignaturas: [forense, incidentes]
extras: [comandos, windows, linux]
etiquetas: [memoria, ram, malware, cli]
actualizado: 2026-11-22
---

## Qué es

**Volatility 3** es un framework de código abierto, escrito en Python, para analizar
volcados de memoria RAM. No ejecuta nada de la imagen: la lee y reconstruye las
estructuras del sistema operativo (lista de procesos, sockets, módulos cargados,
registro…) a partir de los datos en bruto.

Es la reescritura completa de Volatility 2: cambia la sintaxis, ya no usa perfiles y
detecta el sistema operativo automáticamente mediante tablas de símbolos.

## Para qué sirve

- Ver qué procesos se estaban ejecutando, quién los lanzó y con qué argumentos.
- Encontrar conexiones de red activas en el momento de la captura.
- Detectar procesos ocultos o código inyectado en procesos legítimos.
- Extraer ficheros, DLL o ejecutables que estaban cargados en memoria.
- Recuperar artefactos que nunca llegaron a disco (comandos, claves, payloads *fileless*).

## Comandos habituales

Sintaxis general: `vol -f <volcado> <plugin> [opciones]`. Los plugins llevan el prefijo
del sistema operativo: `windows.`, `linux.` o `mac.`.

| Plugin | Qué hace |
| --- | --- |
| `windows.info` | Versión del SO y datos básicos del volcado. |
| `windows.pslist` | Procesos según la lista enlazada del kernel. |
| `windows.psscan` | Procesos buscando estructuras en toda la memoria (encuentra ocultos y terminados). |
| `windows.pstree` | Procesos en árbol padre → hijo. |
| `windows.cmdline` | Línea de comandos de cada proceso. |
| `windows.netscan` | Conexiones y sockets TCP/UDP. |
| `windows.dlllist` | DLL cargadas por un proceso. |
| `windows.malfind` | Regiones de memoria sospechosas de inyección (RWX sin fichero asociado). |
| `windows.filescan` | Objetos de fichero presentes en memoria. |
| `windows.hashdump` | Hashes de contraseñas locales (SAM). |
| `linux.bash` | Historial de bash recuperado de memoria. |

```bash
# Información general del volcado
vol -f memdump.raw windows.info

# Árbol de procesos de un PID concreto
vol -f memdump.raw windows.pstree --pid 4242

# Salida en CSV para trabajarla con otras herramientas
vol -f memdump.raw -r csv windows.pslist > pslist.csv

# Extraer los ficheros asociados a un proceso a un directorio
vol -f memdump.raw -o ./salida windows.dumpfiles --pid 4242

# Ver todos los plugins disponibles
vol -h
```

## Ejemplo práctico

Escenario ficticio: el IDS avisa de que un equipo Windows se comunica con una IP externa
desconocida. Se ha adquirido la memoria en `memdump.raw`.

### 1. Localizar la conexión

```bash
vol -f memdump.raw windows.netscan | grep ESTABLISHED
```

```text
0xc80e2a10  TCPv4  192.0.2.15  49733  203.0.113.50  443  ESTABLISHED  4242  svch0st.exe
```

### 2. Ver de dónde viene el proceso

```bash
vol -f memdump.raw windows.pstree --pid 4242
vol -f memdump.raw windows.cmdline --pid 4242
```

```text
4242  svch0st.exe  "C:\Users\usuario\AppData\Roaming\svch0st.exe" -k netsvc
```

El nombre imita a `svchost.exe` (con un **cero** en lugar de la "o") y se ejecuta desde
`AppData\Roaming` en vez de `System32`. Además, su proceso padre es `explorer.exe`, cuando
el legítimo siempre cuelga de `services.exe`.

### 3. Buscar código inyectado y extraer el binario

```bash
vol -f memdump.raw windows.malfind --pid 4242
vol -f memdump.raw -o ./salida windows.pslist --pid 4242 --dump
```

Del ejecutable extraído se calcula el hash y se analiza en un entorno aislado.

## Errores típicos

> [!ERROR] Unable to validate the plugin requirements
> Faltan las tablas de símbolos del kernel. Volatility 3 intenta descargarlas de los
> servidores de símbolos de Microsoft; si el equipo de análisis no tiene conexión, hay que
> descargar los paquetes de símbolos y descomprimirlos en `volatility3/symbols/`.

> [!ERROR] Usar la sintaxis de Volatility 2
> En la versión 3 no existen `--profile` ni `imageinfo`. El sistema se detecta solo y los
> plugins se escriben con prefijo: `windows.pslist`, no `pslist`.

> [!ERROR] Volcados de Linux sin símbolos
> Para Linux no hay símbolos genéricos: hay que generar el fichero ISF del kernel exacto
> con `dwarf2json` a partir de su `vmlinux` con información de depuración.

## Advertencias

> [!WARNING]
> Trabaja siempre sobre una **copia** del volcado y calcula su hash (`sha256sum`) antes y
> después del análisis para demostrar que no se ha alterado.

> [!WARNING]
> Los resultados son una **foto** del momento de la captura: un proceso que no aparece
> pudo haber terminado antes. No saques conclusiones solo por ausencia.

> [!TIP]
> Compara `windows.pslist` con `windows.psscan`. Un proceso que aparece en el segundo pero
> no en el primero puede estar oculto mediante manipulación de estructuras del kernel (DKOM).

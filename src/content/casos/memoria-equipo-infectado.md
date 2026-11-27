---
titulo: Análisis de memoria de un equipo infectado
descripcion: Identificación del proceso malicioso, su conexión de mando y control y su persistencia a partir de un volcado de RAM.
tipo: caso
asignaturas: [forense, incidentes]
extras: [comandos, windows]
etiquetas: [volatility, malware, memoria, laboratorio]
actualizado: 2026-11-24
---

> [!NOTE] Datos ficticios
> Escenario de práctica. Nombres, IPs (rangos de documentación RFC 5737) y rutas son
> inventados.

## Contexto

Un equipo Windows 10 de un laboratorio muestra lentitud y el cortafuegos registra
conexiones salientes periódicas hacia una IP externa. Antes de apagarlo, se adquiere la
memoria RAM para analizarla.

**Objetivo:** identificar el proceso responsable, cómo se ejecutó y cómo se mantiene en
el sistema.

## Entorno

- Volcado: `win10-lab.raw` (4 GB), con hash SHA-256 anotado al adquirirlo.
- Equipo de análisis: Linux con **Volatility 3** y Python 3.
- Herramientas complementarias: `sha256sum`, `strings`, `grep`.

```bash
# Verificar la integridad del volcado antes de empezar
sha256sum win10-lab.raw
```

## Desarrollo

### 1. Reconocimiento del volcado

```bash
vol -f win10-lab.raw windows.info
```

Confirma que es un Windows 10 de 64 bits y la hora de captura, que servirá de referencia
para toda la línea de tiempo.

### 2. Conexiones de red

```bash
vol -f win10-lab.raw windows.netscan
```

```text
Proto  LocalAddr         ForeignAddr         State        PID   Owner
TCPv4  192.0.2.15:49733  203.0.113.50:443    ESTABLISHED  4242  svch0st.exe
TCPv4  192.0.2.15:49801  198.51.100.7:443    ESTABLISHED  1880  msedge.exe
```

La conexión de `msedge.exe` es navegación normal. `svch0st.exe` destaca por el nombre.

### 3. Árbol de procesos y línea de comandos

```bash
vol -f win10-lab.raw windows.pstree
vol -f win10-lab.raw windows.cmdline --pid 4242
```

```text
* 3120  explorer.exe
** 4242 svch0st.exe   C:\Users\alumno\AppData\Roaming\svch0st.exe -k netsvc
```

Tres indicadores de compromiso:

1. Nombre que imita a `svchost.exe` (cero en lugar de "o").
2. Ruta en `AppData\Roaming`, no en `C:\Windows\System32`.
3. Proceso padre `explorer.exe`; el `svchost.exe` legítimo cuelga de `services.exe`.

### 4. Código inyectado

```bash
vol -f win10-lab.raw windows.malfind --pid 4242
```

Aparece una región con permisos `PAGE_EXECUTE_READWRITE` que empieza por `MZ`: un
ejecutable cargado directamente en memoria.

### 5. Persistencia

```bash
vol -f win10-lab.raw windows.registry.printkey --key "Software\Microsoft\Windows\CurrentVersion\Run"
```

```text
REG_SZ  Updater  C:\Users\alumno\AppData\Roaming\svch0st.exe -k netsvc
```

El malware se ejecuta en cada inicio de sesión mediante la clave **Run** del usuario.

### 6. Extracción para análisis posterior

```bash
vol -f win10-lab.raw -o ./evidencias windows.pslist --pid 4242 --dump
sha256sum ./evidencias/*.dmp
```

| Indicador | Valor (ficticio) |
| --- | --- |
| Proceso | `svch0st.exe` (PID 4242) |
| Ruta | `C:\Users\alumno\AppData\Roaming\svch0st.exe` |
| C2 | `203.0.113.50:443` |
| Persistencia | `HKCU\...\CurrentVersion\Run\Updater` |

## Conclusiones

- El proceso `svch0st.exe` es malicioso: se hace pasar por un servicio del sistema,
  mantiene una conexión de mando y control y persiste mediante la clave Run.
- **Contención:** aislar el equipo de la red, bloquear `203.0.113.50` en el cortafuegos y
  buscar el mismo indicador en otros equipos.
- **Erradicación:** eliminar la clave Run y el binario, o reinstalar el equipo.

**Lo aprendido:** la combinación `netscan` → `pstree` → `cmdline` → `malfind` permite pasar
de "una conexión rara" a un proceso concreto con sus pruebas en pocos minutos. Comparar
siempre con el comportamiento de los procesos legítimos es lo que delata al malware.

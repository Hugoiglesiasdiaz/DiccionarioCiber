---
titulo: Autopsy
descripcion: Plataforma gráfica de análisis forense de discos e imágenes, construida sobre The Sleuth Kit.
tipo: herramienta
asignaturas: [forense]
extras: [comandos, windows, linux]
etiquetas: [disco, timeline, gui, sleuthkit]
actualizado: 2026-11-20
---

## Qué es

**Autopsy** es una interfaz gráfica de código abierto para el análisis forense de
discos. Por debajo usa **The Sleuth Kit (TSK)**, un conjunto de herramientas de línea de
comandos que leen sistemas de ficheros (NTFS, FAT, exFAT, ext2/3/4, HFS+…) sin montarlos.

Trabaja por **casos**: cada caso agrupa una o varias fuentes de datos (imágenes de disco,
discos locales, carpetas) y guarda todo el análisis en una base de datos.

## Para qué sirve

- Navegar por el sistema de ficheros de una imagen, incluidos ficheros **borrados**.
- Crear una **línea de tiempo** (timeline) con la actividad del equipo.
- Extraer artefactos de forma automática: historial web, documentos recientes,
  dispositivos USB conectados, cuentas de usuario, metadatos EXIF…
- Buscar por palabras clave, expresiones regulares o hashes conocidos.
- Etiquetar evidencias y generar un informe del caso.

## Comandos habituales

Autopsy es gráfico; el flujo básico es:

1. **Case → New Case**: nombre, número de caso y examinador.
2. **Add Data Source**: tipo de fuente (imagen `.E01`/`.dd`, disco local, ficheros lógicos).
3. **Configure Ingest**: elegir los módulos de análisis que se ejecutarán.
4. Revisar resultados en el árbol de la izquierda: *Data Artifacts*, *Analysis Results*,
   *File Views* y *Timeline*.

| Módulo de ingesta | Qué hace |
| --- | --- |
| Recent Activity | Historial de navegadores, documentos recientes, USB, programas ejecutados. |
| Hash Lookup | Compara hashes con bases de datos de ficheros conocidos o maliciosos. |
| File Type Identification | Detecta el tipo real del fichero por su firma, no por la extensión. |
| Extension Mismatch Detector | Avisa si la extensión no coincide con el tipo real. |
| Keyword Search | Indexa el texto para buscar palabras y expresiones regulares. |
| Picture Analyzer / EXIF | Extrae metadatos de imágenes (cámara, fecha, GPS). |
| Data Source Integrity | Comprueba el hash de la imagen contra el valor esperado. |

Las mismas operaciones básicas se pueden hacer con **The Sleuth Kit** desde terminal:

```bash
# Tabla de particiones (para saber el sector de inicio)
mmls imagen.dd

# Información del sistema de ficheros de la partición que empieza en el sector 2048
fsstat -o 2048 imagen.dd

# Listado recursivo de ficheros, incluidos los borrados (marcados con *)
fls -r -o 2048 imagen.dd

# Extraer un fichero por su número de inodo / entrada MFT
icat -o 2048 imagen.dd 1234 > fichero_recuperado
```

## Ejemplo práctico

Escenario ficticio: se sospecha que un empleado copió documentos a un USB. Se dispone de
la imagen `pc-oficina.E01` del disco de su equipo.

1. Crear el caso y añadir `pc-oficina.E01` como *Disk Image or VM File*.
2. Activar los módulos **Recent Activity**, **Data Source Integrity** y **Keyword Search**
   (con la palabra `confidencial`).
3. En **Data Artifacts → USB Device Attached** aparece un dispositivo conectado el día de
   los hechos, con su número de serie.
4. En **Data Artifacts → Recent Documents** hay accesos directos (`.lnk`) a ficheros que
   apuntan a la unidad `E:\`, la letra asignada a ese USB.
5. La vista **Timeline** permite ver ambos eventos juntos: conexión del USB y apertura
   de los documentos minutos después.
6. Se etiquetan los resultados como *Notable Item* y se genera el informe HTML.

## Errores típicos

> [!ERROR] Ejecutar todos los módulos de ingesta
> En imágenes grandes la ingesta puede tardar horas. Empieza con los módulos que
> responden a tu pregunta y añade otros después (se pueden lanzar más tarde con
> *Run Ingest Modules*).

> [!ERROR] Zona horaria incorrecta
> Las fechas se muestran en la zona horaria configurada en Autopsy, no en la del equipo
> analizado. Ajústala en *Tools → Options → View* antes de interpretar la línea de tiempo.

> [!ERROR] Confiar en la extensión del fichero
> Un `.jpg` puede ser en realidad un ejecutable o un ZIP. Usa *File Type Identification* y
> *Extension Mismatch Detector*.

## Advertencias

> [!WARNING]
> Analiza siempre una **imagen** del disco, nunca el original. Si trabajas con un disco
> físico, conéctalo mediante un bloqueador de escritura.

> [!WARNING]
> Verifica el hash de la imagen al añadirla (módulo *Data Source Integrity*) y anótalo en
> la documentación de la cadena de custodia.

> [!TIP]
> El caso se guarda en una carpeta propia: cópiala entera si necesitas continuar el
> análisis en otro equipo.

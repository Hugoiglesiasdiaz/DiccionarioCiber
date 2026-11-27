---
titulo: SSD y TRIM
descripcion: "Por qué los SSD complican el forense: TRIM borra los datos eliminados por su cuenta y el hash de un SSD puede cambiar entre lecturas."
tipo: concepto
asignaturas: [forense]
etiquetas: [SSD, TRIM, flash, recolector de basura, recuperación, hash]
tema: forense/adquisicion
orden: 9
actualizado: 2026-11-27
---

## Concepto

Los **SSD** guardan los datos en memoria flash y funcionan de forma muy distinta a los
discos mecánicos (HDD). Eso afecta a dos cosas que el forense da por hechas: que los
ficheros borrados se pueden recuperar y que el hash de un disco no cambia.

## Qué es TRIM

En la memoria flash no se puede sobrescribir una celda directamente: primero hay que
borrarla, y se borra por bloques grandes. Para hacerlo, el SSD tiene un **recolector de
basura** que mueve los datos válidos y borra los bloques que ya no se usan.

**TRIM** es un comando con el que el sistema operativo avisa al SSD de qué bloques ya no
contienen datos válidos porque se borró un fichero. Así el SSD no pierde tiempo
moviéndolos y puede borrarlos cuando quiera: escribe más rápido y dura más.

## Por qué complica el forense

| | Sin TRIM (o en un HDD) | Con TRIM |
| --- | --- | --- |
| Fichero borrado | Sus datos siguen ahí hasta que se sobrescriben | El SSD puede borrarlos **en cualquier momento**, sin que nadie escriba nada |
| Recuperación | Probable, con [The Sleuth Kit](../the-sleuth-kit/) o *carving* | Muy difícil: las celdas suelen volver a cero |

Además, el SSD trabaja **por su cuenta en cuanto recibe corriente**, aunque esté
conectado a un bloqueador de escritura: reorganiza datos, descarta celdas dañadas y
borra bloques marcados por TRIM. Un bloqueador impide las escrituras del equipo, no las
del propio SSD.

> [!NOTE] «Soluciones» extremas
> Para impedir el borrado se puede intentar que el SSD no reciba la orden TRIM o no
> ejecute su recolector: cambiar la controladora o el firmware. Son técnicas de
> laboratorio especializado.

## SSD y hashes

Por ese trabajo interno, y porque algunos sectores nunca usados devuelven valores
**no deterministas**, es normal que **dos lecturas del mismo SSD den hashes
distintos** aunque nadie haya tocado los ficheros.

Cómo trabajar:

1. Hacer una **copia maestra** del SSD a un fichero de imagen o a un HDD, y calcular su
   hash. Ese es el valor de referencia.
2. Trabajar siempre sobre copias de esa imagen.
3. **No deshacerse del SSD original.**
4. Documentar en el informe por qué el hash del SSD puede no coincidir con una lectura
   posterior.

## Resumen

En un SSD con TRIM, los datos borrados desaparecen solos y el hash del disco puede
cambiar entre lecturas. Hay que adquirir cuanto antes, conservar una imagen maestra con
su hash y explicarlo en el informe. Ver también [Clonación de discos](../clonacion-de-discos/).

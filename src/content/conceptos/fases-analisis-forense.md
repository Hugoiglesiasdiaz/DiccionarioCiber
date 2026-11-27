---
titulo: Fases del análisis forense
descripcion: Las cuatro fases de una investigación forense y las propiedades que debe cumplir una metodología para que sus conclusiones se sostengan.
tipo: concepto
asignaturas: [forense]
etiquetas: [metodología, adquisición, preservación, informe pericial, daubert]
tema: forense/introduccion
orden: 2
actualizado: 2026-11-27
---

## Concepto

No hay una metodología **obligatoria** para hacer un análisis forense, pero casi todas
las guías coinciden en cuatro fases:

1. **Identificación y adquisición** de las evidencias.
2. **Preservación** de las evidencias.
3. **Análisis.**
4. **Documentación y presentación** de los resultados.

Algunas guías dividen alguna fase en varias o ponen la preservación antes de la
adquisición. El orden exacto importa menos que no saltarse ninguna.

## 1. Identificación y adquisición

**Identificar** es averiguar qué puede contener evidencias antes de tocar nada:

- ¿Qué dispositivos hay? ¿Están encendidos? ¿Dependen de otros (red, nube)?
- ¿En qué periodo de tiempo ocurrió el incidente?
- ¿Hay normas internas o reglamentos que se debían cumplir?

En una pericial, esta fase suele incluir una **entrevista** con quien encarga el trabajo
y una **inspección ocular** del lugar.

**Adquirir** es obtener una copia de los datos. Se trabaja siempre con **imágenes
forenses** (copias bit a bit verificadas por hash), nunca con el original.

Según la RFC 3227, la evidencia debe ser:

| Propiedad | Significa |
| --- | --- |
| Admisible | Válida en un proceso legal |
| Auténtica | Se puede demostrar que no ha sido manipulada |
| Completa | Cuenta toda la historia, no solo una parte |
| Fiable | No hay dudas sobre cómo se obtuvo |
| Creíble | Un juez o un jurado la puede entender |

> [!NOTE] Evidencia física y evidencia digital
> El disco o el móvil es la **evidencia física**. Lo que contiene (ficheros, procesos,
> logs, claves de registro) son **artefactos** o vestigios digitales.

## 2. Preservación

Que la evidencia no se pierda ni cambie desde que se recoge hasta el juicio:

- Recoger primero lo más volátil (ver [Orden de volatilidad](../orden-de-volatilidad/)).
- Etiquetar, fotografiar y precintar cada elemento.
- Transportar con cuidado: temperaturas extremas y campos magnéticos dañan los soportes.
- Registrar cada acción y cada traspaso en la
  [cadena de custodia](../cadena-de-custodia/). Romperla puede restar valor a la prueba.

## 3. Análisis

Aplicar técnicas para reconstruir lo ocurrido. Por ejemplo:

- Búsqueda de cadenas de texto en todo el disco, incluido el espacio no asignado.
- Actividad del usuario: dispositivos USB conectados, programas ejecutados, documentos
  abiertos.
- Recuperación de archivos borrados, correos, historial y caché del navegador.
- Artefactos del sistema: MFT, papelera, archivo de paginación, *slack space*,
  registro de Windows, logs, memoria RAM, tráfico de red.

## 4. Documentación y presentación

El trabajo acaba en un **informe**. Debe:

- Recoger **todos los pasos**, con fecha y hora de cada acción.
- Incluir fotografías y los hashes de las evidencias.
- Ser **objetivo**: hechos y conclusiones técnicas, sin juicios de valor.

En una pericial se suelen entregar dos partes: un **resumen ejecutivo** corto, que se
entienda sin conocimientos técnicos, y un **informe técnico** detallado. El perito
tiene que poder explicarlo en el juicio de forma clara y con pocos tecnicismos.

## Propiedades de una buena metodología

| Propiedad | Qué exige |
| --- | --- |
| Verificable | Se puede comprobar que las conclusiones salen de los datos |
| Reproducible | Repetir las mismas pruebas sobre los mismos datos da el mismo resultado |
| Repetible | Aplicar el mismo método a otros datos da resultados coherentes |
| Independiente | Las conclusiones no dependen de quién haga el análisis |
| Documentada | Todo el proceso está escrito de forma clara y detallada |

## ¿Es realmente «científico»?

En EE. UU., las sentencias **Frye** (1923) y **Daubert** (1993) fijaron qué hace falta
para admitir una prueba científica en un juicio:

- Que el método esté aceptado por la comunidad científica.
- Que se pueda probar y se haya probado.
- Que se conozca su **tasa de error**.
- Que esté publicado y revisado por pares.

El forense digital no siempre cumple estos requisitos: muchas herramientas están
«generalmente aceptadas» pero no validadas formalmente, no se conoce la tasa de error de
la mayoría de procedimientos, y algunas adquisiciones **no se pueden repetir** (un volcado
de RAM o la extracción de un móvil encendido). En España, la LEC y la LECrim son menos
estrictas, pero un buen perito de la otra parte puede usar estos argumentos.

> [!TIP]
> Por eso es tan importante documentar herramienta, versión y parámetros: si el método
> no se puede repetir, al menos se puede **explicar** y auditar.

## Resumen

Identificar y adquirir → preservar → analizar → documentar. Trabajar sobre copias
verificadas, recoger de lo más a lo menos volátil y documentar cada paso para que el
resultado sea verificable, reproducible y defendible ante un perito contrario.

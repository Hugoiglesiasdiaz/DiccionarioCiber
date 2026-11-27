---
titulo: Normas y guías forenses
descripcion: Qué normas ISO/UNE, RFC y guías de referencia existen para el análisis forense y para qué sirve cada una.
tipo: concepto
asignaturas: [forense, normativa]
etiquetas: [ISO 27037, ISO 27042, UNE 71506, UNE 197010, RFC 3227, NIST, ENFSI, SWGDE, metodología]
tema: forense/introduccion
orden: 6
actualizado: 2026-11-27
---

## Concepto

No existe un estándar **obligatorio** para hacer un análisis forense. Lo que hay son
normas y guías con amplia aceptación. Seguirlas (y citarlas en el informe) hace que el
trabajo sea más fácil de defender ante un juez o un perito contrario.

## Normas ISO/IEC y UNE

Las normas «UNE-EN ISO/IEC» son la versión española de la norma internacional.

| Norma | Para qué sirve |
| --- | --- |
| **ISO/IEC 27037** | **La más citada.** Identificación, recogida, adquisición y preservación de evidencias digitales |
| ISO/IEC 27041 | Cómo garantizar que el método de investigación es adecuado |
| ISO/IEC 27042 | Análisis e interpretación de evidencias |
| ISO/IEC 27043 | Principios y procesos de una investigación de incidentes |
| ISO/IEC 27035 | Gestión de incidentes de seguridad (4 partes) |
| ISO/IEC 27038 | Redacción digital: cómo eliminar información sensible de documentos |
| ISO/IEC 27040 | Seguridad del almacenamiento |
| ISO/IEC 27050 | *E-discovery*: localizar y entregar información electrónica en un litigio |
| ISO/IEC 30121 | Gobierno del riesgo en investigaciones digitales |
| ISO/IEC 17025 | Competencia de laboratorios de ensayo (acreditación de laboratorios forenses) |
| **UNE 71505** | Sistema de gestión de evidencias electrónicas (3 partes) |
| **UNE 71506** | Metodología de análisis forense de evidencias electrónicas |
| **UNE 197001** | Criterios generales para elaborar informes periciales |
| **UNE 197010** | Criterios para informes periciales sobre TIC |

> [!TIP] Las tres que conviene recordar
> **27037** para recoger y adquirir, **27042** para analizar y **UNE 197010** para
> redactar el informe pericial.

## RFC del IETF

| RFC | Contenido |
| --- | --- |
| **RFC 3227** (2002) | Directrices para recoger y archivar evidencias: [orden de volatilidad](../orden-de-volatilidad/), qué evitar, [cadena de custodia](../cadena-de-custodia/). Breve, técnica y gratuita: el estándar de hecho |
| RFC 4810 (2007) | Requisitos para archivar documentos a largo plazo |
| RFC 4998 (2007) | Sintaxis de registros de evidencia (ERS) |
| RFC 6283 (2011) | Versión XML de la anterior (XMLERS) |

> [!NOTE] RFC 3227 frente a ISO/IEC 27037
> La RFC es corta, técnica y antigua (no menciona la nube). La ISO 27037 es más moderna y
> extensa, se centra en la metodología y en la admisibilidad judicial, pero **no cita
> herramientas concretas**.

## Guías de organismos

| Guía | Organismo | Ámbito |
| --- | --- | --- |
| *Best Practice Manual for the Forensic Examination of Digital Technology* | ENFSI (Europa) | General |
| *Electronic Crime Scene Investigation: A Guide for First Responders* | NIJ (EE. UU.) | Primera intervención |
| *Good Practice Guide for Computer-Based Electronic Evidence* | ACPO, hoy NPCC (Reino Unido) | General |
| *Guidelines on Mobile Device Forensics* (SP 800-101) | NIST (EE. UU.) | Móviles |
| *Best Practices for Mobile Phone Forensics* | SWGDE (EE. UU.) | Móviles |

Organizaciones de referencia:

- **SWGDE** (*Scientific Working Group on Digital Evidence*, desde 1998): publica guías
  sobre casi cualquier tipo de evidencia digital.
- **ENFSI** (*European Network of Forensic Science Institutes*, desde 1993): red europea
  de institutos forenses de todas las disciplinas.

## Resumen

Ninguna es obligatoria, pero citarlas da solidez al informe. Para el día a día:
**RFC 3227** (técnica, gratuita), **ISO/IEC 27037** (recogida y adquisición),
**ISO/IEC 27042** (análisis) y **UNE 197010** (informe pericial TIC). Para móviles, las
guías de **NIST** y **SWGDE**.

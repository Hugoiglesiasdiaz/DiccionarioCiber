---
titulo: Seguridad de la información y principios CIA
descripcion: "Diferencia entre seguridad de la información y seguridad informática, y los principios que se protegen: confidencialidad, integridad, disponibilidad, autenticidad y trazabilidad."
tipo: concepto
asignaturas: [hacking, normativa]
etiquetas: [CIA, CID, confidencialidad, integridad, disponibilidad, autenticidad, trazabilidad, no repudio]
tema: hacking/introduccion
orden: 3
actualizado: 2026-11-27
---

## Concepto

| | Seguridad de la información | Seguridad informática |
| --- | --- | --- |
| Qué protege | **Toda** la información de la organización, en cualquier formato | Los sistemas informáticos y los datos que contienen |
| Incluye | Papel, conversaciones, conocimiento de las personas, procesos | Equipos, redes, software, datos digitales |
| Enfoque | Gestión: políticas, riesgos, normas (ISO 27001, ENS) | Técnico: cortafuegos, antivirus, cifrado, parches |

La seguridad informática es una **parte** de la seguridad de la información.

## Principios (triada CIA)

| Principio | Significa | Ataque típico que lo rompe |
| --- | --- | --- |
| **Confidencialidad** | Solo acceden quienes están autorizados | Robo de datos, escucha del tráfico |
| **Integridad** | La información es correcta y no se ha modificado sin permiso | Alteración de registros, *man-in-the-middle* |
| **Disponibilidad** | Está accesible cuando se necesita | Denegación de servicio, *ransomware* |

En inglés es *Confidentiality, Integrity, Availability* (CIA). En español también se ve
como **CID**.

## Principios añadidos

| Principio | Significa |
| --- | --- |
| **Autenticidad** | Se puede verificar quién es el origen de la información o quién accede |
| **Trazabilidad** | Se puede saber quién hizo qué y cuándo (registros, auditoría) |
| **No repudio** | El autor de una acción no puede negar haberla hecho (firma digital) |

El **Esquema Nacional de Seguridad** (ENS) usa cinco dimensiones: confidencialidad,
integridad, disponibilidad, autenticidad y trazabilidad.

> [!TIP] Para el informe
> Al describir una vulnerabilidad, indica qué principio afecta. Ayuda a valorar su
> impacto ([CVSS](../cvss/)) y a que el cliente entienda qué pierde.

## Resumen

Seguridad de la información es más amplia que la informática. Se protegen
confidencialidad, integridad y disponibilidad, y además autenticidad y trazabilidad.

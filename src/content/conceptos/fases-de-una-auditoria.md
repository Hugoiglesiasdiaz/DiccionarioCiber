---
titulo: Fases de una auditoría de hacking ético
descripcion: "Del pre-engagement al cierre: cómo se organiza una auditoría y qué fases técnicas sigue el pentest (reconocimiento, vulnerabilidades, explotación, post-explotación e informe)."
tipo: concepto
asignaturas: [hacking]
etiquetas: [auditoría, fases, pre-engagement, reporting, informe, PTES, explotación, post-explotación, persistencia]
tema: hacking/introduccion
orden: 9
actualizado: 2026-11-27
---

## Fases del proyecto

| Fase | Qué se hace |
| --- | --- |
| **1. Pre-engagement** (toma de requisitos) | Reunión con el cliente: objetivos, alcance, tipo de auditoría, fechas, contactos y **autorización firmada** ([Acuerdo de auditoría](../acuerdo-de-auditoria/)) |
| **2. Ejecución de las pruebas** | Las fases técnicas de abajo, dentro del alcance y las reglas pactadas |
| **3. Seguimiento** | Comunicación con el cliente durante las pruebas: avisos de hallazgos críticos, incidencias, paradas |
| **4. Reporting** | Informe con los hallazgos, su gravedad ([CVSS](../cvss/)), las pruebas y las recomendaciones |
| **5. Cierre** | Presentación de resultados, *retest* de lo corregido y borrado seguro de los datos del cliente |

## Fases técnicas del pentest

| Fase | Objetivo |
| --- | --- |
| **Recopilación de información** | Conocer el objetivo: primero de forma pasiva ([OSINT](../osint/)), después activa (escaneo de puertos y servicios) |
| **Análisis de vulnerabilidades** | Identificar fallos en lo descubierto: versiones vulnerables, configuraciones débiles |
| **Explotación** | Aprovechar los fallos para obtener acceso |
| **Post-explotación** | Ver qué se puede hacer desde dentro: escalar privilegios, moverse a otros equipos, acceder a datos |
| **Persistencia** | Comprobar si se podría mantener el acceso. En una auditoría se demuestra y se retira al terminar |
| **Informe** | Documentar todo lo anterior |

La metodología **PTES** (*Penetration Testing Execution Standard*) las ordena en siete:
interacción previa, recopilación de información, modelado de amenazas, análisis de
vulnerabilidades, explotación, post-explotación e informe.

## Qué lleva el informe

- **Resumen ejecutivo**: para la dirección, sin tecnicismos: nivel de riesgo y
  prioridades.
- **Alcance y metodología**: qué se probó, cuándo y cómo.
- **Hallazgos**: cada vulnerabilidad con descripción, activo afectado, gravedad, pruebas
  (capturas, PoC) y recomendación.
- **Plan de mitigación** ordenado por prioridad.

> [!WARNING]
> Los hallazgos críticos no esperan al informe final: se comunican en cuanto se
> descubren, por el canal pactado.

## Resumen

Pre-engagement, ejecución, seguimiento, reporting y cierre. Dentro de la ejecución:
recopilar información, analizar vulnerabilidades, explotar, post-explotar y documentar.

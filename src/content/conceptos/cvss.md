---
titulo: CVSS
descripcion: "Cómo se puntúa la gravedad de una vulnerabilidad de 0 a 10 con CVSS: métricas base, vector, rangos de severidad y novedades de la versión 4.0."
tipo: concepto
asignaturas: [hacking]
etiquetas: [CVSS, severidad, puntuación, vector, FIRST, NVD, crítica, vulnerabilidad]
tema: hacking/introduccion
orden: 7
actualizado: 2026-11-27
---

## Concepto

**CVSS** (*Common Vulnerability Scoring System*) es el estándar para puntuar la gravedad
de una vulnerabilidad de **0 a 10**. Lo mantiene el FIRST y lo usan los fabricantes, la
NVD y los informes de auditoría. Sirve para ordenar qué corregir primero con un criterio
común.

## Rangos de severidad

| Puntuación | Severidad |
| --- | --- |
| 0.0 | Ninguna |
| 0.1 – 3.9 | Baja |
| 4.0 – 6.9 | Media |
| 7.0 – 8.9 | Alta |
| 9.0 – 10.0 | **Crítica** |

## Métricas base (CVSS 3.1)

Describen la vulnerabilidad en sí, sin depender del entorno.

**Explotabilidad** (lo fácil que es atacar):

| Métrica | Valores | Pregunta |
| --- | --- | --- |
| **AV** Vector de ataque | Red (N), Adyacente (A), Local (L), Físico (P) | ¿Desde dónde se puede atacar? |
| **AC** Complejidad | Baja (L), Alta (H) | ¿Hacen falta condiciones especiales? |
| **PR** Privilegios requeridos | Ninguno (N), Bajos (L), Altos (H) | ¿Hay que tener ya una cuenta? |
| **UI** Interacción del usuario | Ninguna (N), Requerida (R) | ¿Necesita que la víctima haga algo? |
| **S** Alcance | Sin cambio (U), Cambiado (C) | ¿Afecta a otros componentes además del vulnerable? |

**Impacto** (sobre la [triada CIA](../seguridad-de-la-informacion/)): **C**, **I** y
**A**, cada una Alta (H), Baja (L) o Ninguna (N).

Además existen métricas **temporales** (si hay exploit público o parche) y **de
entorno** (lo importante que es el activo para esa organización), que ajustan la nota
base.

## El vector

La puntuación se acompaña de un **vector** que resume cada métrica, para que cualquiera
pueda comprobarla:

```text
CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H   → 9.8 Crítica
```

Se lee así: atacable por red, sin complejidad, sin cuenta ni interacción del usuario, e
impacto alto en confidencialidad, integridad y disponibilidad. Es el perfil típico de
una ejecución remota de código sin autenticación.

La puntuación se calcula con la calculadora oficial del FIRST o la de la NVD.

## CVSS 4.0

Publicada en 2023. Mantiene la escala de 0 a 10 y cambia algunas cosas:

- Grupos de métricas: **Base**, **Threat** (sustituye a la temporal), **Environmental** y
  **Supplemental** (información extra que no cambia la nota).
- Nueva métrica **AT** (*Attack Requirements*) y desaparece **Scope**: el impacto se
  separa en el sistema vulnerable y los sistemas posteriores.

> [!TIP] En el informe
> Indica siempre la versión de CVSS y el vector completo, no solo el número. Y recuerda
> que CVSS mide gravedad técnica: el riesgo real depende también del valor del activo
> ([Riesgo y vulnerabilidad](../riesgo-y-vulnerabilidad/)).

## Resumen

CVSS puntúa de 0 a 10 (crítica desde 9.0) a partir de cómo se explota (AV, AC, PR, UI,
S) y qué impacto tiene (C, I, A). Se documenta con el vector. La versión 4.0 reorganiza
las métricas.

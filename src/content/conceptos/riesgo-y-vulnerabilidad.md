---
titulo: Riesgo y vulnerabilidad
descripcion: "Qué son activo, amenaza, vulnerabilidad, impacto y riesgo, cómo se relacionan y cómo se identifican y clasifican las vulnerabilidades (CVE, CWE, 0-day)."
tipo: concepto
asignaturas: [hacking, normativa]
etiquetas: [riesgo, vulnerabilidad, activo, impacto, CVE, CWE, zero-day, 0-day, NVD]
tema: hacking/introduccion
orden: 6
actualizado: 2026-11-27
---

## Concepto

| Término | Qué es | Ejemplo |
| --- | --- | --- |
| **Activo** | Lo que tiene valor para la organización | Un servidor web, la base de datos de clientes |
| **Amenaza** | Lo que puede causar daño ([Amenazas](../amenazas/)) | Un atacante en Internet |
| **Vulnerabilidad** | Una debilidad que la amenaza puede aprovechar | Una versión sin parchear del servidor |
| **Impacto** | El daño si la amenaza se materializa | Robo de datos personales, multa, parada del negocio |
| **Riesgo** | La probabilidad de que ocurra combinada con su impacto | Alto: es fácil de explotar y los datos son sensibles |

Una forma simple de verlo: **riesgo = probabilidad × impacto**. Sin vulnerabilidad, la
amenaza no tiene por dónde entrar. Sin activo valioso, el impacto es bajo.

## Cómo se tratan los riesgos

- **Mitigar**: reducirlo (parchear, segmentar la red, formar al personal).
- **Transferir**: pasarlo a otro (un seguro, un proveedor).
- **Evitar**: eliminar la actividad que lo causa.
- **Aceptar**: asumirlo de forma consciente, si cuesta más tratarlo.

## Identificación de vulnerabilidades

| Referencia | Qué es |
| --- | --- |
| **CVE** (*Common Vulnerabilities and Exposures*) | Identificador único de una vulnerabilidad concreta y pública: `CVE-AAAA-NNNNN` |
| **CWE** (*Common Weakness Enumeration*) | Catálogo de **tipos** de debilidad: CWE-79 es XSS, CWE-89 es inyección SQL |
| **NVD** | Base de datos del NIST que añade a cada CVE su puntuación [CVSS](../cvss/) |
| **Zero-day (0-day)** | Vulnerabilidad que aún no conoce el fabricante o no tiene parche |

## Clasificación habitual

- **Por origen**: diseño, implementación (programación) o configuración (contraseñas por
  defecto, servicios innecesarios, permisos excesivos).
- **Por tipo**: inyección, autenticación rota, exposición de datos, control de acceso,
  desbordamiento de memoria… Para aplicaciones web la referencia es el **OWASP Top 10**.
- **Por gravedad**: baja, media, alta o crítica, normalmente con [CVSS](../cvss/).

## Resumen

La amenaza aprovecha la vulnerabilidad para dañar un activo. El riesgo combina la
probabilidad y el impacto. Las vulnerabilidades se identifican con CVE, sus tipos con CWE
y su gravedad con CVSS.

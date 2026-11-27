---
titulo: Amenazas a la seguridad de la información
descripcion: "Qué es una amenaza y cómo se clasifican según MAGERIT: naturales, del entorno, defectos de las aplicaciones y causadas por personas, accidental o deliberadamente."
tipo: concepto
asignaturas: [hacking, incidentes]
etiquetas: [amenaza, threat, MAGERIT, UNE 71504, ingeniería social, activo]
tema: hacking/introduccion
orden: 4
actualizado: 2026-11-27
---

## Concepto

Una **amenaza** (*threat*) es cualquier suceso que puede dañar un sistema o la
información de una organización. La norma **UNE 71504:2008** la define como la causa
potencial de un incidente que puede causar daños.

Una amenaza por sí sola no provoca nada: necesita una
[vulnerabilidad](../riesgo-y-vulnerabilidad/) que aprovechar.

## Tipos según MAGERIT

**MAGERIT** es la metodología española de análisis y gestión de riesgos de los sistemas
de información. Clasifica las amenazas así:

| Tipo | Ejemplos |
| --- | --- |
| **De origen natural** | Terremotos, inundaciones, incendios |
| **Del entorno** (origen industrial) | Cortes de luz, fallos de climatización, contaminación |
| **Defectos de las aplicaciones** | Errores de diseño o de programación: las vulnerabilidades del software |
| **Causadas por personas de forma accidental** | Borrar datos por error, enviar un correo a quien no toca. Aquí entra la ingeniería social: la víctima ayuda al atacante sin darse cuenta |
| **Causadas por personas de forma deliberada** | Ataques: intrusiones, [malware](../tipos-de-malware/), robo, sabotaje |

En hacking ético interesan sobre todo las **tres últimas**, porque son las que se pueden
probar en una auditoría.

## Ingeniería social

Técnicas que engañan a las personas para que revelen información o hagan algo que
beneficia al atacante: *phishing* (correo), *vishing* (llamada), *smishing* (SMS),
suplantación o acceso físico siguiendo a un empleado (*tailgating*). Muchas auditorías las
incluyen, siempre con autorización expresa ([Acuerdo de auditoría](../acuerdo-de-auditoria/)).

## Resumen

Amenaza es lo que puede causar el daño. MAGERIT las divide en naturales, del entorno,
defectos del software y causadas por personas (por error o a propósito).

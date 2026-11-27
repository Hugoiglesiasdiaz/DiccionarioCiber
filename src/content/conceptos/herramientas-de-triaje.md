---
titulo: Herramientas de triaje
descripcion: "Recoger en minutos solo los artefactos más útiles en vez de clonar el disco entero: KAPE, Velociraptor y otras."
tipo: concepto
asignaturas: [forense, incidentes]
etiquetas: [triaje, KAPE, Velociraptor, Redline, respuesta a incidentes, artefactos]
tema: forense/adquisicion
orden: 5
actualizado: 2026-11-27
---

## Concepto

Las **herramientas de triaje** recogen de forma automática los artefactos que más suelen
contener evidencias, sin clonar el disco entero: registro de Windows, logs de eventos,
Prefetch, historial de navegadores, tareas programadas, la MFT, etc.

Se usan sobre todo en **respuesta a incidentes en vivo**, cuando hay muchos equipos que
revisar o no hay tiempo para una copia completa.

| Ventajas | Inconvenientes |
| --- | --- |
| Minutos en vez de horas | **Contaminan más** el sistema: se ejecutan sobre él |
| Se puede lanzar en muchos equipos a la vez | Solo recogen lo que está en su lista |
| Resultados listos para analizar | **No sustituyen** a una imagen completa si el caso va a juicio |

## Herramientas habituales

| Herramienta | Características |
| --- | --- |
| **KAPE** (Kroll) | Recoge artefactos de Windows mediante listas configurables (*targets*) y puede procesarlos al momento (*modules*) |
| **Velociraptor** (libre) | Agente que se instala en muchos equipos y se consulta desde una consola central con un lenguaje propio (VQL) |
| **Redline** (Mandiant) | Recogida y análisis de memoria y artefactos en Windows |
| **Belkasoft Triage** | Triaje rápido de Windows con interfaz gráfica |

Para un tipo de dato concreto también hay herramientas específicas. Por ejemplo,
**MailStore Home** sirve si solo hay que recoger correo electrónico.

> [!TIP]
> Si después puede hacer falta una imagen completa, hazla **antes** del triaje o
> documenta bien lo que ejecutó la herramienta, porque el triaje modifica el sistema.

## Resumen

El triaje sirve para responder rápido a un incidente: recoge solo lo más importante a
costa de alterar más el sistema. Para un caso judicial, lo normal es combinarlo con una
[clonación completa](../clonacion-de-discos/).

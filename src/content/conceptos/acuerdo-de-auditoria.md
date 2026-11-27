---
titulo: Acuerdo de auditoría y reglas de compromiso
descripcion: "Qué debe incluir el contrato que autoriza un pentest: partes, alcance, tipos de prueba, fechas, reglas de compromiso, manejo de la información, entregables y procedimiento de emergencia."
tipo: concepto
asignaturas: [hacking, normativa]
etiquetas: [contrato, autorización, alcance, scope, reglas de compromiso, rules of engagement, RoE, NDA, kill switch]
tema: hacking/introduccion
orden: 10
actualizado: 2026-11-27
---

## Concepto

Antes de una prueba de intrusión se firma un **acuerdo de auditoría** o **autorización
para pruebas de intrusión**. Es lo que hace legal la auditoría
([Delitos informáticos](../delitos-informaticos-codigo-penal/)) y fija qué se puede
hacer y qué no.

## Apartados

| Apartado | Qué recoge |
| --- | --- |
| **Partes** | Cliente y auditor, con un representante autorizado por cada lado |
| **Objetivo** | Para qué se hace la auditoría |
| **Alcance** | Activos **incluidos** (IP, dominios, aplicaciones) y **excluidos** (servicios de terceros, red de invitados, dispositivos personales) |
| **Tipos de prueba** | Externa o interna, caja negra, gris o blanca, web, APIs, red, [ingeniería social](../amenazas/) |
| **Fechas y ventana** | Inicio, fin, horario en que se puede atacar y planificación por fases |
| **Reglas de compromiso** | Cómo se actúa durante las pruebas (ver abajo) |
| **Metodología y herramientas** | OWASP, PTES; Nmap, Burp Suite, Metasploit… |
| **Entregables** | Informe preliminar de críticos, informe final, presentación y *retest* |
| **Manejo de la información** | Clasificación, cifrado, acceso y borrado de los datos del cliente |
| **Responsabilidades** | Qué hace cada parte y límites de responsabilidad |
| **Emergencias** | Contactos y procedimiento de parada |
| **Confidencialidad y uso del informe** | NDA; el informe no se difunde sin permiso |
| **Honorarios, duración y cambios** | Pago, terminación y cómo se modifica el alcance |
| **Firma** | Fecha y firma de ambas partes |

## Reglas de compromiso (*rules of engagement*)

- **Parar ante daños**: si una prueba pone en riesgo un sistema crítico, se detiene de
  inmediato (*kill switch*) y se avisa.
- **Canales seguros**: hallazgos, credenciales e informes solo por canales cifrados y
  acordados, nunca por mensajería personal.
- **Sin exfiltración real**: el acceso a datos se demuestra con una prueba mínima (un
  hash, una captura parcial), sin llevarse los datos.
- **Trazabilidad**: el auditor registra lo que ejecuta y cuándo, para distinguir sus
  pruebas de un ataque real.

## Clasificación de la información

| Nivel | Qué incluye | Cómo se maneja |
| --- | --- | --- |
| **Confidencial** | Credenciales, datos personales, vulnerabilidades críticas | Cifrado en reposo y en tránsito; acceso mínimo |
| **Interna** | Diagramas de red, actas, borradores de informe | Solo en plataformas corporativas autorizadas |
| **Pública** | Información ya publicada por el cliente | Sin restricciones, manteniendo su integridad |

> [!TIP]
> Los equipos y discos del auditor deben ir cifrados, y los accesos se revocan al
> terminar el proyecto.

## Resumen

Sin acuerdo firmado no hay auditoría. Lo esencial: alcance (incluido y excluido), tipos
de prueba, fechas, reglas de compromiso con parada de emergencia, manejo de la
información y entregables.

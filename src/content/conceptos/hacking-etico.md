---
titulo: Hacking ético
descripcion: "Qué es el hacking ético, en qué se diferencia del ciberdelito y quién es quién: sombreros, script kiddies y equipos red, blue y purple."
tipo: concepto
asignaturas: [hacking]
etiquetas: [hacker, white hat, black hat, grey hat, script kiddie, red team, blue team, purple team, pentesting]
tema: hacking/introduccion
orden: 1
actualizado: 2026-11-27
---

## Concepto

Un **hacker** es, en origen, alguien que busca soluciones ingeniosas a un problema
técnico y quiere entender cómo funcionan las cosas por dentro. El término no implica
delito.

El **hacking ético** usa las mismas técnicas que un atacante, pero **con autorización
por escrito** del propietario y con un objetivo defensivo: encontrar vulnerabilidades
antes que los delincuentes, demostrar su impacto y proponer cómo corregirlas.

Lo que separa a un auditor de un delincuente no son las herramientas, sino:

| | Hacking ético | Ciberdelito |
| --- | --- | --- |
| Autorización | Contrato y alcance firmados | Ninguna |
| Objetivo | Mejorar la seguridad del cliente | Beneficio propio, daño o espionaje |
| Resultado | Informe confidencial con recomendaciones | Robo, extorsión, sabotaje |
| Límites | Reglas de compromiso pactadas | Ninguno |

## Tipos de actores

| Actor | Quién es |
| --- | --- |
| **White hat** | Profesional que actúa con permiso: auditor, pentester, investigador |
| **Black hat** | Ataca sin permiso para obtener un beneficio o causar daño |
| **Grey hat** | Entra sin permiso pero sin intención maliciosa, por ejemplo para avisar de un fallo. Sigue siendo delito |
| **Script kiddie** | Usa herramientas o exploits ajenos sin entender cómo funcionan |
| **Hacktivista** | Ataca por motivos políticos o sociales |
| **Insider** | Empleado o colaborador que abusa de su acceso legítimo |

> [!WARNING] Avisar de un fallo no te protege
> Descubrir y reportar una vulnerabilidad en un sistema ajeno sin permiso puede acabar
> en denuncia, aunque la intención fuera buena. Para eso existen los programas de *bug
> bounty* y las políticas de divulgación responsable. Ver
> [Delitos informáticos en el Código Penal](../delitos-informaticos-codigo-penal/).

## Equipos de seguridad por colores

| Equipo | Papel |
| --- | --- |
| **Red team** | Ataca: simula a un adversario real para probar las defensas |
| **Blue team** | Defiende: monitoriza, detecta y responde (SOC, respuesta a incidentes) |
| **Purple team** | Une ambos: el blue team mejora con lo que aprende del red team |
| **Yellow team** | Construye: desarrolladores y arquitectos |
| **Orange / green** | Mezclan a los constructores con atacantes o defensores para que desarrollen pensando en seguridad |

Esta clasificación viene de la **pirámide BAD** (*Build, Attack, Defend*).

## Qué base hace falta

El hacking ético se apoya en conocimientos generales: redes y protocolos (TCP/IP, DNS,
HTTP, SSH), administración de Windows y Linux, bases de datos, programación y
*scripting* (Python, Bash, PowerShell) y criptografía. Ver
[Chuleta de comandos Linux](../comandos-linux/).

## Resumen

Hacking ético es atacar **con permiso** para defender. Sin autorización, las mismas
acciones son delito, aunque la intención sea buena.

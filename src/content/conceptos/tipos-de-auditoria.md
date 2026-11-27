---
titulo: Tipos de auditoría de hacking ético
descripcion: "Cómo se clasifican las auditorías según su enfoque (análisis de vulnerabilidades, pentest, red team…), su origen (externa o interna) y la información que se da (caja negra, gris o blanca)."
tipo: concepto
asignaturas: [hacking]
etiquetas: [auditoría, pentest, red team, caja negra, caja gris, caja blanca, black box, white box, grey box]
tema: hacking/introduccion
orden: 8
actualizado: 2026-11-27
---

## Según el enfoque

| Tipo | Qué busca |
| --- | --- |
| **Análisis de vulnerabilidades** | Detectar el mayor número de fallos, normalmente con escáneres, **sin explotarlos** |
| **Test de intrusión** (*pentest*) | Explotar los fallos para demostrar hasta dónde llega un atacante y qué impacto tiene |
| **Red team** | Simular un ataque real durante semanas, con un objetivo concreto, y comprobar si el blue team lo detecta |
| **Auditoría web o de APIs** | Fallos de aplicaciones, normalmente siguiendo OWASP |
| **Auditoría wifi** | Seguridad de las redes inalámbricas |
| **Ingeniería social** | Comprobar si el personal cae en *phishing*, llamadas o accesos físicos |
| **Revisión de código** | Buscar fallos en el código fuente |

## Según el origen

| Tipo | Desde dónde |
| --- | --- |
| **Externa** | Desde Internet, como un atacante de fuera: web, VPN, correo, servicios expuestos |
| **Interna** | Desde dentro de la red, como un empleado, un dispositivo infectado o un intruso que ya entró |

## Según la información proporcionada

| Tipo | Qué sabe el auditor | Ventajas | Inconvenientes |
| --- | --- | --- | --- |
| **Caja negra** (*black box*) | Nada, solo el objetivo (un dominio, un rango de IP) | Es lo más parecido a un atacante externo real | Más lenta; puede dejar zonas sin revisar |
| **Caja gris** (*grey box*) | Información parcial: una cuenta de usuario, la arquitectura | Equilibrio entre realismo y cobertura | — |
| **Caja blanca** (*white box*) | Todo: código, diagramas, credenciales | Cobertura máxima y más rápida | Menos realista |

> [!NOTE]
> Los criterios se combinan: por ejemplo, un pentest **externo** de **caja negra** sobre
> la web, y otro **interno** de **caja gris** con una cuenta de empleado.

## Resumen

Por enfoque (análisis de vulnerabilidades, pentest, red team…), por origen (externa o
interna) y por información (caja negra, gris o blanca). El tipo se pacta en el
[acuerdo de auditoría](../acuerdo-de-auditoria/).

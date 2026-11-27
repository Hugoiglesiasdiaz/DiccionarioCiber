---
titulo: Análisis forense informático
descripcion: Qué es la informática forense, para qué se usa (juicios e incidentes) y qué preguntas intenta responder.
tipo: concepto
asignaturas: [forense, incidentes]
etiquetas: [dfir, locard, evidencia digital, pericial, fundamentos]
tema: forense/introduccion
orden: 1
actualizado: 2026-11-27
---

## Concepto

El **análisis forense informático** consiste en aplicar métodos científicos y técnicos
para **identificar, preservar, analizar y presentar** evidencias digitales de forma que
sean aceptables en un procedimiento legal.

La definición clásica, de Rodney McKemmish (1999), recoge esos cuatro verbos. Lo
importante es el final: no basta con encontrar algo, hay que poder **demostrar** cómo se
encontró y que nadie lo ha alterado.

Se recurre a él en dos situaciones:

- **Ha habido un incidente de seguridad**: un servidor comprometido, un robo de datos, un
  ransomware.
- **Se investiga un delito en el que interviene la tecnología**, aunque no sea un delito
  informático: un móvil que confirma o desmiente una coartada, unos correos en un caso de
  fraude.

## Principio de intercambio de Locard

Edmond Locard, criminólogo francés que fundó el primer laboratorio de policía científica
(Lyon, 1910), formuló la idea en la que se basa toda la ciencia forense:

> [!NOTE] Todo contacto deja un rastro
> Cuando dos elementos entran en contacto, hay un intercambio entre ellos.

En informática el «contacto» es cualquier interacción con un sistema: un inicio de
sesión deja eventos, ejecutar un programa deja Prefetch y claves de registro, conectar
un USB deja su número de serie. Y también vale al revés: **el propio investigador deja
rastro** al tocar un equipo encendido, por eso hay que documentarlo todo.

## Dos enfoques: pericial y DFIR

| | Enfoque pericial | Respuesta ante incidentes |
| --- | --- | --- |
| Objetivo | Aportar una prueba válida en un juicio | Entender el ataque para contenerlo y recuperarse |
| Prioridad | Cadena de custodia, admisibilidad | Rapidez, alcance del daño |
| Resultado | Informe pericial (dictamen) | Informe técnico y lecciones aprendidas |
| Quién | Perito judicial o de parte | Equipo de respuesta (CSIRT, SOC) |

En la práctica se mezclan, y por eso se habla de **DFIR** (*Digital Forensics & Incident
Response*). Un incidente puede acabar en juicio, así que conviene trabajar desde el
principio como si fuera a haberlo.

> [!TIP]
> Responder al incidente (contener, erradicar, recuperar) es tarea de la asignatura de
> Incidentes. El forense se centra en **obtener y analizar las evidencias** sin
> destruirlas.

## Preguntas que intenta responder

| En un incidente de seguridad | En la investigación de un delito |
| --- | --- |
| ¿Quién ha atacado? | ¿Hay información relevante en el dispositivo? |
| ¿Cuándo empezó y cuándo se detectó? | ¿Dónde estaba la persona en un momento dado? |
| ¿Cómo entró? ¿Qué vulnerabilidad usó? | ¿Con quién habló y qué dijo? |
| ¿Qué hizo dentro? ¿Qué se llevó? | ¿Qué archivos creó, descargó o abrió? |
| ¿Sigue dentro? | ¿Qué programas y periféricos usó? |

## Dónde puede haber evidencias

Prácticamente en cualquier sistema con datos:

- **Equipos y dispositivos:** PC, móviles, discos, pendrives, impresoras, cámaras, IoT.
- **Red:** routers, cortafuegos, puntos de acceso.
- **Entornos industriales (OT):** SCADA, HMI, PLC, sensores.
- **Nube y virtualización:** máquinas virtuales, almacenamiento en la nube.
- **Software y datos:** sistema operativo, aplicaciones, SIEM, bases de datos, documentos,
  multimedia.

## Resumen

Informática forense = identificar, preservar, analizar y presentar evidencias digitales
de forma **legalmente aceptable**. Se basa en que todo contacto deja rastro (Locard),
incluido el del propio investigador. Sirve tanto para juicios (pericial) como para
entender incidentes (DFIR). Las fases se explican en
[Fases del análisis forense](../fases-analisis-forense/).

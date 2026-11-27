---
titulo: Preparación de la intervención
descripcion: "Lo que hay que tener claro antes de tocar una evidencia: tipo de incidente, autorización, entrada y registro, inventario, kit y notas."
tipo: concepto
asignaturas: [forense, normativa]
etiquetas: [autorización, LECrim, art. 588 sexies, entrada y registro, inventario, kit forense, notas]
tema: forense/adquisicion
orden: 1
actualizado: 2026-11-27
---

## Concepto

La adquisición empieza **antes** de llegar al equipo. Lo que se prepare (o se olvide)
en esta fase decide si las evidencias servirán después.

## Tipo de incidente

El tipo de caso cambia qué buscar y cómo:

| Caso | Qué cambia |
| --- | --- |
| Competencia desleal | La empresa afectada suele colaborar. El foco está en el disco: documentos, correos, USB |
| Malware | Probablemente haya que analizar la **memoria RAM** antes de apagar |
| Estafa | El investigado no colaborará: claves, cuentas y cifrado serán un problema |

## Colaboración

- ¿Quién participa y tiene los conocimientos necesarios? Si no, conviene llamar a un
  experto (ver [DEFR y DES](../defr-y-des/)).
- Lista de personas a las que mantener informadas.
- Pedir las **contraseñas** necesarias, por ejemplo de volúmenes cifrados.

## Autorización

Siempre **por escrito** y con su **alcance** claro:

- **De la empresa:** se trabaja con información confidencial y la intervención puede
  dejar servicios sin funcionar.
- **Judicial:** para que la prueba sea válida. Debe decir si se puede acceder al
  contenido del dispositivo, a volúmenes cifrados o a la nube asociada.

En el proceso penal, la LECrim lo concreta:

| Artículo | Idea |
| --- | --- |
| 588 sexies a.2 | **Incautar** un dispositivo durante un registro no autoriza a **acceder a su contenido**: eso necesita autorización del juez |
| 588 sexies c.1 | La resolución fija los términos y el alcance del registro, si se pueden hacer copias y cómo garantizar la **integridad** de los datos |
| 588 sexies c.3 | Si los datos están en **otro sistema** accesible desde el primero (la nube, un servidor), se puede ampliar el registro con autorización. Si es urgente, la policía o el fiscal pueden ampliarlo e informar al juez de inmediato |

Saltarse el alcance de la autorización puede convertir la evidencia en
[prueba ilícita](../prueba-ilicita/).

## Entrada y registro

- Se hace con el **juez** o el **letrado de la Administración de Justicia** (antiguo
  secretario judicial). Cualquier cosa que haga falta se le pide a él.
- Es una situación tensa: hay que respetar al máximo la intimidad y el honor del
  titular.
- Al terminar se levanta un **acta**: lugar, fecha, hora de inicio y fin, quién estaba,
  cómo se hizo, qué se encontró e incidencias.

## Qué buscar

No solo ordenadores: móviles, discos y pendrives, cámaras, routers, impresoras y
escáneres, dispositivos IoT, máquinas virtuales, la nube o equipos industriales (OT).
Las tarjetas de memoria y los pendrives se esconden con facilidad.

> [!NOTE] Perros detectores de electrónica
> Algunas policías usan perros entrenados para encontrar memorias USB y tarjetas SD
> escondidas. Detectan compuestos químicos que se usan al fabricar los chips.

## Inventario

**Etiquetar, fotografiar e inventariar** todo, anotando:

- Marca, modelo, número de serie y tipo de conexión.
- Quién es el responsable del dispositivo y quién lo usa.
- Cualquier otro detalle relevante: si estaba encendido, qué se veía en pantalla, qué
  tenía conectado.

## Kit de herramientas

Preparado y probado **antes** de salir:

- Discos de destino borrados, pendrives y discos de arranque con distintas
  herramientas forenses.
- [Clonadora y bloqueadores de escritura](../clonacion-de-discos/), bases para
  conectar discos y destornilladores.
- Bolsas de evidencia, precintos numerados, etiquetas y **bolsas Faraday** para
  aislar los móviles de la red.

## Notas

Hay que anotar **cada detalle** con fecha y hora. Existen aplicaciones pensadas para
forense, como Monolith Notes (gratuita) o Forensic Notes (de pago), con plantillas y
gestión de casos. Un cuaderno en papel también vale si está fechado y firmado.

## Resumen

Antes de adquirir: entender el caso, tener la autorización por escrito y saber hasta
dónde llega, llevar el kit preparado, inventariar y fotografiar todo y anotar cada paso.
Después vienen el [orden de volatilidad](../orden-de-volatilidad/) y la
[cadena de custodia](../cadena-de-custodia/).

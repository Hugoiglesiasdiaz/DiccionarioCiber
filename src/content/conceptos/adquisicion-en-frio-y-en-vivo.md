---
titulo: Adquisición en frío y en vivo
descripcion: "Las dos formas de adquirir un equipo: apagado (dead) o encendido (live), sus ventajas, sus riesgos y cómo decidir."
tipo: concepto
asignaturas: [forense, incidentes]
etiquetas: [dead, live, adquisición, apagado, volátil, imagen difuminada, primer interviniente]
tema: forense/adquisicion
orden: 3
actualizado: 2026-11-27
---

## Concepto

Ante un equipo hay dos formas de adquirir sus datos:

- **En frío** (*dead* o estática): se apaga el equipo y se clona el disco.
- **En vivo** (*live*): se recogen los datos con el equipo encendido.

## Comparación

| | En frío | En vivo |
| --- | --- | --- |
| Datos volátiles (RAM, red, procesos) | Se pierden | Se recogen |
| Copia del disco | Exacta y repetible | Puede ser «difuminada» |
| Alteración del sistema | Mínima | Inevitable: cada comando cambia algo |
| Discos cifrados | Problema si no hay clave | Se pueden leer si están desbloqueados |
| Medidas antiforense | No se activan si se corta la corriente | Pueden activarse |
| Complejidad | Baja | Alta: hay que documentarlo todo |

## En frío

- Es el modo recomendado en muchos casos.
- Se apaga **tirando del cable**, sin apagado ordenado. Al apagar de forma normal, el
  sistema escribe en el disco (logs, temporales) y puede ejecutar scripts de apagado
  manipulados. En un portátil hay que quitar también la batería, si se puede.
- El disco se clona después con un bloqueador de escritura
  ([Clonación de discos](../clonacion-de-discos/)).

> [!WARNING] El problema del cifrado
> Si el disco está cifrado y el equipo se apaga, la copia será ilegible sin la clave.
> Antes de apagar, comprueba si hay cifrado ([Discos cifrados](../discos-cifrados/)).

## En vivo

- Permite recoger lo volátil: [memoria RAM](../volcado-de-memoria/), conexiones,
  procesos y usuarios conectados.
- Lo recogido se guarda en un **disco externo**, nunca en el equipo investigado.
- **Imagen difuminada** (*smeared*): copiar un disco o la RAM lleva tiempo y el sistema
  sigue cambiando mientras tanto. El principio y el final de la copia no corresponden al
  mismo momento, así que metadatos y datos pueden no coincidir.
- Cada herramienta que se ejecuta deja huella. Hay que usar herramientas ligeras, desde
  un soporte de solo lectura, y anotar cada comando con su hora.

## Cómo decidir: el dilema del primer interviniente

No hay una respuesta única. Algunas preguntas que ayudan:

| Pregunta | Si la respuesta es sí… |
| --- | --- |
| ¿Hay sospecha de malware que solo vive en memoria? | Volcar la RAM antes de apagar |
| ¿El disco está cifrado y desbloqueado? | Adquirir en vivo (RAM y volumen descifrado) |
| ¿Es un servidor crítico que no se puede parar? | En vivo o [triaje](../herramientas-de-triaje/) |
| ¿Puede haber un *kill switch* o borrado en curso? | Cortar la corriente cuanto antes |
| ¿Equipo apagado y sin cifrado? | No encenderlo: adquirir en frío |

> [!TIP]
> Una estrategia habitual combina las dos: primero se recoge en vivo lo volátil y
> después se apaga tirando del cable y se clona el disco en frío.

## Resumen

En frío: copia exacta y repetible, pero sin datos volátiles y con el problema del
cifrado. En vivo: recoge lo volátil, pero altera el sistema, da copias difuminadas y
exige documentarlo todo. Se decide caso por caso siguiendo el
[orden de volatilidad](../orden-de-volatilidad/).

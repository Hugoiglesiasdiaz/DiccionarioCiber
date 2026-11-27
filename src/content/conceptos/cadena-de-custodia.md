---
titulo: Cadena de custodia
descripcion: Cómo documentar una evidencia desde que se recoge hasta el juicio, qué dice la jurisprudencia y cuándo se considera rota.
tipo: concepto
asignaturas: [forense, normativa]
etiquetas: [legal, evidencias, hash, documentación, mismidad, jurisprudencia, precintos]
tema: forense/adquisicion
orden: 11
actualizado: 2026-11-27
---

## Concepto

La **cadena de custodia** es el registro de todo lo que le ocurre a una evidencia:
quién la recogió, cuándo, dónde, quién la tuvo después y qué se hizo con ella. Sirve
para demostrar que la evidencia que llega al juicio es **la misma** que se recogió y que
**no ha sido alterada**.

En España no está definida en ninguna ley. Es un término que la jurisprudencia tomó de
EE. UU.:

- **Principio de mismidad** (STS 1190/2009): hay que tener la seguridad de que lo que
  se recoge, se traslada y se analiza es lo mismo en todo momento. La cadena de custodia
  es la forma de garantizarlo.
- **STS 587/2014**: la define como un sistema formal de garantía que deja constancia de
  las actuaciones de cada persona que entra en contacto con la evidencia.

Se aplica igual a evidencias físicas y digitales.

## Qué debe registrar

Para cada evidencia y cada vez que cambia de manos:

| | Qué anotar |
| --- | --- |
| **Qué** | Descripción, marca, modelo, número de serie, identificador asignado |
| **Quién** | Quién entrega y quién recibe, con firma |
| **Cuándo** | Fecha y hora, indicando la zona horaria |
| **Dónde** | Lugar de recogida y de almacenamiento |
| **Cómo** | Procedimiento: herramienta, versión, parámetros. Envío: número de seguimiento |
| **Integridad** | Hash SHA-256 de la evidencia o de su imagen y número de precinto |

## Precintos

- Las evidencias físicas se guardan en bolsas con **precinto numerado**, firmado o
  sellado.
- **Cada vez que se abre** una evidencia para trabajar con ella, se registra y se
  vuelve a precintar en una **bolsa nueva**, anotando el número nuevo.
- Un precinto mal puesto deja la evidencia en duda. Por ejemplo, precintar la torre de
  un ordenador pero dejar sus **puertos USB libres** permite conectar algo sin abrirlo.

## ¿Cuándo se considera rota?

Romper la cadena **no anula la prueba de forma automática**:

| Criterio | Jurisprudencia |
| --- | --- |
| Para considerarla rota hay que demostrar una **manipulación efectiva** | STS 629/2011 |
| Su rotura no implica que la prueba sea ilícita ni que se excluya: puede solo **restarle fiabilidad** | STS 339/2013, STS 120/2018 |
| Tampoco supone por sí sola vulnerar derechos fundamentales | STS 1349/2009 |

Casos en los que los tribunales **no** la han considerado rota:

- Irregularidades en los protocolos.
- Retrasos en la entrega o en el análisis.
- Falta de documentación, si quien intervino lo explica como testigo.
- Errores u omisiones en los formularios.
- Fallos en la identificación de lo intervenido o en el lugar de depósito.

> [!WARNING]
> Que los tribunales sean flexibles no es excusa. Cada fallo es un argumento para el
> perito contrario y depende del criterio del juez. Hay que hacerlo lo mejor posible.
> Ver también [Prueba ilícita](../prueba-ilicita/).

## Buenas prácticas

- Fotografiar el equipo y su entorno antes de tocar nada.
- Trabajar siempre sobre **copias** verificadas por hash y guardar el original.
- Usar bloqueadores de escritura al adquirir discos.
- Guardar las evidencias en un lugar con acceso restringido y registrado, sin humedad
  ni temperaturas extremas.

> [!NOTE]
> Un hash solo demuestra integridad si se calculó **en el momento de la adquisición** y
> quedó documentado. Y no sustituye al registro de personas, fechas y traspasos
> ([Funciones hash](../funciones-hash/)).

## Resumen

Mismidad: demostrar que la evidencia es la misma de principio a fin. Documentar cada
acción y cada traspaso, precintar y verificar con hashes. Una cadena con fallos no anula
la prueba por sí sola, pero le resta fiabilidad. Ejemplo práctico:
[Clonación forense de un pendrive](../../casos/clonacion-forense-pendrive/).

---
titulo: Cadena de custodia
descripcion: Cómo documentar una evidencia desde que se recoge hasta que se presenta para que conserve su validez.
tipo: concepto
asignaturas: [forense, normativa]
etiquetas: [legal, evidencias, hash, documentación]
tema: forense/adquisicion
orden: 2
actualizado: 2026-11-15
---

## Concepto

La **cadena de custodia** es el registro documentado de todo lo que le ocurre a una
evidencia: quién la recogió, cuándo, dónde, quién la ha tenido después y qué se ha hecho
con ella. Su objetivo es demostrar que la evidencia que se presenta es **la misma** que se
recogió y que **no ha sido alterada**.

Si la cadena se rompe (un hueco sin documentar, un hash que no coincide), la evidencia
puede perder valor en un procedimiento judicial o disciplinario.

## Qué debe registrar

Para cada evidencia y cada vez que cambia de manos:

- **Qué:** descripción, marca, modelo, número de serie, identificador asignado.
- **Quién:** persona que la entrega y persona que la recibe, con firma.
- **Cuándo:** fecha y hora (con zona horaria).
- **Dónde:** lugar de recogida y de almacenamiento.
- **Cómo:** procedimiento usado (herramienta, versión, parámetros).
- **Integridad:** hash (SHA-256) de la evidencia o de su imagen.

## Buenas prácticas

- Fotografiar el equipo y su entorno antes de tocar nada.
- Precintar y etiquetar la evidencia física en bolsas antiestáticas numeradas.
- Trabajar siempre sobre **copias** verificadas por hash; el original se guarda.
- Usar bloqueadores de escritura al adquirir discos.
- Mantener un registro de acceso al lugar donde se almacena la evidencia.

> [!WARNING]
> Un hash solo demuestra integridad si se calculó **en el momento de la adquisición** y
> quedó documentado. Calcularlo después no prueba nada sobre lo ocurrido antes.

## Resumen

Documentar cada paso y cada traspaso, verificar la integridad con hashes y no trabajar
nunca sobre el original. Normas de referencia: **ISO/IEC 27037** (identificación,
recogida, adquisición y preservación de evidencias digitales).

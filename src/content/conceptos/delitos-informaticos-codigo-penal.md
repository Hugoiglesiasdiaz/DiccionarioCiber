---
titulo: Delitos informáticos en el Código Penal
descripcion: "Qué artículos del Código Penal español castigan el acceso no autorizado, la interceptación y las herramientas de ataque, y por qué una auditoría necesita autorización escrita."
tipo: concepto
asignaturas: [hacking, normativa]
etiquetas: [Código Penal, 197 bis, 197 ter, "264", acceso ilícito, autorización, legislación]
tema: hacking/introduccion
orden: 2
actualizado: 2026-11-27
---

## Concepto

En España, el **Código Penal** castiga varias conductas que coinciden con lo que hace un
auditor de seguridad. La única diferencia legal entre una prueba de intrusión y un delito
es la **autorización** del propietario de los sistemas.

## Artículos principales

| Artículo | Qué castiga | Pena (resumida) |
| --- | --- | --- |
| **197 bis.1** | Acceder, o facilitar el acceso, a un sistema de información **vulnerando sus medidas de seguridad** y sin autorización, o quedarse dentro contra la voluntad del titular | Prisión de 6 meses a 2 años |
| **197 bis.2** | **Interceptar** transmisiones de datos no públicas, incluidas las emisiones electromagnéticas | Prisión de 3 meses a 2 años o multa |
| **197 ter** | Producir, adquirir, importar o facilitar **programas o contraseñas** pensados para cometer los delitos anteriores | Prisión de 6 meses a 2 años o multa |
| **264** | **Dañar**, borrar, alterar o hacer inaccesibles datos o programas ajenos | Prisión de 6 meses a 3 años |
| **264 bis** | **Obstaculizar o interrumpir** el funcionamiento de un sistema (por ejemplo, una denegación de servicio) | Prisión de 6 meses a 3 años |

Estos artículos se incorporaron con la reforma del Código Penal de 2015.

## Qué implica para una auditoría

- Antes de empezar debe existir un **contrato o autorización escrita** que fije el
  propósito, el alcance y las fechas ([Acuerdo de auditoría](../acuerdo-de-auditoria/)).
- Solo se prueban los activos incluidos en el alcance. Un servidor de un tercero (la nube
  del proveedor, el hosting) necesita también el permiso de ese tercero.
- Encontrar un fallo por casualidad en un sistema ajeno y explotarlo para demostrarlo
  sigue siendo acceso ilícito. Lo correcto es notificarlo por los canales del titular
  (programas de *bug bounty*, fichero `security.txt`).

> [!WARNING]
> Tener herramientas de hacking no es delito por sí mismo, pero el 197 ter castiga
> crearlas o facilitarlas **con la intención** de cometer los delitos anteriores.

## Resumen

Acceso sin permiso (197 bis.1), interceptación (197 bis.2), herramientas para delinquir
(197 ter), daños (264) e interrupción de servicios (264 bis). Con autorización escrita y
dentro del alcance, es una auditoría. Sin ella, es delito.

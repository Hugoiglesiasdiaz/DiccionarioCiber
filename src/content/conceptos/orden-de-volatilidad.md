---
titulo: Orden de volatilidad
descripcion: Qué evidencias recoger primero y por qué, según las recomendaciones de la RFC 3227.
tipo: concepto
asignaturas: [forense, incidentes]
etiquetas: [rfc3227, adquisición, evidencias]
tema: forense/adquisicion
orden: 1
actualizado: 2026-11-21
---

## Concepto

Las evidencias digitales no duran lo mismo: algunas desaparecen en milisegundos y otras
se conservan años. El **orden de volatilidad** indica que hay que recoger primero las
más efímeras, porque cualquier acción (incluido apagar el equipo) las destruye.

La referencia clásica es la **RFC 3227** (*Guidelines for Evidence Collection and
Archiving*), que propone este orden aproximado.

## De más a menos volátil

| Orden | Evidencia | Por qué se pierde |
| --- | --- | --- |
| 1 | Registros y caché de la CPU | Cambian constantemente. |
| 2 | Tabla de rutas, caché ARP, tabla de procesos, estadísticas del kernel, **memoria RAM** | Se pierden al apagar y cambian con el uso. |
| 3 | Sistemas de ficheros temporales | Se vacían al reiniciar. |
| 4 | Disco | Persistente, pero el uso puede sobrescribir datos borrados. |
| 5 | Logs remotos y datos de monitorización | Dependen de la rotación de logs. |
| 6 | Configuración física y topología de red | Cambia poco. |
| 7 | Medios de archivo (copias de seguridad, cintas) | Los más estables. |

## En la práctica

- Si el equipo está **encendido**, no lo apagues sin más: primero adquiere la RAM
  (con herramientas como WinPmem, DumpIt o LiME) y la información de red y procesos.
- Cada herramienta que ejecutas en el equipo **modifica** su memoria. Usa herramientas
  ligeras desde un medio externo y documenta todo lo que haces.
- Después, adquiere el disco con una copia bit a bit y calcula su hash.

> [!TIP]
> Regla para recordarlo: *"de lo que vive menos a lo que vive más"*. Si dudas entre dos
> evidencias, coge primero la que desaparecería antes.

## Resumen

Recoger en orden inverso a la duración de la evidencia, documentando cada paso y
minimizando los cambios en el sistema. Relacionado: [Cadena de custodia](../cadena-de-custodia/)
y [Volatility 3](../volatility/) para analizar la RAM adquirida.

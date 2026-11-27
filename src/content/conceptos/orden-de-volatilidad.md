---
titulo: Orden de volatilidad
descripcion: Qué evidencias recoger primero y por qué, qué evitar durante la recogida y los pasos que propone la RFC 3227.
tipo: concepto
asignaturas: [forense, incidentes]
etiquetas: [rfc3227, adquisición, evidencias, kill switch, recolección]
tema: forense/adquisicion
orden: 2
actualizado: 2026-11-27
---

## Concepto

Las evidencias digitales no duran lo mismo: algunas desaparecen en milisegundos y otras
se conservan años. El **orden de volatilidad** dice que hay que recoger primero las más
efímeras, porque cualquier acción, incluido apagar el equipo, las destruye.

La referencia es la [RFC 3227](../rfc-3227/), que propone un orden **de ejemplo**: se
adapta a cada caso.

## De más a menos volátil

| Orden | Evidencia | Por qué se pierde |
| --- | --- | --- |
| 1 | Registros y caché de la CPU | Cambian constantemente |
| 2 | Tabla de rutas, caché ARP, tabla de procesos, estadísticas del kernel | Cambian con el uso y se pierden al apagar |
| 3 | Memoria RAM | Se pierde al apagar y cambia mientras el equipo funciona |
| 4 | Sistemas de ficheros temporales | Se vacían al reiniciar |
| 5 | Disco | Persistente, pero el uso sobrescribe los datos borrados |
| 6 | Logs remotos y monitorización | Dependen de la rotación de logs |
| 7 | Configuración física y topología de red | Cambian poco |
| 8 | Medios de archivo: copias de seguridad, cintas | Los más estables |

> [!NOTE]
> «Registros» son los del **procesador**, no el Registro de Windows ni los logs. La RFC
> es de 2002 y no incluye la **nube**, que puede ser muy volátil: una instancia o un log
> puede desaparecer en cuanto alguien lo elimina.

## Qué evitar

- **Apagar o reiniciar antes de terminar la recogida.** Además de perder lo volátil, el
  atacante puede haber modificado los scripts de arranque o apagado para borrar rastros.
- **Usar los programas del propio sistema.** Pueden estar alterados. Hay que llevar los
  propios en un soporte de solo lectura, enlazados estáticamente.
- **Usar comandos que cambian fechas de acceso**, como `tar` o `xcopy`.
- **Desconectar la red sin pensarlo.** Algún malware detecta la desconexión y destruye
  evidencias.

> [!WARNING] Kill switch / *deadman switch*
> Un **kill switch** es un mecanismo que borra o cifra datos cuando se cumple una
> condición: perder la red, desconectar un USB concreto o dejar de recibir una señal
> periódica. Antes de desconectar o apagar, valora si puede existir uno.

## Pasos de la recogida

1. **Dónde está la evidencia:** qué sistemas están implicados y de cuáles hay que
   recoger. Ante la duda, recoger de más.
2. **Orden de volatilidad** para cada sistema.
3. **Eliminar los agentes externos de cambio**, sin olvidar el aviso anterior sobre la
   red.
4. **Recoger con herramientas especializadas**, siguiendo el orden.
5. **Anotar el desfase del reloj** del sistema respecto a una hora de referencia (UTC).
6. **Documentar** cada paso: quién estaba presente, qué hizo y qué se observó.
7. **Calcular hashes** de lo recogido y, si se puede, firmarlo
   ([Funciones hash](../funciones-hash/)).

## Ejemplo

Un servidor encendido con una posible intrusión:

1. Fotografiar la pantalla y anotar la hora del sistema frente a la hora de referencia.
2. [Volcar la RAM](../volcado-de-memoria/) desde un USB propio.
3. Guardar las conexiones de red, los procesos y los usuarios conectados.
4. Valorar si se apaga o se adquiere el disco en vivo
   ([Adquisición en frío y en vivo](../adquisicion-en-frio-y-en-vivo/)).
5. [Clonar el disco](../clonacion-de-discos/) y calcular su hash.

## Resumen

De lo que vive menos a lo que vive más: CPU → red y procesos → RAM → temporales →
disco → logs remotos → topología → copias de seguridad. Sin apagar antes de tiempo, con
herramientas propias y documentando cada paso.

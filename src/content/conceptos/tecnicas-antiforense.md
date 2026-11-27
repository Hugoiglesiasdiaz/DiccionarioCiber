---
titulo: Técnicas antiforense
descripcion: "Cómo se intenta impedir un análisis forense (borrado seguro, alteración de metadatos, cifrado, ocultación, pruebas falsas) y qué rastro deja cada técnica."
tipo: concepto
asignaturas: [forense]
extras: [comandos, linux, windows]
etiquetas: [antiforense, borrado seguro, shred, SDelete, cipher, timestomping, esteganografía, deepfake]
tema: forense/adquisicion
orden: 12
actualizado: 2026-11-27
---

## Concepto

Las **técnicas antiforense** buscan destruir, ocultar o falsear evidencias para que un
análisis no encuentre nada o llegue a conclusiones equivocadas. Conocerlas sirve para
reconocer sus huellas, porque casi todas dejan alguna.

| Tipo | Qué hace | Ejemplos |
| --- | --- | --- |
| Borrado y destrucción | Eliminar los datos sin posibilidad de recuperarlos | Borrado seguro, desmagnetizar, destrucción física |
| Alteración de metadatos | Cambiar fechas y atributos para engañar a la línea de tiempo | *Timestomping* |
| Cifrado | Hacer ilegibles los datos | [Discos cifrados](../discos-cifrados/), contenedores |
| Ocultación | Esconder datos donde nadie mire | Esteganografía, flujos alternativos NTFS, particiones ocultas |
| Otras | Despistar o fabricar pruebas | Ocultar la IP (VPN, Tor), pruebas falsas, *deepfakes* |

## Borrado seguro

Sobrescribe el contenido antes de borrarlo para que no se pueda recuperar.

```bash
# Linux: sobrescribir 3 veces, pasada final con ceros y borrar el fichero
shred -n 3 -z -u fichero.txt
```

```bat
:: Windows: SDelete (Sysinternals)
sdelete -p 3 fichero.txt
sdelete -z C:

:: Windows: sobrescribir el espacio libre con cipher, incluido en el sistema
cipher /w:C:\
```

Herramientas de terceros como **Eraser** (libre) o **BCWipe** (comercial) también
limpian entradas de la MFT, el *slack space* y otros restos de NTFS.

> [!NOTE] Lo que deja el borrado seguro
> Aunque el contenido desaparezca, suelen quedar rastros: la ejecución del programa en
> Prefetch o en el registro, nombres de fichero en la MFT o en el `$UsnJrnl`, y un
> espacio libre lleno de ceros donde lo normal serían restos. Un borrado demasiado
> limpio también es un indicio.

## Destrucción física

- **Desmagnetizadores** (*degaussers*): borran los discos magnéticos con un campo
  magnético potente. **No sirven con SSD ni memorias flash.**
- **Destructoras** que perforan, doblan o trituran el disco.
- Medios manuales: algunos buques militares llevan martillos y hachas para destruir
  material clasificado si hace falta.

## Alteración de metadatos (timestomping)

Cambiar las fechas de creación, modificación o acceso de un fichero para que no encaje
en la línea de tiempo del incidente. En NTFS se puede detectar comparando los atributos
`$STANDARD_INFORMATION`, fáciles de cambiar, con `$FILE_NAME`, más difíciles, y
buscando fechas con fracciones de segundo a cero.

## Ocultación

- **Esteganografía:** datos escondidos dentro de imágenes, audio o vídeo.
- **Flujos alternativos de NTFS** (ADS): contenido «pegado» a un fichero que no se ve en
  el explorador.
- Particiones ocultas, *slack space* o extensiones de fichero cambiadas.

## Pruebas falsas

Hay casos en que se aportan **pruebas fabricadas**: en 2025 un tribunal de California
desestimó una demanda porque parte de las pruebas eran *deepfakes*. También se han
detectado **informes periciales falsificados**. El perito debe comprobar la autenticidad
de lo que recibe, no solo analizarlo.

## Resumen

Borrado seguro, destrucción, timestomping, cifrado, ocultación y pruebas falsas. Casi
todas dejan rastro (programas ejecutados, metadatos incoherentes, espacio demasiado
limpio). Detectarlas también es una conclusión del informe.

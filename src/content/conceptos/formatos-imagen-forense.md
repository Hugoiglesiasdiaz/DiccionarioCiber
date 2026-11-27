---
titulo: Formatos de imagen forense
descripcion: "Raw, E01, AFF y otros formatos para guardar la copia de un disco: qué incluye cada uno y cuándo usarlo."
tipo: concepto
asignaturas: [forense]
extras: [comandos, linux]
etiquetas: [imagen forense, raw, dd, E01, EWF, Ex01, AFF, SMART, libewf, ewfmount]
tema: forense/adquisicion
orden: 7
actualizado: 2026-11-27
---

## Concepto

La copia de un disco se puede guardar en distintos **formatos de imagen**. Todos
contienen los mismos datos bit a bit; cambia lo que añaden alrededor: compresión,
metadatos del caso, hashes internos o división en trozos.

## Comparación

| Formato | Extensión | Metadatos | Compresión | Notas |
| --- | --- | --- | --- | --- |
| **Raw** | `.dd`, `.raw`, `.img` | No | No | Copia exacta, sin nada más. La lee cualquier herramienta. Ocupa lo mismo que el disco |
| **EnCase / EWF** | `.E01`, `.E02`… | Sí: caso, examinador, notas, hash | Sí | Estándar de hecho. La versión **Ex01** admite cifrado. Formato propietario, pero lo lee la biblioteca libre `libewf` |
| **SMART** | `.s01` | Sí | Sí | De la herramienta SMART para Linux. Poco habitual |
| **AFF** | `.aff` | Sí | Sí | Formato abierto, hoy poco usado |
| macOS | `.dmg` y otros | Según formato | Según formato | Imágenes nativas de Apple |

Todos pueden dividirse en **varios ficheros** de tamaño fijo, útil para sistemas de
ficheros con límite de tamaño, como FAT32.

## ¿Cuál elegir?

- **Raw** si hay que trabajar con herramientas variadas o se quiere la máxima
  compatibilidad. El hash y los datos del caso se guardan aparte.
- **E01** para un caso que se va a entregar: ocupa menos y lleva dentro el hash y los
  datos del caso, que se comprueban al abrirlo.

## Trabajar con E01 en Linux

```bash
ewfinfo imagen.E01                 # metadatos y hash guardados
ewfverify imagen.E01               # recalcula y compara el hash
ewfacquire /dev/sdX                # adquirir en E01 (pregunta los datos del caso)

# Presentarla como imagen raw para usar otras herramientas
sudo mkdir -p /mnt/ewf
sudo ewfmount imagen.E01 /mnt/ewf  # aparece /mnt/ewf/ewf1
mmls /mnt/ewf/ewf1
```

> [!NOTE]
> El hash de una imagen E01 se calcula sobre los **datos del disco**, no sobre el
> fichero `.E01`. Hacer `sha256sum imagen.E01` no da el hash de la evidencia: se usa
> `ewfverify` o se compara con el de la imagen montada.

## Resumen

Raw: simple y universal, sin metadatos. E01: comprimido, con metadatos y hash internos,
el estándar para entregar. AFF y SMART: alternativas poco usadas. Herramientas:
[Guymager](../guymager/), FTK Imager y `ewfacquire` para E01; [dc3dd](../dc3dd/) para raw.

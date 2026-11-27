---
titulo: Guymager
descripcion: "Adquisición forense con interfaz gráfica: imágenes dd, E01 o AFF con hashes y verificación, sin escribir comandos."
tipo: herramienta
asignaturas: [forense]
extras: [linux]
etiquetas: [imagen forense, adquisición, E01, EWF, AFF, gui]
actualizado: 2026-11-27
---

## Qué es

**Guymager** es un programa libre de adquisición forense con **interfaz gráfica** (Qt),
incluido en Kali, CAINE y otras distribuciones forenses. Lista los discos conectados y
permite crear imágenes con pocos clics. Usa varios hilos, así que suele ser más rápido
que `dd`.

## Para qué sirve

- Crear imágenes en tres formatos:

| Formato | Características |
| --- | --- |
| **dd / raw** | Copia exacta, sin compresión ni metadatos. La lee cualquier herramienta |
| **E01** (EWF, *Expert Witness Format*) | Comprimida, con metadatos del caso y hashes internos. Estándar de hecho (EnCase, FTK, Autopsy) |
| **AFF** (*Advanced Forensic Format*) | Formato abierto con metadatos, hoy poco usado |

- Calcular MD5, SHA-1 y SHA-256 durante la copia.
- **Verificar** la imagen al terminar, releyendo la imagen y, si se pide, también el
  original.
- Guardar un fichero `.info` con los datos del caso, del dispositivo y los resultados.

## Uso habitual

```bash
sudo guymager
```

1. Pulsar **Rescan** para que aparezcan los dispositivos y localizar el pendrive por
   modelo, serie y tamaño.
2. Clic derecho → **Acquire image**.
3. Elegir el formato (E01 o dd) y rellenar los datos del caso: número de caso, número de
   evidencia, examinador, descripción.
4. Indicar el directorio y el nombre de destino.
5. Marcar los hashes y **Verify image after acquisition**. Opcionalmente, *Re-read
   source after acquisition*.
6. **Start**. Al terminar, revisar el `.info`: hashes calculados y resultado de la
   verificación.

## Errores típicos

> [!ERROR] Elegir mal el dispositivo
> En la lista aparecen todos los discos, incluido el del sistema y el de destino.
> Identifica el original por **número de serie y tamaño**, no por el nombre `/dev/sdX`.

> [!ERROR] Fiarse sin más de la verificación de la propia herramienta
> Compara el hash con uno calculado por separado ([sha256sum](../sha256sum/)). Con
> dispositivos poco habituales (por ejemplo, *loop devices* que simulan un disco) puede
> no detectarlos o dar resultados inconsistentes.

## Advertencias

> [!WARNING]
> Guymager **no bloquea la escritura** en el original: hace falta un bloqueador por
> hardware o, como mínimo, marcar el dispositivo como solo lectura.

> [!TIP]
> Para un informe, E01 suele ser la mejor opción: ocupa menos y guarda los metadatos y
> los hashes dentro de la propia imagen. Para analizarla en Linux, `ewfmount` la presenta
> como una imagen raw.

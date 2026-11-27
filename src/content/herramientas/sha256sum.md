---
titulo: sha256sum y sha512sum
descripcion: "Calcular y verificar hashes de imágenes y ficheros desde la terminal para demostrar que una evidencia no ha cambiado."
tipo: herramienta
asignaturas: [forense]
extras: [comandos, linux, windows]
etiquetas: [hash, SHA-256, SHA-512, integridad, manifiesto, cmp, certutil, coreutils]
actualizado: 2026-11-27
---

## Qué es

`sha256sum` y `sha512sum` (de GNU coreutils) calculan el **hash** SHA-256 o SHA-512 de
un fichero o un dispositivo y verifican listas de hashes guardadas. Hay variantes con la
misma sintaxis para otros algoritmos: `md5sum`, `sha1sum`, `sha384sum`.

Qué es un hash y qué algoritmo conviene usar: [Funciones hash e
integridad](../../conceptos/funciones-hash/).

## Para qué sirve

- Calcular el hash del original antes y después de adquirirlo.
- Generar un **manifiesto** (fichero con los hashes) de todas las imágenes.
- Verificarlo tras cada copia, transferencia o antes de analizar.

## Comandos habituales

```bash
sudo sha256sum /dev/sdX              # hash de un dispositivo completo
sha256sum imagen.dd                  # hash de una imagen

# Manifiesto de varias imágenes y verificación posterior
sha256sum *.dd > imagenes.sha256
sha256sum -c imagenes.sha256         # «La suma coincide» / «FALLÓ»

# Comparar dos ficheros byte a byte (sin salida = idénticos)
cmp imagen1.dd imagen2.dd && echo "Idénticas"
```

En Windows (PowerShell o CMD):

```powershell
Get-FileHash .\imagen.dd -Algorithm SHA256
certutil -hashfile imagen.dd SHA256
```

## Ejemplo práctico

Momentos en los que se calcula o verifica un hash durante una adquisición:

| Momento | Comando | Resultado esperado |
| --- | --- | --- |
| Antes de adquirir | `sha256sum /dev/sdX > origen-antes.sha256` | Valor de referencia |
| Imagen terminada | `sha256sum pendrive.dd` | Igual que la referencia |
| Después de adquirir | `sha256sum /dev/sdX > origen-despues.sha256` | Igual: el original no cambió |
| Tras copiar al almacén | `sha256sum -c imagenes.sha256` | La suma coincide |
| Antes de analizar | `sha256sum -c imagenes.sha256` | La suma coincide |

## Errores típicos

> [!ERROR] Verificar un manifiesto desde otra carpeta
> `sha256sum -c` busca los ficheros con la ruta que aparece en el manifiesto. Ejecútalo
> desde la misma carpeta o genera el manifiesto con rutas absolutas.

> [!ERROR] Comparar hashes a ojo
> Es fácil dar por buenos dos valores que solo coinciden al principio y al final. Usa
> `sha256sum -c` o compara las cadenas con `[ "$a" = "$b" ]`.

## Advertencias

> [!WARNING]
> Leer un dispositivo para calcular su hash también es acceder a él: hazlo siempre a
> través de un bloqueador de escritura.

> [!TIP]
> Hacer el hash de un disco entero lleva tanto como leerlo. [dc3dd](../dc3dd/) lo
> calcula mientras copia y ahorra una lectura completa.

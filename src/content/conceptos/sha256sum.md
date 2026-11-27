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

`sha256sum` y `sha512sum` (de GNU coreutils) calculan el **hash** de un fichero o un
dispositivo. Si un solo bit cambia, el hash cambia por completo. Por eso se usan para
demostrar que una imagen es **idéntica** al original y que no ha cambiado desde que se
adquirió.

Existen también `md5sum` y `sha1sum`, pero MD5 y SHA-1 ya tienen **colisiones
prácticas**. Hoy se usa SHA-256, a veces con SHA-512 de complemento.

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

> [!ERROR] Esperar el mismo hash en dos volcados de RAM
> La memoria cambia continuamente: dos capturas seguidas **nunca** coinciden. El hash
> solo garantiza que cada volcado no cambia después de hacerlo.

## Advertencias

> [!WARNING] Lo que un hash no demuestra
> Que la imagen sea igual al original no prueba que la adquisición no alterase el
> sistema, que se adquiriera lo correcto ni quién tuvo la evidencia. Eso lo cubre la
> [cadena de custodia](../cadena-de-custodia/).

> [!TIP]
> Hacer el hash de un disco entero lleva tanto como leerlo. [dc3dd](../dc3dd/) lo
> calcula mientras copia y ahorra una lectura completa.

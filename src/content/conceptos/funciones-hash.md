---
titulo: Funciones hash e integridad
descripcion: "Qué es un hash, qué son las colisiones y los ataques de segunda preimagen, qué algoritmo usar en forense y qué exige la ley."
tipo: concepto
asignaturas: [forense, normativa]
etiquetas: [hash, integridad, SHA-256, MD5, SHA-1, colisión, segunda preimagen, Circular 5/2019]
tema: forense/adquisicion
orden: 10
actualizado: 2026-11-27
---

## Concepto

Una **función hash** convierte cualquier cantidad de datos en un valor de longitud fija
(el hash, resumen, *digest* o *checksum*). En forense se usa como **huella** de una
evidencia:

- Los mismos datos dan **siempre** el mismo hash.
- Un solo bit distinto da un hash **completamente distinto**.

Si el hash del original y el de la copia coinciden, la copia es idéntica. Si el hash
calculado hoy coincide con el de la adquisición, la evidencia no ha cambiado.

## Colisiones y segunda preimagen

| Ataque | Qué consigue | Consecuencia |
| --- | --- | --- |
| **Colisión** | Encontrar dos datos **cualesquiera** A y B distintos con el mismo hash | La función deja de servir para criptografía (firmas, certificados) |
| **Segunda preimagen** | Dado un dato **fijo** A, encontrar otro B con el mismo hash | La función deja de servir para forense |

En forense la evidencia ya existe: es un A fijo. Para falsificarla haría falta un ataque
de **segunda preimagen**, mucho más difícil que una colisión. Por eso MD5 y SHA-1 están
rotos para criptografía, pero en teoría todavía valen para verificar una evidencia.

## Algoritmos

| Algoritmo | Estado |
| --- | --- |
| MD5 | Colisiones prácticas desde 2004. Roto para criptografía |
| SHA-1 | Colisión práctica demostrada en 2017 (SHAttered) |
| **SHA-2** (SHA-256, SHA-384, SHA-512) | **Estándar actual** |
| SHA-3 | Estándar de futuro |

> [!TIP] En la práctica, SHA-256
> Aunque MD5 siga valiendo en teoría, un perito contrario puede argumentar que «está
> roto». Usa **SHA-256**, o calcula dos algoritmos distintos (una colisión de MD5 no
> sirve para SHA-1 y viceversa). SHA-256 no es más lento: muchos procesadores lo
> calculan por hardware.

## Qué dice la ley

- **LECrim, art. 588 sexies c.1:** la autorización judicial fija las condiciones para
  asegurar la **integridad** de los datos y su preservación para un posible dictamen
  pericial.
- **Circular 5/2019 de la Fiscalía General del Estado**, sobre registro de dispositivos:
  la imagen se «firma» con una función hash. La integridad de la copia queda garantizada
  porque el hash del original coincide con el de la copia.

Hay pruebas que los tribunales han rechazado por no tener hashes que demostraran su
integridad.

## Lo que un hash no demuestra

- Que la adquisición no alterase el sistema (en vivo, siempre lo altera).
- Que se recogiera lo correcto o todo lo necesario.
- Quién tuvo la evidencia y qué hizo con ella: eso es la
  [cadena de custodia](../cadena-de-custodia/).

Además, en la **RAM** y en los **SSD** el hash del original puede cambiar entre lecturas
([Volcado de memoria](../volcado-de-memoria/), [SSD y TRIM](../ssd-y-trim/)). Por eso
se guarda una imagen maestra y su hash.

## Cómo calcularlo

- **Linux:** `md5sum`, `sha1sum`, `sha256sum`, `sha512sum`
  ([sha256sum](../../herramientas/sha256sum/)).
- **Windows:** `Get-FileHash` en PowerShell (SHA-256 por defecto) o `certutil`.
- **Con interfaz gráfica:** HashMyFiles (NirSoft), IgorWare Hasher o HashCalc.

## Resumen

El hash demuestra que una copia es idéntica y que no ha cambiado desde que se calculó.
Usar SHA-256 (o dos algoritmos), calcularlo al adquirir y documentarlo. La ley española
lo pide de forma expresa. No sustituye a la cadena de custodia.

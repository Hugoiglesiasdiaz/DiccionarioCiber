---
titulo: dnsrecon
descripcion: "Enumeración DNS automática: registros de un dominio, transferencia de zona, fuerza bruta de subdominios y resolución inversa de rangos."
tipo: herramienta
asignaturas: [hacking]
extras: [comandos, linux]
etiquetas: [dnsrecon, DNS, enumeración, subdominios, AXFR, fuerza bruta, dnsenum, reconocimiento]
actualizado: 2026-11-27
---

## Qué es

**dnsrecon** es un script en Python que automatiza la enumeración DNS de un dominio.
Viene en Kali. Hace en un solo comando lo que con [dig](../dig/) serían muchas consultas.

**dnsenum** es una alternativa parecida (`dnsenum example.com`).

## Para qué sirve

- Sacar los registros principales de un dominio (SOA, NS, MX, A, AAAA, TXT, SRV).
- Probar la transferencia de zona en todos sus servidores NS.
- Descubrir subdominios por fuerza bruta con un diccionario.
- Resolver un rango de IP a nombres (PTR).

## Comandos habituales

```bash
dnsrecon -d example.com                         # enumeración estándar
dnsrecon -d example.com -t axfr                 # probar transferencia de zona
dnsrecon -d example.com -t brt -D subdominios.txt   # fuerza bruta de subdominios
dnsrecon -r 192.0.2.0/24                        # resolución inversa de un rango
dnsrecon -d example.com -j resultado.json       # guardar en JSON
```

| Opción | Significado |
| --- | --- |
| `-d` | Dominio objetivo |
| `-t std` | Enumeración estándar (por defecto) |
| `-t axfr` | Transferencia de zona en cada NS |
| `-t brt` | Fuerza bruta de subdominios |
| `-D` | Diccionario para la fuerza bruta |
| `-r` | Rango de IP para resolución inversa |
| `-n` | Servidor DNS que se usa |
| `-j` / `-x` / `-c` | Salida en JSON / XML / CSV |

En Kali hay diccionarios en `/usr/share/dnsrecon/` y en `/usr/share/seclists/` si está
instalado SecLists.

## Ejemplo práctico

Enumerar `zonetransfer.me`, dominio de pruebas:

```bash
dnsrecon -d zonetransfer.me -t axfr
```

dnsrecon pregunta a cada servidor NS y, si alguno permite la transferencia, lista todos
los registros de la zona.

## Errores típicos

> [!ERROR] Diccionario demasiado grande
> La fuerza bruta lanza una consulta por palabra. Con un diccionario enorme tarda mucho y
> genera ruido. Empieza por uno pequeño de subdominios habituales.

> [!ERROR] Comodín DNS
> Si el dominio responde a cualquier subdominio (`*.example.com`), la fuerza bruta da
> falsos positivos. dnsrecon avisa cuando lo detecta.

## Advertencias

> [!WARNING]
> La transferencia de zona y la fuerza bruta son **reconocimiento activo**: llegan a los
> servidores del objetivo. Solo con autorización. Qué significa cada técnica:
> [DNS y consulta de dominios](../../conceptos/dns-y-dominios/).

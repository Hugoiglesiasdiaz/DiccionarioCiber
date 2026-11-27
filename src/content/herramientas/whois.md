---
titulo: whois
descripcion: "Consultar desde la terminal quién registró un dominio o a quién pertenece una IP: registrador, fechas, servidores DNS y rangos de red."
tipo: herramienta
asignaturas: [hacking]
extras: [comandos, linux]
etiquetas: [whois, dominio, registrador, IP, ASN, RIPE, OSINT, reconocimiento]
actualizado: 2026-11-27
---

## Qué es

`whois` es un cliente de línea de comandos del protocolo del mismo nombre. Pregunta a
las bases de datos de los registradores (para dominios) y de los registros regionales de
Internet, como RIPE en Europa (para IP).

Se instala con `sudo apt install whois`. Qué información da un dominio y para qué sirve:
[DNS y consulta de dominios](../../conceptos/dns-y-dominios/).

## Para qué sirve

- Saber el registrador, las fechas de alta y caducidad y los servidores DNS de un dominio.
- Saber a qué organización y rango de red pertenece una IP, y su ASN.
- Encontrar contactos de abuso (`abuse-mailbox`) para notificar un incidente.

## Comandos habituales

```bash
whois example.com                  # datos del dominio
whois 192.0.2.10                   # propietario y rango de una IP
whois -h whois.ripe.net 192.0.2.10 # preguntar a un servidor whois concreto
whois example.com | grep -iE "registrar|creation|expir|name server"
```

| Campo | Qué indica |
| --- | --- |
| `Registrar` | Empresa con la que se registró el dominio |
| `Creation Date` / `Registry Expiry Date` | Alta y caducidad |
| `Name Server` | Servidores DNS autoritativos |
| `inetnum` / `NetRange` | Rango de IP al que pertenece una dirección |
| `origin` / `OriginAS` | Sistema autónomo (ASN) que anuncia ese rango |

## Ejemplo práctico

Saber en qué proveedor está alojada una web (datos de ejemplo):

```bash
dig +short www.example.com         # 192.0.2.10
whois 192.0.2.10 | grep -iE "netname|descr|country|origin"
```

```text
netname:   EJEMPLO-HOSTING
descr:     Proveedor de alojamiento de ejemplo
country:   ES
origin:    AS64500
```

Si la IP es de un proveedor de nube o de hosting, ese servidor **no es del cliente**:
para probarlo hace falta también el permiso del proveedor.

## Errores típicos

> [!ERROR] Dominios .es sin datos
> El whois de los dominios `.es` está restringido. Se consulta en la web de
> dominios.es (Red.es).

> [!ERROR] Esperar el nombre del titular
> Desde el RGPD, los datos personales del titular suelen aparecer como `REDACTED FOR
> PRIVACY`. El registrador y los DNS sí se ven.

## Advertencias

> [!TIP]
> whois es pasivo: se pregunta al registro, no al objetivo. Es una de las primeras
> consultas del [OSINT](../../conceptos/osint/).

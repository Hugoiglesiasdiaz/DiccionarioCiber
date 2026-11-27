---
titulo: dig
descripcion: "Consultar registros DNS (A, MX, NS, TXT…) desde la terminal, preguntar a un servidor concreto, hacer resolución inversa y probar transferencias de zona."
tipo: herramienta
asignaturas: [hacking]
extras: [comandos, linux]
etiquetas: [dig, DNS, registros, AXFR, transferencia de zona, nslookup, host, bind9-dnsutils]
actualizado: 2026-11-27
---

## Qué es

`dig` (*Domain Information Groper*) hace consultas DNS y muestra la respuesta completa.
Viene en el paquete `bind9-dnsutils` (`dnsutils` en sistemas antiguos), junto a `host` y
`nslookup`.

Qué significa cada registro y por qué una transferencia de zona abierta es un fallo:
[DNS y consulta de dominios](../../conceptos/dns-y-dominios/).

## Para qué sirve

- Consultar cualquier tipo de registro de un dominio.
- Preguntar a un servidor DNS concreto en vez de al configurado en el equipo.
- Resolver una IP a su nombre.
- Comprobar si un servidor permite la transferencia de zona (AXFR).

## Comandos habituales

```bash
dig example.com                    # registro A, salida completa
dig +short example.com             # solo la respuesta
dig example.com MX +short          # servidores de correo
dig example.com NS +short          # servidores DNS autoritativos
dig example.com TXT +short         # SPF, DMARC, verificaciones
dig @8.8.8.8 example.com           # preguntar a un servidor concreto
dig -x 192.0.2.10 +short           # resolución inversa (PTR)
dig example.com +noall +answer     # solo la sección de respuesta
dig example.com +trace             # seguir la resolución desde la raíz
dig axfr @ns1.example.com example.com   # intentar la transferencia de zona
```

| Opción | Significado |
| --- | --- |
| `@servidor` | Servidor DNS al que se pregunta |
| Tipo (`A`, `MX`, `NS`, `TXT`, `SOA`, `AAAA`) | Registro que se pide |
| `+short` | Solo el valor de la respuesta |
| `+noall +answer` | Oculta todo salvo la respuesta |
| `-x` | Consulta inversa |
| `axfr` | Pide la zona completa |

Equivalentes rápidos: `host -a example.com` (todos los registros) y
`nslookup example.com` (también en Windows).

## Ejemplo práctico

Probar la transferencia de zona en `zonetransfer.me`, un dominio pensado para practicar:

```bash
# 1. Servidores autoritativos
dig @8.8.8.8 zonetransfer.me NS +short

# 2. Pedir la zona a cada uno
dig axfr @nsztm1.digi.ninja zonetransfer.me

# 3. Quedarse solo con los NS que aparezcan, por si hay subzonas
dig axfr @nsztm1.digi.ninja zonetransfer.me | awk '$4 == "NS" {print $1, $5}'
```

Si el servidor la permite, devuelve todos los registros (subdominios, IP internas…). Si no,
responde `Transfer failed`.

## Errores típicos

> [!ERROR] Pedir la zona al servidor equivocado
> La transferencia se pide a los servidores **NS** del dominio, no al DNS de tu red ni a
> `8.8.8.8`.

> [!ERROR] Fiarse de `ANY`
> Muchos servidores ya no responden a `dig example.com ANY`. Pide cada tipo por separado.

## Advertencias

> [!WARNING]
> Una consulta normal es pasiva. **Intentar una transferencia de zona es activo**: llega
> al servidor del objetivo y queda registrada. Solo dentro del alcance autorizado, o en
> `zonetransfer.me`.

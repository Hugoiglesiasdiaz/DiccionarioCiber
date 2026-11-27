---
titulo: DNS y consulta de dominios
descripcion: "Qué información de un objetivo revelan el DNS y el registro de dominios: tipos de registro, whois, transferencia de zona y enumeración de subdominios."
tipo: concepto
asignaturas: [hacking]
etiquetas: [DNS, dominio, whois, registros DNS, MX, NS, TXT, SOA, transferencia de zona, AXFR, subdominios, OSINT]
tema: hacking/osint
orden: 3
actualizado: 2026-11-27
---

## Concepto

El **DNS** traduce nombres (`www.example.com`) a direcciones IP y guarda otros datos del
dominio. Consultarlo permite conocer la **infraestructura** de un objetivo: servidores
web y de correo, proveedores, subdominios y a veces equipos internos.

## Tipos de registro

| Registro | Contiene | Qué revela |
| --- | --- | --- |
| **A** / **AAAA** | IPv4 / IPv6 de un nombre | Dónde está alojado cada servicio |
| **CNAME** | Alias de otro nombre | Servicios de terceros (CDN, hosting, SaaS) |
| **MX** | Servidores de correo | Proveedor de correo (Microsoft 365, Google…) |
| **NS** | Servidores DNS autoritativos del dominio | A quién preguntar; candidatos a transferencia de zona |
| **TXT** | Texto libre | SPF, DKIM, DMARC y verificaciones de servicios que usa la empresa |
| **SOA** | Datos de la zona | Servidor primario y correo del administrador |
| **PTR** | Nombre de una IP (resolución inversa) | Nombres internos o del proveedor |

## Registro del dominio (whois)

El **whois** indica quién registró el dominio, con qué registrador, fechas de alta y
caducidad y servidores DNS. Desde el RGPD los datos personales suelen aparecer ocultos.
Para los dominios **.es** se consulta en la web de dominios.es (Red.es). Ver
[whois](../../herramientas/whois/).

## Transferencia de zona (AXFR)

Una **transferencia de zona** copia **todos** los registros de un dominio de un servidor
DNS a otro. Es necesaria entre el servidor primario y los secundarios, pero si cualquiera
puede pedirla, el atacante obtiene el mapa completo: subdominios, equipos internos, IP.

> [!WARNING] Es una vulnerabilidad
> Un servidor DNS debe permitir AXFR **solo** a sus servidores secundarios. Si responde a
> cualquiera, es un hallazgo del informe. El dominio `zonetransfer.me` existe para
> practicarlo de forma legal.

## Subdominios

Los subdominios (`intranet.`, `dev.`, `vpn.`) suelen ser menos vigilados que la web
principal. Formas de encontrarlos:

| Técnica | Tipo | Herramientas |
| --- | --- | --- |
| Certificados TLS públicos (*Certificate Transparency*) | Pasiva | crt.sh, [theHarvester](../../herramientas/theharvester/) |
| Buscadores y agregadores | Pasiva | Dorks `site:*.example.com`, DNSDumpster, Sublist3r |
| Transferencia de zona | Activa | [dig](../../herramientas/dig/), [dnsrecon](../../herramientas/dnsrecon/) |
| Fuerza bruta con diccionario | Activa | dnsrecon, dnsenum |

## Herramientas

| Herramienta | Uso principal |
| --- | --- |
| [whois](../../herramientas/whois/) | Datos del registro del dominio o de la IP |
| [dig](../../herramientas/dig/) | Consultar cualquier registro y probar transferencias de zona |
| `host` / `nslookup` | Consultas rápidas (`nslookup` también existe en Windows) |
| [dnsrecon](../../herramientas/dnsrecon/) | Enumeración automática: registros, AXFR, fuerza bruta |
| DNSDumpster / Robtex | Alternativas web, pasivas |

## Resumen

DNS y whois revelan servidores, proveedores y subdominios. Lo más grave que se puede
encontrar es una transferencia de zona abierta, que entrega todos los registros. Los
subdominios se descubren por certificados, buscadores, AXFR o fuerza bruta.

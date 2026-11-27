---
titulo: Reconocimiento OSINT de un dominio
descripcion: "Guía para la primera fase de una auditoría: whois, DNS, subdominios, servicios expuestos, dorks y metadatos de los documentos publicados, con un informe de hallazgos."
tipo: caso
asignaturas: [hacking]
extras: [comandos, linux]
etiquetas: [OSINT, reconocimiento, theHarvester, dig, dnsrecon, Shodan, dorks, ExifTool, wget, metadatos, subdominios]
actualizado: 2026-11-27
---

> [!NOTE] Datos ficticios
> Es una guía de procedimiento. El dominio (`example.com`), las IP (rangos de
> documentación `192.0.2.0/24` y `198.51.100.0/24`) y los resultados son de ejemplo.

## Contexto

Una empresa nos contrata una auditoría externa de **caja negra**. Lo único que nos da es
su dominio principal. Antes de escanear nada, hay que averiguar todo lo posible con
fuentes públicas: qué tiene expuesto en Internet y qué información filtra.

**Objetivo:** un inventario de dominios, subdominios, IP, servicios, correos y metadatos,
con los hallazgos ya valorados, que sirva de base para las fases siguientes.

## Entorno

- Kali Linux.
- Acuerdo de auditoría firmado con el alcance: `example.com` y sus subdominios. Excluidos
  los servicios de terceros (correo en la nube, CDN) ([Acuerdo de
  auditoría](../../conceptos/acuerdo-de-auditoria/)).
- Herramientas: [whois](../../herramientas/whois/), [dig](../../herramientas/dig/),
  [dnsrecon](../../herramientas/dnsrecon/), [theHarvester](../../herramientas/theharvester/),
  [Shodan](../../herramientas/shodan/), [wget](../../herramientas/wget/),
  [ExifTool](../../herramientas/exiftool/) y opcionalmente
  [Maltego](../../herramientas/maltego/).

```bash
DOM=example.com
mkdir -p osint-$DOM/{dns,docs,informe} && cd osint-$DOM
```

## Desarrollo

### 1. Registro del dominio

```bash
whois $DOM | grep -iE "registrar|creation|expir|name server" | tee dns/whois.txt
```

Registrador, antigüedad y servidores DNS. Si los NS son del proveedor de hosting, ya
sabemos dónde está alojado.

### 2. Registros DNS

```bash
for t in A AAAA MX NS TXT SOA; do
  echo "== $t"; dig $DOM $t +short
done | tee dns/registros.txt
```

Qué buscar ([DNS y consulta de dominios](../../conceptos/dns-y-dominios/)):

- **MX**: proveedor de correo (por ejemplo, Microsoft 365). Fuera de alcance, pero útil
  para preparar *phishing* si se autoriza.
- **TXT**: SPF, DMARC y verificaciones que delatan servicios contratados.
- **A**: IP de la web. Con `whois` sobre la IP se ve si es del cliente o de un hosting.

### 3. Subdominios (pasivo)

```bash
theHarvester -d $DOM -b crtsh,rapiddns,otx,duckduckgo -f informe/harvester
grep -oP '(?<=<hostname>).*?(?=</hostname>)' informe/harvester.xml | sort -u > dns/subdominios.txt
```

Comprobar cuáles resuelven:

```bash
while read s; do
  ip=$(dig +short "$s" | tail -1); [ -n "$ip" ] && echo "$s $ip"
done < dns/subdominios.txt | tee dns/vivos.txt
```

```text
www.example.com       192.0.2.10
intranet.example.com  192.0.2.25
dev.example.com       198.51.100.7
vpn.example.com       192.0.2.30
```

### 4. Transferencia de zona (activo, dentro del alcance)

```bash
dnsrecon -d $DOM -t axfr | tee dns/axfr.txt
```

Si algún NS la permite, es un **hallazgo** en sí mismo y además entrega la zona
completa. Se documenta y se avisa al cliente.

### 5. Servicios expuestos sin escanear

```bash
for ip in $(awk '{print $2}' dns/vivos.txt | sort -u); do
  shodan host "$ip"
done | tee informe/shodan.txt
```

Fijarse en versiones antiguas, paneles de administración, bases de datos o escritorio
remoto accesibles desde Internet, y en la fecha del último escaneo de Shodan.

### 6. Dorks

Búsquedas manuales en Google y Bing ([Google dorks](../../conceptos/google-dorks/)):

```text
site:example.com filetype:pdf OR filetype:docx OR filetype:xlsx
site:example.com intitle:"index of"
site:example.com inurl:admin OR inurl:login
site:*.example.com -site:www.example.com
"example.com" (password OR contraseña) filetype:txt
```

Anotar cada resultado relevante con su URL, la fecha y una captura.

### 7. Documentos y metadatos

Listar los documentos enlazados sin descargarlos:

```bash
wget --spider -r -l 2 -U "Mozilla/5.0" -A pdf,doc,docx,xls,xlsx,jpg \
  https://www.$DOM 2>&1 | grep -iE '^--.*\.(pdf|docx?|xlsx?|jpg)$' | tee docs/lista.txt
```

Descargarlos (está en el alcance) y extraer los metadatos:

```bash
wget -r -l 2 -w 1 -A pdf,doc,docx,xls,xlsx,jpg -nd -P docs/ https://www.$DOM
exiftool -r -csv -Author -Creator -Producer -LastModifiedBy -Company -GPSPosition \
  docs/ > informe/metadatos.csv
cut -d, -f2 informe/metadatos.csv | sort | uniq -c | sort -nr | head
```

```text
     14 jgarcia
      9 Microsoft Word 2016
      3 admin.local
```

Los nombres de usuario indican el **formato de las cuentas** y el software, las versiones
que usa la empresa ([Metadatos](../../conceptos/metadatos/)).

### 8. Correos y filtraciones

- Correos en el informe de theHarvester y en **Hunter.io**, que además indica el patrón
  (`nombre.apellido@example.com`).
- Comprobar los correos corporativos en **Have I Been Pwned** para saber si aparecen en
  brechas. Solo se anota que aparecen, sin buscar las contraseñas filtradas.

### 9. Relacionar y valorar

Llevar los datos a Maltego o a una tabla, y valorar cada hallazgo:

| Hallazgo | Riesgo | Recomendación |
| --- | --- | --- |
| Transferencia de zona abierta en un NS | Alto | Permitir AXFR solo a los secundarios |
| `dev.example.com` accesible desde Internet | Alto | Restringir por VPN o IP |
| Escritorio remoto (3389) expuesto en `192.0.2.30` | Alto | Cerrarlo y usar VPN con MFA |
| Usuarios internos en los metadatos de 14 documentos | Medio | Limpiar los documentos (mat2, ExifTool) antes de publicar |
| Correos corporativos en brechas públicas | Medio | Forzar cambio de contraseña y activar MFA |
| Versión de un servicio con CVE conocido (según Shodan) | Por verificar | Confirmar en la fase de escaneo |

## Registro de ejemplo

| Paso | Herramienta | Tipo | Resultado |
| --- | --- | --- | --- |
| 1 | whois | Pasivo | Registrador y NS del hosting |
| 2 | dig | Pasivo | MX en la nube, SPF y DMARC configurados |
| 3 | theHarvester + dig | Pasivo | 23 subdominios, 9 resuelven |
| 4 | dnsrecon | **Activo** | AXFR permitido en un NS |
| 5 | Shodan | Pasivo | 4 IP con servicios, 1 RDP expuesto |
| 6 | Dorks | Pasivo | 2 directorios listables |
| 7 | wget + ExifTool | **Activo** | 31 documentos, 3 usuarios internos |
| 8 | Hunter.io / HIBP | Pasivo | Patrón de correo; 5 cuentas en brechas |

## Conclusiones

- El orden importa: primero **pasivo** (whois, DNS, certificados, Shodan, dorks), y lo
  **activo** (AXFR, rastrear la web) solo cuando está autorizado y anotando la hora.
- Los subdominios y los metadatos suelen revelar más que la web principal.
- Cada dato se guarda con su fuente y su fecha: en el informe hay que poder demostrar de
  dónde sale.
- Lo que está fuera del alcance (el correo en la nube, el CDN) se anota, pero no se toca.
- Ver también [OSINT](../../conceptos/osint/) y
  [Fases de una auditoría](../../conceptos/fases-de-una-auditoria/).

---
titulo: Shodan
descripcion: "Buscador de servicios y dispositivos conectados a Internet: filtros de búsqueda, consulta de una IP y uso desde la terminal con la API."
tipo: herramienta
asignaturas: [hacking]
extras: [comandos]
etiquetas: [Shodan, IoT, banners, puertos, OSINT, reconocimiento pasivo, API, Censys, ZoomEye]
actualizado: 2026-11-27
---

## Qué es

**Shodan** es un buscador que recorre Internet conectándose a los servicios expuestos y
guarda sus **banners**: la respuesta con la que se presentan (producto, versión,
cabeceras). Indexa servidores, routers, cámaras, sistemas industriales… y a veces asocia
las versiones con CVE conocidos.

Se usa en [shodan.io](https://www.shodan.io) (requiere cuenta; la gratuita limita
búsquedas y resultados) o desde la terminal con la API. Alternativas: **Censys** y
**ZoomEye**.

## Para qué sirve

- Ver qué puertos y servicios tiene expuestos un objetivo **sin escanearlo**.
- Encontrar versiones antiguas o servicios que no deberían estar en Internet.
- Medir cuántos sistemas de un tipo hay expuestos en un país o una organización.

## Comandos habituales

Filtros en la web o en la API:

| Filtro | Ejemplo |
| --- | --- |
| `hostname:` | `hostname:example.com` |
| `net:` | `net:192.0.2.0/24` |
| `org:` | `org:"Ejemplo SL"` |
| `port:` | `port:21` |
| `product:` / `version:` | `product:MySQL version:5.7` |
| `country:` / `city:` | `country:ES city:Vigo` |
| `os:` | `os:"Windows 7"` |
| `has_screenshot:` | `has_screenshot:true` |

Desde la terminal (`pip install shodan`):

```bash
shodan init TU_API_KEY                         # configurar la clave una vez
shodan info                                    # créditos de consulta disponibles
shodan host 192.0.2.10                         # todo lo conocido de una IP
shodan count 'product:nginx country:ES'        # cuántos resultados (no gasta créditos)
shodan search --fields ip_str,port,org 'hostname:example.com'
shodan download resultados 'net:192.0.2.0/24'  # guardar resultados
shodan parse --fields ip_str,port resultados.json.gz
```

## Ejemplo práctico

Revisar la superficie expuesta de un rango del cliente (datos de ejemplo):

```bash
shodan search --fields ip_str,port,product,version 'net:192.0.2.0/24'
```

```text
192.0.2.10   443  nginx          1.18.0
192.0.2.15   21   ProFTPD        1.3.5
192.0.2.20   3389 Remote Desktop
```

Un FTP con una versión antigua o un escritorio remoto abierto a Internet son hallazgos
que se verifican después, ya dentro del alcance, con un escaneo activo.

## Errores típicos

> [!ERROR] Tomar el resultado como actual
> Shodan muestra la última vez que **él** escaneó esa IP. El servicio puede haber
> cambiado o la IP puede pertenecer ya a otra persona. Mira la fecha.

> [!ERROR] Gastar créditos con `search`
> Para saber cuántos resultados hay usa `shodan count`, que no consume créditos de
> consulta.

## Advertencias

> [!WARNING]
> Consultar Shodan es pasivo, pero **conectarse** a lo que encuentras (abrir una cámara,
> probar un login) sin autorización es acceso ilícito
> ([Delitos informáticos](../../conceptos/delitos-informaticos-codigo-penal/)).

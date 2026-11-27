---
titulo: theHarvester
descripcion: "Recopilar de fuentes públicas los subdominios, IP y correos de un dominio, y extraer de sus informes una lista limpia de subdominios."
tipo: herramienta
asignaturas: [hacking]
extras: [comandos, linux]
etiquetas: [theHarvester, OSINT, subdominios, correos, crt.sh, reconocimiento pasivo]
actualizado: 2026-11-27
---

## Qué es

**theHarvester** consulta muchas fuentes públicas (certificados TLS, buscadores, bases de
datos DNS) para reunir los **subdominios, IP, correos y nombres** asociados a un dominio.
Viene en Kali (`sudo apt install theharvester`). Algunas fuentes necesitan una clave de
API, pero muchas son gratuitas.

## Para qué sirve

- Hacer el primer mapa de la superficie expuesta de una organización sin tocar sus
  servidores.
- Obtener la lista de subdominios para analizarlos después.
- Encontrar correos con los que preparar una prueba de *phishing* autorizada.

## Comandos habituales

```bash
theHarvester -d example.com -b crtsh                    # una fuente
theHarvester -d example.com -b crtsh,rapiddns,otx,duckduckgo -l 500 -f informe
theHarvester -d example.com -b all                       # todas (lento; algunas fallan sin API)
```

| Opción | Significado |
| --- | --- |
| `-d` | Dominio objetivo |
| `-b` | Fuentes, separadas por comas |
| `-l` | Límite de resultados por fuente |
| `-n` | Consultas DNS sobre lo encontrado |
| `-f` | Guardar el informe en XML y JSON con ese nombre |

Fuentes útiles sin clave: `crtsh` (certificados), `rapiddns`, `otx`, `duckduckgo`.

## Ejemplo práctico

Lista limpia de subdominios únicos a partir del informe:

```bash
theHarvester -d example.com -b crtsh,rapiddns,otx -f informe
grep -oP '(?<=<hostname>).*?(?=</hostname>)' informe.xml | sort -u > subdominios.txt
wc -l subdominios.txt
```

`subdominios.txt` sirve de entrada para las siguientes fases: resolverlos con
[dig](../dig/), buscarlos en [Shodan](../shodan/) o rastrear sus documentos con
[wget](../wget/).

## Errores típicos

> [!ERROR] Usar todas las fuentes de golpe
> `-b all` tarda mucho y muchas fuentes fallan o bloquean sin clave de API. Elige unas
> pocas que funcionen.

> [!ERROR] Dar por vivos todos los subdominios
> Los certificados antiguos incluyen nombres que ya no existen. Compruébalos antes de
> incluirlos en el informe.

## Advertencias

> [!TIP]
> Es reconocimiento **pasivo**: se pregunta a terceros. Ver [OSINT](../../conceptos/osint/).

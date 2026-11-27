---
titulo: OSINT
descripcion: "Inteligencia de fuentes abiertas: qué es, reconocimiento pasivo frente a activo, el ciclo OSINT, qué fuentes se usan y el OSINT Framework."
tipo: concepto
asignaturas: [hacking]
etiquetas: [OSINT, reconocimiento, pasivo, activo, fuentes abiertas, OSINT Framework, Have I Been Pwned, Hunter.io]
tema: hacking/osint
orden: 1
actualizado: 2026-11-27
---

## Concepto

**OSINT** (*Open Source Intelligence*) es obtener información útil a partir de **fuentes
abiertas o públicas**. En una auditoría es la primera fase
([Fases de una auditoría](../fases-de-una-auditoria/)): conocer el objetivo antes de
tocarlo.

| | Reconocimiento pasivo | Reconocimiento activo |
| --- | --- | --- |
| Contacto con el objetivo | **Ninguno**: se consultan terceros (buscadores, DNS públicos, registros) | Directo: escaneos, peticiones a sus servidores |
| ¿Lo detecta el objetivo? | No | Puede quedar en sus registros |
| Ejemplos | Google, Shodan, whois, metadatos de documentos publicados | Nmap, rastreo de su web, intento de transferencia de zona |

## Fuentes

- **Buscadores** generales y sus operadores ([Google dorks](../google-dorks/)).
- **Buscadores tecnológicos**: indexan servicios y dispositivos expuestos
  ([Shodan](../../herramientas/shodan/), ZoomEye, Censys).
- **DNS y registros de dominios** ([DNS y consulta de dominios](../dns-y-dominios/)).
- **Documentos y su [metadatos](../metadatos/)**.
- **Redes sociales** y webs profesionales (LinkedIn): empleados, cargos, tecnologías.
- **Filtraciones**: bases de datos de brechas como *Have I Been Pwned*.
- **Archivos y repositorios**: Wayback Machine, GitHub.

## Ciclo OSINT

1. **Requisitos**: qué se necesita saber y para qué.
2. **Fuentes**: elegir las más fiables entre tanta información.
3. **Adquisición**: obtener los datos.
4. **Procesamiento**: darles un formato que se pueda analizar.
5. **Análisis**: relacionar los datos y sacar conclusiones (inteligencia).
6. **Presentación**: comunicarlo de forma útil.

> [!NOTE] El problema no es la falta de datos
> Sobra información, y mucha es poco fiable o errónea. Hay que contrastar y quedarse con
> lo relevante (curación de contenidos).

## Herramientas y recursos

| Recurso | Para qué |
| --- | --- |
| [theHarvester](../../herramientas/theharvester/) | Subdominios, IP y correos de un dominio |
| [Maltego](../../herramientas/maltego/) | Relacionar entidades (personas, dominios, correos) en un grafo |
| [Shodan](../../herramientas/shodan/) | Servicios y dispositivos expuestos en Internet |
| [ExifTool](../../herramientas/exiftool/) | Metadatos de fotos y documentos |
| **Hunter.io** | Correos de una organización y su patrón (`nombre.apellido@`). Requiere registro |
| **Have I Been Pwned** | Saber si un correo aparece en brechas conocidas |
| **Google Alerts** | Aviso por correo cuando se publica algo nuevo sobre una búsqueda |
| **OSINT Framework** | Árbol de enlaces a cientos de herramientas, ordenadas por el dato de partida |

## OSINT Framework

[osintframework.com](https://osintframework.com/) no es una herramienta, sino un **mapa
de enlaces**. Se empieza por la rama del dato que ya se tiene (un *username*, un correo,
un dominio, una IP) y se baja hasta la herramienta concreta.

- **(T)**: requiere registro. **($)**: de pago o *freemium*. Sin marca: gratuita.
- Algunos enlaces están caducados, y que aparezca una herramienta no significa que su uso
  sea legal en todos los casos.

> [!WARNING]
> Que la información sea pública no permite usarla para cualquier cosa. Recopilar datos
> personales está sujeto al RGPD, y en una auditoría solo se investiga lo que entra en el
> alcance.

## Resumen

OSINT es reconocimiento con fuentes públicas, idealmente pasivo: el objetivo no se
entera. Se sigue un ciclo (requisitos, fuentes, adquisición, procesamiento, análisis y
presentación) y se apoya en buscadores, DNS, metadatos, redes sociales y filtraciones.

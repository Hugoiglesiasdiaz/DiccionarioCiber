---
titulo: Google dorks
descripcion: "Operadores de búsqueda avanzada de Google y Bing para encontrar ficheros, paneles o información expuesta, cómo combinarlos y la Google Hacking Database."
tipo: concepto
asignaturas: [hacking]
extras: [comandos]
etiquetas: [dorks, google hacking, GHDB, site, filetype, inurl, intitle, intext, Bing, OSINT]
tema: hacking/osint
orden: 2
actualizado: 2026-11-27
---

## Concepto

Un **dork** es una búsqueda que usa los **operadores avanzados** de un buscador para
encontrar información muy concreta: documentos internos indexados por error, directorios
listables, paneles de administración, mensajes de error que revelan tecnologías…

Es una técnica de [OSINT](../osint/) **pasiva**: se consulta a Google, no al objetivo.

## Operadores de Google

| Operador | Qué hace | Ejemplo |
| --- | --- | --- |
| `"…"` | Frase exacta | `"cambio climático"` |
| `-` | Excluye un término o un sitio | `receta -pimiento` |
| `OR` (o `\|`) | Uno u otro (en mayúsculas) | `fútbol OR baloncesto` |
| `site:` | Solo en un dominio, o en un TLD | `site:example.com`, `site:.edu` |
| `filetype:` / `ext:` | Tipo de fichero | `filetype:pdf` |
| `inurl:` | Término en la URL | `inurl:login` |
| `intitle:` | Término en el título | `intitle:"index of"` |
| `intext:` | Término en el texto de la página | `intext:confidencial` |
| `inanchor:` | Término en el texto de los enlaces | `inanchor:descargar` |
| `*` | Comodín para una palabra | `"mejor * de Galicia"` |
| `..` | Rango numérico | `portátil 300..500 euros` |
| `before:` / `after:` | Indexado antes o después de una fecha | `after:2024-01-01` |
| `related:` | Sitios parecidos | `related:example.com` |

> [!NOTE] Operadores retirados
> `cache:`, `link:`, `info:` y `+` ya no funcionan o funcionan mal. Para la versión
> guardada de una página se usa la Wayback Machine.

## Operadores de Bing

Comparte la mayoría con Google y añade algunos útiles:

| Operador | Qué hace |
| --- | --- |
| `ip:` | Webs alojadas en una IP: búsqueda inversa de dominios |
| `domain:` | Equivale a `site:` |
| `NOT` | Equivale a `-` |

## Cómo se combinan

Se encadenan operadores y se agrupan con paréntesis. Ejemplos con dominios ficticios:

```text
# Hojas de cálculo con datos de empleados en un dominio y sus subdominios
site:example.com (filetype:xlsx OR filetype:csv) (empleado OR salario OR DNI) -inurl:backup

# Directorios listables que muestran ficheros de configuración
intitle:"index of" (".env" OR "wp-config.php" OR "web.config")

# PDF con "confidencial" en el título o la URL, excluyendo subdominios
site:.edu filetype:pdf (intitle:confidencial OR inurl:confidencial) -site:blog.example.edu

# Errores de base de datos que delatan la tecnología
"You have an error in your SQL syntax" site:example.com
```

Para limitar por fecha también se puede usar *Herramientas → Período* en la web de
Google.

## Google Hacking Database

La [GHDB](https://www.exploit-db.com/google-hacking-database) de Exploit-DB recopila miles
de dorks clasificados: ficheros con contraseñas, páginas de login, dispositivos,
mensajes de error…

## Para qué sirve en una auditoría

- **Como atacante**: encontrar información filtrada por error para preparar *phishing*
  dirigido, conocer la infraestructura o hallar credenciales.
- **Como defensor**: buscar lo que la propia organización expone y retirarlo (y pedir a
  Google que lo desindexe).

> [!WARNING]
> Buscar es legal, pero **usar** lo encontrado (entrar en un panel, descargar datos
> personales) sin autorización es delito. En una auditoría, lo que aparezca se documenta
> sin explotar fuera del alcance.

## Resumen

`site:`, `filetype:`, `inurl:`, `intitle:` e `intext:` combinados con `"…"`, `OR` y `-`
permiten encontrar información expuesta. Bing añade `ip:`. La GHDB recoge dorks ya
probados.

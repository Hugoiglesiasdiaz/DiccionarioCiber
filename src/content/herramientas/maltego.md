---
titulo: Maltego
descripcion: "Herramienta gráfica de OSINT que relaciona personas, dominios, correos e infraestructura en un grafo mediante entidades y transformaciones."
tipo: herramienta
asignaturas: [hacking]
extras: [linux, windows]
etiquetas: [Maltego, OSINT, grafo, entidades, transforms, Maltego CE, reconocimiento]
actualizado: 2026-11-27
---

## Qué es

**Maltego** es una aplicación gráfica de [OSINT](../../conceptos/osint/) que representa la
información como un **grafo**: cada dato es un nodo y las relaciones entre datos son
flechas. Lo usan auditores, periodistas e investigadores.

La versión gratuita, **Maltego CE** (*Community Edition*), viene en Kali y requiere
registrarse. Limita el número de resultados de cada consulta y no se puede usar con fines
comerciales.

## Para qué sirve

- Partir de un dato (un dominio, un correo, una persona) y descubrir lo que está
  relacionado con él.
- Ver de un vistazo la infraestructura de una organización: DNS, servidores de correo,
  IP, correos, documentos archivados.
- Documentar visualmente una investigación.

## Comandos habituales

Se lanza con `maltego`. Conceptos de la interfaz:

| Elemento | Qué es |
| --- | --- |
| **Entidad** | Un tipo de dato: *Domain*, *DNS Name*, *Email Address*, *Person*, *IP Address*… |
| **Entity Palette** | Panel con las entidades, para arrastrarlas al grafo |
| **Transform** | Una consulta que, a partir de una entidad, obtiene otras relacionadas (por ejemplo, *To DNS Name - MX*) |
| **Run View** | Panel con las transformaciones disponibles para la entidad seleccionada |
| **Machine** | Una secuencia de transformaciones automática |
| **Hub** | Donde se instalan fuentes de datos (algunas gratuitas, otras de pago) |

## Ejemplo práctico

Mapa de un dominio de ejemplo:

1. Al arrancar, elegir **Maltego CE** e iniciar sesión.
2. **New** para crear un grafo vacío.
3. Buscar *Domain* en la **Entity Palette**, arrastrarla al grafo y escribir el dominio.
4. Clic derecho sobre la entidad y lanzar transformaciones: servidores DNS, registros MX,
   subdominios, correos encontrados, *snapshots* en la Wayback Machine…
5. Repetir sobre los nodos nuevos que interesen (un correo, un subdominio).
6. Cambiar la disposición del grafo para leerlo mejor y exportarlo para el informe.

## Errores típicos

> [!ERROR] Lanzar todas las transformaciones
> El grafo se llena de nodos sin interés y se gastan las consultas de la versión
> gratuita. Lanza solo las que respondan a lo que buscas.

> [!ERROR] Dar por buena cualquier relación
> Una transformación puede asociar datos de forma errónea (un correo antiguo, otra
> empresa con nombre parecido). Contrasta antes de incluirlo en el informe.

## Advertencias

> [!WARNING]
> Las transformaciones consultan servicios externos: los datos que introduces salen de tu
> equipo. No metas información confidencial del cliente.

---
# Copia este archivo a src/content/conceptos/<slug>.md
# El nombre del archivo es la URL: nmap.md → /conceptos/nmap/
titulo: Nombre de la herramienta
descripcion: Una frase (máx. 200 caracteres) que aparece en las tarjetas y en el buscador.
tipo: herramienta
# Al menos una: hacking | incidentes | produccion | forense | normativa | bastionado
asignaturas: [forense]
# Opcional: comandos | linux | windows ("herramienta" se añade sola)
extras: [comandos, linux]
# Opcional: palabras clave extra para el buscador
etiquetas: []
# Opcional: tema de una asignatura (ver TEMAS en src/data/site.ts) y posición dentro de él
# tema: forense/introduccion
# orden: 1
actualizado: 2026-01-01
borrador: true # quítalo (o pon false) para publicarla
---

## Qué es

Qué es la herramienta, quién la mantiene y en qué se basa. Dos o tres frases.

## Para qué sirve

- Caso de uso 1.
- Caso de uso 2.

## Comandos habituales

| Comando / opción | Qué hace |
| --- | --- |
| `herramienta -x` | Descripción breve. |

```bash
# Comentario: qué hace el comando (no se copia con el botón "copiar")
herramienta -x objetivo
```

## Ejemplo práctico

Escenario ficticio y pasos. Usa solo datos de ejemplo
(IPs 192.0.2.0/24, 198.51.100.0/24, 203.0.113.0/24).

```text
Salida de ejemplo (los bloques "text" se etiquetan como "salida")
```

## Errores típicos

> [!ERROR] Título del error
> Por qué pasa y cómo se soluciona.

## Advertencias

> [!WARNING]
> Riesgos legales o técnicos, buenas prácticas.

> [!TIP]
> Truco o consejo opcional.

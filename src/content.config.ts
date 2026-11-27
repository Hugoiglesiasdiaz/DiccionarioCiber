/**
 * Colecciones de contenido.
 *
 * Cada nota es un archivo Markdown:
 *   src/content/conceptos/<slug>.md  → /conceptos/<slug>/
 *   src/content/casos/<slug>.md      → /casos/<slug>/
 *
 * El esquema valida el frontmatter en cada build: si falta un campo o un
 * valor no existe (p. ej. una asignatura mal escrita), el build falla
 * indicando el archivo y el campo.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { ASIGNATURAS, EXTRAS_FRONTMATTER } from './data/site';

const asignaturaIds = ASIGNATURAS.map((a) => a.id) as [string, ...string[]];

/** Campos comunes a todas las notas. */
const base = {
  titulo: z.string().min(1),
  descripcion: z.string().min(1).max(200),
  asignaturas: z.array(z.enum(asignaturaIds)).min(1, 'Indica al menos una asignatura'),
  extras: z.array(z.enum(EXTRAS_FRONTMATTER)).default([]),
  /** Palabras clave adicionales para la búsqueda (no son filtros). */
  etiquetas: z.array(z.string()).default([]),
  actualizado: z.coerce.date(),
  /** Los borradores se ven en `npm run dev` pero no se publican. */
  borrador: z.boolean().default(false),
};

/** Los archivos que empiezan por "_" se ignoran (útil para notas a medias). */
const loader = (folder: string) => glob({ pattern: '**/[^_]*.md', base: `./src/content/${folder}` });

export const collections = {
  conceptos: defineCollection({
    loader: loader('conceptos'),
    schema: z.object({
      ...base,
      tipo: z.enum(['concepto', 'herramienta']).default('concepto'),
    }),
  }),
  casos: defineCollection({
    loader: loader('casos'),
    schema: z.object({
      ...base,
      tipo: z.literal('caso').default('caso'),
    }),
  }),
};

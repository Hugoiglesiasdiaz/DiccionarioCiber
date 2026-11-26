/**
 * Colecciones de contenido.
 *
 * Cada entrada es un archivo Markdown en src/content/<sección>/<slug>.md.
 * El esquema valida el frontmatter en cada build: si falta un campo o la
 * categoría no existe, el build falla indicando el archivo.
 */
import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES } from './data/site';

const categoryIds = CATEGORIES.map((c) => c.id) as [string, ...string[]];

/** Frontmatter común a herramientas, writeups y apuntes. */
const entrySchema = z.object({
  titulo: z.string().min(1),
  descripcion: z.string().min(1).max(200),
  categoria: z.enum(categoryIds),
  etiquetas: z.array(z.string()).default([]),
  actualizado: z.coerce.date(),
  /** Los borradores se ven en `npm run dev` pero no se publican. */
  borrador: z.boolean().default(false),
});

function collection(folder: string) {
  return defineCollection({
    loader: glob({ pattern: '**/[^_]*.md', base: `./src/content/${folder}` }),
    schema: entrySchema,
  });
}

export const collections = {
  herramientas: collection('herramientas'),
  writeups: collection('writeups'),
  apuntes: collection('apuntes'),
};

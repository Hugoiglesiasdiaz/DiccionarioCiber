/**
 * Acceso al contenido: convierte las entradas de las colecciones en un
 * formato plano (`Entry`) que usan las tarjetas, los listados y el buscador.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { SECTIONS, type CategoryId, type SectionId } from '../data/site';
import { url } from './url';

export const SECTION_IDS = Object.keys(SECTIONS) as SectionId[];

export interface Entry {
  slug: string;
  section: SectionId;
  title: string;
  category: CategoryId;
  tags: string[];
  description: string;
  /** Fecha de última actualización (YYYY-MM-DD). */
  updated: string;
  href: string;
}

export type RawEntry = CollectionEntry<SectionId>;

/** Entradas en bruto de una sección (sin borradores en producción). */
export async function getRaw(section: SectionId): Promise<RawEntry[]> {
  return getCollection(section, (e) => import.meta.env.DEV || !e.data.borrador);
}

export function toEntry(raw: RawEntry): Entry {
  const section = raw.collection;
  return {
    slug: raw.id,
    section,
    title: raw.data.titulo,
    category: raw.data.categoria as CategoryId,
    tags: raw.data.etiquetas,
    description: raw.data.descripcion,
    updated: raw.data.actualizado.toISOString().slice(0, 10),
    href: url(`${SECTIONS[section].href}${raw.id}/`),
  };
}

const byDateDesc = (a: Entry, b: Entry) => b.updated.localeCompare(a.updated);

/** Entradas de una sección, de la más reciente a la más antigua. */
export async function getEntries(section: SectionId): Promise<Entry[]> {
  return (await getRaw(section)).map(toEntry).sort(byDateDesc);
}

/** Todas las entradas de todas las secciones. */
export async function getAllEntries(): Promise<Entry[]> {
  const lists = await Promise.all(SECTION_IDS.map(getEntries));
  return lists.flat().sort(byDateDesc);
}

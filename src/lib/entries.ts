/**
 * Acceso al contenido: convierte las notas de las colecciones en un formato
 * plano (`Entry`) que usan las tarjetas, los listados y el buscador.
 */
import { getCollection, type CollectionEntry } from 'astro:content';
import { SECTIONS, type AsignaturaId, type ExtraId, type SectionId, type TipoId } from '../data/site';
import { url } from './url';

export const SECTION_IDS = Object.keys(SECTIONS) as SectionId[];

export interface Entry {
  slug: string;
  section: SectionId;
  tipo: TipoId;
  title: string;
  description: string;
  asignaturas: AsignaturaId[];
  /** Filtros extra, incluido "herramienta" si la nota es de ese tipo. */
  extras: ExtraId[];
  tags: string[];
  /** Fecha de última actualización (YYYY-MM-DD). */
  updated: string;
  href: string;
  /** Clave del tema ("forense/introduccion"), si pertenece a uno. */
  tema?: string;
  /** Posición dentro del tema. */
  orden?: number;
}

export type RawEntry = CollectionEntry<SectionId>;

/**
 * Notas en bruto de una sección. No hay borradores: lo que está en
 * src/content se publica, así que local y producción muestran lo mismo.
 */
export async function getRaw(section: SectionId): Promise<RawEntry[]> {
  return getCollection(section);
}

export function toEntry(raw: RawEntry): Entry {
  const { data } = raw;
  const extras: ExtraId[] = [...(data.tipo === 'herramienta' ? ['herramienta' as const] : []), ...data.extras];
  return {
    slug: raw.id,
    section: raw.collection,
    tipo: data.tipo,
    title: data.titulo,
    description: data.descripcion,
    asignaturas: data.asignaturas as AsignaturaId[],
    extras,
    tags: data.etiquetas,
    updated: data.actualizado.toISOString().slice(0, 10),
    href: url(`${SECTIONS[raw.collection].href}${raw.id}/`),
    tema: data.tema,
    orden: data.orden,
  };
}

const byDateDesc = (a: Entry, b: Entry) => b.updated.localeCompare(a.updated);

/** Notas de una sección, de la más reciente a la más antigua. */
export async function getEntries(section: SectionId): Promise<Entry[]> {
  return (await getRaw(section)).map(toEntry).sort(byDateDesc);
}

/**
 * Notas relacionadas: comparten al menos una asignatura con `entry`.
 * Se puntúa cada asignatura común con 2 y cada extra común con 1; a igual
 * puntuación, primero la más reciente.
 */
export function getRelated(entry: Entry, all: Entry[], limit = 3): Entry[] {
  const shared = <T,>(a: T[], b: T[]) => a.filter((x) => b.includes(x)).length;
  return all
    .filter((e) => e.href !== entry.href)
    .map((e) => ({
      e,
      asig: shared(e.asignaturas, entry.asignaturas),
      score: 2 * shared(e.asignaturas, entry.asignaturas) + shared(e.extras, entry.extras),
    }))
    .filter((r) => r.asig > 0)
    .sort((a, b) => b.score - a.score || byDateDesc(a.e, b.e))
    .slice(0, limit)
    .map((r) => r.e);
}

/** Todas las notas de todas las secciones. */
export async function getAllEntries(): Promise<Entry[]> {
  const lists = await Promise.all(SECTION_IDS.map(getEntries));
  return lists.flat().sort(byDateDesc);
}

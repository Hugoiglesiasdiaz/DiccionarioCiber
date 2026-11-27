/**
 * Configuración de MiniSearch compartida entre el build (que crea el índice)
 * y el navegador (que lo carga). Ambos lados TIENEN que usar las mismas
 * opciones; si no, `MiniSearch.loadJSON` no encontraría los términos.
 *
 * Este archivo no importa nada de Astro para poder usarse en el script del navegador.
 */
import type { AsPlainObject, Options, SearchOptions } from 'minisearch';

/** Documento tal como se indexa (un campo por zona de la nota). */
export interface IndexedDoc {
  /** `seccion/slug`, único entre colecciones. */
  id: string;
  title: string;
  tags: string;
  description: string;
  /** Títulos de sección (## y ###) de la nota. */
  headings: string;
  /** Contenido de los bloques de código y del código en línea. */
  code: string;
  /** Texto de la nota sin sintaxis Markdown (incluye el código). */
  body: string;
}

/** Minúsculas y sin tildes, para que "análisis" encuentre "analisis". */
export function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

export const INDEX_OPTIONS: Options<IndexedDoc> = {
  fields: ['title', 'tags', 'description', 'headings', 'code', 'body'],
  // Lo que se guarda en el índice no hace falta: los metadatos van en las
  // props de la página y el texto para los fragmentos en `texts`.
  storeFields: [],
  // Separa en espacios y signos; así "windows.pslist" o "--pid" se indexan
  // como "windows" + "pslist" y "pid", y se encuentran igual al buscarlos enteros.
  tokenize: (text) => text.split(/[\s\p{P}\p{S}]+/u).filter(Boolean),
  processTerm: (term) => {
    const t = normalize(term);
    return t.length > 1 ? t : null;
  },
};

/** Opciones de búsqueda: prefijos ("volat" → volatility) y erratas leves. */
export const SEARCH_OPTIONS: SearchOptions = {
  boost: { title: 4, tags: 3, description: 2, headings: 2, code: 1.5, body: 1 },
  prefix: (term) => term.length >= 2,
  fuzzy: (term) => (term.length >= 5 ? 0.2 : false),
  // Se exigen todas las palabras; si no hay resultados se reintenta con OR.
  combineWith: 'AND',
};

/** Lo que genera el endpoint /search-index.json en el build. */
export interface SearchIndexFile {
  /** Índice serializado (`JSON.stringify(miniSearch)`). */
  index: AsPlainObject;
  /** Texto plano de cada nota, para mostrar un fragmento con la coincidencia. */
  texts: Record<string, string>;
}

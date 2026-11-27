/**
 * Buscador (TypeScript sin framework).
 *
 * Búsqueda por palabras clave con MiniSearch sobre el texto completo de las
 * notas (título, etiquetas, descripción, títulos de sección, comandos y
 * cuerpo). El índice se genera en el build (/search-index.json) y se descarga
 * al abrir la página; mientras llega se usa una búsqueda simple sobre los
 * metadatos que vienen incrustados en la página.
 *
 * Antes era una isla de React. Se quitó porque el pre-empaquetado de Vite
 * podía servir al navegador la versión de producción de React con caché
 * `immutable` y romper el buscador en desarrollo ("jsxDEV is not a function").
 *
 * Futuro: búsqueda semántica con Transformers.js (ver docs/PLAN.md).
 */
import MiniSearch from 'minisearch';
import { INDEX_OPTIONS, SEARCH_OPTIONS, normalize, type IndexedDoc, type SearchIndexFile } from '../../lib/search-config';

export interface SearchDoc {
  slug: string;
  section: string;
  sectionLabel: string;
  title: string;
  tipoLabel: string;
  asignaturas: string[];
  tags: string[];
  description: string;
  href: string;
}

export interface Option {
  id: string;
  label: string;
  /** Texto completo para el tooltip (p. ej. el nombre largo de la asignatura). */
  title?: string;
  color?: string;
}

/** Datos que la página incrusta como JSON para el script. */
export interface SearchData {
  docs: SearchDoc[];
  asignaturas: Option[];
  sections: Option[];
  /** URL de /search-index.json (con el `base` del sitio ya aplicado). */
  indexUrl: string;
}

interface Hit {
  doc: SearchDoc;
  /** Términos (normalizados) que han coincidido, para resaltarlos. */
  terms: string[];
}

type IndexState =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; engine: MiniSearch<IndexedDoc>; texts: Record<string, string> };

const docId = (d: SearchDoc) => `${d.section}/${d.slug}`;
const queryTerms = (query: string) => normalize(query).split(/[\s\p{P}\p{S}]+/u).filter((t) => t.length > 1);

/** Búsqueda de reserva (índice aún sin cargar o con error): solo metadatos. */
function simpleSearch(docs: SearchDoc[], query: string): Hit[] {
  const terms = queryTerms(query);
  return docs
    .map((doc) => {
      const fields = [doc.title, doc.tags.join(' '), doc.description].map(normalize);
      const score = terms.reduce((s, t) => s + fields.reduce((f, field, i) => f + (field.includes(t) ? 3 - i : 0), 0), 0);
      return { doc, terms, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

/** ¿Empieza una palabra en la posición `i`? Evita resaltar "pid" dentro de "rapido". */
const wordStart = (text: string, i: number) => i === 0 || !/[\p{L}\p{N}]/u.test(text[i - 1]);

/** Posiciones [inicio, fin) de los términos dentro de un texto. */
function findMatches(text: string, terms: string[]): [number, number][] {
  const normalized = normalize(text);
  const ranges: [number, number][] = [];
  for (const term of terms) {
    let i = normalized.indexOf(term);
    while (i !== -1) {
      if (wordStart(normalized, i)) ranges.push([i, i + term.length]);
      i = normalized.indexOf(term, i + term.length);
    }
  }
  return ranges.sort((a, b) => a[0] - b[0]);
}

/** Crea un elemento con clase y, opcionalmente, texto. */
function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, text?: string) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/** Añade `text` a `parent` con los términos envueltos en <mark>. Sin innerHTML. */
function appendHighlighted(parent: HTMLElement, text: string, terms: string[]) {
  let pos = 0;
  for (let [start, end] of findMatches(text, terms)) {
    if (end <= pos) continue; // solapado con el anterior
    start = Math.max(start, pos);
    if (start > pos) parent.append(text.slice(pos, start));
    parent.append(el('mark', undefined, text.slice(start, end)));
    pos = end;
  }
  parent.append(text.slice(pos));
  return parent;
}

/**
 * Fragmento del cuerpo alrededor de la primera coincidencia, cortado en
 * límites de palabra. Devuelve null si no hay coincidencia en el cuerpo.
 */
function snippet(text: string, terms: string[], before = 60, after = 140): string | null {
  const first = findMatches(text, terms)[0];
  if (!first) return null;
  let start = Math.max(0, first[0] - before);
  let end = Math.min(text.length, first[1] + after);
  if (start > 0) start = text.indexOf(' ', start) + 1 || start;
  if (end < text.length) end = text.lastIndexOf(' ', end) > first[1] ? text.lastIndexOf(' ', end) : end;
  // Sin signos sueltos al principio ("…. Código" → "…Código").
  const body = text.slice(start, end).trim().replace(start > 0 ? /^[\s.,;:)\]]+/ : /^$/, '');
  return `${start > 0 ? '…' : ''}${body}${end < text.length ? '…' : ''}`;
}

export function initSearch(root: HTMLElement) {
  const data = JSON.parse(root.querySelector('[data-search-data]')!.textContent!) as SearchData;
  const { docs, asignaturas, sections, indexUrl } = data;

  const input = root.querySelector<HTMLInputElement>('[data-search-input]')!;
  const clear = root.querySelector<HTMLButtonElement>('[data-search-clear]')!;
  const count = root.querySelector<HTMLElement>('[data-search-count]')!;
  const list = root.querySelector<HTMLOListElement>('[data-search-results]')!;
  const empty = root.querySelector<HTMLElement>('[data-search-empty]')!;
  const chipGroups = root.querySelectorAll<HTMLElement>('[data-chips]');

  const docById = new Map(docs.map((d) => [docId(d), d]));
  const asignaturaById = new Map(asignaturas.map((a) => [a.id, a]));

  const state = { query: '', section: 'all', asignatura: 'all' };
  let index: IndexState = { status: 'loading' };

  /** Resultados ordenados por relevancia (o el orden original si no hay búsqueda). */
  function getHits(): Hit[] {
    if (queryTerms(state.query).length === 0) return docs.map((doc) => ({ doc, terms: [] }));
    if (index.status !== 'ready') return simpleSearch(docs, state.query);

    let results = index.engine.search(state.query, SEARCH_OPTIONS);
    // Si ninguna nota tiene todas las palabras, vale con alguna.
    if (results.length === 0) results = index.engine.search(state.query, { ...SEARCH_OPTIONS, combineWith: 'OR' });

    return results.flatMap((r) => {
      const doc = docById.get(String(r.id));
      return doc ? [{ doc, terms: r.terms }] : [];
    });
  }

  function renderResult({ doc, terms }: Hit, searching: boolean) {
    const link = el('a', 'result__link');
    link.href = doc.href;

    const path = el('span', 'result__path', `${doc.section}/`);
    path.append(el('span', undefined, doc.slug), ` · ${doc.tipoLabel.toLowerCase()}`);
    link.append(path);
    link.append(appendHighlighted(el('span', 'result__title'), doc.title, terms));
    link.append(appendHighlighted(el('span', 'result__desc'), doc.description, terms));

    // Fragmento solo si la coincidencia no se ve ya en el título o la descripción.
    const text = index.status === 'ready' ? index.texts[docId(doc)] : undefined;
    const visible = findMatches(`${doc.title} ${doc.description}`, terms).length > 0;
    const excerpt = searching && text && !visible ? snippet(text, terms) : null;
    if (excerpt) link.append(appendHighlighted(el('span', 'result__snippet'), excerpt, terms));

    const meta = el('span', 'result__meta');
    for (const id of doc.asignaturas) {
      const a = asignaturaById.get(id);
      if (!a) continue;
      const badge = el('span', 'badge', a.label);
      if (a.color) badge.style.setProperty('--c', a.color);
      if (a.title) badge.title = a.title;
      meta.append(badge);
    }
    for (const t of doc.tags) meta.append(el('span', 'tag', t));
    link.append(meta);

    const li = el('li', 'result');
    li.append(link);
    return li;
  }

  function render() {
    const searching = queryTerms(state.query).length > 0;
    const results = getHits().filter(
      ({ doc }) =>
        (state.section === 'all' || doc.section === state.section) &&
        (state.asignatura === 'all' || doc.asignaturas.includes(state.asignatura)),
    );

    clear.hidden = state.query === '';

    count.replaceChildren(`${results.length} resultado${results.length === 1 ? '' : 's'}`);
    if (searching) count.append(' para ', el('code', undefined, state.query));
    if (searching && index.status === 'loading') count.append(el('span', 'search__status', ' · cargando índice…'));
    if (index.status === 'error')
      count.append(el('span', 'search__status', ' · solo títulos y etiquetas (índice no disponible)'));

    list.replaceChildren(...results.map((hit) => renderResult(hit, searching)));
    list.hidden = results.length === 0;
    empty.hidden = results.length > 0;

    for (const group of chipGroups) {
      const value = state[group.dataset.chips as 'section' | 'asignatura'];
      for (const chip of group.querySelectorAll<HTMLButtonElement>('[data-value]')) {
        chip.setAttribute('aria-pressed', String(chip.dataset.value === value));
      }
    }

    // Mantiene la URL sincronizada sin recargar la página (permite enlazar búsquedas).
    const url = new URL(window.location.href);
    const sync = (key: string, value: string, empty: string) =>
      value && value !== empty ? url.searchParams.set(key, value) : url.searchParams.delete(key);
    sync('q', state.query, '');
    sync('seccion', state.section, 'all');
    sync('asignatura', state.asignatura, 'all');
    history.replaceState(null, '', url);
  }

  // Estado inicial desde ?q=, ?seccion= y ?asignatura=.
  const params = new URLSearchParams(window.location.search);
  const q = params.get('q');
  const s = params.get('seccion');
  const a = params.get('asignatura');
  if (q) state.query = input.value = q;
  if (s && sections.some((o) => o.id === s)) state.section = s;
  if (a && asignaturas.some((o) => o.id === a)) state.asignatura = a;
  // En el móvil no se abre el teclado si se llega con un filtro ya aplicado.
  if (!a && !s) input.focus();

  input.addEventListener('input', () => {
    state.query = input.value;
    render();
  });
  root.querySelector('form')!.addEventListener('submit', (e) => e.preventDefault());
  clear.addEventListener('click', () => {
    state.query = input.value = '';
    input.focus();
    render();
  });
  for (const group of chipGroups) {
    group.addEventListener('click', (e) => {
      const chip = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-value]');
      if (!chip) return;
      state[group.dataset.chips as 'section' | 'asignatura'] = chip.dataset.value!;
      render();
    });
  }

  render();

  // Descarga el índice precalculado una sola vez.
  fetch(indexUrl)
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<SearchIndexFile>;
    })
    .then((file) => {
      index = { status: 'ready', engine: MiniSearch.loadJS<IndexedDoc>(file.index, INDEX_OPTIONS), texts: file.texts };
    })
    .catch((error) => {
      console.error('No se pudo cargar el índice de búsqueda:', error);
      index = { status: 'error' };
    })
    .finally(render);
}

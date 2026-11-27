/**
 * Buscador (isla de React).
 *
 * Búsqueda por palabras clave con MiniSearch sobre el texto completo de las
 * notas (título, etiquetas, descripción, títulos de sección, comandos y
 * cuerpo). El índice se genera en el build (/search-index.json) y se descarga
 * al abrir la página; mientras llega se usa una búsqueda simple sobre los
 * metadatos que ya vienen en las props.
 *
 * Futuro: búsqueda semántica con Transformers.js (ver docs/PLAN.md).
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import MiniSearch from 'minisearch';
import { INDEX_OPTIONS, SEARCH_OPTIONS, normalize, type IndexedDoc, type SearchIndexFile } from '../../lib/search-config';
import './search.css';

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

interface Props {
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

type IndexState = { status: 'loading' } | { status: 'error' } | { status: 'ready'; engine: MiniSearch<IndexedDoc>; texts: Record<string, string> };

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

/** Resalta los términos dentro de un texto. */
function Highlight({ text, terms }: { text: string; terms: string[] }) {
  const ranges = findMatches(text, terms);
  if (ranges.length === 0) return <>{text}</>;

  const parts: React.ReactNode[] = [];
  let pos = 0;
  ranges.forEach(([start, end], k) => {
    if (end <= pos) return; // solapado con el anterior
    start = Math.max(start, pos);
    if (start > pos) parts.push(text.slice(pos, start));
    parts.push(<mark key={k}>{text.slice(start, end)}</mark>);
    pos = end;
  });
  parts.push(text.slice(pos));
  return <>{parts}</>;
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

function Chips({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: Option[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="chips" role="group" aria-label={label}>
      {[{ id: 'all', label: 'Todas' }, ...options].map((o) => (
        <button
          key={o.id}
          type="button"
          className="chip"
          aria-pressed={value === o.id}
          style={o.color ? ({ '--c': o.color } as React.CSSProperties) : undefined}
          title={o.title}
          onClick={() => onChange(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function SearchApp({ docs, asignaturas, sections, indexUrl }: Props) {
  const [query, setQuery] = useState('');
  const [section, setSection] = useState('all');
  const [asignatura, setAsignatura] = useState('all');
  const [index, setIndex] = useState<IndexState>({ status: 'loading' });
  const inputRef = useRef<HTMLInputElement>(null);

  // Descarga el índice precalculado una sola vez.
  useEffect(() => {
    let cancelled = false;
    fetch(indexUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<SearchIndexFile>;
      })
      .then((file) => {
        if (cancelled) return;
        const engine = MiniSearch.loadJS<IndexedDoc>(file.index, INDEX_OPTIONS);
        setIndex({ status: 'ready', engine, texts: file.texts });
      })
      .catch((error) => {
        console.error('No se pudo cargar el índice de búsqueda:', error);
        if (!cancelled) setIndex({ status: 'error' });
      });
    return () => {
      cancelled = true;
    };
  }, [indexUrl]);

  // Lee ?q=, ?seccion= y ?asignatura= de la URL al cargar (permite enlazar búsquedas).
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const s = params.get('seccion');
    const a = params.get('asignatura');
    if (q) setQuery(q);
    if (s && sections.some((o) => o.id === s)) setSection(s);
    if (a && asignaturas.some((o) => o.id === a)) setAsignatura(a);
    // En el móvil no se abre el teclado si se llega con un filtro ya aplicado.
    if (!a && !s) inputRef.current?.focus();
  }, [sections, asignaturas]);

  // Mantiene la URL sincronizada sin recargar la página.
  useEffect(() => {
    const url = new URL(window.location.href);
    const sync = (key: string, value: string, empty: string) =>
      value && value !== empty ? url.searchParams.set(key, value) : url.searchParams.delete(key);
    sync('q', query, '');
    sync('seccion', section, 'all');
    sync('asignatura', asignatura, 'all');
    history.replaceState(null, '', url);
  }, [query, section, asignatura]);

  const docById = useMemo(() => new Map(docs.map((d) => [docId(d), d])), [docs]);

  /** Resultados ordenados por relevancia (o por fecha si no hay búsqueda). */
  const hits = useMemo<Hit[]>(() => {
    if (queryTerms(query).length === 0) return docs.map((doc) => ({ doc, terms: [] }));
    if (index.status !== 'ready') return simpleSearch(docs, query);

    let results = index.engine.search(query, SEARCH_OPTIONS);
    // Si ninguna nota tiene todas las palabras, vale con alguna.
    if (results.length === 0) results = index.engine.search(query, { ...SEARCH_OPTIONS, combineWith: 'OR' });

    return results.flatMap((r) => {
      const doc = docById.get(String(r.id));
      return doc ? [{ doc, terms: r.terms }] : [];
    });
  }, [docs, docById, index, query]);

  const results = hits.filter(
    ({ doc }) =>
      (section === 'all' || doc.section === section) && (asignatura === 'all' || doc.asignaturas.includes(asignatura)),
  );

  const asignaturaById = useMemo(() => new Map(asignaturas.map((a) => [a.id, a])), [asignaturas]);
  const searching = queryTerms(query).length > 0;

  return (
    <div className="search">
      <form className="search__form" role="search" onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="search-input" className="visually-hidden">
          Buscar
        </label>
        <span className="search__prompt" aria-hidden="true">
          ❯
        </span>
        <input
          ref={inputRef}
          id="search-input"
          data-search-input
          className="search__input"
          type="search"
          placeholder="comando, herramienta o concepto…"
          autoComplete="off"
          spellCheck={false}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        {query && (
          <button type="button" className="search__clear" onClick={() => setQuery('')} aria-label="Borrar búsqueda">
            ✕
          </button>
        )}
      </form>

      <div className="search__mode">
        {/* Búsqueda semántica: implementación futura (ver docs/PLAN.md). */}
        <label className="switch switch--disabled">
          <input type="checkbox" checked={false} disabled readOnly />
          <span className="switch__track" aria-hidden="true">
            <span className="switch__thumb" />
          </span>
          <span>
            Búsqueda semántica <span className="search__ai">IA</span>
          </span>
        </label>
        <p className="search__mode-hint">
          Próximamente: encontrar notas por significado aunque no uses las mismas palabras. Ahora se busca
          por palabras clave en todo el texto, comandos incluidos.
        </p>
      </div>

      <div className="search__filters">
        <Chips label="Filtrar por sección" options={sections} value={section} onChange={setSection} />
        <Chips label="Filtrar por asignatura" options={asignaturas} value={asignatura} onChange={setAsignatura} />
      </div>

      <p className="search__count" aria-live="polite">
        {results.length} resultado{results.length === 1 ? '' : 's'}
        {searching && (
          <>
            {' '}
            para <code>{query}</code>
          </>
        )}
        {searching && index.status === 'loading' && <span className="search__status"> · cargando índice…</span>}
        {index.status === 'error' && <span className="search__status"> · solo títulos y etiquetas (índice no disponible)</span>}
      </p>

      {results.length > 0 ? (
        <ol className="results">
          {results.map(({ doc, terms }) => {
            const text = index.status === 'ready' ? index.texts[docId(doc)] : undefined;
            // Fragmento solo si la coincidencia no se ve ya en el título o la descripción.
            const visible = findMatches(`${doc.title} ${doc.description}`, terms).length > 0;
            const excerpt = searching && text && !visible ? snippet(text, terms) : null;
            return (
              <li key={docId(doc)} className="result">
                <a href={doc.href} className="result__link">
                  <span className="result__path">
                    {doc.section}/<span>{doc.slug}</span> · {doc.tipoLabel.toLowerCase()}
                  </span>
                  <span className="result__title">
                    <Highlight text={doc.title} terms={terms} />
                  </span>
                  <span className="result__desc">
                    <Highlight text={doc.description} terms={terms} />
                  </span>
                  {excerpt && (
                    <span className="result__snippet">
                      <Highlight text={excerpt} terms={terms} />
                    </span>
                  )}
                  <span className="result__meta">
                    {doc.asignaturas.map((id) => {
                      const a = asignaturaById.get(id);
                      return a ? (
                        <span key={id} className="badge" style={{ '--c': a.color } as React.CSSProperties} title={a.title}>
                          {a.label}
                        </span>
                      ) : null;
                    })}
                    {doc.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </span>
                </a>
              </li>
            );
          })}
        </ol>
      ) : (
        <p className="empty">
          <span>grep: sin coincidencias</span>
          <span>Prueba con otras palabras o quita algún filtro.</span>
        </p>
      )}
    </div>
  );
}

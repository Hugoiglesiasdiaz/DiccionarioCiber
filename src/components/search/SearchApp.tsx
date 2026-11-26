/**
 * Buscador (isla de React).
 *
 * Estado actual: maqueta funcional con una búsqueda simple por texto sobre
 * los datos de ejemplo. En el siguiente paso se sustituirá `simpleSearch`
 * por la búsqueda híbrida real:
 *   - MiniSearch (palabras clave) con índice precalculado en el build.
 *   - Transformers.js (semántica) cargado solo al activar el interruptor.
 *   - Fusión de ambos rankings (Reciprocal Rank Fusion).
 */
import { useEffect, useMemo, useRef, useState } from 'react';
import './search.css';

export interface SearchDoc {
  slug: string;
  section: string;
  sectionLabel: string;
  title: string;
  category: string;
  tags: string[];
  description: string;
  href: string;
}

export interface Option {
  id: string;
  label: string;
  color?: string;
}

interface Props {
  docs: SearchDoc[];
  categories: Option[];
  sections: Option[];
}

/** Minúsculas y sin tildes, para comparar "análisis" con "analisis". */
function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/** Búsqueda provisional: puntúa coincidencias por campo. */
function simpleSearch(docs: SearchDoc[], query: string): SearchDoc[] {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return docs;

  return docs
    .map((doc) => {
      const fields = {
        title: normalize(doc.title),
        tags: normalize(doc.tags.join(' ')),
        description: normalize(doc.description),
      };
      let score = 0;
      for (const term of terms) {
        if (fields.title.includes(term)) score += 3;
        if (fields.tags.includes(term)) score += 2;
        if (fields.description.includes(term)) score += 1;
      }
      return { doc, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.doc);
}

/** Resalta los términos buscados dentro de un texto. */
function Highlight({ text, query }: { text: string; query: string }) {
  const terms = normalize(query).split(/\s+/).filter((t) => t.length > 1);
  if (terms.length === 0) return <>{text}</>;

  const normalized = normalize(text);
  const marks: boolean[] = new Array(text.length).fill(false);
  for (const term of terms) {
    let i = normalized.indexOf(term);
    while (i !== -1) {
      marks.fill(true, i, i + term.length);
      i = normalized.indexOf(term, i + term.length);
    }
  }

  const parts: { text: string; mark: boolean }[] = [];
  for (let i = 0; i < text.length; i++) {
    const last = parts[parts.length - 1];
    if (last && last.mark === marks[i]) last.text += text[i];
    else parts.push({ text: text[i], mark: marks[i] });
  }
  return <>{parts.map((p, i) => (p.mark ? <mark key={i}>{p.text}</mark> : p.text))}</>;
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
      {[{ id: 'all', label: 'todas' }, ...options].map((o) => (
        <button
          key={o.id}
          type="button"
          className="chip"
          aria-pressed={value === o.id}
          style={o.color ? ({ '--c': o.color } as React.CSSProperties) : undefined}
          onClick={() => onChange(o.id)}
        >
          {o.label.toLowerCase()}
        </button>
      ))}
    </div>
  );
}

export default function SearchApp({ docs, categories, sections }: Props) {
  const [query, setQuery] = useState('');
  const [section, setSection] = useState('all');
  const [category, setCategory] = useState('all');
  const [semantic, setSemantic] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Lee ?q= de la URL al cargar (permite enlazar búsquedas).
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) setQuery(q);
    inputRef.current?.focus();
  }, []);

  // Mantiene la URL sincronizada sin recargar la página.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (query) params.set('q', query);
    else params.delete('q');
    const search = params.toString();
    history.replaceState(null, '', search ? `?${search}` : window.location.pathname);
  }, [query]);

  const results = useMemo(
    () =>
      simpleSearch(docs, query).filter(
        (d) => (section === 'all' || d.section === section) && (category === 'all' || d.category === category),
      ),
    [docs, query, section, category],
  );

  const categoryById = useMemo(() => new Map(categories.map((c) => [c.id, c])), [categories]);

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
        <label className="switch">
          <input type="checkbox" checked={semantic} onChange={(e) => setSemantic(e.target.checked)} />
          <span className="switch__track" aria-hidden="true">
            <span className="switch__thumb" />
          </span>
          <span>
            Búsqueda semántica <span className="search__ai">IA</span>
          </span>
        </label>
        <p className="search__mode-hint">
          {semantic
            ? 'Encuentra resultados por significado aunque no uses las mismas palabras. (Se conectará en el siguiente paso.)'
            : 'Por palabras clave: ideal para comandos y flags. Actívala para buscar por significado.'}
        </p>
      </div>

      <div className="search__filters">
        <Chips label="Filtrar por sección" options={sections} value={section} onChange={setSection} />
        <Chips label="Filtrar por categoría" options={categories} value={category} onChange={setCategory} />
      </div>

      <p className="search__count" aria-live="polite">
        {results.length} resultado{results.length === 1 ? '' : 's'}
        {query && (
          <>
            {' '}
            para <code>{query}</code>
          </>
        )}
      </p>

      {results.length > 0 ? (
        <ol className="results">
          {results.map((doc) => {
            const cat = categoryById.get(doc.category);
            return (
              <li key={`${doc.section}/${doc.slug}`} className="result">
                <a href={doc.href} className="result__link">
                  <span className="result__path">
                    {doc.section}/<span>{doc.slug}</span>
                  </span>
                  <span className="result__title">
                    <Highlight text={doc.title} query={query} />
                  </span>
                  <span className="result__desc">
                    <Highlight text={doc.description} query={query} />
                  </span>
                  <span className="result__meta">
                    {cat && (
                      <span className="badge" style={{ '--c': cat.color } as React.CSSProperties}>
                        {cat.label}
                      </span>
                    )}
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
          <span>Prueba con otras palabras o activa la búsqueda semántica.</span>
        </p>
      )}
    </div>
  );
}

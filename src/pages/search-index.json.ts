/**
 * Índice de búsqueda, generado en el build como archivo estático
 * (/search-index.json). El buscador lo descarga al abrir /buscar/ y lo carga
 * con `MiniSearch.loadJSON`, así el navegador no tiene que indexar nada.
 *
 * Incluye el texto completo de cada nota: título, etiquetas, descripción,
 * títulos de sección, comandos y cuerpo.
 */
import type { APIRoute } from 'astro';
import MiniSearch from 'minisearch';
import { getRaw, SECTION_IDS } from '../lib/entries';
import { markdownToText } from '../lib/markdown-text';
import { INDEX_OPTIONS, type IndexedDoc, type SearchIndexFile } from '../lib/search-config';

export const GET: APIRoute = async () => {
  const raws = (await Promise.all(SECTION_IDS.map(getRaw))).flat();

  const docs: IndexedDoc[] = raws.map((raw) => {
    const { headings, code, body } = markdownToText(raw.body ?? '');
    return {
      id: `${raw.collection}/${raw.id}`,
      title: raw.data.titulo,
      tags: raw.data.etiquetas.join(' '),
      description: raw.data.descripcion,
      headings,
      code,
      body,
    };
  });

  const miniSearch = new MiniSearch<IndexedDoc>(INDEX_OPTIONS);
  miniSearch.addAll(docs);

  const file: SearchIndexFile = {
    index: miniSearch.toJSON(),
    texts: Object.fromEntries(docs.map((d) => [d.id, d.body])),
  };

  return new Response(JSON.stringify(file), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};

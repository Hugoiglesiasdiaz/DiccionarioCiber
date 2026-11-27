/**
 * Extrae del Markdown de una nota los campos que indexa el buscador.
 * Solo se usa en el build (endpoint /search-index.json).
 *
 * No hace falta un parser completo: basta con separar el código, los títulos
 * y quitar la sintaxis más común para quedarnos con texto legible.
 */

export interface MarkdownText {
  headings: string;
  code: string;
  /** Texto plano en una sola línea, con el código incluido. */
  body: string;
}

const FENCE = /^```[^\n]*\n([\s\S]*?)^```/gm;
const INLINE_CODE = /`([^`\n]+)`/g;
/** Marcador que sustituye al código mientras se limpia el texto. */
const PLACEHOLDER = /\u0000(\d+)\u0000/g;

export function markdownToText(markdown: string): MarkdownText {
  const code: string[] = [];
  const headings: string[] = [];

  // 1. Se aparta el código (bloques y en línea) tras un marcador, para que sus
  //    asteriscos, guiones bajos o almohadillas no se tomen por Markdown.
  const stash = (content: string) => `\u0000${code.push(content) - 1}\u0000`;
  let text = markdown
    .replace(FENCE, (_, content: string) => `\n${stash(content)}\n`)
    .replace(INLINE_CODE, (_, content: string) => stash(content));

  // 2. Sintaxis de bloque, línea a línea.
  text = text
    .split('\n')
    .map((line) => {
      const heading = line.match(/^#{1,6}\s+(.*)$/);
      if (heading) headings.push(heading[1]);
      return line
        .replace(/^#{1,6}\s+/, '') // títulos
        .replace(/^>\s*\[!\w+\]\s*/, '') // cabecera de callout
        .replace(/^>\s?/, '') // citas
        .replace(/^\s*(?:[-*+]|\d+\.)\s+/, '') // listas
        .replace(/^\|?[\s:|-]+\|?$/, ''); // separador de tablas
    })
    .join('\n');

  // 3. Sintaxis en línea. Se pasa a una sola línea antes de quitar el énfasis,
  //    porque una cursiva puede ocupar dos líneas.
  text = text
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1') // imágenes
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1') // enlaces
    .replace(/<[^>]+>/g, ' ') // HTML suelto
    .replace(/\|/g, ' ') // celdas de tabla
    .replace(/\s+/g, ' ')
    .replace(/(\*\*|__)(.+?)\1/g, '$2') // negrita
    .replace(/(^|[\s(])[*_](\S(?:.*?\S)?)[*_](?=[\s).,:;]|$)/g, '$1$2') // cursiva
    // 4. Se devuelve el código a su sitio.
    .replace(PLACEHOLDER, (_, i: string) => ` ${code[Number(i)]} `)
    .replace(/\s+/g, ' ')
    .trim();

  return {
    headings: headings.map((h) => h.replace(PLACEHOLDER, (_, i: string) => code[Number(i)])).join(' · '),
    code: code.join('\n'),
    body: text,
  };
}

/**
 * Plugin de remark: convierte las "alertas" de GitHub en cajas destacadas.
 *
 *   > [!ERROR] Título opcional (texto plano)
 *   > Cuerpo de la caja, con **Markdown** normal.
 *
 * Genera:
 *   <aside class="callout callout--error">
 *     <p class="callout__title">[error típico]<span> Título opcional</span></p>
 *     <p>Cuerpo…</p>
 *   </aside>
 *
 * Tipos admitidos: NOTE, TIP, WARNING, ERROR (y CAUTION como alias de ERROR).
 * En GitHub se siguen viendo bien porque es su sintaxis nativa.
 */

const TYPES = {
  NOTE: { cls: 'info', label: 'nota' },
  TIP: { cls: 'tip', label: 'consejo' },
  WARNING: { cls: 'warning', label: 'advertencia' },
  ERROR: { cls: 'error', label: 'error típico' },
  CAUTION: { cls: 'error', label: 'error típico' },
};

const MARKER = /^\[!(NOTE|TIP|WARNING|ERROR|CAUTION)\][ \t]*([^\n]*)\n?/;

/** Recorre el árbol en profundidad aplicando `fn` a cada nodo. */
function walk(node, fn) {
  fn(node);
  node.children?.forEach((child) => walk(child, fn));
}

export default function remarkCallouts() {
  return (tree) => {
    walk(tree, (node) => {
      if (node.type !== 'blockquote') return;

      const first = node.children[0];
      const text = first?.type === 'paragraph' ? first.children[0] : null;
      const match = text?.type === 'text' ? MARKER.exec(text.value) : null;
      if (!match) return;

      const [whole, kind, title] = match;
      const { cls, label } = TYPES[kind];

      // Quita el marcador del primer párrafo; si queda vacío, lo elimina.
      text.value = text.value.slice(whole.length);
      if (text.value === '') first.children.shift();
      if (first.children.length === 0) node.children.shift();

      const titleNode = {
        type: 'paragraph',
        children: [],
        data: {
          hName: 'p',
          hProperties: { className: ['callout__title'] },
          hChildren: [
            { type: 'text', value: `[${label}]` },
            ...(title.trim()
              ? [{ type: 'element', tagName: 'span', properties: {}, children: [{ type: 'text', value: ` ${title.trim()}` }] }]
              : []),
          ],
        },
      };

      node.children.unshift(titleNode);
      node.data = {
        hName: 'aside',
        hProperties: { className: ['callout', `callout--${cls}`] },
      };
    });
  };
}

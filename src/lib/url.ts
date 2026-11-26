/**
 * Construye una URL interna respetando la ruta base del despliegue
 * (en GitHub Pages el sitio vive en /<nombre-del-repo>/).
 *
 * @example url('/herramientas/') → '/DiccionarioCiber/herramientas/'
 */
export function url(path = '/'): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}

/** Indica si `current` está dentro de la sección `href` (para marcar la navegación). */
export function isActive(current: string, href: string): boolean {
  const target = url(href);
  if (target === url('/')) return current === target;
  return current.startsWith(target);
}

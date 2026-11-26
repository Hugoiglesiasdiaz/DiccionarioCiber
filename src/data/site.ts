/**
 * Configuración global del sitio: identidad, navegación y categorías.
 * Es el único sitio donde hay que tocar para cambiar estos valores.
 */

export const SITE = {
  name: 'DiccionarioCiber',
  /** Texto corto con aspecto de ruta de terminal, usado como logo. */
  handle: '~/ciber',
  tagline: 'Apuntes de ciberseguridad',
  author: 'Hugo Iglesias Díaz',
  description:
    'Fichas de herramientas, writeups y apuntes de ciberseguridad para consulta rápida.',
  links: {
    github: 'https://github.com/Hugoiglesiasdiaz/DiccionarioCiber',
    /** Portfolio personal (proyecto aparte). Déjalo vacío ('') para ocultar el enlace. */
    portfolio: 'https://hugoiglesiasdiaz.es',
  },
} as const;

export type IconName = 'home' | 'tool' | 'flag' | 'book' | 'search';

export interface NavItem {
  href: string;
  label: string;
  /** Etiqueta corta para la barra inferior del móvil (si la normal no cabe). */
  short?: string;
  icon: IconName;
}

export const NAV: NavItem[] = [
  { href: '/', label: 'Inicio', icon: 'home' },
  { href: '/herramientas/', label: 'Herramientas', short: 'Fichas', icon: 'tool' },
  { href: '/writeups/', label: 'Writeups', icon: 'flag' },
  { href: '/apuntes/', label: 'Apuntes', icon: 'book' },
  { href: '/buscar/', label: 'Buscar', icon: 'search' },
];

export const CATEGORIES = [
  { id: 'forense', label: 'Forense', color: 'var(--cat-forense)' },
  { id: 'redes', label: 'Redes', color: 'var(--cat-redes)' },
  { id: 'pentesting', label: 'Pentesting', color: 'var(--cat-pentesting)' },
  { id: 'hardening', label: 'Hardening', color: 'var(--cat-hardening)' },
  { id: 'osint', label: 'OSINT', color: 'var(--cat-osint)' },
  { id: 'cripto', label: 'Criptografía', color: 'var(--cat-cripto)' },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]['id'];

export function getCategory(id: CategoryId) {
  return CATEGORIES.find((c) => c.id === id)!;
}

export const SECTIONS = {
  herramientas: {
    label: 'Herramientas',
    href: '/herramientas/',
    intro: 'Fichas de consulta rápida: qué es cada herramienta, comandos habituales, ejemplos y errores típicos.',
  },
  writeups: {
    label: 'Writeups',
    href: '/writeups/',
    intro: 'Prácticas y laboratorios explicados paso a paso. Todos los datos son ficticios.',
  },
  apuntes: {
    label: 'Apuntes',
    href: '/apuntes/',
    intro: 'Conceptos teóricos organizados por tema.',
  },
} as const;

export type SectionId = keyof typeof SECTIONS;

export interface TocItem {
  id: string;
  label: string;
}

/**
 * Secciones obligatorias (títulos ##) de cada tipo de entrada, en orden.
 * El build avisa si a una entrada le falta alguna. Ver plantillas/.
 */
export const REQUIRED_SECTIONS: Record<SectionId, string[]> = {
  herramientas: [
    'Qué es',
    'Para qué sirve',
    'Comandos habituales',
    'Ejemplo práctico',
    'Errores típicos',
    'Advertencias',
  ],
  writeups: ['Contexto', 'Entorno', 'Desarrollo', 'Conclusiones'],
  apuntes: [],
};

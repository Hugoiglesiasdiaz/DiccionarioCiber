/**
 * Configuración global del sitio: identidad, navegación, secciones,
 * asignaturas, filtros extra y tipos de nota.
 * Es el único sitio donde hay que tocar para cambiar estos valores.
 */

export const SITE = {
  name: 'DiccionarioCiber',
  /** Texto corto con aspecto de ruta de terminal, usado como logo. */
  handle: '~/ciber',
  tagline: 'Apuntes de ciberseguridad',
  author: 'Hugo Iglesias Díaz',
  description: 'Conceptos, herramientas y casos prácticos de ciberseguridad para consulta rápida.',
  links: {
    github: 'https://github.com/Hugoiglesiasdiaz/DiccionarioCiber',
    /** Portfolio personal (proyecto aparte). Déjalo vacío ('') para ocultar el enlace. */
    portfolio: 'https://hugoiglesiasdiaz.es',
  },
} as const;

/* ---------- Navegación ---------- */

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
  { href: '/conceptos/', label: 'Conceptos', icon: 'book' },
  { href: '/casos/', label: 'Casos prácticos', short: 'Casos', icon: 'flag' },
  { href: '/buscar/', label: 'Buscar', icon: 'search' },
];

/* ---------- Secciones (una colección de contenido cada una) ---------- */

export const SECTIONS = {
  conceptos: {
    label: 'Conceptos',
    href: '/conceptos/',
    intro: 'Conceptos, técnicas y herramientas que voy aprendiendo, explicados para consultarlos rápido.',
  },
  casos: {
    label: 'Casos prácticos',
    href: '/casos/',
    intro: 'Prácticas y laboratorios explicados paso a paso. Todos los datos son ficticios.',
  },
} as const;

export type SectionId = keyof typeof SECTIONS;

/* ---------- Asignaturas (filtro principal; cada nota tiene al menos una) ---------- */

export const ASIGNATURAS = [
  { id: 'hacking', nombre: 'Hacking Ético', corto: 'Hacking ético', color: 'var(--asig-hacking)' },
  { id: 'incidentes', nombre: 'Incidentes de Ciberseguridad', corto: 'Incidentes', color: 'var(--asig-incidentes)' },
  { id: 'produccion', nombre: 'Puesta en Producción Segura', corto: 'Puesta en producción', color: 'var(--asig-produccion)' },
  { id: 'forense', nombre: 'Análisis Forense Informático', corto: 'Forense', color: 'var(--asig-forense)' },
  { id: 'normativa', nombre: 'Normativa de Ciberseguridad', corto: 'Normativa', color: 'var(--asig-normativa)' },
  { id: 'bastionado', nombre: 'Bastionado de Sistemas y Redes', corto: 'Bastionado', color: 'var(--asig-bastionado)' },
] as const;

export type AsignaturaId = (typeof ASIGNATURAS)[number]['id'];

export function getAsignatura(id: AsignaturaId) {
  return ASIGNATURAS.find((a) => a.id === id)!;
}

/* ---------- Filtros extra (opcionales) ---------- */

/**
 * "Herramienta" también es un filtro extra, pero no se escribe en `extras`:
 * se deduce de `tipo: herramienta`.
 */
export const EXTRAS = [
  { id: 'herramienta', label: 'Herramienta' },
  { id: 'comandos', label: 'Comandos' },
  { id: 'linux', label: 'Linux' },
  { id: 'windows', label: 'Windows' },
] as const;

export type ExtraId = (typeof EXTRAS)[number]['id'];

/** Extras que se pueden escribir en el frontmatter (todos menos "herramienta"). */
export const EXTRAS_FRONTMATTER = ['comandos', 'linux', 'windows'] as const;

/* ---------- Tipos de nota y sus plantillas ---------- */

export const TIPOS = {
  concepto: { label: 'Concepto', section: 'conceptos' },
  herramienta: { label: 'Herramienta', section: 'conceptos' },
  caso: { label: 'Caso práctico', section: 'casos' },
} as const;

export type TipoId = keyof typeof TIPOS;

export interface TocItem {
  id: string;
  label: string;
}

/**
 * Secciones obligatorias (títulos ##) de cada tipo de nota, en orden.
 * El build avisa si a una nota le falta alguna. Ver plantillas/.
 */
export const REQUIRED_SECTIONS: Record<TipoId, string[]> = {
  concepto: [],
  herramienta: [
    'Qué es',
    'Para qué sirve',
    'Comandos habituales',
    'Ejemplo práctico',
    'Errores típicos',
    'Advertencias',
  ],
  caso: ['Contexto', 'Entorno', 'Desarrollo', 'Conclusiones'],
};

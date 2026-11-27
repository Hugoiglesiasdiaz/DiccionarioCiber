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

export type IconName = 'home' | 'tool' | 'flag' | 'book' | 'search' | 'layers';

export interface NavItem {
  href: string;
  label: string;
  /** Etiqueta corta para el móvil y pantallas estrechas (si la normal no cabe). */
  short?: string;
  icon: IconName;
}

export const NAV: NavItem[] = [
  { href: '/', label: 'Inicio', icon: 'home' },
  { href: '/asignaturas/', label: 'Asignaturas', short: 'Temario', icon: 'layers' },
  { href: '/conceptos/', label: 'Conceptos', icon: 'book' },
  { href: '/herramientas/', label: 'Herramientas', short: 'Tools', icon: 'tool' },
  { href: '/casos/', label: 'Casos prácticos', short: 'Casos', icon: 'flag' },
  { href: '/buscar/', label: 'Buscar', icon: 'search' },
];

/* ---------- Secciones (una colección de contenido cada una) ---------- */

export const SECTIONS = {
  conceptos: {
    label: 'Conceptos',
    href: '/conceptos/',
    intro: 'La teoría de cada tema: conceptos, técnicas, normas y leyes, explicados para consultarlos rápido.',
  },
  herramientas: {
    label: 'Herramientas',
    href: '/herramientas/',
    intro: 'Una nota por herramienta: qué hace, sus comandos y cómo se usa. La teoría está en Conceptos.',
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

/* ---------- Temas (bloques ordenados dentro de cada asignatura) ---------- */

export interface Tema {
  /** Identificador corto; en el frontmatter se escribe `asignatura/id`. */
  id: string;
  nombre: string;
  descripcion?: string;
}

/**
 * Temario de cada asignatura, en el orden en que se muestra.
 * Una nota se asigna a un tema con `tema: forense/introduccion` y,
 * opcionalmente, su posición dentro de él con `orden: 1`.
 * Las asignaturas sin temas muestran sus notas sin agrupar.
 */
export const TEMAS: Partial<Record<AsignaturaId, Tema[]>> = {
  hacking: [
    {
      id: 'introduccion',
      nombre: 'Conceptos de hacking ético',
      descripcion: 'Qué es el hacking ético, amenazas y vulnerabilidades, cómo se valoran y cómo es una auditoría.',
    },
    {
      id: 'osint',
      nombre: 'Recopilación de información y OSINT',
      descripcion: 'Reconocimiento pasivo: buscadores, dorks, DNS y dominios, metadatos y herramientas OSINT.',
    },
  ],
  forense: [
    {
      id: 'introduccion',
      nombre: 'Introducción',
      descripcion: 'Qué es el análisis forense, cómo se trabaja, el papel del perito y el marco legal.',
    },
    {
      id: 'adquisicion',
      nombre: 'Adquisición de evidencias',
      descripcion: 'Recoger, clonar y preservar evidencias sin alterarlas.',
    },
    {
      id: 'artefactos-windows',
      nombre: 'Artefactos de Windows',
      descripcion: 'Dónde deja rastro la actividad en un sistema Windows y cómo analizarlo.',
    },
  ],
};

/** Claves válidas para el campo `tema` del frontmatter: "forense/introduccion"… */
export const TEMA_KEYS = Object.entries(TEMAS).flatMap(([asig, temas]) =>
  (temas ?? []).map((t) => `${asig}/${t.id}`),
);

/** Datos de un tema a partir de su clave, con su número (1, 2, 3…) en el temario. */
export function getTema(key: string) {
  const [asignatura, id] = key.split('/') as [AsignaturaId, string];
  const temas = TEMAS[asignatura] ?? [];
  const index = temas.findIndex((t) => t.id === id);
  if (index === -1) return undefined;
  return { ...temas[index], key, asignatura, numero: index + 1 };
}

/* ---------- Filtros extra (opcionales) ---------- */

export const EXTRAS = [
  { id: 'comandos', label: 'Comandos' },
  { id: 'linux', label: 'Linux' },
  { id: 'windows', label: 'Windows' },
] as const;

export type ExtraId = (typeof EXTRAS)[number]['id'];

/** Extras que se pueden escribir en el frontmatter. */
export const EXTRAS_FRONTMATTER = ['comandos', 'linux', 'windows'] as const;

/* ---------- Tipos de nota y sus plantillas ---------- */

export const TIPOS = {
  concepto: { label: 'Concepto', section: 'conceptos' },
  herramienta: { label: 'Herramienta', section: 'herramientas' },
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

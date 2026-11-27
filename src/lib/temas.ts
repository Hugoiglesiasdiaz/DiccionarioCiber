/**
 * Temario de las asignaturas: agrupa las notas por tema (ver TEMAS en
 * data/site.ts) y calcula la navegación anterior/siguiente dentro de un tema.
 */
import { TEMAS, getTema, type AsignaturaId, type Tema } from '../data/site';
import type { Entry } from './entries';

export interface TemaConNotas extends Tema {
  key: string;
  /** Posición del tema en el temario (1, 2, 3…). */
  numero: number;
  notas: Entry[];
}

/** Por `orden` y, si no tienen o empatan, por título. */
const porOrden = (a: Entry, b: Entry) =>
  (a.orden ?? Infinity) - (b.orden ?? Infinity) || a.title.localeCompare(b.title, 'es');

const porTitulo = (a: Entry, b: Entry) => a.title.localeCompare(b.title, 'es');

/** Notas de un tema concreto, ordenadas. */
export function notasDelTema(key: string, entries: Entry[]): Entry[] {
  return entries.filter((e) => e.tema === key).sort(porOrden);
}

/**
 * Temario de una asignatura: sus temas con las notas de cada uno, sus
 * herramientas y casos prácticos (todos, para encontrarlos rápido) y los
 * conceptos que no están en ninguno de sus temas.
 */
export function getTemario(asignatura: AsignaturaId, entries: Entry[]) {
  const deLaAsignatura = entries.filter((e) => e.asignaturas.includes(asignatura));
  const temas: TemaConNotas[] = (TEMAS[asignatura] ?? []).map((t, i) => {
    const key = `${asignatura}/${t.id}`;
    return { ...t, key, numero: i + 1, notas: notasDelTema(key, deLaAsignatura) };
  });
  const keys = new Set(temas.map((t) => t.key));
  const deSeccion = (s: Entry['section']) => deLaAsignatura.filter((e) => e.section === s).sort(porTitulo);
  const herramientas = deSeccion('herramientas');
  const casos = deSeccion('casos');
  const sinTema = deLaAsignatura.filter(
    (e) => e.section === 'conceptos' && (!e.tema || !keys.has(e.tema)),
  );
  return { temas, herramientas, casos, sinTema, total: deLaAsignatura.length };
}

/** Posición de una nota en su tema y sus vecinas, para la navegación. */
export function getTemaNav(entry: Entry, entries: Entry[]) {
  if (!entry.tema) return undefined;
  const tema = getTema(entry.tema);
  if (!tema) return undefined;
  const notas = notasDelTema(entry.tema, entries);
  const i = notas.findIndex((e) => e.href === entry.href);
  return {
    tema,
    posicion: i + 1,
    total: notas.length,
    anterior: notas[i - 1],
    siguiente: notas[i + 1],
  };
}

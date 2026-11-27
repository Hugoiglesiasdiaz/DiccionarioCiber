/**
 * Genera public/og.png (1200×630), la imagen que se ve al compartir un
 * enlace de la web en redes o mensajería (Open Graph).
 *
 * Solo hace falta ejecutarlo si cambia el diseño o el nombre del sitio:
 *   node scripts/generar-og.mjs
 *
 * Usa `sharp`, que ya viene con Astro, para convertir el SVG a PNG (las redes
 * no aceptan SVG como imagen de vista previa).
 */
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';

const out = fileURLToPath(new URL('../public/og.png', import.meta.url));

// Colores del tema oscuro (src/styles/global.css).
const C = { bg: '#090d12', surface: '#111821', border: '#2a3a4b', text: '#d8e3ee', muted: '#8494a6', green: '#4ade80', cyan: '#22d3ee' };
const MONO = "'JetBrains Mono', Consolas, 'Cascadia Code', Menlo, monospace";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="#1e2a37" stroke-opacity="0.5"/>
    </pattern>
    <radialGradient id="glow" cx="0.85" cy="0" r="0.8">
      <stop offset="0" stop-color="${C.cyan}" stop-opacity="0.12"/>
      <stop offset="1" stop-color="${C.cyan}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${C.bg}"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>

  <!-- Ventana de terminal -->
  <rect x="80" y="80" width="1040" height="470" rx="18" fill="${C.surface}" stroke="${C.border}" stroke-width="2"/>
  <path d="M80 98a18 18 0 0 1 18-18h1004a18 18 0 0 1 18 18v42H80z" fill="#16202b"/>
  <circle cx="116" cy="110" r="8" fill="${C.border}"/>
  <circle cx="144" cy="110" r="8" fill="${C.border}"/>
  <circle cx="172" cy="110" r="8" fill="${C.border}"/>

  <g font-family="${MONO}">
    <text x="130" y="210" font-size="30" font-weight="700">
      <tspan fill="${C.green}">root@ciber</tspan><tspan fill="${C.muted}">:</tspan><tspan fill="${C.cyan}">~/ciber</tspan><tspan fill="${C.text}"> $ cat README</tspan>
    </text>
    <text x="130" y="320" font-size="76" font-weight="700" fill="#f2f7fb">DiccionarioCiber</text>
    <text x="130" y="390" font-size="34" fill="${C.muted}">Apuntes de <tspan fill="${C.green}">ciberseguridad</tspan>: conceptos,</text>
    <text x="130" y="440" font-size="34" fill="${C.muted}">herramientas, comandos y casos prácticos</text>
    <text x="130" y="505" font-size="30" fill="${C.green}">❯ <tspan fill="${C.text}">_</tspan></text>
  </g>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log(`Imagen generada: ${out}`);

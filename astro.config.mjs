// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { unified } from '@astrojs/markdown-remark';
import process from 'node:process';
import remarkCallouts from './src/lib/remark-callouts.mjs';

/**
 * Configuración de Astro.
 *
 * SITE_URL y BASE_PATH se inyectan al compilar para publicar
 * (ver .github/workflows/deploy.yml y el README):
 *   - GitHub Pages sin dominio: https://usuario.github.io + /DiccionarioCiber
 *   - Con dominio propio:       https://apuntes.ejemplo.es + /
 * En local se usan los valores por defecto. `site` hace falta para las URL
 * absolutas del sitemap, la canónica y Open Graph.
 */
export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  // Sin la barra de herramientas de Astro en `npm run dev`: así el local se ve
  // igual que la web publicada.
  devToolbar: { enabled: false },
  integrations: [
    // sitemap-index.xml con todas las páginas menos la 404.
    sitemap({ filter: (page) => !/\/404\/?$/.test(new URL(page).pathname) }),
  ],
  vite: {
    // `astro check` y `astro build` pre-empaquetan las dependencias en modo
    // producción. Cada comando usa su propia caché para que no pisen la de
    // `astro dev` (Vite las sirve al navegador con caché permanente).
    cacheDir: process.argv.includes('dev') ? 'node_modules/.vite' : 'node_modules/.vite-build',
    optimizeDeps: {
      // Pre-empaqueta MiniSearch al arrancar `npm run dev` en vez de
      // descubrirlo al abrir /buscar/ y recargar la página a mitad.
      include: ['minisearch'],
    },
  },
  markdown: {
    // Cajas destacadas con la sintaxis de alertas de GitHub (> [!TIP], > [!WARNING]…)
    processor: unified({ remarkPlugins: [remarkCallouts] }),
    shikiConfig: {
      // Dos temas: los colores oscuros van en línea y los claros como
      // variables --shiki-light, que global.css aplica con data-theme="light".
      // El fondo se sobrescribe en global.css para que encaje con el tema.
      themes: { dark: 'github-dark-default', light: 'github-light-default' },
      defaultColor: 'dark',
      wrap: false,
    },
  },
});

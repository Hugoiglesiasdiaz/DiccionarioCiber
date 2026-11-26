// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { unified } from '@astrojs/markdown-remark';
import process from 'node:process';
import remarkCallouts from './src/lib/remark-callouts.mjs';

/**
 * Configuración de Astro.
 *
 * SITE_URL y BASE_PATH se inyectan desde GitHub Actions al desplegar en
 * GitHub Pages (p. ej. https://usuario.github.io y /DiccionarioCiber).
 * En local se usan los valores por defecto.
 */
export default defineConfig({
  site: process.env.SITE_URL ?? 'http://localhost:4321',
  base: process.env.BASE_PATH ?? '/',
  trailingSlash: 'always',
  integrations: [react()],
  markdown: {
    // Cajas destacadas con la sintaxis de alertas de GitHub (> [!TIP], > [!WARNING]…)
    processor: unified({ remarkPlugins: [remarkCallouts] }),
    shikiConfig: {
      // El fondo se sobrescribe en global.css para que encaje con el tema.
      theme: 'github-dark-default',
      wrap: false,
    },
  },
});

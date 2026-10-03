import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';

// Directory routes are real index.html files on Bunny, without SPA rewrites.
export default defineConfig({
  site: 'https://napplet.run',
  output: 'static',
  trailingSlash: 'always',
  integrations: [svelte(), sitemap()],
  vite: {
    build: { target: 'es2022' },
    server: { proxy: { '/docs': { target: 'http://localhost:5174', changeOrigin: true, ws: true } } },
  },
});

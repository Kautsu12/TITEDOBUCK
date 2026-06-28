import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Troque pela URL final do projeto na Vercel (importante para SEO e sitemap).
  site: 'https://seu-dominio.vercel.app',
  integrations: [tailwind(), mdx(), sitemap()],
});

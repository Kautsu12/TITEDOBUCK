import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // Troque pela URL final do projeto na Vercel (importante para SEO).
  site: 'https://seu-dominio.vercel.app',
  integrations: [tailwind(), mdx()],
});

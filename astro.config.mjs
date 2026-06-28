import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  // URL final do projeto na Vercel (importante para SEO).
  site: 'https://tietedobuck.vercel.app',
  integrations: [tailwind(), mdx()],
});

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

const isDev = process.argv.includes('dev');

export default defineConfig({
  integrations: [
    react(),
    markdoc(),
    ...(isDev ? [keystatic()] : []),
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
  site: 'https://evergreenarchaeology.com/',
});

import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // output: 'static' is the default — all pages prerendered at build time.
  // Keystatic admin UI (/keystatic) is only available during `npm run dev`.
  // The static build (npm run build) excludes it, producing a pure static site
  // that deploys for free on GitHub Pages.
  integrations: [
    react(),
    markdoc(),
    keystatic(),
    tailwind({ applyBaseStyles: false }), // base styles handled in src/styles.css
    sitemap(),
  ],
  site: 'https://evergreenarchaeology.com', // update to your GitHub Pages URL if needed
});

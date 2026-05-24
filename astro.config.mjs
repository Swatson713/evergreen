import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Force a completely static output for GitHub Pages
  output: 'static', 
  
  integrations: [
    react(),
    markdoc(),
    // Pass the prerender flag so Keystatic doesn't require a server adapter
    keystatic({
      prerender: true
    }),
    tailwind({ applyBaseStyles: false }), 
    sitemap(),
  ],
  site: 'https://evergreenarchaeology.com', 
});

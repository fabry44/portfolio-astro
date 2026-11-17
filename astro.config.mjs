import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  output: 'static',
  // Keep the whitespace behavior of the reviewed Astro 5 build.
  compressHTML: true,
  site: 'https://fabien-roy.fr',
  integrations: [react(), sitemap({
      // on exclut mention-legales et cv
      filter: (page) =>
        !page.includes('mentions-legales/') &&
        !page.includes('/cv_fabien_roy.html')&&
        !page.includes('/cv_fabien_roy.pdf') &&
        !page.includes('/politique-confidentialite/'),
    })],
});
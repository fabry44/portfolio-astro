import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import matomo from 'astro-matomo';

export default defineConfig({
  output: 'static', // CHANGER en "static" pour éviter les erreurs Netlify
  // adapter: netlify({
  //   edge: false, // Empêche Netlify de forcer certaines optimisations côté serveur
  // }),
  site: 'https://fabien-roy.fr',
  integrations: [
    tailwind(),
    react(),
    matomo({
      enabled: import.meta.env.PROD, 
      host: "https://analytics.fabien-roy.fr/",
      setCookieDomain: "*.fabien-roy.fr",
      trackerUrl: "matomo.php",
      srcUrl: "matomo.js",
      siteId: 1,
      heartBeatTimer: 5,
      disableCookies: true,
      debug: false,
      viewTransition: {
        contentElement: "main"
      }
    }),
  ],
  build: {
    minify: true, // Désactive temporairement la minification pour tester
  },
});

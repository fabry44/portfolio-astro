import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from '@astrojs/react';
import netlify from '@astrojs/netlify';
import matomo from 'astro-matomo';

export default defineConfig({
  output: 'server',
  adapter: netlify(),
  site: 'https://fabien-roy.fr',
  integrations: [
    tailwind(),
    react(),
    matomo({
      enabled: import.meta.env.PROD, // Activer uniquement en prod
      host: "https://analytics.fabien-roy.fr/",
      setCookieDomain: "*.fabien-roy.fr",
      trackerUrl: "matomo.php", // Assurez-vous que matomo.php est bien accessible
      srcUrl: "matomo.js", // Fichier de tracking JS
      siteId: 1, // Vérifie que c'est bien l'ID de ton site Matomo
      heartBeatTimer: 5,
      disableCookies: true,
      debug: false,
      viewTransition: {
        contentElement: "main"
      }
    }),
  ],
});

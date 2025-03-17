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
      enabled: import.meta.env.PROD, // Only load in production
      host: "https://analytics.fabien-roy.fr/",
      setCookieDomain: "*.fabien-roy.fr",
      trackerUrl: "js/", // defaults to matomo.php
      srcUrl: "js/", // defaults to matomo.js
      siteId: 666,
      heartBeatTimer: 5,
      disableCookies: true,
      debug: false,
      viewTransition: {
        contentElement: "main"
      }
    }),
  ],
});

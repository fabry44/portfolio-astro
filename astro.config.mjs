import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import react from '@astrojs/react';

export default defineConfig({
  output: 'hybrid', // Permet de garder les pages statiques mais avec des routes dynamiques si besoin
  adapter: netlify(),
  integrations: [tailwind(), react()],
});

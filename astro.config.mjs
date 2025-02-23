import { defineConfig } from 'astro/config';

import tailwind from "@astrojs/tailwind";
import solidPlugin from 'vite-plugin-solid';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(),solidPlugin()],
  build: {
    rollupOptions: {
      external: ['solid-js'],
    },
  },
});

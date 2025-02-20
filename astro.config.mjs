import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import crypto from "crypto";
import dotenv from "dotenv";

// Charger les variables d'environnement depuis `.env`
dotenv.config();

// Vérifier si REBUILD_SECRET existe déjà, sinon le générer
if (!process.env.REBUILD_SECRET) {
  process.env.REBUILD_SECRET = crypto
    .createHash("sha256")
    .update(process.env.OAUTH2_CLIENT_SECRET)
    .digest("hex");
}

console.log("✅ REBUILD_SECRET généré :", process.env.REBUILD_SECRET);



export default defineConfig({
  output: "server", // Dossier de sortie
  adapter: node{}, // Utilisation de l'adaptateur Node.js
  server: {
    host: true,
    port: 4321,
  },
  integrations: [tailwind()],
});



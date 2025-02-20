import crypto from "crypto";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Charger les variables d'environnement
dotenv.config();

const secret = process.env.OAUTH2_CLIENT_SECRET;
if (!secret) {
  console.error("OAUTH2_CLIENT_SECRET n'est pas défini !");
  process.exit(1);
}

// Générer un hash sécurisé SHA-256 basé sur le client_secret
const hashedSecret = crypto.createHash("sha256").update(secret).digest("hex");

// Stocker dans un fichier .env.local
const envPath = path.resolve(process.cwd(), ".env.local");
fs.appendFileSync(envPath, `\nREBUILD_SECRET=${hashedSecret}\n`);

console.log("REBUILD_SECRET généré et ajouté à .env.local !");

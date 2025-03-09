import { exec } from 'child_process';
import wkhtmltopdf from 'wkhtmltopdf';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';

// Obtenir le chemin du répertoire courant
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, 'dist');  

// Vérifier que le dossier `dist/` existe
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// Définition des chemins des fichiers
const htmlPath = path.join(outputDir, 'cv_fabien_roy.html');
const pdfPath = path.join(outputDir, 'cv_fabien_roy.pdf');
const generateHtmlCommand = `npx resumed render --theme jsonresume-theme-macchiato/index.js --output ${htmlPath}`;

// Exécuter la commande pour générer le HTML
exec(generateHtmlCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Erreur lors de la génération du HTML: ${error.message}`);
    return;
  }
  console.log(`✅ HTML généré avec succès: ${stdout}`);

  // Vérifier si le fichier HTML a bien été créé
  if (!fs.existsSync(htmlPath)) {
    console.error("❌ Erreur : Le fichier HTML n'a pas été trouvé !");
    return;
  }

  console.log("📄 Lancement de wkhtmltopdf pour générer le PDF...");

  // Générer le PDF avec wkhtmltopdf
  wkhtmltopdf(fs.readFileSync(htmlPath, 'utf8'), { output: pdfPath }, (err) => {
    if (err) {
      console.error("❌ Erreur lors de la génération du PDF:", err);
    } else {
      console.log(`✅ PDF généré avec succès: ${pdfPath}`);
    }
  });
});

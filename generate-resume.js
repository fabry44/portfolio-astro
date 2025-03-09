import { exec } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';

// Obtenir le chemin du répertoire courant
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, 'dist');

// Vérifier que le dossier `dist/` existe
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// Commande pour générer le CV en HTML
const htmlPath = path.join(outputDir, 'cv_fabien_roy.html');
const pdfPath = path.join(outputDir, 'cv_fabien_roy.pdf');
const generateHtmlCommand = `npx resumed render --theme jsonresume-theme-macchiato/index.js --output ${htmlPath}`;

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

  console.log("📄 Lancement de Puppeteer CLI pour générer le PDF...");

  const generatePdfCommand = `puppeteer --margin-top 0 --margin-right 0 --margin-bottom 0 --margin-left 0 --format A4 print ${htmlPath} ${pdfPath}`;

  exec(generatePdfCommand, (pdfError, pdfStdout, pdfStderr) => {
    if (pdfError) {
      console.error(`❌ Erreur lors de la génération du PDF: ${pdfError.message}`);
      return;
    }
    console.log(`✅ PDF généré avec succès: ${pdfPath}`);
  });
});

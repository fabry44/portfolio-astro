import { exec } from 'child_process';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';
import puppeteer from 'puppeteer';

// Obtenir le chemin du répertoire courant
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, 'public');
const themeDir = path.join(__dirname, 'themes/jsonresume-theme-umennel/index.js');

// Vérifier que le dossier `dist/` existe
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

// Définition des chemins des fichiers
const htmlPath = path.join(outputDir, 'cv_fabien_roy.html');
const pdfPath = path.join(outputDir, 'cv_fabien_roy.pdf');

// Commande pour générer le CV en HTML
const generateHtmlCommand = `npx resumed render --theme ${themeDir} --output ${htmlPath}`;

exec(generateHtmlCommand, (error, stdout, stderr) => {
  if (error) {
    console.error(`❌ Erreur lors de la génération du HTML: ${error.message}`);
    return;
  }
  console.log(`✅ HTML généré avec succès: ${stdout}`);

  // Vérifier que le fichier HTML a bien été créé
  if (!fs.existsSync(htmlPath)) {
    console.error("❌ Erreur : Le fichier HTML n'a pas été trouvé !");
    return;
  }

  

  async function generatePdf() {
    console.log("🚀 Lancement de Puppeteer pour générer le PDF...");

    const browser = await puppeteer.launch({
      headless: true, // Mode sans interface graphique (important sur Netlify)
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // Éviter les problèmes de permissions
    });

    const page = await browser.newPage();
    await page.goto(`file://${htmlPath}`, { waitUntil: 'networkidle2' });

    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
    });

    await browser.close();
    console.log(`✅ PDF généré avec succès: ${pdfPath}`);
  }

  // Appel de la fonction pour générer le PDF
  // generatePdf().catch(error => console.error(`❌ Erreur : ${error.message}`));

  if (!fs.existsSync(pdfPath)) {
    console.error("❌ Erreur : Le fichier PDF n'a pas été généré !");
    return;
  } else {
    console.log(`📂 Le fichier PDF est bien généré : ${pdfPath}`);
  }

});

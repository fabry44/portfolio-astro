import { exec } from 'child_process';
import puppeteer from 'puppeteer-core';
import chromium from 'chrome-aws-lambda';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';

// Obtenir le chemin du répertoire courant
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(__dirname, 'dist'); // Dossier final Netlify
const themePath = path.join(__dirname, 'themes', 'jsonresume-theme-macchiato/index.js');

// Vérifier que le dossier dist/ existe
if (!fs.existsSync(distDir)) fs.mkdirSync(distDir, { recursive: true });

// Définir le chemin de sortie du CV directement dans dist/
const htmlPath = path.join(distDir, 'cv_fabien_roy.html');

// Commande pour générer le CV en HTML directement dans dist/
const generateHtmlCommand = `npx resumed render --theme jsonresume-theme-macchiato --output ${htmlPath}`;

exec(generateHtmlCommand, async (error, stdout, stderr) => {
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

  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  try {
    console.log("📄 Lancement de Puppeteer pour générer le PDF...");

    // Lancer Puppeteer avec `chrome-aws-lambda`
    const browser = await puppeteer.launch({
      args: chromium.args,
      defaultViewport: chromium.defaultViewport,
      executablePath: await chromium.executablePath || '/usr/bin/google-chrome-stable',
      headless: true,
    });

    const page = await browser.newPage();
    await page.setContent(htmlContent, { waitUntil: 'networkidle2' });

    // Générer le PDF
    const pdfPath = path.join(distDir, 'cv_fabien_roy.pdf');
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      margin: { top: '0', right: '0', bottom: '0', left: '0' },
    });

    await browser.close();
    console.log("✅ PDF généré avec succès:", pdfPath);

  } catch (error) {
    console.error("❌ Erreur lors de la génération du PDF:", error);
  }
});

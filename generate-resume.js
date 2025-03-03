import { exec } from 'child_process';
import puppeteer from 'puppeteer';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';

// Obtenir le chemin du répertoire courant
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outputDir = path.join(__dirname, 'public');  
const distDir = path.join(__dirname, 'dist'); // Dossier final Netlify

// Vérifier que les dossiers existent
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
}
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Commande pour générer le CV en HTML
const generateHtmlCommand = `npx resumed render --theme jsonresume-theme-macchiato --output ${path.join(outputDir, 'cv_fabien_roy.html')}`;

exec(generateHtmlCommand, async (error, stdout, stderr) => {
  if (error) {
    console.error(`Error generating HTML: ${error.message}`);
    return;
  }
  console.log(`HTML generated successfully: ${stdout}`);

  // Lire le fichier HTML généré
  const htmlPath = path.join(outputDir, 'cv_fabien_roy.html');
  const htmlContent = fs.readFileSync(htmlPath, 'utf8');

  // Lancer Puppeteer pour générer le PDF
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();

  // Charger la page HTML
  await page.setContent(htmlContent, { waitUntil: 'networkidle2' });

  // Générer le PDF
  await page.pdf({
    path: path.join(outputDir, 'cv_fabien_roy.pdf'),
    format: 'A4',
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  await browser.close();
  console.log('PDF generated successfully');

  // Copier les fichiers dans `dist/` pour qu'ils soient pris en compte par Netlify
  fs.copyFileSync(path.join(outputDir, 'cv_fabien_roy.html'), path.join(distDir, 'cv_fabien_roy.html'));
  fs.copyFileSync(path.join(outputDir, 'cv_fabien_roy.pdf'), path.join(distDir, 'cv_fabien_roy.pdf'));
  console.log('Files copied to dist/');
});

import { exec } from 'child_process';
import puppeteer from 'puppeteer';
import * as path from 'path';
import { fileURLToPath } from 'url';
import * as fs from 'fs';

// Obtenir le chemin du répertoire courant
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resumeJsonPath = path.join(__dirname, 'resume.json');
const outputDir = path.join(__dirname, 'public');

// Commande pour générer le CV en HTML
const generateHtmlCommand = `npx resume-cli export --theme ./themes/jsonresume-theme-macchiato --format html ${resumeJsonPath} ${path.join(outputDir, 'resume.html')}`;

// Exécuter la commande pour générer le CV en HTML
exec(generateHtmlCommand, async (error, stdout, stderr) => {
  if (error) {
    console.error(`Error generating HTML: ${error.message}`);
    return;
  }
  if (stderr) {
    console.error(`HTML generation stderr: ${stderr}`);
  }
  console.log(`HTML generated successfully: ${stdout}`);

  // Lire le fichier HTML généré
  const htmlPath = path.join(outputDir, 'resume.html');
  let htmlContent = fs.readFileSync(htmlPath, 'utf8');

  // Lancer Puppeteer pour générer le PDF
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Charger la page HTML modifiée
  await page.setContent(htmlContent, { waitUntil: 'networkidle2' });

  // Générer le PDF
  await page.pdf({
    path: path.join(outputDir, 'resume.pdf'),
    format: 'A4',
    margin: { top: '0', right: '0', bottom: '0', left: '0' },
  });

  await browser.close();
  console.log('PDF generated successfully with custom CSS');
});

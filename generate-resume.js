exec(generatePdfCommand, (pdfError, pdfStdout, pdfStderr) => {
  if (pdfError) {
      console.error(`❌ Erreur lors de la génération du PDF: ${pdfError.message}`);
      return;
  }
  console.log(`✅ PDF généré avec succès: ${pdfPath}`);

  // 🔍 Vérifier si le fichier existe avant de tenter de le copier
  if (!fs.existsSync(pdfPath)) {
      console.error("❌ Erreur : Le fichier PDF n'a pas été généré !");
      return;
  }

  // Copier les fichiers générés dans le répertoire Netlify public
  const netlifyDistDir = path.join(__dirname, 'dist'); // Dossier de publication
  const cvHtmlPublic = path.join(netlifyDistDir, 'cv_fabien_roy.html');
  const cvPdfPublic = path.join(netlifyDistDir, 'cv_fabien_roy.pdf');

  fs.copyFileSync(htmlPath, cvHtmlPublic);
  fs.copyFileSync(pdfPath, cvPdfPublic);

  console.log(`✅ CV copié dans le répertoire Netlify : ${cvHtmlPublic}`);
  console.log(`✅ PDF copié dans le répertoire Netlify : ${cvPdfPublic}`);
});

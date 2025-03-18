const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Dossiers où chercher les images
const inputFolders = [
    './public/projects/',
    './public/'
];

// Fonction pour générer les images optimisées en AVIF
const processImages = (folder) => {
    if (!fs.existsSync(folder)) {
        console.log(`⚠️ Dossier introuvable : ${folder}`);
        return;
    }

    fs.readdirSync(folder).forEach(file => {
        const inputPath = path.join(folder, file);
        const extension = path.extname(file).toLowerCase();
        const baseName = path.basename(file, extension);

        // Vérifier si c'est une image
        if (['.webp', '.jpg', '.jpeg', '.png'].includes(extension)) {
            console.log(`🔄 Traitement de ${file}...`);

            // Générer les trois tailles
            sharp(inputPath)
                .resize(320)
                .toFormat('avif')
                .toFile(path.join(folder, `${baseName}-small.avif`))
                .catch(err => console.error(`❌ Erreur sur ${file} (small) :`, err));

            sharp(inputPath)
                .resize(640)
                .toFormat('avif')
                .toFile(path.join(folder, `${baseName}-medium.avif`))
                .catch(err => console.error(`❌ Erreur sur ${file} (medium) :`, err));

            sharp(inputPath)
                .resize(1024)
                .toFormat('avif')
                .toFile(path.join(folder, `${baseName}-large.avif`))
                .then(() => console.log(`✔️ Images générées pour ${file}`))
                .catch(err => console.error(`❌ Erreur sur ${file} (large) :`, err));
        }
    });
};

// Exécuter la conversion pour chaque dossier
inputFolders.forEach(processImages);

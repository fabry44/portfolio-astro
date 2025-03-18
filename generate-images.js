import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

// Dossiers à traiter
const inputFolders = ['./public/projects/', './public/'];

// Fonction de traitement des images
const processImages = async (folder) => {
    try {
        if (!fs.existsSync(folder)) {
            console.log(`⚠️ Dossier introuvable : ${folder}`);
            return;
        }

        const files = fs.readdirSync(folder);

        for (const file of files) {
            const inputPath = path.join(folder, file);
            const extension = path.extname(file).toLowerCase();
            const baseName = path.basename(file, extension);

            if (['.webp', '.jpg', '.jpeg', '.png'].includes(extension)) {
                console.log(`🔄 Traitement de ${file}...`);

                await sharp(inputPath).resize(320).toFormat('avif').toFile(path.join(folder, `${baseName}-small.avif`));
                await sharp(inputPath).resize(640).toFormat('avif').toFile(path.join(folder, `${baseName}-medium.avif`));
                await sharp(inputPath).resize(1024).toFormat('avif').toFile(path.join(folder, `${baseName}-large.avif`));

                console.log(`✔️ Images générées pour ${file}`);
            }
        }
    } catch (err) {
        console.error(`❌ Erreur :`, err);
    }
};

// Exécuter la conversion pour chaque dossier
inputFolders.forEach(processImages);

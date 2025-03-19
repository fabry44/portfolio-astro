import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const folders = ['./public/', './public/projects/'];
const sizes = ["small", "medium", "large"];
const outputFilePath = './src/data/preload-images.json';

const imagesData = [];

async function generateImages() {
    const promises = [];

    for (const folder of folders) {
        const files = await fs.readdir(folder);

        for (const file of files) {
            if (file.match(/\.(jpg|jpeg|png|webp)$/)) {
                const baseName = file.replace(/\.(jpg|jpeg|png|webp)$/, '');

                for (const size of sizes) {
                    const outputPath = path.join(folder, `${baseName}-${size}.avif`);
                    const inputPath = path.join(folder, file);

                    const promise = sharp(inputPath)
                        .resize(size === "small" ? 320 : size === "medium" ? 640 : 1024)
                        .toFormat('avif')
                        .toFile(outputPath)
                        .then(() => {
                            // 🔥 Correction : obtenir le chemin relatif et uniformiser les séparateurs
                            let cleanPath = path.relative('./public', outputPath).replace(/\\/g, '/');
                            imagesData.push(cleanPath);
                        })
                        .catch(err => console.error(`Erreur lors de la conversion de ${inputPath} → ${outputPath}`, err));

                    promises.push(promise);
                }
            }
        }
    }

    // Attendre que toutes les images soient générées avant d'écrire le JSON
    await Promise.all(promises);

    await fs.writeFile(outputFilePath, JSON.stringify(imagesData, null, 2));
    console.log("✔ Toutes les images ont été générées et listées dans preload-images.json !");
}

// Lancer la génération d'images
generateImages().catch(console.error);

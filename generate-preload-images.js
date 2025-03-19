import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const folders = ['./public/uploads/users/', './public/uploads/projects/'];
const sizes = ["small", "medium", "large"];
const outputFilePath = './src/data/preload-images.json';

const imagesData = [];

folders.forEach((folder) => {
    fs.readdirSync(folder).forEach(file => {
        if (file.match(/\.(jpg|jpeg|png|webp)$/)) {
            const baseName = file.replace(/\.(jpg|jpeg|png|webp)$/, '');

            sizes.forEach(size => {
                const outputPath = path.join(folder, `${baseName}-${size}.avif`);
                
                sharp(path.join(folder, file))
                    .resize(size === "small" ? 320 : size === "medium" ? 640 : 1024)
                    .toFormat('avif')
                    .toFile(outputPath, (err) => {
                        if (!err) {
                            imagesData.push(outputPath.replace('./public', ''));
                        }
                    });
            });
        }
    });
});

// Sauvegarde le JSON
fs.writeFileSync(outputFilePath, JSON.stringify(imagesData, null, 2));
console.log("✔ Toutes les images ont été préchargées et listées dans preload-images.json !");

// Generate display-sized derivatives; never retouch or overwrite the source portrait.
import sharp from 'sharp';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';

const source = new URL('../public/20250331-190311-min-67eacd1e2c554977778873.webp', import.meta.url);
const bytes = await readFile(source);
const derivatives = [];
for (const width of [224, 448, 672]) {
  const target = new URL(`../public/portrait-fabien-roy-${width}.webp`, import.meta.url);
  const buffer = await sharp(bytes).resize(width, width, { fit: 'cover', position: 'centre', kernel: 'lanczos3' }).webp({ quality: 90 }).toBuffer();
  await writeFile(target, buffer);
  derivatives.push({ path: fileURLToPath(target), width, bytes: buffer.length, sha256: createHash('sha256').update(buffer).digest('hex') });
}
await mkdir(new URL('../qa-local/media-20261117/', import.meta.url), { recursive: true });
const receipt = { source: fileURLToPath(source), sourceSha256: createHash('sha256').update(bytes).digest('hex'), processing: 'center square crop; Lanczos3 resize; WebP q90; no sharpening, smoothing or face retouch', derivatives };
await writeFile(new URL('../qa-local/media-20261117/portrait-generation.json', import.meta.url), JSON.stringify(receipt, null, 2));
console.log(JSON.stringify(receipt));

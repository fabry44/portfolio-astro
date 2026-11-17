import assert from 'node:assert/strict';
import test from 'node:test';
import sharp from 'sharp';

test('Sharp encode et décode des images AVIF et WebP locales après installation sans scripts', async () => {
  // Entrée générée, de confiance : aucun fichier distant ni échantillon d'exploitation.
  const image = { create: { width: 8, height: 8, channels: 4, background: { r: 17, g: 34, b: 51, alpha: 1 } } };
  for (const format of ['avif', 'webp']) {
    const buffer = await sharp(image).toFormat(format).toBuffer();
    const metadata = await sharp(buffer).metadata();
    assert.equal(metadata.format, format === 'avif' ? 'heif' : format);
    assert.equal(metadata.width, 8);
    assert.equal(metadata.height, 8);
    assert.ok((await sharp(buffer).raw().toBuffer()).byteLength > 0);
  }
});

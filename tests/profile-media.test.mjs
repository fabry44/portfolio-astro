import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

const data = JSON.parse(await readFile(new URL('../src/data/data.json', import.meta.url), 'utf8'));

test('le portrait servi est préfiltré à la taille utile, pas réduit dix fois par le navigateur', async () => {
  const path = new URL(`../public/${data.user.img}`, import.meta.url);
  const metadata = await sharp(await readFile(path)).metadata();
  assert.ok(metadata.width <= 672, `portrait trop grand : ${metadata.width}px pour 224px affichés`);
  assert.equal(metadata.width, metadata.height, 'le recadrage carré doit être préparé à la source');
  const sources = data.user.imgSrcSet.split(',').map(value => value.trim().split(/\s+/));
  assert.deepEqual(sources.map(([, width]) => width), ['224w', '448w', '672w']);
  for (const [src, width] of sources) {
    const bytes = await readFile(new URL(`../public${src}`, import.meta.url));
    const image = await sharp(bytes).metadata();
    assert.equal(image.width, Number.parseInt(width));
    assert.equal(image.height, image.width);
    assert.ok(bytes.length < 100_000);
  }
});

test('la galerie du portfolio référence les captures actuelles dans un cadrage de carte cohérent', async () => {
  const project = data.projects.find(item => item.title === 'Portfolio personnel — Astro et React');
  assert.ok(project);
  assert.ok(project.Allimg.every(name => name.startsWith('portfolio-20261117-')), 'la galerie référence encore les anciennes captures');
  assert.equal(project.img, project.Allimg[0]);
  assert.equal(project.Allimg.length, 2);
  for (const name of project.Allimg) {
    const bytes = await readFile(new URL(`../public/projects/${name}`, import.meta.url));
    const metadata = await sharp(bytes).metadata();
    assert.equal(metadata.format, 'webp');
    assert.ok(metadata.width >= 960);
    assert.equal(metadata.width / metadata.height, 1.6);
    assert.ok(bytes.length < 300_000);
  }
});

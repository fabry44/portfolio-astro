import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('Turnstile utilise un bandeau adaptable et conserve un repli sans débordement', async () => {
  const source = await readFile('src/components/ContactSection.astro', 'utf8');
  assert.match(source, /size: widget\.clientWidth >= 300 \? 'flexible' : 'compact'/);
  assert.match(source, /#turnstile-widget\s*\{[^}]*display: grid/);
  assert.match(source, /#turnstile-widget\s*\{[^}]*margin: 1rem 0 1\.25rem/);
  assert.match(source, /action: 'contact'/);
});

test('le favicon FR est vectoriel, autonome et déclaré avec le bon type', async () => {
  const layout = await readFile('src/layouts/Layout.astro', 'utf8');
  assert.match(layout, /rel="icon" type="image\/svg\+xml" href="\/favicon-fr\.svg"/);
  const svg = await readFile('public/favicon-fr.svg', 'utf8');
  assert.match(svg, /viewBox="0 0 64 64"/);
  assert.match(svg, /<title[^>]*>FR — Fabien Roy<\/title>/);
  assert.doesNotMatch(svg, /<script|<foreignObject|<text\b|\son\w+=|href=|url\(/i);
});

import assert from 'node:assert/strict';
import test from 'node:test';
import { readFile } from 'node:fs/promises';

// Static information contract, not a legal compliance certification.
test('les informations de publication reflètent les choix explicites du responsable', async () => {
  const legal = await readFile(new URL('../src/pages/mentions-legales.astro', import.meta.url), 'utf8');
  const privacy = await readFile(new URL('../src/pages/politique-confidentialite.astro', import.meta.url), 'utf8');
  const contact = await readFile(new URL('../src/components/ContactSection.astro', import.meta.url), 'utf8');
  assert.match(legal, /Fabien Roy à titre personnel/);
  assert.match(legal, /101 2nd Street/);
  for (const text of [privacy, contact]) assert.match(text, /12 mois après le dernier échange/);
  assert.match(privacy, /suppression.*boîte mail/s);
  assert.match(privacy, /consentement/i);
  assert.match(privacy, /hors de l’Espace économique européen/);
  assert.match(privacy, /cnil.fr\/fr\/plaintes/);
  assert.doesNotMatch(legal, /entreprise individuelle|SIRET|capital social/i);
});

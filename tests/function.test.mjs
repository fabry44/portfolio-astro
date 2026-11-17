import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import contact, { config } from '../netlify/functions/contact.mjs';

test('le point d’entrée refuse la route interne et les méthodes non prévues', async () => {
  assert.equal((await contact(new Request('https://portfolio.example/.netlify/functions/contact', { method: 'POST' }))).status, 404);
  assert.equal((await contact(new Request('https://portfolio.example/api/send-contact'))).status, 405);
  assert.equal(config.path, '/api/send-contact');
  assert.deepEqual(config.rateLimit, { windowLimit: 5, windowSize: 60, aggregateBy: ['ip', 'domain'], action: 'rate_limit' });
});

test('le modèle documente toutes les variables serveur et reste fermé par défaut', async () => {
  const example = await readFile(new URL('../.env.example', import.meta.url), 'utf8');
  for (const name of ['PUBLIC_TURNSTILE_SITE_KEY', 'CONTACT_FORM_ENABLED', 'CONTACT_ALLOWED_ORIGIN', 'TURNSTILE_SECRET_KEY',
    'SMTP_HOST', 'SMTP_PORT', 'SMTP_USER', 'SMTP_PASSWORD', 'CONTACT_FROM_EMAIL', 'CONTACT_TO_EMAIL']) {
    assert.match(example, new RegExp(`^${name}=`, 'm'));
  }
  assert.match(example, /^CONTACT_FORM_ENABLED=false$/m);
});

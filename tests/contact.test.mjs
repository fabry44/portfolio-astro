import test from 'node:test';
import assert from 'node:assert/strict';

const load = () => import('../src/lib/contact/handler.mjs');

const env = {
  CONTACT_FORM_ENABLED: 'true', CONTACT_ALLOWED_ORIGIN: 'https://portfolio.example',
  TURNSTILE_SECRET_KEY: 'test-only-not-a-secret', SMTP_HOST: 'smtp.example', SMTP_PORT: '587',
  SMTP_USER: 'test-user', SMTP_PASSWORD: 'test-password',
  CONTACT_FROM_EMAIL: 'sender@example.com', CONTACT_TO_EMAIL: 'owner@example.com',
};
const payload = { firstName: 'Camille', lastName: 'Exemple', email: 'visitor@example.com',
  phone: '', message: 'Bonjour, je souhaite échanger sur un projet.', rgpd: true,
  website: '', turnstileToken: 'test-token' };
const request = (body = payload, headers = {}, method = 'POST') => new Request('https://portfolio.example/api/send-contact', {
  method, headers: { origin: env.CONTACT_ALLOWED_ORIGIN, 'content-type': 'application/json', ...headers },
  ...(method === 'POST' ? { body: typeof body === 'string' ? body : JSON.stringify(body) } : {}),
});

test('un message valide est vérifié avant un envoi au destinataire fixe, sans auto-réponse', async () => {
  const { createContactHandler } = await load();
  const events = [];
  const handler = createContactHandler(env, {
    fetcher: async (url, options) => {
      events.push('verify');
      assert.equal(url, 'https://challenges.cloudflare.com/turnstile/v0/siteverify');
      assert.equal(options.body.get('response'), payload.turnstileToken);
      return Response.json({ success: true, hostname: 'portfolio.example', action: 'contact' });
    },
    send: async (config, message) => {
      events.push('send');
      assert.equal(config.to, 'owner@example.com');
      assert.equal(message.replyTo, 'visitor@example.com');
      assert.match(message.text, /Camille/);
      assert.equal(message.to, undefined);
    },
  });
  const response = await handler(request());
  assert.equal(response.status, 200);
  assert.deepEqual(events, ['verify', 'send']);
  assert.equal((await response.json()).ok, true);
});

test('le contact reste fermé sans configuration et sans aucun appel réseau', async () => {
  const { createContactHandler } = await load();
  const handler = createContactHandler({}, {
    fetcher: () => assert.fail('appel réseau interdit'),
    send: () => assert.fail('envoi interdit'),
  });
  const response = await handler(new Request('https://portfolio.example/api/send-contact', { method: 'POST' }));
  assert.equal(response.status, 503);
  assert.equal(response.headers.get('cache-control'), 'no-store');
  assert.deepEqual(await response.json(), { error: 'Le formulaire est temporairement indisponible. Utilisez le lien email.' });
});

test('les requêtes non admissibles sont rejetées avant tout appel externe', async (t) => {
  const { createContactHandler } = await load();
  const cases = [
    ['méthode GET', request(null, {}, 'GET'), 405],
    ['origine étrangère', request(payload, { origin: 'https://attacker.example' }), 403],
    ['origine absente', request(payload, { origin: '' }), 403],
    ['type de corps', request(payload, { 'content-type': 'text/plain' }), 415],
    ['JSON incorrect', request('{'), 400],
    ['tableau JSON', request([]), 400],
    ['nom absent', request({ ...payload, firstName: '' }), 400],
    ['email invalide', request({ ...payload, email: 'not-an-email' }), 400],
    ['email avec deux arobas', request({ ...payload, email: 'a@b@example.com' }), 400],
    ['injection en-tête', request({ ...payload, email: 'a@example.com\r\nBcc:other@example.com' }), 400],
    ['consentement absent', request({ ...payload, rgpd: false }), 400],
    ['message vide', request({ ...payload, message: '  ' }), 400],
    ['message trop long', request({ ...payload, message: 'x'.repeat(5001) }), 400],
    ['honeypot', request({ ...payload, website: 'bot' }), 400],
    ['jeton absent', request({ ...payload, turnstileToken: '' }), 400],
    ['jeton trop long', request({ ...payload, turnstileToken: 'x'.repeat(2049) }), 400],
    ['corps trop grand même sans content-length', request('é'.repeat(17000)), 413],
  ];
  for (const [name, req, status] of cases) await t.test(name, async () => {
    const handler = createContactHandler(env, { fetcher: () => assert.fail('HTTP interdit'), send: () => assert.fail('mail interdit') });
    assert.equal((await handler(req)).status, status);
  });
});

test('une configuration incomplète ou dangereuse ferme le contact', async (t) => {
  const { createContactHandler } = await load();
  for (const [key, value] of [ ['CONTACT_FORM_ENABLED', 'false'], ['SMTP_USER', ''], ['TURNSTILE_SECRET_KEY', ''], ['SMTP_HOST', ''], ['SMTP_PORT', '25'],
    ['SMTP_PASSWORD', ''], ['CONTACT_ALLOWED_ORIGIN', '*'], ['CONTACT_FROM_EMAIL', 'bad'],
    ['CONTACT_TO_EMAIL', 'a@example.com,b@example.com'] ]) await t.test(key, async () => {
    const handler = createContactHandler({ ...env, [key]: value }, { fetcher: () => assert.fail('HTTP interdit') });
    assert.equal((await handler(request())).status, 503);
  });
});

test('Turnstile doit confirmer succès, domaine et action avant tout envoi', async (t) => {
  const { createContactHandler } = await load();
  for (const result of [ { success: false, 'error-codes': ['timeout-or-duplicate'] },
    { success: true, hostname: 'attacker.example', action: 'contact' },
    { success: true, hostname: 'portfolio.example', action: 'login' },
    { success: 'true', hostname: 'portfolio.example', action: 'contact' } ]) await t.test(JSON.stringify(result), async () => {
    let sends = 0;
    const handler = createContactHandler(env, { fetcher: async () => Response.json(result), send: async () => { sends++; } });
    assert.equal((await handler(request())).status, 403);
    assert.equal(sends, 0);
  });
});

test('les pannes HTTP, JSON et SMTP ne provoquent ni faux succès ni fuite', async (t) => {
  const { createContactHandler } = await load();
  const valid = () => Response.json({ success: true, hostname: 'portfolio.example', action: 'contact' });
  const scenarios = [
    [async () => { throw Error('private-provider-detail'); }, async () => assert.fail('mail'), 503],
    [async () => new Response('down', { status: 500 }), async () => assert.fail('mail'), 503],
    [async () => new Response('not JSON'), async () => assert.fail('mail'), 503],
    [async () => valid(), async () => { throw Error('smtp-password=secret'); }, 502],
  ];
  for (const [fetcher, send, status] of scenarios) await t.test(String(status), async () => {
    const response = await createContactHandler(env, { fetcher, send })(request());
    assert.equal(response.status, status);
    assert.doesNotMatch(await response.text(), /secret|private-provider-detail|visitor@example/);
  });
});

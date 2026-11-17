// Build local servi par npm run dev:contact ; aucune intégration distante activée.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
const base = 'http://127.0.0.1:4321';
const results = [];
await mkdir('qa-local', { recursive: true });
const browser = await chromium.launch({ headless: true });
try {
  for (const [label, viewport, js] of [
    ['desktop', { width: 1440, height: 1000 }, true],
    ['mobile', { width: 390, height: 844 }, true],
    ['mobile-320', { width: 320, height: 800 }, true],
    ['sans-js', { width: 390, height: 844 }, false],
  ]) {
    const context = await browser.newContext({ viewport, javaScriptEnabled: js, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [], badResponses = [], origins = new Set();
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', (response) => {
      origins.add(new URL(response.url()).origin);
      if (response.url().startsWith(base) && response.status() >= 400) badResponses.push([response.url(), response.status()]);
    });
    await page.route('**/*', (route) => route.request().method() === 'GET' ? route.continue() : route.abort());
    await page.goto(base, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('#contact').count(), 1);
    assert.equal(await page.locator('main').count(), 1);
    assert.equal(await page.locator('#cv a').count(), 2);
    assert.equal(await page.locator('#contactForm button[type=submit]').isDisabled(), true);
    assert.match(await page.locator('#contact-status').textContent(), /indisponible/);
    assert.equal(await page.locator('script[src*="turnstile"]').count(), 0);
    await page.locator('#project').scrollIntoViewIfNeeded();
    assert.equal(await page.locator('#project details').count(), 4);
    await page.locator('#project summary').first().focus();
    await page.keyboard.press('Enter');
    assert.equal(await page.locator('#project details').first().getAttribute('open'), '');
    if (js) {
      const image = page.locator('#project img').first();
      const before = await image.getAttribute('src');
      await page.getByRole('button', { name: /Capture suivante/ }).first().click();
      await page.waitForFunction((src) => document.querySelector('#project img')?.getAttribute('src') !== src, before);
      await page.locator('#toggle-dark-mode').click();
      assert.equal(await page.locator('html').evaluate((el) => el.classList.contains('dark')), true);
      await page.evaluate(() => scrollTo(0, 0));
      await page.screenshot({ path: `qa-local/${label}-dark.png`, fullPage: true });
      await page.locator('#toggle-dark-mode').click();
      const [download] = await Promise.all([page.waitForEvent('download'), page.locator('#cv a[download]').click()]);
      const path = await download.path();
      const downloaded = await readFile(path);
      const source = await readFile('public/cv/2026-11/CV-Fabien-ROY-dev-officiel.pdf');
      assert.equal(createHash('sha256').update(downloaded).digest('hex'), createHash('sha256').update(source).digest('hex'));
    }
    await page.locator('#contact').scrollIntoViewIfNeeded();
    const layout = await page.evaluate(() => ({ width: innerWidth, content: document.documentElement.scrollWidth,
      brokenImages: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.getAttribute('src')) }));
    assert.ok(layout.content <= layout.width, JSON.stringify(layout));
    assert.deepEqual(layout.brokenImages, []);
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `qa-local/${label}-light.png`, fullPage: true });
    for (const path of ['/politique-confidentialite/', '/mentions-legales/']) {
      await page.goto(base + path, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('iframe[src*="analytics"]').count(), 0);
    }
    assert.deepEqual(errors, []);
    assert.deepEqual(badResponses, []);
    results.push({ label, layout, errors, badResponses, origins: [...origins], contactDisabled: true });
    await context.close();
  }

  // Doublure explicite du widget et du POST : pas un test d’intégration Cloudflare/SMTP.
  for (const scenario of ['success', 'forbidden', 'rate-limit', 'unavailable', 'smtp-error', 'network-error', 'invalid-success']) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 } });
    const page = await context.newPage();
    let posts = 0;
    await page.route(base + '/', async (route) => {
      const response = await route.fetch();
      const html = (await response.text()).replace(/data-site-key(?:="[^"]*")?/, 'data-site-key="qa-widget-only"');
      await route.fulfill({ response, body: html });
    });
    await page.route('https://challenges.cloudflare.com/**', (route) => route.fulfill({
      contentType: 'text/javascript', body: `window.turnstile={render:(el,o)=>{window.qaWidget=o;return 'qa-widget';},reset:()=>{window.qaResets=(window.qaResets||0)+1;}};`,
    }));
    await page.route(base + '/api/send-contact', async (route) => {
      posts++;
      const data = route.request().postDataJSON();
      assert.equal(data.turnstileToken, 'qa-token');
      assert.equal(data.rgpd, true);
      if (scenario === 'network-error') return route.abort();
      const status = ({ success: 200, forbidden: 403, 'rate-limit': 429, unavailable: 503, 'smtp-error': 502, 'invalid-success': 200 })[scenario];
      await route.fulfill({ status, contentType: 'application/json', body: JSON.stringify(scenario === 'success' ? { ok: true } : { error: 'Refus de test explicite.' }) });
    });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.qaWidget);
    const button = page.locator('#contactForm button[type=submit]');
    assert.equal(await button.isDisabled(), true);
    await page.evaluate(() => window.qaWidget.callback('qa-token'));
    assert.equal(await button.isDisabled(), false);
    await page.evaluate(() => window.qaWidget['expired-callback']());
    assert.equal(await button.isDisabled(), true);
    await page.evaluate(() => window.qaWidget.callback('qa-token'));
    await page.locator('[name=firstName]').fill('Camille');
    await page.locator('[name=lastName]').fill('Exemple');
    await page.locator('[name=email]').fill('visitor@example.com');
    await page.locator('[name=message]').fill('Test fictif, aucun message réellement envoyé.');
    await page.locator('[name=rgpd]').check();
    // Deux événements dans le même tick : un seul POST doit sortir.
    await page.locator('#contactForm').evaluate((form) => {
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
    await page.waitForFunction(() => window.qaResets === 1);
    assert.equal(posts, 1);
    assert.equal(await button.isDisabled(), true);
    assert.equal(await page.locator('[name=message]').inputValue(), scenario === 'success' ? '' : 'Test fictif, aucun message réellement envoyé.');
    const status = await page.locator('#contact-status').textContent();
    assert.equal(status.includes('accepté pour envoi'), scenario === 'success');
    if (scenario === 'rate-limit') assert.match(status, /Trop de demandes/);
    results.push({ scenario, posts, reset: true, preservedOnError: scenario !== 'success', mocked: true });
    await context.close();
  }
  await writeFile('qa-local/browser-results.json', JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results, null, 2));
} finally { await browser.close(); }

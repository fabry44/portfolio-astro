// Capture actual local pages, without injected DOM or a real form submission.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const base = 'http://127.0.0.1:4321';
const dir = 'qa-local/media-20261117';
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const captures = [];
try {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce', colorScheme: 'light' });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.route('**/*', route => route.request().method() === 'GET' ? route.continue() : route.abort());
  assert.equal((await page.goto(base, { waitUntil: 'networkidle' })).status(), 200);
  await page.evaluate(() => document.fonts.ready);
  await page.locator('.profile-portrait').evaluate(el => el.decode());
  assert.equal(await page.locator('.profile-portrait').getAttribute('src'), '/portrait-fabien-roy-448.webp');
  assert.equal(await page.locator('#contactForm button[type=submit]').isDisabled(), true);
  for (const [name, section] of [['accueil', null], ['contact', '#contact']]) {
    if (section) {
      await page.locator(section).evaluate(el => {
        const header = document.querySelector('header').getBoundingClientRect().height;
        scrollTo(0, el.getBoundingClientRect().top + scrollY - header - 16);
        const overflow = document.querySelector('#contactForm button[type=submit]').getBoundingClientRect().bottom - innerHeight + 16;
        if (overflow > 0) scrollBy(0, overflow);
      });
    }
    await page.mouse.move(1439, 899);
    if (section) {
      const framing = await page.evaluate(() => ({
        titleTop: document.querySelector('#contact-title').getBoundingClientRect().top,
        headerBottom: document.querySelector('header').getBoundingClientRect().bottom,
        buttonBottom: document.querySelector('#contactForm button[type=submit]').getBoundingClientRect().bottom,
        viewport: innerHeight,
      }));
      assert.ok(framing.titleTop >= framing.headerBottom && framing.buttonBottom <= framing.viewport - 8, JSON.stringify(framing));
    }
    const png = await page.screenshot({ path: `${dir}/project-source-${name}.png` });
    const target = `public/projects/portfolio-20261117-${name}.webp`;
    const bytes = await sharp(png).webp({ quality: 90 }).toBuffer();
    await writeFile(target, bytes);
    captures.push({ target, viewport: { width: 1440, height: 900 }, section, bytes: bytes.length, sha256: createHash('sha256').update(bytes).digest('hex') });
  }
  assert.deepEqual(errors, []);
  const receipt = { base, capturedHtmlSha256: createHash('sha256').update(await readFile('dist/index.html')).digest('hex'), realRenderedPage: true, injectedDom: false, reducedMotion: true, contactDisabled: true, captures };
  await writeFile(`${dir}/project-captures.json`, JSON.stringify(receipt, null, 2));
  console.log(JSON.stringify(receipt));
} finally { await browser.close(); }

// Real media/viewport checks. No write requests or third-party integration tests.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const base = process.env.MEDIA_BASE || 'http://127.0.0.1:4321/';
const mode = process.env.MEDIA_PROXY ? 'tailnet' : 'local';
const dir = 'qa-local/media-20261117';
const data = JSON.parse(await readFile('src/data/data.json', 'utf8'));
const project = data.projects.find(item => item.title === 'Portfolio personnel — Astro et React');
const sha = value => createHash('sha256').update(value).digest('hex');
const browser = await chromium.launch({ headless: true, ...(process.env.MEDIA_PROXY ? { proxy: { server: process.env.MEDIA_PROXY } } : {}) });
await mkdir(dir, { recursive: true });
const results = [];
const cases = [];
for (const width of [390, 1440]) for (const theme of ['light', 'dark']) for (const dpr of [1, 2]) cases.push({ width, theme, dpr, js: true });
cases.push({ width: 320, theme: 'light', dpr: 1, js: true }, { width: 390, theme: 'dark', dpr: 3, js: true }, { width: 390, theme: 'light', dpr: 1, js: false });
try {
  for (const { width, theme, dpr, js } of cases) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, deviceScaleFactor: dpr, javaScriptEnabled: js, reducedMotion: 'reduce', colorScheme: theme });
    const page = await context.newPage();
    const errors = [], badResponses = [], writes = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('response', response => { if (response.url().startsWith(base) && response.status() >= 400) badResponses.push([response.url(), response.status()]); });
    await page.route('**/*', route => {
      if (route.request().method() === 'GET') return route.continue();
      writes.push(route.request().method());
      return route.abort();
    });
    assert.equal((await page.goto(base, { waitUntil: 'networkidle' })).status(), 200);
    await page.evaluate(() => document.fonts.ready);
    const portrait = page.locator('.profile-portrait');
    await portrait.evaluate(el => el.decode());
    const actualPortrait = await portrait.evaluate(el => ({ src: el.currentSrc, width: el.clientWidth, height: el.clientHeight, filter: getComputedStyle(el).filter }));
    const expectedPortrait = `portrait-fabien-roy-${224 * dpr}.webp`;
    assert.equal(actualPortrait.src, new URL(expectedPortrait, base).href);
    assert.equal(actualPortrait.width, 224);
    assert.equal(actualPortrait.height, 224);
    assert.equal(actualPortrait.filter, 'none');
    const response = await context.request.get(actualPortrait.src);
    assert.equal(response.status(), 200);
    assert.equal(sha(await response.body()), sha(await readFile(`public/${expectedPortrait}`)));
    assert.equal(await page.locator('#contactForm button[type=submit]').isDisabled(), true);
    const label = `${mode}-${width}-${theme}-${dpr}x-${js ? 'js' : 'nojs'}`;
    await portrait.screenshot({ path: `${dir}/${label}-portrait.png` });
    if (dpr === 1 && js && width !== 320) await page.screenshot({ path: `${dir}/${label}-top.png` });
    const card = page.locator('.project-card').filter({ has: page.getByRole('heading', { name: project.title, exact: true }) });
    await card.scrollIntoViewIfNeeded();
    const image = card.locator('img');
    await image.evaluate(el => el.decode());
    assert.equal(await image.getAttribute('src'), new URL(`projects/${project.Allimg[0]}`, base).pathname);
    const shown = [];
    async function checkCapture(index) {
      const expectedPath = new URL(`projects/${project.Allimg[index]}`, base).pathname;
      await card.locator(`img[src="${expectedPath}"]`).waitFor({ state: 'visible' });
      await image.evaluate(el => el.decode());
      const src = await image.getAttribute('src');
      assert.equal(src, expectedPath);
      assert.match(await image.getAttribute('alt'), new RegExp(`capture ${index + 1} sur 2$`));
      const result = await context.request.get(new URL(src, base).href);
      assert.equal(result.status(), 200);
      assert.equal(sha(await result.body()), sha(await readFile(`public/projects/${project.Allimg[index]}`)));
      shown.push(src);
    }
    await checkCapture(0);
    if (js) {
      await card.getByRole('button', { name: `Capture suivante — ${project.title}`, exact: true }).click();
      await checkCapture(1);
      if (dpr === 1 && width !== 320) await card.locator('.project-image').screenshot({ path: `${dir}/${label}-gallery-contact.png` });
      await card.getByRole('button', { name: `Capture précédente — ${project.title}`, exact: true }).click();
      await checkCapture(0);
    }
    if (dpr === 1 && js && width !== 320) {
      await card.evaluate(el => scrollTo(0, el.getBoundingClientRect().top + scrollY - document.querySelector('header').getBoundingClientRect().height - 16));
      await page.mouse.move(width - 1, 999);
      await page.screenshot({ path: `${dir}/${label}-gallery.png` });
    }
    const geometry = await page.evaluate(() => ({ width: innerWidth, content: document.documentElement.scrollWidth }));
    assert.ok(geometry.content <= geometry.width, JSON.stringify(geometry));
    assert.deepEqual(errors, []);
    assert.deepEqual(badResponses, []);
    assert.deepEqual(writes, []);
    results.push({ width, theme, dpr, js, portrait: actualPortrait, shown, geometry, errors, badResponses, writes });
    await context.close();
  }
  await writeFile(`${dir}/browser-media-${mode}.json`, JSON.stringify({ base, mode, scenarios: results.length, results }, null, 2));
  console.log(JSON.stringify({ base, mode, scenarios: results.length, allPassed: true }));
} finally { await browser.close(); }

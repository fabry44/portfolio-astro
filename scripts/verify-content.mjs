// Recette éditoriale : copie réellement rendue, cartes ouvertes et reflow.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const data = JSON.parse(await readFile('src/data/data.json', 'utf8'));
const base = process.env.CONTENT_BASE || 'http://127.0.0.1:4321';
const dir = 'qa-local/content-20261117';
const mode = process.env.CONTENT_PROXY ? 'tailnet' : 'local';
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.CONTENT_PROXY ? { proxy: { server: process.env.CONTENT_PROXY } } : {}),
});
const normalize = (text) => text.replace(/\s+/g, ' ').trim();
const results = [];
try {
  for (const width of [390, 1440]) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce', colorScheme: 'light' });
      const page = await context.newPage();
      const errors = [], badResponses = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('response', (response) => {
        if (response.url().startsWith(base) && response.status() >= 400) badResponses.push([response.url(), response.status()]);
      });
      await page.route('**/*', (route) => route.request().method() === 'GET' ? route.continue() : route.abort());
      assert.equal((await page.goto(base, { waitUntil: 'networkidle' })).status(), 200);
      await page.waitForFunction((count) => document.querySelectorAll('.project-card').length === count, data.projects.length);
      if (theme === 'dark') await page.locator('#toggle-dark-mode').click();
      await page.mouse.move(width - 1, 999);
      await page.waitForFunction(() => document.getAnimations().every((animation) => animation.playState !== 'running'));
      await page.evaluate(() => document.fonts.ready);
      const cards = page.locator('.project-card');
      for (let i = 0; i < data.projects.length; i++) {
        const card = cards.nth(i), project = data.projects[i];
        assert.equal(normalize(await card.locator('.project-title').textContent()), project.title);
        const expected = await page.evaluate((html) => new DOMParser().parseFromString(html, 'text/html').body.textContent, project.description);
        assert.equal(normalize(await card.locator('.project-description > div').textContent()), normalize(expected));
        await card.locator('summary').focus();
        await page.keyboard.press('Enter');
        assert.equal(await card.locator('details').getAttribute('open'), '');
      }
      for (const formation of data.formations) assert.ok((await page.locator('#formation').textContent()).includes(formation.degree));
      const geometry = await page.evaluate(() => ({ width: innerWidth, content: document.documentElement.scrollWidth }));
      assert.ok(geometry.content <= geometry.width, JSON.stringify(geometry));
      assert.equal(await page.locator('#contactForm button[type=submit]').isDisabled(), true);
      // Capture the real viewport: a tall element capture can stitch the sticky header through a card.
      await page.locator('#project').evaluate((el) => el.scrollIntoView({ block: 'start' }));
      await page.mouse.move(width - 1, 999);
      await page.screenshot({ path: `${dir}/${width}-${theme}-projects-open.png` });
      if (width === 1440) {
        await cards.last().evaluate((el) => {
          const header = document.querySelector('header').getBoundingClientRect().height;
          scrollTo(0, el.getBoundingClientRect().top + scrollY - header - 16);
        });
        await page.screenshot({ path: `${dir}/${width}-${theme}-projects-bottom.png` });
      }
      if (width === 390) {
        for (let i = 0; i < Math.min(2, data.projects.length); i++) await cards.nth(i).screenshot({ path: `${dir}/${width}-${theme}-project-${i + 1}.png` });
      }
      for (let i = 0; i < data.projects.length; i++) {
        await cards.nth(i).locator('summary').focus();
        await page.keyboard.press('Enter');
        assert.equal(await cards.nth(i).locator('details').getAttribute('open'), null);
      }
      assert.deepEqual(errors, []);
      assert.deepEqual(badResponses, []);
      results.push({ base, width, theme, projects: data.projects.length, renderedTextMatchesSource: true, keyboardOpenClose: true, geometry, errors, badResponses });
      await context.close();
    }
  }
  await writeFile(`${dir}/browser-content-${mode}.json`, JSON.stringify(results, null, 2));
  console.log(JSON.stringify({ base, scenarios: results.length, renderedTextMatchesSource: true, errors: 0 }));
} finally {
  await browser.close();
}

// QA du polish local : aucune requête d'écriture ou intégration distante.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { mkdir, readFile, writeFile } from 'node:fs/promises';

const base = process.env.POLISH_BASE || 'http://127.0.0.1:4321';
const dir = 'qa-local/polish-20261116';
const data = JSON.parse(await readFile('src/data/data.json', 'utf8'));
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({
  headless: true,
  ...(process.env.POLISH_PROXY ? { proxy: { server: process.env.POLISH_PROXY } } : {}),
});
const results = [];
try {
  for (const width of [320, 390, 768, 1440]) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({ viewport: { width, height: 1000 }, reducedMotion: 'reduce' });
      const page = await context.newPage();
      const errors = [], badResponses = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('response', (response) => {
        if (response.url().startsWith(base) && response.status() >= 400) badResponses.push([response.url(), response.status()]);
      });
      await page.route('**/*', (route) => route.request().method() === 'GET' ? route.continue() : route.abort());
      assert.equal((await page.goto(base, { waitUntil: 'networkidle' })).status(), 200);
      await page.waitForFunction(() => document.querySelectorAll('.project-card').length === 4);
      await page.waitForFunction(() => document.querySelectorAll('.about-copy p').length === 2);
      assert.equal((await page.locator('.profile-role').textContent()).trim(), data.user.function);
      assert.equal(await page.locator('.profile-summary').textContent(), data.user.introduction);
      for (const selector of ['.profile-details', '.contact-details']) {
        const phone = await page.locator(selector).locator('p').filter({ hasText: 'Téléphone' }).textContent();
        assert.equal(phone.replace(/\D/g, ''), data.user.phone);
      }
      assert.match(await page.title(), /PHP \/ Symfony et Astro/);
      assert.ok(!(await page.locator('.profile-intro').textContent()).includes('EN RECHERCHE ACTIVE'));
      if (theme === 'dark') await page.locator('#toggle-dark-mode').click();
      await page.mouse.move(width - 1, 999);
      await page.waitForFunction(() => document.getAnimations().every((animation) => animation.playState !== 'running'));
      await page.evaluate(() => document.fonts.ready);
      const geometry = await page.evaluate(() => {
        const rect = (el) => { const { x, y, width, height } = el.getBoundingClientRect(); return { x, y, width, height }; };
        const header = document.querySelector('header');
        const toggle = document.querySelector('#toggle-dark-mode');
        return {
          width: innerWidth, content: document.documentElement.scrollWidth,
          header: rect(header), toggle: rect(toggle),
          targets: [...header.querySelectorAll('a,button')].map(rect),
          columns: getComputedStyle(document.querySelector('.project-grid')).gridTemplateColumns.split(' ').length,
          opacity: getComputedStyle(header).opacity,
          imageRatio: (() => { const r = rect(document.querySelector('.project-image')); return r.width / r.height; })(),
          brokenImages: [...document.images].filter((i) => i.complete && !i.naturalWidth).map((i) => i.getAttribute('src')),
        };
      });
      assert.ok(geometry.content <= width, JSON.stringify(geometry));
      assert.ok(geometry.targets.every((r) => r.height >= 44 && r.width >= 44));
      assert.ok(geometry.toggle.y >= geometry.header.y && geometry.toggle.y + geometry.toggle.height <= geometry.header.y + geometry.header.height);
      assert.equal(geometry.opacity, '1');
      assert.equal(geometry.columns, width < 768 ? 1 : 2);
      assert.ok(Math.abs(geometry.imageRatio - 1.6) < .02);
      assert.deepEqual(geometry.brokenImages, []);
      assert.equal(await page.locator('#contactForm button[type=submit]').isDisabled(), true);
      assert.ok(await page.locator('#contact-status').evaluate((el) => el.getBoundingClientRect().top < document.querySelector('#contactForm input').getBoundingClientRect().top));
      const contrasts = await page.evaluate(() => {
        const rgba = (s) => (s.match(/[\d.]+/g) || []).map(Number);
        const blend = (front, back) => front.slice(0, 3).map((v, i) => v * (front[3] ?? 1) + back[i] * (1 - (front[3] ?? 1)));
        const bg = (el) => {
          const color = rgba(getComputedStyle(el).backgroundColor);
          const under = el.parentElement ? bg(el.parentElement) : [255, 255, 255];
          return blend(color, under);
        };
        const lum = (rgb) => rgb.map((v) => { const c = v / 255; return c <= .04045 ? c / 12.92 : ((c + .055) / 1.055) ** 2.4; }).reduce((a, c, i) => a + c * [.2126, .7152, .0722][i], 0);
        return [...document.querySelectorAll('.profile-name,.profile-role,.profile-details,#cv,.project-title,.project-description summary,.project-actions a,.technoIcon,#contactForm label,#contact-status,.contact-details,footer.sectionFooter,header a')].map((el) => {
          const cs = getComputedStyle(el), a = lum(rgba(cs.color)), b = lum(bg(el));
          const large = parseFloat(cs.fontSize) >= 24 || (parseFloat(cs.fontSize) >= 18.66 && parseInt(cs.fontWeight) >= 700);
          return { element: el.tagName + '.' + el.className, ratio: (Math.max(a, b) + .05) / (Math.min(a, b) + .05), required: large ? 3 : 4.5 };
        });
      });
      assert.deepEqual(contrasts.filter((c) => c.ratio < c.required), [], 'Contraste sur les surfaces sélectionnées');
      await page.locator('header a').first().focus();
      await page.keyboard.press('Tab');
      assert.ok(await page.evaluate(() => document.activeElement?.matches('header a') && getComputedStyle(document.activeElement).outlineStyle !== 'none'));
      await page.locator('header a[href$="#about"]').click();
      assert.ok(await page.locator('#about').evaluate((el) => el.getBoundingClientRect().top >= document.querySelector('header').getBoundingClientRect().bottom - 1));
      await page.getByRole('button', { name: /Capture suivante/ }).first().focus();
      const before = await page.locator('#project img').first().getAttribute('src');
      await page.keyboard.press('Enter');
      await page.waitForFunction((src) => document.querySelector('#project img').getAttribute('src') !== src, before);
      const reduced = await page.locator('.project-card').first().evaluate((el) => getComputedStyle(el).transitionDuration);
      assert.ok(reduced.split(',').every((d) => parseFloat(d) <= .00001));
      if (width === 390 || width === 1440) {
        for (const section of ['accueil', 'project', 'contact']) {
          if (section === 'accueil') await page.evaluate(() => scrollTo(0, 0));
          else await page.locator('#' + section).evaluate((el) => el.scrollIntoView({ block: 'start' }));
          await page.mouse.move(width - 1, 999);
          await page.screenshot({ path: `${dir}/${width}-${theme}-${section}.png` });
        }
      }
      assert.deepEqual(errors, []);
      assert.deepEqual(badResponses, []);
      results.push({ width, theme, geometry, minimumContrast: Math.min(...contrasts.map((c) => c.ratio)), keyboard: true, reducedMotion: true, errors, badResponses });
      await context.close();
    }
  }
  // Reflow équivalent à une largeur CSS de 320 px, avec texte doublé.
  const context = await browser.newContext({ viewport: { width: 320, height: 1000 }, reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.documentElement.style.fontSize = '200%');
  const reflow = await page.evaluate(() => ({ width: innerWidth, content: document.documentElement.scrollWidth }));
  assert.ok(reflow.content <= reflow.width, JSON.stringify(reflow));
  results.push({ textResize200: true, reflow });
  await context.close();
  await writeFile(`${dir}/browser-polish.json`, JSON.stringify(results, null, 2));
  console.log(JSON.stringify({ scenarios: results.length, widths: [320, 390, 768, 1440], themes: ['light', 'dark'], textResize200: true, errors: 0 }));
} finally {
  await browser.close();
}

// Layout regression with a labelled widget double: no Cloudflare/SMTP integration and no POST.
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
import { mkdir, writeFile } from 'node:fs/promises';
const base = process.env.PRESENTATION_BASE || 'http://127.0.0.1:4351';
const dir = 'qa-local/contact-presentation-20261119';
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || chromium.executablePath() });
const results = [];
try {
  for (const width of [320, 360, 390, 768, 1440]) for (const theme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width, height: 1000 }, colorScheme: theme, reducedMotion: 'reduce' });
    await context.addInitScript(theme => localStorage.setItem('theme', theme), theme);
    const page = await context.newPage();
    const errors = [], writes = [];
    page.on('pageerror', e => errors.push(e.message));
    await page.route('**/*', async route => {
      const request = route.request();
      if (request.method() !== 'GET') { writes.push(request.method()); return route.abort(); }
      if (request.url() === base + '/') {
        const response = await route.fetch();
        const body = (await response.text()).replace(/data-site-key(?:="[^"]*")?/, 'data-site-key="qa-layout-only"');
        return route.fulfill({ response, body });
      }
      if (request.url().startsWith('https://challenges.cloudflare.com/turnstile/')) return route.fulfill({
        contentType: 'text/javascript', body: `window.turnstile={render:(el,options)=>{
          window.qaWidget=options;const host=document.createElement('div');host.style.width=options.size==='flexible'?'100%':'150px';
          const shadow=host.attachShadow({mode:'open'});const frame=document.createElement('iframe');
          frame.title='Doublure QA du widget';frame.style.cssText='display:block;width:100%;border:0;height:'+(options.size==='compact'?'140':'65')+'px';
          frame.srcdoc='<body style="margin:0;background:#fafafa;color:#222;font:12px sans-serif;display:flex;align-items:center;justify-content:center;height:100vh">Protection anti-spam — doublure QA</body>';
          shadow.append(frame);el.append(host);return 'qa-layout';},reset:()=>{}};`,
      });
      return route.continue();
    });
    await page.goto(base, { waitUntil: 'networkidle' });
    await page.waitForFunction(() => window.qaWidget);
    await page.locator('#contactForm').scrollIntoViewIfNeeded();
    const metrics = await page.evaluate(() => {
      const widget = document.querySelector('#turnstile-widget');
      const rect = e => { const r = e.getBoundingClientRect(); return { x:r.x, y:r.y, width:r.width, height:r.height }; };
      return { size:window.qaWidget.size, action:window.qaWidget.action, widget:rect(widget),
        host:rect(widget.firstElementChild), button:rect(document.querySelector('#contactForm button[type=submit]')),
        pageWidth:document.documentElement.scrollWidth, viewport:innerWidth };
    });
    assert.equal(metrics.size, metrics.widget.width >= 300 ? 'flexible' : 'compact');
    assert.equal(metrics.action, 'contact');
    assert.ok(metrics.host.x >= metrics.widget.x - 1);
    assert.ok(metrics.host.x + metrics.host.width <= metrics.widget.x + metrics.widget.width + 1);
    assert.ok(metrics.button.y >= metrics.host.y + metrics.host.height + 16);
    assert.ok(metrics.pageWidth <= width);
    assert.equal(await page.locator('#contactForm button[type=submit]').isDisabled(), true);
    const icon = await page.locator('link[rel=icon]').getAttribute('href');
    assert.equal(icon, '/favicon-fr.svg');
    assert.equal((await context.request.get(base + icon)).status(), 200);
    assert.deepEqual(errors, []); assert.deepEqual(writes, []);
    if ([320, 390, 1440].includes(width)) await page.locator('#contactForm').screenshot({ path: `${dir}/${width}-${theme}.png` });
    results.push({ width, theme, metrics, errors, writes, mockedWidget: true });
    await context.close();
  }
  const page = await browser.newPage({ viewport: { width: 480, height: 220 } });
  await page.setContent(`<body style="margin:0;display:flex;font:14px sans-serif">${['#fcfcfc','#272727'].map(color => `<section style="background:${color};color:${color==='#fcfcfc'?'#272727':'#fcfcfc'};width:240px;height:220px;padding:20px;box-sizing:border-box">Favicon FR<div style="display:flex;align-items:center;gap:20px;margin-top:30px">${[16,32,64].map(size=>`<img src="${base}/favicon-fr.svg" width="${size}" height="${size}" alt="FR ${size}px">`).join('')}</div></section>`).join('')}</body>`);
  await page.locator('img').evaluateAll(images => Promise.all(images.map(i => i.decode())));
  await page.screenshot({ path: `${dir}/favicon-sizes.png` });
  await writeFile(`${dir}/results.json`, JSON.stringify({ base, scenarios: results.length, results }, null, 2));
  console.log(JSON.stringify({ scenarios: results.length, allPassed: true, mockedWidget: true, mailSent: false }));
} finally { await browser.close(); }

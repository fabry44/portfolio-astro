// Preview loopback du build. Contact TOUJOURS fermé ; aucun secret chargé.
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { resolve, sep, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createContactHandler } from '../src/lib/contact/handler.mjs';

const root = resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const handler = createContactHandler({});
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.pdf': 'application/pdf', '.webp': 'image/webp', '.avif': 'image/avif', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.xml': 'application/xml', '.txt': 'text/plain' };
const port = Number(process.env.PORT || 4321);
createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://127.0.0.1:${port}`);
    if (url.pathname === '/api/send-contact') {
      const result = await handler(new Request(url, { method: req.method }));
      res.writeHead(result.status, Object.fromEntries(result.headers));
      res.end(await result.text());
      return;
    }
    if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
    let path = resolve(root, '.' + decodeURIComponent(url.pathname));
    if (path !== root && !path.startsWith(root + sep)) throw new Error('path');
    if ((await stat(path)).isDirectory()) path = resolve(path, 'index.html');
    const content = await readFile(path);
    res.writeHead(200, {
      'content-type': types[extname(path)] || 'application/octet-stream',
      'cache-control': url.pathname.startsWith('/_astro/') ? 'public, max-age=31536000, immutable' : 'public, max-age=0, must-revalidate',
      'x-content-type-options': 'nosniff',
    });
    res.end(req.method === 'HEAD' ? undefined : content);
  } catch { res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' }); res.end('Not found'); }
}).listen(port, '127.0.0.1', () => console.log(`Preview locale : http://127.0.0.1:${port} — contact fermé, aucun envoi.`));

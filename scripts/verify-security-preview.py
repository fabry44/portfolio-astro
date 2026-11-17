"""Vérification GET de la preview privée, sans envoi ni mutation distante."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin
import hashlib
import json
import os
import subprocess

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / os.environ.get('PREVIEW_OUTPUT', 'qa-local/security-20261117')
BASE = os.environ.get('PREVIEW_BASE', '')
PROXY = os.environ.get('PREVIEW_SOCKS', '')
if not BASE.startswith('https://') or not BASE.endswith('/'):
    raise ValueError('PREVIEW_BASE doit préciser la racine HTTPS de la preview, avec un slash final.')
OUT.mkdir(parents=True, exist_ok=True)


class Assets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.elements = []

    def handle_starttag(self, tag, attrs):
        self.elements.append((tag, dict(attrs)))


def get(path, name):
    url = urljoin(BASE, path)
    assert url.startswith(BASE), url
    headers_path, body_path = OUT / f'{name}.headers', OUT / f'{name}.body'
    response = subprocess.run([
        'curl', *(['--socks5-hostname', PROXY] if PROXY else []), '--silent', '--show-error',
        '--max-time', '20', '--dump-header', str(headers_path),
        '--output', str(body_path), '--write-out', '%{http_code} %{ssl_verify_result}', url,
    ], capture_output=True, text=True, check=True)
    status, tls = map(int, response.stdout.split())
    assert tls == 0
    headers = dict(
        (line.split(':', 1)[0].lower(), line.split(':', 1)[1].strip())
        for line in headers_path.read_text().splitlines() if ':' in line
    )
    return status, headers, body_path.read_bytes()


status, headers, body = get('', 'https-home')
assert status == 200
sha = hashlib.sha256((ROOT / 'dist/index.html').read_bytes()).hexdigest()
assert headers.get('x-portfolio-source-sha256') == sha
html = body.decode()
assets = Assets()
assets.feed(html)
package = json.loads((ROOT / 'package.json').read_text())
data = json.loads((ROOT / 'src/data/data.json').read_text())
version, phone = package['dependencies']['astro'], data['user']['phone']
assert f'Astro v{version}' in html
assert html.count(phone) == 2
assert '0650262098' not in html
# HTMLParser accepte les attributs quotés ou non ; Astro 7 peut minifier les deux.
css = next(a['href'] for tag, a in assets.elements if tag == 'link' and a.get('rel') == 'stylesheet')
status, css_headers, css_body = get(css, 'https-css')
assert status == 200 and css_headers.get('content-type', '').startswith('text/css')
assert b'.project-grid' in css_body
# Les scripts de page peuvent être inline : suivre le renderer réellement émis.
script = next(a['renderer-url'] for tag, a in assets.elements if tag == 'astro-island')
status, js_headers, js_body = get(script, 'https-js')
assert status == 200 and 'javascript' in js_headers.get('content-type', '') and js_body
status, _, robots = get('robots.txt', 'https-robots')
assert status == 200 and robots == (ROOT / 'public/robots.txt').read_bytes()
status, _, cv = get('cv/2026-11/CV-Fabien-ROY-dev-officiel.pdf', 'https-cv')
assert status == 200
assert hashlib.sha256(cv).hexdigest() == 'b2e56f0e5a9207204553172748bd10948b074ac2ac51ecb82b65e9b7de8b51bb'
for path, label, expected in [
    ('mentions-legales/', 'https-legal', 200),
    ('politique-confidentialite/', 'https-privacy', 200),
    ('absent-security-check', 'https-missing', 404),
]:
    status, _, _ = get(path, label)
    assert status == expected, (path, status)
result = {
    'url': BASE, 'http': 200, 'tlsVerified': True, 'framework': f'Astro v{version}',
    'phone': phone, 'phoneOccurrences': 2, 'sourceHtmlSha256': sha,
    'css': {'url': urljoin(BASE, css), 'bytes': len(css_body), 'mime': css_headers.get('content-type')},
    'script': {'url': urljoin(BASE, script), 'bytes': len(js_body), 'mime': js_headers.get('content-type')},
    'robotsPreserved': True, 'pdfPreserved': True, 'missingRoute': 404,
    'noindex': headers.get('x-robots-tag'),
    'vantagePoint': 'agent via configured SOCKS' if PROXY else 'agent direct HTTPS',
}
(OUT / 'https-verification.json').write_text(json.dumps(result, indent=2))
print(json.dumps(result, ensure_ascii=False))

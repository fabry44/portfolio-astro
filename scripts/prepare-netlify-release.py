"""Prepare local review archives only: no install, build, account or deployment."""
from pathlib import Path
import hashlib
import json
import re
import subprocess
import tomllib
import zipfile

ROOT = Path(__file__).resolve().parent.parent
QA = ROOT / 'qa-local/media-20261117'
OUT = ROOT / 'qa-local/netlify-release-20261117'
CONFIGS = ['package.json', 'package-lock.json', 'astro.config.mjs', 'netlify.toml',
           'postcss.config.mjs', 'tailwind.config.mjs', 'tsconfig.json']


def digest(data):
    return hashlib.sha256(data).hexdigest()


def collect(directories, files=()):
    paths = [ROOT / name for name in files if (ROOT / name).is_file()]
    for name in directories:
        paths.extend(path for path in (ROOT / name).rglob('*') if path.is_file())
    result = {}
    for path in sorted(set(paths)):
        rel = path.relative_to(ROOT).as_posix()
        assert not path.is_symlink(), f'Symlink refused: {rel}'
        if any(part.startswith('.') for part in Path(rel).parts):
            assert rel in {'.env.example', '.gitignore', '.dockerignore'}, f'Hidden path refused: {rel}'
        assert not any(part in {'node_modules', 'qa-local', 'cache'} for part in Path(rel).parts), rel
        result[rel] = path.read_bytes()
    return result


def archive(name, entries):
    target = OUT / name
    with zipfile.ZipFile(target, 'w', zipfile.ZIP_DEFLATED) as output:
        for path, data in entries.items():
            output.writestr(path, data)
    with zipfile.ZipFile(target) as check:
        assert check.testzip() is None
        assert set(check.namelist()) == set(entries)
        for path, data in entries.items():
            assert digest(check.read(path)) == digest(data), path
    return {'file': name, 'files': len(entries), 'bytes': target.stat().st_size,
            'sha256': digest(target.read_bytes())}


def main():
    config = tomllib.loads((ROOT / 'netlify.toml').read_text())
    assert config['build']['command'] == 'npm run build'
    assert config['build']['publish'] == 'dist'
    assert config['build']['functions'] == 'netlify/functions'
    assert config['build']['environment']['NODE_VERSION'] == '24'
    assert config['functions']['node_bundler'] == 'esbuild'
    branch = subprocess.check_output(['git', 'branch', '--show-current'], cwd=ROOT, text=True).strip()
    assert branch and branch not in {'main', 'master'}
    app = collect(['src', 'public', 'netlify'], CONFIGS)
    expected = json.loads((QA / 'validated-inputs.json').read_text())
    actual = {path: digest(data) for path, data in app.items()}
    assert actual == expected['files'], 'Application changed since local qualification; rerun checks and source receipt'
    logs = (QA / 'tests.log').read_text()
    match = re.search(r'ℹ tests (\d+)', logs)
    assert match, 'Missing Node test summary'
    count = int(match[1])
    assert count > 0 and f'ℹ pass {count}\n' in logs
    assert all(f'ℹ {name} 0\n' in logs for name in ['fail', 'cancelled', 'skipped', 'todo'])
    assert '- 0 errors' in (QA / 'check.log').read_text()
    assert '[build] Complete!' in (QA / 'build.log').read_text()
    assert json.loads((QA / 'audit.json').read_text())['metadata']['vulnerabilities']['total'] == 0
    media = [json.loads((QA / f'browser-media-{mode}.json').read_text()) for mode in ['local', 'tailnet']]
    assert all(item['scenarios'] == len(item['results']) and item['scenarios'] > 0 for item in media)
    assert all(not row['errors'] and not row['badResponses'] and not row['writes'] for item in media for row in item['results'])
    smoke = json.loads((ROOT / 'qa-local/security-20261117/https-verification.json').read_text())
    assert smoke['sourceHtmlSha256'] == digest((ROOT / 'dist/index.html').read_bytes()) == expected['buildHtmlSha256']
    assert smoke['http'] == 200 and smoke['tlsVerified'] and smoke['pdfPreserved']
    source = collect(['src', 'public', 'netlify', 'tests', 'scripts', 'docs'],
                     CONFIGS + ['README.md', 'LICENSE', '.gitignore', '.dockerignore', '.env.example', 'Dockerfile'])
    assert 'netlify/functions/contact.mjs' in source
    assert [path for path in source if path.lower().endswith('.pdf')] == ['public/cv/2026-11/CV-Fabien-ROY-dev-officiel.pdf']
    static = {path.removeprefix('dist/'): data for path, data in collect(['dist']).items()}
    assert not any(path.startswith(('src/', 'netlify/')) for path in static)
    OUT.mkdir(parents=True, exist_ok=True)
    archives = [archive('portfolio-source.zip', source), archive('portfolio-static-review.zip', static)]
    status = subprocess.check_output(['git', 'status', '--porcelain=v1'], cwd=ROOT, text=True)
    manifest = {
        'preparedAt': subprocess.check_output(['date', '--iso-8601=seconds'], text=True).strip(),
        'branch': branch, 'baseHead': subprocess.check_output(['git', 'rev-parse', 'HEAD'], cwd=ROOT, text=True).strip(),
        'uncommitted': bool(status.strip()), 'sourceFingerprint': digest(json.dumps(actual, sort_keys=True).encode()),
        'archives': archives, 'sourceFiles': {path: digest(data) for path, data in source.items()},
        'staticFiles': {path: digest(data) for path, data in static.items()},
        'localEvidence': {'nodeTestsPassed': count, 'astroErrors': 0, 'npmAuditVulnerabilities': 0,
                          'mediaScenarios': {item['mode']: item['scenarios'] for item in media},
                          'previewHtmlSha256': smoke['sourceHtmlSha256'], 'previewTls': True},
        'providerQualification': 'NOT_RUN', 'humanVisualAcceptance': 'PENDING',
        'publicationAuthorized': False, 'deployed': False,
        'limits': ['static ZIP excludes Functions', 'no Netlify bundler or provider routing test',
                   'no account/domain/secret inspection or mutation', 'real contact remains disabled and unqualified'],
    }
    (OUT / 'release-manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + '\n')
    names = ['portfolio-source.zip', 'portfolio-static-review.zip', 'release-manifest.json']
    (OUT / 'SHA256SUMS').write_text(''.join(f'{digest((OUT / name).read_bytes())}  {name}\n' for name in names))
    print(json.dumps({'output': str(OUT), 'archives': archives, 'tests': count,
                      'mediaScenarios': manifest['localEvidence']['mediaScenarios'],
                      'providerQualification': 'NOT_RUN', 'deployed': False}, ensure_ascii=False))


if __name__ == '__main__':
    main()

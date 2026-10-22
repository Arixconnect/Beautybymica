import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://arixconnect.github.io/Beautybymica').replace(/\/$/, '');
for (const lang of ['en', 'pap', 'nl', 'es']) {
  const html = fs.readFileSync(`out/${lang}/index.html`, 'utf8');
  assert(html.includes(`<html lang="${lang}"`), `${lang}: HTML language`);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${lang}: one H1`);
  assert(html.includes(`href="${origin}/${lang}/"`), `${lang}: canonical`);
  assert(html.includes('noindex, nofollow'), `${lang}: preview indexing restriction`);
  assert.equal((html.match(/rel="alternate"/g) || []).length, 5, `${lang}: language alternates`);
  assert(html.includes('application/ld+json'), `${lang}: structured data`);
  assert(html.includes('Content-Security-Policy'), `${lang}: CSP`);
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
  for (const [, id] of html.matchAll(/href="#([^"]+)"/g)) assert(ids.has(id), `${lang}: missing anchor ${id}`);
  for (const [, src] of html.matchAll(/\bsrc="([^"]+)"/g)) {
    if (src.startsWith(`${base}/`)) assert(fs.existsSync(`out${decodeURIComponent(src.slice(base.length))}`), `${lang}: missing asset ${src}`);
    else assert(!/^https?:/.test(src), `${lang}: remote resource ${src}`);
  }
  for (const [, script] of html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)) {
    if (script) assert(html.includes(`'sha256-${crypto.createHash('sha256').update(script).digest('base64')}'`), `${lang}: unhashed inline script`);
  }
}
assert(fs.existsSync('out/.nojekyll'));
assert(fs.readFileSync('out/robots.txt', 'utf8').includes('Disallow: /'));
console.log('PASS: 4 locale documents, canonical/hreflang, preview indexing, structured data, anchors, local assets and exact CSP hashes.');

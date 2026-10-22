import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
const origin = (process.env.NEXT_PUBLIC_SITE_URL || 'https://arixconnect.github.io/Beautybymica').replace(/\/$/, '');
const langs = ['en', 'pap', 'nl', 'es'];
for (const lang of langs) {
  const file = `out/${lang}/index.html`;
  const schema = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'Beauty by Mica', url: `${origin}/${lang}/`, inLanguage: lang, about: { '@type': 'Organization', name: 'Beauty by Mica', areaServed: { '@type': 'Place', name: 'Marie Pampoen, Curaçao' } } };
  fs.writeFileSync(file, fs.readFileSync(file, 'utf8').replace('</head>', `<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`));
}
fs.writeFileSync('out/index.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><meta http-equiv="refresh" content="0;url=${base}/en/"><title>Beauty by Mica</title><link rel="canonical" href="${origin}/en/"></head><body><a href="${base}/en/">Enter Beauty by Mica</a></body></html>`);
fs.writeFileSync('out/404.html', `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Page not found · Beauty by Mica</title></head><body><main><h1>This page is still taking shape.</h1><p><a href="${base}/en/">Return to Beauty by Mica</a></p></main></body></html>`);
fs.writeFileSync('out/robots.txt', `User-agent: *\nDisallow: /\n# Design preview: indexing will open after content approval.\nSitemap: ${origin}/sitemap.xml\n`);
fs.writeFileSync('out/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${langs.map(l => `<url><loc>${origin}/${l}/</loc>${langs.map(alt => `<xhtml:link rel="alternate" hreflang="${alt}" href="${origin}/${alt}/"/>`).join('')}<xhtml:link rel="alternate" hreflang="x-default" href="${origin}/en/"/></url>`).join('')}</urlset>`);
fs.writeFileSync('out/.nojekyll', '');
// Static hosts cannot inject nonces. Hash the exact exported inline scripts.
// No user HTML or arbitrary external scripts are accepted by this application.
function harden(dir) {
  for (const name of fs.readdirSync(dir)) {
    const file = path.join(dir, name);
    if (fs.statSync(file).isDirectory()) { harden(file); continue; }
    if (!name.endsWith('.html')) continue;
    let html = fs.readFileSync(file, 'utf8');
    const hashes = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)].filter(m => m[1]).map(m => `'sha256-${crypto.createHash('sha256').update(m[1]).digest('base64')}'`);
    const csp = `default-src 'self'; script-src 'self' ${[...new Set(hashes)].join(' ')}; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; upgrade-insecure-requests`;
    html = html.replace('<head>', `<head><meta http-equiv="Content-Security-Policy" content="${csp}"><meta name="referrer" content="strict-origin-when-cross-origin">`);
    fs.writeFileSync(file, html);
  }
}
harden('out');
console.log('Static export ready: locale entrypoints, sitemap, robots, hashed CSP and no-Jekyll marker.');

import { existsSync, readFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { PAGES, SITE_URL, canonicalFor, OG_IMAGE } from '../seo.config.mjs';

const DIST = resolve('dist');
let failures = 0;

const fail = (message) => {
  failures += 1;
  console.error(`  FAIL  ${message}`);
};
const pass = (message) => console.log(`  OK    ${message}`);

const read = (file) => (existsSync(file) ? readFileSync(file, 'utf8') : '');

for (const page of PAGES) {
  const file = page.path === '/' ? join(DIST, 'index.html') : join(DIST, page.path, 'index.html');
  if (!existsSync(file)) {
    fail(`${page.path} — missing ${file}`);
    continue;
  }
  const html = read(file);
  const canonical = canonicalFor(page.path);
  const title = page.ar.title;
  const image = `${SITE_URL}${OG_IMAGE.url}`;

  if (!html.includes(`href="${canonical}"`)) fail(`${page.path} — canonical ${canonical} missing`);
  if (!html.includes(title)) fail(`${page.path} — title "${title}" missing`);
  if (!html.includes(`content="${image}"`)) fail(`${page.path} — og:image ${image} missing`);
  if (!html.includes('name="description"')) fail(`${page.path} — meta description missing`);
  if (!html.includes('<div id="root">')) fail(`${page.path} — React root container missing`);
  if (html.includes('id="page-loader"')) fail(`${page.path} — captured the lazy loading placeholder`);
  if (!html.includes('/assets/index-')) fail(`${page.path} — built assets missing`);
  if (html.length < 5000) fail(`${page.path} — suspiciously small output (${html.length} bytes)`);
  if (failures === 0) pass(`${page.path} → ${file.replace(DIST, 'dist')}`);
}

const fallback = read(join(DIST, '404.html'));
if (!fallback) fail('404.html — missing SPA fallback');
else if (!fallback.includes('noindex')) fail('404.html — must contain noindex');
else pass('404.html → SPA fallback with noindex');

const robots = read(join(DIST, 'robots.txt'));
if (!robots.includes('Sitemap:')) fail('robots.txt — missing Sitemap directive');
else pass('robots.txt');

const sitemap = read(join(DIST, 'sitemap.xml'));
if (!sitemap.includes('<urlset')) fail('sitemap.xml — missing <urlset>');
else {
  for (const page of PAGES) {
    if (!sitemap.includes(canonicalFor(page.path))) fail(`sitemap.xml — missing ${canonicalFor(page.path)}`);
  }
  if (!failures) pass('sitemap.xml — all canonical URLs listed');
}

const cname = read(join(DIST, 'CNAME')).trim();
if (!cname) fail('CNAME — missing');
else pass(`CNAME → ${cname}`);

if (failures) {
  console.error(`\nSEO verification failed with ${failures} problem(s)`);
  process.exit(1);
}
console.log('\nSEO verification passed');

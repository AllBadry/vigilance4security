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
const count = (html, re) => (html.match(re) ?? []).length;

for (const page of PAGES) {
  const file = page.path === '/' ? join(DIST, 'index.html') : join(DIST, page.path, 'index.html');
  if (!existsSync(file)) {
    fail(`${page.path} — missing ${file}`);
    continue;
  }

  const html = read(file);
  const canonical = canonicalFor(page.path);
  const copy = page.ar;
  const image = `${SITE_URL}${OG_IMAGE.url}`;
  const problems = [];
  const expect = (condition, message) => {
    if (!condition) problems.push(message);
  };

  expect(html.includes(`href="${canonical}"`), `canonical ${canonical} missing`);
  expect(html.includes(`<title>${copy.title}</title>`), `title "${copy.title}" missing`);
  expect(
    html.includes(`name="description" content="${copy.description}"`),
    'meta description does not match the page copy'
  );
  expect(html.includes('name="robots" content="index, follow'), 'robots meta is not index/follow');
  expect(html.includes(`property="og:title" content="${copy.title}"`), 'og:title missing');
  expect(html.includes(`content="${image}"`), `og:image ${image} missing`);
  expect(html.includes('lang="ar"'), 'html lang="ar" missing');
  expect(html.includes('dir="rtl"'), 'html dir="rtl" missing');
  expect(html.includes('<div id="root">'), 'React root container missing');
  expect(!html.includes('id="page-loader"'), 'captured the lazy loading placeholder');
  expect(html.includes('/assets/index-'), 'built assets missing');
  expect(html.includes('application/ld+json'), 'JSON-LD structured data missing');
  expect(
    ['"@type":"WebPage"', '"@type":"AboutPage"', '"@type":"ContactPage"'].some((type) =>
      html.includes(type)
    ),
    'page schema missing'
  );
  if (page.path !== '/') {
    expect(html.includes('"@type":"BreadcrumbList"'), 'breadcrumb schema missing');
  }
  expect(count(html, /<h1[\s>]/g) === 1, `expected exactly one <h1>, found ${count(html, /<h1[\s>]/g)}`);
  expect(html.length > 5000, `suspiciously small output (${html.length} bytes)`);

  const localImages = [...html.matchAll(/<img[^>]*\ssrc="\/[^"]+"[^>]*>/g)].map((match) => match[0]);
  expect(
    localImages.every((img) => /\swidth="\d+"/.test(img) && /\sheight="\d+"/.test(img)),
    'local images must declare intrinsic width/height'
  );

  if (page.path === '/' || page.path === '/about') {
    expect(html.includes('"@type":"Service"'), 'service schema missing');
  }
  if (page.path !== '/') {
    expect(
      html.includes(`"breadcrumb":{"@id":"${canonical}#breadcrumb"}`),
      'page is not linked to its breadcrumb schema'
    );
  }

  //guard the core business data the site must never lose
  const navbarLogo = html.match(/<header[^>]*>[\s\S]*?<img[^>]*>/)?.[0] ?? '';
  expect(navbarLogo.includes('w-auto'), 'navbar logo must keep width:auto');
  expect(html.includes('RRvVSLogo_result.webp'), 'logo missing');
  expect(html.includes('+962 7 7205 0091'), 'operations phone missing');
  expect(html.includes('Info@vigilance4security.com'), 'contact email missing');
  expect(html.includes('شارع المدينة المنورة'), 'address missing');

  if (problems.length) {
    for (const problem of problems) fail(`${page.path} — ${problem}`);
  } else {
    pass(`${page.path} → ${file.replace(DIST, 'dist')}`);
  }
}

const fallback = read(join(DIST, '404.html'));
if (!fallback) fail('404.html — missing SPA fallback');
else if (!fallback.includes('noindex')) fail('404.html — must contain noindex');
else pass('404.html → SPA fallback with noindex');

const robots = read(join(DIST, 'robots.txt'));
if (!robots.includes('Sitemap:')) fail('robots.txt — missing Sitemap directive');
else if (!robots.includes('Allow: /')) fail('robots.txt — missing Allow directive');
else pass('robots.txt');

const sitemap = read(join(DIST, 'sitemap.xml'));
if (!sitemap.includes('<urlset')) fail('sitemap.xml — missing <urlset>');
else {
  for (const page of PAGES) {
    if (!sitemap.includes(canonicalFor(page.path))) fail(`sitemap.xml — missing ${canonicalFor(page.path)}`);
  }
  if (count(sitemap, /<url>/g) !== PAGES.length) {
    fail(`sitemap.xml — expected ${PAGES.length} URLs, found ${count(sitemap, /<url>/g)}`);
  }
  if (!failures) pass('sitemap.xml — all canonical URLs listed');
}

const navbarFallback = read(join(DIST, 'navbar-fallback.css'));
if (!navbarFallback.includes('@media (min-width: 1024px)')) fail('navbar-fallback.css — desktop fallback missing');
else pass('navbar-fallback.css — classic media queries present');

const cname = read(join(DIST, 'CNAME')).trim();
if (!cname) fail('CNAME — missing');
else pass(`CNAME → ${cname}`);

if (failures) {
  console.error(`\nSEO verification failed with ${failures} problem(s)`);
  process.exit(1);
}
console.log('\nSEO verification passed');

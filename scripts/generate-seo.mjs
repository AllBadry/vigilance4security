import { mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { PAGES, SITE_URL, canonicalFor } from '../seo.config.mjs';

const DIST = resolve('dist');
const today = new Date().toISOString().slice(0, 10);

const urls = PAGES.map((page) => {
  const lines = [
    '  <url>',
    `    <loc>${canonicalFor(page.path)}</loc>`,
    `    <lastmod>${today}</lastmod>`,
    `    <changefreq>${page.changefreq}</changefreq>`,
    `    <priority>${page.priority}</priority>`,
    '  </url>',
  ];
  return lines.join('\n');
}).join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
`;

mkdirSync(DIST, { recursive: true });
writeFileSync(resolve(DIST, 'sitemap.xml'), sitemap, 'utf8');
writeFileSync(resolve(DIST, 'robots.txt'), robots, 'utf8');

console.log(`Generated dist/sitemap.xml (${PAGES.length} URLs, lastmod ${today}) and dist/robots.txt`);

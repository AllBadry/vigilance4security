import { spawn } from 'node:child_process';
import { createServer } from 'node:http';
import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';
import { tmpdir } from 'node:os';
import { PAGES } from '../seo.config.mjs';

const DIST = resolve('dist');
const PORT = Number(process.env.PRERENDER_PORT ?? 4311);
const DEBUG_PORT = Number(process.env.PRERENDER_DEBUG_PORT ?? 9333);
const WAIT_STEPS = 225;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
};

const CHROME_CANDIDATES = [
  process.env.CHROME_PATH,
  process.env.PUPPETEER_EXECUTABLE_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  '/usr/bin/google-chrome',
  '/usr/bin/google-chrome-stable',
  '/usr/bin/chromium',
  '/usr/bin/chromium-browser',
  '/snap/bin/chromium',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
].filter(Boolean);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const startServer = (shell) => {
  const server = createServer((req, res) => {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    let file = join(DIST, pathname);
    if (existsSync(file) && statSync(file).isDirectory()) file = join(file, 'index.html');
    if (existsSync(file) && statSync(file).isFile()) {
      res.writeHead(200, {
        'content-type': MIME[extname(file).toLowerCase()] ?? 'application/octet-stream',
      });
      res.end(readFileSync(file));
      return;
    }
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
    res.end(shell);
  });
  return new Promise((ready) => server.listen(PORT, '127.0.0.1', () => ready(server)));
};

const connectChrome = async () => {
  for (let i = 0; i < 60; i++) {
    try {
      const list = await (await fetch(`http://127.0.0.1:${DEBUG_PORT}/json/list`)).json();
      const page = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      if (page) return page.webSocketDebuggerUrl;
    } catch {
      /* chrome not ready yet */
    }
    await sleep(250);
  }
  throw new Error('Could not reach the Chrome DevTools endpoint');
};

const createClient = async (wsUrl) => {
  const ws = new WebSocket(wsUrl);
  await new Promise((ok, fail) => {
    ws.onopen = ok;
    ws.onerror = () => fail(new Error('WebSocket connection failed'));
  });
  let id = 0;
  const pending = new Map();
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    const entry = pending.get(message.id);
    if (entry) {
      pending.delete(message.id);
      entry(message);
    }
  };
  const send = (method, params = {}) =>
    new Promise((ok) => {
      const next = ++id;
      pending.set(next, ok);
      ws.send(JSON.stringify({ id: next, method, params }));
    });
  return { ws, send };
};

const SETTLE = `
(async () => {
  const step = Math.max(320, Math.round(window.innerHeight * 0.8));
  const total = document.documentElement.scrollHeight;
  for (let y = 0; y <= total + step; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 200));
  }
  window.scrollTo(0, 0);
  await new Promise((r) => setTimeout(r, 400));
  try { await document.fonts.ready; } catch (e) { /* fonts api unavailable */ }
  document.querySelectorAll('[style]').forEach((el) => {
    if (el.style.opacity === '0') el.style.removeProperty('opacity');
    if (el.style.visibility === 'hidden') el.style.removeProperty('visibility');
  });
  return document.body.innerText.replace(/\\s+/g, ' ').trim().length;
})()`;

const chromePath = CHROME_CANDIDATES.find((candidate) => existsSync(candidate));
if (!chromePath) {
  console.error('No Chrome/Chromium binary found. Set CHROME_PATH to continue.');
  console.error(CHROME_CANDIDATES.map((c) => `  - ${c}`).join('\n'));
  process.exit(1);
}

if (!existsSync(join(DIST, 'index.html'))) {
  console.error('dist/index.html not found — run `npm run build` first.');
  process.exit(1);
}

const shell = readFileSync(join(DIST, 'index.html'), 'utf8');
const server = await startServer(shell);
console.log(`prerendering ${PAGES.length} routes with ${chromePath}`);

const chrome = spawn(
  chromePath,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--disable-extensions',
    '--no-first-run',
    '--window-size=1440,900',
    `--remote-debugging-port=${DEBUG_PORT}`,
    `--user-data-dir=${join(tmpdir(), 'v4s-prerender-chrome')}`,
    'about:blank',
  ],
  { stdio: 'ignore' }
);

let failures = 0;

try {
  const wsUrl = await connectChrome();
  const { ws, send } = await createClient(wsUrl);
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send('Emulation.setEmulatedMedia', {
    features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
  });

  const evaluate = async (expression) => {
    const message = await send('Runtime.evaluate', {
      expression,
      returnByValue: true,
      awaitPromise: true,
    });
    if (message.result?.exceptionDetails) {
      throw new Error(message.result.exceptionDetails.text ?? 'evaluation failed');
    }
    return message.result?.result?.value;
  };

  const captures = new Map();

  for (const page of PAGES) {
    await send('Page.navigate', { url: `http://127.0.0.1:${PORT}${page.path}` });

    let mounted = false;
    for (let step = 0; step < WAIT_STEPS; step++) {
      await sleep(200);
      const ready = await evaluate(
        `document.readyState === 'complete' &&
         !!document.querySelector('#root > *') &&
         !document.querySelector('#page-loader')`
      );
      if (ready === true) {
        mounted = true;
        break;
      }
    }

    if (!mounted) {
      failures += 1;
      console.error(`  FAIL  ${page.path} — React never mounted`);
      continue;
    }

    await sleep(600);
    const textLength = await evaluate(SETTLE);

    if (await evaluate(`!!document.querySelector('#page-loader')`)) {
      await sleep(1500);
    }

    const html = await evaluate(`'<!doctype html>\\n' + document.documentElement.outerHTML`);
    const title = await evaluate('document.title');
    const canonical = await evaluate(
      `document.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? ''`
    );
    const htmlCanonical = `href="${canonical}"`;

    const outDir = page.path === '/' ? DIST : join(DIST, page.path);
    mkdirSync(outDir, { recursive: true });
    writeFileSync(join(outDir, 'index.html'), html, 'utf8');
    captures.set(page.path, html);

    const problems = [];
    if (!canonical) problems.push('missing canonical');
    else if (!html.includes(htmlCanonical)) problems.push('canonical not in markup');
    if (!html.includes(title)) problems.push('title not in markup');
    if (html.includes('id="page-loader"')) problems.push('lazy placeholder was captured');
    if (textLength < 300) problems.push(`too little text (${textLength})`);
    if (problems.length) {
      failures += 1;
      console.error(`  FAIL  ${page.path} — ${problems.join(', ')}`);
    } else {
      console.log(
        `  OK    ${page.path} → dist${page.path === '/' ? '/index.html' : `${page.path}/index.html`}  [${textLength} chars] ${title}`
      );
    }
  }

  const home = captures.get('/');
  if (home) {
    const fallback = home.replace(
      /<meta name="robots" content="[^"]*"\s*\/?>/,
      '<meta name="robots" content="noindex, follow" />'
    );
    writeFileSync(join(DIST, '404.html'), fallback, 'utf8');
    console.log('  OK    dist/404.html (SPA fallback, noindex)');
  }

  ws.close();
} catch (error) {
  failures += 1;
  console.error(`prerender failed: ${error.message}`);
} finally {
  chrome.kill();
  server.close();
}

console.log(
  failures === 0
    ? `Prerender complete: ${PAGES.length} static pages + 404 fallback in dist/`
    : `Prerender finished with ${failures} problem(s)`
);
process.exit(failures === 0 ? 0 : 1);

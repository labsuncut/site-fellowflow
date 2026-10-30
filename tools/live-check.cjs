// Checks the live site after Cloudflare publishes (run by .github/workflows/site-checks.yml).
// Prints what it finds and exits 1 if anything is wrong. Local run:
//   NODE_PATH=$(npm root -g) node tools/live-check.cjs      (needs Playwright with Chromium)
const { chromium } = require('playwright');
const dns = require('node:dns').promises;
const { readFileSync } = require('node:fs');
const { join } = require('node:path');

const SITE = process.env.SITE || 'https://fellowflow.ai';
const root = join(__dirname, '..');
const PAGES = { '/': 'index.html', '/ar/': 'ar/index.html', '/privacy/': 'privacy/index.html' };
const problems = [];
const say = (...a) => console.log(...a);
const problem = (msg) => { problems.push(msg); say('  PROBLEM: ' + msg); };

// What Cloudflare may add to a page on the way out: its analytics beacon and e-mail protection, which
// hides addresses as /cdn-cgi/l/email-protection#<hex> and <span data-cfemail="<hex>">. Undo both to compare.
const injected = (html) => (html.match(/<script[^>]*(cloudflareinsights|cdn-cgi)[^>]*>(?:<\/script>)?|data-cfemail="[0-9a-f]+"/g) || []);
const unhide = (hex) => { const k = parseInt(hex.slice(0, 2), 16); let out = ''; for (let i = 2; i < hex.length; i += 2) out += String.fromCharCode(parseInt(hex.slice(i, i + 2), 16) ^ k); return out; };
const clean = (html) => html
  .replace(/<!-- Cloudflare Pages Analytics -->/g, '')
  .replace(/<script[^>]*(cloudflareinsights|cdn-cgi)[^>]*>(?:\s*<\/script>)?/g, '')
  .replace(/\/cdn-cgi\/l\/email-protection#([0-9a-f]+)/g, (m, hex) => 'mailto:' + unhide(hex))
  .replace(/<span class="__cf_email__" data-cfemail="([0-9a-f]+)">[^<]*<\/span>/g, (m, hex) => unhide(hex))
  .replace(/\r\n/g, '\n').replace(/\s+$/, '');
const firstDiff = (a, b) => { let i = 0; while (i < a.length && a[i] === b[i]) i++; return `at character ${i}:\n      live: ${JSON.stringify(a.slice(Math.max(0, i - 60), i + 80))}\n      repo: ${JSON.stringify(b.slice(Math.max(0, i - 60), i + 80))}`; };

(async () => {
  // After a push, wait (up to WAIT seconds) until Cloudflare serves this commit: every page, plus the
  // shared script and style files (a change may leave index.html as it was).
  const wait = Number(process.env.WAIT || 0);
  if (wait) {
    const files = [...Object.entries(PAGES), ...['assets/js/site.js', 'assets/js/intro-boot.js', 'assets/js/convergence.js', 'assets/js/hero.js', 'assets/css/site.css'].map((f) => ['/' + f, f])];
    const until = Date.now() + wait * 1000;
    for (;;) {
      const same = await Promise.all(files.map(async ([p, f]) => {
        try { return clean(await (await fetch(SITE + p, { cache: 'no-store' })).text()) === clean(readFileSync(join(root, f), 'utf8')); } catch (e) { return false; }
      }));
      if (same.every(Boolean)) { say('Cloudflare is serving this commit.\n'); break; }
      if (Date.now() > until) { say(`Still not serving this commit after ${wait} s (${files.filter((x, i) => !same[i]).map((x) => x[0]).join(', ')}); checking anyway.\n`); break; }
      await new Promise((r) => setTimeout(r, 20000));
    }
  }

  say(`== Addresses (${SITE})`);
  const urls = ['/', '/ar/', '/ar', '/privacy/', '/privacy', '/?lang=ar', '/sitemap.xml', '/robots.txt', '/favicon.ico', '/no-such-page', '/tools/build-ar.mjs', '/README.md', '/.github/workflows/site-checks.yml'];
  const expect = { '/no-such-page': 404, '/tools/build-ar.mjs': 404, '/README.md': 404, '/.github/workflows/site-checks.yml': 404 };
  for (const u of urls) {
    const r = await fetch(SITE + u, { redirect: 'manual' });
    const loc = r.headers.get('location');
    say(`  ${u} -> ${r.status}${loc ? ' ' + loc : ''}`);
    const want = expect[u];
    if (want ? r.status !== want : !(r.status === 200 || (r.status >= 301 && r.status <= 308))) problem(`${u} answered ${r.status}`);
  }
  for (const u of ['https://www.fellowflow.ai/', 'http://fellowflow.ai/']) {
    try { const r = await fetch(u, { redirect: 'manual' }); say(`  ${u} -> ${r.status} ${r.headers.get('location') || ''}`); } catch (e) { say(`  ${u} -> ${e.cause ? e.cause.code : e.message}`); }
  }

  say('\n== Live HTML vs this repository');
  for (const [path, file] of Object.entries(PAGES)) {
    const r = await fetch(SITE + path);
    const html = await r.text();
    const local = readFileSync(join(root, file), 'utf8');
    const extra = injected(html);
    say(`  ${path}: ${r.status}, ${html.length} bytes, content-type ${r.headers.get('content-type')}`);
    say(`    added by Cloudflare: ${extra.length ? extra.join(' ') : 'nothing'}`);
    if (clean(html) === clean(local)) say('    same as the repository');
    else { problem(`${path} differs from ${file} (Cloudflare has not published this commit yet, or something rewrote the page)`); say('    ' + firstDiff(clean(html), clean(local))); }
    const lang = (html.match(/<html[^>]*>/) || [''])[0];
    const canon = (html.match(/<link rel="canonical" href="([^"]+)"/) || [])[1];
    const alts = (html.match(/<link rel="alternate" hreflang="[^"]+" href="[^"]+"/g) || []).map((l) => l.replace(/.*hreflang="([^"]+)" href="([^"]+)"/, '$1=$2'));
    say(`    ${lang} canonical=${canon} hreflang=${alts.join(' ') || 'none'}`);
    if (path === '/') say(`    headers: csp=${r.headers.get('content-security-policy')}\n      hsts=${r.headers.get('strict-transport-security')} cache=${r.headers.get('cache-control')}`);
  }

  say('\n== In a browser (phone and desktop)');
  const browser = await chromium.launch();
  for (const size of [{ name: 'phone', width: 375, height: 812, isMobile: true, hasTouch: true }, { name: 'desktop', width: 1280, height: 800 }]) {
    for (const path of Object.keys(PAGES)) {
      const ctx = await browser.newContext({ viewport: { width: size.width, height: size.height }, isMobile: !!size.isMobile, hasTouch: !!size.hasTouch });
      const page = await ctx.newPage();
      const errs = [], failed = [], counted = [];
      // Cloudflare's visit counter (allowed by the founders on 25 Oct 2026) reports each visit to /cdn-cgi/rum.
      // Its answers are Cloudflare's business, so they are listed below rather than failing the check. A blocked
      // or broken counter script still fails it.
      const rum = (u) => /\/cdn-cgi\/rum/.test(u);
      page.on('console', (m) => { if (m.type() !== 'error') return; if (rum((m.location() || {}).url || '')) counted.push('console: ' + m.text()); else errs.push(m.text()); });
      page.on('pageerror', (e) => errs.push('page error: ' + e.message));
      // A browser cancels its own video requests (net::ERR_ABORTED) once it has read enough, or when it moves on
      // to the next <source>; that is how video loads, not a failure. Any other failed request still counts.
      const media = [];
      page.on('requestfailed', (q) => { const err = (q.failure() || {}).errorText || 'failed';
        if (rum(q.url())) counted.push(err); else if (/\.(mp4|webm)(\?|$)/.test(q.url()) && err === 'net::ERR_ABORTED') media.push(q.url().split('/').pop()); else failed.push(q.url() + ' ' + err); });
      page.on('response', (q) => { if (rum(q.url())) counted.push(q.status()); else if (q.status() >= 400) failed.push(q.status() + ' ' + q.url()); });
      await page.goto(SITE + path, { waitUntil: 'networkidle' });
      await page.waitForTimeout(7000); // let the opening play out and late scripts report
      await page.evaluate(async () => { for (let y = 0; y < document.documentElement.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); } });
      await page.waitForTimeout(2500);
      const info = await page.evaluate(() => ({
        lang: document.documentElement.lang, title: document.title,
        bad: (document.body.innerText.match(/undefined|NaN|\[object|\bnull\b/) || [])[0] || '',
        images: Array.from(document.images).filter((i) => !i.complete || !i.naturalWidth).map((i) => i.getAttribute('src')),
        links: Array.from(document.querySelectorAll('a[href]')).map((a) => a.href).filter((h) => h.startsWith(location.origin)),
        overflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        film: (function () { var v = document.getElementById('film'); if (!v) return null; var h = document.getElementById('hero');
          return { src: (v.currentSrc || '').split('/').pop(), ready: v.readyState, duration: Math.round((v.duration || 0) * 10) / 10, noVideo: !!(h && h.classList.contains('no-video')) }; })(),
      }));
      say(`  ${path} ${size.name}: lang=${info.lang} title="${info.title}"`);
      if (info.bad) problem(`${path} ${size.name}: "${info.bad}" shows on the page`);
      if (info.images.length) problem(`${path} ${size.name}: images not loaded: ${info.images.join(', ')}`);
      if (info.overflow) problem(`${path} ${size.name}: the page scrolls sideways`);
      errs.forEach((e) => problem(`${path} ${size.name}: console error: ${e}`));
      failed.forEach((e) => problem(`${path} ${size.name}: request failed: ${e}`));
      if (info.film) { say(`    hero film: ${info.film.noVideo ? 'could not play, poster shown' : (info.film.src || 'no source yet') + ', ready ' + info.film.ready + '/4, ' + info.film.duration + ' s'}${media.length ? ' (browser moved past ' + media.join(', ') + ')' : ''}`);
        if (info.film.noVideo) problem(`${path} ${size.name}: the hero film could not play`); }
      say(`    visit counter: ${counted.length ? 'reported (' + counted.join(', ') + ')' : 'no report seen'}`);
      // The privacy page says the site sets no cookies of its own; Cloudflare's security cookies are the only ones allowed.
      const cookies = (await ctx.cookies()).map((c) => c.name);
      say(`    cookies: ${cookies.join(', ') || 'none'}`);
      cookies.filter((n) => !/^(__cf_bm|cf_clearance|_cfuvid|__cflb)$/.test(n)).forEach((n) => problem(`${path} ${size.name}: cookie "${n}" is set, which the privacy page does not mention`));
      for (const l of new Set(info.links.map((h) => h.split('#')[0]))) {
        const r = await ctx.request.get(l);
        if (r.status() !== 200) problem(`${path}: link ${l} answered ${r.status()}`);
      }
      await ctx.close();
    }
  }
  await browser.close();

  say('\n== DNS (for the record)');
  const look = async (label, fn) => { try { say(`  ${label}: ${JSON.stringify(await fn())}`); } catch (e) { say(`  ${label}: ${e.code || e.message}`); } };
  await look('fellowflow.ai NS', () => dns.resolveNs('fellowflow.ai'));
  await look('api.fellowflow.ai CNAME', () => dns.resolveCname('api.fellowflow.ai'));
  await look('app.fellowflow.ai CNAME', () => dns.resolveCname('app.fellowflow.ai'));
  await look('api.fellowflow.ai A', () => dns.resolve4('api.fellowflow.ai'));
  await look('app.fellowflow.ai A', () => dns.resolve4('app.fellowflow.ai'));
  await look('fellowflow.si NS', () => dns.resolveNs('fellowflow.si'));
  await look('fellowflow.si A', () => dns.resolve4('fellowflow.si'));
  await look('www.fellowflow.si A', () => dns.resolve4('www.fellowflow.si'));
  await look('fellowflow.si TXT', () => dns.resolveTxt('fellowflow.si'));
  await look('fellowflow.si MX', () => dns.resolveMx('fellowflow.si'));
  for (const u of ['https://fellowflow.si/', 'https://www.fellowflow.si/', 'http://fellowflow.si/', 'https://api.fellowflow.ai/', 'https://app.fellowflow.ai/']) {
    try { const r = await fetch(u, { redirect: 'manual' }); say(`  ${u} -> ${r.status} ${r.headers.get('location') || ''} (${r.headers.get('server') || ''})`); } catch (e) { say(`  ${u} -> ${e.cause ? e.cause.code || e.cause.message : e.message}`); }
  }

  say(problems.length ? `\n${problems.length} problem(s).` : '\nAll live checks passed.');
  process.exit(problems.length ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(1); });

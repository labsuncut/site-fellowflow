// Builds ar/index.html, the Arabic page, from index.html and the AR list in assets/js/site.js,
// so Google and AI crawlers can read the Arabic without pressing a button.
// Run it after changing any words in either file, then commit both pages:
//   node tools/build-ar.mjs           write ar/index.html
//   node tools/build-ar.mjs --check   only report whether ar/index.html is up to date (exit 1 if not)
// No packages needed. It stops with an error instead of writing a half-translated page.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import vm from 'node:vm';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://fellowflow.ai';
const read = (f) => readFileSync(join(root, f), 'utf8').replace(/\r\n/g, '\n'); // Windows line endings too
const fail = (msg) => { console.error('build-ar: ' + msg); process.exit(1); };
const attr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const text = (html) => html.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();

// 1. The AR list, read straight out of site.js (the one place the Arabic lives).
function arabic() {
  const js = read('assets/js/site.js');
  const start = js.indexOf('var AR = {');
  if (start < 0) fail('no "var AR = {" in assets/js/site.js');
  let i = js.indexOf('{', start), depth = 0, quote = null;
  for (; i < js.length; i++) {
    const c = js[i];
    if (quote) { if (c === '\\') i++; else if (c === quote) quote = null; continue; }
    if (c === '/' && js[i + 1] === '/') { const nl = js.indexOf('\n', i); i = nl < 0 ? js.length : nl; continue; } // comments may hold quotes
    if (c === '/' && js[i + 1] === '*') { const end = js.indexOf('*/', i + 2); if (end < 0) fail('unclosed /* comment in site.js'); i = end + 1; continue; }
    if (c === '"' || c === "'" || c === '`') quote = c;
    else if (c === '{') depth++;
    else if (c === '}' && --depth === 0) break;
  }
  return vm.runInNewContext('(' + js.slice(js.indexOf('{', start), i + 1) + ')');
}

// 2. Every element with data-i18n="key": where its inside starts and ends.
function i18nElements(html) {
  const out = [], open = /<([a-zA-Z][\w-]*)\b[^>]*?\sdata-i18n="([^"]+)"[^>]*>/g;
  let m;
  while ((m = open.exec(html))) {
    const tag = m[1].toLowerCase(), from = m.index + m[0].length;
    const tags = new RegExp(`<(/?)${tag}\\b[^>]*>`, 'gi');
    tags.lastIndex = from;
    let depth = 1, t;
    while (depth && (t = tags.exec(html))) depth += t[1] ? -1 : 1;
    if (depth) fail(`no closing </${tag}> for data-i18n="${m[2]}"`);
    out.push({ key: m[2], from, to: t.index });
  }
  return out;
}

function build() {
  const AR = arabic();
  let html = read('index.html');
  const swap = (from, to, label) => {
    const n = html.split(from).length - 1;
    if (n !== 1) fail(`expected exactly one ${label || JSON.stringify(from)} in index.html, found ${n}`);
    html = html.replace(from, () => to);
  };
  const swapRe = (re, to, label) => {
    const n = (html.match(new RegExp(re.source, 'g')) || []).length;
    if (n !== 1) fail(`expected exactly one ${label} in index.html, found ${n}`);
    html = html.replace(re, () => to);
  };

  // Words: every data-i18n element gets its Arabic (last first, so earlier positions stay valid).
  const els = i18nElements(html);
  const missing = [...new Set(els.map((e) => e.key).filter((k) => typeof AR[k] !== 'string'))];
  if (missing.length) fail('no Arabic for: ' + missing.join(', ') + ' (add them to the AR list in site.js)');
  for (const e of els.slice().reverse()) html = html.slice(0, e.from) + AR[e.key] + html.slice(e.to);

  // Page language, title, description and addresses.
  const title = 'FellowFlow | ' + AR.hero_eyebrow;
  swap('<html lang="en" dir="ltr">', '<html lang="ar" dir="rtl">');
  swap('<!doctype html>\n', '<!doctype html>\n<!-- Built from index.html and the AR list in assets/js/site.js by tools/build-ar.mjs. Do not edit by hand. -->\n');
  swapRe(/<title>[^<]*<\/title>/, `<title>${attr(title)}</title>`, '<title>');
  swapRe(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${attr(AR.hero_lede)}">`, 'meta description');
  swap(`<link rel="canonical" href="${SITE}/">`, `<link rel="canonical" href="${SITE}/ar/">`);
  swapRe(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${attr(title)}">`, 'og:title');
  swapRe(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${attr(AR.hero_lede)}">`, 'og:description');
  swap(`<meta property="og:url" content="${SITE}/">`, `<meta property="og:url" content="${SITE}/ar/">`);
  swap('<meta property="og:locale" content="en_US">\n<meta property="og:locale:alternate" content="ar_JO">',
       '<meta property="og:locale" content="ar_JO">\n<meta property="og:locale:alternate" content="en_US">');
  swapRe(/<meta property="og:image:alt" content="[^"]*">/, `<meta property="og:image:alt" content="${attr('FellowFlow | ' + text(AR.hero_h1))}">`, 'og:image:alt');

  // Pictures: the founders' names in Arabic; the Apollo screenshot keeps its English name, marked as English.
  for (const [en, k] of [['Abdullah Kishtaini', 'n_wishta'], ['Ali Elbusaifi', 'n_weezy'], ['Mahmoud Abu Hijleh', 'n_mahmoud']]) swap(`alt="${en}"`, `alt="${attr(AR[k])}"`);
  swap('alt="Apollo Training Facility website"', 'alt="Apollo Training Facility website" lang="en"');

  // Files sit one folder up from ar/. Leave in-page anchors, full addresses, mail, phone and data: alone.
  html = html.replace(/(\s(?:src|href|poster))="(?!#|[a-z][a-z0-9+.-]*:|\/|\.\.\/)([^"]*)"/gi, (m, a, url) => `${a}="../${url}"`);
  // The language link goes back to English; the privacy link stays in Arabic once ar/privacy/ exists.
  swap('<a class="lang" id="lang" href="../ar/" hreflang="ar" lang="ar">عربي</a>', '<a class="lang" id="lang" href="../" hreflang="en" lang="en">English</a>', 'language link');
  // Until it does, the link says it leads to an English page.
  if (existsSync(join(root, 'ar/privacy/index.html'))) swap('href="../privacy/" data-i18n="foot_privacy"', 'href="privacy/" data-i18n="foot_privacy"');
  else swap('href="../privacy/" data-i18n="foot_privacy"', 'href="../privacy/" hreflang="en" data-i18n="foot_privacy"');

  // Checks before writing.
  const after = i18nElements(html);
  const wrong = after.filter((e) => html.slice(e.from, e.to) !== AR[e.key]).map((e) => e.key);
  if (wrong.length) fail('these keys did not end up in Arabic: ' + wrong.join(', '));
  const stray = html.match(/\s(?:src|href|poster)="assets\/[^"]*"/g);
  if (stray) fail('paths not moved up a folder: ' + stray.join(' '));
  // This script only moves src, href and poster. Anything else that points at a file needs adding above.
  const other = html.match(/\ssrcset="[^"]*"|url\((?!["']?(?:data:|https?:|#|\/))[^)]*\)/g);
  if (other) fail('file paths this script does not move yet: ' + other.join(' '));
  if (/\sdata-i18n="[^"]*"[^>]*>\s*<\//.test(html)) fail('an element with data-i18n is empty');
  return { html, keys: els.length };
}

const { html, keys } = build();
const target = join(root, 'ar/index.html');
const current = existsSync(target) ? readFileSync(target, 'utf8').replace(/\r\n/g, '\n') : '';
if (process.argv.includes('--check')) {
  if (current !== html) { console.error('build-ar: ar/index.html is out of date. Run: node tools/build-ar.mjs'); process.exit(1); }
  console.log(`ar/index.html is up to date (${keys} Arabic texts).`);
} else {
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, html);
  console.log(`ar/index.html ${current === html ? 'unchanged' : 'written'}: ${keys} Arabic texts, ${Math.round(html.length / 1024)} KB.`);
}

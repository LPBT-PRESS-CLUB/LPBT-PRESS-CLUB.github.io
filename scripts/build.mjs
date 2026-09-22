/* ============================================================================
   LPBT Press Club — site build
   ----------------------------------------------------------------------------
   1. Copies the static site (index.html, assets/, .nojekyll) into _site/
   2. Scans blogs/ for *.mdx files, compiles each one to static HTML, and
      writes _site/blogs/<slug>/index.html
   3. Writes _site/blogs/posts.json, which the front page reads to list
      the dispatches

   Run with `npm run build`. The deploy workflow runs this on every push.
   ========================================================================== */
import { readFile, readdir, writeFile, mkdir, rm, cp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

import matter from 'gray-matter';
import { evaluate } from '@mdx-js/mdx';
import * as runtime from 'react/jsx-runtime';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, '_site');
const BLOG_SRC = path.join(ROOT, 'blogs');
const BLOG_OUT = path.join(OUT, 'blogs');

const SITE_NAME = 'The LPBT Press Club';
const LETTERS_URL = 'https://www.admonymous.co/not-so-lain';

/* ── Desks come from the same file the front page uses ─────────────────── */
async function loadDesks() {
  const src = await readFile(path.join(ROOT, 'assets/js/data.js'), 'utf8');
  const ctx = {};
  // data.js declares top-level consts, which don't land on the context object; export explicitly.
  vm.runInNewContext(src + '\n;globalThis.__DESKS = DESKS;', ctx);
  const byId = {};
  for (const d of ctx.__DESKS) byId[d.id] = d;
  return byId;
}

/* ── Components available inside every .mdx file ───────────────────────── */
const components = {
  PullQuote: ({ children }) =>
    createElement('blockquote', { className: 'pullquote' }, createElement('p', null, children)),
};

/* ── Helpers ───────────────────────────────────────────────────────────── */
const esc = (s) =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

function isoDate(value, file) {
  // YAML turns an unquoted 2026-09-22 into a Date; a quoted one stays a string.
  const d = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(d.getTime())) throw new Error(`${file}: "date" is not a valid date (${value})`);
  return d.toISOString().slice(0, 10);
}

function longDate(iso) {
  return new Date(iso + 'T00:00:00Z').toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC',
  });
}

function slugify(file) {
  return path.basename(file, '.mdx').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

/* ── Post page template ────────────────────────────────────────────────── */
function postPage(post, html, desk) {
  const tag = desk
    ? `<span class="tag" style="--tag:${desk.color};--tag-ink:${desk.ink}">${esc(desk.name)}</span>`
    : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(post.title)} — ${SITE_NAME}</title>
<meta name="description" content="${esc(post.dek)}" />
<meta name="theme-color" content="#f4f1e8" />
<meta property="og:title" content="${esc(post.title)}" />
<meta property="og:description" content="${esc(post.dek)}" />
<meta property="og:type" content="article" />
<meta property="article:published_time" content="${post.date}" />
<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23f4f1e8'/%3E%3Ctext x='50' y='78' font-size='82' font-family='Georgia,serif' font-weight='bold' text-anchor='middle' fill='%23141210'%3EP%3C/text%3E%3C/svg%3E" />
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Archivo+Narrow:wght@400;500;600;700&family=Special+Elite&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="../../assets/css/style.css" />
</head>
<body>

<a class="skip-link" href="#main">Skip to main content</a>

<header class="masthead masthead--compact">
  <div class="shell">
    <div class="masthead__rule" aria-hidden="true"></div>
    <a class="masthead__home" href="../../"><span class="masthead__title">${SITE_NAME}</span></a>
    <div class="masthead__rule masthead__rule--double" aria-hidden="true"></div>
  </div>
</header>

<nav class="nav" aria-label="Sections">
  <div class="shell nav__inner">
    <span class="nav__brand">LPBT&nbsp;PC</span>
    <ul class="nav__list">
      <li><a href="../../#front-page">Front&nbsp;Page</a></li>
      <li><a href="../../#newsroom">The&nbsp;Newsroom</a></li>
      <li><a href="../../#desks">Desks</a></li>
      <li><a href="../../#archive">Back&nbsp;Issues</a></li>
      <li><a class="is-current" href="../../#dispatches">Dispatches</a></li>
      <li><a href="../../#letters">Letters</a></li>
    </ul>
    <a class="nav__cta" href="${LETTERS_URL}" target="_blank" rel="noopener">Tip&nbsp;the&nbsp;editor</a>
  </div>
</nav>

<main id="main" class="section">
  <div class="shell">
    <article class="post">
      <header class="post__head">
        <p class="kicker kicker--red">Dispatch ${tag}</p>
        <h1 class="post__hed">${esc(post.title)}</h1>
        ${post.dek ? `<p class="post__dek">${esc(post.dek)}</p>` : ''}
        <p class="byline">By <strong>${esc(post.author)}</strong> &middot;
          <time datetime="${post.date}">${longDate(post.date)}</time> &middot;
          ${post.minutes} min read</p>
      </header>
      <div class="prose">
${html}
      </div>
      <footer class="post__foot">
        <a href="../../#dispatches">&larr; All dispatches</a>
        <a href="${LETTERS_URL}" target="_blank" rel="noopener">Write to the editor &rarr;</a>
      </footer>
    </article>
  </div>
</main>

<footer class="footer">
  <div class="shell">
    <div class="footer__rule" aria-hidden="true"></div>
    <p class="mono footer__small">&copy; ${post.date.slice(0, 4)} LPBT Press Club</p>
  </div>
</footer>

</body>
</html>
`;
}

/* ── Build ─────────────────────────────────────────────────────────────── */
async function buildPosts(desks) {
  if (!existsSync(BLOG_SRC)) return [];
  const files = (await readdir(BLOG_SRC)).filter((f) => f.toLowerCase().endsWith('.mdx')).sort();
  const posts = [];
  const seen = new Map();

  for (const file of files) {
    const rel = `blogs/${file}`;
    const raw = await readFile(path.join(BLOG_SRC, file), 'utf8');
    const { data, content } = matter(raw);

    if (!data.title) throw new Error(`${rel}: frontmatter is missing "title"`);
    if (!data.date) throw new Error(`${rel}: frontmatter is missing "date"`);
    if (data.desk && !desks[data.desk]) {
      throw new Error(`${rel}: unknown desk "${data.desk}" (expected one of: ${Object.keys(desks).join(', ')})`);
    }

    const slug = slugify(file);
    if (seen.has(slug)) throw new Error(`${rel}: slug "${slug}" collides with ${seen.get(slug)}`);
    seen.set(slug, rel);

    let html;
    try {
      const { default: Content } = await evaluate(content, { ...runtime, baseUrl: import.meta.url });
      html = renderToStaticMarkup(createElement(Content, { components }));
    } catch (err) {
      throw new Error(`${rel}: failed to compile MDX\n${err.message}`);
    }

    const words = content.split(/\s+/).filter(Boolean).length;
    const post = {
      slug,
      url: `blogs/${slug}/`,
      title: String(data.title),
      date: isoDate(data.date, rel),
      desk: data.desk || null,
      author: data.author ? String(data.author) : 'The LPBT Press Club',
      dek: data.dek ? String(data.dek) : '',
      minutes: Math.max(1, Math.round(words / 220)),
    };

    await mkdir(path.join(BLOG_OUT, slug), { recursive: true });
    await writeFile(path.join(BLOG_OUT, slug, 'index.html'), postPage(post, html, desks[post.desk]));
    posts.push(post);
    console.log(`  ✓ ${rel} → _site/${post.url}`);
  }

  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : a.title.localeCompare(b.title)));
  return posts;
}

async function main() {
  await rm(OUT, { recursive: true, force: true });
  await mkdir(OUT, { recursive: true });

  for (const entry of ['index.html', 'assets', '.nojekyll']) {
    await cp(path.join(ROOT, entry), path.join(OUT, entry), { recursive: true });
  }

  console.log('Scanning blogs/ for .mdx files…');
  const desks = await loadDesks();
  const posts = await buildPosts(desks);

  await mkdir(BLOG_OUT, { recursive: true });
  await writeFile(path.join(BLOG_OUT, 'posts.json'), JSON.stringify(posts, null, 2) + '\n');
  console.log(`Built ${posts.length} dispatch${posts.length === 1 ? '' : 'es'} into _site/`);
}

main().catch((err) => {
  console.error('\nBuild failed:\n' + err.message);
  process.exit(1);
});

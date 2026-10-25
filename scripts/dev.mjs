/* ============================================================================
   LPBT Press Club — dev server
   ----------------------------------------------------------------------------
   Builds the site, serves _site/ at http://localhost:8000, rebuilds whenever
   a file in blogs/, assets/ or index.html changes, and reloads open tabs.

   Run with `npm run dev`. Set PORT to use a different port.
   ========================================================================== */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { watch } from 'node:fs';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, '_site');
const PORT = Number(process.env.PORT) || 8000;
const WATCH = ['blogs', 'assets', 'index.html', 'scripts/build.mjs'];

const TYPES = {
  '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8', '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.webp': 'image/webp', '.gif': 'image/gif', '.ico': 'image/x-icon',
};

// Injected into every HTML page: reloads the tab when a rebuild finishes.
const RELOAD = `<script>new EventSource('/__reload').onmessage = () => location.reload();</script>`;

/* ── Live reload ──────────────────────────────────────────────────────── */
const clients = new Set();
const reload = () => { for (const res of clients) res.write('data: reload\n\n'); };

/* ── Build (in a child process, so a broken post doesn't stop the server) ── */
let building = false;
let queued = false;

function build() {
  if (building) { queued = true; return; }
  building = true;
  const child = spawn(process.execPath, [path.join(ROOT, 'scripts/build.mjs')], { stdio: 'inherit' });
  child.on('exit', (code) => {
    building = false;
    if (queued) { queued = false; build(); return; }
    if (code === 0) reload();
    else console.log('Fix the error above and save again.');
  });
}

let timer;
for (const entry of WATCH) {
  watch(path.join(ROOT, entry), { recursive: true }, (_event, file) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      console.log(`\nChanged: ${path.join(entry, file || '')} — rebuilding…`);
      build();
    }, 100);
  });
}

/* ── Static server ─────────────────────────────────────────────────────── */
createServer(async (req, res) => {
  const url = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);

  if (url === '/__reload') {
    res.writeHead(200, { 'Content-Type': 'text/event-stream', 'Cache-Control': 'no-cache', Connection: 'keep-alive' });
    res.write('\n');
    clients.add(res);
    req.on('close', () => clients.delete(res));
    return;
  }

  let file = path.join(OUT, url);
  if (!file.startsWith(OUT)) { res.writeHead(403).end(); return; }

  try {
    if ((await stat(file)).isDirectory()) {
      if (!url.endsWith('/')) { res.writeHead(301, { Location: url + '/' }).end(); return; }
      file = path.join(file, 'index.html');
    }
    let body = await readFile(file);
    const ext = path.extname(file).toLowerCase();
    if (ext === '.html') body = body.toString().replace('</body>', RELOAD + '</body>');
    res.writeHead(200, { 'Content-Type': TYPES[ext] || 'application/octet-stream', 'Cache-Control': 'no-store' });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }).end('Not found');
  }
}).listen(PORT, () => {
  console.log(`Dev server: http://localhost:${PORT}  (Ctrl+C to stop)\n`);
  build();
});

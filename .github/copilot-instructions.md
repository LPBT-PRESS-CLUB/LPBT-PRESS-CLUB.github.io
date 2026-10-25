# Copilot instructions

The full guide is [`AGENTS.md`](../AGENTS.md) at the repo root; read it before larger changes.
The essentials:

- Static newspaper-style site on GitHub Pages. Plain HTML/CSS/JS plus a Node build
  (`scripts/build.mjs`) that compiles `blogs/*.mdx` into `_site/blogs/<slug>/`.
- Content (staff, desks, events) lives only in `assets/js/data.js`. Posts are `blogs/*.mdx`.
- Verify changes with `npm run build`; preview with `npm run dev` (http://localhost:8000).
- `assets/js/main.js` is ES5 in an IIFE: use `var`, `function`, and `esc()` on every
  interpolated value. `data.js` must keep top-level `const` declarations and no `import`/`export`.
- The page `<head>` and nav are duplicated in `index.html` and `postPage()` in
  `scripts/build.mjs`. Change both together.
- Never shorten the long favicon and Google Fonts lines; a truncated line breaks all CSS on
  post pages.
- Never edit `_site/` or `node_modules/`. Don't add dependencies without a clear need.
- Don't invent facts or quotes about real staff members.

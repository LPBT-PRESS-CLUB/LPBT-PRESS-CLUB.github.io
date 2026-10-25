---
applyTo: "index.html,assets/**,scripts/**"
---

# Site markup, styles, and build

- `index.html` and `postPage()` in `scripts/build.mjs` share the same `<head>` (favicon, fonts,
  stylesheet) and nav. Keep them in sync, and never truncate the long favicon/fonts lines.
- Homepage sections are lettered (`Section A`, `B`…) and listed in the nav and the "In this
  issue" rail (`A1`, `B1`…). Update all three when sections change.
- `assets/js/main.js`: ES5 IIFE, `var`/`function`, build HTML with string concatenation and pass
  every value through `esc()`.
- `assets/js/data.js`: plain script, top-level `const WIRE/DESKS/STAFF/EVENTS`; the build loads
  it with `vm`, so no modules.
- `assets/css/style.css`: one file, sectioned by `/* ─── NAME ─── */` banners; colours come from
  CSS variables like `--ink`, `--red`, `--rule`. Desk colours are set inline via `--tag`/`--accent`.
- `scripts/*.mjs`: Node 20+ ESM, built-in modules preferred.
- Verify with `npm run build`, and check visual changes in `npm run dev`.

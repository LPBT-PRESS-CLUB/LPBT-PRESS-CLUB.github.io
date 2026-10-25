# AGENTS.md

Guide for AI coding agents (Claude Code, GitHub Copilot, and others) working in this repo.
Human-facing docs are in `README.md`; this file is the short version plus the gotchas.

## What this is

A static site for the LPBT Press Club, styled like a broadsheet newspaper, deployed to GitHub
Pages. Plain HTML/CSS/JS, plus one Node build step that turns `blogs/*.mdx` into pages. There is
no framework, bundler, or test suite on the front end.

## Where things live

| To change… | Edit |
| --- | --- |
| Staff, desks, events, ticker headlines | `assets/js/data.js` (the only content file) |
| A blog post ("dispatch") | `blogs/<slug>.mdx`; the file name is the URL slug |
| Homepage markup / sections | `index.html` |
| How lists, filters, tags render | `assets/js/main.js` |
| Styling | `assets/css/style.css` (one file, sectioned by `/* ─── NAME ─── */` banners) |
| Post page template, frontmatter rules, MDX components | `scripts/build.mjs` |
| Dev server (watch + live reload) | `scripts/dev.mjs` |
| New-post scaffold | `scripts/new-post.mjs` |
| Deploy | `.github/workflows/pages.yml` (runs `npm ci && npm run build`, publishes `_site/`) |

`_site/` and `node_modules/` are build output; never edit or commit them.

## Commands

```sh
npm install                                   # once
npm run dev                                   # http://localhost:8000, rebuilds on save, live reload
npm run build                                 # writes _site/; fails loudly on a bad post
npm run new -- "Post title" --tags tech,launch  # scaffolds blogs/post-title.mdx as a draft
```

**Verify every change with `npm run build`.** It is the only automated check: it fails on a
missing `title`/`date`, an unknown `desk:`, a slug collision, or invalid MDX, and names the file.
For visual changes, also open the page in `npm run dev`.

## Blog posts

```mdx
---
title: Post title                # required
date: 2026-10-25                 # required, YYYY-MM-DD
tags: [tech, launch]             # optional; desk ids get desk colour + filter, others are plain labels
author: The Standing Committee   # optional, defaults to "The LPBT Press Club"
dek: One-line summary.           # optional
draft: true                      # optional; skipped by the build
---
```

- Desk ids are defined in `DESKS` in `assets/js/data.js` (`newsdesk`, `tech`, `arts`, `opinion`,
  `photo`, `sports`). The legacy `desk:` field still works and must be a valid desk id.
- Only `<PullQuote>` is available as a component. Add new ones to `components` in
  `scripts/build.mjs` and give them CSS under `.prose`.
- Don't invent facts, quotes, or numbers about real people. Staff in `data.js` are real; desks
  and events are marked as placeholder copy.

## Conventions

- `assets/js/main.js` is ES5 inside an IIFE (`var`, `function`, string concatenation, `esc()` for
  every interpolated value). Keep it that way; there is no transpiler.
- `assets/js/data.js` must stay a plain script with top-level `const WIRE/DESKS/STAFF/EVENTS`.
  The build reads it with `vm.runInNewContext`, so no `import`/`export`.
- `scripts/*.mjs` are modern Node ESM (Node 20+). Prefer built-in modules over new dependencies.
- Match the surrounding comment style: a banner header per file, `/* ── Section ── */` dividers.
- British spelling in copy ("colour"); headlines in title case for posts.

## Gotchas

- **The `<head>` and nav exist twice**: in `index.html` and in `postPage()` in
  `scripts/build.mjs`. When you change fonts, the favicon, or nav links, update both.
- **Never truncate long lines.** The favicon `data:` URL and the Google Fonts URL are very long.
  Cutting them off (e.g. to `...[...]`) leaves an unclosed quote and post pages lose all CSS.
  This has happened before. Edit those lines whole or copy them from `index.html`.
- Homepage sections are lettered in order (`Section A`… in `.sechead__label`) and mirrored in the
  "In this issue" rail (`A1`, `B1`…) and the nav. Adding, removing, or reordering a section means
  updating all three.
- `blogs/posts.json` only exists after a build; serving the repo root directly shows no
  dispatches. Use `npm run dev`.
- Post pages live at `/blogs/<slug>/` and use `../../` relative paths to reach `assets/`.
- The repo is edited on Windows; Git may warn about LF/CRLF. That's harmless.

## Working with the maintainer

- Don't commit or push unless asked; suggesting commit messages is welcome.
- Keep changes small and in the existing style; update `README.md` when behaviour a human would
  use changes (new command, new frontmatter field).

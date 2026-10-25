# LPBT-PRESS-CLUB.github.io

The front page of the **LPBT Press Club** — a static site styled like a broadsheet newspaper.
A small Node build step turns the MDX posts in `blogs/` into pages; everything else is plain
HTML/CSS/JS.

## Layout

```
index.html              markup for all sections
assets/css/style.css    the newspaper theme
assets/js/data.js       ← all site content lives here
assets/js/main.js       rendering, desk filters, copy-to-clipboard
blogs/*.mdx             ← dispatches (blog posts), one file per post
scripts/build.mjs       builds _site/: copies the site, compiles blogs/*.mdx
scripts/dev.mjs         dev server: rebuilds on save, reloads the browser
scripts/new-post.mjs    npm run new: scaffolds a blogs/*.mdx post
.nojekyll               serve files verbatim (no Jekyll processing)
.github/workflows/pages.yml   builds + deploys to GitHub Pages
```

## Sections

| Section | What it holds |
| --- | --- |
| Front Page | Lead article about the club, "In this issue" rail, live counts |
| The Newsroom | Staff identities — role, handle, beat, bio, desks. Filterable by desk |
| Desks | Communities and their colour codes. Click a swatch to copy the hex |
| Back Issues | Previous events and descriptions, newest first. Filterable by desk |
| Dispatches | Blog posts built from `blogs/*.mdx`, newest first. Filterable by desk |
| Letters | Anonymous letters via <https://www.admonymous.co/not-so-lain> |

## Editing the content

Everything is in **`assets/js/data.js`** — no HTML changes needed.

**Add a desk (community):**

```js
{
  id: 'photo',              // referenced by staff.desks[] and event.desk
  name: 'Photo Desk',
  color: '#A5741B',         // the desk's colour code
  ink: '#FFFFFF',           // text colour used on top of `color`
  tagline: 'Images & layout',
  blurb: 'One or two sentences about the desk.',
}
```

Adding a desk automatically adds it to the filter chips in both the Newsroom and Back Issues
sections, and to the staff/event counts on its swatch card.

**Add a staff member:**

```js
{
  name: 'Lain',
  handle: '@not-so-lain',       // optional
  role: 'Editor-in-Chief',
  desks: ['tech', 'opinion'],   // one or more desk ids; the first sets the accent colour
  since: '2026',
  beat: 'Everything, eventually',   // optional
  bio: 'One or two sentences.',     // optional
  img: IMG + 'Go/Iwakura_Lain_Reading_Introducing_Go.png',
  alt: 'Describe the image for screen readers.',
}
```

**Add an event:**

```js
{
  date: '2026-09-12',        // ISO; the list sorts on this
  title: 'Night Desk Marathon',
  desk: 'newsdesk',          // one desk id
  location: 'Newsroom, online',
  edition: 'No. 06',
  dek: 'One-line summary.',
  body: 'The full description.',
}
```

## Writing a dispatch (blog post)

Scaffold a new post:

```sh
npm run new -- "Our First Bake Sale" --tags newsdesk,events
```

This creates `blogs/our-first-bake-sale.mdx` with today's date. The file name becomes the URL
(`/blogs/our-first-bake-sale/`). New posts start with `draft: true`, so they don't get published
until you delete that line. You can also just write the `.mdx` file yourself:

```mdx
---
title: Our First Bake Sale          # required
date: 2026-10-25                    # required, YYYY-MM-DD; the list sorts on this
tags: [newsdesk, events]            # optional
author: The Standing Committee      # optional
dek: One-line summary shown under the headline.   # optional
draft: true                         # optional; drafts are skipped by the build
---

Regular **Markdown** works: headings, lists, links, `code`, images.

<PullQuote>MDX components work too.</PullQuote>
```

**Tags** can be any words. A tag that matches a desk id from `data.js` (`newsdesk`, `tech`,
`arts`, …) is shown in that desk's colour and makes the post appear under that desk's filter.
Other tags are shown as plain outlined labels. The older `desk: tech` field still works and
counts as a tag.

Available components: `<PullQuote>`. Add more in the `components` object in `scripts/build.mjs`.

The build fails, and the deploy stops, if a post is missing `title`/`date`, has a `desk:` that
isn't a desk id, or contains invalid MDX. The error names the file.

## Staff portraits

Staff photos are served from the club's Google Drive folder via
`lh3.googleusercontent.com/d/<file-id>` (the `IMG` prefix in `data.js`); the `=w800` suffix asks
Drive for an 800px-wide copy. The files must stay shared as "Anyone with the link". To host an
image in the repo instead, drop it in `assets/img/` and point `img` at `assets/img/your-file.png`.

## Local preview

Requires Node 20+ (and Python, only for `npm run preview`).

```sh
npm install        # once
npm run dev        # serves http://localhost:8000, rebuilds on save and reloads the browser
npm run preview    # one-off build of _site/, served with Python
```

`npm run dev` only needs Node. It watches `blogs/`, `assets/` and `index.html`. If a post has an
error, the error is printed and the server keeps running; fix the post and save again.

Serving the repo root directly still works for everything except Dispatches, which only exist
after a build.

## Deploying

Deploys run from `.github/workflows/pages.yml` on every push to `main`: it runs `npm ci` and
`npm run build`, then publishes `_site/`. You can also deploy manually from the
**Actions** tab → *Deploy to GitHub Pages* → *Run workflow*.

One-time setup: repository **Settings → Pages → Build and deployment → Source: GitHub Actions**.

The site publishes at <https://lpbt-press-club.github.io>.

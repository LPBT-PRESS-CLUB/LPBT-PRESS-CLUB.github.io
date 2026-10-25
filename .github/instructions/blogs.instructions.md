---
applyTo: "blogs/**/*.mdx"
---

# Blog posts (dispatches)

- Frontmatter: `title` and `date` (YYYY-MM-DD) are required. Optional: `tags` (list), `author`,
  `dek` (one-line summary), `draft: true` (skips the post).
- Tags that match a desk id from `DESKS` in `assets/js/data.js` (`newsdesk`, `tech`, `arts`,
  `opinion`, `photo`, `sports`) get the desk's colour and filter; any other tag is a plain label.
  Lowercase tags.
- The file name is the URL slug. Renaming a published post breaks its link.
- Body is Markdown plus MDX. The only component is `<PullQuote>…</PullQuote>`.
- House style: newspaper voice, short paragraphs, British spelling, sign off with
  `*— Filed from the LPBT Newsroom*`. Don't invent facts, numbers, or quotes about real people.
- Check with `npm run build`; it names the file if the frontmatter or MDX is invalid.

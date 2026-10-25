/* ============================================================================
   LPBT Press Club — new dispatch
   ----------------------------------------------------------------------------
   Creates blogs/<slug>.mdx with the frontmatter filled in and today's date.

     npm run new "Our First Bake Sale"
     npm run new -- "Our First Bake Sale" --tags newsdesk,events
   ========================================================================== */
import { writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const args = process.argv.slice(2);
const tagFlag = args.indexOf('--tags');
const tags = tagFlag === -1 ? [] : String(args.splice(tagFlag, 2)[1] ?? '').split(',').map((t) => t.trim()).filter(Boolean);
const title = args.join(' ').trim();

if (!title) {
  console.error('Usage: npm run new -- "Post title" [--tags tech,launch]');
  process.exit(1);
}

const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const file = path.join(ROOT, 'blogs', `${slug}.mdx`);
if (existsSync(file)) {
  console.error(`blogs/${slug}.mdx already exists`);
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
await writeFile(file, `---
title: ${JSON.stringify(title)}
date: ${today}
tags: [${tags.join(', ')}]
author: The LPBT Press Club
dek: One-line summary shown under the headline.
draft: true
---

Write your dispatch here. Regular **Markdown** works.

<PullQuote>A line worth repeating.</PullQuote>
`);

console.log(`Created blogs/${slug}.mdx — remove "draft: true" when it's ready to publish.`);

# Content Plan & Editorial Workflow

## Article statuses

| # | Topic | Search intent | Target audience | Status |
| --- | --- | --- | --- | --- |
| 1 | Best AI Writing Tools for Freelancers | Commercial investigation | Freelancers | ✅ Published |
| 2 | Free AI Tools for Small Businesses | Commercial investigation | Small business owners | Planned |
| 3 | Best AI Tools for Social Media Content | Commercial investigation | Marketers, creators | Planned |
| 4 | AI Coding Assistants for Web Developers | Commercial investigation | Developers | ✅ Published |
| 5 | How to Choose an AI Writing Assistant | Informational → commercial | Freelancers, writers | Planned |
| 6 | Best AI Tools for Email Productivity | Commercial investigation | Office professionals | Planned |
| 7 | How to Create Better Content Briefs with AI | Informational | Content managers | Planned |
| 8 | AI Image Tools for Small Business Marketing | Commercial investigation | Small business owners | Planned |
| 9 | How to Validate JSON Online | Informational (tool-led) | Developers | ✅ Published |
| 10 | How to Create UTM Tracking Links | Informational (tool-led) | Marketers | ✅ Published |

## Article template

Every article follows this structure (see any published `.mdx` for the pattern):

1. **Title + intro** — name the reader's problem in the first two sentences.
2. **Core explanation** — how the thing actually works, no fluff.
3. **Practical steps** — numbered, immediately actionable.
4. **Comparison or criteria section** — tables where they aid scanning; factual
   attributes only (pricing *model*, category, standout strength).
5. **Advantages and limitations** — both, honestly.
6. **FAQ** — 4–5 real questions in `<details>` accordions.
7. **Next step** — one concrete action, usually the related free tool or service.

## Editorial rules

- **Never invent**: test results, traffic statistics, testimonials, quotes, or
  exact third-party prices. Pricing is a *model* (free/freemium/subscription).
- **Facts that can change** (features, pricing models, availability) get a
  "last verified" note or link to a listing page that carries one.
- **Internal links**: every article links to at least one relevant tool listing
  or free tool page, and every article is linked from the homepage or blog index.
- **Refreshing**: re-read each published article quarterly; update the `date` in
  `posts.ts` only when content substantively changes.

## Publishing workflow

1. Draft in `src/content/blog/<slug>.mdx` (body only, no frontmatter).
2. Add metadata to the `posts` array in `src/lib/posts.ts`.
3. `pnpm build` → verify the article renders → push.
4. Request indexing in Google Search Console (URL inspection → Request indexing).

## Weekly cadence (4 hours/day budget)

- 2 days: one new article (~1,200–1,800 words) or a tool-listing re-verification
  batch (10 listings).
- 1 day: outreach block (see BUSINESS-TRACKER.md) — 10 personalized pitches.
- 1 day: site improvements / free-tool polish / Search Console review.
- 1 day: client work or portfolio building.

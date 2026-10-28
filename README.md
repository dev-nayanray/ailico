# AIlico — ailico.top

**Discover AI. Create smarter.**

AIlico is a production-ready platform combining three products:

1. **AI Tools** — a curated directory of 30 verified AI tools across 8 categories, with honest pros/cons, pricing models, and last-verified dates.
2. **Free Tools** — five browser-based utilities (word counter, text case converter, URL slug generator, JSON formatter/validator, UTM link builder) that work without an account and process data locally.
3. **Services** — fixed-price offers (Website Quick Fix $79, Landing Page Development $199, AI Workflow Setup $99) with written scope agreed before payment, plus a lead-generating contact form.

## Tech stack

- [Next.js 15](https://nextjs.org) (App Router, Turbopack, static generation)
- React 19 + TypeScript 5.9
- Tailwind CSS 4 (design tokens in `src/app/globals.css`)
- lucide-react icons, zod validation, MDX for blog articles
- No database required at MVP (optional Supabase storage for leads)

## Quick start

```bash
pnpm install
pnpm dev          # development at http://localhost:3000
pnpm build        # production build
pnpm start        # serve the production build
pnpm lint         # ESLint
```

Copy `.env.example` to `.env.local` and adjust as needed. The only variable that
matters for day-to-day development is `NEXT_PUBLIC_SITE_URL` (defaults to
`https://ailico.top`).

## Project structure

```
src/
├── app/                      # Routes (App Router)
│   ├── page.tsx              # Homepage
│   ├── ai-tools/             # Directory index, [slug] detail, category/[slug]
│   ├── free-tools/           # Index + 5 utility pages
│   ├── services/             # Overview + 3 service pages
│   ├── blog/                 # Index + [slug] article pages
│   ├── contact/              # Lead form page
│   ├── about/ portfolio/     # Company + sample work
│   ├── privacy-policy/ terms/ affiliate-disclosure/
│   ├── api/                  # contact (lead capture), track (anonymous events)
│   ├── go/[slug]/            # Outbound click redirect w/ counter
│   ├── sitemap.ts robots.ts opengraph-image.tsx icon.svg not-found.tsx
├── components/               # Header, footer, cards, forms, tool widgets
├── content/blog/             # MDX article bodies
├── lib/                      # Data (tools, services, posts), rate limit, tracking
└── docs/                     # Content plan, business tracker, deployment
```

## Content operations

### Adding or updating an AI tool

All listings live in `src/lib/tools.ts`. Each entry includes description, use
cases, features, pros/cons, pricing **model** (never an exact price), the official
URL, and a `lastVerified` date. Rules:

- Verify against the product's official site before adding.
- `affiliateUrl` stays `null` until a partnership is approved in writing. When
  one is approved, set the URL — the site then automatically adds
  `rel="sponsored nofollow"` and shows the disclosure note on that listing.
- Bump `LAST_VERIFIED` when you re-verify listings.

### Publishing an article

1. Create `src/content/blog/<slug>.mdx` (body only, no frontmatter).
2. Add the metadata entry to `posts` in `src/lib/posts.ts` (title, description,
   date, category, reading time).
3. Build. The article is statically generated and added to the sitemap.

## Environment variables

See `.env.example` for the full annotated list.

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL base for metadata/sitemap |
| `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | Before launch | Persists contact-form leads to a `leads` table |
| `CONTACT_WEBHOOK_URL` | Optional | JSON webhook notification (Discord/Slack) for new leads |

> ⚠️ **Important:** without Supabase or a webhook configured, contact submissions
> are logged to the server console only — acceptable in development, **not** in
> production (leads are lost on restart). Configure at least one before launch.
> The service-role key must never be exposed to client code; it is only read in
> the server-side `api/contact` route.

## Deployment

See **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)** for the full guide, including
commercial-use notes on Vercel/Netlify free tiers and the recommended low-cost
options (Cloudflare Pages free tier permits commercial use; a $4–6 VPS is the
fully-controlled option), plus the Supabase `leads` table SQL.

## Security & quality summary

- Server-side zod validation on all public endpoints; honeypot + in-memory rate
  limiting (5 contact submissions/hour/IP)
- Security headers (X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy,
  HSTS) set in `next.config.ts`
- No cookies set by the site; analytics are anonymous aggregate event counters
- Accessible: skip link, semantic landmarks, keyboard-navigable controls, ARIA
  states on interactive components, `aria-live` feedback on tools and forms
- SEO: static generation for 60+ routes, unique titles/descriptions, canonicals,
  Open Graph + generated OG image, `sitemap.xml`, `robots.txt`, JSON-LD
  (WebSite, SoftwareApplication, BreadcrumbList, FAQPage, Article) only where it
  accurately represents visible content

## Verification performed

- `pnpm build` — 71 routes, zero errors; ~137 kB first-load JS on the homepage
- All 19 core routes return correct status codes (200/404) on the production server
- Contact API: valid submit ✅, invalid input rejected with readable errors ✅,
  honeypot silently discards bots ✅, rate limit 5/hour then 429 ✅
- `/go/<tool>` outbound redirect 302s to official sites ✅
- JSON formatter browser test: invalid JSON reports exact line/column; valid JSON
  pretty-prints ✅
- Mobile (390 px): layout intact, hamburger menu opens with correct ARIA state ✅

## Legal note

The privacy policy, terms, and affiliate disclosure included here were drafted as
a starting point for a low-risk content site. They are not legal advice; consider
having a professional review them for your jurisdiction before launch.

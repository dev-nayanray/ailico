# Architecture Overview

AIlico is a Next.js 15 (App Router) application: statically generated public
pages, a handful of serverless API routes, and client components only where
interactivity requires them.

## Directory responsibilities

```
src/
├── app/                      # Routes (App Router)
│   ├── page.tsx              # Homepage
│   ├── ai-tools/             # Directory index, [slug] detail, category/[slug]
│   ├── free-tools/           # Index + 5 utility pages
│   ├── services/             # Overview + 3 service pages
│   ├── blog/                 # Index + [slug] articles (MDX bodies)
│   ├── contact/              # Lead form page
│   ├── api/contact/          # Lead capture (validation, rate limit, storage)
│   ├── api/track/            # Anonymous event counter
│   ├── go/[slug]/            # Safe outbound redirect with click counter
│   ├── feed.xml/             # RSS feed
│   ├── error.tsx             # Route-level error boundary
│   ├── loading.tsx           # Route-level loading state
│   ├── sitemap.ts robots.ts  # SEO plumbing
│   └── opengraph-image.tsx   # Generated OG image
├── components/               # Presentation
│   ├── ui/                   # Button, Badge (reusable primitives)
│   ├── free-tools/           # Tool widgets + ToolShell layout
│   └── *.tsx                 # Header, footer, cards, forms
├── data/                     # Static content: tools.ts, services.ts, free-tools.ts
├── content/blog/             # MDX article bodies
└── lib/                      # Non-UI logic
    ├── env.ts                # Zod-validated environment configuration
    ├── validation/contact.ts # Contact schema (route + tests share it)
    ├── security/             # rate-limit.ts (memory + Upstash), ip.ts
    ├── analytics/            # track.ts (client), events.ts (vocabulary)
    ├── free-tools/           # Pure, unit-tested tool logic
    ├── seo/                  # (reserved for schema helpers)
    ├── supabase/server.ts    # Service-role client (server-only guarded)
    ├── posts.ts              # Post metadata, draft filter, loaders, neighbors
    └── site.ts utils.ts
supabase/migrations/          # Version-controlled database schema
tests/unit/                   # Vitest unit tests
tests/integration/            # Vitest route/data integration tests
tests/e2e/                    # Playwright browser tests (desktop + mobile)
docs/                         # This documentation set
```

## Key flows

### Lead capture
`ContactForm` (client) → `POST /api/contact` → size cap → per-IP rate limit →
zod validation → honeypot check → per-email duplicate limit → persistence
(Supabase via service-role client; optional webhook notification) → honest
success/failure to the user. Success is only reported when storage confirms it
(dev-log mode excepted outside production).

### Rendering model
Public content is statically generated at build time (60+ pages). The
`/ai-tools` filter UI and free tools hydrate on the client with data passed as
props — no client-side fetching, no loading spinners for content.

### Data
Tool/service/free-tool catalogs are typed static data in `src/data/`, covered
by integrity tests (unique slugs, https URLs, valid categories, honest
pros/cons). Database usage is deliberately minimal: one `leads` table.

## Extension points (deliberately not built yet)

- **Payments**: the service CTA flow ends at the contact form; a checkout
  route can slot in behind `/services/*` without touching the catalog.
- **Admin**: leads are read via the Supabase dashboard or a service-role
  script; add an authenticated admin route only when volume justifies it.
- **Blog authoring**: metadata in `lib/posts.ts` + MDX body; no CMS needed.
- **Shared rate limiting**: Upstash REST integration is already implemented —
  set two env vars to activate; no code change required.

# AIlico — ailico.top

**Discover AI. Create smarter.**

A production-ready platform combining three products:

1. **AI Tools** — a curated directory of 30 verified AI tools across 8 categories, with honest pros/cons, pricing models, and last-verified dates.
2. **Free Tools** — five browser-based utilities (word counter, text case converter, URL slug generator, JSON formatter/validator, UTM link builder) that work without an account and process data locally.
3. **Services** — fixed-price offers (Website Quick Fix $79, Landing Page Development $199, AI Workflow Setup $99) with written scope agreed before payment, plus a hardened lead-capture form.

## Tech stack

Next.js 15 (App Router, static generation) · React 19 · TypeScript (strict) ·
Tailwind CSS 4 · lucide-react · Zod · MDX · Supabase PostgreSQL (optional at
dev, required in production) · Vitest · Playwright.

## Commands

```bash
pnpm install        # dependencies (pnpm is the lockfile package manager)
pnpm dev            # development at http://localhost:3000
pnpm lint           # ESLint
pnpm typecheck      # tsc --noEmit
pnpm test           # Vitest unit + integration tests
pnpm build          # production build (72 routes)
pnpm start          # serve the production build
pnpm test:e2e       # Playwright e2e (desktop + mobile; starts its own server)
```

Copy `.env.example` → `.env.local` for local development.

## Project structure

```
src/app/          Routes, API routes, error/loading boundaries, SEO plumbing
src/components/   Presentation (ui/ primitives, free-tools/ widgets)
src/data/         Static catalogs: tools, services, free tools (integrity-tested)
src/content/blog/ MDX article bodies
src/lib/          env, validation, security (rate limit, IP), analytics,
                  free-tools logic (pure + unit-tested), supabase client, posts
supabase/         Version-controlled database migrations
tests/            unit/ integration/ e2e/
docs/             ARCHITECTURE, SECURITY, ANALYTICS, DEPLOYMENT, CONTENT-PLAN,
                  BUSINESS-TRACKER
```

Detailed responsibilities: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

## Testing

| Layer | Tool | Coverage |
| --- | --- | --- |
| Unit | Vitest | slugify, text stats, case conversions, JSON error location, UTM builder, rate limiter, IP extraction, contact schema, posts metadata |
| Integration | Vitest | contact route handler (validation, honeypot, size cap, per-IP + duplicate throttles), sitemap integrity, RSS feed, full directory data integrity |
| E2E | Playwright | homepage, hero search → tool page, word counter live update, directory filtering, `/go/` redirect safety, contact form error + success paths, 404 page, article + RSS — on desktop Chromium and mobile WebKit |

## Environment variables

See `.env.example` (annotated). Summary:

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Recommended | Canonical URL base |
| `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | **Before launch** | Lead persistence (apply `supabase/migrations/` first) |
| `CONTACT_WEBHOOK_URL` | Optional | https webhook notification for new leads |
| `UPSTASH_REDIS_REST_URL` + `..._TOKEN` | Optional | Shared (multi-instance) rate limiting |
| `TRUST_PROXY_HEADERS` | No (default true) | Trust CF/forwarded headers for rate-limit keys |

In production without storage configured, the contact API **fails honestly**
(503 with a retry message) rather than pretending to save leads.

## Content operations

- **AI tools**: edit `src/data/tools.ts`. Rules: verified facts only, pricing
  *models* (never exact prices), `affiliateUrl` stays `null` until a
  partnership is approved in writing — setting it automatically adds
  `rel="sponsored nofollow"` and the disclosure note. Data integrity is
  enforced by tests (`pnpm test`).
- **Articles**: body in `src/content/blog/<slug>.mdx` + metadata in
  `src/lib/posts.ts`. `status: "draft"` hides a post from routes, lists, RSS,
  and the sitemap. `updated:` shows a revision date. Details:
  [docs/CONTENT-PLAN.md](docs/CONTENT-PLAN.md).

## Deployment

Full guide with commercial-use hosting comparison, Supabase migration steps,
rollback procedures, and launch checklist:
[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md). Security posture and known
limitations: [docs/SECURITY.md](docs/SECURITY.md).

## Verification status (this build)

- `pnpm lint` — clean · `pnpm typecheck` — clean
- `pnpm test` — **94/94 passing**
- `pnpm build` — 72 routes, zero errors, ~131 kB shared JS
- `pnpm test:e2e` — **18/18 passing** (desktop Chromium + mobile WebKit)
- CSP header verified live on the production server; site fully functional under it

## Legal note

The included privacy policy, terms, and affiliate disclosure are starting
drafts for a low-risk content site — not legal advice. Have a professional
review them for your jurisdiction before launch.

# Deployment Guide

This guide covers the recommended low-cost deployment path for a **commercial**
website, required environment variables, database setup, and the post-deploy
checklist.

## Before you deploy (one-time)

1. **Domain** — `ailico.top` DNS must be editable where it is registered.
2. **Supabase project** (free) — apply the migration (below) and copy env vars.
3. **Set `NEXT_PUBLIC_SITE_URL=https://ailico.top`** so canonicals, sitemap,
   RSS, and OG tags use the production domain.

## Choosing a host (commercial-use notes)

| Host | Cost | Commercial use on free tier | Notes |
| --- | --- | --- | --- |
| **Cloudflare Pages + Workers** (recommended) | Free / pay-as-you-go | ✅ Allowed | Use the OpenNext Cloudflare adapter (`@opennextjs/cloudflare`). Rate limiting works per-isolate; set the Upstash vars for shared limits. |
| **Vercel** | Pro $20/mo | ❌ Hobby tier is personal/non-commercial | Zero-config for Next.js; upgrade before operating commercially. |
| **Netlify** | Pro ~$19/mo | ❌ Free tier is personal/non-commercial | Good Next.js runtime. |
| **VPS (Hetzner/DigitalOcean)** | $4–12/mo | ✅ Full control | `pnpm build && pnpm start` behind Nginx/Caddy + PM2, or Docker. |

**Cloudflare compatibility audit (done, not assumed):** the app uses no
middleware, no Edge runtime pinning, no Node-only APIs in the render path, and
plain `fetch` for Upstash — all supported by the Workers runtime. The
`CF-Connecting-IP` header is preferred for rate-limit keys. In-memory rate
limiting and event counters are per-isolate; enable Upstash for shared state.

## Database setup (Supabase free tier)

The schema is version-controlled in `supabase/migrations/`.

**CLI route:**

```bash
supabase login
supabase link --project-ref <your-project-ref>
supabase db push          # applies supabase/migrations/*.sql
```

**Dashboard route:** open the SQL editor and paste
`supabase/migrations/0001_create_leads.sql`.

The migration creates the `leads` table (id UUID, name, email, website,
service, budget, message, status pipeline, source, timestamps, indexes),
an `updated_at` trigger, and enables RLS **with no anon policies** — only the
service-role key (used server-side) can read or write. Verify in
Authentication → Policies that `leads` shows no public policies.

## Environment variables (production)

| Variable | Public/Secret | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Public | Canonical base URL |
| `SUPABASE_URL` | Secret-ish (server) | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | **Secret** | Service-role key — server env only |
| `CONTACT_WEBHOOK_URL` | Secret (server) | Optional https webhook for lead notifications |
| `UPSTASH_REDIS_REST_URL` / `..._TOKEN` | Secret (server) | Optional shared rate limiting |
| `TRUST_PROXY_HEADERS` | Public | `"true"` behind Cloudflare/proxy (default) |

> Without Supabase **and** webhook configured, production contact submissions
> return an honest "could not save" error (503) instead of silently losing
> leads. Configure at least one before launch.

## Option A — Cloudflare Pages (free, recommended)

1. Commit the repo to GitHub (below).
2. Workers & Pages → Create → Pages → Connect to Git.
3. Build command: `npx opennextjs-cloudflare build`; output: `.open-next/`.
4. Add the environment variables above, deploy, then attach the custom domain
   `ailico.top` (Pages shows the DNS records to add).
5. HTTPS is automatic; verify with `curl -I https://ailico.top`.

## Option B — VPS with Node

```bash
git clone <your-repo> ailico && cd ailico
pnpm install --frozen-lockfile
pnpm build
pm2 start "pnpm exec next start -p 3000" --name ailico
# Caddy/Nginx with TLS in front; point ailico.top at the server
```

## Testing & build commands

```bash
pnpm lint        # ESLint
pnpm typecheck   # tsc --noEmit
pnpm test        # Vitest unit + integration (94 tests)
pnpm build       # Production build (72 routes)
pnpm test:e2e    # Playwright: desktop Chromium + mobile WebKit (18 tests)
                  # starts its own server on :3111 against the built app
```

## Git / GitHub

```bash
cd ailico
git add -A
git commit -m "Production boilerplate: persistence, security, tests, docs"
git remote add origin https://github.com/<you>/ailico.git
git push -u origin main
```

Keep the repo private until launch; confirm `.env.local` is never committed
(it is gitignored — verify with `git status` before pushing).

## Post-deploy checklist

- [ ] `https://ailico.top` loads; `curl -I` shows the security headers + CSP
- [ ] Contact form test lead → row appears in Supabase `leads`
- [ ] `/sitemap.xml` lists production URLs; `/robots.txt` references it
- [ ] `/feed.xml` returns the RSS feed
- [ ] `/go/claude` redirects to the official site
- [ ] Submit the sitemap in [Google Search Console](https://search.google.com/search-console) (DNS TXT verification)
- [ ] Bing Webmaster Tools submission
- [ ] Real-phone pass: nav menu, a free tool, the contact form
- [ ] Full security checklist in [SECURITY.md](SECURITY.md) completed

## Rollback & recovery

- **Cloudflare Pages / Vercel / Netlify:** redeploy the previous commit from
  the deployments list (instant, no rebuild).
- **VPS:** `git checkout <previous-tag> && pnpm install && pnpm build && pm2 restart ailico`.
- **Database:** migrations are additive; roll back by reverting the migration
  file and applying a corrective SQL in the editor. Back up `leads` before
  schema changes (`supabase db dump` or Table Editor export).
- **Bad content emergency:** fix forward with a commit — static pages
  redeploy in minutes.

## Ongoing costs (MVP)

| Item | Cost |
| --- | --- |
| Domain | ~$5–15/yr |
| Cloudflare Pages | $0 |
| Supabase (free tier) | $0 |
| Upstash Redis (free tier, optional) | $0 |
| **Total** | **~$1/mo** (domain amortized) |

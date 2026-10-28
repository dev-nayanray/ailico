# Security Checklist & Notes

## Implemented safeguards

| Area | Control |
| --- | --- |
| Input validation | Server-side zod schemas on every public endpoint (`src/lib/validation/`); the client mirrors limits but is never trusted |
| URL protocols | Website field and tool links restricted to http(s); `z.url()` alone is insufficient (it accepts `javascript:` — caught by a unit test) |
| Open redirects | `/go/[slug]` redirects only to hardcoded, tested https tool URLs — no user-supplied destinations exist |
| Request size | 12 KB cap on `/api/contact`, 2 KB cap on `/api/track`, checked before JSON parsing |
| Rate limiting | Per-IP (5/h) + per-email (2/h) on contact; 120/min on track. Memory by default, **Upstash Redis shared mode** when env vars are set |
| Spam | Honeypot field (`company_website`) — bots receive a fake success, nothing is stored |
| Secrets | Only `NEXT_PUBLIC_SITE_URL` is public. Supabase service key lives server-side; `src/lib/supabase/server.ts` is `server-only`-guarded so a client import fails the build |
| Database access | RLS enabled on `leads` with **zero** anon policies; all writes/reads via the service-role key. Never add an anon insert/select policy |
| Headers | `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, HSTS, and a tested CSP (`default-src 'self'`, no external origins) |
| Error handling | Users see generic retry messages; details go to server logs only. Error boundary (`error.tsx`) for unexpected render failures |
| Logs | Contact submissions log a summary without names, emails, or message bodies (`logSafeSummary`) |
| Webhook | `CONTACT_WEBHOOK_URL` comes only from environment config (https enforced by env validation) — never from user input |

## Known limitations (accepted, documented)

1. **In-memory rate limiting by default** — per-instance counters reset on
   restart and are not shared across instances. Activate the implemented
   Upstash integration (free tier) when deploying multi-instance. The server
   logs a warning in production until then.
2. **No strict-nonce CSP** — Next.js hydration requires inline scripts, so the
   CSP allows `'unsafe-inline'` for scripts/styles. No third-party scripts are
   loaded, keeping the practical attack surface small. Nonce-based CSP can be
   introduced when middleware-level header control is warranted.
3. **Rate limiter fails open** if Upstash errors — availability over strictness;
   the trade-off is logged.
4. **Contact form has no CAPTCHA** — honeypot + rate limits are the deliberate
   MVP posture; add a privacy-respecting challenge (e.g., Turnstile) if spam
   volume grows.

## Pre-launch checklist

- [ ] `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` set in the host (no dev-log mode in production)
- [ ] Migration `0001_create_leads.sql` applied; RLS shows enabled with no policies
- [ ] Service-role key present in **server env only** — never in `NEXT_PUBLIC_*`
- [ ] `NEXT_PUBLIC_SITE_URL=https://ailico.top`
- [ ] `https://ailico.top` returns the site over HTTPS; http redirects
- [ ] Security headers visible in production responses (`curl -I`)
- [ ] Test lead submitted on production → row visible in Supabase
- [ ] `git log -p` / secret scanner shows no credentials in history
- [ ] Dependency audit run (`pnpm audit`) and findings triaged

## Lead retrieval for the owner

- Supabase Dashboard → Table Editor → `leads` (service key bypasses RLS), or
- SQL editor: `select * from leads order by created_at desc limit 50;`
- Update pipeline status via the `status` column
  (new/contacted/qualified/proposal_sent/won/lost/spam).

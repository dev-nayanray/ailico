# Business Tracker (Manual)

A lightweight weekly tracker for the revenue goal. Copy this table into a
spreadsheet (Google Sheets is free) or fill the Markdown copy below monthly.
The built-in anonymous event counters (`/api/track`) cover site behavior
(searches, tool usage, copies, CTA clicks, form submits); this file tracks the
**business** funnel, which no analytics tool can see.

## Weekly outreach log

| Week | Prospects contacted | Replies | Qualified leads | Proposals sent | Projects won | Revenue collected | Expenses | Delivery hours |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| W1 (Nov 3) | 0 | 0 | 0 | 0 | 0 | $0 | $0 | 0 |
| W2 | | | | | | | | |
| W3 | | | | | | | | |

**Conversion benchmarks to watch (rules of thumb, not promises):**

- Reply rate under ~10% after 30+ quality pitches → rewrite the pitch, not the volume.
- Replies → qualified leads is a qualification step: drop anyone without a real
  problem you can scope.
- Won projects: log delivery hours to sanity-check pricing ($79 ÷ 8 h = $9.9/h is
  a loss; 3 h is healthy for a quick fix).

## Affiliate log

| Month | Program | Clicks (from `/go/` counters) | Conversions | Commission |
| --- | --- | --- | --- | --- |
| — | none active | — | — | — |

Record a program here **only after** written approval, and set its `affiliateUrl`
in `src/lib/tools.ts` at the same time. Before approval, all links point to
official sites.

## Monthly rollup

| Month | Articles published | Organic clicks (GSC) | Leads | Proposals | Wins | Revenue | Costs |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Nov 2026 | | | | | | | |

## Revenue goal math (planning aid, not a forecast)

$300/mo ≈ 2 × Landing Page + 1 × Quick Fix, or ~4 × Quick Fix equivalents.
Every week of 10 outreach contacts compounds the pipeline; the site's job is
credibility and inbound, outreach's job is volume.

## Where the site data lives

- Event counts (searches, tool uses, copies, CTAs, submits): server logs via
  `console.info("[track] ...")` lines — grep the host's log drain, or wire the
  `/api/track` route to a real sink later.
- Outbound clicks per tool: `[outbound] <slug> ... (total: N)` log lines.
- Leads: Supabase `leads` table (or webhook payload store).

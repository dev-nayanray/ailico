# Analytics: Events & Privacy

AIlico ships a deliberately minimal, privacy-conscious measurement layer: no
cookies, no fingerprinting, no cross-site tracking, no personal data.

## How it works

1. Client components call `trackEvent(name, meta)` (`src/lib/analytics/track.ts`)
   via `navigator.sendBeacon`.
2. `POST /api/track` validates the event name against the fixed vocabulary in
   `src/lib/analytics/events.ts`, caps the payload at 2 KB, rate-limits the
   sender, and increments an in-memory counter.
3. Each event logs one aggregate line (`[track] <name> (total: N) <meta>`),
   visible in the host's log drain.
4. Outbound tool clicks are counted server-side in `/go/[slug]`
   (`[outbound] <slug> ...`).

## Event vocabulary

| Event | Fired when | Metadata (non-personal) |
| --- | --- | --- |
| `search_submit` | Hero/directory search submitted | location, query length |
| `tool_used` | A free tool performs an action | tool name, action |
| `copy_action` | Copy button used | tool name |
| `contact_submit` | Contact form accepted | requested service slug |
| `cta_click` | Service CTA clicked | location, target |
| `outbound_click` | `/go/[slug]` redirect served (server-side) | tool slug |

## Rules

- Never put names, emails, message text, URLs of user sites, or any free-text
  into event metadata.
- Analytics failures are swallowed on the client — tracking must never break UX.
- When a real analytics product is justified (e.g., Plausible), mount its
  script via the layout and extend this document with its data policy.

## Where the numbers live today

- Dev/single instance: stdout logs (`[track]`, `[outbound]`, `[contact]`).
- Production: the hosting platform's log drain (Cloudflare Workers "Workers
  Logs", Vercel "Runtime Logs"). Aggregate by grepping event names.

## Business funnel tracking

Site events cover behavior only. Pipeline metrics (prospects, replies,
proposals, wins, revenue) live in [BUSINESS-TRACKER.md](BUSINESS-TRACKER.md) —
no analytics tool can see those.

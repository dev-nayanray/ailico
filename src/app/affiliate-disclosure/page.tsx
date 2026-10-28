import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affiliate Disclosure",
  description:
    "How affiliate links work on AIlico: when we earn commissions, how links are marked, and why paid relationships never influence our tool listings or rankings.",
  alternates: { canonical: "/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-ink">Affiliate Disclosure</h1>
      <p className="mt-2 text-sm text-ink-faint">Last updated: October 28, 2026</p>

      <div className="mt-8 space-y-8 leading-7 text-ink-soft [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1">
        <section>
          <h2>The short version</h2>
          <p>
            Some links from AIlico to third-party tools may be affiliate links,
            meaning we may earn a commission if you subscribe or purchase — at no
            additional cost to you. As of the date above, <strong className="text-ink">no
            affiliate partnerships are active</strong>: every outbound link currently
            points to the tool&apos;s official website, and we earn nothing from your
            clicks or purchases. This page explains how the system will work when
            partnerships are approved.
          </p>
        </section>

        <section>
          <h2>What an affiliate link is</h2>
          <p>
            An affiliate link is a special URL that tells the merchant&apos;s website
            that a visitor arrived from AIlico. If you make a purchase within the
            merchant&apos;s referral window, the merchant pays us a small commission.
            You pay exactly the same price you would pay by visiting the site
            directly.
          </p>
        </section>

        <section>
          <h2>How we mark affiliate links</h2>
          <ul>
            <li>
              Affiliate links are routed through a click counter on our site and
              marked with the standard <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-sm">rel=&quot;sponsored&quot;</code>{" "}
              attribute, following search-engine guidance for paid links.
            </li>
            <li>
              Where a recommendation appears near an affiliate link, the disclosure
              is visible on the page — not buried in the footer alone.
            </li>
            <li>
              Our click counter records only that a click happened. It stores no
              personal data, sets no cookies, and builds no profiles.
            </li>
          </ul>
        </section>

        <section>
          <h2>What affiliate relationships will never change</h2>
          <ul>
            <li>
              <strong className="text-ink">Rankings are not for sale.</strong> Tools
              are listed because they are genuinely capable, and organized by
              usefulness and category fit.
            </li>
            <li>
              <strong className="text-ink">Coverage is not for sale.</strong> A tool
              with no affiliate program can be listed and recommended; a tool with a
              generous program can be criticized and excluded.
            </li>
            <li>
              <strong className="text-ink">Pros and cons stay honest.</strong> Every
              listing keeps its limitations section, partner or not.
            </li>
            <li>
              <strong className="text-ink">No fake urgency or pricing.</strong> We
              never invent discounts, &quot;exclusive deals&quot;, or expiry
              countdowns, and we never state exact third-party prices we cannot
              verify.
            </li>
            <li>
              <strong className="text-ink">Paid placements are labeled.</strong> If
              we ever offer sponsored placements or advertising, they will be
              visually distinct from editorial content and explicitly labeled.
            </li>
          </ul>
        </section>

        <section>
          <h2>Questions</h2>
          <p>
            If anything about how we handle affiliate relationships is unclear, ask
            us through the{" "}
            <a href="/contact" className="font-medium text-accent hover:underline">
              contact page
            </a>{" "}
            — we answer honestly, every time.
          </p>
        </section>
      </div>
    </div>
  );
}

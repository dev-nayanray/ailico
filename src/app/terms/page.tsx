import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of AIlico's website, free tools, and services — including service scope, payment, intellectual property, and limitations of liability.",
  alternates: { canonical: "/terms" },
};

const lastUpdated = "October 28, 2026";

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-ink">Terms of Service</h1>
      <p className="mt-2 text-sm text-ink-faint">Last updated: {lastUpdated}</p>

      <div className="mt-8 space-y-8 leading-7 text-ink-soft [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1">
        <section>
          <h2>Acceptance of these terms</h2>
          <p>
            By accessing ailico.top (the &quot;Site&quot;) or purchasing services from
            AIlico (&quot;we&quot;, &quot;us&quot;), you agree to these Terms of Service.
            If you do not agree, please do not use the Site. If you have questions,
            contact us before relying on anything described here.
          </p>
        </section>

        <section>
          <h2>Using the Site and free tools</h2>
          <ul>
            <li>
              The free tools (word counter, case converter, slug generator, JSON
              formatter, UTM builder) are provided free of charge, without an
              account, and process data locally in your browser.
            </li>
            <li>
              You may use them for personal and commercial work. You may not
              resell, mirror, or present them as your own service.
            </li>
            <li>
              The tools are provided as-is. While we test them carefully, always
              verify important output (for example, re-validate formatted JSON in
              your own pipeline) before relying on it in production.
            </li>
            <li>
              You agree not to abuse the Site: no automated scraping at volume, no
              attempts to bypass rate limits, no submitting unlawful or malicious
              content through our forms.
            </li>
          </ul>
        </section>

        <section>
          <h2>Services: scope, payment, and delivery</h2>
          <ul>
            <li>
              <strong className="text-ink">Scope governs.</strong> Every engagement
              begins with a written scope — deliverables, exclusions, turnaround,
              and fixed price — which we both agree to before work starts. That
              document, not these general terms, is the authority on what a project
              includes.
            </li>
            <li>
              <strong className="text-ink">Payment.</strong> Work begins after the
              agreed fixed price is paid. Prices are listed in US dollars; payment
              methods are arranged individually (we do not currently process card
              payments on this Site).
            </li>
            <li>
              <strong className="text-ink">If we cannot deliver</strong> an agreed
              item in scope, that item is refunded or substituted for another agreed
              item of equal value, at your choice.
            </li>
            <li>
              <strong className="text-ink">Revisions.</strong> Each service includes
              the revision round stated on its page (for example, one revision
              round within the agreed scope). Work beyond the agreed scope is
              quoted separately and never billed without your approval.
            </li>
            <li>
              <strong className="text-ink">Client responsibilities.</strong> Timely
              access, information, and feedback are required for the stated
              turnaround times to hold. Deliverables requiring your review pause
              the clock until you respond.
            </li>
          </ul>
        </section>

        <section>
          <h2>Intellectual property</h2>
          <p>
            On final payment for any service, you own the deliverables produced
            specifically for your project (code, content, documentation). We retain
            the right to reuse general knowledge, techniques, and non-project-specific
            experience gained during the work. The Site itself — including its
            articles, directory content, and design — belongs to AIlico and is not
            licensed for reproduction.
          </p>
        </section>

        <section>
          <h2>Third-party tools and links</h2>
          <p>
            The Site describes and links to third-party AI tools and services. Those
            products are owned and operated by their respective providers; their
            prices, terms, and availability can change at any time, and we record
            pricing models rather than exact prices for that reason. Your
            relationship with those providers is governed entirely by their terms,
            not ours. Some outbound links may be affiliate links — see the{" "}
            <a href="/affiliate-disclosure" className="font-medium text-accent hover:underline">
              affiliate disclosure
            </a>
            .
          </p>
        </section>

        <section>
          <h2>Accuracy of information</h2>
          <p>
            We verify listings against official sources and label each with a
            last-verified date, but we do not guarantee that every detail of a
            third-party product remains current. Always confirm critical facts
            (pricing, terms, availability) with the provider before making decisions.
          </p>
        </section>

        <section>
          <h2>Limitation of liability</h2>
          <p>
            To the maximum extent permitted by law, AIlico is not liable for
            indirect or consequential damages arising from use of the Site or free
            tools. Our total liability for any service engagement is limited to the
            amount you paid for that engagement. Nothing in these terms limits
            liability where doing so would be unlawful.
          </p>
        </section>

        <section>
          <h2>Governing law</h2>
          <p>
            These terms are governed by the laws applicable at the operator&apos;s
            place of business, without regard to conflict-of-law rules. Disputes are
            first addressed through good-faith communication — contact us; we
            resolve problems.
          </p>
        </section>

        <section>
          <h2>Changes</h2>
          <p>
            We may update these terms; the date at the top reflects the current
            version. Material changes affecting service clients are communicated
            directly to affected clients.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about these terms? Write to us via the{" "}
            <a href="/contact" className="font-medium text-accent hover:underline">
              contact page
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How AIlico collects, uses, and protects information: what our contact form collects, how our analytics work, cookie usage, affiliate links, and your rights.",
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

const lastUpdated = "October 28, 2026";

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight text-ink">Privacy Policy</h1>
      <p className="mt-2 text-sm text-ink-faint">Last updated: {lastUpdated}</p>

      <div className="mt-8 space-y-8 leading-7 text-ink-soft [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-ink [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mt-1">
        <section>
          <h2>Overview</h2>
          <p>
            AIlico (&quot;we&quot;, &quot;us&quot;, operating at ailico.top) is designed to
            collect as little personal information as possible. This policy explains,
            in plain English, what we collect, why, and what your choices are. The
            short version: our free tools process everything locally in your browser;
            we store personal details only when you choose to send them through our
            contact form; we do not run advertising trackers.
          </p>
        </section>

        <section>
          <h2>Information we collect</h2>
          <h3 className="mt-5 font-semibold text-ink">1. Information you give us (contact form)</h3>
          <p>
            When you submit our contact form we collect the fields shown on the form:
            your name, email address, the requested service, an optional website URL,
            an optional budget range, your project description, and your consent
            confirmation. We use this information solely to evaluate and respond to
            your inquiry. We do not publish, sell, or share it with third parties for
            marketing, and we do not add you to a mailing list.
          </p>
          <h3 className="mt-5 font-semibold text-ink">2. Automatically collected technical data</h3>
          <p>
            Like virtually all websites, our hosting provider records standard server
            logs (IP address, browser type, pages requested, timestamp) for security
            and abuse prevention, including rate limiting on our forms. We also count
            anonymous usage events — for example, that a search or a tool was used —
            without personal identifiers. These events contain no names, no IP
            addresses in storage, and no cross-site tracking.
          </p>
          <h3 className="mt-5 font-semibold text-ink">3. What our free tools collect: nothing</h3>
          <p>
            The word counter, text case converter, URL slug generator, JSON
            formatter, and UTM link builder run entirely in your browser. The text
            you enter never leaves your device and is never transmitted to or stored
            on our servers.
          </p>
        </section>

        <section>
          <h2>Cookies</h2>
          <p>
            We do not set advertising or tracking cookies. This site sets no cookies
            of its own. If we add preference features in the future that require
            cookies, we will update this policy first.
          </p>
        </section>

        <section>
          <h2>Third-party services</h2>
          <ul>
            <li>
              <strong className="text-ink">Hosting:</strong> the site is served by a
              commercial hosting provider whose standard logging applies to all
              visitors.
            </li>
            <li>
              <strong className="text-ink">Outbound links:</strong> links to external
              websites (including AI tool sites) lead to services we do not control.
              If we ever participate in affiliate programs, those merchants may set
              their own cookies when you click through — see our{" "}
              <a href="/affiliate-disclosure" className="font-medium text-accent hover:underline">
                affiliate disclosure
              </a>
              .
            </li>
          </ul>
        </section>

        <section>
          <h2>How long we keep information</h2>
          <p>
            Contact form submissions are kept only as long as needed to handle your
            inquiry and any resulting project, plus a reasonable archival period.
            Anonymous usage counters contain no personal data. You may request
            deletion of your inquiry data at any time (see below).
          </p>
        </section>

        <section>
          <h2>Your rights</h2>
          <p>
            Depending on your location (including the EU/UK under GDPR and
            California under CCPA/CPRA), you may have rights to access, correct,
            delete, or export personal information we hold about you, and to object
            to processing. To exercise any of these rights, contact us through the{" "}
            <a href="/contact" className="font-medium text-accent hover:underline">
              contact form
            </a>{" "}
            — we respond within a reasonable period and never require you to create
            an account.
          </p>
        </section>

        <section>
          <h2>Children</h2>
          <p>
            This site is intended for a general professional audience and is not
            directed at children under 13 (or under 16 in the EU). We do not
            knowingly collect information from children.
          </p>
        </section>

        <section>
          <h2>Changes to this policy</h2>
          <p>
            If we change this policy, we will update the date at the top of this
            page. Material changes (for example, adding cookies or analytics
            services) will be described here before they take effect.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            Questions about this policy? Reach us via the{" "}
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

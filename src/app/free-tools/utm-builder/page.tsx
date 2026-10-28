import type { Metadata } from "next";
import { ToolShell, toolPageMetadata } from "@/components/free-tools/tool-shell";
import { UtmBuilder } from "@/components/free-tools/utm-builder";

export const metadata: Metadata = toolPageMetadata(
  "utm-builder",
  "Free UTM Link Builder — Trackable Campaign URLs",
  "Build consistent UTM tracking links for Google Analytics and other platforms. Validated inputs, presets for common sources, live preview, one-click copy."
);

export default function UtmBuilderPage() {
  return (
    <ToolShell
      slug="utm-builder"
      intro={
        <>
          <p>
            UTM parameters are tags you add to a URL so analytics platforms can report
            where your traffic came from. When someone clicks{" "}
            <code className="break-all rounded bg-surface-muted px-1 py-0.5 font-mono text-sm">
              ?utm_source=newsletter&amp;utm_medium=email&amp;utm_campaign=october-launch
            </code>,
            your analytics attributes that visit to the October launch email — instead
            of losing it in a sea of “direct” traffic.
          </p>
          <p>
            The five standard parameters are <strong>utm_source</strong> (where the
            link lives), <strong>utm_medium</strong> (the marketing channel),
            <strong> utm_campaign</strong> (the specific promotion),
            <strong> utm_term</strong> (paid keywords), and
            <strong> utm_content</strong> (which creative variant). The first three are
            required for useful reports; this builder enforces them.
          </p>
          <p>
            Consistency matters more than the exact words you choose. “Twitter”,
            “twitter”, and “x.com” become three separate rows in reports. Pick a
            convention — always lowercase, always the same source names — and stick to
            it. The presets and live preview here make that easy, and the link is
            built with proper URL encoding automatically.
          </p>
        </>
      }
      howTo={[
        "Paste the destination URL (the page you want people to land on).",
        "Enter the source, medium, and campaign name — presets are available for common sources and media.",
        "Optionally add a keyword term or content label for A/B variants.",
        "Copy the finished campaign URL from the violet result box, or open it with “Test link” to verify it loads correctly.",
      ]}
      example={
        <>
          <p>
            Destination: <code className="rounded bg-surface-muted px-1 py-0.5 font-mono text-sm">https://example.com/spring-offer</code>{" "}
            with source <em>newsletter</em>, medium <em>email</em>, campaign{" "}
            <em>spring-sale-2026</em> produces:
          </p>
          <p className="mt-2">
            <code className="break-all rounded bg-surface-muted px-2 py-1 font-mono text-sm">
              https://example.com/spring-offer?utm_source=newsletter&utm_medium=email&utm_campaign=spring-sale-2026
            </code>
          </p>
          <p className="mt-2">
            In your analytics reports, that link's sessions appear under the
            “spring-sale-2026” campaign with source/medium “newsletter / email”.
          </p>
        </>
      }
      faqs={[
        {
          question: "Do UTM parameters hurt SEO or slow my site?",
          answer:
            "No. They are plain query parameters — they do not affect page speed. For SEO hygiene, ensure your site has canonical tags so campaign variants of a URL consolidate to one canonical address in search indexes.",
        },
        {
          question: "What is the difference between utm_source and utm_medium?",
          answer:
            "Source names the specific origin (google, newsletter, linkedin). Medium names the channel category (cpc, email, social, referral). Together they answer “where did this visitor come from, via what kind of marketing?”",
        },
        {
          question: "Should UTM values be lowercase?",
          answer:
            "We recommend always lowercase. Analytics platforms treat “Email” and “email” as different values, and mixed-case naming quietly fragments your reports.",
        },
        {
          question: "What is utm_content used for?",
          answer:
            "utm_content distinguishes similar links within the same campaign — for example the banner version (“banner-a” vs “banner-b”) or the CTA text (“top-button” vs “footer-link”) — so you can see which variant drives more clicks.",
        },
        {
          question: "Can I use UTMs with any analytics tool?",
          answer:
            "UTM parameters are an industry standard read by Google Analytics and many other platforms (Matomo, Fathom, Plausible, and most ad trackers). Any tool that reads the standard will pick these links up automatically.",
        },
      ]}
    >
      <UtmBuilder />
    </ToolShell>
  );
}

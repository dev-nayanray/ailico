import type { Metadata } from "next";
import { Clock, FileCheck2, Handshake, MessageSquareText } from "lucide-react";
import { ContactForm } from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact AIlico — Get a Quote for Web or AI Services",
  description:
    "Tell us about your project. We reply within 2 business days with a confirmed scope and fixed price — written and agreed before any payment.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact AIlico — Get a Quote for Web or AI Services",
    description:
      "Tell us about your project. We reply within 2 business days with a written scope and fixed price.",
    url: "/contact",
  },
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const validServices = ["website-quick-fix", "landing-page-development", "ai-workflow-setup"];
  const defaultService = validServices.includes(service ?? "") ? service! : "";

  return (
    <>
      <section className="border-b border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Contact
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Tell us what you need built or fixed
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
            One form, no sales funnel. Describe your project in your own words and
            we will come back with a clear scope, honest feasibility, and a fixed
            price — in writing, before you pay anything.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
          <ContactForm defaultService={defaultService} />

          <aside aria-label="What happens after you send">
            <h2 className="text-lg font-semibold text-ink">What happens next</h2>
            <ol className="mt-5 space-y-5">
              {[
                {
                  icon: MessageSquareText,
                  title: "We read it properly",
                  text: "Every inquiry is read by the person who will do the work — not a sales team.",
                },
                {
                  icon: Clock,
                  title: "Reply within 2 business days",
                  text: "Usually faster. If your request is urgent, say so in the description.",
                },
                {
                  icon: FileCheck2,
                  title: "Written scope and price",
                  text: "You receive deliverables, exclusions, turnaround, and the fixed price by email. Approve it or walk away — free.",
                },
                {
                  icon: Handshake,
                  title: "We start on your approval",
                  text: "Work begins once the scope is agreed. You always know exactly what you are getting.",
                },
              ].map((step, index) => (
                <li key={step.title} className="flex gap-3.5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent-strong">
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-ink">
                      {index + 1}. {step.title}
                    </p>
                    <p className="mt-1 text-sm leading-6 text-ink-soft">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 rounded-xl border border-line bg-surface-tint p-5">
              <h2 className="text-sm font-semibold text-ink">Your data, briefly</h2>
              <p className="mt-2 text-sm leading-6 text-ink-soft">
                We collect only the fields in this form, use them solely to respond to
                your inquiry, and never publish or sell them. Details are in the{" "}
                <a href="/privacy-policy" className="font-medium text-accent hover:underline">
                  privacy policy
                </a>
                .
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

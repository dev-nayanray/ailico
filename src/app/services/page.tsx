import type { Metadata } from "next";
import { Check } from "lucide-react";
import { services } from "@/data/services";
import { ButtonLink } from "@/components/ui/button";
import { FaqAccordion } from "@/components/faq";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Web & AI Services — Fixed Prices, Clear Scope",
  description:
    "Website Quick Fix ($79), Landing Page Development ($199), and AI Workflow Setup ($99). Fixed-scope services with written deliverables, exclusions, and turnaround times agreed before payment.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Web & AI Services — Fixed Prices, Clear Scope | AIlico",
    description:
      "Three fixed-scope services with transparent pricing and written deliverables.",
    url: "/services",
  },
};

const overviewFaq = [
  {
    question: "Why fixed prices instead of hourly billing?",
    answer:
      "Fixed scope means you know the full cost before committing, and we are incentivized to work efficiently rather than slowly. Every project starts with a written scope summary that lists exactly what is and is not included.",
  },
  {
    question: "How do payments work?",
    answer:
      "After you approve the written scope, we invoice for the fixed amount. Work begins once payment is received. If we cannot deliver an agreed item, that item is refunded. We currently do not process card payments on this site — payment details are arranged directly with each client.",
  },
  {
    question: "What if my project does not fit these three services?",
    answer:
        "Send us a description anyway. If it is close to a listed service we will quote a variant. If it is genuinely different work, we will tell you honestly — and suggest an alternative if we know one.",
  },
  {
    question: "Do you sign NDAs and work under confidentiality?",
    answer:
      "Yes, on request for service work. Your project details are never published as case studies without your written permission.",
  },
  {
    question: "Can you maintain the site or workflow after delivery?",
    answer:
      "Delivery includes handover documentation so you are not dependent on us. If you would like ongoing help, we can discuss a simple maintenance arrangement once the initial project is complete.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="border-b border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Services
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            Fixed-scope web and AI services with the price up front
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-ink-soft">
            Three clearly defined offers for small businesses and solo operators. Every
            engagement starts with a written scope you approve before paying anything —
            and everything we deliver is yours to keep.
          </p>
        </div>
      </section>

      <section aria-label="Service pricing" className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.slug}
              className="flex h-full flex-col rounded-xl border border-line bg-surface p-6 shadow-sm"
            >
              <h2 className="text-lg font-semibold text-ink">{service.name}</h2>
              <p className="mt-1 text-sm text-ink-soft">{service.tagline}</p>
              <p className="mt-4">
                <span className="text-4xl font-bold text-ink">${service.price}</span>
                <span className="ml-2 text-sm text-ink-faint">fixed price</span>
              </p>
              <ul className="mt-5 space-y-2.5 text-sm text-ink-soft">
                {service.deliverables.slice(0, 4).map((item) => (
                  <li key={item} className="flex gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex items-center gap-3 pt-6">
                <ButtonLink href={`/services/${service.slug}`} variant="outline" size="sm" className="flex-1">
                  Full details
                </ButtonLink>
                <ButtonLink href={`/contact?service=${service.slug}`} size="sm" className="flex-1">
                  Get a Quote
                </ButtonLink>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-ink-faint">
          These are introductory prices for new clients while we build our public
          portfolio — all the more reason to lock in scope now.
        </p>
      </section>

      <section aria-labelledby="how-we-work" className="border-y border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <SectionHeading
            align="left"
            eyebrow="How We Work"
            title="A process designed to remove risk"
          />
          <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "1. Written scope",
                text: "We confirm deliverables, exclusions, and price by email before anything else. You approve it — or walk away, free.",
              },
              {
                title: "2. Fixed price",
                text: "The number we quote is the number you pay. No hourly creep, no surprise line items.",
              },
              {
                title: "3. Clear turnaround",
                text: "Each service has a stated delivery window, counted from kickoff after payment.",
              },
              {
                title: "4. Full handover",
                text: "Code, documentation, and a walkthrough. You own everything and can maintain it without us.",
              },
            ].map((step) => (
              <li key={step.title} className="rounded-xl border border-line bg-surface p-5">
                <h3 className="font-semibold text-ink">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-soft">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="services-faq" className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <SectionHeading eyebrow="FAQ" title="Common questions" />
        <div className="mt-8">
          <FaqAccordion items={overviewFaq} />
        </div>
      </section>

      <section className="border-t border-line bg-accent-soft/60">
        <div className="mx-auto max-w-6xl px-4 py-14 text-center sm:px-6">
          <h2 className="text-2xl font-bold tracking-tight text-ink">
            Not sure which service fits?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-ink-soft">
            Describe the problem in plain words — we will recommend the right scope (or
            honestly tell you if none of our services fit).
          </p>
          <div className="mt-6">
            <ButtonLink href="/contact" size="lg">
              Get a Website Quote
            </ButtonLink>
          </div>
        </div>
      </section>
    </>
  );
}

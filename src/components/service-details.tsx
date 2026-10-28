import { Check, Clock, ClipboardList, UserCheck, X } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { FaqAccordion } from "@/components/faq";
import { type Service, services } from "@/data/services";

const serviceFaqs: Record<string, { question: string; answer: string }[]> = {
  "website-quick-fix": [
    {
      question: "How do we agree the three issues before payment?",
      answer:
        "You send us your site URL and a description of the problems through the contact form. We review them, confirm which three are in scope, and email you a short written summary. Only after you approve that summary do we send payment instructions and begin work.",
    },
    {
      question: "What if my problem turns out to be bigger than three quick fixes?",
      answer:
        "We will tell you honestly before starting. If the work needs a redesign, custom development, or more than three fixes, we will say so and quote separately — for example as a Landing Page Development project. We never quietly expand the scope.",
    },
    {
      question: "Do you work with any platform?",
      answer:
        "We work with common platforms including WordPress, static site generators, and Next.js sites. If your site is on an unusual or heavily customized stack, we will confirm feasibility during the scoping step before any payment.",
    },
    {
      question: "What if an issue cannot be fixed?",
      answer:
        "If we cannot fix one of the agreed issues — for example, a limitation of your hosting platform — we tell you why, suggest alternatives, and that item is refunded or substituted for another agreed fix. You never pay for an undelivered item.",
    },
  ],
  "landing-page-development": [
    {
      question: "What technology do you build with?",
      answer:
        "By default we build with Next.js (React) and Tailwind CSS — the same proven stack this site uses. That gives you fast page loads, clean code you can hand to any developer later, and easy hosting on providers like Vercel, Netlify, or Cloudflare. If you specifically need WordPress, we can discuss it.",
    },
    {
      question: "Do you write the page copy?",
      answer:
        "You provide the core information about your offer (what it is, who it is for, pricing if any). We structure it into a persuasive page layout and improve wording and clarity. Full copywriting from scratch is available as an add-on — quoted before any work starts.",
    },
    {
      question: "What does 'one revision round' mean?",
      answer:
        "After delivery you review the page and send one consolidated list of changes within the agreed scope. We complete them all in one pass. New sections, new offers, or changes of direction after sign-off are quoted separately.",
    },
    {
      question: "Who owns the code and design?",
      answer:
        "You do, fully, on final payment. We hand over the repository and deployment notes. There is no lock-in to us for future edits.",
    },
  ],
  "ai-workflow-setup": [
    {
      question: "What kinds of tasks suit an AI workflow?",
      answer:
        "Repetitive, text-heavy tasks with clear patterns: drafting standard replies, summarizing inquiries, extracting structured data from emails, preparing weekly reports, generating product descriptions from a template. Tasks requiring judgment on ambiguous cases or regulated decisions are poor fits.",
    },
    {
      question: "Do I need paid AI subscriptions?",
      answer:
        "Not necessarily — many workflows run on free tiers. If your volume genuinely requires a paid tool, we will tell you which one, what it costs, and what the free alternative is before you commit. Tool subscription costs are yours and are never marked up by us.",
    },
    {
      question: "Will my data be safe?",
      answer:
        "We design workflows around the sensitivity of your data: local processing where practical, and reputable tools with clear privacy terms otherwise. We will flag any data-privacy consideration during scoping so you can make an informed choice.",
    },
    {
      question: "What happens after the adjustment round?",
      answer:
        "You keep the working setup, the prompts, and the documentation — they are designed to run without us. If you want ongoing help later, we can discuss a maintenance arrangement, but there is no obligation.",
    },
  ],
};

export function ServiceDetails({ service }: { service: Service }) {
  const others = services.filter((item) => item.slug !== service.slug);

  return (
    <article className="pb-16">
      <header className="border-b border-line bg-surface-tint">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">
            Service
          </p>
          <h1 className="mt-2 max-w-3xl text-3xl font-bold tracking-tight text-ink sm:text-4xl">
            {service.name}
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-ink-soft">{service.tagline}</p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <p className="text-3xl font-bold text-ink">
              ${service.price}
              <span className="ml-2 align-middle text-sm font-normal text-ink-faint">
                {service.priceNote}
              </span>
            </p>
            <ButtonLink href={`/contact?service=${service.slug}`} size="lg">
              Get a Quote for This Service
            </ButtonLink>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <section aria-labelledby="summary" className="py-10">
          <h2 id="summary" className="text-xl font-semibold text-ink">
            What it is
          </h2>
          <p className="mt-4 leading-7 text-ink-soft">{service.summary}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-lg border border-line bg-surface p-4">
              <Clock className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-ink">Turnaround</p>
                <p className="mt-1 text-sm text-ink-soft">{service.turnaround}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-line bg-surface p-4">
              <UserCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-strong" aria-hidden="true" />
              <div>
                <p className="text-sm font-semibold text-ink">Best for</p>
                <p className="mt-1 text-sm text-ink-soft">{service.bestFor}</p>
              </div>
            </div>
          </div>
        </section>

        <section aria-labelledby="deliverables" className="border-t border-line py-10">
          <h2 id="deliverables" className="flex items-center gap-2 text-xl font-semibold text-ink">
            <ClipboardList className="h-5 w-5 text-accent-strong" aria-hidden="true" />
            What you get
          </h2>
          <ul className="mt-5 space-y-3">
            {service.deliverables.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-6 text-ink-soft">
                <Check className="mt-1 h-4 w-4 shrink-0 text-green-600" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="exclusions" className="border-t border-line py-10">
          <h2 id="exclusions" className="flex items-center gap-2 text-xl font-semibold text-ink">
            <X className="h-5 w-5 text-accent-strong" aria-hidden="true" />
            Not included
          </h2>
          <ul className="mt-5 space-y-3">
            {service.exclusions.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-6 text-ink-soft">
                <X className="mt-1 h-4 w-4 shrink-0 text-ink-faint" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-ink-faint">
            Need something from this list? Mention it in your inquiry and we will
            quote it separately — clearly and before any payment.
          </p>
        </section>

        <section aria-labelledby="process" className="border-t border-line py-10">
          <h2 id="process" className="text-xl font-semibold text-ink">
            How it works
          </h2>
          <ol className="mt-5 space-y-4">
            {[
              "You send an inquiry with your requirements through the contact form.",
              "We reply within 2 business days with questions, a confirmed scope, and a fixed price.",
              "You approve the scope in writing; we send payment details (invoice).",
              "We deliver within the stated turnaround, keeping you posted on progress.",
              "You review; we complete the included revision or adjustment round.",
              "Handover: you receive everything — code, documentation, and explanations.",
            ].map((step, index) => (
              <li key={step} className="flex gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-bold text-accent-strong"
                >
                  {index + 1}
                </span>
                <p className="pt-1 text-sm leading-6 text-ink-soft">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section aria-labelledby="responsibilities" className="border-t border-line py-10">
          <h2 id="responsibilities" className="text-xl font-semibold text-ink">
            What we need from you
          </h2>
          <ul className="mt-5 space-y-3">
            {service.clientResponsibilities.map((item) => (
              <li key={item} className="flex gap-2.5 text-sm leading-6 text-ink-soft">
                <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="service-faq" className="border-t border-line py-10">
          <h2 id="service-faq" className="text-xl font-semibold text-ink">
            Frequently asked questions
          </h2>
          <div className="mt-5">
            <FaqAccordion items={serviceFaqs[service.slug] ?? []} />
          </div>
        </section>

        <section aria-labelledby="other-services" className="border-t border-line py-10">
          <h2 id="other-services" className="text-xl font-semibold text-ink">
            Other services
          </h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2">
            {others.map((other) => (
              <li key={other.slug}>
                <a
                  href={`/services/${other.slug}`}
                  className="block rounded-xl border border-line bg-surface p-5 shadow-sm hover:border-accent-line"
                >
                  <p className="font-semibold text-ink">{other.name}</p>
                  <p className="mt-1 text-sm text-ink-faint">${other.price} fixed price</p>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{other.tagline}</p>
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-4 rounded-xl border border-accent-line bg-accent-soft/60 p-6 text-center sm:p-8">
          <h2 className="text-lg font-semibold text-ink">
            Ready to start, or have questions first?
          </h2>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-ink-soft">
            Describe your project in the contact form. We confirm scope and price in
            writing before any payment — no surprises, ever.
          </p>
          <div className="mt-5">
            <ButtonLink href={`/contact?service=${service.slug}`} size="lg">
              Get a Quote
            </ButtonLink>
          </div>
        </div>
      </div>
    </article>
  );
}

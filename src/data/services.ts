export interface Service {
  slug: string;
  name: string;
  price: number;
  currency: string;
  priceNote: string;
  tagline: string;
  summary: string;
  deliverables: string[];
  exclusions: string[];
  turnaround: string;
  clientResponsibilities: string[];
  bestFor: string;
  icon: string;
}

export const services: Service[] = [
  {
    slug: "website-quick-fix",
    name: "Website Quick Fix",
    price: 79,
    currency: "USD",
    priceNote: "Fixed price for the agreed scope",
    tagline: "Fix the three things costing you visitors — in days, not weeks.",
    summary:
      "A focused, fixed-scope service for small websites with visible problems: broken layouts on mobile, erroring forms, slow-feeling pages, broken links, or confusing calls to action. We agree the exact list of up to three issues before any payment, then fix them and hand you a short before/after report.",
    deliverables: [
      "Fixes for up to three agreed website issues",
      "Improvement of one mobile layout or conversion-focused section",
      "Basic performance check with a plain-English summary",
      "Broken-link check with a list of what was found and fixed",
      "Short written before/after summary of every change",
    ],
    exclusions: [
      "Full redesigns or new pages (see Landing Page Development)",
      "Content writing or product photography",
      "Custom backend or CMS development work",
      "Ongoing maintenance after delivery (available separately)",
    ],
    turnaround: "Typically 3–5 business days from kickoff",
    clientResponsibilities: [
      "Access to the website, hosting, or CMS as needed",
      "Approving the three-issue scope before work starts",
      "Being reachable for one clarification round",
    ],
    bestFor: "Small businesses with a live site that has specific, fixable problems.",
    icon: "Wrench",
  },
  {
    slug: "landing-page-development",
    name: "Landing Page Development",
    price: 199,
    currency: "USD",
    priceNote: "Starting price for a standard single page",
    tagline: "One fast, responsive page built to convert — with the copy structure to match.",
    summary:
      "A single, professionally built landing page for a product, service, or campaign. Includes a clear page structure with strong calls to action, a working contact form, responsive layouts on every device, and on-page SEO basics so search engines can index it properly. Delivered with one revision round within the agreed scope.",
    deliverables: [
      "One responsive landing page (desktop, tablet, mobile)",
      "Clear call-to-action placement and a working contact form",
      "Basic on-page SEO: titles, meta description, headings, image alt text",
      "Fast-loading implementation with performance in mind",
      "One revision round within the agreed scope",
      "Handover notes explaining how to edit the page",
    ],
    exclusions: [
      "Multiple pages or full websites (quoted separately)",
      "Logos, illustration, or custom photography",
      "Long-form copywriting beyond page structure guidance",
      "Paid advertising management or ongoing SEO",
    ],
    turnaround: "Typically 5–8 business days from kickoff",
    clientResponsibilities: [
      "Business information, images, and any existing copy",
      "Feedback within the revision round window",
      "Domain or hosting access for deployment (or we deploy to your chosen host)",
    ],
    bestFor: "Businesses launching an offer that needs a dedicated, conversion-focused page.",
    icon: "LayoutTemplate",
  },
  {
    slug: "ai-workflow-setup",
    name: "AI Workflow Setup",
    price: 99,
    currency: "USD",
    priceNote: "Fixed price for one standard workflow",
    tagline: "One repetitive task in your business — automated with a documented, reusable AI workflow.",
    summary:
      "We design and set up one practical AI workflow for your business, such as drafting customer replies from templates, summarizing inquiries, or routing form submissions. You receive the working setup, reusable prompts tuned to your context, and written documentation so your team can run and adjust it without us.",
    deliverables: [
      "One working AI workflow set up for a specific task",
      "Reusable prompts tested with your real inputs",
      "Step-by-step documentation your team can follow",
      "A live walkthrough session (remote)",
      "One adjustment round after your first week of use",
    ],
    exclusions: [
      "Additional workflows (quoted separately)",
      "Custom software development or API integrations beyond standard connectors",
      "Paid AI subscription costs, if the chosen tools require them",
      "Ongoing management after the adjustment round",
    ],
    turnaround: "Typically 4–7 business days from kickoff",
    clientResponsibilities: [
      "Examples of the task today (real inputs and desired outputs)",
      "Accounts for the tools involved, if any are needed",
      "One team member available for the walkthrough",
    ],
    bestFor: "Solo operators and small teams drowning in one specific repetitive task.",
    icon: "Workflow",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export const budgetRanges = [
  "Under $100",
  "$100 – $250",
  "$250 – $500",
  "$500+",
  "Not sure yet",
] as const;

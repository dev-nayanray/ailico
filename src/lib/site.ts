export const site = {
  name: "AIlico",
  domain: "ailico.top",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://ailico.top",
  tagline: "Discover AI. Create smarter.",
  description:
    "AIlico helps freelancers, creators, developers, and small businesses discover verified AI tools, use free online utilities, and get expert help building websites and AI workflows.",
  locale: "en_US",
  contact: {
    responseTime: "within 2 business days",
  },
} as const;

export function absoluteUrl(path: string): string {
  return `${site.url}${path.startsWith("/") ? path : `/${path}`}`;
}

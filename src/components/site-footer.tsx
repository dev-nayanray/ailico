import Link from "next/link";
import { Sparkles } from "lucide-react";
import { services } from "@/lib/services";
import { toolCategories } from "@/lib/tools";
import { freeTools } from "@/lib/free-tools";

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-surface-tint">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 font-semibold text-ink">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-lg tracking-tight">AIlico</span>
            </Link>
            <p className="mt-3 max-w-sm text-sm leading-6 text-ink-soft">
              Discover AI. Create smarter. Verified AI tools, free online utilities,
              and practical services for freelancers, creators, and small businesses.
            </p>
            <p className="mt-4 text-xs text-ink-faint">ailico.top</p>
          </div>

          <nav aria-label="Explore">
            <h2 className="text-sm font-semibold text-ink">Explore</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><FooterLink href="/ai-tools">AI Tools Directory</FooterLink></li>
              {toolCategories.slice(0, 3).map((category) => (
                <li key={category.slug}>
                  <FooterLink href={`/ai-tools/category/${category.slug}`}>
                    {category.name}
                  </FooterLink>
                </li>
              ))}
              <li><FooterLink href="/free-tools">Free Tools</FooterLink></li>
              {freeTools.slice(0, 2).map((tool) => (
                <li key={tool.slug}>
                  <FooterLink href={`/free-tools/${tool.slug}`}>{tool.shortName}</FooterLink>
                </li>
              ))}
              <li><FooterLink href="/blog">Blog</FooterLink></li>
            </ul>
          </nav>

          <nav aria-label="Services">
            <h2 className="text-sm font-semibold text-ink">Services</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <FooterLink href={`/services/${service.slug}`}>{service.name}</FooterLink>
                </li>
              ))}
              <li><FooterLink href="/portfolio">Portfolio</FooterLink></li>
              <li><FooterLink href="/contact">Get a Quote</FooterLink></li>
            </ul>
          </nav>

          <nav aria-label="Company and legal">
            <h2 className="text-sm font-semibold text-ink">Company</h2>
            <ul className="mt-3 space-y-2 text-sm">
              <li><FooterLink href="/about">About</FooterLink></li>
              <li><FooterLink href="/contact">Contact</FooterLink></li>
              <li><FooterLink href="/privacy-policy">Privacy Policy</FooterLink></li>
              <li><FooterLink href="/terms">Terms of Service</FooterLink></li>
              <li><FooterLink href="/affiliate-disclosure">Affiliate Disclosure</FooterLink></li>
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-line pt-6 text-xs text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} AIlico. All rights reserved.</p>
          <p>
            Some outbound links may be affiliate links — see our{" "}
            <Link href="/affiliate-disclosure" className="underline hover:text-ink-soft">
              affiliate disclosure
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="text-ink-soft transition-colors hover:text-accent-strong">
      {children}
    </Link>
  );
}

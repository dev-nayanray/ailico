"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics/track";

const navigation = [
  { href: "/ai-tools", label: "AI Tools" },
  { href: "/free-tools", label: "Free Tools" },
  { href: "/services", label: "Services" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-ink"
          aria-label="AIlico home"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent text-white">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="text-lg tracking-tight">AIlico</span>
        </Link>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 md:flex">
          {navigation.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-accent-soft text-accent-strong"
                    : "text-ink-soft hover:bg-surface-muted hover:text-ink"
                )}
                aria-current={active ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/contact?service=landing-page-development"
            onClick={() => trackEvent("cta_click", { location: "header", target: "quote" })}
            className="ml-2 inline-flex h-9 items-center rounded-lg bg-accent px-4 text-sm font-medium text-white shadow-sm transition-colors hover:bg-accent-strong"
          >
            Get a Quote
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg text-ink hover:bg-surface-muted md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-line bg-surface px-4 pb-4 pt-2 md:hidden"
        >
          <ul className="flex flex-col gap-1">
            {navigation.map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "block rounded-lg px-3 py-2.5 text-base font-medium",
                      active
                        ? "bg-accent-soft text-accent-strong"
                        : "text-ink-soft hover:bg-surface-muted hover:text-ink"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
            <li className="pt-2">
              <Link
                href="/contact?service=landing-page-development"
                className="flex h-11 items-center justify-center rounded-lg bg-accent px-4 text-base font-medium text-white hover:bg-accent-strong"
              >
                Get a Quote
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetails } from "@/components/service-details";
import { getServiceBySlug } from "@/lib/services";

export const metadata: Metadata = {
  title: "Landing Page Development — Responsive, SEO-Ready, $199",
  description:
    "One professionally built landing page with clear CTAs, a working contact form, basic on-page SEO, and one revision round. Fixed price $199, written scope before payment.",
  alternates: { canonical: "/services/landing-page-development" },
  openGraph: {
    title: "Landing Page Development — Responsive, SEO-Ready, $199 | AIlico",
    description:
      "One responsive landing page with clear calls to action, a working contact form, and on-page SEO basics — delivered in about a week.",
    url: "/services/landing-page-development",
  },
};

export default function LandingPageDevelopmentPage() {
  const service = getServiceBySlug("landing-page-development");
  if (!service) notFound();
  return <ServiceDetails service={service} />;
}

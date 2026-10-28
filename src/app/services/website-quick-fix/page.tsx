import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetails } from "@/components/service-details";
import { getServiceBySlug } from "@/data/services";

export const metadata: Metadata = {
  title: "Website Quick Fix — 3 Agreed Fixes for $79",
  description:
    "Fixed-price service: we fix up to three agreed website issues, improve one mobile or conversion section, and run basic performance and broken-link checks. Scope confirmed before payment.",
  alternates: { canonical: "/services/website-quick-fix" },
  openGraph: {
    title: "Website Quick Fix — 3 Agreed Fixes for $79 | AIlico",
    description:
      "We fix up to three agreed website issues plus one mobile or conversion improvement, with a written before/after report.",
    url: "/services/website-quick-fix",
  },
};

export default function WebsiteQuickFixPage() {
  const service = getServiceBySlug("website-quick-fix");
  if (!service) notFound();
  return <ServiceDetails service={service} />;
}

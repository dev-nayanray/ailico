import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetails } from "@/components/service-details";
import { getServiceBySlug } from "@/data/services";

export const metadata: Metadata = {
  title: "AI Workflow Setup — One Documented Workflow, $99",
  description:
    "We design and set up one reusable AI workflow for your business, with tested prompts, written documentation, a live walkthrough, and one adjustment round. Fixed price $99.",
  alternates: { canonical: "/services/ai-workflow-setup" },
  openGraph: {
    title: "AI Workflow Setup — One Documented Workflow, $99 | AIlico",
    description:
      "One working AI workflow, reusable prompts, and documentation your team can run without us.",
    url: "/services/ai-workflow-setup",
  },
};

export default function AiWorkflowSetupPage() {
  const service = getServiceBySlug("ai-workflow-setup");
  if (!service) notFound();
  return <ServiceDetails service={service} />;
}

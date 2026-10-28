import { NextResponse } from "next/server";
import { getToolBySlug, toolDestination } from "@/data/tools";

/**
 * Outbound click redirect: /go/<tool-slug>
 *
 * Logs an aggregate, anonymous click count and redirects the visitor to the
 * tool's official website (or approved affiliate URL once a partnership
 * exists). Adds no PII — just a counter.
 */

const clickCounts = new Map<string, number>();

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const tool = getToolBySlug(slug);
  if (!tool) {
    return NextResponse.json({ error: "Unknown tool" }, { status: 404 });
  }

  clickCounts.set(slug, (clickCounts.get(slug) ?? 0) + 1);
  console.info(`[outbound] ${slug} → ${tool.affiliateUrl ? "affiliate" : "official"} (total: ${clickCounts.get(slug)})`);

  return NextResponse.redirect(toolDestination(tool), {
    status: 302,
    headers: {
      "X-Robots-Tag": "noindex",
      "Cache-Control": "no-store",
    },
  });
}

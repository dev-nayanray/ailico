import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { aiTools, toolCategories } from "@/lib/tools";
import { freeTools } from "@/lib/free-tools";
import { services } from "@/lib/services";
import { posts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: site.url, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${site.url}/ai-tools`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${site.url}/free-tools`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${site.url}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${site.url}/portfolio`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${site.url}/about`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
    { url: `${site.url}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: `${site.url}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    { url: `${site.url}/affiliate-disclosure`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
  ];

  const toolPages: MetadataRoute.Sitemap = aiTools.map((tool) => ({
    url: `${site.url}/ai-tools/${tool.slug}`,
    lastModified: new Date(tool.lastVerified),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const categoryPages: MetadataRoute.Sitemap = toolCategories.map((category) => ({
    url: `${site.url}/ai-tools/category/${category.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const freeToolPages: MetadataRoute.Sitemap = freeTools.map((tool) => ({
    url: `${site.url}/free-tools/${tool.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const servicePages: MetadataRoute.Sitemap = services.flatMap((service) => [
    {
      url: `${site.url}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
  ]);

  const blogPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...toolPages,
    ...categoryPages,
    ...freeToolPages,
    ...servicePages,
    ...blogPages,
  ];
}

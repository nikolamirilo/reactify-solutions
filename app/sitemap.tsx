import { MetadataRoute } from "next";
import productsData from "@/components/Products/productsData";
import { allPostsMeta } from "@/content/articles";
import { allDocPages, docsNav } from "@/content/docs";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.APP_URL || "https://www.reactify-solutions.com";
  // Fixed per build, not per request — a lastModified that changes on every
  // build teaches crawlers to ignore the field entirely.
  const buildDate = new Date();

  const productEntries: MetadataRoute.Sitemap = productsData
    .filter((product) => product.visible)
    .map((product) => ({
      url: `${baseUrl}/products/${product.id}`,
      lastModified: buildDate,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    }));

  const articleEntries: MetadataRoute.Sitemap = allPostsMeta.map((post) => ({
    url: `${baseUrl}/articles/${post.slug}`,
    lastModified: new Date(post.publishDate),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const docModuleEntries: MetadataRoute.Sitemap = docsNav.map((topic) => ({
    url: `${baseUrl}/docs/${topic.topic}`,
    lastModified: buildDate,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const docEntries: MetadataRoute.Sitemap = allDocPages.map((page) => ({
    url: `${baseUrl}/docs/${page.topic}/${page.slug}`,
    lastModified: new Date(page.lastReviewed),
    changeFrequency: "monthly" as const,
    priority: 0.9,
  }));

  return [
    {
      url: `${baseUrl}`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/articles`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: buildDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/add-testimonial`,
      lastModified: buildDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/sla`,
      lastModified: buildDate,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    ...productEntries,
    ...articleEntries,
    ...docModuleEntries,
    ...docEntries,
  ];
}

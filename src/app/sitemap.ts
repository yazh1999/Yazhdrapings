import type { MetadataRoute } from "next";
import { contact } from "@/data/site";

/**
 * Static single sitemap. Next 16's async `id` breaking change applies only to
 * the dynamic `generateSitemaps` variant, which this is not.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = contact.siteUrl.replace(/\/$/, "");
  const now = new Date();

  const routes: Array<[string, number, MetadataRoute.Sitemap[number]["changeFrequency"]]> = [
    ["", 1, "monthly"],
    ["/services", 0.9, "monthly"],
    ["/pricing", 0.9, "monthly"],
    ["/book", 0.9, "yearly"],
    ["/gallery", 0.8, "weekly"],
    ["/how-it-works", 0.7, "yearly"],
    ["/about", 0.6, "yearly"],
    ["/faq", 0.6, "monthly"],
    ["/contact", 0.7, "yearly"],
    ["/privacy", 0.2, "yearly"],
    ["/terms", 0.2, "yearly"],
    ["/care-policy", 0.4, "yearly"],
  ];

  return routes.map(([path, priority, changeFrequency]) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

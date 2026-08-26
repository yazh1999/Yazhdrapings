import type { MetadataRoute } from "next";
import { contact } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  const base = contact.siteUrl.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}

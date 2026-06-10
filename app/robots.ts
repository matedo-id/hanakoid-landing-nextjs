import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Halaman maintenance & 404 tidak perlu diindeks.
      disallow: ["/maintenance"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}

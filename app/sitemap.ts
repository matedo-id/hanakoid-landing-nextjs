import type { MetadataRoute } from "next";
import { products, portfolio, siteUrl } from "@/lib/data";

type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticDefs: {
    path: string;
    priority: number;
    changeFrequency: ChangeFreq;
  }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/catalog", priority: 0.9, changeFrequency: "weekly" },
    { path: "/solution", priority: 0.8, changeFrequency: "monthly" },
    { path: "/portfolio", priority: 0.8, changeFrequency: "monthly" },
    { path: "/about", priority: 0.6, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "yearly" },
    { path: "/rfq", priority: 0.7, changeFrequency: "monthly" },
    { path: "/articles", priority: 0.5, changeFrequency: "weekly" },
  ];

  const staticRoutes: MetadataRoute.Sitemap = staticDefs.map((r) => ({
    url: `${siteUrl}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${siteUrl}/product/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const portfolioRoutes: MetadataRoute.Sitemap = portfolio.map((p) => ({
    url: `${siteUrl}/portfolio/${p.id}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...productRoutes, ...portfolioRoutes];
}

import type { Metadata } from "next";
import { CatalogClient } from "./catalog-client";
import type { CategoryKey } from "@/lib/data";

export const metadata: Metadata = {
  title: "Katalog Produk",
  description:
    "Jelajahi 800+ produk teknologi: video wall, interactive flat panel, CCTV, mesin antrian, UPS, PC & laptop, dan lainnya. Ajukan penawaran ke hanako.id.",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string; q?: string }>;
}) {
  const sp = await searchParams;
  return (
    <CatalogClient
      initialCat={(sp.cat as CategoryKey) ?? "all"}
      initialQuery={sp.q ?? ""}
    />
  );
}

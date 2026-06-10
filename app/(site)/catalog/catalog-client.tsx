"use client";

import { useMemo, useState } from "react";
import { Search, PackageX } from "lucide-react";
import { Container } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { Chip } from "@/components/badge";
import { ProductCard } from "@/components/product-card";
import {
  categories,
  products,
  type CategoryKey,
} from "@/lib/data";

type Filter = CategoryKey | "all";

export function CatalogClient({
  initialCat,
  initialQuery,
}: {
  initialCat: Filter;
  initialQuery: string;
}) {
  const [cat, setCat] = useState<Filter>(initialCat);
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const matchCat = cat === "all" || p.catKey === cat;
      const matchQuery =
        !q ||
        [p.name, p.brand, p.sku, p.cat, ...p.tags]
          .join(" ")
          .toLowerCase()
          .includes(q);
      return matchCat && matchQuery;
    });
  }, [cat, query]);

  return (
    <Container className="section flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <Breadcrumb
          items={[{ label: "Beranda", href: "/" }, { label: "Katalog" }]}
        />
        <h1 className="h1">Katalog Produk</h1>
        <p className="lead max-w-2xl">
          Jelajahi 800+ produk teknologi dari berbagai kategori. Pilih kategori
          atau cari produk, lalu ajukan penawaran sesuai kebutuhan instansi
          Anda.
        </p>
      </div>

      {/* Filter */}
      <div className="flex flex-col gap-4">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari produk, brand, atau SKU…"
            className="input pl-12"
            aria-label="Cari produk"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip active={cat === "all"} onClick={() => setCat("all")}>
            Semua
          </Chip>
          {categories.map((c) => (
            <Chip
              key={c.key}
              active={cat === c.key}
              onClick={() => setCat(c.key)}
            >
              {c.title}
            </Chip>
          ))}
        </div>
      </div>

      <p className="text-sm text-muted">
        Menampilkan <strong className="text-ink">{results.length}</strong>{" "}
        produk
      </p>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 rounded-[16px] border border-dashed border-border-strong bg-surface py-20 text-center">
          <PackageX className="size-10 text-muted-2" strokeWidth={1.6} />
          <p className="font-head text-lg font-bold text-ink">
            Produk tidak ditemukan
          </p>
          <p className="text-sm text-muted">
            Coba kata kunci lain atau pilih kategori berbeda.
          </p>
        </div>
      )}
    </Container>
  );
}

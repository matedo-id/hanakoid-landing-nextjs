"use client";

import { useMemo, useState } from "react";
import { Chip } from "@/components/badge";
import { PortfolioCard } from "@/components/portfolio-card";
import type { PortfolioItem } from "@/lib/data";

export function PortfolioGrid({ items }: { items: PortfolioItem[] }) {
  const sectors = useMemo(
    () => ["Semua", ...Array.from(new Set(items.map((i) => i.sector)))],
    [items]
  );
  const [active, setActive] = useState("Semua");

  const filtered =
    active === "Semua" ? items : items.filter((i) => i.sector === active);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        {sectors.map((s) => (
          <Chip key={s} active={active === s} onClick={() => setActive(s)}>
            {s}
          </Chip>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

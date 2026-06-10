"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Placeholder } from "@/components/placeholder";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { cn } from "@/lib/cn";
import {
  type Product,
  statusMeta,
  formatPrice,
  priceNote,
  waLink,
  contact,
} from "@/lib/data";

export function ProductCard({ product }: { product: Product }) {
  const [fav, setFav] = useState(false);
  const status = statusMeta[product.status];
  const href = `/product/${product.id}`;

  return (
    <article className="card card--hover flex flex-col overflow-hidden">
      <div className="relative">
        <Placeholder
          label={product.imgLabel}
          ratio="4/3"
          className="rounded-none border-x-0 border-t-0"
        />
        <div className="absolute left-3 top-3">
          <Badge variant={status.variant} dot>
            {status.label}
          </Badge>
        </div>
        <button
          type="button"
          aria-label={fav ? "Hapus dari favorit" : "Tambah ke favorit"}
          aria-pressed={fav}
          onClick={() => setFav((v) => !v)}
          className="absolute right-3 top-3 grid size-9 place-items-center rounded-full border border-border bg-white/90 text-muted backdrop-blur transition-colors hover:text-primary"
        >
          <Heart
            className="size-[18px]"
            strokeWidth={1.8}
            fill={fav ? "currentColor" : "none"}
            style={fav ? { color: "var(--color-primary)" } : undefined}
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-2">
            {product.brand}
          </span>
          <h3 className="h4">
            <Link href={href} className="transition-colors hover:text-primary">
              {product.name}
            </Link>
          </h3>
          <span className="text-xs text-muted">
            {product.cat} · {product.sku}
          </span>
        </div>

        <div className="mt-auto flex flex-col gap-0.5 pt-1">
          <span
            className={cn(
              "font-head font-extrabold tracking-tight",
              product.price === null ? "text-lg text-ink-2" : "text-xl text-ink"
            )}
          >
            {formatPrice(product.price)}
          </span>
          <span className="text-xs text-muted">{priceNote(product)}</span>
        </div>

        <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-[1fr_auto]">
          <Button
            href={
              product.status === "call"
                ? waLink(
                    `Halo ${contact.brand}, saya ingin menanyakan ${product.name} (${product.sku}).`
                  )
                : `/rfq?produk=${product.id}`
            }
            external={product.status === "call"}
            size="sm"
          >
            Minta Penawaran
          </Button>
          <Button href={href} variant="secondary" size="sm">
            Detail
          </Button>
        </div>
      </div>
    </article>
  );
}

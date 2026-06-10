import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MessageCircle, ShieldCheck, Truck, ArrowRight } from "lucide-react";
import { Container } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Placeholder } from "@/components/placeholder";
import { Tabs } from "@/components/tabs";
import { SpecTable } from "@/components/spec-table";
import { ProductCard } from "@/components/product-card";
import {
  getProduct,
  relatedProducts,
  products,
  statusMeta,
  formatPrice,
  priceNote,
  waLink,
  contact,
} from "@/lib/data";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) return { title: "Produk tidak ditemukan" };
  return {
    title: `${product.name} — ${product.brand}`,
    description:
      product.description ??
      `${product.name} dari ${product.brand}. Ajukan penawaran ke hanako.id.`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = getProduct(id);
  if (!product) notFound();

  const status = statusMeta[product.status];
  const related = relatedProducts(product);
  const isCall = product.status === "call";

  return (
    <Container className="section flex flex-col gap-14">
      <div className="flex flex-col gap-8">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Katalog", href: "/catalog" },
            { label: product.cat, href: `/catalog?cat=${product.catKey}` },
            { label: product.name },
          ]}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Galeri */}
          <div className="flex flex-col gap-3">
            <Placeholder label={product.imgLabel} ratio="4/3" />
            <div className="grid grid-cols-4 gap-3">
              {["Tampak Depan", "Detail", "Samping", "Instalasi"].map((l) => (
                <Placeholder key={l} label={l} ratio="1/1" />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <Badge variant={status.variant} dot>
                {status.label}
              </Badge>
              <span className="text-xs uppercase tracking-wider text-muted-2">
                {product.brand}
              </span>
            </div>

            <h1 className="h1">{product.name}</h1>
            <p className="text-sm text-muted">
              {product.cat} · SKU {product.sku}
            </p>

            <div className="flex flex-col gap-1 border-y border-border py-5">
              <span className="font-head text-3xl font-extrabold tracking-tight text-ink">
                {formatPrice(product.price)}
              </span>
              <span className="text-sm text-muted">{priceNote(product)}</span>
            </div>

            {product.description && (
              <p className="leading-relaxed text-ink-2">{product.description}</p>
            )}

            <div className="flex flex-wrap gap-3 pt-1">
              <Button
                href={
                  isCall
                    ? waLink(
                        `Halo ${contact.brand}, saya ingin menanyakan ${product.name} (${product.sku}).`
                      )
                    : `/rfq?produk=${product.id}`
                }
                external={isCall}
                size="lg"
              >
                Minta Penawaran
                <ArrowRight />
              </Button>
              <Button
                href={waLink(
                  `Halo ${contact.brand}, saya tertarik dengan ${product.name}.`
                )}
                external
                variant="wa"
                size="lg"
              >
                <MessageCircle />
                WhatsApp
              </Button>
            </div>

            <ul className="flex flex-col gap-2 pt-2 text-sm text-ink-2">
              <li className="flex items-center gap-2">
                <ShieldCheck
                  className="size-4 text-primary"
                  strokeWidth={1.8}
                />
                Produk original bergaransi resmi
              </li>
              <li className="flex items-center gap-2">
                <Truck className="size-4 text-primary" strokeWidth={1.8} />
                Pengiriman & instalasi seluruh Indonesia
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs
        tabs={[
          {
            label: "Deskripsi",
            content: (
              <div className="max-w-3xl leading-relaxed text-ink-2">
                <p>
                  {product.description ??
                    "Deskripsi produk akan segera tersedia."}
                </p>
                {product.tags.length > 0 && (
                  <div className="mt-5 flex flex-wrap gap-2">
                    {product.tags.map((t) => (
                      <Badge key={t} variant="neutral">
                        {t}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            ),
          },
          {
            label: "Spesifikasi",
            content: product.specs ? (
              <div className="max-w-2xl">
                <SpecTable specs={product.specs} />
              </div>
            ) : (
              <p className="text-muted">Spesifikasi belum tersedia.</p>
            ),
          },
        ]}
      />

      {/* Produk terkait */}
      {related.length > 0 && (
        <div className="flex flex-col gap-6">
          <h2 className="h3">Produk terkait</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}

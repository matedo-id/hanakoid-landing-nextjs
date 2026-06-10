import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Check,
  Package,
  Building2,
  Layers,
  Calendar,
  MapPin,
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { Container } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Placeholder } from "@/components/placeholder";
import { Stat } from "@/components/stat";
import { PortfolioCard } from "@/components/portfolio-card";
import {
  getPortfolio,
  relatedPortfolio,
  portfolio,
  waLink,
} from "@/lib/data";

export function generateStaticParams() {
  return portfolio.map((p) => ({ id: p.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = getPortfolio(id);
  if (!item) return { title: "Proyek tidak ditemukan" };
  return {
    title: `${item.title} — ${item.client}`,
    description: item.summary,
  };
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = getPortfolio(id);
  if (!item) notFound();

  const related = relatedPortfolio(item);
  const meta = [
    { icon: Building2, label: "Klien", value: item.client },
    { icon: Layers, label: "Sektor", value: item.sector },
    { icon: Calendar, label: "Tahun", value: item.year },
    { icon: MapPin, label: "Lokasi", value: item.location },
  ];

  return (
    <Container className="section flex flex-col gap-14">
      <div className="flex flex-col gap-8">
        <Breadcrumb
          items={[
            { label: "Beranda", href: "/" },
            { label: "Portfolio", href: "/portfolio" },
            { label: item.title },
          ]}
        />

        <div className="flex flex-col gap-4">
          <Badge variant="primary">{item.sector}</Badge>
          <h1 className="h1 max-w-3xl">{item.title}</h1>
          <p className="lead max-w-2xl">{item.summary}</p>
        </div>

        {/* Meta */}
        <div className="grid grid-cols-2 gap-5 rounded-[16px] border border-border bg-surface p-6 lg:grid-cols-4">
          {meta.map((m) => {
            const Icon = m.icon;
            return (
              <div key={m.label} className="flex items-start gap-3">
                <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-primary-050 text-primary">
                  <Icon className="size-[18px]" strokeWidth={1.8} />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-wider text-muted-2">
                    {m.label}
                  </span>
                  <span className="text-sm font-medium text-ink">
                    {m.value}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Cover */}
        <Placeholder label={item.coverLabel} ratio="16/9" />
      </div>

      {/* Deskripsi + scope + produk */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-5">
          <h2 className="h3">Tentang Proyek</h2>
          <p className="leading-relaxed text-ink-2">{item.description}</p>

          <h3 className="h4 mt-4">Lingkup Pekerjaan</h3>
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {item.scope.map((s) => (
              <li
                key={s}
                className="flex items-start gap-2 text-sm text-ink-2"
              >
                <Check
                  className="mt-0.5 size-4 shrink-0 text-primary"
                  strokeWidth={2.4}
                />
                {s}
              </li>
            ))}
          </ul>
        </div>

        <aside className="flex flex-col gap-4">
          <div className="card flex flex-col gap-4 p-6">
            <h3 className="h4">Teknologi Digunakan</h3>
            <ul className="flex flex-col gap-2.5">
              {item.products.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-sm">
                  <Package
                    className="size-4 shrink-0 text-primary"
                    strokeWidth={1.8}
                  />
                  <Link
                    href={`/catalog?q=${encodeURIComponent(p)}`}
                    className="text-ink-2 transition-colors hover:text-primary"
                  >
                    {p}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {item.solutionKey && (
            <Link
              href={`/solution#${item.solutionKey}`}
              className="card card--hover flex items-center justify-between gap-3 p-5"
            >
              <span className="text-sm font-medium text-ink">
                Lihat paket solusi terkait
              </span>
              <ArrowRight className="size-4 text-primary" />
            </Link>
          )}
        </aside>
      </div>

      {/* Statistik */}
      {item.stats && item.stats.length > 0 && (
        <div className="grid grid-cols-3 gap-6 rounded-[16px] border border-border bg-white p-8">
          {item.stats.map((s) => (
            <Stat key={s.label} value={s.value} label={s.label} />
          ))}
        </div>
      )}

      {/* Galeri */}
      {item.gallery.length > 0 && (
        <div className="flex flex-col gap-6">
          <h2 className="h3">Dokumentasi</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {item.gallery.map((g) => (
              <Placeholder key={g} label={g} ratio="4/3" />
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div
        className="relative overflow-hidden rounded-[20px] px-8 py-12 text-center text-white sm:px-14"
        style={{ background: "var(--color-primary-dark)" }}
      >
        <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
        <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
          <h2 className="h2 text-white">Punya kebutuhan serupa?</h2>
          <p className="text-white/75">
            Ceritakan kebutuhan instansi Anda, kami susun solusi yang tepat.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/rfq" size="lg">
              Minta Penawaran
              <ArrowRight />
            </Button>
            <Button href={waLink()} external variant="wa" size="lg">
              <MessageCircle />
              Chat Sales
            </Button>
          </div>
        </div>
      </div>

      {/* Proyek terkait */}
      {related.length > 0 && (
        <div className="flex flex-col gap-6">
          <h2 className="h3">Proyek lainnya</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PortfolioCard key={p.id} item={p} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}

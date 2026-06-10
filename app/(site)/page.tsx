import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Check,
  PackageCheck,
  ShieldCheck,
} from "lucide-react";
import { Container, SectionHeader } from "@/components/section";
import { Eyebrow } from "@/components/eyebrow";
import { Button } from "@/components/button";
import { Badge } from "@/components/badge";
import { CategoryTile } from "@/components/category-tile";
import { ProductCard } from "@/components/product-card";
import { PortfolioCard } from "@/components/portfolio-card";
import { Placeholder } from "@/components/placeholder";
import { TrustStrip } from "@/components/trust-strip";
import { Steps } from "@/components/steps";
import { Stat } from "@/components/stat";
import { Reveal } from "@/components/reveal";
import { FaqSection } from "@/components/faq-section";
import {
  categories,
  products,
  solutions,
  portfolio,
  stats,
  whyReasons,
  processSteps,
  trustText,
  trustLogos,
  contact,
  waLink,
} from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featured = products.filter((p) => p.featured);
  const featuredPortfolio = portfolio.filter((p) => p.featured);

  return (
    <>
      {/* ============ Hero ============ */}
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div className="absolute inset-0 grid-bg" aria-hidden />
        <Container className="relative section grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="flex flex-col items-start gap-6">
            <Eyebrow>System Integrator &amp; Pengadaan Teknologi</Eyebrow>
            <h1 className="display max-w-xl">
              Best Partner for Your{" "}
              <span style={{ color: "var(--color-primary)" }}>IT Solution</span>
            </h1>
            <p className="lead max-w-lg">
              {contact.company} menyediakan solusi teknologi end-to-end —
              konsultasi, pengadaan, instalasi, hingga purna jual — untuk
              instansi pemerintah, kampus, dan rumah sakit.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button href="/rfq" size="lg">
                Minta Penawaran
                <ArrowRight />
              </Button>
              <Button href={waLink()} external variant="secondary" size="lg">
                <MessageCircle />
                Konsultasi WhatsApp
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 pt-2">
              <Badge variant="primary">
                <ShieldCheck className="size-3.5" /> PT Resmi · NIB
              </Badge>
              <Badge variant="accent">
                <PackageCheck className="size-3.5" /> e-Katalog INAPROC
              </Badge>
              <Badge variant="neutral">Sejak {contact.since}</Badge>
            </div>
          </div>

          <Reveal className="relative">
            <div className="card overflow-hidden p-3 shadow-[var(--sh-lg)]">
              <Placeholder label="Solusi Display & Integrasi" ratio="4/3" />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-[12px] border border-border bg-white px-5 py-4 shadow-[var(--sh-md)] sm:block">
              <span className="font-head text-2xl font-extrabold tracking-tight text-primary">
                800+
              </span>
              <p className="text-xs text-muted">Pilihan produk teknologi</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ============ Trust strip ============ */}
      <section className="border-b border-border bg-white">
        <Container className="section-sm flex flex-col gap-7">
          <p className="text-center text-sm font-medium text-muted">
            {trustText}
          </p>
          <TrustStrip logos={trustLogos} />
        </Container>
      </section>

      {/* ============ Kategori ============ */}
      <section className="section">
        <Container className="flex flex-col gap-10">
          <SectionHeader
            eyebrow="Lini Produk"
            title="Delapan kategori, 800+ pilihan"
            lead="Dari display besar hingga infrastruktur pendukung, lengkap dalam satu penyedia."
            action={
              <Button href="/catalog" variant="secondary">
                Lihat Katalog
                <ArrowRight />
              </Button>
            }
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c, i) => (
              <Reveal key={c.key} delay={(i % 4) * 60}>
                <CategoryTile category={c} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ============ Produk Unggulan ============ */}
      <section className="section bg-surface">
        <Container className="flex flex-col gap-10">
          <SectionHeader
            eyebrow="Produk Unggulan"
            title="Pilihan populer untuk instansi"
            lead="Produk siap penawaran dengan garansi resmi dan dukungan instalasi."
            action={
              <Button href="/catalog" variant="secondary">
                Semua Produk
                <ArrowRight />
              </Button>
            }
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* ============ Solusi Vertikal ============ */}
      <section className="section">
        <Container className="flex flex-col gap-10">
          <SectionHeader
            eyebrow="Solusi Vertikal"
            title="Paket sesuai kebutuhan sektor Anda"
            lead="Kami rancang solusi terintegrasi untuk berbagai jenis instansi."
            action={
              <Button href="/solution" variant="secondary">
                Semua Solusi
                <ArrowRight />
              </Button>
            }
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((s, i) => {
              const Icon = s.icon;
              return (
                <Reveal key={s.key} delay={(i % 4) * 60}>
                  <Link
                    href={`/solution#${s.key}`}
                    className="card card--hover group flex h-full flex-col gap-4 p-6"
                  >
                    <span className="grid size-12 place-items-center rounded-[12px] bg-primary-050 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <Icon strokeWidth={1.8} className="size-6" />
                    </span>
                    <div className="flex flex-col gap-1.5">
                      <h3 className="h4">{s.title}</h3>
                      <p className="text-sm leading-relaxed text-muted">
                        {s.desc}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* ============ Proyek Terpilih ============ */}
      <section className="section">
        <Container className="flex flex-col gap-10">
          <SectionHeader
            eyebrow="Portfolio"
            title="Proyek terpilih kami"
            lead="Sebagian hasil pekerjaan yang telah kami selesaikan untuk berbagai instansi."
            action={
              <Button href="/portfolio" variant="secondary">
                Semua Portfolio
                <ArrowRight />
              </Button>
            }
          />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPortfolio.map((p) => (
              <PortfolioCard key={p.id} item={p} />
            ))}
          </div>
        </Container>
      </section>

      {/* ============ Mengapa Hanako ============ */}
      <section className="section bg-surface">
        <Container className="flex flex-col gap-12">
          <SectionHeader
            center
            eyebrow="Mengapa hanako.id"
            title="Mitra pengadaan yang tepercaya"
            lead="Alasan instansi memilih kami sebagai penyedia solusi teknologi."
          />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {whyReasons.map((r) => (
              <div key={r.title} className="card flex gap-4 p-6">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-primary-050 text-primary">
                  <Check className="size-5" strokeWidth={2.4} />
                </span>
                <div className="flex flex-col gap-1.5">
                  <h3 className="h4">{r.title}</h3>
                  <p className="text-sm leading-relaxed text-muted">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-8 rounded-[16px] border border-border bg-white p-8 lg:grid-cols-4">
            {stats.map((s) => (
              <Stat key={s.label} value={s.value} label={s.label} />
            ))}
          </div>
        </Container>
      </section>

      {/* ============ Proses ============ */}
      <section className="section">
        <Container className="flex flex-col gap-12">
          <SectionHeader
            eyebrow="Cara Kerja"
            title="Empat langkah menuju solusi"
            lead="Proses yang jelas dan terukur, dari konsultasi hingga purna jual."
          />
          <Steps steps={processSteps} />
        </Container>
      </section>

      {/* ============ FAQ ============ */}
      <FaqSection />

      {/* ============ Closing CTA ============ */}
      <section className="section">
        <Container>
          <div
            className="relative overflow-hidden rounded-[20px] px-8 py-14 text-center text-white sm:px-14"
            style={{ background: "var(--color-primary-dark)" }}
          >
            <div className="absolute inset-0 grid-bg opacity-40" aria-hidden />
            <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
              <h2 className="h1 text-white">
                Siap memulai pengadaan teknologi Anda?
              </h2>
              <p className="text-white/75">
                Ajukan kebutuhan Anda hari ini. Tim kami siap menyusun penawaran
                terbaik sesuai anggaran dan spesifikasi instansi.
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
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { Placeholder } from "@/components/placeholder";

export const metadata: Metadata = {
  title: "Artikel & Wawasan",
  description:
    "Artikel, panduan, dan wawasan seputar teknologi pengadaan, integrasi sistem, dan solusi untuk instansi dari hanako.id.",
};

export default function ArticlesPage() {
  return (
    <Container className="section flex flex-col gap-10">
      <div className="flex flex-col gap-5">
        <Breadcrumb
          items={[{ label: "Beranda", href: "/" }, { label: "Artikel" }]}
        />
        <h1 className="h1">Artikel &amp; Wawasan</h1>
        <p className="lead max-w-2xl">
          Panduan dan wawasan seputar pengadaan teknologi, integrasi sistem, dan
          praktik terbaik untuk instansi. Konten segera hadir.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[
          "Memilih Video Wall untuk Command Center",
          "Panduan Pengadaan via e-Katalog",
          "Tips Smart Class yang Efektif",
        ].map((title) => (
          <article key={title} className="card overflow-hidden">
            <Placeholder
              label="Artikel"
              ratio="16/9"
              className="rounded-none border-x-0 border-t-0"
            />
            <div className="flex flex-col gap-2 p-5">
              <span className="text-xs uppercase tracking-wider text-muted-2">
                Segera hadir
              </span>
              <h2 className="h4">{title}</h2>
            </div>
          </article>
        ))}
      </div>

      <div className="flex flex-col items-start gap-4 rounded-[16px] border border-border bg-surface p-8">
        <p className="text-ink-2">
          Sementara menunggu artikel kami, punya pertanyaan teknis? Tim kami siap
          membantu.
        </p>
        <Button href="/contact" variant="secondary">
          Hubungi Kami
          <ArrowRight />
        </Button>
      </div>
    </Container>
  );
}

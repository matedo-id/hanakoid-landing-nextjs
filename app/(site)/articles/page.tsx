import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { Button } from "@/components/button";
import { ArticleCard } from "@/components/article-card";
import { articles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Artikel & Wawasan",
  description:
    "Artikel, panduan, dan wawasan seputar pengadaan teknologi, integrasi sistem, dan solusi untuk instansi dari hanako.id.",
  alternates: { canonical: "/articles" },
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
          praktik terbaik untuk instansi.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      <div className="flex flex-col items-start gap-4 rounded-[16px] border border-border bg-surface p-8">
        <p className="text-ink-2">
          Punya pertanyaan teknis seputar pengadaan? Tim kami siap membantu.
        </p>
        <Button href="/contact" variant="secondary">
          Hubungi Kami
          <ArrowRight />
        </Button>
      </div>
    </Container>
  );
}

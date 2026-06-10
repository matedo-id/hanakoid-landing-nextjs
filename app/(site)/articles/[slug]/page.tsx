import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/section";
import { Breadcrumb } from "@/components/breadcrumb";
import { Badge } from "@/components/badge";
import { Button } from "@/components/button";
import { Placeholder } from "@/components/placeholder";
import { ArticleCard } from "@/components/article-card";
import {
  getArticle,
  relatedArticles,
  articles,
  formatDate,
  contact,
  siteUrl,
  waLink,
  type ArticleBlock,
} from "@/lib/data";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return { title: "Artikel tidak ditemukan" };
  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/articles/${article.slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt,
      publishedTime: article.date,
      authors: [article.author],
    },
  };
}

function Block({ block }: { block: ArticleBlock }) {
  if (block.type === "h2") {
    return <h2 className="h3 mt-10 mb-1">{block.text}</h2>;
  }
  if (block.type === "ul") {
    return (
      <ul className="my-2 flex list-disc flex-col gap-2 pl-5 text-ink-2">
        {block.items?.map((it) => (
          <li key={it} className="leading-relaxed">
            {it}
          </li>
        ))}
      </ul>
    );
  }
  return <p className="leading-relaxed text-ink-2">{block.text}</p>;
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = relatedArticles(article);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    articleSection: article.category,
    author: { "@type": "Organization", name: contact.company },
    publisher: {
      "@type": "Organization",
      name: contact.company,
      logo: { "@type": "ImageObject", url: `${siteUrl}/logo-hanakoid.webp` },
    },
    image: `${siteUrl}/opengraph-image`,
    mainEntityOfPage: `${siteUrl}/articles/${article.slug}`,
  };

  return (
    <Container className="section flex flex-col gap-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }}
      />

      <article className="mx-auto flex w-full max-w-3xl flex-col gap-8">
        <div className="flex flex-col gap-5">
          <Breadcrumb
            items={[
              { label: "Beranda", href: "/" },
              { label: "Artikel", href: "/articles" },
              { label: article.title },
            ]}
          />
          <Badge variant="accent">{article.category}</Badge>
          <h1 className="h1">{article.title}</h1>
          <p className="lead">{article.excerpt}</p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-border py-4 text-sm text-muted">
            <span className="inline-flex items-center gap-1.5">
              <User className="size-4" strokeWidth={1.8} />
              {article.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-4" strokeWidth={1.8} />
              {formatDate(article.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-4" strokeWidth={1.8} />
              {article.readingMinutes} menit baca
            </span>
          </div>
        </div>

        <Placeholder label={article.coverLabel} ratio="16/9" />

        <div className="flex flex-col gap-4">
          {article.content.map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </div>

        {/* CTA dalam artikel */}
        <div className="flex flex-col items-start gap-4 rounded-[16px] bg-primary-050 p-7">
          <h2 className="h4">Butuh bantuan untuk kebutuhan Anda?</h2>
          <p className="text-sm text-ink-2">
            Konsultasikan kebutuhan pengadaan teknologi instansi Anda dengan tim
            kami.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/rfq">
              Minta Penawaran
              <ArrowRight />
            </Button>
            <Button href={waLink()} external variant="wa">
              <MessageCircle />
              Chat Sales
            </Button>
          </div>
        </div>
      </article>

      {/* Artikel terkait */}
      {related.length > 0 && (
        <div className="flex flex-col gap-6">
          <h2 className="h3">Artikel lainnya</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}

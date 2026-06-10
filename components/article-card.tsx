import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import { Placeholder } from "@/components/placeholder";
import { Badge } from "@/components/badge";
import { formatDate, type Article } from "@/lib/data";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="card card--hover group flex flex-col overflow-hidden"
    >
      <Placeholder
        label={article.coverLabel}
        ratio="16/9"
        className="rounded-none border-x-0 border-t-0"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Badge variant="accent">{article.category}</Badge>
        <h3 className="h4 transition-colors group-hover:text-primary">
          {article.title}
        </h3>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {article.excerpt}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-muted-2">
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3.5" strokeWidth={1.8} />
            {formatDate(article.date)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock className="size-3.5" strokeWidth={1.8} />
            {article.readingMinutes} mnt baca
          </span>
        </div>
      </div>
    </Link>
  );
}

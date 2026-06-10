import Link from "next/link";
import { MapPin, Calendar } from "lucide-react";
import { Placeholder } from "@/components/placeholder";
import { Badge } from "@/components/badge";
import type { PortfolioItem } from "@/lib/data";

export function PortfolioCard({ item }: { item: PortfolioItem }) {
  return (
    <Link
      href={`/portfolio/${item.id}`}
      className="card card--hover group flex flex-col overflow-hidden"
    >
      <Placeholder
        label={item.coverLabel}
        ratio="16/9"
        className="rounded-none border-x-0 border-t-0"
      />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Badge variant="primary">{item.sector}</Badge>
        <div className="flex flex-col gap-1">
          <h3 className="h4 transition-colors group-hover:text-primary">
            {item.title}
          </h3>
          <span className="text-sm text-muted">{item.client}</span>
        </div>
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">
          {item.summary}
        </p>
        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 pt-1 text-xs text-muted-2">
          <span className="inline-flex items-center gap-1">
            <MapPin className="size-3.5" strokeWidth={1.8} />
            {item.location}
          </span>
          <span className="inline-flex items-center gap-1">
            <Calendar className="size-3.5" strokeWidth={1.8} />
            {item.year}
          </span>
        </div>
      </div>
    </Link>
  );
}

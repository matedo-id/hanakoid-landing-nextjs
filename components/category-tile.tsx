import Link from "next/link";
import type { Category } from "@/lib/data";

export function CategoryTile({ category }: { category: Category }) {
  const Icon = category.icon;
  return (
    <Link
      href={`/catalog?cat=${category.key}`}
      className="card card--hover group flex flex-col gap-4 p-6"
    >
      <span className="grid place-items-center rounded-[12px] bg-primary-050 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-white size-12">
        <Icon strokeWidth={1.8} className="size-6" />
      </span>
      <div className="flex flex-col gap-1.5">
        <h3 className="h4">{category.title}</h3>
        <p className="text-sm text-muted leading-relaxed">{category.desc}</p>
      </div>
    </Link>
  );
}

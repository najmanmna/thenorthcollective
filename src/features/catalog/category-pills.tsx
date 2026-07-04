import Link from "next/link";

import { CATEGORIES } from "@/content/categories";
import { cn } from "@/lib/utils";

export function CategoryPills({ activeCategory }: { activeCategory?: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Link
        href="/shop"
        className={cn(
          "border px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors",
          !activeCategory
            ? "border-ink bg-ink text-ivory"
            : "border-ink/20 text-ink/70 hover:border-ink/50"
        )}
      >
        All
      </Link>
      {CATEGORIES.map((category) => (
        <Link
          key={category.slug}
          href={`/shop/${category.slug}`}
          className={cn(
            "border px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors",
            activeCategory === category.slug
              ? "border-ink bg-ink text-ivory"
              : "border-ink/20 text-ink/70 hover:border-ink/50"
          )}
        >
          {category.name}
        </Link>
      ))}
    </div>
  );
}

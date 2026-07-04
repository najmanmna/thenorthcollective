import Link from "next/link";

import { CATEGORIES } from "@/content/categories";
import { cn } from "@/lib/utils";

export function CategorySidebar({
  activeCategory,
}: {
  activeCategory?: string;
}) {
  return (
    <nav aria-label="Shop by category" className="flex flex-col gap-1">
      <span className="mb-3 text-xs font-medium tracking-wide text-bronze uppercase">
        Category
      </span>
      <Link
        href="/shop"
        className={cn(
          "border-l-2 px-4 py-2 text-sm transition-colors",
          !activeCategory
            ? "border-ink font-semibold text-ink"
            : "border-transparent text-ink/60 hover:border-ink/30 hover:text-ink"
        )}
      >
        All Products
      </Link>
      {CATEGORIES.map((category) => (
        <Link
          key={category.slug}
          href={`/shop/${category.slug}`}
          className={cn(
            "border-l-2 px-4 py-2 text-sm transition-colors",
            activeCategory === category.slug
              ? "border-ink font-semibold text-ink"
              : "border-transparent text-ink/60 hover:border-ink/30 hover:text-ink"
          )}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
}

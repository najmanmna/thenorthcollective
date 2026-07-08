"use client";

import { useMemo } from "react";
import { Search } from "lucide-react";

import type { Category, Product } from "@/types/product";
import { MobileCategoryFilter } from "./mobile-category-filter";
import { ProductCard } from "./product-card";

export function LiveProductGrid({
  products,
  categories,
  query,
  onQueryChange,
  activeCategory,
}: {
  products: Product[];
  categories: Category[];
  query: string;
  onQueryChange: (value: string) => void;
  activeCategory?: string;
}) {
  const normalizedQuery = query.trim().toLowerCase();

  const filtered = useMemo(() => {
    if (!normalizedQuery) return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.brand.toLowerCase().includes(normalizedQuery)
    );
  }, [products, normalizedQuery]);

  return (
    <div className="flex flex-col gap-12">
      <div className="mx-auto flex w-full max-w-md items-center gap-2 lg:hidden">
        <div className="flex flex-1 items-center border border-ink/20 bg-surface focus-within:border-ink/50">
          <Search className="ml-4 h-4 w-4 shrink-0 text-bronze" />
          <input
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search products or brands"
            aria-label="Search products or brands"
            className="w-full bg-transparent px-4 py-3 text-sm text-ink placeholder:text-stone focus:outline-none"
          />
        </div>
        <MobileCategoryFilter categories={categories} activeCategory={activeCategory} />
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-3 border border-dashed border-ink/20 py-20 text-center">
          <span className="font-display text-xl text-ink">
            No products found
          </span>
          <p className="max-w-sm text-sm text-stone">
            {normalizedQuery
              ? `Nothing matches "${query}" in this collection yet. Try a different search or browse another category.`
              : "This category doesn't have any products listed yet. Check back soon."}
          </p>
        </div>
      )}
    </div>
  );
}

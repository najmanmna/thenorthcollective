"use client";

import { useState } from "react";
import { Search } from "lucide-react";

import { CATEGORIES } from "@/content/categories";
import { PRODUCTS } from "@/content/products";
import { CategorySidebar } from "./category-sidebar";
import { LiveProductGrid } from "./live-product-grid";

export function ShopView({
  activeCategory,
  query: initialQuery,
}: {
  activeCategory?: string;
  query?: string;
}) {
  const [query, setQuery] = useState(initialQuery ?? "");

  const activeCategoryData = CATEGORIES.find(
    (category) => category.slug === activeCategory
  );

  const categoryProducts = activeCategory
    ? PRODUCTS.filter((product) => product.category === activeCategory)
    : PRODUCTS;

  return (
    <div className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <div className="flex flex-col gap-3">
            <h1 className="font-display text-3xl text-ink sm:text-4xl md:text-5xl">
              {activeCategoryData
                ? activeCategoryData.name
                : "The Full Collection"}
            </h1>
            {activeCategoryData && (
              <p className="max-w-xl text-sm text-stone sm:text-base">
                {activeCategoryData.description}
              </p>
            )}
          </div>

          <div className="hidden w-full max-w-xs items-center border border-ink/20 bg-surface focus-within:border-ink/50 lg:flex">
            <Search className="ml-4 h-4 w-4 shrink-0 text-bronze" />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products or brands"
              aria-label="Search products or brands"
              className="w-full bg-transparent px-4 py-3 text-sm text-ink placeholder:text-stone focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-12 lg:grid lg:grid-cols-[220px_1fr] lg:items-start lg:gap-12">
          <aside className="hidden lg:block">
            <CategorySidebar activeCategory={activeCategory} />
          </aside>

          <div>
            <LiveProductGrid
              products={categoryProducts}
              query={query}
              onQueryChange={setQuery}
              activeCategory={activeCategory}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

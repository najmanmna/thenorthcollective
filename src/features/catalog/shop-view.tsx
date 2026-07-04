import { CATEGORIES } from "@/content/categories";
import { PRODUCTS } from "@/content/products";
import { CategoryPills } from "./category-pills";
import { LiveProductGrid } from "./live-product-grid";

export function ShopView({
  activeCategory,
  query,
}: {
  activeCategory?: string;
  query?: string;
}) {
  const activeCategoryData = CATEGORIES.find(
    (category) => category.slug === activeCategory
  );

  const categoryProducts = activeCategory
    ? PRODUCTS.filter((product) => product.category === activeCategory)
    : PRODUCTS;

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-bronze uppercase sm:text-xs">
          <span className="h-px w-8 bg-bronze/40" />
          <span>Shop</span>
          <span className="h-px w-8 bg-bronze/40" />
        </div>
        <h1 className="font-display text-3xl text-ink sm:text-4xl md:text-5xl">
          {activeCategoryData ? activeCategoryData.name : "The Full Collection"}
        </h1>
        {activeCategoryData && (
          <p className="max-w-xl text-sm text-stone sm:text-base">
            {activeCategoryData.description}
          </p>
        )}
      </div>

      <div className="mt-10">
        <CategoryPills activeCategory={activeCategory} />
      </div>

      <div className="mt-12">
        <LiveProductGrid products={categoryProducts} initialQuery={query} />
      </div>
    </div>
  );
}

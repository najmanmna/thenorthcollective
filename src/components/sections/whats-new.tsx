import Link from "next/link";

import { PRODUCTS } from "@/content/products";
import { ProductCard } from "@/features/catalog/product-card";

const NEW_PRODUCTS = PRODUCTS.filter((product) => product.isNew);

export function WhatsNew() {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              What&apos;s New
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-medium text-ink/70 uppercase underline decoration-bronze/50 underline-offset-4 transition-colors hover:text-ink"
          >
            View All
          </Link>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-6 lg:grid-cols-4">
          {NEW_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

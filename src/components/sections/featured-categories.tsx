import Image from "next/image";
import Link from "next/link";

import type { Category } from "@/types/product";

export function FeaturedCategories({ categories }: { categories: Category[] }) {
  return (
    <section className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-xs font-medium tracking-wide text-bronze uppercase">
            Browse Collections
          </span>
          <h2 className="font-display text-3xl text-ink sm:text-4xl">
            Shop by Category
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/shop/${category.slug}`}
              className="group flex flex-col border border-ink/15 bg-ivory transition-colors hover:border-ink/40"
            >
              <div className="relative aspect-4/3 overflow-hidden bg-surface">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-contain p-6 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-105 sm:p-10"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-xs font-medium text-stone/60 uppercase">
                      Photography Coming Soon
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center gap-2 p-4 text-center sm:p-6">
                <h3 className="font-display text-sm text-ink transition-colors group-hover:text-bronze sm:text-xl">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

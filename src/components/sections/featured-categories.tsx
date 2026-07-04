import Image from "next/image";
import Link from "next/link";

import { CATEGORIES } from "@/content/categories";

export function FeaturedCategories() {
  return (
    <section className="bg-surface py-20 sm:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered & Elevated Header */}
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-bronze uppercase sm:text-xs">
            <span className="h-px w-8 bg-bronze/40" />
            <span>Browse Collections</span>
            <span className="h-px w-8 bg-bronze/40" />
          </div>
          <h2 className="font-display text-3xl text-ink sm:text-4xl md:text-5xl">
            Shop by Category
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {CATEGORIES.map((category) => (
            <Link
              key={category.slug}
              href={`/shop/${category.slug}`}
              className="group relative flex flex-col border border-ink/20 bg-ivory p-2 transition-all duration-500 hover:border-ink/50 hover:shadow-sm"
            >
              {/* Heritage Double-Border Inner Frame */}
              <div className="absolute inset-1.5 border border-ink/10 pointer-events-none z-10 transition-colors duration-500 group-hover:border-ink/20" />

              <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
                    className="object-contain p-12 mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <span className="text-[10px] font-bold tracking-[0.2em] text-stone/60 uppercase">
                      Photography Coming Soon
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col items-center gap-3 p-8 text-center relative z-20">
                <h3 className="font-display text-2xl text-ink">
                  {category.name}
                </h3>
                <p className="text-sm text-ink/70 max-w-sm leading-relaxed">
                  {category.description}
                </p>
                <span className="mt-3 text-xs font-bold tracking-widest text-bronze uppercase underline decoration-bronze/40 underline-offset-8 transition-colors group-hover:text-ink group-hover:decoration-bronze">
                  Shop {category.name}
                </span>
              </div>

              {/* Decorative Brand Brackets */}
              <span className="pointer-events-none absolute top-2 left-2 h-3 w-3 border-t-2 border-l-2 border-bronze/70 transition-colors group-hover:border-bronze z-20" />
              <span className="pointer-events-none absolute top-2 right-2 h-3 w-3 border-t-2 border-r-2 border-bronze/70 transition-colors group-hover:border-bronze z-20" />
              <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-bronze/70 transition-colors group-hover:border-bronze z-20" />
              <span className="pointer-events-none absolute right-2 bottom-2 h-3 w-3 border-r-2 border-b-2 border-bronze/70 transition-colors group-hover:border-bronze z-20" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

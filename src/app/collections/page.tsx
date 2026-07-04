import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { CATEGORIES } from "@/content/categories";

export const metadata: Metadata = {
  title: "Collections at The North Collective",
  description:
    "Browse every curated collection from The North Collective, from pantry staples to skincare and wellness.",
};

export default function CollectionsPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-bronze uppercase sm:text-xs">
          <span className="h-px w-8 bg-bronze/40" />
          <span>Explore</span>
          <span className="h-px w-8 bg-bronze/40" />
        </div>
        <h1 className="font-display text-3xl text-ink sm:text-4xl md:text-5xl">
          All Collections
        </h1>
        <p className="max-w-xl text-sm text-stone sm:text-base">
          Seven curated collections, each chosen with the same care. Browse
          by category to find what you&apos;re looking for.
        </p>
      </div>

      <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {CATEGORIES.map((category) => (
          <Link
            key={category.slug}
            href={`/shop/${category.slug}`}
            className="group relative flex flex-col border border-ink/20 bg-ivory p-2 transition-all duration-500 hover:border-ink/50 hover:shadow-sm"
          >
            <div className="pointer-events-none absolute inset-1.5 z-10 border border-ink/10 transition-colors duration-500 group-hover:border-ink/20" />

            <div className="relative aspect-4/3 overflow-hidden bg-surface">
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

            <div className="relative z-20 flex flex-col items-center gap-3 p-8 text-center">
              <h2 className="font-display text-2xl text-ink">
                {category.name}
              </h2>
              <p className="max-w-sm text-sm leading-relaxed text-ink/70">
                {category.description}
              </p>
              <span className="mt-3 text-xs font-bold tracking-widest text-bronze uppercase underline decoration-bronze/40 underline-offset-8 transition-colors group-hover:text-ink group-hover:decoration-bronze">
                Shop {category.name}
              </span>
            </div>

            <span className="pointer-events-none absolute top-2 left-2 z-20 h-3 w-3 border-t-2 border-l-2 border-bronze/70 transition-colors group-hover:border-bronze" />
            <span className="pointer-events-none absolute top-2 right-2 z-20 h-3 w-3 border-t-2 border-r-2 border-bronze/70 transition-colors group-hover:border-bronze" />
            <span className="pointer-events-none absolute bottom-2 left-2 z-20 h-3 w-3 border-b-2 border-l-2 border-bronze/70 transition-colors group-hover:border-bronze" />
            <span className="pointer-events-none absolute right-2 bottom-2 z-20 h-3 w-3 border-r-2 border-b-2 border-bronze/70 transition-colors group-hover:border-bronze" />
          </Link>
        ))}
      </div>
    </div>
  );
}

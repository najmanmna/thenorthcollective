import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { PRODUCTS } from "@/content/products";

const FEATURED_PRODUCTS = PRODUCTS.filter((product) => product.featured);
import { formatPrice } from "@/lib/utils";

export function FeaturedProducts() {
  return (
    <section className="bg-ivory py-20 sm:py-28 relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-bronze uppercase sm:text-xs">
              <span className="h-px w-8 bg-bronze/40" />
              <span>Featured</span>
            </div>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              This Month&apos;s Finds
            </h2>
          </div>
          <Link
            href="/shop"
            className="text-sm font-semibold tracking-widest text-ink/80 uppercase underline decoration-bronze/50 underline-offset-8 transition-colors hover:text-ink hover:decoration-bronze mb-2 sm:mb-1"
          >
            View the Collection
          </Link>
        </div>

        {/* Product Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURED_PRODUCTS.map((product) => (
            <Link
              key={product.id}
              href={`/shop/products/${product.id}`}
              className="group relative flex flex-col border border-ink/20 bg-ivory p-2 transition-all duration-500 hover:border-ink/50 hover:shadow-sm"
            >
              {/* Heritage Double-Border Inner Frame */}
              <div className="pointer-events-none absolute inset-1.5 z-10 border border-ink/10 transition-colors duration-500 group-hover:border-ink/20" />

              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-surface">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 22vw, 45vw"
                  className="object-contain p-8 mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                />
                
                {/* Status Badge */}
                <Badge
                  variant={
                    product.availability === "available"
                      ? "secondary"
                      : "outline"
                  }
                  className={
                    product.availability === "preorder"
                      ? "absolute top-4 left-4 z-30 border-bronze text-bronze bg-ivory/80 backdrop-blur-sm shadow-sm font-medium tracking-wide uppercase text-[10px]"
                      : "absolute top-4 left-4 z-30 bg-ink text-ivory shadow-sm font-medium tracking-wide uppercase text-[10px] hover:bg-ink"
                  }
                >
                  {product.availability === "available"
                    ? "Available Now"
                    : "Pre-Order"}
                </Badge>
              </div>

              {/* Product Info */}
              <div className="relative z-20 flex flex-1 flex-col gap-1.5 p-6 text-center mt-2">
                <span className="text-[10px] font-bold tracking-[0.2em] text-stone uppercase">
                  {product.brand}
                </span>
                <h3 className="font-display text-lg text-ink leading-tight">
                  {product.name}
                </h3>
                <span className="mt-1 text-sm font-medium text-ink/80">
                  {formatPrice(product.price)}
                </span>
              </div>

              {/* Decorative Brand Brackets */}
              <span className="pointer-events-none absolute top-2 left-2 z-20 h-3 w-3 border-t-2 border-l-2 border-bronze/70 transition-colors group-hover:border-bronze" />
              <span className="pointer-events-none absolute top-2 right-2 z-20 h-3 w-3 border-t-2 border-r-2 border-bronze/70 transition-colors group-hover:border-bronze" />
              <span className="pointer-events-none absolute bottom-2 left-2 z-20 h-3 w-3 border-b-2 border-l-2 border-bronze/70 transition-colors group-hover:border-bronze" />
              <span className="pointer-events-none absolute right-2 bottom-2 z-20 h-3 w-3 border-r-2 border-b-2 border-bronze/70 transition-colors group-hover:border-bronze" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
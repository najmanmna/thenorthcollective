import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/products/${product.id}`}
      className="group relative flex flex-col border border-ink/20 bg-ivory p-2 transition-all duration-500 hover:border-ink/50 hover:shadow-sm"
    >
      {/* Heritage Double-Border Inner Frame */}
      <div className="pointer-events-none absolute inset-1.5 z-10 border border-ink/10 transition-colors duration-500 group-hover:border-ink/20" />

      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-contain p-8 mix-blend-multiply transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
        />
        <Badge
          variant={
            product.availability === "available" ? "secondary" : "outline"
          }
          className={
            product.availability === "preorder"
              ? "absolute top-4 left-4 z-30 border-bronze bg-ivory/80 text-[10px] font-medium tracking-wide text-bronze uppercase shadow-sm backdrop-blur-sm"
              : "absolute top-4 left-4 z-30 bg-ink text-[10px] font-medium tracking-wide text-ivory uppercase shadow-sm hover:bg-ink"
          }
        >
          {product.availability === "available"
            ? "Available Now"
            : "Pre-Order"}
        </Badge>
      </div>

      <div className="relative z-20 mt-2 flex flex-1 flex-col gap-1.5 p-6 text-center">
        <span className="text-[10px] font-bold tracking-[0.2em] text-stone uppercase">
          {product.brand}
        </span>
        <h3 className="font-display text-lg leading-tight text-ink">
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
  );
}

import Image from "next/image";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/products/${product.id}`} className="group flex flex-col">
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          className="object-contain p-8 mix-blend-multiply transition-transform duration-300 ease-out group-hover:scale-[1.03]"
        />
        <Badge
          variant={
            product.availability === "available" ? "secondary" : "outline"
          }
          className={
            product.availability === "preorder"
              ? "absolute top-2 left-2 h-4 border-bronze bg-ivory/90 px-1.5 py-0 text-[8px] font-medium tracking-wide text-bronze uppercase sm:top-3 sm:left-3 sm:h-5 sm:px-2 sm:py-0.5 sm:text-[10px]"
              : "absolute top-2 left-2 h-4 bg-ink px-1.5 py-0 text-[8px] font-medium tracking-wide text-ivory uppercase hover:bg-ink sm:top-3 sm:left-3 sm:h-5 sm:px-2 sm:py-0.5 sm:text-[10px]"
          }
        >
          {product.availability === "available"
            ? "Available Now"
            : "Pre-Order"}
        </Badge>
      </div>

      <div className="flex flex-col gap-1 pt-3">
        <span className="text-[11px] font-medium tracking-wide text-stone uppercase">
          {product.brand}
        </span>
        <h3 className="line-clamp-2 text-sm leading-snug font-medium text-ink">
          {product.name}
        </h3>
        <span className="text-sm font-semibold text-ink">
          {formatPrice(product.price)}
        </span>
      </div>
    </Link>
  );
}

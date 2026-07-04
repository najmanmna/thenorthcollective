import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/content/categories";
import { PRODUCTS } from "@/content/products";
import { ProductDetailPanel } from "@/features/catalog/product-detail-panel";
import { formatPrice } from "@/lib/utils";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const product = PRODUCTS.find((item) => item.id === id);

  if (!product) {
    return { title: "Product Not Found at The North Collective" };
  }

  return {
    title: `${product.name} at The North Collective`,
    description: product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = PRODUCTS.find((item) => item.id === id);

  if (!product) {
    notFound();
  }

  const category = CATEGORIES.find((item) => item.slug === product.category);

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      {category && (
        <Link
          href={`/shop/${category.slug}`}
          className="text-xs font-bold tracking-widest text-bronze uppercase transition-colors hover:text-ink"
        >
          &larr; {category.name}
        </Link>
      )}

      <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="relative border border-ink/20 bg-ivory p-2">
          <div className="pointer-events-none absolute inset-1.5 z-10 border border-ink/10" />

          <div className="relative aspect-square overflow-hidden bg-surface">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-contain p-10 mix-blend-multiply"
              priority
            />
          </div>

          <span className="pointer-events-none absolute top-2 left-2 z-20 h-3 w-3 border-t-2 border-l-2 border-bronze/70" />
          <span className="pointer-events-none absolute top-2 right-2 z-20 h-3 w-3 border-t-2 border-r-2 border-bronze/70" />
          <span className="pointer-events-none absolute bottom-2 left-2 z-20 h-3 w-3 border-b-2 border-l-2 border-bronze/70" />
          <span className="pointer-events-none absolute right-2 bottom-2 z-20 h-3 w-3 border-r-2 border-b-2 border-bronze/70" />
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold tracking-[0.2em] text-stone uppercase">
              {product.brand}
            </span>
            <h1 className="font-display text-3xl text-ink sm:text-4xl">
              {product.name}
            </h1>
            <Badge
              variant={
                product.availability === "available" ? "secondary" : "outline"
              }
              className={
                product.availability === "preorder"
                  ? "w-fit border-bronze text-bronze"
                  : "w-fit"
              }
            >
              {product.availability === "available"
                ? "Available Now"
                : "Pre-Order"}
            </Badge>
            <span className="text-xl font-medium text-ink">
              {formatPrice(product.price)}
            </span>
          </div>

          {product.description && (
            <p className="max-w-md text-base leading-relaxed text-stone">
              {product.description}
            </p>
          )}

          <div className="h-px w-16 bg-bronze/40" aria-hidden="true" />

          <ProductDetailPanel product={product} />
        </div>
      </div>
    </div>
  );
}

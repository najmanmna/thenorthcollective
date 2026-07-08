import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Badge } from "@/components/ui/badge";
import { CATEGORIES } from "@/content/categories";
import { PRODUCTS } from "@/content/products";
import { ProductCard } from "@/features/catalog/product-card";
import { ProductDetailPanel } from "@/features/catalog/product-detail-panel";
import { formatPrice } from "@/lib/utils";

const RELATED_PRODUCTS_LIMIT = 4;

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

  const relatedProducts = PRODUCTS.filter(
    (item) => item.category === product.category && item.id !== product.id
  ).slice(0, RELATED_PRODUCTS_LIMIT);

  return (
    <div className="bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        {category && (
          <Link
            href={`/shop/${category.slug}`}
            className="text-xs font-medium tracking-wide text-bronze uppercase transition-colors hover:text-ink"
          >
            &larr; {category.name}
          </Link>
        )}

        <div className="mt-8 grid gap-12 lg:grid-cols-2 lg:gap-16">
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

          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <span className="text-xs font-medium tracking-wide text-stone uppercase">
                {product.brand}
              </span>
              <h1 className="font-display text-3xl text-ink sm:text-4xl">
                {product.name}
              </h1>
              <Badge
                variant={
                  product.availability === "available"
                    ? "secondary"
                    : "outline"
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
              <span className="text-xl font-semibold text-ink">
                {formatPrice(product.price)}
              </span>
            </div>

            {product.description && (
              <p className="max-w-md text-sm leading-relaxed text-stone">
                {product.description}
              </p>
            )}

            <ProductDetailPanel product={product} />
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-20 border-t border-ink/10 pt-16 sm:mt-28 sm:pt-20">
            <h2 className="font-display text-2xl text-ink sm:text-3xl">
              You May Also Like
            </h2>
            <div className="mt-8 grid grid-cols-2 gap-6 lg:grid-cols-4">
              {relatedProducts.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

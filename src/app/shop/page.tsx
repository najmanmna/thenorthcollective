import type { Metadata } from "next";

import { ShopView } from "@/features/catalog/shop-view";
import { getAllCategories, getAllProducts } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Shop at The North Collective",
  description:
    "Browse the full collection of curated finds, available now and pre-order from Canada.",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  return <ShopView products={products} categories={categories} query={q} />;
}

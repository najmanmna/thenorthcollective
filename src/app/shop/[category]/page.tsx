import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ShopView } from "@/features/catalog/shop-view";
import { getAllCategories, getAllProducts } from "@/lib/sanity/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const categories = await getAllCategories();
  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    return { title: "Shop at The North Collective" };
  }

  return {
    title: `${category.name} at The North Collective`,
    description: category.description,
  };
}

export default async function ShopCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ q?: string }>;
}) {
  const { category: slug } = await params;
  const { q } = await searchParams;
  const [products, categories] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
  ]);

  const category = categories.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <ShopView
      products={products}
      categories={categories}
      activeCategory={category.slug}
      query={q}
    />
  );
}

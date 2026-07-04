import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CATEGORIES } from "@/content/categories";
import { ShopView } from "@/features/catalog/shop-view";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category: slug } = await params;
  const category = CATEGORIES.find((item) => item.slug === slug);

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

  const category = CATEGORIES.find((item) => item.slug === slug);

  if (!category) {
    notFound();
  }

  return <ShopView activeCategory={category.slug} query={q} />;
}

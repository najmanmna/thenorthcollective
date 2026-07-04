import type { Metadata } from "next";

import { ShopView } from "@/features/catalog/shop-view";

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

  return <ShopView query={q} />;
}

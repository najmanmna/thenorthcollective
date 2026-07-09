"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { Category } from "@/types/product";

export function CategoryStrip({ categories }: { categories: Category[] }) {
  const pathname = usePathname();

  if (pathname.startsWith("/shop") || pathname === "/guide") {
    return null;
  }

  return (
    <div className="sticky top-20 z-40 hidden w-full border-b border-ink/10 bg-surface lg:block">
      <nav
        aria-label="Shop by category"
        className="scrollbar-none mx-auto flex max-w-7xl items-center gap-6 overflow-x-auto px-4 py-3 text-sm font-medium whitespace-nowrap text-ink/70 sm:px-6 lg:px-8"
      >
        <Link
          href="/shop"
          className="shrink-0 transition-colors hover:text-ink"
        >
          All Products
        </Link>
        {categories.map((category) => (
          <Link
            key={category.slug}
            href={`/shop/${category.slug}`}
            className="shrink-0 transition-colors hover:text-ink"
          >
            {category.name}
          </Link>
        ))}
      </nav>
    </div>
  );
}

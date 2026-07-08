"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";
import { useOrderList } from "./order-list-context";

export function OrderListView({ products }: { products: Product[] }) {
  const { items, updateQuantity, removeItem } = useOrderList();

  const lineItems = items
    .map((item) => {
      const product = products.find((entry) => entry.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter(
      (entry): entry is { product: Product; quantity: number } =>
        entry !== null
    );

  const subtotal = lineItems.reduce(
    (sum, entry) => sum + entry.product.price * entry.quantity,
    0
  );
  const itemCount = lineItems.reduce((sum, entry) => sum + entry.quantity, 0);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-bronze uppercase sm:text-xs">
          <span className="h-px w-8 bg-bronze/40" />
          <span>Your Selection</span>
          <span className="h-px w-8 bg-bronze/40" />
        </div>
        <h1 className="font-display text-3xl text-ink sm:text-4xl md:text-5xl">
          Order List
        </h1>
      </div>

      {lineItems.length === 0 ? (
        <div className="mt-16 flex flex-col items-center gap-4 border border-dashed border-ink/20 py-20 text-center">
          <span className="font-display text-xl text-ink">
            Your order list is empty
          </span>
          <p className="max-w-sm text-sm text-stone">
            Browse the collection and add items you&apos;d like to request, and
            you can review everything here before submitting.
          </p>
          <Button
            size="lg"
            className="mt-2 px-8 tracking-widest uppercase"
            asChild
          >
            <Link href="/shop">Browse the Collection</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-16">
          <div className="flex flex-col divide-y divide-ink/10 border-y border-ink/10">
            {lineItems.map(({ product, quantity }) => (
              <div key={product.id} className="flex gap-4 py-6 sm:gap-6">
                <div className="relative h-24 w-24 shrink-0 border border-ink/20 bg-ivory p-1 sm:h-28 sm:w-28">
                  <div className="relative h-full w-full overflow-hidden bg-surface">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="112px"
                      className="object-contain p-3 mix-blend-multiply"
                    />
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-2">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] font-bold tracking-[0.2em] text-stone uppercase">
                        {product.brand}
                      </span>
                      <Link
                        href={`/shop/products/${product.id}`}
                        className="font-display text-base text-ink hover:text-bronze sm:text-lg"
                      >
                        {product.name}
                      </Link>
                      <Badge
                        variant={
                          product.availability === "available"
                            ? "secondary"
                            : "outline"
                        }
                        className={
                          product.availability === "preorder"
                            ? "w-fit border-bronze text-[10px] text-bronze uppercase"
                            : "w-fit text-[10px] uppercase"
                        }
                      >
                        {product.availability === "available"
                          ? "Available Now"
                          : "Pre-Order"}
                      </Badge>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeItem(product.id)}
                      aria-label={`Remove ${product.name}`}
                      className="p-1 text-stone transition-colors hover:text-ink"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center border border-ink/20">
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        aria-label={`Decrease quantity of ${product.name}`}
                        className="p-2 text-ink transition-colors hover:bg-ivory"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-8 text-center text-sm font-medium text-ink">
                        {quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        aria-label={`Increase quantity of ${product.name}`}
                        className="p-2 text-ink transition-colors hover:bg-ivory"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                    <span className="text-sm font-medium text-ink">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6 border border-ink/20 bg-ivory p-6">
            <h2 className="font-display text-lg text-ink">Summary</h2>
            <div className="flex items-center justify-between text-sm text-stone">
              <span>Items</span>
              <span>{itemCount}</span>
            </div>
            <div className="flex items-center justify-between border-t border-ink/10 pt-4 text-base font-medium text-ink">
              <span>Estimated Total</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <p className="text-xs leading-relaxed text-stone">
              This is an order request, not a final invoice. Pricing,
              availability, and delivery will be confirmed with you directly
              over WhatsApp.
            </p>
            <Button
              size="lg"
              className="w-full px-8 tracking-widest uppercase"
              asChild
            >
              <Link href="/checkout">Continue</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

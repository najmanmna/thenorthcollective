"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { PRODUCTS } from "@/content/products";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types/product";
import { CustomerInfoForm } from "./customer-info-form";
import { useOrderList } from "./order-list-context";

export function CheckoutView() {
  const { items } = useOrderList();

  const lineItems = items
    .map((item) => {
      const product = PRODUCTS.find((entry) => entry.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter(
      (entry): entry is { product: Product; quantity: number } =>
        entry !== null
    );

  if (lineItems.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col items-center gap-4 border border-dashed border-ink/20 py-20 text-center">
          <span className="font-display text-xl text-ink">
            Your order list is empty
          </span>
          <p className="max-w-sm text-sm text-stone">
            Add items to your order list before continuing to checkout.
          </p>
          <Button
            size="lg"
            className="mt-2 px-8 tracking-widest uppercase"
            asChild
          >
            <Link href="/shop">Browse the Collection</Link>
          </Button>
        </div>
      </div>
    );
  }

  const subtotal = lineItems.reduce(
    (sum, entry) => sum + entry.product.price * entry.quantity,
    0
  );

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-bronze uppercase sm:text-xs">
          <span className="h-px w-8 bg-bronze/40" />
          <span>Almost There</span>
          <span className="h-px w-8 bg-bronze/40" />
        </div>
        <h1 className="font-display text-3xl text-ink sm:text-4xl md:text-5xl">
          Your Details
        </h1>
      </div>

      <div className="mt-14 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start lg:gap-16">
        <CustomerInfoForm />

        <div className="flex flex-col gap-6 border border-ink/20 bg-ivory p-6">
          <h2 className="font-display text-lg text-ink">Order Summary</h2>
          <ul className="flex flex-col gap-3 border-y border-ink/10 py-4">
            {lineItems.map(({ product, quantity }) => (
              <li
                key={product.id}
                className="flex items-start justify-between gap-3 text-sm"
              >
                <span className="text-ink/80">
                  {product.name}{" "}
                  <span className="text-stone">&times;{quantity}</span>
                </span>
                <span className="shrink-0 font-medium text-ink">
                  {formatPrice(product.price * quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between text-base font-medium text-ink">
            <span>Estimated Total</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <p className="text-xs leading-relaxed text-stone">
            This is an order request, not a final invoice. Pricing,
            availability, and delivery will be confirmed with you directly
            over WhatsApp.
          </p>
        </div>
      </div>
    </div>
  );
}

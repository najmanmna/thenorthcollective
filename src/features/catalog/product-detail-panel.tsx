"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useOrderList } from "@/features/orders/order-list-context";
import type { Product } from "@/types/product";

export function ProductDetailPanel({ product }: { product: Product }) {
  const { addItem } = useOrderList();
  const [quantity, setQuantity] = useState(1);
  const [confirmed, setConfirmed] = useState(false);

  const handleAdd = () => {
    addItem(product.id, quantity);
    setConfirmed(true);
    window.setTimeout(() => setConfirmed(false), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex w-fit items-center border border-ink/20">
        <button
          type="button"
          onClick={() => setQuantity((current) => Math.max(1, current - 1))}
          aria-label="Decrease quantity"
          className="p-3 text-ink transition-colors hover:bg-ivory disabled:opacity-40"
          disabled={quantity <= 1}
        >
          <Minus className="h-3.5 w-3.5" />
        </button>
        <span className="w-10 text-center text-sm font-medium text-ink">
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => setQuantity((current) => current + 1)}
          aria-label="Increase quantity"
          className="p-3 text-ink transition-colors hover:bg-ivory"
        >
          <Plus className="h-3.5 w-3.5" />
        </button>
      </div>

      <Button
        size="lg"
        className="w-fit px-8 tracking-widest uppercase"
        onClick={handleAdd}
      >
        {confirmed ? "Added to Order List" : "Add to Order List"}
      </Button>
    </div>
  );
}

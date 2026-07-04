"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { buildWhatsAppOrderLink } from "@/lib/constants/whatsapp";
import { formatPrice } from "@/lib/utils";
import { readLastOrder, type SubmittedOrder } from "./last-order";

export function OrderSuccessView() {
  const [order, setOrder] = useState<SubmittedOrder | null | undefined>(
    undefined
  );

  useEffect(() => {
    setOrder(readLastOrder());
  }, []);

  if (order === undefined) {
    return null;
  }

  if (order === null) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col items-center gap-4 border border-dashed border-ink/20 py-20 text-center">
          <span className="font-display text-xl text-ink">
            No recent order found
          </span>
          <p className="max-w-sm text-sm text-stone">
            We couldn&apos;t find a recently submitted order on this device.
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

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const whatsAppLink = buildWhatsAppOrderLink(order.orderNumber);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <CheckCircle2 className="h-10 w-10 text-bronze" strokeWidth={1.5} />
        <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-bronze uppercase sm:text-xs">
          <span className="h-px w-8 bg-bronze/40" />
          <span>Order Received</span>
          <span className="h-px w-8 bg-bronze/40" />
        </div>
        <h1 className="font-display text-3xl text-ink sm:text-4xl">
          Thank you, {order.customer.name.split(" ")[0]}.
        </h1>
        <p className="max-w-md text-sm text-stone sm:text-base">
          Your order request has been received. Keep your order number handy;
          we&apos;ll be in touch to confirm the details.
        </p>
        <span className="mt-2 font-display text-2xl text-bronze">
          {order.orderNumber}
        </span>
      </div>

      <div className="mt-12 flex flex-col gap-6 border border-ink/20 bg-ivory p-6">
        <h2 className="font-display text-lg text-ink">Order Summary</h2>
        <ul className="flex flex-col gap-3 border-y border-ink/10 py-4">
          {order.items.map((item) => (
            <li
              key={item.productId}
              className="flex items-start justify-between gap-3 text-sm"
            >
              <span className="text-ink/80">
                {item.name}{" "}
                <span className="text-stone">&times;{item.quantity}</span>
              </span>
              <span className="shrink-0 font-medium text-ink">
                {formatPrice(item.price * item.quantity)}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex items-center justify-between text-base font-medium text-ink">
          <span>Estimated Total</span>
          <span>{formatPrice(subtotal)}</span>
        </div>

        <div className="border-t border-ink/10 pt-4 text-sm text-ink/80">
          <p className="font-medium text-ink">{order.customer.name}</p>
          <p>{order.customer.phone}</p>
          <p>{order.customer.address}</p>
          {order.customer.notes && (
            <p className="mt-2 text-stone">&ldquo;{order.customer.notes}&rdquo;</p>
          )}
        </div>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        {whatsAppLink ? (
          <Button
            size="lg"
            className="w-full px-8 tracking-widest uppercase sm:w-auto"
            asChild
          >
            <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">
              Continue to WhatsApp
            </a>
          </Button>
        ) : (
          <p className="max-w-sm text-center text-sm text-stone">
            We&apos;ll reach out to confirm your order shortly. WhatsApp
            handoff isn&apos;t configured yet on this site.
          </p>
        )}
        <Link
          href="/shop"
          className="text-sm tracking-wide text-ink/70 uppercase underline decoration-bronze/60 underline-offset-8 transition-colors hover:text-ink"
        >
          Continue Browsing
        </Link>
      </div>
    </div>
  );
}

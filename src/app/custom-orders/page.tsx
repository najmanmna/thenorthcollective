import type { Metadata } from "next";
import { CheckCircle2, MessageCircle, Search } from "lucide-react";

import { CustomOrderForm } from "@/features/custom-orders/custom-order-form";

export const metadata: Metadata = {
  title: "Custom Orders at The North Collective",
  description:
    "Can't find it in our catalogue? We'll source it directly from Canada.",
};

const STEPS = [
  { icon: MessageCircle, title: "Tell Us What You Need" },
  { icon: Search, title: "We Check Availability" },
  { icon: CheckCircle2, title: "Confirm & Order" },
];

export default function CustomOrdersPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-xs font-medium tracking-wide text-bronze uppercase">
          Custom Orders
        </span>
        <h1 className="max-w-2xl font-display text-3xl text-ink sm:text-4xl md:text-5xl">
          Can&apos;t find it? We&apos;ll bring it from Canada.
        </h1>
      </div>

      <div className="mx-auto mt-10 max-w-xl">
        <CustomOrderForm />
      </div>

      <div
        className="mx-auto mt-16 h-px w-16 bg-bronze/40"
        aria-hidden="true"
      />

      <div className="mt-16 grid gap-8 sm:grid-cols-3">
        {STEPS.map((step) => (
          <div
            key={step.title}
            className="flex flex-col items-center gap-3 text-center"
          >
            <step.icon
              className="h-6 w-6 text-bronze"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <h2 className="font-display text-lg text-ink">{step.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

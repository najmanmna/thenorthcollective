import type { Metadata } from "next";

import { CheckoutView } from "@/features/orders/checkout-view";

export const metadata: Metadata = {
  title: "Your Details at The North Collective",
  description: "Share your contact information to submit your order request.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}

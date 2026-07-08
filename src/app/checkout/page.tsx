import type { Metadata } from "next";

import { CheckoutView } from "@/features/orders/checkout-view";
import { getAllProducts } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Your Details at The North Collective",
  description: "Share your contact information to submit your order request.",
};

export default async function CheckoutPage() {
  const products = await getAllProducts();

  return <CheckoutView products={products} />;
}

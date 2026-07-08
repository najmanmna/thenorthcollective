import type { Metadata } from "next";

import { OrderListView } from "@/features/orders/order-list-view";
import { getAllProducts } from "@/lib/sanity/queries";

export const metadata: Metadata = {
  title: "Your Order List at The North Collective",
  description:
    "Review your selected products before submitting your order request.",
};

export default async function OrderListPage() {
  const products = await getAllProducts();

  return <OrderListView products={products} />;
}

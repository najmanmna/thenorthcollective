import type { Metadata } from "next";

import { OrderListView } from "@/features/orders/order-list-view";

export const metadata: Metadata = {
  title: "Your Order List at The North Collective",
  description:
    "Review your selected products before submitting your order request.",
};

export default function OrderListPage() {
  return <OrderListView />;
}

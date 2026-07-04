import type { Metadata } from "next";

import { OrderSuccessView } from "@/features/orders/order-success-view";

export const metadata: Metadata = {
  title: "Order Received from The North Collective",
  description: "Your order request has been received.",
};

export default function CheckoutSuccessPage() {
  return <OrderSuccessView />;
}

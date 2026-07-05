import { Navbar } from "@/components/layout/navbar";
import { CategoryStrip } from "@/components/layout/category-strip";
import { Footer } from "@/components/layout/footer";
import { OrderListProvider } from "@/features/orders/order-list-context";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <OrderListProvider>
      <Navbar />
      <CategoryStrip />
      {children}
      <Footer />
    </OrderListProvider>
  );
}

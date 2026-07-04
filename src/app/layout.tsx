import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { CategoryStrip } from "@/components/layout/category-strip";
import { Footer } from "@/components/layout/footer";
import { OrderListProvider } from "@/features/orders/order-list-context";

const lato = Lato({
  weight: ["400", "700"],
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The North Collective, Curated Global Finds",
  description: "Curated global finds, sourced from Canada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <OrderListProvider>
          <Navbar />
          <CategoryStrip />
          {children}
          <Footer />
        </OrderListProvider>
      </body>
    </html>
  );
}

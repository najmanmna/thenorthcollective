import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio - The North Collective",
  robots: "noindex",
};

export default function StudioLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}

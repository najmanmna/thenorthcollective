import { Hero } from "@/components/sections/hero";
import { FeaturedCategories } from "@/components/sections/featured-categories";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { HowItWorks } from "@/components/sections/how-it-works";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <FeaturedCategories />
      <FeaturedProducts />
      <HowItWorks />
    </main>
  );
}

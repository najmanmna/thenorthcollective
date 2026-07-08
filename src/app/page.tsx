import { Hero } from "@/components/sections/hero";
import { BrandIntro } from "@/components/sections/brand-intro";
import { SourcedFrom } from "@/components/sections/sourced-from";
import { WhatsNew } from "@/components/sections/whats-new";
import { BestSellers } from "@/components/sections/best-sellers";
import { FeaturedCategories } from "@/components/sections/featured-categories";
import { CustomOrders } from "@/components/sections/custom-orders";
import { WhyChooseUs } from "@/components/sections/why-choose-us";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <Hero />
      <BrandIntro />
      <SourcedFrom />
      <WhatsNew />
      <BestSellers />
      <FeaturedCategories />
      <CustomOrders />
      <WhyChooseUs />
    </main>
  );
}

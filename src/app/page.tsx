import { Hero } from "@/components/sections/hero";
import { BrandIntro } from "@/components/sections/brand-intro";
import { SourcedFrom } from "@/components/sections/sourced-from";
import { WhatsNew } from "@/components/sections/whats-new";
import { BestSellers } from "@/components/sections/best-sellers";
import { FeaturedCategories } from "@/components/sections/featured-categories";
import { CustomOrders } from "@/components/sections/custom-orders";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { getAllCategories, getAllProducts, getHeroBanners } from "@/lib/sanity/queries";

export default async function Home() {
  const [products, categories, heroBanners] = await Promise.all([
    getAllProducts(),
    getAllCategories(),
    getHeroBanners(),
  ]);

  return (
    <main className="flex flex-1 flex-col">
      <Hero banners={heroBanners} />
      <BrandIntro />
      <SourcedFrom />
      <WhatsNew products={products} />
      <BestSellers products={products} />
      <FeaturedCategories categories={categories} />
      <CustomOrders />
      <WhyChooseUs />
    </main>
  );
}

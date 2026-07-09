import type { Metadata } from "next";
import Link from "next/link";
import { Gem, ShieldCheck, Target } from "lucide-react";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Story at The North Collective",
  description:
    "North Collective curates genuinely good international products, chosen for quality, trusted ingredients, and everyday value.",
};

const VALUES = [
  {
    icon: Gem,
    title: "Curated",
    description:
      "Every product begins with a choice. We select only what we believe belongs in your home, products chosen for their quality, purpose and everyday value.",
  },
  {
    icon: ShieldCheck,
    title: "Authentic",
    description:
      "From globally trusted brands to genuine imported products, everything you discover at North Collective is sourced with integrity and backed by authenticity.",
  },
  {
    icon: Target,
    title: "Intentional",
    description:
      "We believe in thoughtful curation over endless choice. Every addition to our collection earns its place, so you can shop with confidence.",
  },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-bronze uppercase sm:text-xs">
          <span className="h-px w-8 bg-bronze/40" />
          <span>Our Story</span>
          <span className="h-px w-8 bg-bronze/40" />
        </div>
        <h1 className="font-display text-3xl text-ink sm:text-4xl md:text-5xl">
          Curated Global Finds, Sourced from Canada
        </h1>
      </div>

      <div className="mt-12 flex flex-col gap-6 text-base leading-relaxed text-stone sm:text-lg">
        <p>
          North Collective began with a simple belief: discovering genuinely
          good international products shouldn&apos;t depend on overseas
          travel or asking someone to bring them home.
        </p>
        <p>
          We set out to build a destination where carefully selected products
          from around the world could be found in one place, products chosen
          not because they are popular, but because they offer exceptional
          quality, trusted ingredients and everyday value.
        </p>
        <p className="font-display text-lg text-ink sm:text-xl">
          Every product on our shelves earns its place.
        </p>
        <p>
          Whether it&apos;s your morning coffee, your child&apos;s lunchbox
          snack, your wellness routine or your pantry essentials, we believe
          everyday choices deserve extraordinary quality.
        </p>
        <p>
          Today, North Collective continues to curate products from
          internationally trusted brands, making it easier for Sri Lankan
          families to discover, enjoy and experience better products every
          day.
        </p>
        <p className="font-display text-lg text-ink sm:text-xl">
          Because great products don&apos;t simply fill a shelf.
          <br />
          They become part of everyday life.
        </p>
      </div>

      <div className="mt-16 h-px w-16 bg-bronze/40" aria-hidden="true" />

      <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
        {VALUES.map((value) => (
          <div
            key={value.title}
            className="flex flex-col gap-3 border-t border-ink/15 pt-6"
          >
            <value.icon
              className="h-7 w-7 text-bronze"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <h2 className="font-display text-xl text-ink">{value.title}</h2>
            <p className="text-sm leading-relaxed text-stone">
              {value.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Button size="lg" className="px-8 tracking-widest uppercase" asChild>
          <Link href="/shop">Discover the Collection</Link>
        </Button>
      </div>
    </div>
  );
}

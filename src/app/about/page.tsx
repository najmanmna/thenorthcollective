import type { Metadata } from "next";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Our Story at The North Collective",
  description:
    "The North Collective travels across Canada to find what's rare, well-made, and worth bringing home to Sri Lanka.",
};

const VALUES = [
  {
    title: "Curated",
    description:
      "Every product is chosen individually, not ordered in bulk to fill shelf space. If it doesn't earn its place, it doesn't make the collection.",
  },
  {
    title: "Authentic",
    description:
      "What you see is what's sourced: genuine goods from Canadian brands, not reproductions or grey-market substitutes.",
  },
  {
    title: "Considered",
    description:
      "Small numbers, chosen with care. We'd rather bring home the right things than the most things.",
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
          The North Collective began with a simple idea: there are things
          worth carrying across the world, and they deserve to be found with
          the same care they were made.
        </p>
        <p>
          We travel across Canada to find what&apos;s rare, well-made, and
          worth bringing home to Sri Lanka, from pantry staples to skincare
          to everyday essentials. Nothing is mass-ordered. Every product
          starts as something we&apos;d want in our own home first.
        </p>
        <p>
          The business runs on direct conversation, not automation. Instagram
          and WhatsApp have always been how we&apos;ve connected with
          customers, and this site doesn&apos;t replace that. It gives you a
          calmer way to browse before we pick up the conversation and confirm
          the details together.
        </p>
      </div>

      <div className="mt-16 h-px w-16 bg-bronze/40" aria-hidden="true" />

      <div className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-8">
        {VALUES.map((value) => (
          <div
            key={value.title}
            className="flex flex-col gap-3 border-t border-ink/15 pt-6"
          >
            <h2 className="font-display text-xl text-ink">{value.title}</h2>
            <p className="text-sm leading-relaxed text-stone">
              {value.description}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-16 flex justify-center">
        <Button size="lg" className="px-8 tracking-widest uppercase" asChild>
          <Link href="/shop">Explore the Collection</Link>
        </Button>
      </div>
    </div>
  );
}

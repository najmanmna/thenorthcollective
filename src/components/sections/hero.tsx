"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";

type Product = { id: string; src: string; alt: string };

const PRODUCT_POOL: Product[] = [
  {
    id: "maple-syrup",
    src: "/679131-894__1.webp",
    alt: "Kirkland Signature Organic Maple Syrup",
  },
  {
    id: "olive-oil",
    src: "/692731-894__1.webp",
    alt: "Kirkland Signature Organic Extra Virgin Olive Oil",
  },
  {
    id: "ordinary-set",
    src: "/s2764116-av-06-zoom.webp",
    alt: "The Ordinary Daily Set",
  },
  {
    id: "cetaphil-cleanser",
    src: "/120902-894-frca__1.webp",
    alt: "Cetaphil Gentle Skin Cleanser",
  },
  {
    id: "cetaphil-lotion",
    src: "/169940-894-frca__1.webp",
    alt: "Cetaphil Moisturizing Lotion",
  },
  {
    id: "aveeno-wash",
    src: "/61NFiXlziwL._AC_UF894,1000_QL80_FMwebp_.webp",
    alt: "Aveeno Skin Relief Body Wash",
  },
];

const SLOT_COUNT = 4;
const SHUFFLE_INTERVAL_MS = 2800; // Slightly slower for a more deliberate, premium feel

function useShufflingSlots(pool: Product[], slotCount: number, paused: boolean) {
  const [slots, setSlots] = useState<Product[]>(() => pool.slice(0, slotCount));

  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      setSlots((current) => {
        const slotIndex = Math.floor(Math.random() * current.length);
        const hidden = pool.filter(
          (product) => !current.some((slot) => slot.id === product.id)
        );
        const next =
          hidden[Math.floor(Math.random() * hidden.length)] ?? current[slotIndex];
        const updated = [...current];
        updated[slotIndex] = next;
        return updated;
      });
    }, SHUFFLE_INTERVAL_MS);

    return () => clearInterval(id);
  }, [pool, slotCount, paused]);

  return slots;
}

function ProductTile({ product }: { product: Product }) {
  return (
    <Link
      href={`/shop/products/${product.id}`}
      className="group relative overflow-hidden border border-ink/30 bg-surface p-2 shadow-sm transition-all hover:border-ink/50 hover:shadow-md"
    >
      {/* Heritage Double-Border Inner Frame */}
      <div className="absolute inset-1.5 border border-ink/10 pointer-events-none z-10 transition-colors group-hover:border-ink/20" />

      <AnimatePresence mode="popLayout">
        <motion.div
          key={product.id}
          initial={{ opacity: 0, scale: 1.08, filter: "blur(4px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 0.96, filter: "blur(4px)" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0 flex items-center justify-center p-6"
        >
          <Image
            src={product.src}
            alt={product.alt}
            fill
            sizes="(min-width: 1024px) 22vw, 40vw"
            className="object-contain p-6 mix-blend-multiply transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105" // Blends white product backgrounds into the surface color
          />
        </motion.div>
      </AnimatePresence>

      {/* Decorative Brand Brackets */}
      <span className="pointer-events-none absolute top-2 left-2 h-3 w-3 border-t-2 border-l-2 border-bronze z-20 transition-transform group-hover:scale-125" />
      <span className="pointer-events-none absolute top-2 right-2 h-3 w-3 border-t-2 border-r-2 border-bronze z-20 transition-transform group-hover:scale-125" />
      <span className="pointer-events-none absolute bottom-2 left-2 h-3 w-3 border-b-2 border-l-2 border-bronze z-20 transition-transform group-hover:scale-125" />
      <span className="pointer-events-none absolute right-2 bottom-2 h-3 w-3 border-r-2 border-b-2 border-bronze z-20 transition-transform group-hover:scale-125" />
    </Link>
  );
}

export function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const [isGridHovered, setIsGridHovered] = useState(false);
  const slots = useShufflingSlots(
    PRODUCT_POOL,
    SLOT_COUNT,
    Boolean(prefersReducedMotion) || isGridHovered
  );

  return (
    <section className="relative overflow-hidden bg-ivory">
      {/* Subtle Background Texture/Overlay could go here if needed */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28 relative z-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-center lg:gap-20">
          
          {/* Left Column: Brand & Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-start gap-7"
          >
            {/* Extracted Brand Tagline & Compass */}
            <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-bronze uppercase sm:text-xs">
              <span>Curated Global Finds</span>
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 flex-shrink-0">
                <path d="M12 0L13.5 8.5L22 10L13.5 11.5L12 20L10.5 11.5L2 10L10.5 8.5L12 0Z" />
              </svg>
              <span>Sourced from Canada</span>
            </div>

            <h1 className="sr-only">
              The North Collective, Curated Global Finds, Sourced from Canada
            </h1>

            <Image
              src="/North Collective Logo.png"
              alt="The North Collective"
              width={320}
              height={320}
              priority
              className="-ml-2 h-48 w-auto sm:h-56 lg:h-64 object-contain"
            />

            <div className="h-px w-16 bg-bronze/40" aria-hidden="true" />

            <p className="max-w-md text-base leading-relaxed text-ink/85 sm:text-lg">
              The North Collective travels across Canada to find what&apos;s
              rare, well-made, and worth bringing home to Sri Lanka, curated
              in small numbers and chosen with care, never mass-produced.
            </p>

            <div className="flex flex-wrap items-center gap-8 pt-4">
              <Button
                size="lg"
                className="bg-ink text-ivory hover:bg-ink/90 px-8 py-6 text-sm tracking-widest uppercase rounded-none border border-transparent transition-all hover:border-bronze"
                asChild
              >
                <Link href="/shop">View the Collection</Link>
              </Button>
              <Link
                href="/about"
                className="text-sm font-semibold tracking-widest text-ink/80 uppercase underline decoration-bronze/50 underline-offset-8 transition-colors hover:text-ink hover:decoration-bronze"
              >
                Our Story
              </Link>
            </div>
          </motion.div>

          {/* Right Column: Dynamic Catalog Grid */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            onMouseEnter={() => setIsGridHovered(true)}
            onMouseLeave={() => setIsGridHovered(false)}
            className="grid h-[420px] grid-cols-2 grid-rows-2 gap-4 sm:h-[500px] sm:gap-6 lg:h-[560px]"
          >
            {slots.map((product, index) => (
              <ProductTile key={`${product.id}-${index}`} product={product} />
            ))}
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
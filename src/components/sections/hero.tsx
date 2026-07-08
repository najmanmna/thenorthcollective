"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { HeroBanner } from "@/lib/sanity/queries";

const AUTOPLAY_INTERVAL_MS = 5500;
const SWIPE_CONFIDENCE_THRESHOLD = 10000;

const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function Hero({ banners }: { banners: HeroBanner[] }) {
  const prefersReducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const goTo = useCallback(
    (next: number) => {
      setIndex(((next % banners.length) + banners.length) % banners.length);
    },
    [banners.length]
  );

  useEffect(() => {
    if (prefersReducedMotion || isHovered || banners.length < 2) return;

    const id = setInterval(() => {
      setIndex((current) => (current + 1) % banners.length);
    }, AUTOPLAY_INTERVAL_MS);

    return () => clearInterval(id);
  }, [prefersReducedMotion, isHovered, banners.length]);

  if (banners.length === 0) return null;

  const banner = banners[index];
  const objectPosition = banner.hotspot
    ? `${banner.hotspot.x * 100}% ${banner.hotspot.y * 100}%`
    : "50% 50%";

  return (
    <section
      className="relative bg-ink" // Changed to a dark background to hide edges during transitions
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-3/2 w-full overflow-hidden sm:aspect-auto sm:h-140 lg:h-160">
        <AnimatePresence initial={false}>
          <motion.div
            key={banner.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -SWIPE_CONFIDENCE_THRESHOLD) {
                goTo(index + 1);
              } else if (swipe > SWIPE_CONFIDENCE_THRESHOLD) {
                goTo(index - 1);
              }
            }}
          >
            <Image
              src={banner.url}
              alt={banner.alt}
              fill
              sizes="100vw"
              priority={index === 0}
              className="object-cover"
              style={{ objectPosition }}
              draggable={false} // Prevent default browser image dragging
            />

            {/* Gradient scrim for CTA contrast protection */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ink/60 via-ink/20 to-transparent pointer-events-none" />
          </motion.div>
        </AnimatePresence>

        {/* Persistent CTA + dots overlay, stacked so they never collide */}
        <div className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex flex-col items-center gap-4 sm:bottom-10">
          <Button
            size="lg"
            className="pointer-events-auto hidden rounded-none border border-transparent bg-ivory px-10 py-6 text-sm tracking-widest text-ink uppercase transition-all hover:bg-white sm:inline-flex"
            asChild
          >
            <Link href={banner.link}>Shop Now</Link>
          </Button>

          <div className="pointer-events-auto flex items-center gap-1">
            {banners.length > 1 && banners.map((item, i) => (
              <button
                key={item.id}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to banner ${i + 1}`}
                aria-current={i === index}
                className="group p-2"
              >
                <div
                  className={`h-1.5 w-8 transition-colors duration-300 ${
                    i === index ? "bg-ivory" : "bg-ivory/40 group-hover:bg-ivory/70"
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {banners.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              aria-label="Previous banner"
              className="absolute top-1/2 left-4 hidden -translate-y-1/2 rounded-full bg-ivory/70 p-3 text-ink backdrop-blur-md transition-all hover:bg-ivory hover:scale-105 sm:block z-10"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              aria-label="Next banner"
              className="absolute top-1/2 right-4 hidden -translate-y-1/2 rounded-full bg-ivory/70 p-3 text-ink backdrop-blur-md transition-all hover:bg-ivory hover:scale-105 sm:block z-10"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
    </section>
  );
}
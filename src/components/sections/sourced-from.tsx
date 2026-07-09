import Image from "next/image";

import type { RetailerLogo } from "@/lib/sanity/queries";

function RetailerLogoImage({ logo }: { logo: RetailerLogo }) {
  return (
    <Image
      src={logo.url}
      alt={logo.name}
      width={logo.width}
      height={logo.height}
      className="h-7 w-auto shrink-0 object-contain opacity-60 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0"
    />
  );
}

export function SourcedFrom({ logos }: { logos: RetailerLogo[] }) {
  if (logos.length === 0) return null;

  return (
    <section className="bg-ivory pb-16 sm:pb-20">
      <div className="mx-auto max-w-5xl px-0 sm:px-6 lg:px-8">
        <p className="px-4 text-center text-[10px] font-bold tracking-[0.3em] text-bronze uppercase sm:px-0">
          Where We Shop For You
        </p>

        {/* Mobile: single-line auto-scrolling marquee, no room to wrap */}
        <div className="mt-8 overflow-hidden sm:hidden">
          <div className="animate-marquee flex w-max items-center gap-12">
            {[...logos, ...logos].map((logo, index) => (
              <RetailerLogoImage key={`${logo.id}-${index}`} logo={logo} />
            ))}
          </div>
        </div>

        {/* Desktop: static, centered, wraps if needed */}
        <div className="mt-8 hidden flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:flex">
          {logos.map((logo) => (
            <RetailerLogoImage key={logo.id} logo={logo} />
          ))}
        </div>
      </div>
    </section>
  );
}

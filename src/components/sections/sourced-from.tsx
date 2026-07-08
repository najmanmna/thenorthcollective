import Image from "next/image";

const RETAILERS = [
  { name: "Walmart", image: "/walmart.svg", width: 120, height: 23 },
  { name: "Costco", image: "/costco.svg", width: 100, height: 36 },
  { name: "Sephora", image: "/sephora.svg", width: 110, height: 14 },
  { name: "IKEA", image: "/ikea.svg", width: 70, height: 28 },
];

function RetailerLogo({ retailer }: { retailer: (typeof RETAILERS)[number] }) {
  return (
    <Image
      src={retailer.image}
      alt={retailer.name}
      width={retailer.width}
      height={retailer.height}
      className="h-7 w-auto shrink-0 object-contain opacity-60 grayscale transition-all duration-200 hover:opacity-100 hover:grayscale-0"
    />
  );
}

export function SourcedFrom() {
  return (
    <section className="bg-ivory pb-16 sm:pb-20">
      <div className="mx-auto max-w-5xl px-0 sm:px-6 lg:px-8">
        <p className="px-4 text-center text-[10px] font-bold tracking-[0.3em] text-bronze uppercase sm:px-0">
          Where We Shop For You
        </p>

        {/* Mobile: single-line auto-scrolling marquee, no room to wrap */}
        <div className="mt-8 overflow-hidden sm:hidden">
          <div className="animate-marquee flex w-max items-center gap-12">
            {[...RETAILERS, ...RETAILERS].map((retailer, index) => (
              <RetailerLogo key={`${retailer.name}-${index}`} retailer={retailer} />
            ))}
          </div>
        </div>

        {/* Desktop: static, centered, wraps if needed */}
        <div className="mt-8 hidden flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:flex">
          {RETAILERS.map((retailer) => (
            <RetailerLogo key={retailer.name} retailer={retailer} />
          ))}
        </div>
      </div>
    </section>
  );
}

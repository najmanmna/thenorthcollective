const STEPS = [
  {
    title: "Browse the Collection",
    description:
      "Explore Available Now and Pre-Order pieces side by side. There's no need to pick a lane before you've seen what's on offer.",
  },
  {
    title: "Build Your Order List",
    description:
      "Add anything that catches your eye and adjust quantities as you go. Mix in-stock and pre-order items freely.",
  },
  {
    title: "Share Your Details",
    description:
      "Submit your contact information when you're ready. You'll receive an order number right away.",
  },
  {
    title: "Confirm on WhatsApp",
    description:
      "We pick up the conversation on WhatsApp to confirm availability, pricing, and delivery.",
  },
];

export function HowItWorks() {
  return (
    <section className="bg-surface py-20 sm:py-28 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Brand Header */}
        <div className="flex flex-col items-center gap-4 text-center mb-16">
          <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-bronze uppercase sm:text-xs">
            <span className="h-px w-8 bg-bronze/40" />
            <span>The Journey</span>
            <span className="h-px w-8 bg-bronze/40" />
          </div>
          <h2 className="font-display text-3xl text-ink sm:text-4xl md:text-5xl">
            From Browsing to WhatsApp
          </h2>
        </div>

        {/* Dynamic Step Timeline Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {STEPS.map((step, index) => (
            <div
              key={step.title}
              className="group relative flex flex-col border border-ink/20 bg-ivory p-6 transition-all duration-500 hover:border-ink/40"
            >
              {/* Heritage Double-Border Inner Frame */}
              <div className="pointer-events-none absolute inset-1.5 z-10 border border-ink/10 transition-colors duration-500 group-hover:border-ink/20" />

              {/* Step Counter Badge Style */}
              <div className="flex items-baseline justify-between mb-4 relative z-20">
                <span className="font-display text-4xl text-bronze/90 select-none transition-colors duration-500 group-hover:text-bronze">
                  {String(index + 1).padStart(2, "0")}
                </span>
                
                {/* Vintage Crosshair Graphic Node */}
                <span className="text-xs text-ink/20 font-light select-none group-hover:text-bronze/40 transition-colors duration-500">
                  &#65291;
                </span>
              </div>

              {/* Copy Blocks */}
              <div className="relative z-20 flex flex-col gap-2 mt-2">
                <h3 className="font-display text-xl text-ink leading-tight transition-colors duration-500 group-hover:text-ink">
                  {step.title}
                </h3>
                <p className="text-sm text-ink/75 leading-relaxed mt-1">
                  {step.description}
                </p>
              </div>

              {/* Decorative Brand Brackets */}
              <span className="pointer-events-none absolute top-2 left-2 z-20 h-3 w-3 border-t-2 border-l-2 border-bronze/40 transition-colors group-hover:border-bronze" />
              <span className="pointer-events-none absolute top-2 right-2 z-20 h-3 w-3 border-t-2 border-r-2 border-bronze/40 transition-colors group-hover:border-bronze" />
              <span className="pointer-events-none absolute bottom-2 left-2 z-20 h-3 w-3 border-b-2 border-l-2 border-bronze/40 transition-colors group-hover:border-bronze" />
              <span className="pointer-events-none absolute right-2 bottom-2 z-20 h-3 w-3 border-r-2 border-b-2 border-bronze/40 transition-colors group-hover:border-bronze" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
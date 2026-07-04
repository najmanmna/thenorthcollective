import Link from "next/link";

export function CustomOrders() {
  return (
    <section className="relative overflow-hidden border-y border-ink/10 bg-ivory py-20 sm:py-28">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 leading-none opacity-[0.06] grayscale select-none text-[22rem]"
      >
        🍁
      </span>

      <div className="relative z-10 mx-auto flex max-w-2xl flex-col items-center justify-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        <span className="text-[10px] font-bold tracking-[0.3em] text-bronze uppercase">
          Custom Sourcing
        </span>

        <h2 className="font-display text-3xl text-ink sm:text-4xl lg:text-5xl">
          Can&apos;t find it? We&apos;ll bring it from Canada.
        </h2>

        <Link
          href="/custom-orders"
          className="group mt-2 inline-flex items-center justify-center border border-ink bg-transparent px-8 py-3 text-xs font-bold uppercase tracking-widest text-ink transition-colors duration-200 hover:bg-ink hover:text-ivory"
        >
          Request a Product
        </Link>
      </div>
    </section>
  );
}

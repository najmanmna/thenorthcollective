import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service for The North Collective",
  description: "The terms that govern order requests placed with The North Collective.",
};

const SECTIONS = [
  {
    title: "Order Requests, Not Purchases",
    body: "Submitting an order through this site creates an order request, not a binding purchase. Final pricing, availability, and delivery are confirmed directly with you over WhatsApp before anything is finalised.",
  },
  {
    title: "Product Availability",
    body: "Items marked \"Available Now\" are already in stock locally. Items marked \"Pre-Order\" are sourced from Canada after your order is confirmed and may take longer to arrive.",
  },
  {
    title: "Pricing",
    body: "Prices shown on the site are indicative and subject to confirmation at the time your order is reviewed.",
  },
  {
    title: "Payments",
    body: "This site does not process online payments. Payment arrangements are made directly with you as part of the WhatsApp confirmation.",
  },
  {
    title: "Changes to These Terms",
    body: "We may update these terms from time to time as the business evolves. Continued use of the site after changes means you accept the updated terms.",
  },
];

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-bronze uppercase sm:text-xs">
          <span className="h-px w-8 bg-bronze/40" />
          <span>Legal</span>
        </div>
        <h1 className="font-display text-3xl text-ink sm:text-4xl">
          Terms of Service
        </h1>
      </div>

      <div className="mt-12 flex flex-col gap-10">
        {SECTIONS.map((section) => (
          <div key={section.title} className="flex flex-col gap-3 border-t border-ink/15 pt-6">
            <h2 className="font-display text-lg text-ink">{section.title}</h2>
            <p className="text-sm leading-relaxed text-stone">{section.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

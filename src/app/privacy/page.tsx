import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy for The North Collective",
  description: "How The North Collective collects, uses, and stores your information.",
};

const SECTIONS = [
  {
    title: "Information We Collect",
    body: "When you submit an order request, we collect your name, phone number, delivery address, and any notes you choose to add. We do not require an account or password to browse or order.",
  },
  {
    title: "How We Use Your Information",
    body: "Your information is used to confirm, fulfil, and communicate about your order request, primarily by contacting you over WhatsApp or phone. We do not use it for unrelated marketing.",
  },
  {
    title: "Your Order List",
    body: "Items you add while browsing are stored locally in your own browser so your order list persists between visits. This information stays on your device and is only shared with us once you submit an order request.",
  },
  {
    title: "Third Parties",
    body: "We do not sell your information, and we do not share it with third parties for advertising purposes.",
  },
  {
    title: "Contact",
    body: "If you have questions about how your information is handled, reach out to us directly over WhatsApp.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-bronze uppercase sm:text-xs">
          <span className="h-px w-8 bg-bronze/40" />
          <span>Legal</span>
        </div>
        <h1 className="font-display text-3xl text-ink sm:text-4xl">
          Privacy Policy
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

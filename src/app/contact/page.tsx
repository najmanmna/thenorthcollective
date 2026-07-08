import type { Metadata } from "next";

import { Button } from "@/components/ui/button";
import { buildWhatsAppGeneralLink } from "@/lib/constants/whatsapp";
import { ContactForm } from "@/features/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact The North Collective",
  description: "Reach The North Collective directly over WhatsApp or email.",
};

export default function ContactPage() {
  const whatsAppLink = buildWhatsAppGeneralLink();

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 text-[10px] font-bold tracking-[0.2em] text-bronze uppercase sm:text-xs">
          <span className="h-px w-8 bg-bronze/40" />
          <span>Get in Touch</span>
          <span className="h-px w-8 bg-bronze/40" />
        </div>
        <h1 className="font-display text-3xl text-ink sm:text-4xl md:text-5xl">
          We&apos;re a Message Away
        </h1>
        <p className="max-w-md text-base leading-relaxed text-stone sm:text-lg">
          The North Collective runs on direct conversation, where every
          order, question, and update happens over WhatsApp. Reach out any time and
          we&apos;ll get back to you personally.
        </p>
      </div>

      <div className="mt-10 flex flex-col items-center gap-4">
        {whatsAppLink ? (
          <Button size="lg" className="px-8 tracking-widest uppercase" asChild>
            <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">
              Message Us on WhatsApp
            </a>
          </Button>
        ) : (
          <p className="text-sm text-stone">
            WhatsApp contact isn&apos;t configured yet on this site.
          </p>
        )}
      </div>

      <div className="mx-auto mt-16 h-px w-16 bg-bronze/40" aria-hidden="true" />

      <div className="mx-auto mt-10 max-w-md text-left">
        <p className="mb-6 text-center text-sm text-stone">
          Prefer email? Send us a message directly.
        </p>
        <ContactForm />
      </div>
    </div>
  );
}

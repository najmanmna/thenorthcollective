"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { buildWhatsAppCustomOrderLink } from "@/lib/constants/whatsapp";
import { generateOrderNumber, isValidEmail } from "@/lib/utils";
import { submitCustomOrderRequest } from "./actions";

type FormErrors = Partial<Record<"name" | "phone" | "email" | "details", string>>;

export function CustomOrderForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [details, setDetails] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [whatsAppLink, setWhatsAppLink] = useState<string | null>();
  const [requestId, setRequestId] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = "Please enter your full name.";
    if (!phone.trim()) nextErrors.phone = "Please enter a contact number.";
    if (email.trim() && !isValidEmail(email.trim()))
      nextErrors.email = "Please enter a valid email address.";
    if (!details.trim())
      nextErrors.details = "Tell us what you're looking for.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    const id = generateOrderNumber("CO");
    const trimmedName = name.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim() || undefined;
    const trimmedDetails = details.trim();
    const trimmedNotes = notes.trim() || undefined;

    const link = buildWhatsAppCustomOrderLink({
      requestId: id,
      name: trimmedName,
      phone: trimmedPhone,
      details: trimmedDetails,
      notes: trimmedNotes,
    });

    setRequestId(id);
    setWhatsAppLink(link);

    void submitCustomOrderRequest({
      requestId: id,
      name: trimmedName,
      phone: trimmedPhone,
      email: trimmedEmail,
      details: trimmedDetails,
      notes: trimmedNotes,
    });
  };

  if (requestId) {
    return (
      <div className="flex flex-col items-center gap-4 border border-ink/15 bg-ivory p-8 text-center">
        <span className="font-display text-xl text-ink">
          Custom Order Request Received
        </span>
        <span className="font-display text-lg text-bronze">{requestId}</span>
        <p className="max-w-sm text-sm text-stone">
          Thanks, {name.trim().split(" ")[0]}. Continue to WhatsApp to send
          us the details and we&apos;ll confirm availability, pricing, and
          timeline with you directly.
        </p>
        {whatsAppLink ? (
          <Button size="lg" className="px-8 tracking-widest uppercase" asChild>
            <a href={whatsAppLink} target="_blank" rel="noopener noreferrer">
              Continue to WhatsApp
            </a>
          </Button>
        ) : (
          <p className="text-sm text-stone">
            WhatsApp contact isn&apos;t configured yet on this site.
          </p>
        )}
        <button
          type="button"
          onClick={() => setRequestId(null)}
          className="text-sm text-ink/60 underline underline-offset-4 hover:text-ink"
        >
          Edit details
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          aria-invalid={Boolean(errors.name)}
          placeholder="Amaya Perera"
        />
        {errors.name && (
          <p className="text-xs text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          aria-invalid={Boolean(errors.phone)}
          placeholder="+94 77 123 4567"
        />
        {errors.phone && (
          <p className="text-xs text-destructive">{errors.phone}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email Address (optional)</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(errors.email)}
          placeholder="amaya@example.com"
        />
        <p className="text-xs text-stone">
          We&apos;ll send a confirmation here if provided.
        </p>
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="details">What are you looking for?</Label>
        <Textarea
          id="details"
          value={details}
          onChange={(event) => setDetails(event.target.value)}
          aria-invalid={Boolean(errors.details)}
          placeholder="Brand, product, size, or a link/photo reference"
          rows={4}
        />
        {errors.details && (
          <p className="text-xs text-destructive">{errors.details}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="notes">Additional Notes (optional)</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Quantity, budget, timeline, anything else?"
          rows={3}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full px-8 tracking-widest uppercase"
      >
        Request Order
      </Button>
    </form>
  );
}

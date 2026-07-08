"use client";

import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { isValidEmail } from "@/lib/utils";
import { submitContactForm } from "./actions";

type FormErrors = Partial<Record<"name" | "email" | "message", string>>;

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "sent" | "failed">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = "Please enter your name.";
    if (!email.trim()) nextErrors.email = "Please enter your email address.";
    else if (!isValidEmail(email.trim()))
      nextErrors.email = "Please enter a valid email address.";
    if (!message.trim()) nextErrors.message = "Please enter a message.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const result = await submitContactForm({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });
    setSubmitting(false);
    setStatus(result.success ? "sent" : "failed");

    if (result.success) {
      setName("");
      setEmail("");
      setMessage("");
    }
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-center gap-3 border border-ink/15 bg-ivory p-8 text-center">
        <span className="font-display text-xl text-ink">Message Sent</span>
        <p className="max-w-sm text-sm text-stone">
          Thanks for reaching out. We&apos;ll get back to you by email shortly.
        </p>
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
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email Address</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          aria-invalid={Boolean(errors.email)}
          placeholder="amaya@example.com"
        />
        {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          aria-invalid={Boolean(errors.message)}
          placeholder="How can we help?"
          rows={4}
        />
        {errors.message && (
          <p className="text-xs text-destructive">{errors.message}</p>
        )}
      </div>

      {status === "failed" && (
        <p className="text-xs text-destructive">
          Something went wrong sending your message. Please try again, or
          reach us on WhatsApp instead.
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full px-8 tracking-widest uppercase"
        disabled={submitting}
      >
        Send Message
      </Button>
    </form>
  );
}

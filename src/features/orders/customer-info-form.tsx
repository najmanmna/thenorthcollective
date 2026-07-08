"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { generateOrderNumber, isValidEmail } from "@/lib/utils";
import type { Product } from "@/types/product";
import { submitOrder } from "./actions";
import { saveLastOrder } from "./last-order";
import { useOrderList } from "./order-list-context";

type FormErrors = Partial<Record<"name" | "phone" | "email" | "address", string>>;

export function CustomerInfoForm({ products }: { products: Product[] }) {
  const router = useRouter();
  const { items, clearItems } = useOrderList();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = "Please enter your full name.";
    if (!phone.trim()) nextErrors.phone = "Please enter a contact number.";
    if (email.trim() && !isValidEmail(email.trim()))
      nextErrors.email = "Please enter a valid email address.";
    if (!address.trim())
      nextErrors.address = "Please enter a delivery address.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);

    const orderItems = items
      .map((item) => {
        const product = products.find((entry) => entry.id === item.productId);
        return product
          ? {
              productId: product.id,
              name: product.name,
              brand: product.brand,
              price: product.price,
              quantity: item.quantity,
              image: product.image || undefined,
            }
          : null;
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

    const order = {
      orderNumber: generateOrderNumber(),
      items: orderItems,
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        address: address.trim(),
        notes: notes.trim() || undefined,
      },
      submittedAt: new Date().toISOString(),
    };

    saveLastOrder(order);
    void submitOrder(order);

    clearItems();
    router.push("/checkout/success");
  };

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
        <p className="text-xs text-stone">
          Used to confirm your order over WhatsApp.
        </p>
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
          We&apos;ll send an order confirmation here if provided.
        </p>
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="address">Delivery Address</Label>
        <Textarea
          id="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          aria-invalid={Boolean(errors.address)}
          placeholder="House number, street, city"
          rows={3}
        />
        {errors.address && (
          <p className="text-xs text-destructive">{errors.address}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="notes">Notes (optional)</Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          placeholder="Anything else we should know?"
          rows={3}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full px-8 tracking-widest uppercase"
        disabled={submitting}
      >
        Submit Order Request
      </Button>
    </form>
  );
}

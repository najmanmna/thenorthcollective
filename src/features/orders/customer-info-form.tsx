"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PRODUCTS } from "@/content/products";
import { generateOrderNumber } from "@/lib/utils";
import { saveLastOrder } from "./last-order";
import { useOrderList } from "./order-list-context";

type FormErrors = Partial<Record<"name" | "phone" | "address", string>>;

export function CustomerInfoForm() {
  const router = useRouter();
  const { items, clearItems } = useOrderList();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = "Please enter your full name.";
    if (!phone.trim()) nextErrors.phone = "Please enter a contact number.";
    if (!address.trim())
      nextErrors.address = "Please enter a delivery address.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);

    const orderItems = items
      .map((item) => {
        const product = PRODUCTS.find((entry) => entry.id === item.productId);
        return product
          ? {
              productId: product.id,
              name: product.name,
              brand: product.brand,
              price: product.price,
              quantity: item.quantity,
            }
          : null;
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

    const orderNumber = generateOrderNumber();

    saveLastOrder({
      orderNumber,
      items: orderItems,
      customer: {
        name: name.trim(),
        phone: phone.trim(),
        address: address.trim(),
        notes: notes.trim() || undefined,
      },
      submittedAt: new Date().toISOString(),
    });

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

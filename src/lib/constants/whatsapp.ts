/**
 * The business's WhatsApp number in international format, digits only
 * (e.g. "94771234567"). Leave empty until the real number is available;
 * the order success screen falls back to a plain confirmation when unset
 * rather than linking to a placeholder or wrong number.
 */
export const WHATSAPP_BUSINESS_NUMBER = "+94715907151";

function buildWhatsAppLink(message: string) {
  const digitsOnly = WHATSAPP_BUSINESS_NUMBER.replace(/\D/g, "");
  if (!digitsOnly) return null;

  return `https://wa.me/${digitsOnly}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppOrderLink(orderNumber: string) {
  return buildWhatsAppLink(
    `Hi! I'd like to confirm my order ${orderNumber} from The North Collective.`
  );
}

export function buildWhatsAppGeneralLink() {
  return buildWhatsAppLink("Hi! I have a question about The North Collective.");
}

export function buildWhatsAppCustomOrderLink({
  requestId,
  name,
  phone,
  details,
  notes,
}: {
  requestId: string;
  name: string;
  phone: string;
  details: string;
  notes?: string;
}) {
  const lines = [
    `Hi! I'd like to request a custom order from The North Collective (Request ${requestId}).`,
    `Name: ${name}`,
    `Phone: ${phone}`,
    `What I'm looking for: ${details}`,
  ];
  if (notes) lines.push(`Additional notes: ${notes}`);

  return buildWhatsAppLink(lines.join("\n"));
}

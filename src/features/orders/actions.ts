"use server";

import { escapeHtml, NOTIFICATION_FROM, NOTIFICATION_TO, resend } from "@/lib/email/client";
import { buildWhatsAppOrderLink, WHATSAPP_BUSINESS_NUMBER } from "@/lib/constants/whatsapp";
import { sanityWriteClient } from "@/lib/sanity/write-client";
import { formatPrice } from "@/lib/utils";
import type { SubmittedOrder } from "./last-order";

// The WhatsApp handoff is the actual business-critical path here, not these
// records. Sanity and email are independent side effects — either can fail
// without blocking the customer's checkout flow, and one failing shouldn't
// stop the other from being attempted.
export async function submitOrder(order: SubmittedOrder) {
  try {
    await sanityWriteClient.create({
      _type: "order",
      orderNumber: order.orderNumber,
      customer: order.customer,
      items: order.items.map((item) => ({
        _key: item.productId,
        _type: "orderItem",
        ...item,
      })),
      status: "new",
      submittedAt: order.submittedAt,
    });
  } catch (error) {
    console.error("Failed to save order to Sanity:", error);
  }

  try {
    const subtotal = order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    const itemsHtml = order.items
      .map(
        (item) =>
          `<li>${escapeHtml(item.name)} (${escapeHtml(item.brand)}) &times; ${item.quantity} — ${formatPrice(item.price * item.quantity)}</li>`
      )
      .join("");

    await resend.emails.send({
      from: NOTIFICATION_FROM,
      to: NOTIFICATION_TO,
      subject: `New Order: ${order.orderNumber}`,
      html: `
        <h2>New Order Request — ${escapeHtml(order.orderNumber)}</h2>
        <p>
          <strong>Name:</strong> ${escapeHtml(order.customer.name)}<br/>
          <strong>Phone:</strong> ${escapeHtml(order.customer.phone)}<br/>
          <strong>Address:</strong> ${escapeHtml(order.customer.address)}
        </p>
        ${order.customer.notes ? `<p><strong>Notes:</strong> ${escapeHtml(order.customer.notes)}</p>` : ""}
        <h3>Items</h3>
        <ul>${itemsHtml}</ul>
        <p><strong>Estimated Total:</strong> ${formatPrice(subtotal)}</p>
      `,
    });
  } catch (error) {
    console.error("Failed to send order notification email:", error);
  }

  if (order.customer.email) {
    try {
      const whatsAppLink = buildWhatsAppOrderLink(order.orderNumber);

      await resend.emails.send({
        from: NOTIFICATION_FROM,
        to: order.customer.email,
        subject: `Order Received — ${order.orderNumber}`,
        html: `
          <h2>Thanks, ${escapeHtml(order.customer.name.split(" ")[0])}.</h2>
          <p>We've received your order request. Your order number is:</p>
          <p style="font-size: 18px; font-weight: bold;">${escapeHtml(order.orderNumber)}</p>
          <p>
            If you don't hear back from us, or you'd like to confirm your
            order sooner, WhatsApp your order number to
            ${escapeHtml(WHATSAPP_BUSINESS_NUMBER)}${
              whatsAppLink
                ? ` — or just <a href="${whatsAppLink}">tap here to message us directly</a>.`
                : "."
            }
          </p>
        `,
      });
    } catch (error) {
      console.error("Failed to send order confirmation email to customer:", error);
    }
  }
}

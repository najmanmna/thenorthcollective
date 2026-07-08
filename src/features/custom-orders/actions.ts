"use server";

import { escapeHtml, getResendClient, NOTIFICATION_FROM, NOTIFICATION_TO } from "@/lib/email/client";
import { buildWhatsAppCustomOrderLink, WHATSAPP_BUSINESS_NUMBER } from "@/lib/constants/whatsapp";
import { getSanityWriteClient } from "@/lib/sanity/write-client";

// Same reasoning as orders: WhatsApp is the real handoff. Sanity and email
// are independent side effects, each logged (not thrown) on failure.
export async function submitCustomOrderRequest(input: {
  requestId: string;
  name: string;
  phone: string;
  email?: string;
  details: string;
  notes?: string;
}) {
  try {
    await getSanityWriteClient().create({
      _type: "customOrderRequest",
      requestId: input.requestId,
      customer: { name: input.name, phone: input.phone, email: input.email },
      details: input.details,
      notes: input.notes,
      status: "new",
      submittedAt: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Failed to save custom order request to Sanity:", error);
  }

  try {
    await getResendClient().emails.send({
      from: NOTIFICATION_FROM,
      to: NOTIFICATION_TO,
      subject: `New Custom Order Request: ${input.requestId}`,
      html: `
        <h2>New Custom Order Request — ${escapeHtml(input.requestId)}</h2>
        <p>
          <strong>Name:</strong> ${escapeHtml(input.name)}<br/>
          <strong>Phone:</strong> ${escapeHtml(input.phone)}
          ${input.email ? `<br/><strong>Email:</strong> ${escapeHtml(input.email)}` : ""}
        </p>
        <p><strong>Looking for:</strong><br/>${escapeHtml(input.details)}</p>
        ${input.notes ? `<p><strong>Additional notes:</strong><br/>${escapeHtml(input.notes)}</p>` : ""}
      `,
    });
  } catch (error) {
    console.error("Failed to send custom order request email:", error);
  }

  if (input.email) {
    try {
      const whatsAppLink = buildWhatsAppCustomOrderLink(input);

      await getResendClient().emails.send({
        from: NOTIFICATION_FROM,
        to: input.email,
        subject: `Request Received — ${input.requestId}`,
        html: `
          <h2>Thanks, ${escapeHtml(input.name.split(" ")[0])}.</h2>
          <p>We've received your custom order request. Your request ID is:</p>
          <p style="font-size: 18px; font-weight: bold;">${escapeHtml(input.requestId)}</p>
          <p>
            If you don't hear back from us, or you'd like to confirm sooner,
            WhatsApp your request ID to ${escapeHtml(WHATSAPP_BUSINESS_NUMBER)}${
              whatsAppLink
                ? ` — or just <a href="${whatsAppLink}">tap here to message us directly</a>.`
                : "."
            }
          </p>
        `,
      });
    } catch (error) {
      console.error(
        "Failed to send custom order request confirmation email to customer:",
        error
      );
    }
  }
}

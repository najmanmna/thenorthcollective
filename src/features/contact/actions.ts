"use server";

import { escapeHtml, getResendClient, NOTIFICATION_FROM, NOTIFICATION_TO } from "@/lib/email/client";

export async function submitContactForm(input: {
  name: string;
  email: string;
  message: string;
}) {
  try {
    await getResendClient().emails.send({
      from: NOTIFICATION_FROM,
      to: NOTIFICATION_TO,
      replyTo: input.email,
      subject: `New Contact Message from ${input.name}`,
      html: `
        <h2>New Contact Message</h2>
        <p>
          <strong>Name:</strong> ${escapeHtml(input.name)}<br/>
          <strong>Email:</strong> ${escapeHtml(input.email)}
        </p>
        <p><strong>Message:</strong><br/>${escapeHtml(input.message)}</p>
      `,
    });
    return { success: true as const };
  } catch (error) {
    console.error("Failed to send contact form email:", error);
    return { success: false as const };
  }
}

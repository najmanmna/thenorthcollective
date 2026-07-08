import "server-only";
import { Resend } from "resend";

let client: Resend | undefined;

// Lazy for the same reason as the Sanity write client — a missing
// RESEND_API_KEY should only fail the specific send attempt (caught by the
// caller), not crash the whole action at import time.
export function getResendClient(): Resend {
  if (client) return client;

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("Missing RESEND_API_KEY");
  }

  client = new Resend(apiKey);
  return client;
}

// Resend's shared testing sender. Until a domain is verified on the account,
// Resend restricts delivery to only the email the account is registered
// with, regardless of what "to" address is used here.
export const NOTIFICATION_FROM = "The North Collective <onboarding@resend.dev>";
export const NOTIFICATION_TO = "thenorthcollectiveweb@gmail.com";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

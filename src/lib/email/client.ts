import "server-only";
import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey) {
  throw new Error("Missing RESEND_API_KEY in .env.local");
}

export const resend = new Resend(apiKey);

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

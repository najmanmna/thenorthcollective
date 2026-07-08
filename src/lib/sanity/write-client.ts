import "server-only";
import { createClient, type SanityClient } from "@sanity/client";

let client: SanityClient | undefined;

// Lazy so a missing env var throws only when a caller actually needs to
// write (inside their own try/catch), not at module-evaluation time —
// which would otherwise crash the whole Server Action before any
// error-handling code gets to run.
export function getSanityWriteClient(): SanityClient {
  if (client) return client;

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
  const token = process.env.SANITY_API_WRITE_TOKEN;

  if (!projectId || !dataset) {
    throw new Error(
      "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET"
    );
  }
  if (!token) {
    throw new Error(
      "Missing SANITY_API_WRITE_TOKEN (Editor-level token from sanity.io/manage)."
    );
  }

  client = createClient({
    projectId,
    dataset,
    apiVersion: "2026-01-01",
    token,
    useCdn: false,
  });
  return client;
}

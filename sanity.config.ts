import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

if (!projectId || !dataset) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local"
  );
}

export default defineConfig({
  name: "north-collective",
  title: "The North Collective",
  basePath: "/admin/studio",
  projectId,
  dataset,
  schema: {
    types: [],
  },
  plugins: [structureTool(), visionTool()],
});

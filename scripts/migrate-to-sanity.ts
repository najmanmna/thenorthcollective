import { createReadStream, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

import { CATEGORIES } from "../src/content/categories";
import { PRODUCTS } from "../src/content/products";

// Matches the hotspot the hero carousel used to hardcode via CSS
// (object-right on mobile) before banners moved into Sanity.
const HERO_BANNERS = [
  {
    image: "/banner-pantry.png",
    alt: "Maple syrup in maple-leaf-shaped glass bottles",
    order: 0,
  },
  {
    image: "/banner-skincare.png",
    alt: "Skincare textures and botanicals flat lay",
    order: 1,
  },
];
const HERO_BANNER_HOTSPOT = { x: 0.78, y: 0.5 };

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC_DIR = path.join(__dirname, "..", "public");

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !dataset) {
  throw new Error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or NEXT_PUBLIC_SANITY_DATASET in .env.local"
  );
}
if (!token) {
  throw new Error(
    "Missing SANITY_API_WRITE_TOKEN. Generate an Editor-level token at " +
      "sanity.io/manage -> your project -> API -> Tokens, then add it to " +
      ".env.local (do NOT prefix it with NEXT_PUBLIC_)."
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2026-01-01",
  token,
  useCdn: false,
});

async function uploadImage(imagePath: string) {
  const absolutePath = path.join(PUBLIC_DIR, imagePath.replace(/^\//, ""));
  if (!existsSync(absolutePath)) {
    console.warn(`  ! Image not found, skipping: ${imagePath}`);
    return undefined;
  }
  const asset = await client.assets.upload(
    "image",
    createReadStream(absolutePath),
    { filename: path.basename(absolutePath) }
  );
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: asset._id } };
}

async function migrateCategories() {
  console.log(`\nMigrating ${CATEGORIES.length} categories...`);
  const slugToDocId = new Map<string, string>();

  for (const category of CATEGORIES) {
    const docId = `category-${category.slug}`;
    const image = category.image ? await uploadImage(category.image) : undefined;

    await client.createOrReplace({
      _id: docId,
      _type: "category",
      name: category.name,
      slug: { _type: "slug", current: category.slug },
      description: category.description,
      ...(image ? { image } : {}),
    });

    slugToDocId.set(category.slug, docId);
    console.log(`  ✓ ${category.name}`);
  }

  return slugToDocId;
}

async function migrateProducts(slugToDocId: Map<string, string>) {
  console.log(`\nMigrating ${PRODUCTS.length} products...`);

  for (const product of PRODUCTS) {
    const categoryDocId = slugToDocId.get(product.category);
    if (!categoryDocId) {
      console.warn(
        `  ! Skipping "${product.name}": unknown category "${product.category}"`
      );
      continue;
    }

    const docId = `product-${product.id}`;
    const image = await uploadImage(product.image);

    await client.createOrReplace({
      _id: docId,
      _type: "product",
      name: product.name,
      slug: { _type: "slug", current: product.id },
      brand: product.brand,
      price: product.price,
      availability: product.availability,
      category: { _type: "reference", _ref: categoryDocId },
      ...(image ? { image } : {}),
      featured: product.featured ?? false,
      isNew: product.isNew ?? false,
      ...(product.description ? { description: product.description } : {}),
    });

    console.log(`  ✓ ${product.name}`);
  }
}

async function migrateHeroBanners() {
  console.log(`\nMigrating ${HERO_BANNERS.length} hero banners...`);

  for (const banner of HERO_BANNERS) {
    const image = await uploadImage(banner.image);
    if (!image) continue;

    const docId = `heroBanner-${banner.order}`;
    await client.createOrReplace({
      _id: docId,
      _type: "heroBanner",
      alt: banner.alt,
      order: banner.order,
      image: {
        ...image,
        hotspot: {
          _type: "sanity.imageHotspot",
          ...HERO_BANNER_HOTSPOT,
          height: 1,
          width: 1,
        },
      },
    });

    console.log(`  ✓ ${banner.alt}`);
  }
}

async function main() {
  const slugToDocId = await migrateCategories();
  await migrateProducts(slugToDocId);
  await migrateHeroBanners();
  console.log("\nDone.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});

import type { Availability, Category, Product } from "@/types/product";
import { sanityClient } from "./client";
import { urlFor } from "./image";

// Categories change rarely; products a bit more often. Longer revalidate
// windows mean most requests are served from Next's Data Cache instead of
// hitting Sanity directly, which matters on Cloudflare Workers where every
// live fetch is a subrequest against the platform's per-request limits.
const CATEGORIES_REVALIDATE_SECONDS = 3600;
const PRODUCTS_REVALIDATE_SECONDS = 60;
const HERO_BANNERS_REVALIDATE_SECONDS = 300;

type RawImage =
  | {
      asset?: { _ref: string };
      hotspot?: { x: number; y: number };
    }
  | null
  | undefined;

type RawCategory = {
  name: string;
  slug: { current: string };
  description: string;
  image: RawImage;
};

type RawProduct = {
  name: string;
  slug: { current: string };
  brand: string;
  price: number;
  availability: Availability;
  category: { slug: { current: string } } | null;
  image: RawImage;
  featured: boolean | null;
  isNew: boolean | null;
  description: string | null;
};

const PRODUCT_FIELDS = `
  name, slug, brand, price, availability, image, featured, isNew, description,
  "category": category->{ slug }
`;

const CATEGORIES_QUERY = `*[_type == "category"] | order(order asc){ name, slug, description, image }`;
const PRODUCTS_QUERY = `*[_type == "product"]{ ${PRODUCT_FIELDS} }`;
const PRODUCT_WITH_RELATED_QUERY = `*[_type == "product" && slug.current == $slug][0]{
  ${PRODUCT_FIELDS},
  "related": *[_type == "product" && category._ref == ^.category._ref && slug.current != ^.slug.current][0...4]{
    ${PRODUCT_FIELDS}
  }
}`;
const HERO_BANNERS_QUERY = `*[_type == "heroBanner"] | order(order asc){
  _id, alt, link, image,
  "dimensions": image.asset->metadata.dimensions
}`;
const RETAILER_LOGOS_QUERY = `*[_type == "retailerLogo"] | order(order asc){
  _id, name,
  "url": logo.asset->url,
  "dimensions": logo.asset->metadata.dimensions
}`;
const RETAILER_LOGOS_REVALIDATE_SECONDS = 3600;

function mapImage(image: RawImage): string {
  return image?.asset ? urlFor(image).width(1000).fit("max").url() : "";
}

function mapProduct(raw: RawProduct): Product {
  return {
    id: raw.slug.current,
    name: raw.name,
    brand: raw.brand,
    price: raw.price,
    availability: raw.availability,
    image: mapImage(raw.image),
    category: raw.category?.slug.current ?? "",
    featured: raw.featured ?? false,
    isNew: raw.isNew ?? false,
    description: raw.description ?? undefined,
  };
}

export async function getAllCategories(): Promise<Category[]> {
  const raw = await sanityClient.fetch<RawCategory[]>(
    CATEGORIES_QUERY,
    {},
    { next: { revalidate: CATEGORIES_REVALIDATE_SECONDS } }
  );
  return raw.map((category) => ({
    slug: category.slug.current,
    name: category.name,
    description: category.description,
    image: category.image?.asset ? mapImage(category.image) : undefined,
  }));
}

export async function getAllProducts(): Promise<Product[]> {
  const raw = await sanityClient.fetch<RawProduct[]>(
    PRODUCTS_QUERY,
    {},
    { next: { revalidate: PRODUCTS_REVALIDATE_SECONDS } }
  );
  return raw.map(mapProduct);
}

export async function getProductWithRelated(
  slug: string
): Promise<{ product: Product; related: Product[] } | null> {
  const raw = await sanityClient.fetch<
    (RawProduct & { related: RawProduct[] }) | null
  >(
    PRODUCT_WITH_RELATED_QUERY,
    { slug },
    { next: { revalidate: PRODUCTS_REVALIDATE_SECONDS } }
  );
  if (!raw) return null;

  return {
    product: mapProduct(raw),
    related: raw.related.map(mapProduct),
  };
}

export type HeroBanner = {
  id: string;
  url: string;
  alt: string;
  link: string;
  // Actual source image aspect ratio (width / height), so the mobile crop
  // box can match it exactly and never cut off any of the image, no matter
  // what shape banner an admin uploads.
  aspectRatio: number;
  // Normalized 0-1 focal point from the Sanity hotspot, used to derive
  // object-position so the admin-set focal point stays in frame across
  // every crop, mobile's narrower aspect included.
  hotspot: { x: number; y: number } | null;
};

export async function getHeroBanners(): Promise<HeroBanner[]> {
  const raw = await sanityClient.fetch<
    {
      _id: string;
      alt: string;
      link: string | null;
      image: RawImage;
      dimensions: { width: number; height: number } | null;
    }[]
  >(HERO_BANNERS_QUERY, {}, { next: { revalidate: HERO_BANNERS_REVALIDATE_SECONDS } });

  return raw
    .filter(
      (banner): banner is typeof banner & { image: NonNullable<RawImage> } =>
        Boolean(banner.image?.asset)
    )
    .map((banner) => ({
      id: banner._id,
      url: urlFor(banner.image).width(1920).fit("max").url(),
      alt: banner.alt,
      aspectRatio:
        banner.dimensions && banner.dimensions.height > 0
          ? banner.dimensions.width / banner.dimensions.height
          : 16 / 9,
      link: banner.link || "/shop",
      hotspot: banner.image.hotspot
        ? { x: banner.image.hotspot.x, y: banner.image.hotspot.y }
        : null,
    }));
}

export type RetailerLogo = {
  id: string;
  name: string;
  url: string;
  width: number;
  height: number;
};

export async function getRetailerLogos(): Promise<RetailerLogo[]> {
  const raw = await sanityClient.fetch<
    {
      _id: string;
      name: string;
      url: string | null;
      dimensions: { width: number; height: number } | null;
    }[]
  >(RETAILER_LOGOS_QUERY, {}, { next: { revalidate: RETAILER_LOGOS_REVALIDATE_SECONDS } });

  return raw
    .filter((logo): logo is typeof logo & { url: string } => Boolean(logo.url))
    .map((logo) => ({
      id: logo._id,
      name: logo.name,
      url: logo.url,
      width: logo.dimensions?.width ?? 120,
      height: logo.dimensions?.height ?? 32,
    }));
}

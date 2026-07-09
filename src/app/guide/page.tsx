import type { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Sanity Studio Guide",
  robots: "noindex, nofollow",
};

// Internal onboarding page — only reachable on the Cloudflare test/preview
// link, never on the production domain. Gated at request time by hostname
// rather than a nav link, so it simply doesn't exist once the real domain
// is live.
const ALLOWED_HOSTS = ["north-collective.ahamedwebstudio.workers.dev"];

function isAllowedHost(host: string) {
  return ALLOWED_HOSTS.includes(host) || host.startsWith("localhost");
}

type Section = {
  id: string;
  title: string;
  body: React.ReactNode;
};

const SECTIONS: Section[] = [
  {
    id: "logging-in",
    title: "1. Logging In",
    body: (
      <ol className="list-decimal space-y-2 pl-5">
        <li>
          Go to{" "}
          <a
            href="https://north-collective.sanity.studio"
            target="_blank"
            rel="noopener noreferrer"
            className="text-bronze underline underline-offset-4"
          >
            north-collective.sanity.studio
          </a>
        </li>
        <li>
          Log in with the account email:{" "}
          <strong className="text-ink">hdstudiolk@gmail.com</strong>
        </li>
        <li>You&apos;ll land on the main dashboard with a sidebar on the left.</li>
      </ol>
    ),
  },
  {
    id: "sidebar",
    title: "2. The Sidebar — What's What",
    body: (
      <div className="flex flex-col gap-4">
        <p>
          <strong className="text-ink">At the top — your daily tools:</strong>{" "}
          Orders, Custom Orders, and Products — built for quick scanning and
          editing.
        </p>
        <p>
          <strong className="text-ink">Below that — the raw content list:</strong>{" "}
          Category, Product, Hero Banner, Retailer Logo, Order, Custom Order
          Request — one document at a time. Use this mainly when adding
          something brand new.
        </p>
      </div>
    ),
  },
  {
    id: "orders",
    title: "3. Managing Orders",
    body: (
      <div className="flex flex-col gap-3">
        <p>
          Click <strong className="text-ink">Orders</strong>. You&apos;ll see
          every order: number, customer, items, total, status, date.
        </p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            <strong className="text-ink">Change status</strong> directly from
            the dropdown in the table — no need to open the full order. New
            → Confirmed → Fulfilled (or Cancelled).
          </li>
          <li>
            Click <strong className="text-ink">Edit</strong> to see full
            details (address, notes, exact items).
          </li>
          <li>Use the search box to find an order by number, name, or phone.</li>
          <li>New orders appear live, automatically — no refresh needed.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "custom-orders",
    title: "4. Managing Custom Order Requests",
    body: (
      <p>
        Click <strong className="text-ink">Custom Orders</strong> — works
        exactly like Orders. Status options: New → Contacted → Fulfilled (or
        Declined). Click Edit to see their full message and notes.
      </p>
    ),
  },
  {
    id: "products",
    title: "5. Managing Products",
    body: (
      <div className="flex flex-col gap-3">
        <p>
          Click <strong className="text-ink">Products</strong> for the full
          catalogue table.
        </p>
        <p>
          <strong className="text-ink">To edit:</strong> click Edit on a row,
          change any field, then click Publish.
        </p>
        <p>
          <strong className="text-ink">To add a new product</strong>, open{" "}
          <strong className="text-ink">Product</strong> in the content list
          and create new, filling in:
        </p>
        <ul className="list-disc space-y-1.5 pl-5">
          <li><strong className="text-ink">Name</strong> — the product&apos;s full name.</li>
          <li><strong className="text-ink">Slug</strong> — click &quot;Generate&quot; from the name, you rarely type this yourself.</li>
          <li><strong className="text-ink">Brand</strong></li>
          <li><strong className="text-ink">Price (LKR)</strong> — plain number, e.g. <code>4200</code>, no currency symbol.</li>
          <li><strong className="text-ink">Availability</strong> — Available Now or Pre-Order.</li>
          <li><strong className="text-ink">Category</strong></li>
          <li><strong className="text-ink">Image</strong> — set a hotspot afterward (see Section 9).</li>
          <li><strong className="text-ink">Featured</strong> — shows in homepage &quot;Best Sellers&quot;.</li>
          <li><strong className="text-ink">New</strong> — shows in homepage &quot;What&apos;s New&quot;.</li>
          <li><strong className="text-ink">Description</strong> — optional.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "categories",
    title: "6. Managing Categories",
    body: (
      <div className="flex flex-col gap-3">
        <p>
          Categories control both the navigation menu and the &quot;Shop by
          Category&quot; homepage section. Open{" "}
          <strong className="text-ink">Category</strong> in the content list.
        </p>
        <p>
          Fields: Name, Slug (auto-generated), Description, Image, and{" "}
          <strong className="text-ink">Order</strong> — a plain number.{" "}
          <strong className="text-ink">Lower numbers show first.</strong> To
          reorder the whole menu, just change these numbers.
        </p>
      </div>
    ),
  },
  {
    id: "hero-banners",
    title: "7. Homepage Hero Banners",
    body: (
      <div className="flex flex-col gap-3">
        <p>
          Open <strong className="text-ink">Hero Banner</strong> — the large
          rotating carousel at the top of the homepage.
        </p>
        <p>
          Fields: Image, Alt Text, Order (rotation position), and{" "}
          <strong className="text-ink">Link</strong> — where the &quot;Shop
          Now&quot; button goes for that banner (e.g. <code>/shop</code> or a
          specific category like <code>/shop/beauty-personal-care</code>).
        </p>
        <p>Add, remove, and reorder freely — new banners appear in rotation automatically.</p>
      </div>
    ),
  },
  {
    id: "retailer-logos",
    title: "8. Retailer Logos",
    body: (
      <p>
        Open <strong className="text-ink">Retailer Logo</strong> to manage
        the &quot;Where We Shop For You&quot; strip. Fields: Retailer Name,
        Logo (SVG looks sharpest), and Order (left-to-right position).
      </p>
    ),
  },
  {
    id: "hotspot",
    title: "9. Uploading Images & the Hotspot",
    body: (
      <p>
        After uploading any image, click it again to open the crop/hotspot
        editor and drag the marker onto the most important part of the
        photo. This matters most for hero banners — phones crop images
        differently than desktop screens, and the hotspot keeps the right
        part of the image in frame no matter the shape.
      </p>
    ),
  },
  {
    id: "publishing",
    title: "10. Publishing Changes — Please Read",
    body: (
      <p>
        Sanity saves edits as a <strong className="text-ink">draft</strong>{" "}
        while you work. Nothing changes on the live site until you click{" "}
        <strong className="text-ink">Publish</strong> (top-right of the
        document). Closing without publishing keeps your edit as a draft —
        the site still shows the old version until you come back and publish.
      </p>
    ),
  },
  {
    id: "unpublishing",
    title: "11. Temporarily Removing a Product (Unpublish)",
    body: (
      <div className="flex flex-col gap-3">
        <p>
          Sold out or not ready to sell? Don&apos;t delete it —{" "}
          <strong className="text-ink">unpublish</strong> instead: open the
          product, click the small arrow next to Publish, choose Unpublish.
          It disappears from the site but keeps all its data. Click Publish
          again anytime to bring it back.
        </p>
        <p>
          <strong className="text-ink">Unpublish</strong> = hide, keep
          everything, reversible. <strong className="text-ink">Delete</strong>{" "}
          = gone permanently — only for things you&apos;ll never need again.
        </p>
        <p>Works the same way on categories, hero banners, and retailer logos too.</p>
      </div>
    ),
  },
  {
    id: "caching",
    title: "12. How Long Until Changes Show Up",
    body: (
      <ul className="list-disc space-y-1.5 pl-5">
        <li><strong className="text-ink">Products:</strong> live within about 1 minute.</li>
        <li><strong className="text-ink">Hero banners:</strong> live within about 5 minutes.</li>
        <li><strong className="text-ink">Categories &amp; retailer logos:</strong> live within about 1 hour.</li>
      </ul>
    ),
  },
];

const QUICK_REFERENCE = [
  { task: "Check on new orders", location: "Orders" },
  { task: "Check on custom order requests", location: "Custom Orders" },
  { task: "Change Available Now vs Pre-Order", location: "Products → edit → Availability" },
  { task: "Add a new product", location: "Product → Create new" },
  { task: "Show a product on the homepage", location: "Products → edit → Featured or New" },
  { task: "Temporarily hide a sold-out product", location: "Products → edit → Unpublish" },
  { task: "Bring a hidden product back", location: "Open it → Publish" },
  { task: "Reorder the shop menu", location: "Category → change the Order number" },
  { task: "Change the homepage rotating banners", location: "Hero Banner" },
  { task: "Change the “Where We Shop For You” logos", location: "Retailer Logo" },
];

export default async function GuidePage() {
  const headersList = await headers();
  const host = headersList.get("host") ?? "";

  if (!isAllowedHost(host)) {
    notFound();
  }

  return (
    <div className="bg-surface">
      <div className="border-b border-ink/10 bg-ink py-3 text-center">
        <p className="text-xs font-bold tracking-[0.2em] text-ivory uppercase">
          Admin Only — Not Part of the Public Website
        </p>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-xs font-medium tracking-wide text-bronze uppercase">
            Internal
          </span>
          <h1 className="max-w-2xl font-display text-3xl text-ink sm:text-4xl md:text-5xl">
            Guide to Manage the Website
          </h1>
          <p className="max-w-xl text-sm text-stone sm:text-base">
            Everything you need to know to manage your site yourself.
          </p>
        </div>

        {/* Jump-to nav */}
        <nav
          aria-label="Guide sections"
          className="mx-auto mt-12 flex max-w-3xl flex-wrap justify-center gap-2"
        >
          {SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              className="border border-ink/15 px-3 py-1.5 text-xs text-ink/70 transition-colors hover:border-bronze hover:text-ink"
            >
              {section.title.replace(/^\d+\.\s*/, "")}
            </a>
          ))}
        </nav>

        {/* Sections */}
        <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
          {SECTIONS.map((section) => (
            <details
              key={section.id}
              id={section.id}
              className="group border border-ink/15 bg-ivory open:bg-surface"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-lg text-ink">
                {section.title}
                <span className="shrink-0 text-bronze transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-5 pb-5 text-sm leading-relaxed text-stone">
                {section.body}
              </div>
            </details>
          ))}
        </div>

        {/* Quick reference */}
        <div className="mx-auto mt-16 max-w-3xl">
          <h2 className="text-center font-display text-2xl text-ink">
            Quick Reference
          </h2>
          <div className="mt-6 overflow-hidden border border-ink/15">
            <table className="w-full border-collapse text-sm">
              <tbody>
                {QUICK_REFERENCE.map((row, index) => (
                  <tr
                    key={row.task}
                    className={index % 2 === 0 ? "bg-ivory" : "bg-surface"}
                  >
                    <td className="border-b border-ink/10 px-4 py-3 text-ink">
                      {row.task}
                    </td>
                    <td className="border-b border-ink/10 px-4 py-3 text-right text-bronze">
                      {row.location}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <p className="mx-auto mt-16 max-w-3xl text-center text-xs text-stone">
          If anything looks wrong, a change isn&apos;t showing after an hour,
          or you want something new added that isn&apos;t covered here,
          reach out to your developer rather than guessing.
        </p>
      </div>
    </div>
  );
}

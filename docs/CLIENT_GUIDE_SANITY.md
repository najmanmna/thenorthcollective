# Managing The North Collective Website — A Guide to Sanity Studio

This is your admin dashboard for the website. From here you can add and edit products, categories, homepage banners, and see every order and custom order request that comes in — all without needing a developer.

---

## 1. Logging In

1. Go to **https://north-collective.sanity.studio**
2. Log in with the account email: **thenorthcollectiveweb@gmail.com** (or whichever email your Sanity account uses).
3. You'll land on the main dashboard with a sidebar on the left.

---

## 2. The Sidebar — What's What

The left sidebar has two kinds of sections:

**At the top — your daily tools:**
- **Orders** — every order placed through the website checkout.
- **Custom Orders** — every custom order request submitted.
- **Products** — every product in your catalogue, in one table.

**Below that — the raw content list**, organized by type:
- **Category** — the sections in "Shop by Category" and the navigation menu.
- **Product** — same products, shown one at a time in the standard editor (use the **Products** tool above for a faster overview).
- **Hero Banner** — the rotating images at the top of the homepage.
- **Retailer Logo** — the logos in the "Where We Shop For You" strip.
- **Order** / **Custom Order Request** — same as the tools above, shown one at a time.

For day-to-day work, use the **Orders**, **Custom Orders**, and **Products** tools at the top — they're built for quick scanning and editing. Use the content list below only when adding something brand new (a new product, category, banner, or logo).

---

## 3. Managing Orders

Click **Orders** in the sidebar.

You'll see a table with every order: order number, customer name and phone, items, total, status, and date.

- **To change an order's status**, use the dropdown right in the table — no need to open the full order. Options are: **New → Confirmed → Fulfilled** (or **Cancelled** if it falls through).
- **To see full order details** (delivery address, notes, exact items), click **Edit** on that row — it opens the full order.
- Use the **search box** to find an order by number, customer name, or phone.
- New orders appear here **automatically and immediately** the moment a customer checks out — no refresh needed, the list updates live.

> **Reminder:** the order confirmation and status here is for your own tracking. The customer's actual confirmation still happens over WhatsApp, same as always.

---

## 4. Managing Custom Order Requests

Click **Custom Orders** in the sidebar. Works exactly like Orders:

- Table shows request number, customer, what they're looking for, and status.
- Status options: **New → Contacted → Fulfilled** (or **Declined**).
- Click **Edit** to see their full message and any additional notes.

---

## 5. Managing Products

Click **Products** in the sidebar for the full catalogue table (photo, name, brand, category, price, availability, and any Featured/New flags).

### To edit an existing product
Click **Edit** on its row. You can change any field, then click **Publish** (see Section 8 — this step is easy to forget).

### To add a new product
1. In the sidebar, scroll to **Product** (the plain content-list item, not the Products tool) and click the **+** button, or open any existing product and use the "Create new" option.
2. Fill in:
   - **Name** — the product's full name.
   - **Slug** — this becomes part of the product's URL. Click "Generate" to auto-create it from the name — you almost never need to type this yourself.
   - **Brand**
   - **Price (LKR)** — plain number, no currency symbol (e.g. `4200`, not `Rs. 4,200`).
   - **Availability** — choose *Available Now* or *Pre-Order*.
   - **Category** — pick which section this product belongs to.
   - **Image** — upload the product photo. You can click on the image afterward to set a **hotspot** (see Section 9).
   - **Featured** — turn this on to show the product in the homepage "Best Sellers" section.
   - **New** — turn this on to show the product in the homepage "What's New" section.
   - **Description** — optional, shows on the product's detail page.
3. Click **Publish**.

---

## 6. Managing Categories

Categories control both the navigation menu and the "Shop by Category" homepage section. Open **Category** in the sidebar content list.

Each category has:
- **Name** — e.g. "Beauty & Personal Care"
- **Slug** — auto-generated from the name, forms the URL
- **Description** — the short line shown under the category name on the shop page
- **Image** — the photo shown on the homepage category tile
- **Order** — a plain number that controls where this category appears in the menu and homepage. **Lower numbers show first.** To reorder categories, just change these numbers (e.g. make "Clothing" a `2` if you want it to show third).

To add a brand-new category (e.g. a future "Electronics" section), click **+ Create new** from the Category list and fill in the same fields, giving it an order number that places it where you want.

---

## 7. Managing the Homepage Hero Banners

Open **Hero Banner** in the sidebar content list. This is the large rotating image carousel at the very top of the homepage.

Each banner has:
- **Image** — the banner photo.
- **Alt Text** — a short description of the image (for accessibility, not shown visually).
- **Order** — which position it plays in the rotation (lower number = shown first).
- **Link** — where the "Shop Now" button goes when this banner is showing (e.g. `/shop` for the full catalogue, or `/shop/beauty-personal-care` to send people straight to one category).

**To add a new banner:** click **+ Create new**, upload an image, add alt text, set an order number, and set the link. It'll automatically appear in the homepage rotation.

**To remove a banner:** open it and delete the document (menu in the top-right of the document, "Delete").

**About the hotspot:** see Section 9 below — this matters more for hero banners than anywhere else, since mobile phones crop these images differently than desktop screens.

---

## 8. Managing Retailer Logos

Open **Retailer Logo** in the sidebar. This controls the "Where We Shop For You" logo strip near the top of the homepage (currently Walmart, Costco, Sephora, IKEA).

Each entry has:
- **Retailer Name** — used as the logo's description text.
- **Logo** — upload the logo image. SVG files look sharpest, but PNG/JPG work fine too.
- **Order** — controls left-to-right order in the strip.

Add, remove, or reorder these the same way as everything else — no code changes needed.

---

## 9. Uploading Images & Using the Hotspot

Whenever you upload an image (products, categories, hero banners, logos), after it uploads you can click on it again to open the **crop/hotspot editor**:

- Drag the circular marker onto the most important part of the image (a face, a product, whatever should always stay visible).
- This matters most for **hero banners** — since a phone screen is a different shape than a desktop screen, the website automatically crops the image differently on each. The hotspot tells it what to keep centered no matter how it's cropped, so the important part of your photo is never accidentally cut off.

---

## 10. Publishing Changes — Please Read

Sanity saves your edits as a **draft** while you're working. Nothing changes on the live website until you click the **Publish** button (top-right of the document you're editing).

- If you close a document without publishing, your edits are saved as a draft — you can come back and finish later, but the website still shows the old version until you publish.
- Always double check you've clicked **Publish** after editing.

## 11. How Long Until Changes Show Up on the Site

The website doesn't hit the database on every single visit — it briefly caches content to stay fast. After you publish a change, expect:

- **Products**: live within about 1 minute.
- **Hero banners**: live within about 5 minutes.
- **Categories & retailer logos**: live within about 1 hour (these change rarely, so they're cached longer).

If you need a change to appear *immediately* for a demo or urgent fix, let your developer know — there's a way to force it, it's just not something you need day-to-day.

---

## 12. Quick Reference

| I want to... | Go to |
|---|---|
| Check on new orders | **Orders** |
| Check on custom order requests | **Custom Orders** |
| Change what's "Available Now" vs "Pre-Order" | **Products** → edit product → Availability |
| Add a new product | **Product** → Create new |
| Show a product on the homepage | **Products** → edit product → turn on Featured or New |
| Reorder the shop menu | **Category** → change the Order number |
| Change the homepage rotating banners | **Hero Banner** |
| Change the "Where We Shop For You" logos | **Retailer Logo** |

---

## Need Help?

If anything looks wrong, a change isn't showing after an hour, or you want a new field/section added that isn't covered here, reach out to your developer rather than guessing — some things (like adding a whole new type of content) still need a code change.

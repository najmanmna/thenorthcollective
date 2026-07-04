# 01_PROJECT.md

## Purpose

Define the product vision, business goals, user outcomes, and strategic constraints for The North Collective so the architecture and later implementation decisions remain aligned with the real product intent.

## Goals

This document establishes:

- the product category and business model,
- the intended customer experience,
- the primary user journeys,
- the scope of the first release,
- the long-term foundation goals for future Ahamed Web Studio projects.

## Product Summary

The North Collective is a premium imported goods retailer based in Sri Lanka. The business sources authentic products from Canada and makes them available to customers in Sri Lanka.

Today, the sales process is driven primarily through Instagram and WhatsApp. The website should not replace WhatsApp. Instead, it should create a premium browsing experience and a structured order-request workflow that supports the existing business process.

The product is best understood as a premium catalogue with an order request system rather than a traditional e-commerce storefront.

## Business Model

The business sells two product types:

1. Available Now
   - products already available locally.

2. Pre-order
   - products imported from Canada after an order is placed.

Customers should be able to mix both product types in a single order request. The experience should not force separate flows based on availability.

## Product Vision

The website should feel:

- premium,
- minimal,
- modern,
- elegant,
- fast,
- mobile-first,
- trustworthy,
- product-led,
- curated rather than commercial.

The experience should communicate authenticity, quality, and confidence without feeling like a generic template-based e-commerce site.

## Core User Goals

Customers should be able to:

- browse products,
- browse categories,
- search products,
- view product details,
- add products to an order list,
- update quantities,
- submit customer information,
- receive an order number,
- continue to WhatsApp for confirmation.

## Business Goals

The business should be able to:

- manage products,
- manage categories,
- manage orders,
- update order status,
- export orders,
- receive email notifications.

## Primary User Journey

1. Visit homepage
2. Browse categories and products
3. Open a product detail page
4. Add the product to an order list
5. Review the order list
6. Submit customer information
7. Submit the order request
8. Receive an order number
9. Continue to WhatsApp for confirmation

## Scope of the Initial Release

The initial release should focus on:

- premium product discovery,
- structured order request submission,
- order persistence and confirmation,
- simple admin visibility of orders,
- a foundation that can later support CMS and email workflows.

## Out of Scope for the Initial Release

The first version should intentionally exclude:

- online payments,
- shipping calculations,
- coupons,
- inventory management,
- user accounts,
- full checkout payment flows,
- complex commerce automation.

These can be introduced in future phases once the core foundation is stable.

## Architectural Implication

This is not a conventional e-commerce product. The architecture should therefore support:

- a catalogue-first experience,
- a lightweight, flexible order-request workflow,
- strong presentation and storytelling for products,
- eventual CMS-driven content,
- future expansion into richer commerce features without reworking the core system.

## Success Criteria

The project should be considered successful if:

- customers can browse and order with clarity and confidence,
- the experience feels premium and trustworthy,
- the order flow is simple and reliable,
- the business can manage orders without friction,
- the system is structured in a way that can evolve into a reusable starter template.

## Risks and Assumptions

### Key Risks

- The business process is still highly dependent on WhatsApp, so the website must not create a confusing handoff experience.
- The product is premium and visual-first, so poor performance or weak presentation would undermine trust.
- The business model includes both available-now and pre-order products, so the core data model must be flexible from the beginning.
- Because this will become a reusable foundation, short-term shortcuts could create long-term technical debt.

### Assumptions

- The initial experience will be primarily informational and conversion-oriented, not fully automated.
- Order requests will be stored and managed by the system, even though manual confirmation remains part of the business workflow.
- The website will eventually integrate with CMS and email systems, but those systems are not part of the initial frontend-only phase.

## Decisions

The following decisions are proposed for this document:

- The product should be treated as a premium catalogue plus order-request workflow, not a conventional e-commerce platform.
- WhatsApp remains the final communication channel and should be treated as a handoff mechanism, not the primary system of record.
- The core order experience should support both available-now and pre-order products in a single flow.
- The initial release should focus on product discovery, structured ordering, and business workflow support rather than payments or logistics.
- The architecture should be designed as a reusable foundation for future Ahamed Web Studio projects.

## Best Practices

- Keep the product scope explicit and avoid expanding into full commerce prematurely.
- Separate the browsing experience from the order workflow in the architecture so each can evolve independently.
- Design the data model to support future product, content, and order complexity without rework.
- Favor clarity over cleverness; this project should be easy to understand and extend.
- Treat the experience as both a client-facing storefront and a reusable template foundation.

## Future Considerations

- Introduce CMS-driven product and content management.
- Add richer order workflow automation and admin tools.
- Introduce email notifications and order status management.
- Expand into payments, shipping logic, and account-based features when the business is ready.
- Generalize the commerce engine into a reusable starter architecture for future brand projects.

## Open Questions

- Should the first launch focus on a single collection or a broader catalogue structure?
- Is the initial order flow intended to capture interest only, or should it support a more formal request-to-confirmation process from the start?
- Should the reusable foundation prioritize broad adaptability across many business types, or optimize first for imported-goods and boutique retail use cases?
- What level of admin workflow is expected in the first release: basic order visibility only, or a more complete operational dashboard?

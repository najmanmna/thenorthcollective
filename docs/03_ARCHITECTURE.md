# 03_ARCHITECTURE.md

## Purpose

Define the high-level technical architecture for The North Collective so the system can be built as a scalable, maintainable, and reusable foundation rather than a one-off website.

## Goals

This document establishes:

- the overall system structure,
- the frontend architecture approach,
- the separation of concerns,
- the direction for future CMS and order-system integration,
- the reusable patterns that should guide future Ahamed Web Studio projects.

## Architectural Approach

The project should be treated as a modern, content-forward storefront with a lightweight commerce workflow. The architecture should prioritize:

- clear separation of UI, domain logic, and data flow,
- server-rendered and statically optimized experiences where appropriate,
- strong typing and predictable module boundaries,
- a flexible foundation that can later absorb CMS and order automation features.

## Recommended Architecture Style

A feature-based architecture is recommended over a purely page-centric structure.

This approach is better suited to a reusable foundation because it allows the system to evolve around business capabilities such as:

- catalog,
- products,
- categories,
- order requests,
- customer information,
- notifications.

This keeps the codebase easier to scale as the product grows.

## Core Architectural Principles

### 1. Server Components by Default

Use Server Components for most pages and data-driven content. This aligns with modern Next.js best practices and supports better performance and simpler rendering behavior for content-heavy pages.

### 2. Client Components Only When Required

Client Components should be reserved for interaction-heavy UI such as:

- product selection,
- form state,
- order list management,
- lightweight UI interactions.

This keeps the app performant and easier to reason about.

### 3. Strong Typing Everywhere

TypeScript should be used consistently across the product so that business rules, content contracts, and shared interfaces remain clear and maintainable.

### 4. Clear Separation of Concerns

The architecture should separate:

- presentation,
- domain logic,
- data access,
- content models,
- form handling,
- notification flow.

### 5. Reusable Commerce Foundation

The system should be designed so that branding and content can change while the core flow remains reusable across future client projects.

## Proposed System Layers

### Presentation Layer

Responsible for:

- pages,
- layouts,
- reusable UI components,
- design system primitives,
- page-level composition.

### Application Layer

Responsible for:

- use cases,
- orchestration of business actions,
- form handling,
- state transitions,
- interaction flows.

### Domain Layer

Responsible for:

- product rules,
- availability rules,
- order request rules,
- validation logic,
- shared business concepts.

### Infrastructure Layer

Responsible for:

- data persistence,
- email integration,
- CMS contracts,
- external service adapters,
- environment configuration.

## Frontend Architecture

The frontend should be organized around a small set of core capabilities:

- catalog browsing,
- product presentation,
- order list management,
- order request submission,
- shared brand experience.

This keeps the app modular and makes it easier to adapt to future clients.

## Recommended Data Flow

The expected flow should be:

1. User browses the catalogue.
2. User adds products to an order list.
3. Order list updates locally or through a shared application state layer.
4. User submits customer information and order request.
5. The order request is validated and persisted.
6. Notification and confirmation steps occur.
7. The user is redirected to the WhatsApp handoff experience.

This flow should remain simple and explicit, even as the application grows.

## Content and Presentation Strategy

Because the project is premium and brand-driven, the architecture should support:

- rich media content,
- flexible layouts,
- strong visual hierarchy,
- localized or brand-specific presentation rules,
- future CMS-driven content without coupling pages directly to content source logic.

A content abstraction layer is recommended so the frontend does not become tightly coupled to a single content source.

## Order Workflow Architecture

The order workflow should be modeled as a core domain flow with clear stages:

- browse,
- assemble order,
- submit order request,
- store request,
- notify business,
- confirm handoff.

This separation is important because the system should be able to evolve from a manual workflow into a more automated one later without rewriting the entire experience.

## CMS Integration Direction

CMS integration should be designed as an abstraction rather than a direct dependency in the UI layer.

The recommended approach is to keep the frontend consuming a stable content contract while the CMS layer adapts to the source system later.

That ensures the storefront remains resilient if the content backend changes or expands.

## Deployment and Hosting Direction

The architecture should be compatible with a modern hosting model such as Vercel, with a clear path to deployment on Vercel or a similar platform.

For this project, the architecture should not be over-optimized for a specific hosting environment too early. Instead, it should remain portable and simple while using the framework’s native strengths.

## Trade-offs Considered

### Option A: Page-driven architecture

Pros:

- simple to start,
- easy for a small project.

Cons:

- becomes harder to scale,
- duplicates structure and logic,
- less reusable for future client projects.

Recommendation: Not preferred for the long-term foundation.

### Option B: Feature-based architecture

Pros:

- better organization,
- supports reuse,
- easier to evolve,
- aligns with scalable product design.

Cons:

- requires slightly more upfront discipline.

Recommendation: Preferred.

## Decisions

The following decisions are proposed for this document:

- The system should use a feature-based architecture rather than a purely page-driven one.
- Server Components should be the default rendering model.
- Client Components should be used only where required for interaction.
- The architecture should separate presentation, domain logic, and infrastructure concerns.
- The order workflow should be modeled as a reusable domain flow that can evolve over time.
- CMS integration should be abstracted behind a stable content contract.

## Best Practices

- Keep the architecture simple enough for a solo developer to maintain.
- Avoid introducing complexity that does not support the product goals.
- Design boundaries so future integrations do not require major rewrites.
- Prefer explicit, typed interfaces over implicit shared state.
- Make the foundation reusable rather than optimized only for one client use case.

## Future Considerations

- Introduce a more formal domain layer as the order workflow becomes richer.
- Add a stronger content abstraction for CMS-driven pages and product data.
- Expand the architecture to support multiple storefront variants with minimal rework.
- Introduce more advanced admin and automation capabilities as the product matures.

## Open Questions

- Should the initial architecture assume a future CMS integration layer from day one, or should that be introduced later as an isolated module?
- Is there a preferred admin experience pattern for future phases, such as a lightweight dashboard or a more full-featured management interface?
- Should the reusable foundation optimize first for premium retail/catalogue-style brands, or for a broader range of small business storefronts?

# 05_FOLDER_STRUCTURE.md

## Purpose

Define a clean and scalable folder structure that supports a solo developer now and future studio projects later.

## Goals

This document establishes:

- how the codebase should be organized,
- where shared concerns should live,
- how features should be isolated,
- how the structure should remain reusable and readable.

## Recommended Structure

A feature-first structure is recommended.

```text
src/
  app/
    (marketing)/
    (shop)/
    api/
  components/
    ui/
    layout/
    sections/
  features/
    catalog/
    orders/
    product/
    contact/
  lib/
    utils/
    constants/
    config/
  services/
    email/
    cms/
    orders/
  types/
  content/
  styles/
  hooks/
  tests/
```

## Organization Principles

### 1. Feature-based grouping

Domain-specific features such as catalog, products, and orders should be grouped together rather than spread across generic folders.

### 2. Shared primitives in a central layer

Generic UI, utilities, and design system tokens should be stored in a shared foundation layer.

### 3. Keep app routing thin

Routing files should compose features rather than contain large amounts of business logic.

### 4. Separate infrastructure concerns

CMS, email, and order-related integrations should not be mixed into presentation components.

## Folder Responsibilities

- app/: route-level structure and page composition.
- components/: reusable UI building blocks.
- features/: domain-specific feature modules.
- lib/: shared utilities and configuration.
- services/: external-system integrations.
- types/: shared domain and data contracts.
- content/: content schema or content-source adapters.
- hooks/: reusable client-side logic.
- tests/: product and flow validation.

## Naming Conventions

- Use lowercase and descriptive folder names.
- Keep directories focused on a single responsibility.
- Prefer domain names over generic names such as common or shared where possible.

## Decisions

- Use a feature-based folder structure rather than a purely page-based one.
- Keep shared UI primitives centralized.
- Place integration logic in dedicated service modules.
- Keep routing thin and composition-oriented.

## Best Practices

- Avoid deep nesting when a flatter structure is clearer.
- Keep each module focused on one business capability.
- Reuse shared abstractions rather than duplicating logic.
- Make folder boundaries intuitive for future contributors.

## Future Considerations

- Add domain-specific subfolders as the product grows.
- Introduce a stronger admin and content-management structure later.
- Refine the folder layout only when the project demands it.

## Open Questions

- Should the structure be optimized for a single product first, or for a broader studio template from the beginning?
- Is a separate admin area needed in the initial folder layout, or can it be added later?
- Should the project use a monorepo-like structure for future client templates, or keep everything in a single app for now?

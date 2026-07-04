# 06_DESIGN_SYSTEM.md

## Purpose

Define the visual and interaction language for the product so the experience feels premium, coherent, and reusable.

## Goals

This document establishes:

- the visual identity direction,
- the design principles,
- the foundational design tokens,
- the interaction and motion standards,
- the expectations for brand consistency.

## Design Principles

The product should feel:

- premium,
- minimal,
- modern,
- elegant,
- calm,
- trustworthy,
- product-led.

The design should avoid the feel of a generic e-commerce template. It should feel curated and refined.

## Visual Direction

### Brand Reference

The visual system is derived from The North Collective's logo mark: a vintage heritage badge (mountains, pine treeline, lake, maple leaf, compass star) rendered in cream, ink black, and antique gold/bronze. The badge's carved, rustic lettering is treated as a logo-only asset. It is not the site's typographic system. The surrounding site translates the badge's palette and material feel into a calmer, more editorial language, consistent with "minimal, modern, elegant" rather than a literal vintage/rustic theme.

### Typography

- Display/headings: **Fraunces** (variable serif with an optical-size axis, crisp at small sizes and expressive at large display sizes). Used for headlines, product names, and section titles. Loaded via `next/font/google`.
- Body/UI: **Inter** for body copy, forms, navigation, and order-flow UI. Chosen for calm legibility so the interface stays usable under real content (order list, customer info form). Loaded via `next/font/google`.
- Prioritize legibility and restraint over novelty.
- Establish a clear typographic hierarchy: serif for editorial/product headlines, sans for everything functional.

### Color

| Token | Hex | Use |
|---|---|---|
| `ivory` | `#F6E5D2` | Primary background, warm section fills, sampled directly from the logo background |
| `surface` | `#FFFFFF` | Cards, product imagery backdrops, contrast surfaces |
| `ink` | `#1A1815` | Primary text, near-black and softer than pure black |
| `bronze` | `#8C6D3F` | Accent, used for CTAs, dividers, availability tags, and hover states |
| `stone` | `#8C8479` | Secondary text, borders, muted UI |

- Bronze is the only accent color; avoid introducing competing accent hues.
- Favor neutral backgrounds (ivory/surface) with thoughtful, sparing accent usage (bronze).
- Ensure the palette supports premium presentation without feeling cold or overly corporate.

### Shape

- Corners are sharp (0 border-radius) across buttons, cards, inputs, and badges. Softly rounded corners read as generic SaaS/template UI, not premium retail. A single `--radius: 0rem` token controls this site-wide.

### Spacing

- Use generous spacing to create a calm, premium rhythm.
- Avoid crowded layouts, especially on mobile.
- Give product imagery and content ample room to breathe.

### Imagery

- Product imagery should be central to the experience.
- Imagery should feel polished, authentic, and storytelling-driven.
- Visual quality should be treated as a trust signal.
- Source product photography is typically shot on a white background. Apply `mix-blend-multiply` to product images so the white backdrop dissolves into the card's surface color instead of showing a competing white rectangle. This lets inconsistent supplier photography sit together cleanly.

### Framing

- **Revised after first client feedback round (too ornate/"old school").** Image, category, and product tiles use a single thin border (`border-ink/15`, darkening to `border-ink/40` on hover) — no inset double-border, no corner brackets. The earlier "heritage double-border + bronze corner bracket" treatment read as vintage/heritage-badge styling rather than clean and minimal, so it was dropped in favor of restraint. Keep this single-border pattern as the standard for all tiles going forward.
- Section eyebrows are a single uppercase, medium-tracked label (`text-xs font-medium tracking-wide text-bronze uppercase`) — no flanking divider lines. The earlier line-flanked pattern, repeated on every section, was part of what made the page feel busy rather than calm.

### Motion

- Motion should feel deliberate and premium rather than snappy. Favor longer durations (roughly 250ms for small UI, 600-850ms for hero/section entrances and image cross-fades) with an expressive ease-out curve (`cubic-bezier(0.16, 1, 0.3, 1)`). No bounce or spring easing.
- Use transitions to support clarity and elegance rather than decoration.
- Always respect `prefers-reduced-motion` for any looping or auto-playing animation (e.g. the hero's shuffling product tiles).

## Responsive Behavior

The experience should be designed mobile-first, with a strong emphasis on touch-friendly interaction and clear content hierarchy.

## Accessibility Expectations

The design system should support:

- clear contrast,
- readable text,
- keyboard accessibility,
- touch-friendly targets,
- semantic structure.

## Decisions

- Use a premium, minimal visual language rather than a generic commerce aesthetic.
- Derive the color palette and material feel from the brand logo (cream, ink, antique bronze), translated into a calmer editorial system rather than a literal vintage badge theme.
- Use Fraunces for display/headings and Inter for body/UI typography.
- Build the design system around clear spacing, typography, and imagery hierarchy.
- Favor deliberate, expressive-ease motion (250ms small UI, 600-850ms entrances/cross-fades, `cubic-bezier(0.16, 1, 0.3, 1)`) over snappy or flashy animation.
- Use a single thin border (darkening on hover) as the standard treatment for image, category, and product tiles — not the earlier double-border/corner-bracket frame; use `mix-blend-multiply` on product photography to absorb white backgrounds into the card surface.
- Homepage sections should stay product-first: one short headline (not paragraph copy) in the hero, and process/education content (e.g. "How It Works") lives on the page where it's contextually needed (order list/checkout) rather than on the homepage.
- Primary buttons (`Button` default variant) are ink-background with ivory text, uppercase tracked, and reveal a bronze border on hover, not the generic bronze-fill button.
- Make the system adaptable so future brand projects can reuse the foundation with new visual identity by swapping tokens, not structure.

## Best Practices

- Keep the experience visually simple and emotionally high-end.
- Treat design consistency as a trust-building asset.
- Use design tokens where possible to keep the system maintainable.
- Avoid visual clutter in the order workflow.

## Future Considerations

- Introduce a more formal token system as the foundation grows.
- Expand the design system into richer presentation patterns for future client templates.
- Adapt the same visual language to new brand identities without changing the underlying structure.

## Open Questions

- Should the visual system be designed as a strict brand system for this project only, or as a studio-wide foundation with configurable themes?
- How much visual variation should be allowed between future client projects while preserving the core foundation?

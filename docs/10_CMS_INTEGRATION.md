# 10_CMS_INTEGRATION.md

## Purpose

Define how the product should eventually integrate with a CMS so content can be managed independently of the frontend experience.

## Goals

This document establishes:

- the expected content model direction,
- the integration approach,
- the separation between content management and presentation,
- the future scalability path for editorial and product content.

## Recommended Integration Approach

The frontend should be designed to consume content through a stable abstraction rather than be tightly coupled to a single CMS implementation.

This allows the system to evolve from a simple source of truth into a more structured editorial system without rewriting the experience layer.

## Expected Content Types

The CMS should eventually support content for:

- homepage,
- categories,
- products,
- product availability states,
- brand or editorial content,
- site settings and metadata.

## Integration Principles

- Keep content fetching and transformation isolated from UI components.
- Define stable content contracts that the frontend can rely on.
- Support preview and authoring workflows where practical.
- Keep CMS integration modular so it can be replaced or extended later.

## Decisions

- Treat CMS integration as a future-facing architectural concern rather than a one-off feature.
- Design the frontend around content contracts instead of hardcoded content assumptions.
- Keep the initial implementation flexible enough to support a later move to Sanity or another CMS.

## Best Practices

- Model content around the needs of the presentation layer.
- Avoid overloading the CMS with presentation-specific logic.
- Keep content types clear and reusable.
- Prepare the system for future content growth from the beginning.

## Future Considerations

- Introduce richer content authoring workflows later.
- Expand the content model as the product catalog and brand content grow.
- Support multilingual or regional content if needed.

## Open Questions

- Should the initial architecture assume Sanity specifically, or a more generic CMS abstraction first?
- How much editorial content is expected in the first launch versus later phases?
- Should product content be managed fully by CMS from the start, or partially through structured data files initially?

# 11_ORDER_SYSTEM.md

## Purpose

Define the architecture and business rules for the order-request workflow so the experience remains clear, reliable, and extensible.

## Goals

This document establishes:

- how orders are modeled,
- how customers submit requests,
- how mixed availability products are handled,
- how the system can evolve into a richer order workflow later.

## Core Order Model

The core unit of the system should be an order request rather than a payment-based checkout.

Each order request should include:

- customer information,
- selected products,
- quantities,
- availability state for each product,
- an order number,
- status information,
- submission metadata.

## Business Rules

- Customers can order products marked as Available Now and Pre-order in the same order request.
- The interface should not force separate flows.
- Every submitted order request should receive a unique order number.
- The website should save the order request as the business record.
- WhatsApp should be used for final confirmation and communication, not as the primary record-keeping channel.

## Workflow Stages

1. Customer browses and selects products.
2. Customer reviews the order list.
3. Customer submits customer information.
4. System validates the request.
5. System assigns an order number and saves the request.
6. Notification is triggered.
7. Success state is shown and the customer is redirected to WhatsApp.

## Validation Expectations

The system should validate:

- required contact information,
- minimum order requirements,
- malformed data,
- duplicate or inconsistent request states where relevant.

## Decisions

- Treat the order flow as a structured order-request workflow rather than a checkout system.
- Support mixed product availability in one order request.
- Keep the workflow simple and business-friendly instead of over-engineering it.
- Preserve WhatsApp as the communication bridge while the system remains the source of record.

## Best Practices

- Keep the order process explicit and low-friction.
- Make validation messages clear and helpful.
- Preserve order integrity even when the workflow is still manual.
- Keep the order domain model flexible for future automation.

## Future Considerations

- Add richer order status management later.
- Introduce automated confirmations and admin dashboards.
- Expand the order model into a more complete commerce workflow when business needs justify it.

## Open Questions

- Should order status be simple at launch, such as new and confirmed, or more detailed from the start?
- Is there a need for partial order requests or draft saving in the first release?
- How much order-level detail should be visible to the business in the initial admin workflow?

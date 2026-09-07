# Smart Inventory Web - GitHub Copilot Instructions

## Project Overview

This repository contains the React frontend for the Smart Inventory
application.

The project is used to evaluate GitHub Copilot's ability to generate
maintainable frontend code while supporting documentation traceability.

Technology Stack:

- React
- TypeScript
- Vite
- React Testing Library

---

## Development Principles

1. Keep components small and focused.
2. Prefer composition over inheritance.
3. Avoid unnecessary complexity.
4. Optimise for maintainability.
5. Prioritise accessibility.
6. Keep business logic out of presentation components.

---

## Component Standards

Components should:

- Have a single responsibility.
- Use meaningful names.
- Be reusable where practical.
- Avoid excessive nesting.

Prefer:

InventoryTable
InventoryCard
InventoryForm

Avoid:

TableThing
MainWidget
DataComponent

---

## State Management

Prefer:

1. Local component state.
2. Custom hooks.
3. Context only when necessary.

Avoid introducing additional state libraries unless requested.

---

## API Interaction

1. Use typed API contracts.
2. Handle loading states.
3. Handle errors gracefully.
4. Avoid duplicate API calls.
5. Surface meaningful messages to users.

---

## Accessibility

All UI changes should consider:

- Keyboard navigation
- Screen readers
- Colour contrast
- Meaningful labels

Use semantic HTML whenever possible.

---

## Testing Requirements

For UI changes:

1. Test rendering.
2. Test interactions.
3. Test validation.
4. Test error handling.
5. Test accessibility-related behaviour where applicable.

Do not consider work complete without tests.

---

## Documentation Impact Analysis

Before completing any feature identify whether updates may be required for:

- SRD
- SDS
- FMA
- Test Plan
- Test Report

Provide:

### Feature Summary

### Screens Impacted

### Components Impacted

### Tests Added

### Documentation Impact

---

## Requirement Traceability

Requirements use:

REQ-INV-001
REQ-INV-002

Test cases use:

TC-INV-001
TC-INV-002

Reference requirement IDs whenever implementing functionality.

---

## UI Guidelines

Use:

- Consistent spacing
- Clear labels
- Responsive layouts
- Predictable behaviour

Avoid:

- Hidden actions
- Unclear messages
- Unnecessary animations

---

## Security

Never:

- Store secrets in frontend code
- Expose sensitive information
- Trust client-side validation alone

Use synthetic data only.

---

## Copilot Behaviour

When proposing changes:

1. Explain design decisions.
2. Explain assumptions.
3. Identify affected requirements.
4. Suggest additional tests.
5. Highlight documentation impact.

Do not invent requirements.
Mark unknown information as TBD.

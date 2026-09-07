# Smart Inventory API - GitHub Copilot Instructions

## Project Overview

This repository contains the ASP.NET Core Web API for the Smart Inventory
application.

The application is used to evaluate GitHub Copilot's ability to generate and
maintain software documentation alongside implementation changes.

Technology Stack:
- ASP.NET Core
- C#
- xUnit
- REST APIs

---

## Development Principles

1. Prefer readability over cleverness.
2. Follow SOLID principles where appropriate.
3. Keep business logic separate from controllers.
4. Avoid unnecessary abstractions.
5. Use dependency injection.
6. Use async/await for I/O operations.
7. Validate inputs at API boundaries.
8. Return meaningful status codes.

---

## Code Standards

### Controllers

Controllers should:

- Contain minimal logic.
- Delegate processing to services.
- Return typed responses where practical.

### Services

Services should:

- Contain business rules.
- Be independently testable.
- Avoid direct UI concerns.

### Models

Use clear naming.

Example:

InventoryItem
InventoryRequest
InventoryResponse

Avoid generic names such as:

Data
Object
ItemModel

---

## Testing Requirements

For any functional change:

1. Add or update unit tests.
2. Cover success scenarios.
3. Cover validation scenarios.
4. Cover error scenarios.
5. Cover boundary conditions.

Do not consider work complete without test coverage.

---

## Documentation Impact Analysis

Before completing a task always identify whether the following documents
require updates:

- SRD
- SDS
- FMA
- Test Plan
- Test Report

Provide a summary:

### Change Summary
### Requirements Impacted
### Components Changed
### Tests Added
### Documentation Impact

Do not update documentation automatically unless requested.

---

## Requirement Traceability

Requirements use:

REQ-INV-001
REQ-INV-002

Test cases use:

TC-INV-001
TC-INV-002

When implementing functionality always reference relevant requirement IDs.

---

## Security

Never:

- Hardcode credentials
- Store secrets in source code
- Log sensitive information
- Disable validation checks

Use synthetic data only.

---

## Copilot Behaviour

When proposing code:

1. Explain assumptions.
2. Explain trade-offs.
3. Mention risks.
4. Identify required tests.
5. Identify documentation updates.

Do not invent requirements.
Mark unknown information as TBD.

# Repository Instructions

This repository contains:

- ASP.NET Core API
- React Frontend
- Controlled Documentation

Before making changes:

1. Determine impacted requirements.
2. Determine impacted tests.
3. Determine impacted documents.
4. Preserve traceability relationships.
5. Never invent requirements or test evidence.

If working in:

- /src/api -> use API instructions
- /src/web -> use React instructions
- /docs -> use Documentation instructions
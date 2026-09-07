# SDS Proposed Changes

Issue: 001
Status: Draft
Proposed Version: 1.1 Draft
Approved Baseline Version: TBD (no approved SDS present in this repository)
Author: TBD

## Revision History

| Version | Date | Author | Description |
| --- | --- | --- | --- |
| 1.0 Approved | TBD | TBD | Approved baseline (not present in repository; recorded for continuity). |
| 1.1 Draft | TBD | TBD | Proposed design for inventory CRUD API and React CRUD client. |

## Scope

This proposal describes design derived from the existing implementation in
`SmartInventoryAPI` and `smartinventory.client`. No architecture beyond what is
implemented is described; unknown areas are marked TBD.

## Proposed Design Elements

### DES-INV-001 (Proposed) Inventory Service CRUD Operations

`IInventoryService` and `InventoryService` provide `GetItemsAsync`,
`CreateItemAsync`, `UpdateItemAsync` and `DeleteItemAsync` in addition to the
existing `GetItemAsync` and `AdjustStockAsync`.

- Storage remains an in-memory `ConcurrentDictionary<int, InventoryItem>`
  registered as a singleton. State is not persisted across restarts.
- Business rules live in the service: names are trimmed and required, quantities
  must be zero or greater, and names must be unique ignoring case.
- Identifier allocation uses the current maximum key plus one.
- A private lock guards multi-step operations (identifier allocation and
  duplicate-name checks) that cannot be expressed as a single atomic dictionary
  operation.
- Failures are signalled with `ArgumentException` (invalid input),
  `KeyNotFoundException` (missing item) and `InvalidOperationException`
  (conflicting state).

Satisfies: REQ-INV-002, REQ-INV-003, REQ-INV-004, REQ-INV-005.

### DES-INV-002 (Proposed) Inventory REST Endpoints

`InventoryController` remains thin and delegates to `IInventoryService`,
translating service exceptions into status codes.

| Method | Route | Success | Failure |
| --- | --- | --- | --- |
| GET | /api/Inventory | 200 | TBD |
| GET | /api/Inventory/{itemId} | 200 | 404 |
| POST | /api/Inventory | 201 | 400, 409 |
| PUT | /api/Inventory/{itemId} | 200 | 400, 404, 409 |
| DELETE | /api/Inventory/{itemId} | 204 | 404 |
| POST | /api/Inventory/adjust | 200 | 400, 404, 409 |

Request models `CreateInventoryItemRequest` and `UpdateInventoryItemRequest`
carry name and quantity. Existing `InventoryRequest` and `InventoryResponse`
are unchanged.

Satisfies: REQ-INV-001 to REQ-INV-005.

### DES-INV-003 (Proposed) Cross-Origin Access

`Program.cs` registers a named CORS policy whose allowed origins are read from
the `Cors:AllowedOrigins` configuration section, defaulting to
`http://localhost:5173`. The policy is applied only when the environment is
Development. Non-development origin configuration is TBD.

### DES-INV-004 (Proposed) React Client Architecture

`smartinventory.client` is a Vite, React and TypeScript application.

- `src/api/inventoryTypes.ts` declares typed contracts mirroring the API models.
- `src/api/inventoryClient.ts` wraps `fetch`, resolves the base address from
  `VITE_API_BASE_URL`, and raises `InventoryApiError` carrying the HTTP status
  and server supplied message.
- `src/hooks/useInventory.ts` owns item state, loading state and error state so
  presentation components contain no data access logic.
- `src/components` contains `InventoryTable`, `InventoryFormDialog`,
  `AdjustStockDialog` and `ConfirmDeleteDialog`, each with a single
  responsibility and accessible labels.
- `src/pages/InventoryPage.tsx` composes the hook and components and owns
  dialog selection state.
- Material UI supplies layout and controls; no additional state library is used.

Satisfies: REQ-INV-001 to REQ-INV-005.

## Open Points

- Persistent storage design is TBD.
- Authentication, authorisation and audit logging are TBD.
- Deployment topology and hosting of the built client are TBD.
- Pagination and filtering for large inventories are TBD.

## Approval

Not approved. Draft only.

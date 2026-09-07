# Documentation Impact Analysis

Issue: 001
Status: Draft
Version: 0.1 Draft
Author: TBD

## Revision History

| Version | Date | Author | Description |
| --- | --- | --- | --- |
| 0.1 Draft | TBD | TBD | Initial impact analysis for inventory CRUD API and React CRUD UI. |

## Baseline Note

No approved PDP, SRD, SDS, FMA or TP documents are present in `docs/` in this
repository. Therefore no approved content has been overwritten. Where an
approved baseline would normally be referenced, this proposal records the
baseline as TBD and marks all content as proposed.

## Impacted Documents

| Document | Impacted | Proposed Change File |
| --- | --- | --- |
| PDP | No | Not applicable |
| SRD | Yes | SRD-ProposedChanges.md |
| SDS | Yes | SDS-ProposedChanges.md |
| FMA | Yes | FMA-ProposedChanges.md |
| TP | Yes | TP-ProposedChanges.md |

## Reason For Change

The inventory API previously supported only retrieval of a single item and a
relative stock adjustment (REQ-INV-001). A React front end was requested that
provides full create, read, update and delete management of inventory items.
Implementing that UI required new API capabilities, which in turn require new
requirements, design, failure mode and test coverage entries.

## Proposed Revisions

### Requirements Impacted

- REQ-INV-001 unchanged in behaviour; now additionally exercised through the UI.
- REQ-INV-002 proposed (new): list inventory items.
- REQ-INV-003 proposed (new): create inventory item.
- REQ-INV-004 proposed (new): update inventory item.
- REQ-INV-005 proposed (new): delete inventory item.

Note: the requirement IDs above are proposed and are not approved. If the
approved SRD already allocates these IDs to other requirements, the IDs must be
reallocated before approval.

### Design Impacted

- DES-INV-001 proposed: inventory service CRUD operations.
- DES-INV-002 proposed: inventory REST endpoints and status code mapping.
- DES-INV-003 proposed: cross-origin access for the local React client.
- DES-INV-004 proposed: React client architecture (typed API client, state hook,
  presentation components).

### Failure Modes Impacted

- FM-INV-001 proposed: adjustment drives stock below zero.
- FM-INV-002 proposed: duplicate item name.
- FM-INV-003 proposed: operation on a non-existent item.
- FM-INV-004 proposed: invalid item name or quantity.
- FM-INV-005 proposed: loss of inventory state on API restart (in-memory store).
- FM-INV-006 proposed: API unreachable from the client.

### Tests Impacted

- TC-INV-001 to TC-INV-010 unchanged (existing adjust-stock coverage).
- TC-INV-011 to TC-INV-032 proposed (new API service and controller cases).
- TC-INV-033 to TC-INV-048 proposed (new front-end cases).

## Traceability Impact

No existing traceability links are removed by this proposal. New links are
added as follows.

| Requirement | Design | Failure Mode | Test Cases |
| --- | --- | --- | --- |
| REQ-INV-001 | DES-INV-001, DES-INV-002, DES-INV-004 | FM-INV-001, FM-INV-003 | TC-INV-001 to TC-INV-010, TC-INV-042 to TC-INV-044 |
| REQ-INV-002 | DES-INV-001, DES-INV-002, DES-INV-004 | FM-INV-006 | TC-INV-011, TC-INV-023, TC-INV-033, TC-INV-045 to TC-INV-047 |
| REQ-INV-003 | DES-INV-001, DES-INV-002, DES-INV-004 | FM-INV-002, FM-INV-004 | TC-INV-012 to TC-INV-016, TC-INV-024 to TC-INV-026, TC-INV-034, TC-INV-037 to TC-INV-041 |
| REQ-INV-004 | DES-INV-001, DES-INV-002, DES-INV-004 | FM-INV-002, FM-INV-003, FM-INV-004 | TC-INV-017 to TC-INV-020, TC-INV-027 to TC-INV-030, TC-INV-035, TC-INV-038 |
| REQ-INV-005 | DES-INV-001, DES-INV-002, DES-INV-004 | FM-INV-003 | TC-INV-021, TC-INV-022, TC-INV-031, TC-INV-032, TC-INV-036, TC-INV-048 |

## Approval

Not approved. All content remains in Draft pending human review.

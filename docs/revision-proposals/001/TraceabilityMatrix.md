# Traceability Matrix

Issue: 001
Status: Draft
Version: 0.1 Draft
Author: TBD

## Revision History

| Version | Date | Author | Description |
| --- | --- | --- | --- |
| 0.1 Draft | TBD | TBD | Initial traceability matrix for inventory CRUD API and React CRUD UI. |

## Status Note

All linked requirements, design elements, failure modes and test cases other
than REQ-INV-001 and TC-INV-001 to TC-INV-010 are PROPOSED and not approved.
This matrix is Draft and does not record test execution results or evidence.

## Identifier Legend

| Prefix | Meaning | Source Document |
| --- | --- | --- |
| REQ | Requirement | SRD-ProposedChanges.md |
| DES | Design element | SDS-ProposedChanges.md |
| FM | Failure mode | FMA-ProposedChanges.md |
| TC | Test case | TP-ProposedChanges.md |

## Forward Traceability: Requirement to Design to Failure Mode to Test Case

| Requirement | Status | Design | Failure Modes | Test Cases |
| --- | --- | --- | --- | --- |
| REQ-INV-001 Adjust stock | Approved | DES-INV-001, DES-INV-002, DES-INV-004 | FM-INV-001, FM-INV-003 | TC-INV-001 to TC-INV-010, TC-INV-042, TC-INV-043, TC-INV-044 |
| REQ-INV-002 List items | Proposed | DES-INV-001, DES-INV-002, DES-INV-003, DES-INV-004 | FM-INV-005, FM-INV-006 | TC-INV-011, TC-INV-023, TC-INV-033, TC-INV-045, TC-INV-046, TC-INV-047 |
| REQ-INV-003 Create item | Proposed | DES-INV-001, DES-INV-002, DES-INV-004 | FM-INV-002, FM-INV-004, FM-INV-005 | TC-INV-012 to TC-INV-016, TC-INV-024, TC-INV-025, TC-INV-026, TC-INV-034, TC-INV-037, TC-INV-039, TC-INV-040, TC-INV-041 |
| REQ-INV-004 Update item | Proposed | DES-INV-001, DES-INV-002, DES-INV-004 | FM-INV-002, FM-INV-003, FM-INV-004, FM-INV-005 | TC-INV-017 to TC-INV-020, TC-INV-027 to TC-INV-030, TC-INV-035, TC-INV-038 |
| REQ-INV-005 Delete item | Proposed | DES-INV-001, DES-INV-002, DES-INV-004 | FM-INV-003, FM-INV-005 | TC-INV-021, TC-INV-022, TC-INV-031, TC-INV-032, TC-INV-036, TC-INV-048 |

## Design to Requirement

| Design | Description | Requirements | Implementation |
| --- | --- | --- | --- |
| DES-INV-001 | Inventory service CRUD operations | REQ-INV-002, REQ-INV-003, REQ-INV-004, REQ-INV-005 | SmartInventoryAPI/Services/IInventoryService.cs, SmartInventoryAPI/Services/InventoryService.cs |
| DES-INV-002 | Inventory REST endpoints and status mapping | REQ-INV-001 to REQ-INV-005 | SmartInventoryAPI/Controllers/InventoryController.cs |
| DES-INV-003 | Cross-origin access for the local client | REQ-INV-002 | SmartInventoryAPI/Program.cs |
| DES-INV-004 | React client architecture | REQ-INV-001 to REQ-INV-005 | smartinventory.client/src |

## Failure Mode to Requirement and Verification

| Failure Mode | Description | Requirements | Mitigating Design | Verifying Test Cases |
| --- | --- | --- | --- | --- |
| FM-INV-001 | Adjustment drives stock below zero | REQ-INV-001 | DES-INV-001, DES-INV-004 | TC-INV-004, TC-INV-005, TC-INV-009, TC-INV-043 |
| FM-INV-002 | Duplicate item name | REQ-INV-003, REQ-INV-004 | DES-INV-001 | TC-INV-016, TC-INV-019, TC-INV-026, TC-INV-029 |
| FM-INV-003 | Operation on a non-existent item | REQ-INV-001, REQ-INV-004, REQ-INV-005 | DES-INV-001, DES-INV-002 | TC-INV-003, TC-INV-008, TC-INV-010, TC-INV-018, TC-INV-022, TC-INV-028, TC-INV-032 |
| FM-INV-004 | Invalid name or quantity | REQ-INV-003, REQ-INV-004 | DES-INV-001, DES-INV-004 | TC-INV-014, TC-INV-015, TC-INV-020, TC-INV-025, TC-INV-030, TC-INV-039, TC-INV-040 |
| FM-INV-005 | Inventory state lost on API restart | REQ-INV-002 to REQ-INV-005 | None implemented; persistence TBD | TBD |
| FM-INV-006 | API unreachable from the client | REQ-INV-002 | DES-INV-003, DES-INV-004 | TC-INV-037, TC-INV-046 |

## Test Case to Requirement

| Test Cases | Level | Requirement |
| --- | --- | --- |
| TC-INV-001 to TC-INV-005 | API service | REQ-INV-001 |
| TC-INV-006 to TC-INV-010 | API endpoint | REQ-INV-001 |
| TC-INV-011 | API service | REQ-INV-002 |
| TC-INV-012 to TC-INV-016 | API service | REQ-INV-003 |
| TC-INV-017 to TC-INV-020 | API service | REQ-INV-004 |
| TC-INV-021, TC-INV-022 | API service | REQ-INV-005 |
| TC-INV-023 | API endpoint | REQ-INV-002 |
| TC-INV-024 to TC-INV-026 | API endpoint | REQ-INV-003 |
| TC-INV-027 to TC-INV-030 | API endpoint | REQ-INV-004 |
| TC-INV-031, TC-INV-032 | API endpoint | REQ-INV-005 |
| TC-INV-033 | Client API layer | REQ-INV-002 |
| TC-INV-034, TC-INV-037 | Client API layer | REQ-INV-003 |
| TC-INV-035 | Client API layer | REQ-INV-004 |
| TC-INV-036 | Client API layer | REQ-INV-005 |
| TC-INV-038 | Client UI | REQ-INV-004 |
| TC-INV-039 to TC-INV-041 | Client UI | REQ-INV-003 |
| TC-INV-042 to TC-INV-044 | Client UI | REQ-INV-001 |
| TC-INV-045 to TC-INV-047 | Client UI | REQ-INV-002 |
| TC-INV-048 | Client UI | REQ-INV-005 |

## Coverage Gaps

- FM-INV-005 (loss of state on restart) has no mitigating design and no test
  coverage. Persistence is TBD.
- No requirement currently covers persistence, authentication, authorisation,
  pagination or audit logging. These are TBD.
- Integration coverage spanning the client and a running API is TBD.

## Orphan Check

- No design element lacks a linked requirement.
- No test case lacks a linked requirement.
- No traceability link has been removed by this revision.

## Approval

Not approved. Draft only, pending human review.

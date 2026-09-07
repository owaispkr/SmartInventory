# TP Proposed Changes

Issue: 001
Status: Draft
Proposed Version: 1.1 Draft
Approved Baseline Version: TBD (no approved TP present in this repository)
Author: TBD

## Revision History

| Version | Date | Author | Description |
| --- | --- | --- | --- |
| 1.0 Approved | TBD | TBD | Approved baseline (not present in repository; recorded for continuity). |
| 1.1 Draft | TBD | TBD | Proposed test cases TC-INV-011 to TC-INV-048 for inventory CRUD. |

## Note On Results

This document defines planned test cases only. No execution results, pass
status or test evidence are recorded here. Results belong in a Test Report
produced by an authorised execution run.

## Existing Test Cases (Unchanged)

TC-INV-001 to TC-INV-010 remain as defined in the approved baseline and cover
REQ-INV-001 stock adjustment at service and controller level.

## Proposed Test Cases

### API Service Level

| Test Case | Requirement | Description |
| --- | --- | --- |
| TC-INV-011 | REQ-INV-002 | Listing returns all items ordered by ascending identifier. |
| TC-INV-012 | REQ-INV-003 | Creating an item assigns a new identifier and stores it. |
| TC-INV-013 | REQ-INV-003 | Creating trims the name and accepts a boundary quantity of zero. |
| TC-INV-014 | REQ-INV-003 | Creating with an empty or whitespace name is rejected. |
| TC-INV-015 | REQ-INV-003 | Creating with a negative quantity is rejected. |
| TC-INV-016 | REQ-INV-003 | Creating with a name that already exists is rejected. |
| TC-INV-017 | REQ-INV-004 | Updating changes the name and absolute quantity. |
| TC-INV-018 | REQ-INV-004 | Updating a non-existent item is rejected. |
| TC-INV-019 | REQ-INV-004 | Updating to a name used by another item is rejected. |
| TC-INV-020 | REQ-INV-004 | Updating with a negative quantity is rejected. |
| TC-INV-021 | REQ-INV-005 | Deleting an existing item removes it. |
| TC-INV-022 | REQ-INV-005 | Deleting a non-existent item reports not found. |

### API Endpoint Level

| Test Case | Requirement | Description |
| --- | --- | --- |
| TC-INV-023 | REQ-INV-002 | List endpoint returns 200 with all items. |
| TC-INV-024 | REQ-INV-003 | Create endpoint returns 201 with the created item. |
| TC-INV-025 | REQ-INV-003 | Create endpoint returns 400 for invalid input. |
| TC-INV-026 | REQ-INV-003 | Create endpoint returns 409 for a duplicate name. |
| TC-INV-027 | REQ-INV-004 | Update endpoint returns 200 on success. |
| TC-INV-028 | REQ-INV-004 | Update endpoint returns 404 for an unknown item. |
| TC-INV-029 | REQ-INV-004 | Update endpoint returns 409 for a duplicate name. |
| TC-INV-030 | REQ-INV-004 | Update endpoint returns 400 for a negative quantity. |
| TC-INV-031 | REQ-INV-005 | Delete endpoint returns 204 on success. |
| TC-INV-032 | REQ-INV-005 | Delete endpoint returns 404 for an unknown item. |

### Client API Layer

| Test Case | Requirement | Description |
| --- | --- | --- |
| TC-INV-033 | REQ-INV-002 | Items are requested from the inventory endpoint. |
| TC-INV-034 | REQ-INV-003 | Create sends the request body to the inventory endpoint. |
| TC-INV-035 | REQ-INV-004 | Update issues a PUT to the item address. |
| TC-INV-036 | REQ-INV-005 | Delete tolerates an empty 204 response. |
| TC-INV-037 | REQ-INV-003 | Failed responses raise a typed error carrying the server message. |

### Client User Interface

| Test Case | Requirement | Description |
| --- | --- | --- |
| TC-INV-038 | REQ-INV-004 | Editing pre-fills existing item values in the form. |
| TC-INV-039 | REQ-INV-003 | A blank name is rejected before submission. |
| TC-INV-040 | REQ-INV-003 | A negative quantity is rejected before submission. |
| TC-INV-041 | REQ-INV-003 | Valid input is submitted with a trimmed name. |
| TC-INV-042 | REQ-INV-001 | A zero stock adjustment is rejected. |
| TC-INV-043 | REQ-INV-001 | An adjustment below zero stock is rejected. |
| TC-INV-044 | REQ-INV-001 | A valid stock adjustment is submitted. |
| TC-INV-045 | REQ-INV-002 | Loaded items are rendered in the inventory table. |
| TC-INV-046 | REQ-INV-002 | A load failure surfaces an error message to the user. |
| TC-INV-047 | REQ-INV-002 | An empty inventory displays guidance. |
| TC-INV-048 | REQ-INV-005 | A confirmed deletion removes the item from the table. |

## Open Points

- Integration tests spanning the client and a running API are TBD.
- Accessibility conformance testing scope and tooling are TBD.
- Performance and concurrency test cases are TBD.

## Approval

Not approved. Draft only.

# SRD Proposed Changes

Issue: 001
Status: Draft
Proposed Version: 1.1 Draft
Approved Baseline Version: TBD (no approved SRD present in this repository)
Author: TBD

## Revision History

| Version | Date | Author | Description |
| --- | --- | --- | --- |
| 1.0 Approved | TBD | TBD | Approved baseline (not present in repository; recorded for continuity). |
| 1.1 Draft | TBD | TBD | Proposed inventory CRUD requirements REQ-INV-002 to REQ-INV-005. |

## Existing Requirements (Unchanged)

### REQ-INV-001

The system shall adjust the stock quantity of an identified inventory item by a
non-zero integer delta, and shall reject any adjustment that would result in a
stock quantity below zero.

Status: Approved, unchanged by this proposal.

## Proposed New Requirements

The following requirements are PROPOSED and are not approved.

### REQ-INV-002 (Proposed)

The system shall return all inventory items, each including its identifier,
name and stock quantity, ordered by ascending identifier.

Verification: TC-INV-011, TC-INV-023, TC-INV-033, TC-INV-045.

### REQ-INV-003 (Proposed)

The system shall create a new inventory item from a supplied name and initial
stock quantity, shall assign a unique identifier to the created item, and shall
reject the request when the name is empty or consists only of whitespace, when
the quantity is less than zero, or when the name matches an existing item name
ignoring case.

Verification: TC-INV-012 to TC-INV-016, TC-INV-024 to TC-INV-026, TC-INV-034,
TC-INV-037 to TC-INV-041.

### REQ-INV-004 (Proposed)

The system shall update the name and absolute stock quantity of an identified
inventory item, and shall reject the request when the item does not exist, when
the name is empty or consists only of whitespace, when the quantity is less
than zero, or when the name matches a different existing item name ignoring
case.

Verification: TC-INV-017 to TC-INV-020, TC-INV-027 to TC-INV-030, TC-INV-035.

### REQ-INV-005 (Proposed)

The system shall delete an identified inventory item, and shall report that the
item was not found when no item with that identifier exists.

Verification: TC-INV-021, TC-INV-022, TC-INV-031, TC-INV-032, TC-INV-036,
TC-INV-048.

## Open Points

- Requirement ID allocation must be confirmed against the approved SRD before
  approval; the IDs above are proposed only.
- Persistence, authentication and authorisation requirements are TBD.
- Maximum inventory item name length and maximum quantity are TBD.

## Approval

Not approved. Draft only.

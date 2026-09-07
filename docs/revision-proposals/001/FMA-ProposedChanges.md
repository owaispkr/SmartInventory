# FMA Proposed Changes

Issue: 001
Status: Draft
Proposed Version: 1.1 Draft
Approved Baseline Version: TBD (no approved FMA present in this repository)
Author: TBD

## Revision History

| Version | Date | Author | Description |
| --- | --- | --- | --- |
| 1.0 Approved | TBD | TBD | Approved baseline (not present in repository; recorded for continuity). |
| 1.1 Draft | TBD | TBD | Proposed failure modes for inventory CRUD API and React CRUD client. |

## Note On Ratings

Risk ratings, severity, occurrence and detection values are TBD. No ratings
have been assigned because no approved rating scheme is available in this
repository.

## Proposed Failure Modes

### FM-INV-001 (Proposed)

- Description: A stock adjustment would reduce quantity below zero.
- Cause: User supplies a negative delta larger than the current stock.
- Effect: Inventory would report impossible negative stock.
- Mitigation: The service rejects the adjustment and the API returns 409. The
  client also blocks the submission and displays a validation message.
- Related Requirement: REQ-INV-001.
- Risk Rating: TBD.

### FM-INV-002 (Proposed)

- Description: Two inventory items share the same name.
- Cause: Create or update supplies a name already used by another item.
- Effect: Users cannot reliably distinguish items.
- Mitigation: The service performs a case-insensitive uniqueness check and the
  API returns 409; the message is surfaced in the client.
- Related Requirement: REQ-INV-003, REQ-INV-004.
- Risk Rating: TBD.

### FM-INV-003 (Proposed)

- Description: An operation targets an inventory item that does not exist.
- Cause: Stale client state, or an identifier that was deleted concurrently.
- Effect: The requested operation cannot be completed.
- Mitigation: The API returns 404 and the client displays the returned message
  and retains the remaining item list.
- Related Requirement: REQ-INV-001, REQ-INV-004, REQ-INV-005.
- Risk Rating: TBD.

### FM-INV-004 (Proposed)

- Description: An item is created or updated with an invalid name or quantity.
- Cause: Empty or whitespace name, negative quantity, or non-integer quantity.
- Effect: Corrupt or meaningless inventory data.
- Mitigation: Client-side validation blocks submission, and the service
  independently validates and the API returns 400. Client-side validation is
  not relied upon alone.
- Related Requirement: REQ-INV-003, REQ-INV-004.
- Risk Rating: TBD.

### FM-INV-005 (Proposed)

- Description: All inventory data is lost when the API process restarts.
- Cause: The inventory store is an in-memory singleton with no persistence.
- Effect: Inventory reverts to synthetic seed data.
- Mitigation: None implemented. Persistent storage is TBD.
- Related Requirement: REQ-INV-002, REQ-INV-003, REQ-INV-004, REQ-INV-005.
- Risk Rating: TBD.

### FM-INV-006 (Proposed)

- Description: The client cannot reach the API.
- Cause: API not running, incorrect `VITE_API_BASE_URL`, or a blocked
  cross-origin request.
- Effect: The inventory screen cannot display or modify data.
- Mitigation: The client surfaces a dismissible error message and keeps the
  screen usable; a Development CORS policy permits the local client origin.
- Related Requirement: REQ-INV-002.
- Risk Rating: TBD.

## Approval

Not approved. Draft only.

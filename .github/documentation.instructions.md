---
applyTo: "docs/**"
---

# Documentation Instructio**

## Purpose

The docs**older**ontains controlled documents.

Do**ments are treated as approved art**acts and must not be
modified dir**tly without revision control.

--**
# Supported Documents

PDP
SRD
S**
FMA
TP

---

# Revision Manageme**

DO NOT overwrite existing appro**d content.

Instead:

1. Create a**evision proposal.
2. Add revision**istory entry.
3. Mark proposed se**ions.
4. Preserve previous versio**.

Approved content must remain v**ible.

---

# Document Versioning**Major version:

1.0
2.0

Used**or approved releases.

Minor vers**n:

1.1
1.**
**ed for**roposed revisions.

Example:

Ver**on 1.0 Approved

New**roposed change:

Version **1 Draft

**-

# Revision History

Every docu**nt must contain:

| Version |
| D**e |
| Author |
| Description |

W**n modifying:

1. Add row.
2. Neve**remove historical entries.
3. Pre**rve chronological order.

---

**Documentation Impact Analysis

Be**re updating any document identify**
- Requirements impacted
- Design**mpacted
- Failure**odes impacted
- Tests impacted

P**duce:

## Impacted Documents

## **ason For Change

## Proposed**evisions

## Traceability Impact
**--

**Traceability

Identifiers:

REQ-**x

DES-xxx

FM-xxx

TC-**x**Maintain links:

Requirement
→ De**gn
→ Failure Mode
→ Test Case

Ne**r remove**raceability links without explana**on.

---

**SRD Rules

Requirements must:

- ** testable
- Be measurable
-**e unique

Use:

"The system shall**."

Do**ot:

- Reuse requirement IDs
- Re**ite requirement IDs
- Invent**equirements**---

# SDS Rules

Design must**e derived from:

- Approved requi**ments
-**xisting implementation
- Approved**rchitectural decisions

Unknown d**ails:

TBD

Never invent architec**re.

---

**FMA Rules

Every failure mode req**res:

- Failure ID
- Description
**Cause
- Effect
- Mitigation
-**elated Requirement

Never invent**isk ratings.

** unknown:

TBD

---

**TP Rules

Tests must originate fr** requirements.

Every test**hould map to:

REQ-xxx

Do not**enerate execution**esults.

---

# PDP Rules

Do**ot invent:

- Milestones
- Delive****ates
- Resources
- Budget**nformation**If unavailable:

TBD

---

**Copilot Behaviour

You may:

✅ Su**est revisions

✅ Update**raceability

✅ Create**raft document**hanges

✅ Add revision history

Y** must not:

❌ Approve documents

**Remove revision history

❌ Delete**pproved requirements

❌ Invent te**ing evidence

❌**ark testing complete

❌ Mark**ocuments approved**All changes**ust remain in Draft until reviewe**by a human.

Never modify PDP**SRD, SDS, FMA or TP directly**
Create:

docs/re**sion-proposals**issue-number>/

**ntaining:

- Documentation**pactAnalysis.md
- SRD-ProposedCha**es.md
-**DS-ProposedChanges.md
- FMA-Propo**dChanges.md
-**P-ProposedChanges.md
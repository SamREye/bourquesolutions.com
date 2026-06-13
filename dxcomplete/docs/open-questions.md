# Open Questions

Use this file to keep genuine unresolved policy questions visible. When a question is answered, update the related Markdown, YAML, and Mermaid files together.

## Model

- What is the main lifecycle object?
- Should the model optimize first for decision-basis clarity, product delivery, service operation, compliance, or a balanced lifecycle?
- Which parts of the model are universal and which are implementation-specific?
- How should related workspaces be grouped when a client, company, or portfolio view is needed?

## Decision Basis

- What minimum cost visibility is required before proceeding?
- How should transformation, greenfield, and limited-disclosure workspace modes differ?
- Should a pause or stop decision have a revisit date by default?

## Cost And Benefit

- Which cost categories should exist by default?
- How should unavailable current-state baseline data be represented?
- How should intentionally undisclosed data differ from unavailable data?
- When are quantified Benefits required?
- What actual cost and benefit measurements are realistic after launch?
- How should actuals refine future estimates when the data is incomplete?

## Roles

- Which roles are mandatory?
- Which roles are optional for small teams?
- Which roles can be held by the same person?
- Who owns final release authority?
- Who owns service operation authority during incidents?

## Objects

- Are `Requirement`, `Change`, and `Feature Request` distinct enough?
- Is `Authoritative Request` an object or a source type?
- Should `Control` be a first-class object?
- Should `Risk` link to requirements, releases, controls, or all of them?

## Workflows

- What is the minimum viable lifecycle?
- Which approvals are required for normal changes?
- What evidence should be recorded when normal change notice is shortened or skipped?
- How does Support Agent route issues into Owner versus Operator follow-up?
- Where should Product validation occur relative to release approval?

## Evidence

- What evidence should be required for each object?
- Which evidence should be automated?
- Which evidence should be manually approved?
- How should audit trails be preserved across tools?

## Packaging

- Should initialization create only documentation, or also tool-specific configuration?
- Should GitHub, Jira, Linear, or other integrations be optional modules?
- Should teams be able to select a lightweight, standard, or regulated scaffold profile?

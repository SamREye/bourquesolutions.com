# DX Complete Process Scaffold

This directory contains editable process files for this DX Complete workspace.

Update these files when the workspace makes local decisions about decision-basis, engineering, service operation, roles, workflows, records, and controls.

The current scope commitment is that a Workspace contains one service scope. Statements, journal entries, decisions, requirements, work, cost, benefit, support, operations, and measurement records should be understood inside that workspace unless a project explicitly decides otherwise. The default runtime shape is one MCP endpoint for that installed workspace, with workspace identity coming from DX Complete config and access constrained by authenticated actor identity plus workspace authorization.

## Files

- `decision-basis.yml` stores decision-basis templates and Commitment-or-Deferral framing.
- `cost-model.yml` stores current-state cost context, estimate, and actuals concepts.
- `roles.yml` stores role responsibilities.
- `taxonomy.yml` stores lifecycle records and relationships.
- `workflows.yml` stores workflow templates.
- `controls.yml` stores controls and evidence expectations.
- `diagrams/` stores editable Mermaid diagrams.
- `evidence/` stores captured evidence or pointers to evidence.
- `decisions/` stores decision records.
- `risks/` stores risk notes and linked controls.

## Editing Guidance

When a decision changes the workspace process, capture the decision record and update the relevant YAML, Markdown, and Mermaid files together.

## Suggested First Pass

1. Confirm which roles exist in the current team.
2. Capture statement and restate expectations.
3. Add shared Journal notes only for relevant context that does not belong in a dedicated record.
4. Elicit requirements, dependencies, constraints, and unknowns from expectations.
5. Attempt current-state cost context, even if the result is unavailable or limited-disclosure.
6. Generate an itemized cost Estimate and capture Benefits from the elicited requirement set.
7. Decide whether the decision basis is sufficient for Commitment, or whether Deferral conditions should stay visible.
8. Keep `Requirement` as the main engineering lifecycle object unless the model proves otherwise.
9. Remove objects that are too heavy for the current context.
10. Add evidence expectations only where they are useful.
11. Review open questions before turning local process changes into policy.

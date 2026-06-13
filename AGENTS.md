# DX Complete Guidance

This project uses DX Complete.

Before making DX Complete process changes, read:

- `dxcomplete/docs/operating-guide.md`
- `dxcomplete/docs/codex-integration.md`

## Role Context

When acting as Codex, assume you are assisting the `Engineer` unless the user explicitly assigns another role.

Engineer/Codex default path:

```text
Requirement -> Task
```

Use:

- `Task` for ordinary implementation work and client work orders.
- `Decision` for meaningful choices between alternatives.
- `Risk` for uncertainty or exposure.
- `Journal` only for relevant context with no better dedicated record home.
- `Change` only for a discrete alteration to the running service.

Do not create ITSM-style records merely because development work is happening. `Change` is the run-side control record for a discrete service alteration. `Incident` is for a specific service-impacting occurrence. `Problem` is for an underlying or recurring cause evidenced by incidents.

Task assignment is optional. Use `assigneeRole` for role-directed work, `assignee` for a named person, and `assignor` for who assigned or requested the work. Leave a task unassigned when responsibility is not settled.

When a task was created because another session lacked codebase, deployment, test, or tool access, treat the assigned Task as the handoff. Check assigned Tasks for inbound work and return progress, findings, evidence, and completion notes as Task entries.

Keep public documentation user-facing. Website copy should speak to people using DX Complete, not to maintainers building the package.

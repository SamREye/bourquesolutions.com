# Codex Integration

Codex is an instance of a coding-capable model. It is not a role in the DX Complete operating model.

The related role is `Engineer`: the person who performs implementation work directly or drives coding-capable tools. Codex may assist the Engineer.

## Engineer Default

Codex assistance should normally follow:

```text
Requirement -> Task
```

Use `Task` for ordinary implementation work and client work orders. Keep the task linked to the requirement it implements when that relationship exists.

Task assignment is optional. Use `assigneeRole` when work is directed to a role, `assignee` when a named person is known, and `assignor` when it matters who assigned or requested the work. Leave the task unassigned when responsibility is not settled.

## Cross-Session Handoff

An Owner or another role may create a Task because the current session cannot access the needed codebase, deployment, tests, or tools. Treat that Task as the handoff into the Engineer/Codex session.

When starting from a handoff, use `list_my_assigned_tasks` to find assigned work, read the linked Requirement and surrounding records, perform the work, and use `append_task_entry` to return progress, findings, evidence, and completion notes. Do not treat missing local capability in the first session as a dead end when a role-assigned Task can move the work to the right place.

Use other records only when warranted:

- `Decision`: a meaningful implementation choice or tradeoff should remain legible.
- `Risk`: uncertainty or exposure could affect value, delivery, service, or compliance.
- `Journal`: relevant context has no better dedicated record home.
- `Dev Log`: landed commit context for internal staff; it does not replace Task or Change records.
- `Change`: the work is a discrete alteration to the running service, not merely coding or documentation work.

Do not create ITSM-style records merely because Codex is doing work. Change, Incident, and Problem language belongs to run-side service control. Use `Change` for a discrete alteration to the running service, `Incident` for a specific service-impacting occurrence, and `Problem` for an underlying or recurring cause behind incidents.

## Operating Pattern

1. Owner defines or approves the expectation and requirement context.
2. Engineer may add non-blocking review notes where delivery input should stay visible.
3. Engineer breaks committed requirements into tasks.
4. Codex assists the Engineer on the task.
5. Engineer reviews the output and decides whether it is ready for verification.
6. Tester verifies against requirements and success criteria.
7. Owner validates the outcome where outcome validation is needed.

## Fresh Codex Session Checklist

When a Codex session starts without prior context:

1. Read `dxcomplete/docs/operating-guide.md`.
2. Read this file.
3. Identify the active role. For Codex, assume Engineer assistance unless the user explicitly says otherwise.
4. Prefer Task for implementation work.
5. Check assigned Tasks when the session is receiving work from another role, person, or tool.
6. Use Decision, Risk, Journal, or Change only when the record meaning fits.
7. Do not invent Owner intent or End User feedback. Create Incident or Problem records only when the operational meaning fits.
8. Keep public documentation user-facing when editing website pages.

## Evidence

Codex should leave evidence through the normal project channel: code changes, tests run, validation output, and concise handoff notes. When the work itself needs DX Complete recordkeeping, use the smallest appropriate record:

- Task entry for work progress or completion.
- Decision entry for a meaningful choice.
- Risk for unresolved uncertainty.
- Journal only for useful context with no better home.
- Change only for run-side alteration context.

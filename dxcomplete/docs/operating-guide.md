# Operating Guide

DX Complete works best when each role uses the record that matches the work in front of them. This guide is the role-facing companion to the phase and records documentation.

## Operating Surfaces

DX Complete has three intended doors:

- MCP is the operating interface for agents and coding tools that need role-aware actions.
- The dashboard is the human read surface for signed-in workspace members. It is strictly read-only and uses the same workspace membership and record visibility rules as MCP.
- A general API is a future integration surface. Do not treat the current dashboard or MCP routes as a public application API.

The dashboard overview follows the DX Complete phases: Orient, Elicit, Weigh, Build, Go Live, Operate, and Measure. It opens on the furthest phase that already has records, shows attention counts derived from current record state, and keeps cross-phase records such as Tasks, Journal activity, Decisions, Motions, Risks, and DX Complete Tickets visible while a member reviews any phase. External-only users receive a support-scoped Operate view for their own Support Requests instead of internal workspace phase counts.

The Attention view is the clean place to check what needs action now. Needs Attention is derived from current record state, so items leave the view when the underlying record changes; there is no separate dismiss action. Each item says what clears it, such as approval, vote, task completion, resolution, closure, or actuals. Recent Activity shows record changes over the selected time window and groups multiple events under the record they belong to.

## Repo Connection

For central-hosted workspaces, the account page gives the Owner a one-time repo connection command. Run it inside the service repo to write `dxcomplete/workspace.json`, store repo sync credentials in `dxcomplete/.env`, ignore that credential file through `dxcomplete/.gitignore`, install the local process guidance, and push the first Dev Log commit entries.

The project root `.env` remains project-owned. DX Complete does not read, write, or modify it. If a workspace Owner re-issues the repo connection command, earlier unused commands stop working; repos that already connected keep their repo sync credentials.

## Role Handoffs

A DX Complete role may be operated by a person, an agent, or both in a separate tool or session. The workspace records are the shared medium between those sessions.

When the current session cannot do the work directly, create a `Task` assigned to the role that can act. Use `assigneeRole` for role-directed work, `assignee` when a named person is known, and `assignor` for the requester. The acting session can find the work with `list_my_assigned_tasks` and return progress, findings, evidence, and completion notes with `append_task_entry`.

## Owner

The Owner sets direction, weighs value against cost and risk, records Commitment or Deferral, validates outcomes, and formally accepts risk when the project should own it.

Common records:

- `Statement`
- `Expectation`
- `Benefits`
- `Value Realization`
- `Commitment`
- `Deferral`
- `Decision`
- `Resolution`
- `Risk`

Do not treat every comment as a requirement. Do not treat End User feedback as approval unless the same person is explicitly acting in an authority role.

When work needs another role, tool, or session, create a role-assigned `Task` and review the returned Task entries.

## Engineer and Codex Assistance

The Engineer turns committed requirements into tasks and working changes. Codex may assist the Engineer, but Codex is a coding-capable tool, not a DX Complete role.

Default path:

```text
Requirement -> Task
```

Use `Task` for ordinary internal implementation work. Use `Decision` for meaningful choices between alternatives. Use `Risk` for uncertainty or exposure. Use `Journal` only for relevant context with no better record home. Use `Change` only when work becomes a discrete alteration to the running service.

Assigned Tasks are the normal inbound handoff for Engineer/Codex sessions. Return findings, evidence, status, and completion notes through Task entries.

Use `Dev Log` for internal code-history context. It shows what landed in the workspace repository, can be summarized over time, and can match Change commit references when the same commit hash is present.

Do not create ITSM-style records merely because implementation work is happening.

## Tester

The Tester checks completed work against requirements and success criteria. Verification evidence should stay tied to the requirement or task being checked.

Common records:

- `Task` entries for verification notes tied to implementation work.
- `Review Note` when the check reveals useful input on an expectation or requirement.
- `Risk` when the check exposes uncertainty or possible harm.
- `Decision` when a test result forces a choice.
- `Journal` when the note is useful context with no better home.

Do not default to `Change` for testing observations.

## Operator and Administration

The Operator manages run-side change, operational inventory, rollout and rollback planning, monitoring, users, permissions, settings, provisioning, and run-side security.

Common records:

- `Change` for a discrete alteration to the running service.
- `Environment` for a named operating context such as local, staging, or production.
- `Component` for an environment-specific app, database, queue, storage location, external service, or other operational item.
- `Maintenance Schedule` for recurring operational hygiene such as scheduled checks, reviews, rotations, or maintenance duties.
- `Risk` and `Decision` when run-side accountability needs to remain visible.

The Operational Registry stores pointers and identifiers, not secret values. Record where a secret is stored and what it is called; do not record the credential itself.

## Support Agent

The Support Agent helps users, captures questions and reports, and routes signals into shared follow-up only when shared follow-up is needed.

Start with `Support Request` for a user-facing question, report, request, or issue that needs shared follow-up. Use `DX Complete Ticket` for communication with DX Complete itself. The filing or submitting End User can see their own record, internal users can see queue records for the origin workspace, and DX Complete internal support can see DX Complete Tickets across workspaces.

Possible promotions:

- `Statement` when the signal expresses a need or concern in the user's own words.
- `Requirement` when the desired truth needs to become buildable and checkable.
- `Task` when someone needs to act.
- `Support Request` when the signal needs a shared support thread.
- `Risk` when uncertainty or exposure needs to remain visible.
- `Decision` when a meaningful choice is needed.
- `Change` when the follow-up is a discrete alteration to the running service.
- `Journal` when the signal is relevant context with no better home.

## End User

The End User uses the service and provides requests, feedback, corrections, and issue reports. Another role captures that input when it belongs in DX Complete.

End User feedback is not authority approval unless that person is also explicitly acting in an authority role.

## Internal And External Access

DX Complete derives internal or external access from workspace roles. Owner, Engineer, Tester, Operator, and Support Agent are internal roles. End User is external only when it is the person's only role. A person with both End User and any internal role is treated as internal for access.

DX Complete Tickets stay in the workspace where they were filed and are visible to the submitter, origin-workspace internal users, and DX Complete internal support. Support Requests are visible to the filer and internal users in the workspace. Other End Users do not see those queue records. Tasks are internal-only.

Internal users see the full workspace action set for their role. End Users are offered only the actions for their own Support Requests: submit, read, follow up, reopen, and see unread replies. DX Complete Tickets are not part of the End User support menu.

## Record Routing

| Situation | Use | Reason |
| --- | --- | --- |
| Normal implementation work | `Task` | A task is the internal work-order record for concrete work someone needs to do. |
| Meaningful choice | `Decision` | A decision keeps the choice and its inputs legible. |
| Formal authority | `Resolution` | A resolution keeps authority visible. Pending authority records are Motions; passed records are Resolutions. |
| Uncertainty or exposure | `Risk` | A risk keeps uncertainty visible without pretending it is resolved. |
| Run-side alteration | `Change` | A change records service alteration, execution, rollback, and events. |
| User-facing support follow-up | `Support Request` | A support request keeps the shared support thread visible without turning every report into an incident. |
| Operational inventory | `Environment` or `Component` | The registry shows what exists and where it lives. |
| Recurring operational hygiene | `Maintenance Schedule` | A maintenance schedule keeps cadence and due state visible while completed changes or tasks show what happened. |
| Measured value after work or operation | `Value Realization` | Value realization compares baseline and actual metrics without replacing benefits or estimates. |
| Useful context with no better home | `Journal` | Journal is fallback context, not the default home for load-bearing records. |
| Internal code-history context | `Dev Log` | Dev Log shows repository commits for internal staff without making every commit a Change. |
| Question, report, request, correction, or follow-up with DX Complete | `DX Complete Ticket` | A ticket keeps communication with DX Complete before shared process follow-up is created. |

The practical test is:

```text
Will anything reference or depend on this?
```

If yes, prefer the dedicated record that can carry the relationship. If no, and the context is still relevant, Journal may fit.

## Task Assignment

Task is the work-order record for client work. A task can be directed to a role, a named person, both, or neither.

- `assigneeRole` points work at a role such as Owner, Engineer, Tester, Operator, Support Agent, or End User.
- `assignee` names the person expected to act when the person is known.
- `assignor` names the person who assigned or requested the task.
- Unassigned tasks remain valid when responsibility is not settled.

Task assignment is also the handoff protocol when work crosses a role, tool, or session boundary. The assigned role acts on the task and returns progress, findings, evidence, and completion notes as task entries.

When a user asks what work is theirs, use the current identity and membership roles. Do not ask the user to choose an acting role just to find assigned work.

## ITSM Boundary

`Change` is the current first-class run-side control record. Use it for a discrete alteration to the running service, with a change type, plan, execution path, rollback path, risk and impact, downstream impact where known, and event history. Result and recovery events may include optional Git commit references for the specific execution attempt or rollback. These are references only; DX Complete does not inspect Git or require them.

`Incident` and `Problem` are current run-side records. Use Incident for a specific service-impacting or potentially service-impacting occurrence. Use Problem for an underlying or recurring cause evidenced by one or more incidents.

Do not create ITSM-style records merely because work is happening. Use service records when the information is truly run-side control, operational signal, or service history.

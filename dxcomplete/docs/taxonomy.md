# DX Complete Records

The record set describes the current DX Complete runtime model for one workspace.

## Current Runtime Records

- Workspace
- DX Complete Ticket
- Statement
- Journal
- Dev Log
- Environment
- Component
- Maintenance Schedule
- Estimate
- Benefits
- Value Realization
- Expectation
- Requirement
- Commitment
- Deferral
- Task
- Change
- Incident
- Problem
- Support Request
- Decision
- Resolution
- Risk

## Current Lifecycle Concepts

These concepts remain useful, but they are not separate runtime records in the current model.

- Feedback
- Authoritative Request
- Feature Request
- Release
- Deployment
- Control
- Evidence
- Estimate Refinement

## Current Lifecycle Model

`Workspace` is the runtime scope object. It contains one service scope and is the boundary for hosted DX Complete records. The default MCP deployment model is one endpoint per installed workspace, with workspace identity coming from DX Complete config and access constrained by authenticated actor plus workspace authorization.

Workspace-scoped lifecycle records use UUIDs as primary keys and links, while also carrying a human-readable reference such as `RQM-0001`. The readable reference is for people; it does not replace the UUID.

`DX Complete Ticket` is communication between a submitter and DX Complete. It can hold a question, report, request, correction, or follow-up and can receive appended entries over time. Its durable content is the title plus entries; summary is optional and is not generated automatically. The ticket stays in the workspace where it was filed; the submitter, origin-workspace internal users, and DX Complete internal support can see it. Unrelated End Users cannot. DX Complete Tickets are not part of the End User support menu. DX Complete replies can be tracked as unread or read by the submitter. The unread list identifies tickets that need attention; reading the ticket opens the full content and marks addressed replies read. It does not ingest files or assets, and does not automatically become a shared lifecycle object.

`Statement` is now a runtime collection. Statement preserves a user's own words before interpretation, can link to the expectation derived from it, and should preserve prior versions when edited.

`Journal` is shared workspace context. It is append-only and should be used for relevant background, preferences, observations, and notes that do not have a better dedicated record home. Dedicated records should be used first: claims and success conditions belong in Statement, Expectation, or Requirement records; choices belong in Decisions; actions belong in Tasks; risks and service changes belong in their matching records. Operational infrastructure state belongs in the Operational Registry through Environment and Component records. The sharp test is: will anything reference or depend on this? If yes, prefer a dedicated record. Journal entries can be linked when they inform another record, and Journal content that becomes load-bearing should be promoted.

`Dev Log` is internal code-history context for the workspace repository. It mirrors commit hash, message, author, commit time, and branch as append-only entries, with summaries for older ranges. It is single-repository per workspace, internal-only, and derives matches to Change git commit references by hash when both sides are present.

`Environment` is a named operating context such as local, staging, or production. It helps the team separate what exists in one operating context from what exists in another, and it should preserve prior versions when edited.

`Component` is one operational item in one Environment. It can describe the kind of component, where it lives, non-secret identifiers, secret pointers, and notes. Secret pointers should name where a secret is stored and what it is called, not the secret value itself. Component history should stay versioned state; service events and process history belong in Change, Decision, Risk, Task, or other matching records.

`Maintenance Schedule` is a recurring operational hygiene record. It records the name, kind, cadence, start date, rationale, and notes for scheduled checks, reviews, rotations, or maintenance duties. Due state is derived from cadence and completed Changes or Tasks linked to the schedule.

`Estimate` is the structured itemized cost record used during Weigh. It can cover requirements or expectations, rolls cost totals up while keeping one-time, recurring, period, and currency distinctions visible, and should preserve prior versions when edited.

`Benefits` is the Owner-authored benefit record used during Weigh. It can cover requirements or expectations, may include quantified or qualitative benefit items, rolls up quantified benefit totals only, and should preserve prior versions when edited.

`Value Realization` is the measured-value record used during Measure. It compares baseline and actual metrics for expectations, requirements, or commitments where measurement is available. Metrics without actual values remain open rather than blocking closure.

`Expectation` is now a runtime collection. It restates the expected result and how success will be recognized, in user-facing language. The MCP client should confirm wording before recording it on a user's behalf. Separate authority approval can be tracked when it reduces risk. Requirements should link back to the expectations they are meant to satisfy. When an expectation changes, prior versions should be kept so the current wording is not silently detached from what came before.

`ReviewNote` is not a separate collection. Expectations and Requirements can carry append-only review notes. A note can be marked important, but it does not create a severity state, block progress, or require an Owner response.

The main engineering object is `Requirement`. Requirements translate expectations into team-owned commitments that are shaped during elicitation, weighed by the Owner, and refined during Build once covered by a Commitment. When a requirement changes, prior versions should be kept so the current commitment remains reconstructable.

`Commitment` is the Owner's point-in-time authority record that moves named requirements or expectations into Build. It can include reservations: concerns the Owner is moving forward despite.

`Deferral` is the Owner's record for not committing yet. It records explicit conditions that must be addressed before a future Commitment. Conditions should have directly readable current state and append-only event history.

A separate technical specification object is not part of the current model. Implementation and verification detail should live inside a Requirement as optional requirement detail until an independent object is proven necessary. `Task` is an internal work-order record that can be created whenever a phase needs concrete action. Task status is derived from the latest status-change entry so prior movement remains visible. Task assignment is optional: work can be directed by role, by named person, by assignor, or left unassigned when responsibility is not settled. The Engineer works primarily on `Task`; Codex assistance may also operate on Tasks where appropriate.

Approval and similar checkpoints are risk checkpoints, not blockers. A checkpoint can be approved, formally accepted as risk by the Owner, or proceeded past with the open risk still visible. Proceeding past an open checkpoint does not close or accept the risk.

`Incident`, `Problem`, and `Support Request` are current run-side or support records. Use Incident for a specific service-impacting or potentially service-impacting occurrence, Problem for an underlying or recurring cause evidenced by one or more incidents, and Support Request for a shared user-facing support thread. The filing End User and internal users can see a Support Request; unrelated End Users cannot. End Users are offered only their own Support Request actions: submit, read, follow up, reopen, and see unread replies. `Feature Request`, `Feedback`, `Authoritative Request`, `Release`, `Deployment`, `Control`, `Evidence`, and `Estimate Refinement` remain lifecycle concepts. In the current runtime, they should be represented through current records such as Requirement, Task, Change, Incident, Problem, Support Request, Risk, Decision, Estimate, Benefits, Value Realization, or DX Complete Ticket unless a later model decision promotes them into first-class records.

`Change` is now the run-side record for a discrete alteration to the running service. It should keep the change type, original plan, execution steps, rollback plan, and risk or impact as the baseline, including downstream impact where known: what else may be affected and what depends on what is changing. Then use append-only events for notice, veto, decision, result, recovery, notes, and plan revisions. Result and recovery events may carry optional Git commit references for each execution attempt or rollback, but those references are recorded as provided and are not validated by DX Complete. Emergency is a Change type, not a separate event path. A Change is not a standing Operations Plan and does not enforce deployment.

`Decision` captures the matter being decided, ordered argument/note/decision entries, and links to records that informed the choice. The current decision is derived from the latest decision entry, while earlier decisions and arguments remain visible. Arguments are not weighted by default and do not need to be mapped to a single side of a choice. DX Complete preserves the decision trail; it does not decide whether the authority's reasoning was correct.

Decision inputs use the `informed_by` relationship from a Decision to the records that informed it. Outbound links from a Decision answer "what informed this decision?" Inbound links to an input record answer "which decisions used this?"

`Resolution` records formal authority. A pending record is a Motion; a passed record is a Resolution. The ledger keeps motion, second, vote, note, and withdrawal entries in order. Standing comes from an Owner making or seconding the Motion, including an Owner seconding their own Motion. Passage requires unanimous current Owner votes. A Resolution does not block other records; other records can cite it with `authorized_by` when authority should be visible.

Resolution is distinct from Decision and Commitment. Resolution answers whether authority exists and on whose authority. Decision records a choice among alternatives and the inputs that informed it. Commitment records the Owner moving weighed scope into Build. The current design envelope assumes one or two Owners, where common voting thresholds coincide; multi-owner threshold semantics are deferred by `DFR-0032`.

## Editable Source

The installed scaffold includes `dxcomplete/process/taxonomy.yml`. Treat that file as the editable taxonomy source for a project.

## Open Taxonomy Questions

- Is `Workspace` sufficient as the service-scope boundary, or will related workspaces need a stronger grouping model?
- Should future work need a grouping model above Workspace, or is Workspace sufficient as the service scope?
- Should decision arguments remain embedded text, or should they become first-class records after repeated use?
- How should limited-disclosure cost data be represented?
- Should `Authoritative Request` be a separate object or a source category for Requirements?
- When should a `Support Request` escalate into an `Incident`?
- Should `Control` be modeled as a lifecycle object, a policy object, or both?
- How should evidence attach to each object?

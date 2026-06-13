# Glossary

## Business And Service Context

App URL: A dashboard link for a record when DX Complete can form a read-only workspace view for it.

Attention View: A read-only dashboard and MCP view showing records that need action now plus recent record activity.

Approval: A separate authority confirming an expectation or decision, tracked when it reduces risk.

Assigned By Me: A task view showing work where the current signed-in person is recorded as the assignor.

Assigned To Me: A task view showing work assigned to any role the current signed-in person holds, plus work whose named assignee identifies that person.

Assignee Role: An optional Task field that directs work to a role such as Owner, Engineer, Tester, Operator, Support Agent, or End User without naming a specific person.

Assignor: The person recorded as assigning or requesting a Task.

Workspace: The runtime container for one service scope and the records connected to it.

Orient: The phase that captures the desired outcome, restates expectations, and confirms how success will be recognized.

Weigh: The phase where cost, value, risk, and confidence are compared before recording a Commitment or Deferral.

Commitment: An Owner record that says preparation is sufficient to commit requirements or expectations into Build, with any reservations kept visible.

Reservation: A concern recorded inside a Commitment when the Owner moves forward despite it.

Deferral: An Owner record for not committing yet, with explicit conditions that make the path to a future Commitment clear.

Condition: Something that must be addressed before a Deferral can resolve into a Commitment.

Decision: A revisitable choice record. The current decision comes from the latest decision entry, while earlier arguments, notes, and decisions remain visible.

Decision Entry: One ordered entry in a Decision, such as an argument, note, or decision.

Decision Input: A record that informed a decision. Outgoing links from a decision show what informed it; incoming links to a record show which decisions used it.

Motion: A pending Resolution record that has not passed, failed, or been withdrawn.

Resolution: A record of formal authority. A pending record is a Motion; a passed record is a Resolution.

DX Complete Ticket: A ticket that stays in the workspace where it was filed and is used to raise a question, report, request, correction, or follow-up with DX Complete. The submitter, internal users in that workspace, and DX Complete internal support can see it; unrelated End Users cannot. DX Complete Tickets are not part of the End User support menu.

Journal: A shared workspace record for useful notes that do not have a better dedicated home.

Journal Note: A raw Journal entry with text, author, and timestamp. It can be summarized later without being deleted.

Journal Summary: A compact Journal entry that summarizes covered notes and points back to them so details remain retrievable.

Dev Log: An internal code-history record that mirrors the workspace repository commits so staff can see what changed without needing repository access.

Dev Log Summary: A compact Dev Log entry that summarizes covered commits and points back to them so older commit detail remains retrievable.

Operational Registry: The inventory of Environments and Components that shows what exists, where it lives, and which secret locations are relevant. It is not monitoring, diagnostics, a secret vault, an event log, or a runbook.

Environment: A named operating context such as local, staging, or production. Components belong to one Environment so each operating context can be understood separately.

Component: One operational item in one Environment, such as an app, database, queue, storage location, or external service. It records where it lives and which non-secret identifiers or secret locations matter.

Locator: Structured location information for a Component, such as a URL, project, region, host, or route.

Secret Pointer: A reference to where a secret is stored and what it is called. It should not contain the secret value.

Maintenance Schedule: A recurring operational hygiene record with cadence, start date, rationale, and due state derived from linked completed Changes or Tasks.

Cadence: How often recurring operational work is expected to happen, such as every month or every quarter.

Informed By: The relationship from a decision to the record that helped inform it.

Readable ID: A short record reference such as `RQM-0001`. It helps people refer to records while the UUID remains the primary key.

RQM: Requirement. Historical text may reference `REQ-NNNN` from before the rename; numbering is unchanged. RQM is not a request, Support Request, or DX Complete Ticket.

Record Link: A relationship from one record to another. Links can be added or removed when the relationship changes or was recorded incorrectly.

Statement: The user's own words before DX Complete interprets or translates them, kept as the traceable root for expectations and downstream work.

Expectation: The expected result and how success will be recognized, in user-facing language.

Version History: Prior versions kept when an expectation or requirement changes, so current wording can be understood without losing what came before.

Checkpoint: A confirmation point that reduces risk. It can be approved, formally accepted as risk by the Owner, or proceeded past with open risk visible.

Proceeding Past an Open Checkpoint: Moving forward while an approval, readiness concern, or other checkpoint is still open. The risk remains visible and is not formally accepted.

Risk Acceptance: An Owner decision to own an open risk on the project's behalf. It is different from simply proceeding past an open checkpoint.

Transformation: Work that moves from an existing state to an improved state.

Git Commit Reference: An optional commit identifier recorded on a Change result or recovery event to show what code state was used for that execution attempt or rollback. DX Complete records the reference as provided and can match it to Dev Log entries when the commit is present.

Greenfield: Work that moves from a new idea to a new system.

Limited Disclosure: Work where available information is incomplete by design or circumstance.

## Cost And Benefit

Estimate: An itemized cost estimate used during Weigh, linked to the requirements or expectations it covers.

Estimate Line Item: One cost item inside an Estimate, with a label, amount or range, one-time or recurring timing, and currency.

Roll-up: Grouped totals from quantified cost or benefit items, keeping one-time amounts, recurring amounts, periods, and currencies distinct.

Benefits: An Owner-authored benefit record used during Weigh. Benefits may be quantified or qualitative.

Benefit Item: One item inside Benefits. It may have an amount or range, or it may be qualitative with no amount.

Estimate Refinement: The use of actual cost and benefit signals to improve future estimates.

Value Realization: A record that compares baseline and actual value metrics after work or operation when measurement is available.

Value Metric: One before-and-after measure inside Value Realization, with a baseline, optional actual value, unit, direction, and measured dates.

Measured At: The date or time when a value metric baseline or actual value was measured.

## Roles

Owner: The role that sets authority, priority, outcome direction, requirements, product validation direction, budget commitment, escalation direction, and formal risk acceptance.

Engineer: The role that turns committed requirements into tasks and working changes, directly or by driving coding-capable tools.

Tester: The role that checks completed work against requirements and success criteria.

Operator: The role that releases, deploys, monitors, runs the service, and manages users, permissions, settings, provisioning, and run-side security.

Support Agent: The role that helps users, captures signals, and routes questions, feedback, and issues to the right follow-up.

End User: The person the service is for; uses the service and provides requests, feedback, corrections, and issue reports.

Internal User: A workspace member with Owner, Engineer, Tester, Operator, or Support Agent role. Any one of those roles makes a multi-role user internal for access checks.

External User: A workspace member whose only role is End User. External users are offered only their own Support Request actions and cannot see other End Users' records, DX Complete Tickets, internal Tasks, or Dev Log entries.

## Delivery

Requirement: A team-owned commitment that translates expectations into something buildable and verifiable.

Requirement Detail: Optional behavior, edge cases, or check notes kept with a requirement when needed.

Review Note: A free-text note on an expectation or requirement. It may be marked important, but it does not block progress or require an Owner response.

Task: An internal work-order record with an entry history. The current status comes from the latest status-change entry. A Task can be assigned by role, assigned to a named person, assigned by someone, or left unassigned.

Task Entry: One ordered entry in a Task, such as a comment, note, or status change.

Complete Engineering: The controlled delivery lifecycle covering implementation, verification, validation, release, and deployment.

Codex: A coding-capable model that may assist the Engineer. Codex is not a role.

QA Verification: The check that delivered work satisfies requirements and acceptance criteria.

Product Validation: The check that verified work achieves the intended product outcome.

Change: A record for a specific alteration to the running service. It keeps the change type, plan, execution, rollback, notice, veto, decision, result, recovery history, and optional Git commit references without controlling the operation.

Clearing Act: The action or record-state change that removes an item from Needs Attention, such as approval, vote, task completion, resolution, closure, or actuals.

Change Plan: The part of a Change record that explains what is changing, why, scope, timing, and notice.

Execution Plan: The ordered practical steps inside a Change record for carrying out the change.

Rollback Plan: The part of a Change record that explains how to reverse or recover if the change fails or should not remain in use.

Veto: A serious recorded objection to a Change by the Owner or Engineer. It does not mechanically stop the Operator, but proceeding over it creates a strong accountability record.

Release: A grouped set of changes prepared for delivery.

Deployment: The act of putting a release or change into an environment.

## Operations And Control

Support Request: A support record for a reported user experience, question, request, or issue. The filer and internal users can see it; unrelated End Users cannot. End Users can submit, read, follow up on, reopen, and see unread replies for their own Support Requests.

Support Request Entry: One ordered entry in a Support Request, such as raised, triage, update, escalated, resolved, reopened, or note.

Incident: A specific service-impacting or potentially service-impacting occurrence with response history, current status, and severity derived from ordered entries.

Incident Entry: One ordered entry in an Incident, such as detected, update, severity, resolved, reopened, or note.

Problem: An underlying or recurring cause evidenced by one or more Incidents, with investigation, root-cause, known-error, and resolution history.

Problem Entry: One ordered entry in a Problem, such as identified, investigation, root cause, known error, resolved, reopened, or note.

Risk: An uncertainty or exposure that could affect product, service, delivery, compliance, or operations. Current risk state comes from ordered entries.

Risk Entry: One ordered entry in a Risk, such as identified, assessment, treatment, monitor note, closed, or reopened.

Risk Treatment: The chosen response to a Risk: accept, mitigate, transfer, or avoid. Formal acceptance is Owner-only.

Change Type: The classification of a Change as standard, normal, or emergency.

Standard Change: A low-risk, pre-understood, repeatable Change type.

Normal Change: The default Change type for an assessed alteration to the running service.

Emergency Change: A Change where normal notice or review is shortened because the situation is important and immediate.

Root Cause: The underlying cause recorded in a Problem when investigation identifies why one or more incidents occurred.

Known Error: A Problem state showing an underlying cause is known even if the full improvement is not complete.

Control: A policy, check, approval, or evidence expectation used to manage risk or governance.

Evidence: Information, an artifact, measurement, approval, or result used to support a decision, verification, release, deployment, or control.

MCP: The operating interface used for role-aware DX Complete actions after initialization.

CLI: The command-line bootstrap mechanism, including `npx dxcomplete init`.

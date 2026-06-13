# Workflows

These workflows describe the current DX Complete lifecycle paths. Adapt the workspace-owned process files when a local policy decision changes how the team works.

## Current Workflow Areas

- Intake and triage
- Decision basis
- Statement and expectation capture
- Requirement elicitation
- Current-state cost context attempt
- Itemized cost estimate
- Benefits
- Weigh outcome
- Product definition
- Engineering execution
- QA verification
- Product validation
- Change and release control
- Deployment and operations
- Operational Registry maintenance
- Support and incident management
- Problem and improvement management
- Risk and control management
- Audit and evidence capture
- Actual cost / benefit observations
- Estimate refinement

## End-To-End Flow

1. A signal enters through feedback, authoritative request, support ticket, service-impact event, recurring issue, or strategic direction.
2. Statement capture preserves the user's own words and links the work to the Workspace context.
3. Orient captures statement, confirms wording before recording, and restates expectations with approval where needed.
4. Elicitation translates expectations into requirements, dependencies, constraints, and unknowns.
5. Engineer review notes can be added to expectations or requirements when input should stay visible.
6. Current-state cost context is attempted. It may be complete, partial, unavailable, or undisclosed.
7. An itemized cost Estimate is generated from the elicited requirement set where cost reasoning is needed.
8. Benefits are captured where useful, including qualitative benefits when amounts are not available.
9. A decision basis is prepared for Weigh, including important review notes where present, the Estimate and Benefits where considered, and any Decision entries or linked inputs that informed the outcome.
10. Owner records a Commitment or a Deferral. If committing, Owner and Engineer move the committed requirement set into build planning. If deferring, the unmet conditions remain visible.
11. Engineer implements tasks and may use Codex assistance where appropriate.
12. Tester verifies completed work against requirements and acceptance criteria.
13. Owner validates whether the result is the right outcome.
14. Change and release control records the service change type, plan, execution steps, rollback path, notice, vetoes, and result.
15. Operator carries out the change in external operational tooling, then monitors and runs the service.
16. Environment and Component records are kept current when the operational inventory changes.
17. Support Agent handles user-facing issues and routes signals back into Owner or Operator follow-up.
18. Actual cost / benefit observations are captured where available.
19. Audit evidence is captured across decisions, controls, releases, deployments, measurement, and verification.

`Change` is the current first-class run-side control record. `Incident` is the current first-class record for a specific service-impacting occurrence. `Problem` is the current first-class record for an underlying or recurring cause evidenced by incidents. Use these records only when their meaning fits; do not create ITSM records merely because work is happening.

## Workflow Questions

- Which steps require explicit approval?
- Which steps can be combined for low-risk changes?
- What cost visibility is enough to proceed when baseline data is unavailable?
- How should proceeding past an open checkpoint be shown when the risk remains open?
- What evidence is required before release?
- What notice, veto, change-type, and emergency rationale is enough for a Change record?
- What operational inventory belongs in Environment and Component records rather than Journal?
- What is the smallest useful workflow for a solo project?

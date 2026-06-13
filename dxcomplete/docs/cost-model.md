# Cost Model

Cost modeling is first-class in DX Complete. Do not reduce the top-level model to OPEX. OPEX/CAPEX-like categories may exist inside the cost model, but the top-level concept should remain Cost Model / Decision Basis.

## Cost Visibility Rule

Cost visibility is mandatory. Complete cost data is not mandatory.

The system should make the following clear:

- What current-state cost data was attempted.
- What cost data is known.
- What cost data is estimated.
- What cost data is unavailable.
- What cost data is intentionally undisclosed.
- What assumptions were used.

## Cost Model Distinction

Baseline is what the current state costs now, if known.

Estimate is what the proposed future state is expected to cost.

Actuals are what the delivered future state actually costs after launch, if measured.

The structured `Estimate` record is cost-only. It keeps one-time and recurring cost totals separate by period and currency.

Expected value belongs in `Benefits`. Benefits may include quantified items with amounts, or qualitative items that are complete without an amount.

## Cost Records

Current-state cost context should be attempted where relevant. It may be complete, partial, unavailable, or limited by disclosure, but it is no longer a separate runtime record in the current model.

`Estimate` records itemized cost information for the scope being weighed.

`Benefits` records expected value for the scope being weighed. It may contain quantified or qualitative benefit items.

Post-launch cost and benefit observations should be captured where useful, but they are not separate runtime records in the current model.

## Possible Cost Categories

These categories are examples, not mandatory fields:

- Build labor
- Codex-assisted implementation cost
- Testing and validation effort
- Infrastructure
- Licenses and tools
- Migration
- Training and adoption
- User support load
- Operational run cost
- Maintenance
- Risk mitigation
- Decommissioning or replacement

## Measurement Rule

Actuals should be captured when available. Missing actuals should not block project or service lifecycle closure, but the absence should be visible.

Estimate refinement should use actuals where available and record uncertainty where actuals are unavailable.

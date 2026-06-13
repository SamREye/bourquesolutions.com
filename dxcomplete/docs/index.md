# DX Complete Workspace Docs

## Goal

These files describe how this workspace uses DX Complete to decide what is worth doing, deliver it with control, run it safely, and learn from the results.

DX Complete is installed into a service repo as workspace-owned documentation, process files, workspace identity, repo sync credentials, and, for app-owned routes, route wrappers. The hosted DX Complete service stores records, manages sign-in, checks workspace membership, assigns readable IDs, and executes MCP tools.

## Install And Provisioning Context

The npm package installs the workspace-side files. It does not install the hosted DX Complete service.

For a central-hosted workspace:

1. Sign in at `https://dxcomplete.com/account.html`.
2. Create a workspace for the service.
3. Connect the AI client from the account page.
4. Run the one-time `npx dxcomplete@latest connect <one-time-token>` command in the service repo.

The connect command writes `dxcomplete/workspace.json`, stores repo sync credentials in `dxcomplete/.env`, adds `dxcomplete/.gitignore` so that credential file is not committed, installs process guidance, and runs the first Dev Log commit sync. The project root `.env` is never read, written, or modified.

For an app-owned or self-hosted route, run `npx dxcomplete init` first to install the route wrappers, then run the account page's connect command. If the app route needs to proxy MCP from its own deployment, copy the values from `dxcomplete/.env` into that app's hosting environment.

## Current Product Model

The installed model covers:

- Workspace and service context
- Statement capture
- Shared Journal context
- Internal Dev Log context
- Cost context, itemized estimates, benefits, and measured value
- Decision basis for Weigh
- Weigh outcomes with Commitment or Deferral records
- Decisions with linked inputs where useful
- Direction and product definition
- Engineering execution and task work
- QA verification and product validation
- Change and release control
- Deployment and operation
- User support, incidents, and problems
- Administration as part of operation
- Audit, evidence, risk, and measurement
- Role-by-role operating guidance

## How To Read These Docs

Use `operating-guide.md` to see how each role should choose records in normal work. Use `taxonomy.md` to understand the current record set. Use `open-questions.md` for genuine unresolved policy questions. Use the YAML files in `dxcomplete/process/` as editable workspace process data.

# Docs — Structure

Documents are split into **system** (framework reference) and **user** (project outputs for the user to review).

## Folders

| Folder | Purpose |
|--------|---------|
| **system-docs/** | Framework reference: agent tools, architecture diagrams, dev-lessons, tool-memory, decision-log |
| **user-docs/** | Project outputs created by sub-agents for the user. Empty until agents produce output. |

## Rule for sub-agents

**Create docs only when needed to show the user.** Write to your folder under `docs/user-docs/[your-folder]/`. Create the folder if it doesn't exist.

## User docs — by agent/skill

| Agent/Skill | Folder | Example files |
|-------------|--------|---------------|
| role-product-manager | `user-docs/product-manager/` | product.md |
| role-ui-ux-designer | `user-docs/designer/` | ux-design.md |
| role-research-analyst | `user-docs/researcher/` | research-[topic].md |
| workflow-project-roadmap | `user-docs/planner/` | roadmap.md |
| workflow-project-spec / architect | `user-docs/architect/` | architecture.md, database.md, api.md |
| role-db-schema-engineer | `user-docs/db-schema-engineer/` | database-conceptual.md, database-logical.md, database-ddl-plan.md |
| workflow-project-context | `user-docs/workflow-project-context/` | project-context.md |
| workflow-get-project-context | `user-docs/workflow-get-project-context/` | project-context-full.md |
| workflow-semantic-debugging | `user-docs/debug/` | [slug]-report.md |
| workflow-refactor | `user-docs/refactor/` | refactor-suggestions-[date].md |
| role-idea-agent | `user-docs/idea-agent/` | [idea-slug]-idea-summary.md |
| workflow-context-map | `user-docs/context-map/` | context-map.md |
| workflow-impact-analysis | `user-docs/impact/` | [slug]-impact.md |
| role-research-developer | `user-docs/spikes/` | [name]-report.md |
| shared (legacy) | `user-docs/shared/` | Deprecated. Use **`memory/project-state.md`** (primary state). See `agent-system/MEMORY_SYSTEM.md`. |

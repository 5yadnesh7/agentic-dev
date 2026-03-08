# Agent behaviour for this repo

This project is an **autonomous dev system** — not just a prompt library. It uses a master agent (dev-supervisor) to enforce execution order and orchestrate skills.

## Master agent (the brain)

**For new projects, greenfield, or "build X":** Read `.cursor/agents/dev-supervisor.md` and become the dev supervisor. You orchestrate execution: call research → architecture → task plan → execute in explicit order. Do not describe; invoke each skill.

## Trigger policy: every skill is trigger-based

**Every skill** must be invokable by either:
1. **Direct trigger** — User uses an explicit prefix (e.g. `Idea:`, `Bug:`, `Review:`). Use **workflow-orchestrator** (or **dev-supervisor** for Idea/Project/Build).
2. **Intelligent trigger** — User says something in natural language. Use **workflow-skill-receiver**; it matches intent to a skill and invokes it.

When in doubt: if the user's message maps to a skill in SKILL_INDEX, invoke that skill (via orchestrator if direct trigger, via skill-receiver if no trigger). Do not require the user to know trigger names.

## How to run the workflow

- **Idea / Project / Build** (e.g. "build a SaaS for gym booking"): Read **`agents/dev-supervisor.md`**. Follow its execution order. Call each skill explicitly. Use `.cursor/workflows/new-project.workflow.md` for step sequence.
- **Other explicit trigger** (Workflow:, Planner:, Review:, Test:, etc.): use **workflow-orchestrator**. Read `agent-system/ORCHESTRATOR.md` and `agent-system/WORK_MANAGER.md` and run the mapped phases/agents.
- **No trigger** (e.g. "review my auth code", "get project summary"): use **workflow-skill-receiver**. Match the user message to `agent-system/SKILL_INDEX.md` (keywords, intent, domain) and run the matching skill.
- **Create a new skill** (e.g. "create a skill for X"): use **workflow-skill-creator**. Follow its criteria and add the skill to SKILL_INDEX.

## Execution

- **Parallel** when nothing blocks (independent tasks can advance together).
- **Sequential and wait** when a task Depends on another, or there is a user gate or blocker.

## Commit

- One commit per atomic unit. Use the project convention in `.cursor/commit-convention.md` if present; otherwise ask once and save it there.
- No WIP on main; no commits with failing tests.

## Standards

- Coding standards are in `.cursor/rules/` (React, Node, Python, Postgres, MySQL, SQL, MongoDB, Redis, Terraform). Apply the matching rule when editing files.
- Full role and workflow definitions: `agent-system/AGENTS.md`, `agent-system/QUICK_REFERENCE.md`.
- **Master agent:** `.cursor/agents/dev-supervisor.md`
- **Explicit workflows:** `.cursor/workflows/` (new-project, feature-development, bug-fix)

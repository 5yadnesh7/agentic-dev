# Agent behaviour for this repo

This project is an **autonomous dev system** — not just a prompt library. It uses a **3-tier invocation model**: direct skill, sub-agent, or CTO.

## 3-tier model

| Tier | User invokes | Routes to |
|------|--------------|-----------|
| **Skill** | `/bug`, `/spec`, `/arch-review` | Skill directly |
| **Sub-agent** | `/architect`, `/tester`, `/devops`, etc. | Agent → skills; CTO Critic at end |
| **CTO** | `/cto`, "help me", "I need" | CTO triages → sub-agents → delivery |

All agents in `.cursor/agents/` use YAML frontmatter (`name`, `description`) so Cursor recognizes them. Sub-agents: architect, worker, tester, researcher, planner, reviewer, devops, security, designer. Executives: cto, dev-supervisor.

## Master agents (executives)

- **dev-supervisor** — Greenfield, Idea:, Project:, Build:. Read `agents/dev-supervisor.md`.
- **cto** — Triage, assign via mcp_task to sub-agents, review. Never implement. Read `agents/cto.md`.

## Sub-agents

- `/architect`, `/worker`, `/tester`, `/researcher`, `/planner`, `/reviewer`, `/devops`, `/security`, `/designer`
- Each has `name`, `description` in frontmatter. Invoke via `/{name}` (e.g. `/architect`, `/tester`, `/cto`).

## Trigger policy: every skill is trigger-based

**Every skill** is invokable by either:
1. **Direct trigger** — Use **workflow-orchestrator** (or **dev-supervisor** for Idea/Project/Build, **cto** for triage).
2. **Intelligent trigger** — Use **workflow-skill-receiver**; match intent to SKILL_INDEX.

## How to run the workflow

- **Idea / Project / Build**: Read **`agents/dev-supervisor.md`**. Use `.cursor/workflows/new-project.workflow.md`.
- **CTO / "help me"**: Read **`agents/cto.md`**. CTO triages, assigns via mcp_task to sub-agents (never does implementation), reviews output.
- **Sub-agent** (e.g. `/architect`, `/tester`, `/devops`): Load agent from `.cursor/agents/<name>.md`, execute its skills.
- **Other trigger** (/planner, /review, /test, etc.): **workflow-orchestrator**.
- **No trigger**: **workflow-skill-receiver** → SKILL_INDEX.
- **Create skill**: **workflow-skill-creator**. Follow its criteria and add the skill to SKILL_INDEX.

## Execution

- **Research + Brainstorm mandatory** — For every new project, feature, or module: run Research (role-research-analyst) and Brainstorm (workflow-brainstorm) before Requirements. Do not skip.
- **Design-before-code** — Never start development until architecture, database schema (role-db-schema-engineer), and API design exist and are approved. Use `.cursor/checklists/new-project-checklist.md` to verify each step.
- **Full lifecycle** — Do not stop after Phase 1. Run all phases through Integration, Testing, Review, Sign-off. Every step is mandatory.
- **Parallel** when nothing blocks (independent tasks can advance together).
- **Sequential and wait** when a task Depends on another, or there is a user gate or blocker.

## Commit

- One commit per atomic unit. Use the project convention in `.cursor/commit-convention.md` if present; otherwise ask once and save it there.
- No WIP on main; no commits with failing tests.

## Standards

- Coding standards are in `.cursor/rules/`: `next-*.mdc`, `react-vite-*.mdc` (frontend); `express-*.mdc` (Node); `python-*.mdc`; `db-schema-*.mdc`, `db-mongodb.mdc`, `db-redis.mdc`; `terraform-*.mdc`; `playwright-*.mdc`. Apply the matching rule when editing files.
- Full role and workflow definitions: `agent-system/AGENTS.md`, `agent-system/QUICK_REFERENCE.md`. Handoff contracts: `agent-system/HANDOFF_CONTRACTS.md`.
- **Master agent:** `.cursor/agents/dev-supervisor.md`
- **Explicit workflows:** `.cursor/workflows/` (new-project, feature-development, bug-fix, refactor)

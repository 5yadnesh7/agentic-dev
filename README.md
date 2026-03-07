# Agentic Dev

Product-company workflow system with roles, skills, and phases. Uses **trigger-based** orchestration for idea-to-production lifecycle: research → brainstorm → product planning → UX → implementation → testing → release.

## Quick Start

- **Direct trigger** — Start with a prefix (e.g. `Idea: AI audiobook`, `Workflow: user login`, `Bug: login returns 500`, `Review: src/auth/`). The orchestrator routes to the mapped skill.
- **Natural language** — Say what you want (e.g. "review my code", "get project context", "write tests for login"). The skill-receiver matches intent and invokes the right skill.

Every skill is **trigger-based**: direct (prefix) or intelligent (intent match).

## Triggers

| Trigger | What runs |
|---------|-----------|
| `Idea:` / `Project:` / `Build:` | Full greenfield (Idea → Research → Brainstorm → PM → UX → …) |
| `Workflow: [feature]` | Full feature lifecycle |
| `Planner: [task]` | PRD + task board |
| `Bug: [desc]` | Find root cause, fix, test, commit |
| `Review: [target]` | Code + security review |
| `Test: [target]` | Jest + Playwright |
| `Explore:` | Project context |
| `GetContext:` | Full project context → `docs/project-context-full.md` |
| `Impact:` | After changes: find dependents, verify, fix or route to Junior/Senior |
| `Research:`, `Infra:`, `Doc:`, `API:`, `Auth:`, `Release:`, `Micro:`, `AI:`, `ML:` | See [QUICK_REFERENCE](agent-system/QUICK_REFERENCE.md) |

No prefix? The skill-receiver matches your intent to a skill and runs it.

## Project Structure

```
agent-system/           # Orchestrator source of truth
  ORCHESTRATOR.md       # Trigger map, commit rules, quality gate
  WORK_MANAGER.md       # Phases, task loop
  SKILL_INDEX.md        # Direct + intelligent triggers per skill
  QUICK_REFERENCE.md    # At-a-glance triggers and phases

.cursor/
  skills/               # Role and workflow skills (SKILL.md)
  rules/                # Coding standards (React, Node, Python, DB, etc.)

docs/                   # Project context, research, process logs
```

## Key Docs

- [AGENTS.md](AGENTS.md) — Agent behaviour, trigger policy
- [agent-system/ORCHESTRATOR.md](agent-system/ORCHESTRATOR.md) — Trigger map, commit rule
- [agent-system/WORK_MANAGER.md](agent-system/WORK_MANAGER.md) — Full phase list, task loop
- [agent-system/SKILL_INDEX.md](agent-system/SKILL_INDEX.md) — All skills, direct + intelligent triggers
- [PRODUCT-COMPANY-SETUP.md](PRODUCT-COMPANY-SETUP.md) — Detailed setup and workflow design

## Execution

- **Parallel** when nothing blocks
- **Sequential** when Depends, user gate, or blocker
- **Commit** after every atomic unit (one model, one endpoint, one test file, etc.)

## Testing

- **Jest** — Unit, integration, API
- **Playwright** — E2E, UI workflows

## License

MIT

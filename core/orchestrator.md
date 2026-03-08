# Core: Orchestrator

> **Central brain.** Without an orchestrator, skills run randomly.

## Responsibilities

1. **Read user request** — Parse intent, scope, constraints
2. **Determine workflow** — new-project, feature-dev, bug-fix, refactor
3. **Assign agents** — Planner, Architect, Worker, Critic, Tester
4. **Manage iteration loops** — Architect ↔ Reviewer; Worker ↔ Critic; Tester ↔ Coder
5. **Update project memory** — docs/project-memory.md, docs/project-brain.md after each phase

## Execution flow

```
user request
     ↓
orchestrator (dev-supervisor)
     ↓
research → assumption validation → roadmap
     ↓
planner agent → architect agent
     ↓
architecture review (Critic)
     ↓
task decomposition
     ↓
worker + critic loop (per task)
     ↓
tester (verify)
     ↓
result
```

## Source of truth

- `core/orchestrator-spec.md` — Stepwise execution logic, skill selection, validation
- `agent-system/ORCHESTRATOR.md` — Trigger map, commit rules, quality gate
- `.cursor/agents/dev-supervisor.md` — Master agent; executes this flow

# Core: Execution Engine

> **How work runs.** Parallel by default; sequential when blocking.

## Rules

1. **Parallel** — When nothing blocks (no Depends, no user gate)
2. **Sequential and wait** — When task B Depends on A; when user approval needed; when build/test fails
3. **Commit** — After every atomic unit (one model, one endpoint, one test file)
4. **No WIP on main** — Stash or branch
5. **No commit with failing tests**

## Loops

| Loop | When | Max iterations |
|------|------|----------------|
| Architect ↔ Reviewer | Architecture review finds issues | Until CLEAR |
| Worker ↔ Critic | Critic finds flaws in code | 2–3 |
| Tester ↔ Coder | Verify fails | Until pass |

## Source of truth

- `agent-system/WORK_MANAGER.md` — Phases, per-task loop
- `agent-system/ORCHESTRATOR.md` — Commit rule, quality gate

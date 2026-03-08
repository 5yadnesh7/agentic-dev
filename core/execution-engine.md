# Core: Execution Engine

> **How work runs.** Parallel by default; sequential when blocking.

## Rules

1. **Parallel** — When nothing blocks (no Depends, no user gate)
2. **Sequential and wait** — When task B Depends on A; when user approval needed; when build/test fails
3. **Commit** — After every atomic unit (one model, one endpoint, one test file)
4. **No WIP on main** — Stash or branch
5. **No commit with failing tests**
6. **Read state first** — Before acting, read `memory/project-state.md`; after acting, update it

## Loops

| Loop | When | Max iterations |
|------|------|----------------|
| Architect ↔ Reviewer | Architecture review finds issues | Until CLEAR |
| Worker ↔ Critic | Critic finds flaws in code | 2–3 |
| Tester ↔ Coder | Verify fails | Until pass |

## Error handling

| Condition | Action |
|-----------|--------|
| **Skill output invalid** (missing artifact, wrong format) | Retry up to 2 times with same skill |
| **After 2 retries** | Fallback skill if defined (e.g. workflow-project-spec → role-product-manager); else **ask user** |
| **`npm test` fails** | Loop back to Worker; do not commit |
| **Lint fails** | Fix and re-run; do not commit |
| **User gate** (e.g. spec approval) | Pause; ask user; resume on approval |

**Principle:** Never guess. Retry → fallback → ask user.

## Source of truth

- `core/orchestrator-spec.md` — Execution logic, skill selection, validation
- `agent-system/WORK_MANAGER.md` — Phases, per-task loop
- `agent-system/ORCHESTRATOR.md` — Commit rule, quality gate
- `.cursor/skills/skill-router.md` — Dynamic skill selection (intent, tags, domain)

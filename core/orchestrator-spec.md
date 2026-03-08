# Core: Orchestrator Execution Spec

> **Operational logic** for the orchestrator. Exact stepwise flow + error/retry.

## Execution logic (stepwise)

```
1. receive request
2. detect trigger (ORCHESTRATOR trigger map) or intelligent match (SKILL_INDEX)
3. select workflow (new-project | feature-dev | bug-fix | refactor)
4. execute skills sequentially (per workflow file)
5. validate output (per skill contract: expected artifacts exist, format correct)
6. on failure → retry (see Error handling)
7. update project memory (project-memory.md, project-brain.md after each phase)
```

## Skill selection logic

| Input | Action |
|-------|--------|
| Direct trigger (e.g. `Bug:`, `Idea:`) | Look up `agent-system/ORCHESTRATOR.md` → mapped skill |
| No trigger | `workflow-skill-receiver` matches message to SKILL_INDEX keywords |
| Ambiguous | Ask user: "Did you mean [A] or [B]?" |

## Validation (per skill)

- **Output** — Check skill contract: does produced artifact exist? (e.g. `docs/architecture.md`)
- **Format** — If schema defined (e.g. task file), validate structure
- **Tests** — If code changed, `npm test` must pass

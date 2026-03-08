# Core: Orchestrator Execution Spec

> **Operational logic** for the orchestrator. Exact stepwise flow + error/retry.

## Execution logic (stepwise)

```
1. receive request
2. detect trigger (ORCHESTRATOR trigger map) or intelligent match (skill-router + SKILL_INDEX)
3. select workflow (new-project | feature-dev | bug-fix | refactor)
4. execute skills sequentially (per workflow file)
5. validate output (per skill contract: expected artifacts exist, format correct)
6. on failure → retry (see Error handling)
7. update memory/project-state.md after each phase
```

## Skill selection logic

| Input | Action |
|-------|--------|
| Direct trigger (e.g. `Bug:`, `Idea:`) | Look up `agent-system/ORCHESTRATOR.md` → mapped skill |
| No trigger | `workflow-skill-receiver` + `.cursor/skills/skill-router.md`: match intent, tags, domain to SKILL_INDEX |
| Sub-step / ambiguous (e.g. "database schema") | Use skill-router to select best match from SKILL_INDEX |
| User intent unclear | Ask user: "Did you mean [A] or [B]?" |

## Validation (per skill)

| Check | Example |
|-------|---------|
| **Output exists** | Skill contract says `docs/architecture.md` → file exists |
| **Format** | Task file has Assign, Size, Depends, Acceptance Criteria |
| **Tests pass** | If code changed → `npm test` passes |
| **Lint passes** | `npm run lint` (if defined) |

## Memory update (after each phase)

- **Primary:** `memory/project-state.md` — Current Phase, Completed Tasks, Key Decisions, Lessons Learned
- **Optional:** `memory/agent-messages.md` — When handing off to another agent or requesting review

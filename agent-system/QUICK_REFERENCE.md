# QUICK REFERENCE — Triggers, skills, agents, phases

---

## Triggers

| Trigger | Agent(s) / Skill |
|---------|-------------------|
| `Idea:` / `Project:` / `Build:` | Full **greenfield** (Idea Agent → Research → Brainstorm → Product Manager → UI/UX → Project Manager → ... → 11) |
| `Workflow: [feature]` | Full lifecycle (orchestrator) |
| `Planner: [task]` | PM, Project Manager |
| `Bug: [desc]` | workflow-semantic-debugging (find + fix + test + commit) |
| `Review: [target]` | Code Reviewer, Security |
| `Test: [target]` | QA (Jest + Playwright) |
| `Research:` | role-research-analyst |
| `Explore:` | workflow-project-context |
| `GetContext:` | workflow-get-project-context (full context → docs/project-context-full.md) |
| `Auth:` | Auth Engineer, Security |
| `Impact:` | workflow-impact-analysis (after changes: check dependents, fix if broken) |
| `Infra:`, `Doc:`, `API:`, `Release:` | See ORCHESTRATOR |

**No direct trigger?** Use **workflow-skill-receiver** (intelligent trigger): match user intent to SKILL_INDEX and invoke the skill. Every skill is trigger-based: direct or intelligent.

---

## Phases (full lifecycle)

**Greenfield:** -2 Idea → -1 Research → 0.5 Brainstorm → 0.6 Product Planning → 0 Setup → 1 UX → 1b Project Manager (roadmap, tasks) → 2 Tech Design → 2a Documentation → 2b Content → 3 DB → 4 Task loop → 5 Integration → 6 Integration test (Jest + Playwright) → 6b Security → 7 Product review → 8 End consumer → 9 Docs → 10 PR → 11 Monitoring

**Feature:** 0 Setup → 1 UX → 1b Project Manager → 2 … → 10 PR

---

## Testing

**Jest** — Unit, integration, API.  
**Playwright** — E2E, UI, workflows.

---

## Execution

**Parallel** when nothing blocks. **Sequential and wait** when Depends, user gate, or blocker.

---

## Commit

One commit per atomic unit. Conventional Commits.

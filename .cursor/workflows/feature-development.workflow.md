# Workflow: Feature Development

> **Trigger:** `/workflow [feature]` or "add feature X" or "add module X" (module = feature; same flow)
>
> **Master agent:** Read `agents/dev-supervisor.md`. Execute steps in order.

---

## Explicit execution order

**The agent MUST follow this sequence. No step out of order.**

**Rule:** Research and Brainstorm are **mandatory** for every feature, module, or project. Do not skip.

| # | Step | Skill / Agent | Output |
|---|------|---------------|--------|
| 1 | Context | workflow-project-context (if brownfield) | `memory/project-state.md` (Structure & Patterns) |
| 2 | **Research** | role-research-analyst | `docs/user-docs/researcher/research-[feature].md` |
| 3 | **Brainstorm** | workflow-brainstorm | Feature ideas, variations, options |
| 4 | Requirements | role-product-manager | PRD, ACs for feature |
| 5 | Assumption validation | workflow-assumption-validation | Assumptions, risks, missing info for feature |
| 6 | Architecture | LLD / role-senior-engineer | Technical design |
| 7 | Database design | (if DB changes) | `docs/user-docs/architect/database.md` or migration spec |
| 8 | API design | (if API changes) | `docs/user-docs/architect/api.md` or endpoint spec |
| 9 | Frontend structure | role-ui-ux-designer (if UI) | Screens, flows, HTML/CSS mockups in mockups/ |
| 10 | Task plan | workflow-task-planner | `tasks/001-X.md`, `tasks/002-Y.md`, ... |
| 11 | Execute tasks | Per-task loop | Code, tests, commits |
| 12 | Integration | role-senior-engineer | Wire FE/BE |
| 13 | Test | role-senior-tester | Jest + Playwright |
| 14 | Review | workflow-code-review-pr | PR |

---

## How to run

1. **Activate** dev-supervisor
2. **Invoke** each step's skill in order (Research and Brainstorm are mandatory; do not skip)
3. **User gates** — UX approval before step 10 (Task plan)
4. **Update** `memory/project-state.md` after each phase

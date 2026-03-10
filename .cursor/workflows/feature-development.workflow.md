# Workflow: Feature Development

> **Trigger:** `Workflow: [feature]` or "add feature X"
>
> **Master agent:** Read `agents/dev-supervisor.md`. Execute steps in order.

---

## Explicit execution order

**The agent MUST follow this sequence. No step out of order.**

| # | Step | Skill / Agent | Output |
|---|------|---------------|--------|
| 1 | Context | workflow-project-context (if brownfield) | `memory/project-state.md` (Structure & Patterns) |
| 2 | Requirements | role-product-manager | PRD, ACs for feature |
| 3 | Assumption validation | workflow-assumption-validation | Assumptions, risks, missing info for feature |
| 4 | Architecture | LLD / role-senior-engineer | Technical design |
| 5 | Database design | (if DB changes) | `docs/database.md` or migration spec |
| 6 | API design | (if API changes) | `docs/api.md` or endpoint spec |
| 7 | Frontend structure | role-ui-ux-designer (if UI) | Screens, flows, HTML/CSS mockups in mockups/ |
| 8 | Task plan | workflow-task-planner | `tasks/001-X.md`, `tasks/002-Y.md`, ... |
| 9 | Execute tasks | Per-task loop | Code, tests, commits |
| 10 | Integration | role-senior-engineer | Wire FE/BE |
| 11 | Test | role-senior-tester | Jest + Playwright |
| 12 | Review | workflow-code-review-pr | PR |

---

## How to run

1. **Activate** dev-supervisor
2. **Invoke** each step's skill in order
3. **User gates** — UX approval before step 8
4. **Update** `memory/project-state.md` after each phase

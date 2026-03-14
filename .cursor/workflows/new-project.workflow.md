# Workflow: New Project

> **Trigger:** `/idea`, `/project`, `/build` or "build X"
>
> **Master agent:** Read `agents/dev-supervisor.md`. Collaborating agents with feedback loops.

**Checklist:** Use `.cursor/checklists/new-project-checklist.md` — verify each step before advancing. Do not skip steps.

---

## Design-before-code rule

**NEVER start development until design is complete.** Architecture, database schema, and API design must exist and be approved before any implementation. Database schema MUST be designed by **role-db-schema-engineer** — do not use a simple outline.

---

## Full lifecycle rule

**Do NOT stop after Phase 1 or any single phase.** Execute ALL phases until: all tasks done, integration tests pass, security test pass, product review approved, and sign-off obtained.

---

## Collaborative loops

**Architect ↔ Reviewer:**
```
Architect (design) → Reviewer (critique)
       ↑                     │
       └── if issues ────────┘
```

**Tester ↔ Coder** (per-task): Tester finds bug → Coder fixes → loop until pass.

---

## Explicit execution order

**The agent MUST follow this sequence. No step out of order. Every step is mandatory — do not skip.**

| # | Step | Skill / Agent | Output |
|---|------|---------------|--------|
| 1 | Research | role-research-analyst | `docs/user-docs/researcher/research-[idea].md` |
| 2 | Assumption validation | workflow-assumption-validation | Assumptions, risks, missing info |
| 3 | **Project roadmap** | workflow-project-roadmap | `docs/user-docs/planner/roadmap.md` — phased milestones |
| 4 | Brainstorm | workflow-brainstorm | Feature ideas, variations |
| 5 | Product spec | role-product-manager | `docs/user-docs/product-manager/product.md` |
| 6 | Architecture | workflow-project-spec (or LLD) | `docs/user-docs/architect/architecture.md` |
| 7 | **Database design** | **role-db-schema-engineer** (mandatory) | `docs/user-docs/db-schema-engineer/` — conceptual → logical → physical; user gates. **No backend until DONE.** |
| 8 | API design | (from spec) | `docs/user-docs/architect/api.md` |
| 9 | Architecture review | workflow-architecture-review | Reviewer critiques; if issues → revise 6–8, re-review until CLEAR |
| 10 | Frontend structure | role-ui-ux-designer (if UI) | Screens, flows, HTML/CSS mockups |
| 11 | Task plan | workflow-task-planner | `tasks/001-X.md` per roadmap phase |
| 12 | Execute ALL tasks | Engineers | Code, tests, commits — **ALL phases; do NOT stop after Phase 1** |
| 13 | Integration | role-senior-engineer | Wire FE/BE; full test run |
| 14 | Integration test | role-senior-tester | Jest + Playwright; all flows |
| 15 | Security test | role-security-engineer | Auth, authz, OWASP, dependency scan |
| 16 | Product review | role-product-manager | All PRD ACs met |
| 17 | End consumer | role-end-consumer | Cold-user simulation; satisfaction verdict |
| 18 | Sign-off | Quality gate | All passed → project DONE |

---

## Alternative: Project bootstrapping (one-shot)

User says: **"build a SaaS for gym booking"**

**Rule:** Research and Brainstorm are mandatory. Design before code. Full lifecycle — do not stop after Phase 1.

| # | Step | Skill | Output |
|---|------|-------|--------|
| 1 | Research | role-research-analyst | `docs/user-docs/researcher/research-[idea].md` |
| 2 | Brainstorm | workflow-brainstorm | Feature ideas, variations, options |
| 3 | Assumption validation | workflow-assumption-validation | Assumptions, risks, missing info |
| 4 | Project roadmap | workflow-project-roadmap | `docs/user-docs/planner/roadmap.md` — phased milestones |
| 5 | Full spec | workflow-project-spec | product, architecture, api, tasks (spec-first; user approval) |
| 6 | **Database design** | **role-db-schema-engineer** | `docs/user-docs/db-schema-engineer/` — mandatory; user gates |
| 7 | Architecture review | workflow-architecture-review | Reviewer critiques; if BLOCKED, Architect revises, re-review |
| 8 | Task files | workflow-task-planner | `tasks/001-X.md` per roadmap phase |
| 9 | Execute ALL tasks | Per-task loop | Implementation — **ALL phases** |
| 10 | Integration → Test → Review → Sign-off | role-senior-engineer, tester, security, product-manager, end-consumer | Project DONE |

---

## How to run

1. **Activate** dev-supervisor (`agents/dev-supervisor.md`)
2. **Use checklist** — `.cursor/checklists/new-project-checklist.md` — verify each step before advancing
3. **Choose** new-project (this workflow) or bootstrapping path
4. **Invoke** each step's skill in sequence — **every step mandatory**
5. **Do not skip** — execute in order; do not run step N+1 until step N is DONE
6. **Do not stop** — Continue through ALL phases until sign-off
7. **Update** `memory/project-state.md` after each phase (Current Phase, Completed Tasks, Key Decisions)

## Validation

- Each skill produces expected output per its contract (see `agent-system/SKILL_CONTRACT.md`)
- User gates: Product spec (Step 6) and UX (if applicable) require approval before task planning

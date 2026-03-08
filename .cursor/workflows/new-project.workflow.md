# Workflow: New Project

> **Trigger:** `Idea:`, `Project:`, `Build:` or "build X"
>
> **Master agent:** Read `agents/dev-supervisor.md`. Collaborating agents with feedback loops.

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

**The agent MUST follow this sequence. No step out of order.**

| # | Step | Skill / Agent | Output |
|---|------|---------------|--------|
| 1 | Research | role-research-analyst | `docs/research-[idea].md` |
| 2 | Assumption validation | workflow-assumption-validation | Assumptions, risks, missing info |
| 3 | **Project roadmap** | workflow-project-roadmap | `docs/roadmap.md` — phased milestones |
| 4 | Architecture | workflow-brainstorm → role-product-manager | High-level structure |
| 5 | Database design | (from product/architecture) | `docs/database.md` |
| 6 | API design | (from product/architecture) | `docs/api.md` |
| 7 | Architecture review | workflow-architecture-review | Reviewer critiques Architect output |
| 8 | **If issues → revise steps 5–6** | Architect revises; Reviewer re-checks | Loop until CLEAR |
| 9 | Frontend structure | role-ui-ux-designer | Screens, flows (if UI) |
| 10 | Task plan | workflow-task-planner | `tasks/001-X.md` per roadmap phase |
| 11 | Execute tasks | Engineers | Code, tests, commits (Tester↔Coder loop per task) |

---

## Alternative: Project bootstrapping (one-shot)

User says: **"build a SaaS for gym booking"**

| # | Step | Skill | Output |
|---|------|-------|--------|
| 1 | Assumption validation | workflow-assumption-validation | Assumptions, risks, missing info |
| 2 | Project roadmap | workflow-project-roadmap | `docs/roadmap.md` — phased milestones |
| 3 | Full spec | workflow-project-spec | product, architecture, database, api, tasks (spec-first; user approval) |
| 4 | Architecture review | workflow-architecture-review | Reviewer critiques; if BLOCKED, Architect revises, re-review |
| 5 | Task files | workflow-task-planner | `tasks/001-X.md` per roadmap phase |
| 6 | Execute | Per-task loop | Implementation |

---

## How to run

1. **Activate** dev-supervisor (`agents/dev-supervisor.md`)
2. **Choose** new-project (this workflow) or bootstrapping path
3. **Invoke** each step's skill
4. **Do not skip** — execute in order

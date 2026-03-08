---
name: workflow-project-roadmap
description: Project Roadmap Planning (PRP). Convert idea into phased development milestones before architecture. Lays the railway tracks before the train. Use for Roadmap:, "project roadmap", "phased plan".
tags: [strategic, planning, roadmap]
layer: strategic
---

# Workflow: Project Roadmap (PRP)

## Skill contract

| | |
|-|-|
| **Layer** | Strategic |
| **Input** | Idea; research, assumptions |
| **Output** | docs/roadmap.md (phased milestones) |
| **Dependencies** | Research, assumption validation |
| **Purpose** | Convert idea into phased milestones before architecture |

## Purpose

**Lay the railway tracks before the train.** Convert an idea into phased development milestones **before** architecture and coding. Prevents: building UI before backend, APIs without DB design, features before auth.

Run **after** Research and Assumption Validation, **before** Architecture Design.

## When to run

- **Trigger:** `Roadmap:`
- **User says:** "project roadmap", "phased plan", "development milestones"
- **Context:** After research + assumption validation; before architecture
- **Called by:** dev-supervisor early in new-project flow

## Output

`docs/roadmap.md` — Phased development strategy. Macro planning; task decomposition comes later.

## Step-by-step process

### 1. Read inputs

- Research output (`docs/research-[idea].md`)
- Assumption validation (`docs/assumption-validation-*.md`)
- Idea / product scope

### 2. Define phases (typical structure)

| Phase | Content | Example for gym booking SaaS |
|-------|---------|------------------------------|
| **1 — Foundation** | Project setup, repo structure, CI/CD, basic DB schema | init, config, DB schema |
| **2 — Core** | Auth, user management, main domain logic | auth, user roles, gym listing |
| **3 — Business logic** | Core product features | class scheduling, booking engine |
| **4 — Integration** | Payments, notifications | payment, email |
| **5 — UX & polish** | Frontend UI, caching, performance | UI, caching |
| **6 — Production** | Monitoring, logging, deployment | monitoring, deploy |

Adjust per project. Pure backend may skip UX phase.

### 3. Write docs/roadmap.md

```markdown
# Roadmap — [Project]

## Phase 1 — Foundation
- Project setup
- Repository structure
- CI/CD pipeline
- Basic database schema

## Phase 2 — Core Features
- Authentication
- User management
- [Main domain entities]

## Phase 3 — Business Logic
- [Core features from idea]

## Phase 4 — UX & Optimization
- Frontend UI
- Caching
- Performance

## Phase 5 — Production Readiness
- Monitoring
- Logging
- Deployment
```

### 4. Update project-brain

- Add roadmap summary to `docs/project-brain.md`
- Referenced by architecture and task decomposition

## Rules

- **Macro only** — Phases and high-level milestones; granular tasks come from workflow-task-planner
- **Order matters** — Foundation before Core; Auth before protected features
- **Feeds architecture** — Architecture is designed per phase; roadmap constrains it

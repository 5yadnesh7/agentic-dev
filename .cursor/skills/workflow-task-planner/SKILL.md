---
name: workflow-task-planner
description: Task decomposition. Produces tasks/001-X.md, tasks/002-Y.md from product/architecture/tasks spec. Use for Planner:, "decompose tasks", "create task files", "task plan".
tags: [strategic, planning, task-breakdown]
layer: strategic
---

# Workflow: Task Planner

## Purpose

Decompose a project into executable task files. Each task becomes a file in `tasks/` that agents then implement. **Roadmap + task tree:** Read `docs/roadmap.md` for phase order; map tasks to phases (Phase 1 → tasks 001–003, Phase 2 → 004–006, etc.).

## When to run

- **Trigger:** `Planner:`, after product/architecture spec
- **User says:** "decompose tasks", "create task plan", "task breakdown"
- **Context:** After `docs/product.md`, `docs/architecture.md`, `docs/tasks.md` (or equivalent) exist
- **Called by:** dev-supervisor as Step 8 (new project) or Step 7 (feature)

## Output

| File | Content |
|------|---------|
| `tasks/001-auth-system.md` | Auth task: ACs, Depends, Assign |
| `tasks/002-database.md` | DB task |
| `tasks/003-api.md` | API task |
| `tasks/004-ui.md` | UI task |
| ... | One file per task, numbered by execution order |

## Task file schema

```markdown
# Task 001 — [Title]
Assign: Junior | Senior
Size: XS | S | M | L
Sensitive: YES | NO
Depends: [task IDs or none]

## Goal
[One sentence: what this task achieves]

## Description
[One paragraph]

## Files to modify
- path/to/file1 — [purpose]
- path/to/file2 — [purpose]

## Acceptance Criteria
- [ ] AC 1
- [ ] AC 2

## Expected output
- [What should exist when done, e.g. "User model", "POST /auth/login endpoint", "LoginForm component"]

## Planned commits
- feat(scope): ...
- test(scope): ...
```

## Step-by-step process

### 1. Read input

- **Sources:** `docs/product.md`, `docs/architecture.md`, `docs/database.md`, `docs/api.md`, `docs/tasks.md` (if exists)
- **Checklist:** [ ] Inputs read; [ ] Scope clear

### 2. Determine task order

- Respect dependencies (e.g. DB before API before UI)
- Number: 001, 002, 003, ...
- **Checklist:** [ ] Order determined

### 3. Create tasks/ directory

- `mkdir -p tasks/` if missing

### 4. Write one file per task

- Format: `tasks/NNN-slug.md`
- Use schema above
- **Checklist:** [ ] All task files written

### 5. Update project memory

- Add task board to `docs/project-memory.md`
- **Checklist:** [ ] project-memory updated

## Example output structure

```
tasks/
  001-auth-system.md
  002-database.md
  003-api-users.md
  004-api-bookings.md
  005-ui-structure.md
  006-ui-booking-flow.md
```

## Rules

- One file per task
- Number by execution order (Depends respected)
- Assign Junior/Senior per WORK_MANAGER rules
- Agents execute tasks in order; skip if Depends not DONE

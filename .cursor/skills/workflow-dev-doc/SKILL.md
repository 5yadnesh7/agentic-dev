---
name: workflow-dev-doc
description: Temporary dev doc for in-progress task/phase. Reduces long context and hallucination. Create when task/phase starts; delete when DONE. Use during Phase 3–4 (implementation).
tags: [operational, context, task-scope]
layer: operational
---

# Workflow: Dev Doc (task-scoped context)

## Skill contract

| | |
|-|-|
| **Layer** | Operational |
| **Input** | Task file; files to modify, ACs |
| **Output** | .cursor/dev-docs/<TASK-ID>.md; deleted when task DONE |
| **Dependencies** | Task file |
| **Purpose** | Create temporary task context; reduce hallucination during implementation |

## Purpose

During development (Phases 3–4), create a **temporary dev doc** for the current task or phase that:
- Consolidates task info, file paths, and constraints in one place
- Reduces long context and hallucination by giving the agent a single, focused reference
- Is **deleted when the task or phase is DONE**

## When to run

- **Phase 3–4 (implementation)** — At the start of each task
- When a task has many files, complex dependencies, or risk of context overflow
- User asks to "create dev doc for task" or similar

## Step-by-step process

### Step 1: Create (when task starts)

| Action | Details |
|--------|---------|
| **Location** | `.cursor/dev-docs/[TASK-ID].md` (e.g. `BE-03.md`, `FE-01.md`) |
| **Read** | Task board, PRD, LLD for task details |
| **Fill** | Use template below; include files, ACs, constraints |

**Checklist:**
- [ ] File created at `.cursor/dev-docs/[TASK-ID].md`
- [ ] Task ID, title, Depends filled
- [ ] Files to create/modify listed
- [ ] Key constraints from project context
- [ ] API/interface if applicable

```markdown
# Dev Doc: Task [ID] — [Title]

> TEMPORARY — Delete when task DONE. For long-context and hallucination reduction.

## Task
- **ID:** [ID]
- **Title:** [Title]
- **Assign:** Junior / Senior
- **Depends on:** [task IDs]

## Description
[One paragraph from task board]

## Acceptance criteria
- [ ] [AC 1]
- [ ] [AC 2]
- [ ] Tests pass, lint clean, committed

## Files to create/modify
| Path | Action | Purpose |
|------|--------|---------|
| src/... | create | ... |
| src/... | modify | ... |

## Key constraints (from project context)
- [Constraint 1]
- [Constraint 2]

## API / interface (if applicable)
- Endpoint: POST /auth/login
- Request: { email, password }
- Response: { success, data: { token, user } }

## Relevant snippets (if any)
[Short, essential code or types — not full files]
```

### Step 2: Use during implementation

| Action | Details |
|--------|---------|
| **Reference** | Read `.cursor/dev-docs/[TASK-ID].md` before implementing |
| **Focus** | Use as single context; avoid re-reading full PRD/LLD |
| **Update** | If key decisions change mid-task, update the doc |

**Checklist:**
- [ ] Dev doc read at task start
- [ ] Implementation follows ACs and constraints in doc
- Agent reads this instead of re-reading PRD, LLD, and full project context
- Keeps context focused and reduces hallucination

### Step 3: Delete (when task DONE)

| Action | Details |
|--------|---------|
| **Trigger** | When task is marked ✅ DONE |
| **Delete** | `.cursor/dev-docs/[TASK-ID].md` |
| **Do not commit** | Dev docs are ephemeral; add to .gitignore if needed |

**Checklist:**
- [ ] Task marked DONE
- [ ] Dev doc file deleted
- Do not commit dev docs; they are ephemeral
- Add `.cursor/dev-docs/` to `.gitignore` if not already

---

## Per-phase dev doc (alternative)

For a whole phase (e.g. Phase 3: DB tasks), create one doc:

`.cursor/dev-docs/phase-3-db.md`

- Include all DB tasks, schema summary, migration order
- Delete when Phase 3 is complete

---

## Rules

- **One doc per task** (or one per phase if phase is small)
- **Do not commit** `.cursor/dev-docs/` — these are working files
- **Always delete** when task/phase is DONE
- **Keep content minimal** — pointers and constraints, not full code
- **Reference** `docs/project-context.md` for patterns; dev doc focuses on task specifics

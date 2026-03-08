---
name: workflow-context-md
description: For long tasks: creates .cursor/context/<task-id>.md with task context; deletes when task done. Use when context is large. For Phase 3–4 implementation tasks, prefer workflow-dev-doc.
tags: [operational, context, task-scope]
layer: operational
---

# Workflow: Context in MD, then cleanup

## Purpose

Offload task-specific context into a single Markdown file when the task has many files or long history. Reduces context limits and keeps the agent focused. **Delete when task is DONE.**

## When to run

- **Task has large context** — Many files, complex dependencies, risk of context overflow
- **User asks** — "create context doc for this task", "offload context"
- **Long-running task** — Context grows; need a single reference point

**Prefer workflow-dev-doc when:**
- Phase 3–4 implementation task (more structured: files to modify, ACs, API specs)
- Task has clear dev workflow (implement → test → commit)

**Use workflow-context-md when:**
- Non-implementation task (e.g. research, design, analysis)
- Generic context offload without dev-specific structure

## Decision: Context-md vs Dev-doc

| Use case | Skill | Why |
|----------|-------|-----|
| Phase 3–4 implementation | workflow-dev-doc | Has task ACs, files, API specs, constraints |
| Research, design, analysis | workflow-context-md | Generic context; no dev structure |
| Large multi-file refactor | workflow-context-md | Many files; need file summary table |
| User says "context doc" | workflow-context-md | Explicit request |

## Step-by-step process

### Step 1: Create context file

| Action | Details |
|--------|---------|
| **Location** | `.cursor/context/[task-id].md` |
| **Naming** | Task: `[TICKET]-[TASK-ID].md`; Generic: `[slug]-context.md` |

**Location:** `.cursor/context/[task-id].md` (e.g. `PROJ-101-BE-01.md`, `FE-02.md`, `research-auth-options.md`)

**Naming:**
- Task: `[TICKET]-[TASK-ID].md` or `[TASK-ID].md`
- Generic: `[slug]-context.md`

**Checklist:** [ ] File created; [ ] Name follows convention

### Step 2: Populate content

Include:
- Task ID, title, Depends
- Relevant file paths with 1–2 line summary each
- Key decisions, constraints
- Links to PRD, LLD, related docs

**Checklist:** [ ] Task ID, title, Depends; [ ] File table; [ ] Key decisions; [ ] Links

### Step 3: Use during task

- **Reference:** "Read .cursor/context/[task-id].md for context"
- Agent uses this as primary context instead of re-reading many files
- Update file if key decisions change during task

**Checklist:** [ ] Reference file in prompts; [ ] Update if decisions change

### Step 4: Delete when task DONE

| Action | Details |
|--------|---------|
| **When** | Task is marked ✅ DONE |
| **Action** | Delete `.cursor/context/[task-id].md` |
| **Commit** | Do not commit; context files are ephemeral |

- When task is marked ✅ DONE — Delete `.cursor/context/[task-id].md`
- Do not commit; context files are ephemeral

**Checklist:** [ ] Task DONE → delete file; [ ] Not committed

## Output template

```markdown
# Context: Task [ID] — [Title]

> TEMPORARY — Delete when task DONE.

## Task
- ID: [ID]
- Title: [Title]
- Depends: [task IDs]

## Relevant files
| Path | Summary |
|------|---------|
| src/auth/login.ts | Login handler; validates creds, returns token |
| src/models/User.ts | User model; email, passwordHash |
| tests/auth/login.test.ts | Login unit tests |

## Key decisions / constraints
- Use bcrypt for password hashing
- JWT access token, 15m TTL
- Refresh token in httpOnly cookie

## Links
- PRD: docs/prd-auth.md § 3.2
- LLD: docs/lld-auth-api.md
- Related: BE-02 (token refresh)
```

## Worked example

**Scenario:** Task PROJ-101-BE-03 (Add password reset). Many files involved.

**Create:** `.cursor/context/PROJ-101-BE-03.md` with file table, constraints from LLD, links to BE-01 (token utils) and BE-02 (email service).

**Use:** "Read .cursor/context/PROJ-101-BE-03.md before implementing."

**Delete:** When BE-03 is ✅ DONE.

## Rules

- **One file per task** — Name clearly
- **Do not commit** `.cursor/context/` — Add to .gitignore if needed
- **Always delete** when task complete
- **Update if needed** — If decisions change mid-task, update the file
- **For Phase 3–4 implementation** — Prefer workflow-dev-doc

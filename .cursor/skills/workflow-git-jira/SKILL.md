---
name: workflow-git-jira
description: Commit convention, branch naming, commits, Jira linking. Use when the user asks to commit, create branch, or link work to Jira. Follows .cursor/commit-convention.md.
tags: [operational, git, jira]
layer: operational
---

# Workflow: Git + Jira

## Skill contract

| | |
|-|-|
| **Layer** | Operational |
| **Input** | Commit message, branch name, Jira ticket (optional); .cursor/commit-convention.md |
| **Output** | Branch created; commit made; Jira linked (if applicable) |
| **Dependencies** | .cursor/commit-convention.md |
| **Purpose** | Consistent commits, branch naming, Jira linking |

## Purpose

Ensure consistent commits, branch naming, and (when applicable) Jira linking. Uses project commit convention. One atomic unit per commit.

## When to run

- **User asks** — "commit", "create branch", "link to Jira"
- **Before first commit** — Ensure commit convention exists (or invoke workflow-commit-convention)
- **Creating feature branch** — Use naming convention
- **Every commit** — Use convention from `.cursor/commit-convention.md`

## Step-by-step process

### Step 1: Commit convention (first time)

| Action | Details |
|--------|---------|
| **Check** | `.cursor/commit-convention.md` or `docs/user-docs/shared/commit-convention.md` |
| **If missing** | Invoke workflow-commit-convention (ask user, write file) |
| **If present** | Read and use for all commits |

**Checklist:** [ ] Convention file exists; [ ] Read before first commit

### Step 2: Branch naming

| Type | Pattern | Example |
|------|---------|---------|
| Feature | `feature/[TICKET]-[short-desc]` | `feature/PROJ-101-user-login` |
| Bugfix | `fix/[TICKET]-[short-desc]` | `fix/PROJ-102-login-validation` |
| Hotfix | `hotfix/[TICKET]-[desc]` | `hotfix/PROJ-103-critical-fix` |

Use ticket ID from context, PRD, or ask user. If Jira MCP available, fetch ticket.

**Checklist:** [ ] Branch name follows pattern; [ ] Ticket ID included if required

### Step 3: Commit rules

- **One commit per atomic unit** (see ORCHESTRATOR.md)
- **Message** from convention
- **Before commit:** Lint passes, tests pass
- **Stage:** Prefer `git add -p` or explicit paths; avoid `git add .` blindly
- **Never commit:** .env, node_modules, build artifacts, secrets, .cursor/dev-docs/

**Checklist:** [ ] Lint passes; [ ] Tests pass; [ ] One atomic unit; [ ] Message from convention

### Step 4: Jira (if MCP or manual)

- Link branch to ticket if workflow requires
- Include ticket ID in commit message if convention says so
- Transition ticket (In Progress → Done) per team process

**Checklist:** [ ] Branch linked to ticket (if required); [ ] Commit message includes ticket ID; [ ] Ticket transitioned (if team process)

## Commands reference

```bash
# Create branch
git checkout -b feature/PROJ-101-user-login

# Stage (prefer specific files)
git add src/auth/login.ts src/auth/login.test.ts

# Commit (use project convention)
git commit -m "feat(auth): add POST /auth/login endpoint"

# Or with Jira prefix
git commit -m "PROJ-101 feat(auth): add POST /auth/login endpoint"
```

## Atomic units (reminder)

| Unit | Commit when |
|------|-------------|
| One model file | File created + lint passes |
| One migration | Written |
| One endpoint | Handler + test green |
| One component | Renders, no errors |
| One test file | All tests green |

## Rules

- **No WIP** — No "wip", "fix stuff", "update"
- **No failing tests** — Fix before commit
- **One unit per commit** — Not multiple unrelated changes
- **Read convention** — Use project format every time

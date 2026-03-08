---
name: workflow-commit-convention
description: Asks user for commit message pattern once; saves to .cursor/commit-convention.md. Use when starting in a new project, user asks commit format, or no convention file exists.
tags: [operational, git, convention]
layer: operational
---

# Workflow: Commit Convention

## Skill contract

| | |
|-|-|
| **Layer** | Operational |
| **Input** | User preference or project needs |
| **Output** | .cursor/commit-convention.md |
| **Dependencies** | — |
| **Purpose** | Establish commit message convention for the project |

## Purpose

Establish and persist the project's commit message convention so all agents use the same format. Run once per project; thereafter read from file. Used by workflow-git-jira and all agents making commits.

## When to run

- **First prompt in project** — No convention file exists
- **User asks** — "What commit format?", "Set commit convention", "How should we format commits?"
- **No file found** — Neither `.cursor/commit-convention.md` nor `docs/commit-convention.md` exists

**Do not run when:**
- Convention file already exists (read and use it)
- User has not asked and file exists

## Step-by-step process

### Step 1: Check for existing convention

| Action | Details |
|--------|---------|
| **Paths** | `.cursor/commit-convention.md`, `docs/commit-convention.md` |
| **If found** | Read and use; do not ask again or overwrite |
| **If not found** | Proceed to step 2 |

**Checklist:** [ ] Paths checked; [ ] If found → use; [ ] If not → proceed

### Step 2: Ask user (once)

Present options:

> What commit message pattern should we use?
>
> 1. **Conventional Commits** — feat(scope):, fix(scope):, docs:, test(scope):, chore:
> 2. **Jira prefix** — PROJ-123 feat: message (ticket at start)
> 3. **Angular-style** — type(scope): subject; body optional
> 4. **Other** — Describe your pattern

**Checklist:** [ ] Options presented; [ ] User choice captured

### Step 3: Write convention file

Create `.cursor/commit-convention.md` based on user choice (see templates below).

**Checklist:** [ ] File created; [ ] Template applied

### Step 4: Confirm

"Saved to .cursor/commit-convention.md. All commits will use this format."

### Step 5: Edge cases

| User says | Action |
|-----------|--------|
| "Use default" / "Conventional" | Use Conventional Commits template |
| "Same as before" | Check git log; infer pattern; write file |
| "Jira" | Use Jira prefix template |
| Vague | Use Conventional Commits; note in file |

**Checklist:** [ ] Edge case handled per table

## Templates

### Option A — Conventional Commits

```markdown
# Commit Convention

Use Conventional Commits. Scope = area (auth, ui, db, api).

## Types
- feat(scope): new feature
- fix(scope): bug fix
- docs: documentation only
- test(scope): add or update tests
- refactor(scope): refactor, no behavior change
- chore: config, deps, tooling

## Examples
feat(auth): add login endpoint
fix(ui): correct button alignment
docs: update README
test(auth): add login unit tests
chore: add eslint config
```

### Option B — Jira prefix

```markdown
# Commit Convention

Start with Jira ticket: PROJ-XXX

Format: PROJ-XXX type: message

## Types
- feat: new feature
- fix: bug fix
- docs: documentation
- test: tests

## Examples
PROJ-101 feat: add login endpoint
PROJ-101 fix: correct validation
PROJ-102 docs: update API spec
```

### Option C — Angular-style (extended)

```markdown
# Commit Convention

Format: type(scope): subject

Optional body and footer.

## Types
feat, fix, docs, style, refactor, test, chore

## Scope
auth, ui, db, api, etc.

## Examples
feat(auth): add login endpoint

BREAKING CHANGE: login now requires email format
```

## Validation checklist

After writing file:
- [ ] File exists at `.cursor/commit-convention.md` or `docs/commit-convention.md`
- [ ] Types are listed
- [ ] At least 2 examples
- [ ] User confirmed (or default applied)

## Rules

- **Ask only once** — If file exists, never re-ask
- **Project-scoped** — Convention is per project
- **No overwrite** — Do not overwrite without user request
- **Consistent** — All agents read this file for commits

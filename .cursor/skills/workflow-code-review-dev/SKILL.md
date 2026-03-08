---
name: workflow-code-review-dev
description: Pre-commit code review. Reviews current changes against standards before commit. Use when the user asks to review current changes, pre-commit review, or review my code before I commit.
tags: [operational, code-review, pre-commit]
layer: operational
---

# Workflow: Code Review (pre-commit)

## Skill contract

| | |
|-|-|
| **Layer** | Operational |
| **Input** | Current diff (unstaged or staged); .cursor/rules |
| **Output** | Pre-commit review report (blocking/suggestions) |
| **Dependencies** | .cursor/rules for file types |
| **Purpose** | Review changes against standards before commit |

## Purpose

Review current (uncommitted or staged) changes against project standards before commit. Catch issues early. Ensure one atomic unit per commit with no blocking issues.

## When to run

- **User says:** "review my changes", "pre-commit review", "review before I commit", "review my code"
- **Scope:** Current diff, staged files, or modified files in context
- **Before commit** — Not for full PR; that is workflow-code-review-pr

## Step-by-step process

### Step 1: Get scope

- **Current diff:** `git diff` (unstaged) or `git diff --staged` (staged)
- **Modified files:** From context or user
- If unclear, assume all modified files in current session

**Checklist:** [ ] Diff obtained; [ ] Files listed

### Step 2: Apply project rules

For each file type, apply `.cursor/rules/`:
- Next.js: `next-*.mdc`
- React/Vite: `react-vite-*.mdc`
- Node/Express: `express-*.mdc`
- Python: `python-*.mdc`
- DB: `db-schema-postgres.mdc`, `db-schema-mysql.mdc`, `db-schema-sql.mdc`, `db-mongodb.mdc`, `db-redis.mdc`
- Terraform: `terraform-*.mdc`
- Playwright: `playwright-*.mdc`

**Checklist:** [ ] Rules applied per file type

### Step 3: Check categories

| Category | Check |
|----------|-------|
| **Logic** | Correct behavior; edge cases handled |
| **Error handling** | Try/catch; validation; user feedback |
| **Naming** | Clear, consistent; matches project style |
| **Tests** | New logic has tests |
| **Secrets** | No API keys, tokens, passwords |
| **Debug** | No console.log, debugger (or documented) |
| **Standards** | Follows .cursor/rules for file type |

**Checklist:** [ ] All categories checked per file

### Step 4: Categorize issues

- **BLOCKING:** Must fix before commit (bugs, security, standards violation)
- **SUGGESTION:** Nice to fix; not blocking

**Checklist:** [ ] Blocking vs suggestion clear; [ ] Each blocking has fix

### Step 5: Output report

## Report format

```
PRE-COMMIT REVIEW

Files: [list of reviewed files]

🔴 BLOCKING (fix before commit):
1. [Issue] at [file:line]
   Fix: [specific action]
2. [Issue] at [file:line]
   Fix: [specific action]

🟡 SUGGESTION:
1. [suggestion — optional improvement]

Result: ✅ APPROVED / 🔄 FIX BLOCKING ITEMS

Commit only when no blocking issues. One atomic unit per commit.
```

## Rules

- **Blocking = no commit** — Fix blocking issues first
- **One atomic unit** — Commit should be one logical change
- **No failing tests** — Ensure tests pass before commit
- **Specific fixes** — For each blocking issue, provide actionable fix

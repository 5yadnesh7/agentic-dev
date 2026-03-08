---
name: workflow-pr-generator
description: PR generator. Creates branch, commits, and PR description. Use for PR:, "open PR", "create PR", "generate PR".
tags: [operational, git, pr]
layer: operational
---

# Workflow: PR Generator

## Purpose

Create a branch, make commits (following atomic-unit rule), and generate a PR with title and description.

## When to run

- **Trigger:** `PR:`
- **User says:** "open PR", "create PR", "generate PR", "ready for PR"
- **Context:** After feature/bugfix work; before merge

## Step-by-step process

### 1. Ensure quality gate

- `npm test` — 0 failures
- `npm run lint` — 0 errors
- `npm run build` — 0 errors (if applicable)
- **Checklist:** [ ] All pass

### 2. Create/verify branch

- Use workflow-git-jira for branch naming
- Pattern: `feature/[TICKET]-[desc]` or `fix/[TICKET]-[desc]`
- **Checklist:** [ ] Branch exists and named correctly

### 3. Verify commits

- One atomic unit per commit
- Conventional Commits from `.cursor/commit-convention.md`
- Log readable: `git log --oneline origin/main..HEAD`
- **Checklist:** [ ] Commits clean; [ ] No WIP

### 4. Generate PR description

Structure:

```markdown
## Summary
[One paragraph: what this PR does]

## Changes
- [Bullet list of main changes]

## Testing
- [How to test; what was tested]

## Related
- [Ticket ID if applicable]
```

### 5. Open PR

- Use `gh pr create` or equivalent if available
- Otherwise: output PR title and description for user to paste

## Rules

- No PR with failing tests
- Rebase on main before opening
- Include ticket ID in title/description if convention requires

---
name: workflow-code-review-pr
description: Full PR/MR review: standards, tests, security, docs. Use when the user asks for PR review, MR review, or Review: trigger.
tags: [operational, code-review, pr]
layer: operational
---

# Workflow: Code review (PR/MR)

## When to run

- User says: "review this PR", "Review: src/auth/", "MR review"
- Before merge; after all tasks complete

## Step-by-step process

### 1. Understand scope

- Read PR title and description
- List all changed files
- Identify feature/fix purpose

### 2. Apply standards

- For each file type, apply the matching .cursor/rules:
  - `*.tsx` (Next.js) → next-*.mdc
  - `*.tsx` (React/Vite) → react-vite-*.mdc
  - `*.ts`, `*.js` (backend) → express-01-core.mdc, express-02-routes-services.mdc, express-03-middleware-auth.mdc, express-04-db-api.mdc, express-05-quality.mdc, express-06-ops.mdc
  - `*.py` → python-01-core.mdc, python-02-structure.mdc, python-03-api-services.mdc, python-04-quality.mdc, python-05-ops.mdc
  - migrations, schema → db-schema-postgres / mysql / sql / mongodb
  - `*.tf` → terraform-01-core.mdc, terraform-02-modules.mdc, terraform-03-state-providers.mdc, terraform-04-patterns.mdc, terraform-05-ops.mdc

### 3. Check logic and ACs

- Does the code implement what the PR description says?
- Are all acceptance criteria met?
- Edge cases and error paths covered?

### 4. Check tests

- Are there tests for new/changed logic?
- Do tests verify behavior, not implementation?
- Coverage adequate for critical paths?

### 5. Security (if auth/payment/PII/external API)

- Run role-security-engineer checklist (OWASP, auth rules)
- No secrets, no injection, no broken access control

### 6. Docs and changelog

- README/API docs updated if needed?
- CHANGELOG updated for user-facing changes?

## Report format

```markdown
# PR REVIEW — [PR title/branch]

## Scope
- Purpose: [one line]
- Files changed: [list]

## Standards
- [ ] React/Next (if applicable): [pass/fail + notes]
- [ ] Node/Express (if applicable): [pass/fail + notes]
- [ ] DB (if applicable): [pass/fail + notes]
- [ ] Other: [pass/fail + notes]

## Logic and ACs
- [ ] Implements described behavior
- [ ] Edge cases handled
- [ ] Errors handled

## Tests
- [ ] Tests present for new logic
- [ ] Tests pass
- [ ] Coverage adequate

## Security (if applicable)
- [ ] OWASP / auth checks
- [ ] No secrets, no injection

## Docs
- [ ] Updated if needed

---

🔴 BLOCKING (must fix before merge):
1. [Issue] — [file:line]
   Fix: [specific action]
2. ...

🟡 SUGGESTIONS (not blocking):
1. [suggestion]
2. ...

Result: ✅ APPROVED / 🔄 CHANGES REQUESTED
```

## Step checklists

**Step 1 — Scope:** [ ] PR title/desc read; [ ] Changed files listed; [ ] Purpose clear  
**Step 2 — Standards:** [ ] Rules applied per file type; [ ] Pass/fail per area  
**Step 3 — Logic:** [ ] Matches PR description; [ ] ACs met; [ ] Edge cases handled  
**Step 4 — Tests:** [ ] Tests for new logic; [ ] Tests pass; [ ] Coverage adequate  
**Step 5 — Security:** [ ] OWASP checked (if applicable); [ ] No secrets; [ ] Auth correct  
**Step 6 — Docs:** [ ] README/API updated if needed; [ ] CHANGELOG if user-facing

## Rules

- **Blocking = no merge** — Fix all blocking issues before merge
- **Specific fixes** — Each blocking issue: file:line + exact fix
- **Security first** — Auth, payments, PII require security check
- **Suggestions optional** — Non-blocking; author may choose to address

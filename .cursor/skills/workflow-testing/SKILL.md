---
name: workflow-testing
description: Unit and E2E testing with Jest and Playwright only. Use when the user asks for unit tests, E2E tests, regression, or Test: trigger. Routes to Junior/Mid/Senior tester by scope.
tags: [operational, testing, jest, playwright]
layer: operational
---

# Workflow: Testing

## Skill contract

| | |
|-|-|
| **Layer** | Operational |
| **Input** | Target (file, path, feature); project test setup |
| **Output** | Tests (Jest, Playwright); coverage report |
| **Dependencies** | Project testing tools (Jest, Playwright) |
| **Purpose** | Unit and E2E testing; route by scope to Junior/Mid/Senior tester |

## Tools (use only)

- **Jest** — Unit tests, integration tests, API tests, component tests
- **Playwright** — E2E tests (UI behavior, user workflows, cross-browser)

Do not use Vitest or other test runners unless the project already uses them.

## When to run

- **User says:** "add tests", "unit tests", "E2E tests", "regression", "Test: [target]"
- **Per-task loop Step 3** — Unit test for a task
- **Phase 6** — Integration test for a feature

## Routing by scope

| Scope | Role | Tools |
|-------|------|-------|
| Single file, function, component | role-junior-tester | Jest |
| Feature, multiple files, ACs | role-mid-tester | Jest + Playwright |
| Strategy, regression, coverage | role-senior-tester | Jest + Playwright |
| Full feature integration | role-senior-tester | Playwright |

## What to verify

| Tool | Verifies |
|------|----------|
| **Jest** | Unit logic, API responses, edge cases, component behavior, utils |
| **Playwright** | UI behavior, user workflows, happy/error paths, cross-page flows |

## Step-by-step process

### Step 1: Identify scope

| Action | Details |
|--------|---------|
| **Parse request** | Single file/function → Junior; feature/ACs → Mid; strategy/regression → Senior |
| **Route** | Load matching role (junior/mid/senior tester) |
| **Clarify** | If scope unclear, ask user or assume smallest (Junior) |

**Checklist:**
- [ ] Scope identified (file / feature / strategy)
- [ ] Correct role selected

### Step 2: Run existing tests

| Action | Command / Check |
|--------|-----------------|
| **Jest** | `npm test` or `npx jest` |
| **E2E** | `npx playwright test` |
| **Baseline** | All existing tests must pass before adding new tests |

**Checklist:**
- [ ] `npm test` runs
- [ ] Baseline green (0 failures)
- [ ] If failures exist, fix or report before adding tests

### Step 3: Add or update tests

| Tool | Action |
|------|--------|
| **Jest** | Mirror project test structure; describe/it; same assertions |
| **Playwright** | Follow UX spec flows; happy path + error path |
| **Run after change** | Re-run tests; ensure green before proceeding |

**Checklist:**
- [ ] Tests added for new/changed logic
- [ ] Tests follow project patterns
- [ ] `npm test` passes after changes
- [ ] Coverage (if run) ≥80% lines for new code

### Step 4: Report

- Passed/total, coverage if available
- Failures → map to owning task; re-open if needed
- Use report template below

### Step 5: On failure

| Action | Details |
|--------|---------|
| **Fix** | Address failure (code or test) |
| **Commit** | `fix(scope):` or `test(scope):` |
| **Re-run** | Until all pass |
| **Rule** | No commit with failing tests |

## Commands

| Command | Purpose |
|---------|---------|
| `npm test` | Run Jest |
| `npm run test:coverage` | Jest with coverage |
| `npx playwright test` | Run Playwright E2E |
| `npx playwright test --ui` | Playwright UI mode |

Document commands used in report.

## Report template

```
TEST REPORT — [Task/Feature]
Scope: [unit / integration / E2E]
Tools: Jest / Playwright

Tests: [N] passed / [N] total
Coverage: [N]% lines / [N]% branches (if applicable)

Result: ✅ PASS / ❌ FAIL

FAILURES: [list with owning task]
```

## Rules

- **Jest + Playwright only** — No Vitest unless project already uses it
- **Baseline first** — Existing tests must pass before adding
- **No commit with failing tests** — Fix or re-open task; never commit red
- **Coverage** — Aim ≥80% lines for new code (per ORCHESTRATOR quality gate)
- **Route by scope** — Junior for single unit; Mid for feature; Senior for strategy

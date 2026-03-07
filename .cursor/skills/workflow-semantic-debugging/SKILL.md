---
name: workflow-semantic-debugging
description: Semantic debugging: find root cause and implement fix end-to-end. Use for Bug: trigger, debugging, or when user reports a bug. Finds, fixes, adds regression test, verifies, commits.
---

# Workflow: Semantic Debugging

## Purpose

**Find and fix** bugs end-to-end using semantic analysis. Understand what the code means, trace execution, identify root cause, **implement the fix**, add regression test, verify, and commit. Complete debugging workflow—no handoff; do all fixes yourself.

## When to run

- **Trigger:** `Bug: [description]` (e.g. "Bug: login returns 500", "Bug: cart total wrong")
- **User says:** "debug", "fix this bug", "why is X failing?", "investigate and fix error"

## End-to-end process (find → fix → test → verify → commit)

### Step 1: Reproduce the bug

| Action | Details |
|--------|---------|
| **Gather** | Error message, stack trace, steps to reproduce from user |
| **Reproduce** | Run the failing flow: `npm test`, manual steps, or API call |
| **Capture** | Exact error message, stack trace, line number |
| **Scope** | Identify affected files: entry point, failure point, call chain |

**Checklist:**
- [ ] Error message captured
- [ ] Stack trace (if any) captured
- [ ] Steps to reproduce documented
- [ ] Affected file(s) and function(s) identified

---

### Step 2: Semantic analysis (understand intent)

| Question | Answer |
|----------|--------|
| **What should the code do?** | Expected behavior from spec, AC, API contract, or function name |
| **What does it actually do?** | Trace execution; identify where behavior diverges |
| **Where does it go wrong?** | Exact line, condition, or data path |

**Trace execution flow:**
1. **Entry point** — API handler, event handler, or test
2. **Call chain** — Function A → B → C → failure
3. **Data flow** — How input propagates; where it mutates or becomes invalid
4. **Control flow** — Which branches are taken; which condition fails
5. **Dependencies** — DB, external API, env—could they return null/wrong?

---

### Step 3: Identify root cause

| Root cause category | Examples |
|---------------------|----------|
| **Logic error** | Wrong formula, wrong condition, inverted boolean |
| **Null/undefined** | Accessing property of null; missing optional chaining |
| **Type mismatch** | String vs number; wrong shape from API |
| **Off-by-one** | Loop boundary; array index |
| **Wrong condition** | `>` vs `>=`; `&&` vs `||` |
| **Config/env** | Missing env var; wrong default |
| **Race/async** | Missing await; callback ordering |
| **State** | Stale closure; wrong initial state |

**Output:** Single root cause (not symptoms) + file:line + one-sentence description.

---

### Step 4: Implement the fix

| Action | Details |
|--------|---------|
| **Edit** | Apply fix in the correct file at the identified location |
| **Minimal change** | Fix only what's broken; don't refactor unrelated code |
| **Follow project patterns** | Match existing style, error handling, naming |
| **Preserve behavior** | Don't change correct code paths |

**Verification:**
- [ ] Fix addresses root cause
- [ ] No new lint errors
- [ ] Fix is minimal and targeted

---

### Step 5: Add regression test

| Action | Details |
|--------|---------|
| **Create test** | Add test that would have caught this bug |
| **Location** | Same file or adjacent test file (follow project pattern) |
| **Use Jest** | Unit/integration (per project testing rules) |
| **Test** | Failing case before fix; passing after fix |

**Test structure:**
```ts
it('handles [bug scenario] - regression for [bug id]', () => {
  // Arrange: setup that triggers the bug
  // Act: perform the action
  // Assert: expect correct behavior
});
```

**Checklist:**
- [ ] Test fails without the fix (or would have failed before)
- [ ] Test passes with the fix
- [ ] Test is in the right place (project convention)

---

### Step 6: Verify

| Action | Command / Check |
|--------|-----------------|
| **Run tests** | `npm test` — all pass |
| **Run lint** | `npm run lint` — 0 errors |
| **Manual check** | If applicable: reproduce original steps; bug is gone |
| **No regressions** | Existing tests still pass |

**Checklist:**
- [ ] `npm test` passes
- [ ] `npm run lint` passes
- [ ] Bug no longer reproducible
- [ ] No new failures

---

### Step 7: Commit

| Commit | Message | Contents |
|--------|---------|----------|
| 1 | `fix(scope): [bug description]` | The fix |
| 2 | `test(scope): add regression for [bug]` | The regression test |

**Rules:**
- Two commits: fix first, then test (or one if project prefers)
- Use project commit convention
- Do not commit with failing tests

---

## Output format (Debug Report)

Produce `docs/debug/[bug-slug]-report.md` (optional, for record):

```markdown
# Semantic Debug Report — [Bug description]

## Reproduction
- **Steps:** 1. ... 2. ... 3. ...
- **Error:** [exact message]
- **Expected:** [what should happen]
- **Actual:** [what happened]

## Root cause
- **Category:** [Logic | Null | Type | ...]
- **Cause:** [one sentence]
- **Location:** [file:line]

## Fix applied
- **File:** [path]
- **Change:** [brief description]

## Regression test
- **File:** [path]
- **Test:** [description]

## Verification
- [x] Tests pass
- [x] Lint passes
- [x] Bug fixed
- [x] Committed
```

---

## Rules

- **Find and fix** — Do the full workflow; do not hand off. Implement fix yourself.
- **Root cause only** — Fix the underlying cause, not symptoms.
- **Reproduce first** — Don't guess; reproduce before changing code.
- **Minimal fix** — Smallest change that fixes the bug.
- **Regression test** — Every fix must have a test that would have caught it.
- **No commit with failing tests** — Verify before commit.
- **Two commits** — `fix(scope):` and `test(scope):` (or per project convention).

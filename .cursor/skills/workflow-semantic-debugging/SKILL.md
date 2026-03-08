---
name: workflow-semantic-debugging
description: Semantic debugging: find root cause and implement fix end-to-end. Use for Bug: trigger, debugging, or when user reports a bug. Finds, fixes, adds regression test, verifies, commits.
tags: [operational, debugging, bug-fix]
layer: operational
produces: [docs/debug/[slug]-report.md]
required_context: [memory/project-state]
---

# Workflow: Semantic Debugging

## Skill contract

| | |
|-|-|
| **Layer** | Operational (execution) |
| **Input** | Bug description, error message, stack trace, steps to reproduce |
| **Output** | Fix committed; regression test; `docs/debug/[slug]-report.md` (optional) |
| **Dependencies** | memory/project-state.md (read first); memory/agent-messages.md (if handoff) |
| **Purpose** | Find root cause, implement fix, add regression test, verify, commit |

## Purpose

**Find and fix** bugs end-to-end using semantic analysis. Implements the **Tester ↔ Coder** feedback loop: Tester finds bug → Coder fixes → Tester verifies → (if fail) back to Coder. Complete debugging workflow—no handoff; do all fixes yourself.

## Collaborative loop (Tester ↔ Coder)

```
Coder (implement) → Tester (verify)
       ↑                    │
       └── if bug found ────┘
```

**If verify fails:** Loop back to Step 4 (Implement fix). Do not proceed to commit until all checks pass.

---

## Dual-Brain (Worker ↔ Critic)

```
Worker (implement fix) → Critic (review fix)
       ↑                         │
       └── if issues found ──────┘
```

**Worker** produces the fix. **Critic** finds flaws (logic, security, edge cases). Worker revises; Critic re-checks. Usually 2–3 loops. Assume production, 1M users — identify all risks.

## Stateful reasoning (every run)

```
read state → think → act → update state
```

**Do not run without state.** Agents without persistent state become inconsistent and forget previous decisions.

| Step | Action |
|------|--------|
| **Read** | `memory/project-state.md` (primary; if exist) |
| **Think** | Steps 1–3 (reproduce, analyze, root cause) |
| **Act** | Steps 4–7 (fix, test, verify, commit) |
| **Update** | After commit: `memory/project-state.md` (completed fix, lessons learned) |

## When to run

- **Trigger:** `Bug: [description]` (e.g. "Bug: login returns 500", "Bug: cart total wrong")
- **User says:** "debug", "fix this bug", "why is X failing?", "investigate and fix error"

## End-to-end process (find → fix → test → verify → commit)

### Step 0: Read state

- **Read** `memory/project-state.md` — stack, architecture, decisions, lessons learned, structure
- **Checklist:** [ ] State loaded; [ ] Context understood

---

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

### Step 2.5: Generate hypothesis

**Do not guess; form hypotheses from evidence.**

| Action | Details |
|--------|---------|
| **List possible causes** | e.g. "API response empty", "state initialization missing", "undefined in array access" |
| **Rank by likelihood** | Based on stack trace, data flow, common patterns |
| **Narrow** | Trace to confirm or reject each; pick the one that fits |

**Example reasoning:**
> Error: Cannot read property 'map' of undefined  
> Possible causes: API response empty; state initialization missing; optional chaining needed  
> Suggested fix: Add default array fallback or guard before .map

**Checklist:** [ ] At least one hypothesis formed; [ ] Trace to confirm before fixing

---

### Step 3: Identify root cause

**Question your assumptions.** What was assumed that might be wrong? (e.g. "API always returns array" → it returns null; "user exists" → user deleted.)

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

**Optional: Proposed-fix critique.** Before editing, ask: Would this fix cause other issues? Is there a simpler approach? (Mimics Reviewer challenging Coder.)

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

### Step 4.5: Critic review (Worker–Critic loop)

**After Worker produces fix, Critic reviews before regression test.**

| Critic checks | Examples |
|---------------|----------|
| Logical errors | Edge case missed? Wrong condition? |
| Security | Input validation? Secrets? Injection? |
| Architecture | Violates patterns? Breaks boundaries? |
| Performance | N+1? Missing index? |

**Instruction for Critic:** Assume production, 1M users. Find flaws; don't praise. Provide actionable corrections.

**Loop:** If Critic finds issues → Worker revises → Critic re-checks. Max 2–3 iterations.

**Checklist:** [ ] Critic pass complete; [ ] No blocking issues (or fixes applied)

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
| **Verify impact** | Check dependents: does fix break callers? Use workflow-impact-analysis if many files |
| **No regressions** | Existing tests still pass; no new failures |

**Verify impact:** If fix touches shared code (utils, models, hooks), trace callers and run related tests. For large changes, run full test suite and consider `Impact:` to find dependents.

**Checklist:**
- [ ] `npm test` passes
- [ ] `npm run lint` passes
- [ ] Bug no longer reproducible
- [ ] Impact verified (no broken dependents)
- [ ] No new failures

**Feedback loop:** If any check fails → loop back to Step 4 (Implement fix). Revise fix, re-run tests, re-verify. Do not commit until all pass.

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

### Step 8: Update state

**Every agent updates state after acting.** Without this, the next run has no context.

| File | What to update |
|------|----------------|
| `memory/project-state.md` | Add bug fix to Completed Tasks; add to Lessons Learned if reusable; update Key Decisions if architecture changed |

**Checklist:** [ ] project-state updated

---

### Step 9: Self-evolving skills (optional)

**If the fix reveals a reusable playbook** (e.g. JWT auth setup, Redis cache, Stripe integration) and this pattern has been done 2+ times (check `docs/dev-lessons.md` or process-log):

1. **Invoke workflow-skill-creator** — Summarize the solution, convert to reusable instructions
2. **Save as new skill** — e.g. `skills/jwt-auth-setup.md`, `skills/redis-cache.md`
3. **Add tags** — `tags: [auth, backend, node]` for discovery by task type, technology, domain

**Evolution loop:** solve problem → extract knowledge → create skill → reuse next time.

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

## Project state (stateful reasoning)

- **Read at start (Step 0):** memory/project-state.md
- **Update at end (Step 8):** memory/project-state.md (completed fix, lessons, decisions)

## Self-evolving skills

If the fix is a **reusable playbook** done 2+ times → invoke **workflow-skill-creator** to create a new skill. System improves over time.

## Rules

- **Find and fix** — Do the full workflow; do not hand off. Implement fix yourself.
- **Root cause only** — Fix the underlying cause, not symptoms.
- **Reproduce first** — Don't guess; reproduce before changing code.
- **Minimal fix** — Smallest change that fixes the bug.
- **Regression test** — Every fix must have a test that would have caught it.
- **No commit with failing tests** — Verify before commit.
- **Feedback loop** — If verify fails, loop back to implement fix; do not advance.
- **Two commits** — `fix(scope):` and `test(scope):` (or per project convention).

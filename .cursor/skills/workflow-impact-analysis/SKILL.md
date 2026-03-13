---
name: workflow-impact-analysis
description: After changes: find direct and indirect dependents, check if anything is hampered, invoke Junior/Senior Engineer or other skills to fix. Use for Impact: trigger, after changes, check dependents, ripple effect.
tags: [operational, impact, dependents]
layer: operational
---

# Workflow: Impact Analysis (Change Propagation)

## Skill contract

| | |
|-|-|
| **Layer** | Operational |
| **Input** | Changed file(s) or path; codebase |
| **Output** | Dependents list; verification result; fixes if needed |
| **Dependencies** | project-context |
| **Purpose** | Find dependents after changes; verify and fix broken callers |

## Purpose

**Run after changes** to find all direct and indirect dependents, verify nothing is broken, and fix any hampered code. When something changes (function, API, schema, module), identify what else may be affected, run tests, and—if issues exist—invoke the right role (Junior/Senior Engineer, Tester, etc.) to handle fixes. Ensures the codebase stays consistent.

## When to run

- **Trigger:** `Impact:` (e.g. "Impact:", "Impact: src/auth/tokens.ts")
- **After changes** — User or agent made edits; run to verify no dependents are broken
- **User says:** "check impact of my changes", "did my change break anything?", "find and fix dependents", "ripple effect", "check everything is fine"

## End-to-end process (identify → verify → fix)

### Step 1: Identify change point

| Action | Details |
|--------|---------|
| **Change point** | File, function, type, API, schema, config, or module that changed |
| **Source** | `git diff`, staged files, user-provided paths, or last commit |
| **Scope** | What exactly changed (rename, signature, return type, schema field, etc.) |

**Checklist:**
- [ ] Change point identified (file + symbol or path)
- [ ] Type of change documented (rename, signature, schema, move, etc.)

---

### Step 2: Find direct dependents

| Action | Details |
|--------|---------|
| **Imports** | Files that import the changed module |
| **Callers** | Code that calls the changed function or uses the type |
| **References** | Grep, IDE find references, TypeScript references |
| **API clients** | If API changed: clients, handlers, tests |
| **Schema consumers** | If schema changed: models, migrations, queries |

**Commands:** `rg "symbol|import path"`, `tsc --noEmit` (TypeScript), search for symbol name.

**Checklist:**
- [ ] Direct dependents listed (file:line or file:function)
- [ ] No obvious dependents missed

---

### Step 3: Find indirect dependents

| Action | Details |
|--------|---------|
| **Transitive** | What uses the direct dependents? (callers of callers) |
| **Tests** | Test files that cover the changed code or dependents |
| **Integrations** | Services, scripts, or configs that depend on the change |
| **Depth** | Go 1–2 levels deep; stop when impact is negligible |

**Checklist:**
- [ ] Indirect dependents listed
- [ ] Test files for affected code identified

---

### Step 4: Verify (is everything fine?)

| Action | Command / Check |
|--------|-----------------|
| **Build** | `npm run build` or equivalent — 0 errors |
| **Lint** | `npm run lint` — 0 errors |
| **Tests** | `npm test` — all pass |
| **Type check** | `tsc --noEmit` (if applicable) — 0 errors |

**Checklist:**
- [ ] Build passes
- [ ] Lint passes
- [ ] Tests pass
- [ ] No type errors

**If all pass → Done.** No further action. Produce brief report: "Impact: no issues found."

---

### Step 5: If not fine — classify and route

When build, lint, or tests fail:

| Issue type | Route to | Rationale |
|------------|----------|-----------|
| **Simple fix** — Rename, import path, single call site | role-mid-engineer or role-junior-tester | Straightforward update |
| **Tests fail** — New or updated tests needed | role-junior-tester or role-mid-tester | Test update |
| **Logic broken** — Behavior wrong, bug introduced | workflow-semantic-debugging | Full bug fix flow |
| **Complex** — Cross-layer, auth, payments, architecture | role-senior-engineer | Needs design or careful fix |
| **Security** — Auth, PII, injection | role-security-engineer | Security review |

**Routing rules:**
- **Junior/Mid** — Single file, simple updates (imports, renames, type fixes)
- **Senior** — Cross-layer, auth, payments, unclear architecture
- **Semantic debugging** — Actual bug (wrong behavior), not just broken references
- **Tester** — Tests need update (mock, assertions, coverage)

**Checklist:**
- [ ] Failures classified
- [ ] Appropriate skill/role selected per table

---

### Step 6: Invoke handling skill

| Action | Details |
|--------|---------|
| **Load skill** | Read `.cursor/skills/<skill-name>/SKILL.md` |
| **Pass context** | Change point, list of affected files, error/output from verify step |
| **Execute** | Run the skill's process (implement, test, fix, etc.) |
| **Re-verify** | After fix: run Step 4 again |
| **Loop** | If still failing, re-classify and route; fix until all pass |

**Example handoff to role-mid-engineer:**
> "Change point: `src/auth/tokens.ts` — renamed `generateToken` to `generateAccessToken`. Affected: `src/auth/login.ts` (line 12), `tests/auth/tokens.test.ts`. Build fails at login.ts. Please update callers and tests."

**Checklist:**
- [ ] Skill invoked with clear context
- [ ] Re-verify after fix
- [ ] All pass or escalate

---

### Step 7: Report and commit

| Action | Details |
|--------|---------|
| **Report** | Produce impact report (see Output format) |
| **Commit** | Fixes committed per workflow-git-jira (one atomic unit per commit) |
| **Rule** | No commit with failing tests |

**Checklist:**
- [ ] Impact report produced
- [ ] All fixes committed (or user informed if not committed)

---

## Output format (Impact Report)

Produce `docs/user-docs/impact/[change-slug]-impact.md`. Create docs/user-docs/impact/ if not exist (optional):

```markdown
# Impact Analysis — [Change description]

## Change point
- **File:** [path]
- **Change type:** [rename / signature / schema / move / etc.]
- **What changed:** [brief description]

## Dependents
### Direct
| File | Usage |
|------|-------|
| [path] | [import / call / type] |
| [path] | [import / call / type] |

### Indirect
| File | Via |
|------|-----|
| [path] | [direct dependent] |

## Verification
- [x] Build: pass / fail
- [x] Lint: pass / fail
- [x] Tests: pass / fail

## Issues found
- [ ] None
- [ ] [Issue] → Handled by [role/skill] — [outcome]

## Result
✅ All fine / 🔄 Fixed by [skill] / ⚠️ Escalated to [role]
```

---

## Rules

- **Run after significant changes** — Rename, API change, schema change, module move
- **Verify first** — Build, lint, test before assuming issues
- **Route correctly** — Use Junior/Mid for simple; Senior for complex; semantic-debugging for bugs
- **Don't fix everything yourself** — Invoke the right skill when scope exceeds simple edits
- **Re-verify** — After any fix, run Step 4 again
- **No commit with failing tests** — Fix until green, then commit

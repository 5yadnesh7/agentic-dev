# New Project Checklist

> **Use this checklist** to verify each step is DONE before advancing. Do not skip steps. Every step is mandatory.

**Rule:** Do not run step N+1 until all items in step N are checked.

**User approval gates:** At DB schema (Step 7) and UI/UX (Step 10): STOP and wait for user to reply "approved" before proceeding. Do not run ahead.

**Critic:** After each step, run Critic review on the output before advancing.

---

## Step 1 — Research

- [ ] role-research-analyst executed
- [ ] `docs/user-docs/researcher/research-[idea].md` exists
- [ ] Domain, competitors, tech stack documented

---

## Step 2 — Assumption validation

- [ ] workflow-assumption-validation executed
- [ ] Assumptions, risks, missing info documented
- [ ] User consulted for critical unknowns (if any)

---

## Step 3 — Project roadmap

- [ ] workflow-project-roadmap executed
- [ ] `docs/user-docs/planner/roadmap.md` exists
- [ ] Phased milestones defined (Foundation → Core → Business → UX → Production)

---

## Step 4 — Brainstorm

- [ ] workflow-brainstorm executed
- [ ] Feature ideas, variations, options documented

---

## Step 5 — Product spec

- [ ] role-product-manager executed
- [ ] `docs/user-docs/product-manager/product.md` exists
- [ ] Core vs non-core features, user journeys, business rules defined
- [ ] **User approval obtained** (gate)

---

## Step 6 — Architecture

- [ ] workflow-project-spec or LLD executed
- [ ] `docs/user-docs/architect/architecture.md` exists
- [ ] Tech stack, modules, high-level structure defined

---

## Step 7 — Database design (mandatory before backend)

**STOP at each gate. Wait for user "approved" before proceeding. Do not run ahead.**
- [ ] **role-db-schema-engineer** executed (not a simple outline)
- [ ] User was **asked** for DB connection config: username, password, host, port, database name (or env vars)
- [ ] `docs/user-docs/db-schema-engineer/database-connection-config.md` exists
- [ ] `docs/user-docs/db-schema-engineer/database-conceptual.md` exists
- [ ] `docs/user-docs/db-schema-engineer/database-logical.md` exists
- [ ] `docs/user-docs/db-schema-engineer/database-ddl-plan.md` exists
- [ ] Database engine chosen and user approved
- [ ] Schema CLEAR for backend/frontend implementation

---

## Step 8 — API design

- [ ] `docs/user-docs/architect/api.md` exists
- [ ] Endpoints, methods, auth, contracts defined

---

## Step 9 — Architecture review

- [ ] workflow-architecture-review executed
- [ ] Reviewer output: CLEAR (no blocking issues)
- [ ] If BLOCKED: Architect revises steps 6–8; re-run review until CLEAR

---

## Step 10 — UI/UX design (mandatory when project has frontend)

**STOP after mockups. Show user mockups/ in browser. Wait for user "approved" before proceeding. Do not run ahead.**
- [ ] **role-ui-ux-designer** executed — **mandatory if project has UI/frontend**. Skip only for pure backend.
- [ ] `docs/user-docs/designer/ux-design.md` exists
- [ ] `mockups/*.html` and `mockups/styles.css` exist — visual mockups user can open in browser
- [ ] **User approval obtained** (gate)
- [ ] No frontend code until this step is DONE and approved

---

## Step 11 — Task plan

- [ ] workflow-task-planner executed
- [ ] `tasks/001-X.md`, `tasks/002-Y.md`, ... exist for ALL roadmap phases
- [ ] Tasks ordered by dependency
- [ ] `memory/project-state.md` Task Board updated

---

## Step 12 — Execute ALL tasks (do not stop after Phase 1)

**CRITICAL:** When Phase 1 tasks complete, **immediately proceed to Phase 2**. Do NOT stop. Do NOT report "done". Continue until ALL phases complete.

- [ ] Phase 1 tasks: all DONE → **continue immediately to Phase 2**
- [ ] Phase 2 tasks: all DONE → continue to Phase 3
- [ ] Phase 3 tasks: all DONE → continue to Phase 4+
- [ ] Phase 4+ tasks: all DONE
- [ ] Every task: implemented, unit tested, committed
- [ ] Per-task loop (Implement → Unit test → Code review) completed for each

**Stopping early = FAIL.** Complete all phases before Integration step.

---

## Step 13 — Integration

- [ ] role-senior-engineer executed
- [ ] FE wired to BE
- [ ] Full `npm test` passes

---

## Step 14 — Integration test (INVOKE Tester — mandatory)

**Must explicitly invoke role-senior-tester (or tester agent). Do NOT skip.**
- [ ] **role-senior-tester** (tester) invoked explicitly
- [ ] Jest + Playwright; every flow from UX spec
- [ ] All flows pass; FAIL → re-open task, fix, re-run

---

## Step 15 — Security test

- [ ] role-security-engineer executed
- [ ] Auth, authz, API, OWASP, dependency scan done
- [ ] Result: CLEAR; FAIL → fix, recheck

---

## Step 16 — Product review

- [ ] role-product-manager executed
- [ ] All PRD acceptance criteria met
- [ ] GAPS → new task → loop until APPROVED

---

## Step 17 — End consumer

- [ ] role-end-consumer executed
- [ ] Cold-user simulation complete
- [ ] Verdict: SATISFIED or MINOR; BLOCKED → new task → loop

---

## Step 18 — Sign-off

- [ ] Quality gate passed: `npm test`, `npm run lint`, `npm run build` — 0 errors
- [ ] Coverage: ≥80% lines, ≥75% branches (if applicable)
- [ ] Project marked DONE in `memory/project-state.md`

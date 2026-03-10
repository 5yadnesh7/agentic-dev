# WORK MANAGER — Idea to production lifecycle

**Execution: parallel when no blocker; sequential and wait when Depends/Blocks or user gate.**

---

## Entry modes

| Entry | Trigger | Flow |
|-------|---------|------|
| **Greenfield** | `Idea:`, `Project:`, `Build:` | Idea Agent → Research → Brainstorm → Product Planning → full lifecycle |
| **Feature** | `Workflow: [feature]` | Phases 0→11 (skip -2, -1, 0.5, 0.6 if feature already scoped) |
| **Existing repo** | `Workflow:` on brownfield | Phase 0 runs Explore first (workflow-project-context) |

**Greenfield example:** `Idea: AI audiobook generator` → Idea Agent → Research → Brainstorm → Product Manager → UI/UX → Project Manager → ...

---

## Phases (full lifecycle)

| Phase | What runs | Output / gate |
|-------|-----------|---------------|
| **-2** | **Idea Agent** (greenfield only): role-idea-agent — parse idea, project category, scope, research brief | Commit: `docs: add idea summary for [idea]` |
| **-1** | **Research** (greenfield only): role-research-analyst — domain, competitors, tech (web search, GitHub, market analysis) | Commit: `docs: add research for [idea]`. **Gate:** Ask user critical product questions if needed. |
| **0** | Setup: create branch `feature/[TICKET]-[desc]`; if existing repo → workflow-project-context. Create/update `docs/project-context.md`. | Commit: `chore: init feature/[TICKET]-[desc]` |
| **0.5** | **Brainstorm** (greenfield): workflow-brainstorm → feature ideas, product variations, future expansion | Commit: `docs: add brainstorm for [idea]` |
| **0.6** | **Product Manager** (greenfield): role-product-manager → Product Planning Document (overview, users, core/non-core features, user journeys, business rules, modules, tech, architecture) | **Gate:** User approves. Commit: `docs: add product planning for [idea]` |
| **1** | UX Design: role-ui-ux-designer → flows, screen specs, wireframes, HTML/CSS mockups, design tokens | Skip if pure backend. **Gate:** User approves design. Output: `docs/ux-design.md`, `mockups/*.html`, `mockups/*.css`. Commit: `docs: add UX design and mockups for [feature]` |
| **1b** | **Project Manager**: role-project-manager → roadmap, phases, task breakdown (from product spec + UX) | Commit: `docs: add project roadmap and task board` |
| **2** | Technical Design: LLD/HLD (interfaces, schema, sequences) | Commit: `docs: add LLD/HLD for [feature]` |
| **2a** | **Documentation Agent**: role-product-manager — API specs, feature descriptions, edge cases, validation rules | Commit: `docs: add technical documentation for [feature]` |
| **2b** | **Content Agent**: role-content-writer — labels, messages, tooltips, onboarding, errors, CTAs | **Gate:** All copy ready before dev. Commit: `docs: add content spec for [feature]` |
| **3** | DB foundation tasks → per-task loop | Parallel if no Depends |
| **4** | All implementation tasks → per-task loop | Parallel where Depends allow |
| **5** | Integration: role-senior-engineer wires FE to BE; full `npm test` | Commit: `feat(scope): wire [X] to [Y]` |
| **6** | Integration test: role-senior-tester — Jest + Playwright; every flow from UX spec | FAIL → re-open task → loop. |
| **6b** | **Security testing:** role-security-engineer — auth, authz, API, OWASP tools, dependency scan, security linter | FAIL → fix → recheck. |
| **7** | Product review: role-product-manager checks every PRD AC | GAPS → new task → loop. |
| **8** | End consumer: role-end-consumer (cold user simulation) | BLOCKED → new task → loop. |
| **9** | Documentation: CHANGELOG, runbook, API ref | Commit: `docs: update CHANGELOG for [feature]` |
| **10** | PR: Quality gate (ORCHESTRATOR) → open PR | |
| **11** | **Monitoring** (post-release): role-monitoring-agent — error tracking, performance, analytics, logging (Sentry, Prometheus, Grafana) | Runbook, dashboards |

**After each phase:** Invoke **workflow-project-context** to update `docs/project-context.md` with that phase's output. Reuse for future phases.

---

## Testing tools (Jest + Playwright only)

- **Jest** — Unit tests, integration tests, API tests
- **Playwright** — E2E tests (UI, workflows, edge cases)

---

## Per-task loop (Phase 3 & 4)

**Worker ↔ Critic:** Implement (Worker) → Code review (Critic) → revise if issues. Max 2–3 loops.

```
1. ASSIGN — Junior or Senior
2. DEV DOC — workflow-dev-doc: create .cursor/dev-docs/[TASK-ID].md (task context to reduce long context / hallucination)
3. IMPLEMENT — Atomic units → lint → COMMIT. Reference dev doc during implementation.
4. UNIT TEST — Jest. FAIL → fix → commit → retest.
5. SECURITY CHECK (sensitive only) — role-security-engineer
6. CODE REVIEW — role-senior-engineer or role-mid-engineer
7. TASK DONE — Delete .cursor/dev-docs/[TASK-ID].md (workflow-dev-doc cleanup) → Proceed to next task
```

---

## Junior vs Senior assignment

| Signal | Assign to |
|--------|-----------|
| Auth, payments, PII, tokens, file upload, admin, external API | Senior |
| Cross-service, cross-layer, complex logic (3+ paths) | Senior |
| M or L size; approach unclear | Senior |
| Refactor touching >3 files | Senior |
| CRUD, simple component, basic form, unit test, migration | Junior |
| S or XS size; approach clear | Junior |
| Junior stuck >30 min | Escalate to Senior |
| Senior stuck / architecture unclear | Escalate to CTO |

---

## Task schema

```markdown
## Task [ID] — [Title]
Assign: Junior / Senior
Size: XS | S | M | L
Sensitive: YES / NO
Depends: [task IDs]

Description: [one paragraph]
Acceptance Criteria: [checklist]
Planned commits: [list]
```

---

## Report formats

### Unit test report (per task)
```
UNIT TEST REPORT — Task [ID]
Files: [list]
Tests: [N] passed / [N] total
Coverage: [N]% lines / [N]% branches
Result: ✅ PASS / ❌ FAIL
```

### Security report (Phase 6b)
```
SECURITY REPORT — [Feature]
Auth: ✅/❌ | Authz: ✅/❌ | API: ✅/❌ | Input: ✅/❌ | OWASP: [N]/10 | Vuln scan: ✅/❌
🔴 ISSUES: [list with severity, fix]
Result: ✅ CLEAR / ❌ ISSUES FOUND
```

### Integration test report (Phase 6)
```
INTEGRATION TEST — [Feature]
Flow: [name] — happy path     ✅/❌
Flow: [name] — error path     ✅/❌
Result: ✅ ALL PASS / ❌ [N] FAILURES
FAILURES → Owning task [ID] — re-open
```

### Product review (Phase 7)
```
PRODUCT REVIEW — [Feature]
AC-01: [criterion] ......... ✅ MET / ❌ GAP
Result: ✅ APPROVED / ❌ GAPS
```

### End consumer (Phase 8)
```
END CONSUMER — [Feature]
Primary task: [goal]
Result: ✅ Completed / ⚠️ Struggled / ❌ Failed
Verdict: ✅ SATISFIED / ⚠️ MINOR / ❌ BLOCKED
```

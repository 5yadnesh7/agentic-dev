# ORCHESTRATOR

Single source of truth for the multi-agent workflow.
**Execution: parallel by default; sequential and wait when blocking.**

The orchestrator manages workflow, assigns tasks to agents, tracks project progress, ensures correct phase order, and stores project memory.

---

## Hierarchical skill execution

```
User Request → Executive (dev-supervisor) → Strategic (plan) → Operational (execute)
```

- **Executive:** Decides workflow, selects skills, orchestrates
- **Strategic:** Research, roadmap, architecture, task planning (produce plans)
- **Operational:** Coding, debugging, refactoring (perform work)

See `agent-system/SKILL_HIERARCHY.md`.

---

## Stateful reasoning

**Every agent:** read state → think → act → update state. Do not rely on chat history; use structured files.

## Project memory & context

| Doc | Purpose |
|-----|---------|
| `docs/project-context.md` | **Persistent.** Stack, structure, patterns, phase outputs. Updated by **workflow-project-context** after each phase. Reuse for future phases. |
| `docs/project-memory.md` | Current phase, completed phases, open tasks, key decisions, user approvals |
| `docs/project-brain.md` | Vision, decisions, stack, open questions, lessons. Every agent reads and updates. |
| `docs/decision-log.md` | Why decisions were made; rationale for architecture choices |
| `docs/tool-memory.md` | Commands that worked, env notes (optional). See **agent-system/MEMORY_SYSTEM.md**. |
| `.cursor/dev-docs/[TASK-ID].md` | **Temporary.** Task-scoped context during Phase 3–4. Created by **workflow-dev-doc** at task start; **deleted when task DONE**. Reduces long context and hallucination. |

**After each phase:** Invoke workflow-project-context to update `docs/project-context.md`.
**During task:** Create dev doc at start; delete when task DONE.

---

## Progress tracking

Track:
- **Phase status** — DONE / IN PROGRESS / PENDING
- **Task board** — Task ID, state (⬜ PENDING / 🔄 IN LOOP / ✅ DONE)
- **Blockers** — What is blocking progress
- **Next phase** — What runs next

Ensure correct order: do not start a phase until dependencies are DONE and user gates (if any) are passed.

---

## Execution rule

- **Parallel when nothing blocks:** Run multiple tasks/roles in parallel when they have no dependency on each other. Example: Task FE-01 and BE-02 can run in parallel if neither Depends on the other.
- **Sequential when blocking:**
  - Task B has "Depends: A" → do not start B until A is ✅ DONE
  - Shared resource or order matters → run one after the other
  - User gate (approval, input) → wait for input before next step
  - External blocker (build failed, test failed) → wait for fix, then continue
- **Rule:** If nothing blocks, work parallel; if anything blocks, work sequential and wait.

---

## Commit rule (most important)

**COMMIT AFTER EVERY ATOMIC UNIT OF WORKING CODE.**

### Atomic units (examples)

| Unit | Commit when |
|------|-------------|
| One model file | File created + lint passes |
| One migration | Written (even before running) |
| One service method | Method works + unit test green |
| One endpoint | Handler + integration test green |
| One React component | Component renders, no errors |
| One custom hook | Hook works + test passes |
| One test file | All tests in file green |
| One config file | Connection verified |

### NOT a commit

- Half a service; multiple unrelated files
- WIP on main (stash instead)
- Code with failing tests
- Linting errors

### Commit format (Conventional Commits)

Use project convention from `.cursor/commit-convention.md` if present. Default examples:

```
feat(db): add User model with email and passwordHash
feat(db): add migration 001-create-users-table
feat(auth): add hashPassword and comparePassword utilities
feat(auth): add POST /auth/login endpoint
test(auth): add unit tests for token generation
fix(auth): prevent refresh loop on 401 from /auth/refresh
docs: update CHANGELOG for auth system
chore: add Sequelize DB connection config
```

### Commit anti-patterns (never do)

```
❌ git commit -m "wip"
❌ git commit -m "fix stuff" / "update" / "changes"
❌ One giant commit for an entire feature
❌ Committing code with failing tests
❌ git add . (prefer git add -p or specific paths)
❌ Committing .env, node_modules, build artifacts
```

---

## How the orchestrator runs

```
USER → [trigger] → ORCHESTRATOR
                       │
     ┌─────────────────┼─────────────────┐
     ▼                 ▼                 ▼
Detect type    Existing repo?      Select agents
     │              │                   │
  Idea/Project  YES → Brownfield    from trigger map
  → Greenfield  (Explore first)         │
  (Phase -1)         │                  ▼
     ▼               │            Execute phases
  Feature       Pattern Card      (see WORK_MANAGER)
  → Phase 0          │                  │
COMMIT: "chore: init branch"             ▼
     │                    COMMIT after every atomic unit
     └───────────────────────────────┘
```

---

## Graph orchestration (flow view)

Agent systems work better as **graphs** than as strict linear pipelines. Parallel branches run when nothing blocks.

```
                    ┌─────────────┐
                    │   research  │ (role-research-analyst)
                    └──────┬──────┘
                           │
     USER ──► planner ─────┴──────► tasks (role-project-manager)
                    │
          ┌─────────┴─────────┐
          ▼                   ▼
       ┌──────┐           ┌──────┐
       │ code │           │ docs │ (role-product-manager, role-content-writer)
       └──┬───┘           └──────┘
          │
          ▼
       ┌──────┐
       │ tests│ (role-senior-tester, role-junior-tester)
       └──┬───┘
          │
          ▼
       ┌──────┐
       │review│ (workflow-code-review-pr, role-security-engineer)
       └──────┘
```

**See also:** `agent-system/MEMORY_SYSTEM.md`, `agent-system/WORK_MANAGER.md`, `tools/README.md`.

---

## Trigger → Agent map

| Trigger | Agents / Skills | Notes |
|---------|-----------------|-------|
| `Idea:` / `Project:` / `Build:` | **dev-supervisor** → `agents/dev-supervisor.md` — Master agent; orchestrates research → architecture → task plan → execute. Explicit order in `.cursor/workflows/new-project.workflow.md`. | Autonomous dev system |
| `Workflow: [feature]` | Full loop (WORK_MANAGER phases -1–11) | Parallel where Depends allow. Phase -1 & 0.5 only if greenfield. |
| `Planner: [task]` | workflow-task-planner, role-product-manager, role-project-manager | Task files `tasks/001-X.md`, PRD, task board |
| `Bug: [desc]` | workflow-semantic-debugging | Find root cause, implement fix, add regression test, verify, commit |
| `Review: [target]` | Code Reviewer + Security | workflow-code-review-pr |
| `Test: [target]` | QA Lead, test skills | Unit, integration, E2E |
| `HLD:` / `LLD:` | HLD Architect / LLD Designer | Design docs |
| `Infra: terraform` / `Infra: aws` | Cloud / DevOps Engineer | Terraform, AWS |
| `Doc: tech` / `Doc: functional` | Technical Writer / Functional Analyst | Docs |
| `Explore:` | workflow-project-context | Brownfield, Pattern Card |
| `GetContext:` | workflow-get-project-context | Full project context → docs/project-context-full.md |
| `API:` | API Design Lead | OpenAPI, contracts |
| `Auth:` | Auth Engineer + Security | Auth implementation |
| `Release:` | Release Manager + DevOps | CHANGELOG, tag |
| `Micro:` | domain-microservices | Service decomposition |
| `Research:` | Research Analyst | Feasibility, tech comparison |
| `AI:` / `ML:` | AI/ML Engineer | Model integration |
| `Impact:` | workflow-impact-analysis | After changes: find dependents, verify, fix or route to Junior/Senior/Tester |
| `Spec: [idea]` | workflow-project-spec | Generate product.md, architecture.md, database.md, api.md, tasks.md |
| `PR:` | workflow-pr-generator | Branch, commits, PR description, open PR |
| `Improve:` / `Retro:` | workflow-continuous-improvement | Architecture/DB/refactor review; improvement report |
| `ArchReview:` | workflow-architecture-review | Pre-coding: review spec for scalability, security, performance |
| `ContextMap:` | workflow-context-map | Repo mental map; where logic lives, what to edit |
| `Refactor:` | workflow-refactor | Refactor suggestions; duplicate code, large functions, naming |
| `Learn:` | workflow-learning | Record lesson → docs/dev-lessons.md |
| `Validate:` / `Assume:` | workflow-assumption-validation | Think-before-build; list assumptions, risks, missing info |
| `Roadmap:` | workflow-project-roadmap | Phased milestones (docs/roadmap.md) before architecture |

**No explicit trigger?** Use **workflow-skill-receiver** with **skill-router** (`.cursor/skills/skill-router.md`): match user intent to SKILL_INDEX by keywords, tags, domain, and optional confidence scoring—then run the best-matching skill. Every skill is invokable by direct trigger (above) or by intelligent routing.

---

## Quality gate (before PR)

Run this sequence. Fix anything that fails. Commit fixes. Then open PR.

```bash
npm test                    # 0 failures
npm run test:coverage       # ≥80% lines, ≥75% branches
npm run lint                # 0 errors, 0 warnings
npm run build               # 0 errors
# No console.log/debugger in src (or documented)
git log --oneline origin/main..HEAD   # Reads like changelog
git fetch origin && git rebase origin/main
```

---

## Handoff template (between phases)

```markdown
## Handoff: Phase [X] → Phase [Y]
Agent: [name]  Branch: feature/[ticket]-[desc]

### Commits this phase
- feat(db): add User model → src/models/User.ts
- feat(auth): add token helpers → src/utils/tokens.ts
- test(auth): add token unit tests → tests/unit/tokens.test.ts

### What next phase needs
| File | Purpose |
|------|---------|
| src/models/User.ts | Sequelize model, UUID pk, email unique |
| src/utils/tokens.ts | generateAccessToken(user), generateRefreshToken(user) |

### Constraints for next phase
Use asyncHandler, return {success, data}, throw AppError

### Open items
- [ ] [Question for next agent]
```

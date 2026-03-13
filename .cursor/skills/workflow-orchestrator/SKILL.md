---
name: workflow-orchestrator
description: Orchestrates the full idea-to-production lifecycle. Use for Idea:, Project:, Build:, Workflow: triggers. Reads ORCHESTRATOR.md and WORK_MANAGER.md. Parallel when nothing blocks; sequential and wait when Depends or blocker.
tags: [executive, orchestration, lifecycle]
layer: executive
---

# Workflow Orchestrator

## Skill contract

| | |
|-|-|
| **Layer** | Executive |
| **Input** | User request with Idea:/Project:/Build:/Workflow: trigger; ORCHESTRATOR.md, WORK_MANAGER.md |
| **Output** | Orchestrated execution; phases run; artifacts in docs/user-docs/, tasks/ |
| **Dependencies** | ORCHESTRATOR.md, WORK_MANAGER.md |
| **Purpose** | Execute full product lifecycle from idea to PR |

## Purpose

Execute the full product lifecycle from idea to PR. Manages phases, assigns agents, enforces order, tracks progress, and applies quality gates.

## When to use (direct triggers only)

- User message **starts with** `Idea:`, `Project:`, `Build:` → **Greenfield** lifecycle
- User message **starts with** `Workflow: [feature]` → Full feature lifecycle
- User message **starts with** any trigger from `agent-system/QUICK_REFERENCE.md` (including `Spec:`, `PR:`, `Improve:`, `Retro:`)
- User asks: "how does the workflow run?", "what are the phases?"

**No direct trigger?** → Use **workflow-skill-receiver** (intelligent match). Do not use orchestrator when user says something in natural language (e.g. "review my code") without a prefix—skill-receiver will match intent and invoke the right skill.

## Step-by-step process

### 1. Read source of truth

Read in order:
- `agent-system/ORCHESTRATOR.md` — triggers, commit rule, quality gate, execution rule
- `agent-system/WORK_MANAGER.md` — phases, entry modes, per-task loop
- `agent-system/QUICK_REFERENCE.md` — quick lookup
- `agent-system/AGENTS.md` — role definitions (when needed)

### 2. Identify trigger and entry mode

| Trigger | Entry mode | Flow |
|---------|------------|------|
| `Idea:`, `Project:`, `Build:` | **Greenfield — dev-supervisor** | Read `agents/dev-supervisor.md`. Use `.cursor/workflows/new-project.workflow.md`. |
| `/cto` or "cto" / "help me" | **Triage — cto** | Read `agents/cto.md`. CTO routes to sub-agents. |
| `/architect`, `/tester`, "devops", etc. | **Sub-agent** | Load `agents/<name>.md`, execute skills from AGENT_SKILL_MAP. |
| `Workflow: [feature]` | Feature | Phases 0–11; `.cursor/workflows/feature-development.workflow.md` |
| `Bug:` | Bug fix | `bug-fix.workflow.md`; workflow-semantic-debugging |
| `Planner:`, `Review:`, etc. (skill triggers) | Single-purpose | See ORCHESTRATOR trigger map; may route to skill or sub-agent |

### 3. Execute phases

Run phases in order. **User gates:** Phase 0.6 (Product Planning approval), Phase 1 (UX approval), Phase 2b (content ready). Wait for user approval before continuing.

**Phase table:**
| Phase | Agent / Skill | Output |
|-------|---------------|--------|
| -2 | role-idea-agent | Idea summary (greenfield only) |
| -1 | role-research-analyst | Research doc (greenfield only) |
| 0 | workflow-project-context (if brownfield) | Branch, project context |
| 0.5 | workflow-brainstorm | Brainstorm (greenfield only) |
| 0.6 | role-product-manager | Product Planning Document (user approval) |
| 1 | role-ui-ux-designer | UX design, HTML/CSS mockups (user approval) |
| 1b | role-project-manager | Roadmap, phases, task board |
| 2 | LLD/HLD | Technical design |
| 2a | role-product-manager | Documentation (API specs, edge cases) |
| 2b | role-content-writer | Content spec |
| 3–4 | Engineers + workflow-dev-doc | Implementation |
| 5 | role-senior-engineer | Integration |
| 6 | role-senior-tester | Integration test (Jest + Playwright) |
| 6b | role-security-engineer | Security testing |
| 7 | role-product-manager | Product review |
| 8 | role-end-consumer | End consumer review |
| 9 | Documentation | CHANGELOG, runbook |
| 10 | Quality gate | PR |
| 11 | role-monitoring-agent | Monitoring |

### 4. After each phase

- **workflow-project-context** — Update `docs/user-docs/workflow-project-context/project-context.md` with phase output
- **Project memory** — Update current phase, completed phases, open tasks

### 5. Per-task loop (Phase 3–4)

For each task: Assign → Dev doc (create) → Implement → Unit test → Security (if sensitive) → Code review → Task DONE → Dev doc (delete)

## Execution rules

- **Parallel** — Tasks with no Depends can run in parallel
- **Sequential** — Task B with Depends: A runs only after A is ✅ DONE
- **User gate** — Wait for approval before next phase when gate applies
- **Blocker** — Build failed, test failed → fix, then continue

## Error handling

| Situation | Action |
|-----------|--------|
| Phase fails (e.g. tests fail) | Fix; re-run phase; do not advance |
| User rejects approval | Revise output; re-present; wait for approval |
| Task blocked by dependency | Wait for dependency DONE |
| Unclear architecture | Escalate to CTO |

## Handoff template (between phases)

```markdown
## Handoff: Phase [X] → Phase [Y]
Branch: feature/[TICKET]-[desc]

### Commits this phase
- feat(scope): [description]
- test(scope): [description]

### What next phase needs
| File | Purpose |
|------|---------|
| [path] | [purpose] |

### Constraints
[Key constraints for next phase]

### Open items
- [ ] [Question or blocker]
```

## Quality gate (Phase 10)

Before opening PR, run:
- `npm test` — 0 failures
- `npm run test:coverage` — ≥80% lines, ≥75% branches
- `npm run lint` — 0 errors
- `npm run build` — 0 errors
- No console.log/debugger in src
- Git log readable
- Rebase on main

## Rules

- **One commit per atomic unit** — See ORCHESTRATOR commit rule
- **No WIP on main** — Stash or branch
- **No commit with failing tests**
- **Correct order** — Do not skip phases or advance past blockers

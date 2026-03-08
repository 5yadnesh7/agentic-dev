# Agentic Dev

**Autonomous Development Framework for Cursor**

Turn Cursor into a full software engineering team. Spec-first, architecture review, task decomposition, coding, debugging, refactoring—with explicit execution order and memory.

**Includes:** Research agents · Planning agents · Architecture reviewers · Task decomposers · Coding agents · Debugging · Refactoring · Learning over time

---

## Quick Start

- **Build from scratch** — Say "build a SaaS for gym booking" or `Idea: AI audiobook`. The **dev-supervisor** orchestrates: research → architecture → task plan → execute. Explicit order in `agents/dev-supervisor.md`.
- **Direct trigger** — Use a prefix (e.g. `Workflow: user login`, `Bug: login returns 500`, `Review: src/auth/`). The orchestrator routes to the mapped skill.
- **Natural language** — Say what you want (e.g. "review my code", "get project context", "write tests for login"). The skill-receiver matches intent and invokes the right skill.

Every skill is **trigger-based**: direct (prefix) or intelligent (intent match).

## Triggers

| Trigger | What runs |
|---------|-----------|
| `Idea:` / `Project:` / `Build:` | Full greenfield (Idea → Research → Brainstorm → PM → UX → …) |
| `Workflow: [feature]` | Full feature lifecycle |
| `Planner: [task]` | PRD + task board |
| `Bug: [desc]` | Find root cause, fix, test, commit |
| `Review: [target]` | Code + security review |
| `Test: [target]` | Jest + Playwright |
| `Explore:` | Project context |
| `GetContext:` | Full project context → `docs/project-context-full.md` |
| `Impact:` | After changes: find dependents, verify, fix or route to Junior/Senior |
| `Spec: [idea]` | Generate product, architecture, database, api, tasks specs |
| `PR:` | Generate PR (branch, commits, description) |
| `Improve:` / `Retro:` | Architecture/DB/refactor review, improvement report |
| `ArchReview:` | Pre-coding architecture review (scalability, security, performance) |
| `ContextMap:` | Repo mental map (where logic lives, what to edit) |
| `Refactor:` | Refactor suggestions (duplicate code, naming, abstraction) |
| `Learn:` | Record lesson → docs/dev-lessons.md |
| `Validate:` / `Assume:` | Assumption validation (think-before-build) |
| `Roadmap:` | Project roadmap (phased milestones before architecture) |
| `Research:`, `Infra:`, `Doc:`, `API:`, `Auth:`, `Release:`, `Micro:`, `AI:`, `ML:` | See [QUICK_REFERENCE](agent-system/QUICK_REFERENCE.md) |

No prefix? The skill-receiver matches your intent to a skill and runs it.

## Project Structure

**AI Development Operating System** — framework, not just prompts.

```
core/                   # Central brain
  orchestrator.md       # Read request, determine workflow, assign agents
  execution-engine.md   # Parallel/sequential rules, loops

agent-system/           # Orchestrator source of truth
  ORCHESTRATOR.md       # Trigger map, commit rules, quality gate
  WORK_MANAGER.md       # Phases, task loop
  SKILL_INDEX.md        # Direct + intelligent triggers
  SKILL_HIERARCHY.md    # Executive → Strategic → Operational
  SKILL_CONTRACT.md     # Purpose, Input, Output standard

.cursor/
  agents/               # Planner, architect, worker, critic, coder, tester, …
  workflows/            # Prebuilt: new-project, feature-dev, bug-fix, refactor
  skills/               # research, roadmap, coding, debugging, …
  rules/                # Coding standards

memory/                 # Project state (docs/ holds actual files)
  README.md             # project-brain, decisions, progress

templates/              # architecture-template, task-template

tools/                  # search, filesystem, github, terminal
docs/                   # project-brain, project-memory, decision-log, …
```

## Key Docs

- [AGENTS.md](AGENTS.md) — Agent behaviour, trigger policy
- [agent-system/ORCHESTRATOR.md](agent-system/ORCHESTRATOR.md) — Trigger map, commit rule
- [agent-system/WORK_MANAGER.md](agent-system/WORK_MANAGER.md) — Full phase list, task loop
- [agent-system/SKILL_INDEX.md](agent-system/SKILL_INDEX.md) — All skills, direct + intelligent triggers
- [agent-system/SKILL_HIERARCHY.md](agent-system/SKILL_HIERARCHY.md) — Executive → Strategic → Operational
- [agent-system/SKILL_CONTRACT.md](agent-system/SKILL_CONTRACT.md) — Purpose, Input, Output standard
- [core/orchestrator.md](core/orchestrator.md) — Central brain
- [memory/README.md](memory/README.md) — Project state
- [PRODUCT-COMPANY-SETUP.md](PRODUCT-COMPANY-SETUP.md) — Detailed setup and workflow design

## Agent Pipeline

```
User Idea
  ↓
Research
  ↓
Assumption Validation (think-before-build)
  ↓
Project Roadmap (phased milestones — lay tracks before train)
  ↓
Spec (never code before spec)
  ↓
Architecture Design
  ↓
Architecture Review (self-critique before coding)
  ↓
Task Decomposition (roadmap + task tree)
  ↓
Coding
  ↓
Debugging / Refactor / Learning
```

**Vision → Roadmap → Tasks:** Macro planning (roadmap) before micro tasks.

**Self-evolving skills:** When a reusable playbook appears 2+ times → create skill → reuse next time.

**Dual-Brain (Worker ↔ Critic):** Worker implements; Critic finds flaws. Revision loop (2–3x).

**Hierarchical execution:** Executive (dev-supervisor) → Strategic (plan) → Operational (execute). Planning before acting.

**Stateful reasoning:** read state → think → act → update state. Agents use `docs/project-brain.md`, `docs/decision-log.md`, `docs/dev-lessons.md` — not chat history.

**Collaborative loops:** Architect ↔ Reviewer (revise until CLEAR); Tester ↔ Coder (fix until pass).

**Core triplet:** Spec → Assumption Validation → Task Decomposition = think → validate → plan → build

## Execution

- **Parallel** when nothing blocks
- **Sequential** when Depends, user gate, or blocker
- **Commit** after every atomic unit (one model, one endpoint, one test file, etc.)

## Testing

- **Jest** — Unit, integration, API
- **Playwright** — E2E, UI workflows

## License

MIT

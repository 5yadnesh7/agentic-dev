# Agentic Dev

**Autonomous Development Framework for Cursor**

Turn Cursor into a full software engineering team. Spec-first, architecture review, task decomposition, coding, debugging, refactoring—with explicit execution order and memory.

**Includes:** Research agents · Planning agents · Architecture reviewers · Task decomposers · Coding agents · Debugging · Refactoring · Learning over time

---

## Quick Start

1. **Clone repo**
   ```bash
   git clone https://github.com/your-org/agentic-dev.git
   cd agentic-dev
   ```
2. **Open in Cursor** — Open the `agentic-dev` folder in Cursor.
3. **Start a new project** — Type in chat: `Idea: Build a SaaS for event booking`
4. **dev-supervisor** runs the workflow — research → assumption validation → roadmap → spec → architecture → task plan → execute.
5. **Outputs** — `docs/user-docs/` (research, roadmap, architecture, product spec), `tasks/` (001-X.md, …), `memory/project-state.md`

**Other ways to run:**
- **Build from scratch** — "build a SaaS for gym booking" or `Idea: AI audiobook`. Explicit order in `agents/dev-supervisor.md`.
- **Direct trigger** — `Workflow: user login`, `Bug: login returns 500`, `Review: src/auth/`. Orchestrator routes to the skill.
- **Natural language** — "review my code", "get project context", "write tests for login". Skill-receiver matches intent.

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
| `GetContext:` | Full project context → `docs/user-docs/workflow-get-project-context/project-context-full.md` |
| `Impact:` | After changes: find dependents, verify, fix or route to Junior/Senior |
| `Spec: [idea]` | Generate product, architecture, database, api, tasks specs |
| `PR:` | Generate PR (branch, commits, description) |
| `Improve:` / `Retro:` | Architecture/DB/refactor review, improvement report |
| `ArchReview:` | Pre-coding architecture review (scalability, security, performance) |
| `ContextMap:` | Repo mental map (where logic lives, what to edit) |
| `Refactor:` | Refactor suggestions (duplicate code, naming, abstraction) |
| `Learn:` | Record lesson → memory/project-state.md (Lessons Learned) |
| `Validate:` / `Assume:` | Assumption validation (think-before-build) |
| `Roadmap:` | Project roadmap (phased milestones before architecture) |
| `Research:`, `Infra:`, `Doc:`, `API:`, `Auth:`, `Release:`, `Micro:`, `AI:`, `ML:` | See [QUICK_REFERENCE](agent-system/QUICK_REFERENCE.md) |

No prefix? The skill-receiver matches your intent to a skill and runs it.

## Project Structure

**AI Development Operating System** — framework, not just prompts.

```
agent-system/           # Orchestrator source of truth
  ORCHESTRATOR.md       # Trigger map, commit rules, quality gate
  WORK_MANAGER.md       # Phases, task loop
  SKILL_INDEX.md        # Direct + intelligent triggers
  SKILL_HIERARCHY.md    # Executive → Strategic → Operational
  SKILL_CONTRACT.md     # Purpose, Input, Output standard
  MEMORY_SYSTEM.md      # project-state, agent-messages, stateful reasoning
  QUICK_REFERENCE.md    # Trigger → skill quick map

.cursor/
  agents/               # dev-supervisor, planner, architect, worker, critic, coder, tester, doc-agent, skill-generator, …
  workflows/            # new-project, feature-dev, bug-fix, refactor
  skills/               # 40+ skills (workflow-*, role-*, domain-*)
    skill-router.md     # Dynamic skill selection (intent, tags, domain)
  rules/                # Coding standards (React, Node, Python, DB, etc.)
  commit-convention.md  # Commit format (conventional commits)
  lessons-learned.md    # Process/velocity learnings

memory/                 # Single source of truth
  project-state.md      # Project, phase, tasks, stack, decisions, lessons
  agent-messages.md     # Inter-agent communication

.cursor/templates/      # agent-template, skill-template, task-template, architecture-template, log-template

mockups/                # HTML/CSS mockup pages (from role-ui-ux-designer; visual design)

docs/
  system-docs/          # Framework reference (agent-tools, architecture-diagram, dev-lessons, tool-memory, decision-log)
  user-docs/            # Project outputs by agent (planner/, designer/, architect/, researcher/, etc.)

scripts/                # Validation
  validate-skills.js    # Check skills have metadata + contract
  validate-agent-system.js  # 3-tier agent system, rules, skills

.github/workflows/      # CI
  ci.yml                # Validate skills + agent system on push

```

## Key Docs

| Doc | Purpose |
|-----|---------|
| [AGENTS.md](AGENTS.md) | Agent behaviour, trigger policy (root) |
| [agent-system/ORCHESTRATOR.md](agent-system/ORCHESTRATOR.md) | Trigger map, commit rule, quality gate |
| [agent-system/WORK_MANAGER.md](agent-system/WORK_MANAGER.md) | Phases, task loop |
| [agent-system/SKILL_INDEX.md](agent-system/SKILL_INDEX.md) | All skills, triggers, intelligent match |
| [agent-system/SKILL_HIERARCHY.md](agent-system/SKILL_HIERARCHY.md) | Executive → Strategic → Operational |
| [agent-system/SKILL_CONTRACT.md](agent-system/SKILL_CONTRACT.md) | Input, Output, dependencies standard |
| [agent-system/MEMORY_SYSTEM.md](agent-system/MEMORY_SYSTEM.md) | project-state, agent-messages, stateful reasoning |
| [agent-system/QUICK_REFERENCE.md](agent-system/QUICK_REFERENCE.md) | Trigger → skill mapping |
| [memory/README.md](memory/README.md) | project-state, agent-messages |
| [docs/README.md](docs/README.md) | docs structure: system-docs/ vs user-docs/ by agent |
| [docs/system-docs/agent-tools.md](docs/system-docs/agent-tools.md) | Cursor tool layer (Read, Write, Shell, etc.) |
| [docs/system-docs/architecture-diagram.md](docs/system-docs/architecture-diagram.md) | Visual flow (User → Supervisor → …) |
| [scripts/README.md](scripts/README.md) | validate-skills, validate-agent-system |

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

**Stateful reasoning:** read state → think → act → update state. Agents use `memory/project-state.md`, `memory/agent-messages.md`, `docs/system-docs/decision-log.md` — not chat history.

**Collaborative loops:** Architect ↔ Reviewer (revise until CLEAR); Tester ↔ Coder (fix until pass).

**Core triplet:** Spec → Assumption Validation → Task Decomposition = think → validate → plan → build

## Execution

- **Parallel** when nothing blocks
- **Sequential** when Depends, user gate, or blocker
- **Commit** after every atomic unit (one model, one endpoint, one test file, etc.)

## Testing

- **Jest** — Unit, integration, API
- **Playwright** — E2E, UI workflows

## Validation (this repo)

```bash
node scripts/validate-skills.js        # metadata only
node scripts/validate-skills.js --strict   # metadata + input + output
node scripts/validate-agent-system.js  # 3-tier agent system, rules, skills
```

CI runs these on push (`.github/workflows/ci.yml`).

## License

MIT

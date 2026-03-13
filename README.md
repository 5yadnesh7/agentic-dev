# Agentic Dev

Turn Cursor into a full software engineering team. Ask questions, build projects, fix bugs, get reviews—all from chat.

---

## Quick Start

1. **Clone & open**
   ```bash
   git clone https://github.com/your-org/agentic-dev.git
   cd agentic-dev
   ```
   Open the folder in Cursor.

2. **Ask anything** — Type in chat and hit Enter.

---

## How to Get Help

You have **three ways** to get help:

### 1. Ask the CTO — when you're not sure what you need

Type `/cto` or "help me" plus your question. The CTO figures out what to run and routes to the right agent.

**Examples of what to type:**
- `/cto I want to build a gym booking app`
- `help me set up authentication`
- `I need to add a feature but don't know where to start`
- `I don't know how to structure this project`

---

### 2. Call a sub-agent — when you need a specific role

Type the agent name with a slash. That agent runs and picks the right skills.

| Type this | You get |
|-----------|---------|
| `/architect` | System design, database schema, API design |
| `/planner` | PRD, roadmap, task breakdown |
| `/tester` | QA, tests, bug finding |
| `/worker` | Implementation, coding |
| `/researcher` | Research, feasibility, competitors |
| `/reviewer` | Code review, architecture review |
| `/devops` | CI/CD, Terraform, deployment |
| `/security` | Security audit, OWASP, auth |
| `/designer` | UX, wireframes, mockups |

**Examples:**
- `/architect design the database for a booking system`
- `/planner create a roadmap for user login`
- `/tester write unit tests for the auth module`
- `/reviewer review my changes in src/auth/`

---

### 3. Run a skill — when you know exactly what you want

Type the skill with a slash plus your request. The skill runs directly.

| Type this | What happens |
|-----------|--------------|
| `/idea` + your idea | Full greenfield flow (research → spec → architecture → tasks) |
| `/workflow` + feature | Full feature lifecycle |
| `/bug` + description | Find root cause, fix, add regression test |
| `/spec` + idea | Generate product, architecture, database, API specs |
| `/review` + target | Code + security review |
| `/test` + target | Unit & E2E tests |
| `/pr` | Create PR (branch, commits, description) |
| `/explore` | Project context summary |
| `/get-context` | Full project context doc |
| `/impact` | After changes: find dependents, check for breakage |
| `/refactor` | Refactor suggestions |
| `/roadmap` | Phased milestones before architecture |
| `/validate` | Validate assumptions before building |
| `/db` | Database schema design |
| `/design` | UX design, wireframes |

**Examples:**
- `/idea Build a SaaS for event booking`
- `/bug login returns 500 when password is empty`
- `/review src/auth/tokens.ts`
- `/spec E-commerce checkout flow`
- `/pr`

---

## Natural Language

You don't need to remember slash commands. Just say what you want:

- "review my code"
- "get project context"
- "write tests for login"
- "fix this bug: cart total is wrong"
- "design the database for users and orders"
- "create a PR for my changes"

The system matches your intent and runs the right skill.

---

## Where Outputs Go

- **Project outputs** — `docs/user-docs/` (organized by agent)
- **Task files** — `tasks/001-X.md`, `002-Y.md`, …
- **Project state** — `memory/project-state.md` (phase, decisions, lessons)

---

## Full Trigger Reference

For the complete list of triggers and skills, see [agent-system/QUICK_REFERENCE.md](agent-system/QUICK_REFERENCE.md).

---

## For Contributors

Project structure, validation scripts, and internal docs: see [AGENTS.md](AGENTS.md) and `agent-system/`.

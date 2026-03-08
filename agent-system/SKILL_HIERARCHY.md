# SKILL HIERARCHY — Executive → Strategic → Operational

Instead of flat skill execution, use **hierarchical skill execution**. LLM plans → then acts.

---

## The three layers

```
User Request
     ↓
Executive (decides workflow)
     ↓
Strategic (plans)
     ↓
Operational (executes)
     ↓
Result
```

---

## 1. Executive layer (decision maker)

**Decides which skills run.** Understands request, selects workflow, invokes skills in order.

| Skill / Agent | Purpose | Output |
|---------------|---------|--------|
| **dev-supervisor** | Understand request, determine workflow, select skills | Orchestrated execution |
| **workflow-orchestrator** | Route triggers to mapped skills | Correct skill invoked |
| **workflow-skill-receiver** | Match intent when no explicit trigger | Best skill match |

---

## 2. Strategic layer (planning)

**Design the solution.** Produce structured plans, not code.

| Skill | Input | Output |
|-------|-------|--------|
| **role-research-analyst** | Idea, domain | `docs/research-[idea].md` |
| **workflow-assumption-validation** | Idea, research | Assumptions, risks, missing info |
| **workflow-project-roadmap** | Idea, research | `docs/roadmap.md` |
| **workflow-project-spec** | Idea | `docs/product.md`, `architecture.md`, `database.md`, `api.md`, `tasks.md` |
| **workflow-architecture-review** | Architecture docs | Issues, recommendations |
| **workflow-task-planner** | Spec, roadmap | `tasks/001-X.md`, ... |

---

## 3. Operational layer (execution)

**Perform work.** Implement, debug, refactor.

| Skill | Input | Output |
|-------|-------|--------|
| **workflow-semantic-debugging** | Bug description, error, stack trace | Fix, regression test, commit |
| **role-senior-engineer**, **role-mid-engineer** | Task file | Code, tests, commit |
| **workflow-refactor** | Code path | Refactor suggestions |
| **workflow-testing** | Target | Tests |

---

## Flow example

**User:** "Build an event booking platform."

1. **Executive** (dev-supervisor): Workflow = research → assumption validation → roadmap → spec → architecture review → task planning → execute
2. **Strategic:** roadmap.md, architecture.md, tasks.md
3. **Operational:** coding, debugging, refactoring per task

---

## Skill contracts

Each skill should define: **Input**, **Output**, **Purpose**. See workflow frontmatter and "Skill contract" sections.

---
name: skill-router
description: Dynamic skill selection. Match task to best skill using intent, tags, domain. Used by workflow-skill-receiver and workflow-orchestrator. Reference doc — read SKILL_INDEX, apply matching logic.
tags: [executive, dispatcher, routing]
layer: executive
required_context: [agent-system/SKILL_INDEX.md]
---

# Skill Router — Dynamic Skill Selection

> **Dispatcher.** Selects the best skill for a task using tags, domain, and intent. Converts static routing into an adaptive skill system.

## Purpose

Instead of workflows hardcoding which skills to call, the **router** dynamically chooses the best skill based on the task.

```
task → skill router → best matching skill → execute
```

**With routing:** Skills become modular. Easier extension, reuse, smarter agents.

---

## Flow

| Step | Action |
|------|--------|
| 1 | Receive task (user message or workflow step) |
| 2 | Read `agent-system/SKILL_INDEX.md` |
| 3 | Match task to skills: intent, tags, domain |
| 4 | Score candidates (optional confidence) |
| 5 | Select best match; invoke skill |

---

## Router Logic

### Inputs

- **Task:** User message, workflow step, or explicit goal
- **Source:** SKILL_INDEX (triggers + intelligent match)
- **Skill metadata:** tags, domain, input, output (from SKILL frontmatter when available)

### Matching Criteria

| Criterion | Use |
|-----------|-----|
| **Intent** | What does the user want? (debug, design API, review, test, etc.) |
| **Tags** | planning, debugging, backend, architecture, operational, strategic |
| **Domain** | development, architecture, testing, infra, product, security |
| **Direct trigger** | If task starts with known trigger (Bug:, Spec:, etc.) → SKILL_INDEX maps to skill |

### Selection Algorithm

1. **Trigger match:** If task starts with known trigger → use ORCHESTRATOR trigger map (SKILL_INDEX column 1)
2. **Intent match:** Extract keywords from task; match to SKILL_INDEX "Intelligent match" column
3. **Domain/tag filter:** If multiple candidates, prefer skills whose tags/domain align with task
4. **Confidence (optional):** Score each candidate 0–1; pick highest

---

## Skill Metadata (for routing)

Skills should include metadata. Example:

```yaml
---
name: workflow-project-spec
tags: [planning, product, spec]
domain: architecture
input: project idea
output: docs/user-docs/product-manager/product.md, docs/user-docs/architect/architecture.md, docs/user-docs/db-schema-engineer/, docs/user-docs/architect/api.md, tasks.md
layer: strategic
---
```

Another example:

```yaml
---
name: workflow-semantic-debugging
tags: [debugging, backend, operational]
domain: development
input: error message, bug description, stack trace
output: fix committed, regression test, docs/user-docs/debug/[slug]-report.md
layer: operational
---
```

**Router uses:** tags + domain for disambiguation when multiple skills match intent.

---

## Confidence Scoring (optional)

When multiple skills match, score each candidate:

| Factor | Weight | Example |
|--------|--------|---------|
| Keyword overlap | High | "fix login bug" → workflow-semantic-debugging (debug, fix, bug) |
| Domain alignment | Medium | "design API" → workflow-api-design (domain: api) |
| Tag overlap | Medium | "database schema" → workflow-db-design (tags: database, schema) |
| Trigger exact match | Highest | "Bug: login 500" → workflow-semantic-debugging (direct) |

**Example:**

```
Task: database schema design

Candidates:
- workflow-database-design  → 0.85 (domain + tags match)
- workflow-architecture-design → 0.60 (architecture tag)
- workflow-project-spec    → 0.35 (planning only)

Best match: workflow-database-design
```

---

## Concrete Examples

| Task | Router selects | Rationale |
|------|----------------|-----------|
| "Bug: login API returning 500" | workflow-semantic-debugging | Trigger "Bug:" + intent (debug, fix) |
| "fix login bug" | workflow-semantic-debugging | Intent: debug, fix; tags: debugging |
| "design API for bookings" | workflow-project-spec or API skill | Intent: design, API; domain: architecture |
| "review my auth code" | workflow-code-review-dev | Intent: review, pre-commit |
| "review this PR" | workflow-code-review-pr | Intent: PR review |
| "decompose tasks for phase 2" | workflow-task-planner | Intent: task breakdown; domain: planning |

---

## Integration

| Component | Uses router |
|-----------|-------------|
| **workflow-skill-receiver** | When user has no explicit trigger → router selects best skill |
| **workflow-orchestrator** | For sub-steps or when workflow step maps to multiple possible skills |
| **dev-supervisor** | Can use router for dynamic phase selection (e.g. "database schema" → db-design) |

**Source of truth:** `agent-system/SKILL_INDEX.md` — triggers, intelligent match, skill names.

---

## Architecture Shift

**Before (static):**

```
Workflow → Skill A → Skill B → Skill C  (hardcoded order)
```

**After (dynamic):**

```
Task → Skill Router → Best Skill → Execute
```

**Pipeline:**

```
User → Supervisor → Skill Router → Best Skill
                           ↑
                    SKILL_INDEX + metadata
```

---

## Rules

- **Trigger wins:** Explicit trigger (Bug:, Spec:, etc.) → use SKILL_INDEX trigger map first
- **Intent fallback:** No trigger → match intent to SKILL_INDEX intelligent match
- **Single best:** Pick one skill unless user clearly needs multiple (e.g. "security + code review")
- **Don't force:** No good match → respond normally; do not invent a skill

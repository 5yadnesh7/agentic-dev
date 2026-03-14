# Skill contract — Standard interface

Every skill should define: **Purpose**, **Input**, **Output**, **Layer**, **Dependencies**.

This allows agents to chain skills reliably.

## Template

```markdown
---
name: skill-name
description: [What]. Use when [triggers].
tags: [layer, domain, tech]
layer: executive | strategic | operational
produces: [docs/artifact.md, ...]
required_context: [memory/project-state, docs/user-docs/workflow-project-context/project-context, ...]
---

## Skill contract

| | |
|-|-|
| **Layer** | Executive | Strategic | Operational |
| **Input** | [What goes in] |
| **Output** | [What comes out] |
| **Dependencies** | [Other skills or files required before running] |
| **Purpose** | [One sentence] |

## Purpose
...
```

## Frontmatter (machine-readable)

| Field | Required | Purpose |
|-------|----------|---------|
| `name` | Yes | Skill identifier |
| `description` | Yes | What it does; trigger phrases |
| `tags` | Yes | Discovery: [layer, domain, tech] |
| `layer` | Yes | executive \| strategic \| operational |
| `produces` | Recommended | Paths of artifacts (e.g. docs/architecture.md) |
| `required_context` | Optional | Files to read first (memory/project-state, project-context, etc.) |

## Examples

| Skill | Input | Output |
|-------|-------|--------|
| workflow-semantic-debugging | Bug description, error, stack trace | Fix, regression test, commit |
| workflow-project-spec | Idea | product.md, architecture.md, database.md, api.md, tasks.md |
| workflow-task-planner | Spec, roadmap | tasks/001-X.md, ... |

## See

- `agent-system/SKILL_HIERARCHY.md` — Layer definitions
- `agent-system/SKILL_INDEX.md` — All skills + triggers

# Skill contract — Standard interface

Every skill should define: **Purpose**, **Input**, **Output**, **Layer**.

This allows agents to chain skills reliably.

## Template

```markdown
---
name: skill-name
description: [What]. Use when [triggers].
tags: [layer, domain, tech]
---

## Skill contract

| | |
|-|-|
| **Layer** | Executive | Strategic | Operational |
| **Input** | [What goes in] |
| **Output** | [What comes out] |
| **Purpose** | [One sentence] |

## Purpose
...
```

## Examples

| Skill | Input | Output |
|-------|-------|--------|
| workflow-semantic-debugging | Bug description, error, stack trace | Fix, regression test, commit |
| workflow-project-spec | Idea | product.md, architecture.md, database.md, api.md, tasks.md |
| workflow-task-planner | Spec, roadmap | tasks/001-X.md, ... |

## See

- `agent-system/SKILL_HIERARCHY.md` — Layer definitions
- `agent-system/SKILL_INDEX.md` — All skills + triggers

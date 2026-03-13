---
name: workflow-continuous-improvement
description: Continuous improvement. Agents ask: Is architecture scalable? Should we change DB? Refactor? Use for Improve:, Retro:, "continuous improvement", "architecture review", "should we refactor".
tags: [strategic, improvement, retrospective]
layer: strategic
---

# Workflow: Continuous Improvement

## Skill contract

| | |
|-|-|
| **Layer** | Strategic |
| **Input** | Architecture, codebase, recent changes |
| **Output** | Improvement suggestions; refactor/tech-debt report |
| **Dependencies** | project-brain, architecture docs |
| **Purpose** | Retrospective; suggest improvements for architecture, DB, refactor |

## Purpose

Run a retrospective / improvement pass. Agents ask critical questions and suggest improvements for architecture, DB, refactor, and tech debt.

## When to run

- **Trigger:** `/improve`, `/retro`
- **User says:** "continuous improvement", "architecture review", "should we refactor", "tech debt", "is architecture scalable"
- **Context:** After a feature or phase; periodic health check

## Questions to answer

| Area | Questions |
|------|-----------|
| **Architecture** | Is it scalable? Single points of failure? Clear boundaries? |
| **Database** | Right model? Indexes? Migrations clean? |
| **Refactor** | Duplication? Complexity? Violations of patterns? |
| **Tech debt** | What should we fix? Priority? |
| **Dependencies** | Outdated? Vulnerable? Overly complex? |

## Step-by-step process

### 1. Gather context

- Read `docs/user-docs/workflow-project-context/project-context.md`
- Review recent changes (git log, structure)
- **Checklist:** [ ] Context loaded

### 2. Architecture review

- Scalability, boundaries, failure modes
- **Output:** Findings + recommendations

### 3. DB review

- Schema fit, indexes, migrations
- **Output:** Findings + recommendations

### 4. Code quality

- Refactor candidates, tech debt
- **Output:** Prioritized list

### 5. Report

Produce `docs/user-docs/continuous-improvement/improvement-report-[date].md`. Create docs/user-docs/continuous-improvement/ if not exist:

```markdown
# Improvement Report — [Date]

## Architecture
- [Findings]
- [Recommendations]

## Database
- [Findings]
- [Recommendations]

## Refactor / tech debt
- [Prioritized list]

## Suggested next steps
1. [Action]
2. [Action]
```

## Rules

- Do not implement; only analyze and recommend
- Escalate to CTO for major architectural changes
- User decides what to act on

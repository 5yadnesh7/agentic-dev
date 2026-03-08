---
name: workflow-architecture-review
description: Self-critique before coding. Agent reviews its own architecture for scalability, security, performance. Use for ArchReview:, "architecture review before coding", "review my architecture plan".
tags: [strategic, architecture, review]
layer: strategic
---

# Workflow: Architecture Review (Pre-Coding Gate)

## Skill contract

| | |
|-|-|
| **Layer** | Strategic |
| **Input** | docs/architecture.md, database.md, api.md |
| **Output** | Issues, recommendations; revised architecture until CLEAR |
| **Dependencies** | Architecture docs |
| **Purpose** | Self-critique architecture for scalability, security, performance before coding |

## Purpose

**Reviewer critiques Architect.** Mimics senior engineer design review. Architect ↔ Reviewer debate: Reviewer finds issues → Architect revises → re-review until CLEAR. Run **after** spec (product, architecture, database, API) and **before** implementation.

## When to run

- **Trigger:** `ArchReview:`
- **User says:** "architecture review", "review my architecture plan", "critique architecture before coding"
- **Context:** After `docs/architecture.md`, `docs/database.md`, `docs/api.md` exist; **before** task execution

## Step-by-step process

### 1. Analyze architecture

- Read `docs/architecture.md`, `docs/database.md`, `docs/api.md`
- Understand components, data flow, integration points
- **Checklist:** [ ] Architecture understood

### 2. Identify scalability issues

- Single points of failure?
- Bottlenecks under load?
- Horizontal scaling possible?
- **Output:** Scalability findings

### 3. Identify security risks

- API authentication missing?
- Authz / RBAC defined?
- Input validation, injection risks?
- Secrets handling?
- **Output:** Security findings

### 4. Identify performance bottlenecks

- Database indexes defined?
- N+1 risks?
- Caching strategy?
- **Output:** Performance findings

### 5. Suggest improvements

- Concrete fixes with rationale
- **Output:** Prioritized list

## Output format

Produce `docs/architecture-review-[date].md`:

```markdown
# Architecture Review — [Date]

## Issues found
- API authentication missing
- Database indexes not defined
- Caching strategy missing
- [Other findings]

## Suggested fixes
| Issue | Fix | Priority |
|-------|-----|----------|
| Auth missing | Add JWT auth middleware | P0 |
| Indexes | Add indexes on User.email, Booking.userId | P0 |
| Caching | Introduce Redis for session/query cache | P1 |

## Verdict
- [ ] CLEAR — Proceed to implementation
- [ ] BLOCKED — Fix critical issues first
```

## Architect ↔ Reviewer loop

**If BLOCKED:** Architect must revise architecture (docs/architecture.md, database.md, api.md) and re-submit. Reviewer re-checks. Loop until verdict = CLEAR.

**Example debate:** Reviewer: "MongoDB risk for relational complexity" → Architect revises to PostgreSQL → Reviewer: CLEAR.

## Rules

- Run **before** coding
- Do not implement; only analyze and recommend
- **If BLOCKED:** Loop back to Architect; do not proceed until CLEAR
- Escalate to CTO for major architectural changes

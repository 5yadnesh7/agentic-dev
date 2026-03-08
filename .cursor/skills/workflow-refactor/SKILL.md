---
name: workflow-refactor
description: Code quality review. Finds duplicate code, large functions, poor naming, missing abstraction. Outputs refactor suggestions. Use for Refactor:, "refactor suggestions", "code quality review".
tags: [operational, refactor, code-quality]
layer: operational
---

# Workflow: Refactor

## Skill contract

| | |
|-|-|
| **Layer** | Operational |
| **Input** | Path or recent changes; docs/project-context.md |
| **Output** | Refactor suggestions (duplicates, large functions, naming) |
| **Dependencies** | project-context |
| **Purpose** | Code quality review; output suggestions, do not auto-apply |

## Purpose

Good agents improve code quality over time. This skill checks for refactor opportunities and outputs **suggestions** — does not auto-refactor. User or agent decides what to implement.

## When to run

- **Trigger:** `Refactor:`
- **User says:** "refactor suggestions", "code quality", "improve this code", "duplicate code", "clean up"

## Step-by-step process

### 1. Scan target

- User-specified path or recent changes
- Read `docs/project-context.md` for patterns
- **Checklist:** [ ] Scope clear

### 2. Check for issues

| Issue | What to look for |
|-------|------------------|
| **Duplicate code** | Same logic in 2+ places; extract to shared util |
| **Large functions** | >30 lines; split by responsibility |
| **Poor naming** | Unclear vars, functions; rename for clarity |
| **Missing abstraction** | Repeated pattern; introduce interface/type/util |
| **God objects** | Class/module doing too much; split |
| **Deep nesting** | >3 levels; early return, extract |

### 3. Output suggestions

Produce `docs/refactor-suggestions-[date].md`:

```markdown
# Refactor Suggestions — [Date]

## 1. Duplicate code
- **Location:** src/utils/formatDate.ts, src/components/BookingCard.tsx
- **Issue:** Same date formatting logic
- **Suggestion:** Extract to shared formatDate() in utils

## 2. Large function
- **Location:** src/services/bookingService.ts:createBooking
- **Issue:** 45 lines; mixed validation, transform, DB call
- **Suggestion:** Extract validateBooking(), transformBookingPayload()

## 3. Poor naming
- **Location:** src/hooks/useData.ts
- **Issue:** Variable `d` unclear
- **Suggestion:** Rename to `bookingList` or `userBookings`

## Priority
- P0: [blocking / high impact]
- P1: [nice to have]
```

## Rules

- **Suggest, don't auto-apply** — Output recommendations; user decides
- Follow project patterns when suggesting
- One suggestion per issue; be specific
- Link to workflow-impact-analysis if refactor touches many files

# Project State

> **Single source of truth.** All agents read and update this file before acting.
> Flow: `read project-state → perform task → update project-state`

## Agent instructions

| When | Action |
|------|--------|
| **Before any task** | Read this file — stack, phase, active task, lessons, open decisions |
| **After completing work** | Update: Completed Tasks; Key Decisions (if applicable); Lessons Learned (if reusable pattern) |
| **When phase changes** | Update: Current Phase; Active Task; Task Board state |
| **When architecture changes** | Update: Technology Stack; Key Decisions; Structure & Patterns |

---

## Project

| Field | Value |
|-------|-------|
| **Name** | — |
| **Status** | Planning / In Progress / On Hold / Done |

---

## Current Phase

—

---

## Active Task

—

---

## Technology Stack

| Layer | Choice |
|-------|--------|
| **Frontend** | — |
| **Backend** | — |
| **Database** | — |
| **Auth** | — |
| **Infra** | — |

---

## Completed Tasks

- *(Add as work completes)*

---

## Open Decisions

- *(Add decisions that need resolution; remove when resolved)*

---

## Task Board

| ID | Title | Assign | State |
|----|-------|--------|-------|
| — | — | — | ⬜ PENDING |

---

## Key Decisions (resolved)

- *(Add decisions as they are made; rationale when significant)*

---

## Lessons Learned

- *(Reusable patterns; e.g. "API returns null, not [] — use optional chaining")*
- *(From bugs, integrations, architecture — agents reference before similar work)*

---

## User Approvals

- *(Add when user approves Product Planning, UX, Content, etc.)*

---

## Structure & Patterns

- **Entry points:** —
- **Key directories:** —
- **Patterns:** —

---

*Last updated: —*

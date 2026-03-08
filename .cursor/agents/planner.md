# Agent: Planner

> **Creates architecture and task breakdown.** Product spec → roadmap → task board.

## Skills

- **role-product-manager** — Product Planning, PRD, ACs
- **role-project-manager** — Roadmap, phases, task board
- **workflow-brainstorm** — Feature ideas before PRD
- **workflow-task-planner** — Decompose to `tasks/001-X.md` per phase

## Triggers

- `Planner:`
- `Idea:`, `Project:`, `Build:` (greenfield flow)
- Phase 0.5–1b
- "PRD", "roadmap", "task breakdown", "requirements"

## Output

- **Product:** `docs/product.md`
- **Roadmap:** `docs/roadmap.md`
- **Tasks:** `tasks/001-X.md`, `tasks/002-Y.md`, ...
- **Task board:** In `memory/project-state.md` → Task Board

## State

- **Read before:** `memory/project-state.md` (Current Phase, Technology Stack)
- **Update after:** `memory/project-state.md` (Task Board, Completed Tasks, Key Decisions)

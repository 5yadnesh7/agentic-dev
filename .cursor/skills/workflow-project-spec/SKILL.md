---
name: workflow-project-spec
description: Spec-first engineering. NEVER code before spec. Converts idea → product → architecture → database → API → tasks. Use for Spec:, "generate project spec", "project spec for X".
tags: [strategic, spec, planning]
layer: strategic
---

# Workflow: Spec-First Engineering

## Skill contract

| | |
|-|-|
| **Layer** | Strategic |
| **Input** | Idea; optionally research, assumptions |
| **Output** | docs/product.md, architecture.md, database.md, api.md, tasks.md |
| **Dependencies** | — |
| **Purpose** | Convert idea into structured specification; never code before spec |

## Purpose

**Professional engineering starts with specs.** Convert any idea into a structured specification. **NEVER code before the spec exists.**

Most AI coding failures happen because the model jumps straight to implementation. This skill forces spec-first discipline.

## Core rule

**NEVER implement before spec.** Do not write code until `docs/product.md`, `docs/architecture.md`, `docs/database.md`, `docs/api.md`, `docs/tasks.md` exist and user has approved.

## When to run

- **Trigger:** `Spec: [idea]`
- **User says:** "generate project spec", "project spec for X", "full spec for [idea]"
- **Context:** Greenfield; always before implementation

## Internal flow (must follow in order)

```
idea
  ↓
problem definition
  ↓
user flows
  ↓
architecture
  ↓
database schema
  ↓
API contract
  ↓
tasks
  ↓
user approval
```

## Output files

| File | Content |
|------|---------|
| `docs/user-docs/product-manager/product.md` | Problem definition, users, core/non-core features, user flows, business rules |
| `docs/user-docs/architect/architecture.md` | High-level architecture, tech stack, modules |
| `docs/user-docs/architect/database.md` | Schema outline, entities, relationships |
| `docs/user-docs/architect/api.md` | API endpoints, contracts, auth |
| `docs/user-docs/planner/tasks.md` | Initial task breakdown |

**Rule:** Create each folder (e.g. docs/user-docs/product-manager/, docs/user-docs/architect/) if not exist before writing.

## Step-by-step process

### 1. Understand problem

- Extract: product name, domain, scope, target users, core problem
- **Checklist:** [ ] Problem clearly defined; [ ] Scope clear

### 2. Define product scope

- Use role-product-manager or product-planning patterns
- Core vs non-core features, user journeys
- **Checklist:** [ ] product.md written

### 3. Define user flows

- Key flows: signup → onboarding → core action → success
- Include in product.md or separate section

### 4. Define architecture

- Tech stack, modules, high-level structure
- **Checklist:** [ ] architecture.md written

### 5. Design database

- Entities, relationships, schema outline
- **Checklist:** [ ] database.md written

### 6. Define API contract

- Endpoints, methods, auth, contracts
- **Checklist:** [ ] api.md written

### 7. Create tasks

- Task IDs, titles, sizes, dependencies
- **Checklist:** [ ] tasks.md written

### 8. Ask user approval

- Present spec summary
- **Gate:** Do not proceed to implementation until user approves
- **Checklist:** [ ] User has approved spec

## Rules

- **Spec-first** — Never code before spec exists
- Write to `docs/` (or user-specified path)
- User approval gate required before implementation

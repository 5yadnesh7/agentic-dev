---
name: workflow-project-context
description: Get and maintain project context. Creates/updates docs/project-context.md. Run at Phase 0 (explore) and after each phase to update context for future reuse. Use for Explore:, brownfield, or when user asks for project/codebase context.
tags: [strategic, context, exploration]
layer: strategic
---

# Workflow: Project Context

## Skill contract

| | |
|-|-|
| **Layer** | Strategic |
| **Input** | Codebase; phase output |
| **Output** | docs/project-context.md (updated) |
| **Dependencies** | — |
| **Purpose** | Get and maintain project context; update after each phase |

## Purpose

Get and maintain a **persistent project context doc** that is:
- Created at project start (Phase 0 or when exploring)
- **Updated after each phase completes** — so future phases and agents can reuse it
- A single source for stack, structure, patterns, and phase outputs

## When to run

- User says: "explore this repo", "get project context", "what's the stack?", "explain this codebase", "Explore:"
- **Phase 0** — When existing repo detected (brownfield)
- **After each phase completes** — Invoke to update context with that phase's output (see "Phase update" below)

## Output location

`docs/project-context.md` — committed to repo so it persists and is reusable.

---

## Step-by-step process

### Initial creation (Phase 0 / explore)

#### Step 1: Entry points
- Find `package.json`, `requirements.txt`, `go.mod`, etc.
- Find main entry: `index.js`, `main.py`, `src/main.ts`, `app/` (Next.js)
- List run scripts: `npm start`, `npm run dev`, etc.

**Checklist:** [ ] Manifest found; [ ] Entry point identified; [ ] Scripts listed

#### Step 2: Directory structure
- Map folders: `src/`, `app/`, `components/`, `services/`, `models/`, `routes/`, `tests/`
- Note conventions: feature-based vs layer-based
- Identify config files

**Checklist:** [ ] Folders mapped; [ ] Convention noted; [ ] Config files listed

#### Step 3: Stack identification
- Frontend, Backend, Database, Testing (Jest, Playwright), Linting, Build

**Checklist:** [ ] All stack components identified

#### Step 4: Patterns
- Components, services, models, tests (location, naming)
- Error handling, API shape

**Checklist:** [ ] Components, services, API shape documented

#### Step 5: How to run
- Install, Dev, Test, Build, Lint

**Checklist:** [ ] All run commands documented

#### Step 6: Constraints for new work
- Match [patterns], Use [libs], Avoid [anti-patterns]

**Checklist:** [ ] Constraints written; [ ] Output file created; [ ] Commit: `docs: add project context`

---

## Phase update (after each phase completes)

**Append to or update** `docs/project-context.md` with a section for that phase:

```markdown
## Phase [X] — [Phase name] (DONE)

### Output
- [Key output 1]
- [Key output 2]

### Key decisions
- [Decision 1]
- [Decision 2]

### Files created/modified
- path/to/file — [purpose]
```

This allows future phases to reference "what Phase 2 produced", "what Phase 3 added", etc., without re-reading long history.

---

## Output format (initial + phase sections)

```markdown
# Project Context — [repo / feature name]

> Updated after each phase. Reuse for future development.

## Stack
- Frontend: [framework, state, styling]
- Backend: [framework, lang]
- Database: [DB, ORM]
- Testing: Jest, Playwright
- Lint/Build: [tools]

## Directory structure
[Tree or list of key dirs]

## Patterns
- Components: [where, naming]
- Services: [where, naming]
- API: [shape]
- Tests: [location]

## How to run
- Install: ...
- Dev: ...
- Test: ...
- Build: ...

## Constraints for new work
- Match [patterns]
- Use [existing libs]
- Avoid [anti-patterns]

---
## Phase history

### Phase 0 — Setup (DONE)
- Branch: feature/[TICKET]-[desc]
- ...

### Phase 1 — UX Design (DONE)
- Screens: [list]
- Key flows: [list]
- ...

### Phase 2 — Technical Design (DONE)
- Schema: [summary]
- APIs: [summary]
- ...

### Phase 3–4 — Implementation (DONE)
- Models: [list]
- Endpoints: [list]
- Components: [list]
- ...

[Continue for each completed phase]
```

---

## Rules

- **Update, don't replace** — Add new phase section; keep prior phases for history.
- **Commit** after update: `docs: update project context for Phase [X]`
- **Read before starting** a phase: reference `docs/project-context.md` to avoid re-exploring.
- Use for brownfield onboarding and for agents resuming work after a break.

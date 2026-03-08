---
name: workflow-context-map
description: Build a repo mental map. Where logic lives, where to edit, what not to touch. Large repos confuse LLMs—this skill fixes that. Use for ContextMap:, "map the repo", "repo structure", "where does X live".
---

# Workflow: Context Map

## Purpose

Large repos confuse LLMs. This skill builds a **repo mental map**: where logic lives, where to edit code, what not to touch. Makes Cursor far more accurate when navigating the codebase.

## When to run

- **Trigger:** `ContextMap:`
- **User says:** "map the repo", "repo structure", "where does X live", "codebase map"
- **Context:** Brownfield; before making changes; when lost in a large codebase

## Output

`docs/context-map.md` with tree structure and annotations.

## Output format

```markdown
# Context Map — [repo name]

> Where logic lives. Where to edit. What not to touch.

## Structure

frontend/
 ├ components/     # UI components
 ├ pages/          # Route pages
 ├ hooks/          # Shared hooks
 └ utils/          # Helpers

backend/
 ├ routes/         # HTTP endpoints
 ├ controllers/    # Request handlers
 ├ services/       # Business logic
 └ models/         # Data models

database/
 ├ schema/         # Table definitions
 └ migrations/     # Migration files

## Edit map

| To change... | Edit here | Don't touch |
|--------------|-----------|-------------|
| API endpoint | backend/routes/, controllers/ | models/ |
| UI component | frontend/components/ | backend/ |
| Auth logic | backend/services/auth | frontend/components/ |
| Schema | database/schema/, migrations | — |

## Logic locations

- Auth: backend/services/auth.ts, middleware/auth.ts
- User CRUD: backend/controllers/userController.ts
- Login UI: frontend/pages/Login.tsx, components/LoginForm.tsx
```

## Step-by-step process

### 1. Scan structure

- List top-level dirs (frontend, backend, src, app, etc.)
- Identify convention (feature-based, layer-based)
- **Checklist:** [ ] Structure scanned

### 2. Build tree

- Key dirs with purpose
- Subdirs that matter for editing
- **Checklist:** [ ] Tree built

### 3. Map edit locations

- "To change X, edit Y"
- "Don't touch Z when doing X"
- **Checklist:** [ ] Edit map written

### 4. List logic locations

- Where auth lives
- Where API calls happen
- Where state is managed
- **Checklist:** [ ] Logic locations documented

## Rules

- Update when structure changes
- Keep concise; this is for quick reference
- Reference from workflow-project-context for richer context

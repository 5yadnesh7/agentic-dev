---
name: workflow-get-project-context
description: Get whole project context—every small bit of information—and write to docs/user-docs/workflow-get-project-context/project-context-full.md. Use when user asks for full project context, complete codebase map, or exhaustive project documentation.
tags: [strategic, context, exploration]
layer: strategic
---

# Workflow: Get Project Context (Comprehensive)

## Skill contract

| | |
|-|-|
| **Layer** | Strategic |
| **Input** | Codebase |
| **Output** | docs/user-docs/workflow-get-project-context/project-context-full.md (exhaustive) |
| **Dependencies** | — |
| **Purpose** | Capture complete project context for onboarding or handoff |

## Purpose

Capture **every small bit of project information** into a single Markdown file. Exhaustive deep dive: all files, configs, dependencies, env, scripts, patterns, conventions. Produces `docs/user-docs/workflow-get-project-context/project-context-full.md` for full onboarding or context handoff. Create docs/user-docs/workflow-get-project-context/ if not exist.

## When to run

- **User says:** "get full project context", "complete codebase map", "document everything about this project", "exhaustive project context"
- **Trigger:** `GetContext:` or "whole project context"
- **Onboarding** — New agent or human needs full picture
- **Handoff** — Before long break; need complete snapshot

**Distinct from workflow-project-context:**
- **workflow-project-context** — High-level summary; updated per phase; `docs/user-docs/workflow-project-context/project-context.md`
- **workflow-get-project-context** — Exhaustive; every detail; `docs/user-docs/workflow-get-project-context/project-context-full.md`

## Step-by-step process

### 1. Scan project root

- **Manifest:** package.json, requirements.txt, go.mod, Cargo.toml, pom.xml
- **Config:** tsconfig, vite.config, tailwind.config, .eslintrc, .prettierrc
- **Env:** .env.example, .env.sample (never .env)
- **Docs:** README, CHANGELOG, CONTRIBUTING

### 2. Map directory structure

- **Full tree** — Every directory and key files (exclude node_modules, .git, build)
- **Purpose** — What each dir holds (src, tests, scripts, config)

### 3. Dependencies

- **Production** — All prod deps with version
- **Dev** — Dev deps (test, lint, build)
- **Scripts** — npm/pip/cargo scripts with description

### 4. Entry points and flow

- **Main entry** — index.js, main.ts, App.tsx
- **Routes** — API routes, page routes
- **Bootstrap** — How app starts

### 5. Source code map

For each significant directory:
- **Purpose** — What it contains
- **Key files** — List with 1-line summary
- **Patterns** — Naming, structure
- **Exports** — Main exports if applicable

### 6. Database and data

- **ORM / DB client** — Type, config
- **Models** — List with key fields
- **Migrations** — Location, naming

### 7. API surface

- **Endpoints** — Method, path, purpose
- **Auth** — How auth works (JWT, session, etc.)

### 8. Frontend (if applicable)

- **Framework** — React, Vue, etc.
- **State** — Redux, Zustand, etc.
- **Routing** — Next.js, React Router, etc.
- **Components** — Key components, layout

### 9. Tests

- **Location** — Where tests live
- **Framework** — Jest, Playwright, pytest
- **Commands** — How to run

### 10. Environment and scripts

- **Env vars** — Required vars (from .env.example)
- **Run commands** — install, dev, test, build, lint
- **CI/CD** — GitHub Actions, etc. if present

### 11. Conventions

- **Naming** — camelCase, snake_case
- **File placement** — Where to put new files
- **Error handling** — Pattern used
- **API shape** — Response format

## Output location

`docs/user-docs/workflow-get-project-context/project-context-full.md` — comprehensive, can be long. Optionally add to .gitignore if too large for commits; otherwise commit for onboarding.

## Output format

```markdown
# Project Context (Full) — [repo name]

> Exhaustive project documentation. Every small bit of information.

## 1. Overview
- **Type:** [web app, API, lib]
- **Stack:** [summary]
- **Purpose:** [one paragraph]

## 2. Manifest & config
### package.json (or equivalent)
- **Name:** [name]
- **Scripts:** [list with description]
- **Dependencies:** [prod deps]
- **DevDependencies:** [dev deps]

### Config files
| File | Purpose |
|------|---------|
| tsconfig.json | TypeScript config |
| vite.config.ts | Build config |
| ... | ... |

## 3. Directory structure
\`\`\`
[tree excluding node_modules, .git, build]
\`\`\`

## 4. Source map
### src/
| Path | Purpose |
|------|---------|
| src/main.ts | Entry point |
| src/routes/auth.ts | Auth routes |
| ... | ... |

### tests/
| Path | Purpose |
|------|---------|
| ... | ... |

## 5. Database
- **ORM:** [Sequelize, Prisma, etc.]
- **Models:** [list with fields]
- **Migrations:** [path]

## 6. API
| Method | Path | Purpose |
|--------|------|---------|
| POST | /auth/login | Login |
| ... | ... | ... |

## 7. Frontend (if applicable)
- **Framework:** [React, etc.]
- **State:** [Redux, etc.]
- **Key components:** [list]

## 8. Environment
| Var | Purpose |
|-----|---------|
| DATABASE_URL | DB connection |
| ... | ... |

## 9. Commands
| Command | Purpose |
|---------|---------|
| npm install | Install deps |
| npm run dev | Start dev server |
| npm test | Run tests |
| ... | ... |

## 10. Conventions
- **Naming:** [pattern]
- **File placement:** [rule]
- **Error handling:** [pattern]
- **API response:** [shape]
```

## Rules

- **Exhaustive** — Capture every small bit; no major area left out
- **Structured** — Use tables and lists; scannable
- **No secrets** — Document required vars, never actual values
- **Update** — Re-run when project changes significantly
- **Commit** — `docs: add full project context` (unless file is gitignored)

# TOOLS — Agent tool layer

> **Agents without tools = chatbot. Agents with tools = developer.**

Agents use tools to interact with the world. This directory documents the tool layer and what agents can use.

---

## Tool categories

| Tool | Purpose | How agents use it | Notes |
|------|---------|-------------------|-------|
| **Search** | Find code, docs, patterns | `SemanticSearch`, `Grep`, `WebSearch` | Use for exploring codebase, finding references |
| **Filesystem** | Read, write, edit files | `Read`, `Write`, `StrReplace`, `Glob` | Create/edit source, config, docs |
| **Git** | Version control | `Shell` (git commands) | Branches, commits, status; workflow-git-jira |
| **Terminal** | Run commands | `Shell` | npm, migrations, tests, builds |
| **Package manager** | Dependencies | `Shell` (npm, pip, etc.) | Install, update, audit |
| **Test runner** | Execute tests | `Shell` (npm test, pytest, etc.) | Unit, integration, E2E |
| **GitHub** | Repo operations | MCP / API when available | PRs, issues; workflow-pr-generator |

---

## Cursor-provided tools (built-in)

These are available to the AI agent in Cursor:

| Tool | Use when |
|------|----------|
| `Read` | Read file contents |
| `Write` | Create or overwrite file |
| `StrReplace` | Edit specific text in file |
| `Grep` | Search by regex in codebase |
| `SemanticSearch` | Search by meaning |
| `Glob` | Find files by pattern |
| `Shell` | Run terminal commands |
| `WebSearch` | Search the web |
| `mcp_web_fetch` | Fetch URL content |

Agents should use these rather than inventing new workflows.

---

## Tool usage rules

1. **Prefer project tools** — Use existing npm scripts, Makefile targets before raw commands
2. **Log useful results** — Add successful commands to `docs/tool-memory.md` when helpful
3. **Don't repeat failures** — Check tool-memory before retrying similar commands
4. **Security** — Never run commands that expose secrets; use `.env` and avoid committing credentials

---

## Project-specific tools

When working in a codebase, agents should:

- **Tests:** `npm test` (Jest), `npm run test:e2e` (Playwright), or project equivalent
- **Lint:** `npm run lint`
- **Build:** `npm run build`
- **DB:** `npm run db:migrate`, `npm run db:seed` (if defined)
- **Git:** See `workflow-git-jira` for branch/commit conventions

---

## Tool memory

Results of tool runs that are worth reusing live in `docs/tool-memory.md`. Agents update it when:

- A command succeeds after earlier failures
- Env or config is discovered
- A pattern is established for future runs

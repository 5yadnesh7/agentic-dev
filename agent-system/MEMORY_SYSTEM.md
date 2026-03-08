# MEMORY SYSTEM — Agent memory layers

Agentic systems need memory to avoid repeating work and to maintain context across phases. Without persistent state, agents forget decisions and become inconsistent. This document defines the memory layers and **stateful reasoning**.

---

## Stateful reasoning (core principle)

**Every agent must follow:**

```
read state → think → act → update state
```

| Phase | Action |
|-------|--------|
| **Read** | project-brain, project-context, project-memory, dev-lessons (as applicable) |
| **Think** | Analyze, plan, hypothesize |
| **Act** | Implement, fix, test |
| **Update** | Write back: project-memory, project-brain, dev-lessons, decision-log |

**Why:** Chat history gets truncated and loses structure. Structured state is the single source of truth.

---

## Self-evolving skills (evolution loop)

```
solve problem → extract knowledge → create skill → reuse next time
```

When a **reusable playbook** appears 2+ times (bug fix, feature, integration):
1. Invoke **workflow-skill-creator**
2. Summarize the solution; convert to reusable instructions
3. Save as `.cursor/skills/<name>/SKILL.md` with `tags` for discovery
4. Register in SKILL_INDEX

**Result:** More projects → more skills → better performance. The system accumulates experience.

---

---

## Memory layers

| Memory | Purpose | Storage | Updated by |
|--------|---------|---------|------------|
| **Short memory** | Current conversation; immediate context | Cursor chat session | Automatic |
| **Project memory** | Phase status, decisions, task state | `docs/project-memory.md` | workflow-project-context, orchestrator |
| **Tool memory** | Previous commands, results, reusable snippets | `docs/tool-memory.md` (optional) | Agents after tool use |
| **Knowledge memory** | Research results, architecture, patterns | `docs/project-context.md`, `docs/` | workflow-project-context, research, phases |

---

## 1. Short memory (current conversation)

- **What:** Messages in the current Cursor chat; agent reasoning during the session
- **Where:** Cursor maintains automatically
- **Use:** Immediate context; what the user just said; current task
- **Limit:** Session-bound; not persisted across new chats

**Agent rule:** Don’t assume the next session will know this. Write important conclusions to project or knowledge memory.

---

## 2. Project memory

- **What:** Current phase, completed phases, open tasks, blockers, key decisions, user approvals
- **Where:** `docs/project-memory.md`
- **Updated:** After each phase; when tasks change; when blockers appear or clear

**Schema (example):**

```markdown
# Project Memory — [feature/scope]

## Status
- Current phase: [X]
- Blockers: [list or none]
- Next: [what runs next]

## Completed phases
- [ ] -2 Idea | [ ] -1 Research | [x] 0 Setup | [x] 1 UX | ...

## Task board
| ID | Title | State |
|----|-------|-------|
| BE-01 | Auth | ✅ DONE |
| FE-01 | Login form | 🔄 IN LOOP |

## Key decisions
- [Date] [Decision] — [rationale]

## User approvals
- [Date] Product Planning — approved
- [Date] UX — approved
```

**Agent rule:** Update project memory after each phase. Read it before starting the next phase.

---

## 3. Tool memory (previous commands / results)

- **What:** Commands run, outcomes, useful snippets (e.g. npm scripts, env setup)
- **Where:** `docs/tool-memory.md` (optional; create when useful)
- **Updated:** When an agent runs terminal/file/GitHub tools and gets useful output

**Schema (example):**

```markdown
# Tool Memory

## Commands that worked
| Command | Result | When |
|---------|--------|------|
| npm run db:migrate | OK | 2025-03-08 |
| npm test -- auth | 12 passed | 2025-03-08 |

## Env / config notes
- DATABASE_URL required for migrations
- JWT_SECRET in .env
```

**Agent rule:** Append useful tool results so future runs don’t repeat failed commands.

---

## 4. Knowledge memory (research, architecture, patterns)

- **What:** Stack, structure, architecture decisions, research findings, patterns
- **Where:** `docs/project-context.md`, `docs/project-context-full.md`, `docs/project-brain.md`, research docs
- **Updated:** workflow-project-context after each phase; research analyst; LLD/HLD outputs

**Sources:**
- `docs/project-context.md` — High-level summary; per-phase updates
- `docs/project-context-full.md` — Exhaustive context (from GetContext:)
- `docs/project-brain.md` — **Project brain:** vision, decisions, stack, open questions, lessons. Every agent reads and updates.
- `docs/decision-log.md` — **Why** decisions were made; rationale for architecture choices
- `docs/dev-lessons.md` — Lessons learned; reusable patterns from bugs and fixes
- `docs/` — Research, PRD, architecture, API specs

**Agent rule:** Read project-context and project-brain before a phase. Update project-brain after key decisions. Log "why" in decision-log when making architecture decisions.

---

## Stack options (future)

For larger systems, consider:

| Need | Option |
|------|--------|
| Structured project memory | SQLite, DuckDB |
| Semantic search over docs | Vector DB (e.g. embeddings + Pinecone/Chroma) |
| Tool history at scale | SQLite + command hash |

The current setup (Markdown in `docs/`) is enough for most Cursor-based flows.

---

## Checklist for agents

- [ ] Read `docs/project-memory.md` at phase start
- [ ] Read `docs/project-brain.md` and `docs/project-context.md` before implementation
- [ ] Update `docs/project-memory.md` after each phase
- [ ] Update `docs/project-context.md` via workflow-project-context
- [ ] Update `docs/project-brain.md` after key decisions or lessons learned
- [ ] Optionally append to `docs/tool-memory.md` after useful tool runs

# MEMORY SYSTEM — Agent memory layers

Agentic systems need memory to avoid repeating work and to maintain context across phases. Without persistent state, agents forget decisions and become inconsistent. This document defines the memory layers and **stateful reasoning**.

---

## Central architecture (single source of truth)

**Two files in `memory/` form the core:**

| File | Purpose |
|------|---------|
| **`memory/project-state.md`** | Single source of truth. All agents read and update before acting. Consolidates project, phase, tasks, stack, decisions, lessons. |
| **`memory/agent-messages.md`** | Shared communication channel. Agents leave notes for each other (e.g. Architect → Reviewer). Enables collaboration, architecture debate, decision trails. |

**Agent flow:**

```
read project-state → (optionally read agent-messages) → perform task → update project-state → (optionally post to agent-messages)
```

**Pipeline placement:**

```
User Idea → Supervisor → Planner → Architect → Agent Messages (discussion) → Reviewer → Task Planner → Worker ↔ Critic → Tester
                                                                  ↑
                                                    project-state.md tracks everything
```

**Why project-state:** Prevents duplicated decisions, lost context, inconsistent planning. Acts as the central brain.

**Why agent-messages:** Enables collective intelligence—agents collaborate instead of only operating sequentially.

---

## Stateful reasoning (core principle)

**Every agent must follow:**

```
read state → think → act → update state
```

| Phase | Action |
|-------|--------|
| **Read** | `memory/project-state.md` (primary); `memory/agent-messages.md` if collaboration needed |
| **Think** | Analyze, plan, hypothesize |
| **Act** | Implement, fix, test |
| **Update** | `memory/project-state.md`; optionally post to `memory/agent-messages.md` for handoffs |

**Legacy:** `docs/user-docs/shared/project-brain.md`, `docs/user-docs/workflow-project-context/project-context.md`, `docs/user-docs/shared/project-memory.md`, `docs/system-docs/dev-lessons.md` are consolidated into `memory/project-state.md`. Use project-state for new work. Docs files may remain for backward compatibility.

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

## Memory layers (summary)

| Layer | Purpose | File | Updated by |
|-------|---------|------|------------|
| **Session** | Current chat; immediate context | Cursor chat | Automatic |
| **Project state** | Phase, tasks, stack, decisions, lessons | `memory/project-state.md` | All agents |
| **Agent messages** | Inter-agent communication | `memory/agent-messages.md` | Architect, Reviewer, CTO, etc. |
| **Decisions** | Why choices were made (detailed) | `docs/system-docs/decision-log.md` | Architect, CTO |
| **Knowledge** | Exhaustive context | `docs/user-docs/workflow-get-project-context/project-context-full.md` | workflow-get-project-context |
| **Tool** | Commands, env notes | `docs/system-docs/tool-memory.md` | Optional |

---

## Memory layers (detail)

| Memory | Purpose | Storage | Updated by |
|--------|---------|---------|------------|
| **Short memory** | Current conversation; immediate context | Cursor chat session | Automatic |
| **Project state** | Phase, tasks, stack, decisions, lessons | `memory/project-state.md` | All agents |
| **Agent messages** | Inter-agent handoffs, architecture debate | `memory/agent-messages.md` | Architect, Reviewer, etc. |
| **Tool memory** | Previous commands, results, reusable snippets | `docs/system-docs/tool-memory.md` (optional) | Agents after tool use |
| **Knowledge memory** | Research, architecture, patterns, full context | `docs/user-docs/workflow-get-project-context/project-context-full.md`, `docs/user-docs/` | workflow-get-project-context, research |

---

## 1. Short memory (current conversation)

- **What:** Messages in the current Cursor chat; agent reasoning during the session
- **Where:** Cursor maintains automatically
- **Use:** Immediate context; what the user just said; current task
- **Limit:** Session-bound; not persisted across new chats

**Agent rule:** Don’t assume the next session will know this. Write important conclusions to project or knowledge memory.

---

## 2. Project state (central brain)

- **What:** Project name, phase, active task, stack, completed tasks, open decisions, task board, lessons learned
- **Where:** `memory/project-state.md`
- **Updated:** After each phase; when tasks change; when decisions are made; when lessons are learned

**Agent rule:** Read project-state at session/phase start. Update project-state after each phase or significant action. Do not act without reading state first.

**Schema:** See `memory/project-state.template.md` for the full schema. Use `memory/project-state.md` in project root. Required sections: Current Phase, Active Task, Completed Tasks, Key Decisions, Lessons Learned, Task Board.

---

## 3. Tool memory (previous commands / results)

- **What:** Commands run, outcomes, useful snippets (e.g. npm scripts, env setup)
- **Where:** `docs/system-docs/tool-memory.md` (optional; create when useful)
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

## 4. Agent messages (collaboration)

- **What:** Notes from one agent to another (e.g. Architect → Reviewer)
- **Where:** `memory/agent-messages.md`
- **Updated:** When an agent needs to hand off context, request review, or debate a decision

**Schema (see `agent-system/HANDOFF_CONTRACTS.md`):**
```markdown
**[FromAgent → ToAgent]**
Context: [one-line]
[Message body]
Request: [what ToAgent should do]
```

**When to read:** Before acting if CTO (or workflow) indicates you are the recipient of a handoff; or if project-state says "Awaiting [YourRole]". Search for `[.* → YourRole]`.

**Agent rule:** Post to agent-messages when handing off to another agent or when a decision needs review. Read agent-messages before acting if you are the recipient.

---

## 5. Knowledge memory (research, architecture, patterns)

- **What:** Stack, structure, architecture decisions, research findings, full codebase context
- **Where:** `memory/project-state.md` (summary), `docs/user-docs/workflow-get-project-context/project-context-full.md` (exhaustive), `docs/user-docs/` (research, PRD, specs)
- **Updated:** workflow-project-context / workflow-get-project-context; research analyst; LLD/HLD outputs

**Sources:**
- `memory/project-state.md` — **Primary.** Stack, structure, patterns, decisions, lessons
- `docs/user-docs/workflow-get-project-context/project-context-full.md` — Exhaustive context (from GetContext:)
- `docs/system-docs/decision-log.md` — Why decisions were made; rationale
- `docs/user-docs/` — Research, PRD, architecture, API specs

**Agent rule:** Read project-state before a phase. Update project-state after key decisions. Log "why" in decision-log when making architecture decisions.

---

## Recovery and resume

If an agent run is interrupted (session ended, error, user stop):

1. **Read state** — `memory/project-state.md` (and `memory/agent-messages.md` if handoff context)
2. **Identify last completed phase** — From "Completed Tasks" and "Current Phase"
3. **Identify in-progress task** — From "Active Task" or "Task Board" (IN LOOP or PENDING)
4. **Resume from next step** — Do not restart; continue from where execution stopped
5. **Re-validate if unsure** — Re-read project-state; confirm blockers and next phase

**Agent rule:** Always read project-state at session start. If "Current Phase" or "Active Task" shows work in progress, resume that work instead of starting fresh.

---

## Stack options (future)

For larger systems, consider:

| Need | Option |
|------|--------|
| Structured project memory | SQLite, DuckDB |
| Semantic search over docs | Vector DB (e.g. embeddings + Pinecone/Chroma) |
| Tool history at scale | SQLite + command hash |

The current setup (Markdown in `docs/user-docs/`) is enough for most Cursor-based flows.

---

## Checklist for agents

- [ ] Read `memory/project-state.md` at phase/session start
- [ ] Read `memory/agent-messages.md` if CTO/workflow indicates handoff to you, or if project-state says "Awaiting [YourRole]"
- [ ] Update `memory/project-state.md` after each phase or significant action
- [ ] Post to `memory/agent-messages.md` when handing off to another agent or requesting review
- [ ] Optionally append to `docs/system-docs/tool-memory.md` after useful tool runs

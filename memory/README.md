# Memory — Project state and agent communication

Persistent state and inter-agent communication. **Every agent reads and updates these files.**

## Files

| File | Purpose |
|------|---------|
| **`project-state.md`** | Single source of truth. Project, phase, tasks, stack, decisions, lessons. All agents read and update before acting. |
| **`agent-messages.md`** | Shared communication channel. Agents leave notes for each other (e.g. Architect → Reviewer). Enables collaboration and decision trails. |

## Stateful reasoning

```
read project-state → perform task → update project-state
```

Optionally read/post `agent-messages.md` when collaborating or handing off.

## Project bootstrap

**When `memory/` folder is missing:** Create `memory/` and copy templates:
1. `memory/project-state.template.md` → `memory/project-state.md`
2. Optionally create `memory/agent-messages.md` from schema in `agent-system/HANDOFF_CONTRACTS.md` §3.

**When `project-state.md` does not exist:** Copy `memory/project-state.template.md` to `memory/project-state.md`. All agents require project-state before acting.

## See also

- `agent-system/MEMORY_SYSTEM.md` — Full memory layer definition
- `docs/system-docs/decision-log.md` — Why decisions were made (detailed rationale)
- `docs/user-docs/workflow-get-project-context/project-context-full.md` — Exhaustive codebase context (from GetContext:)

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

## See also

- `agent-system/MEMORY_SYSTEM.md` — Full memory layer definition
- `docs/decision-log.md` — Why decisions were made (detailed rationale)
- `docs/project-context-full.md` — Exhaustive codebase context (from GetContext:)

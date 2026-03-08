# Memory — Project state

Persistent state for agents. **Every agent reads and updates these files.**

## Files (in docs/)

| File | Purpose |
|------|---------|
| `docs/project-brain.md` | Vision, decisions, stack, open questions, lessons |
| `docs/project-memory.md` | Current phase, task board, blockers |
| `docs/project-context.md` | Stack, structure, patterns (updated per phase) |
| `docs/decision-log.md` | Why decisions were made |
| `docs/dev-lessons.md` | Lessons learned; reusable patterns |

## Stateful reasoning

```
read state → think → act → update state
```

Do not rely on chat history. Use structured files.

## See also

- `agent-system/MEMORY_SYSTEM.md` — Full memory layer definition

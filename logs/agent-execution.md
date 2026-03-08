# Agent execution log

> **Observability.** Orchestrator or dev-supervisor appends entries per phase. Helps debugging and auditing.

## Format

Each entry: `[YYYY-MM-DD HH:MM] Agent → Output | Status`

## Example entries

```
2026-03-08 10:00 planner → roadmap created | OK
2026-03-08 10:15 architect → architecture generated | OK
2026-03-08 10:30 reviewer → architecture review | BLOCKED — caching layer suggested
2026-03-08 10:45 architect → architecture revised | OK
2026-03-08 11:00 worker → task 001 implemented | OK
2026-03-08 11:15 critic → code review | CLEAR
2026-03-08 11:20 tester → npm test | 12 passed
```

## Status codes

| Status | Meaning |
|--------|---------|
| **OK** | Phase completed; output produced; no blockers |
| **BLOCKED** | Phase needs revision or user input before proceeding |
| **CLEAR** | Reviewer/critic pass complete; no blocking issues |

## Instructions for orchestrator

After each phase:
1. Append one line: `[timestamp] [agent] → [brief output] | [OK | BLOCKED | CLEAR]`
2. Keep this file committed so runs are traceable

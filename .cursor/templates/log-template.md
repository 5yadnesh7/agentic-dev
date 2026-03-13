# Agent execution log

> **Observability.** Orchestrator or dev-supervisor creates this file when work starts, then appends entries per phase. Helps debugging and auditing.

## Format

Each entry: `[YYYY-MM-DD HH:MM] Agent → Output | Status`

## Status codes

| Status | Meaning |
|--------|---------|
| **OK** | Phase completed; output produced; no blockers |
| **BLOCKED** | Phase needs revision or user input before proceeding |
| **CLEAR** | Reviewer/critic pass complete; no blocking issues |

## Instructions

When work starts: create `logs/` folder if not exist; create `logs/agent-execution.md` from this template. After each phase, append one line:

```
[YYYY-MM-DD HH:MM] [agent] → [brief output] | OK | BLOCKED | CLEAR
```

## Entries

*(Append new entries below this line)*


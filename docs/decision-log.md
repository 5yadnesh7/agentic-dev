# Decision Log

> **Why decisions were made.** Agents can check rationale. Updated when architecture or key technical decisions are made.

## Schema

| Field | Required | Description |
|-------|----------|-------------|
| Date | Yes | YYYY-MM-DD |
| Agent | Yes | planner, architect, reviewer, etc. |
| Decision | Yes | One-line summary |
| Reason | Yes | Rationale |
| Alternatives considered | Optional | What was rejected and why |

## Format

```markdown
## YYYY-MM-DD — [Decision]
**Agent:** architect
**What:** [e.g. Use PostgreSQL instead of MongoDB]
**Reason:** [e.g. Booking system requires relational integrity, ACID, joins]
**Alternatives considered:** [e.g. MongoDB — rejected due to complex relational queries]
```

## Entries

- [Add as decisions are made]

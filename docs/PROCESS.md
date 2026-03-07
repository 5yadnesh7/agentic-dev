# Process log (optional)

Use this file (or `.cursor/process-log.md`) to track steps and time per requirement/task. The agent appends entries when **workflow-process-log** is used.

## Format

```markdown
## YYYY-MM-DD
- [STEP] [step name] | [task/requirement id] | start: [ISO time]
  end: [ISO time] | duration: [Xm]
  (Optional: NOTE: took longer than expected; consider updating skill or LESSONS.md)
```

## Example

## 2025-03-05
- [STEP] PRD for login | PROJ-101 | start: 2025-03-05T10:00:00Z
  end: 2025-03-05T10:12:00Z | duration: 12m
- [STEP] Implement auth service | PROJ-101 BE-01 | start: 2025-03-05T10:15:00Z
  end: 2025-03-05T10:45:00Z | duration: 30m

---
name: workflow-process-log
description: Logs step name, start/end time, duration; flags slow steps. Use for process visibility, phase/task tracking, or when user wants time-per-step metrics. No UI dashboard.
tags: [operational, observability, logging]
layer: operational
---

# Workflow: Process Log

## Skill contract

| | |
|-|-|
| **Layer** | Operational |
| **Input** | Step name, phase/task id |
| **Output** | Entry in process-log with start/end, duration |
| **Dependencies** | — |
| **Purpose** | Log step timings; flag slow steps |

## Purpose

Maintain a human-readable log of workflow steps with timestamps and duration. Helps with visibility, debugging slow steps, and improving skills. Optional but recommended for Workflow execution.

## When to run

- **Phase or task transitions** — At start and end of each phase or task
- **User wants process visibility** — "Log the steps", "How long did X take?"
- **Workflow execution** — Can be always-on for full lifecycle
- **Debugging** — When a step took unexpectedly long

## Step-by-step process

### Step 1: Ensure log file exists

- **Location:** `.cursor/process-log.md` or `docs/system-docs/process-log.md`
- **Create if missing** with header:
  ```markdown
  # Process Log

  > Step name | Task/Phase ID | start | end | duration
  ```

**Checklist:** [ ] File exists; [ ] Header present

### Step 2: At step start

Append to log:

```
- [STEP] [step name] | [task/phase id] | start: [ISO 8601 time]
```

Examples:
- `- [STEP] PRD for login | PROJ-101 | start: 2025-03-05T10:00:00Z`
- `- [STEP] Implement BE-01 | PROJ-101 BE-01 | start: 2025-03-05T10:15:00Z`

**Checklist:** [ ] Step name; [ ] Task/Phase ID; [ ] ISO 8601 start time

### Step 3: At step end

Update the same entry (or append continuation):

```
  end: [ISO 8601 time] | duration: [Xm] [Ys]
```

If duration exceeds threshold, add:

```
  NOTE: took longer than expected (threshold: [X]m); consider updating skill or LESSONS.md
```

**Checklist:** [ ] End time; [ ] Duration; [ ] NOTE if over threshold

### Step 4: Thresholds (configurable)

| Step type | Default threshold | Action if exceeded |
|-----------|-------------------|--------------------|
| Small task (XS/S) | 15m | Add NOTE |
| Medium task (M) | 30m | Add NOTE |
| Phase (e.g. UX design) | 45m | Add NOTE |
| Full workflow | 2h | Add NOTE; consider breakdown |

## Log format example

```markdown
## 2025-03-05

- [STEP] PRD for login | PROJ-101 | start: 2025-03-05T10:00:00Z
  end: 2025-03-05T10:12:00Z | duration: 12m

- [STEP] Implement auth | PROJ-101 BE-01 | start: 2025-03-05T10:15:00Z
  end: 2025-03-05T10:45:00Z | duration: 30m
  NOTE: took longer than expected (threshold: 15m); consider updating skill or LESSONS.md

- [STEP] Unit tests BE-01 | PROJ-101 BE-01 | start: 2025-03-05T10:46:00Z
  end: 2025-03-05T10:52:00Z | duration: 6m
```

## Rules

- **Use ISO 8601** for timestamps (e.g. `2025-03-05T10:00:00Z`)
- **One entry per step** — Update in place when step ends, or append continuation lines
- **Don't block workflow** — Logging is best-effort; failures should not stop execution
- **Optional** — If no log file and user didn't ask, skip
- **Git:** `.cursor/process-log.md` can be in `.gitignore` if ephemeral; `docs/system-docs/process-log.md` typically committed

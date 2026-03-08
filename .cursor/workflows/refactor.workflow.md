# Workflow: Refactor

> **Trigger:** `Refactor:` or "refactor suggestions", "code quality"
>
> **Skill:** workflow-refactor. Outputs suggestions; does not auto-apply.

---

## Flow

```
Scope (path or recent changes)
     ↓
workflow-refactor (scan for issues)
     ↓
docs/refactor-suggestions-[date].md
     ↓
User decides what to implement
```

## Step-by-step

| # | Step | Action | Output |
|---|------|--------|--------|
| 1 | Scope | User specifies path or use recent changes | Target clear |
| 2 | Scan | workflow-refactor checks: duplicate code, large functions, poor naming, missing abstraction | Issues list |
| 3 | Report | Produce refactor-suggestions | Prioritized list |
| 4 | Implement | User/agent applies chosen suggestions | (optional) |

## Checks

- Duplicate code
- Large functions (>30 lines)
- Poor naming
- Missing abstraction
- God objects
- Deep nesting

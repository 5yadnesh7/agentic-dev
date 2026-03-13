# Dev Lessons

> **Agent learns over time.** Record patterns that worked, mistakes to avoid, correct approaches. Reference before similar work.

**Note:** When using the new memory layout, also update `memory/project-state.md` → Lessons Learned. This file can remain for detailed format or legacy projects.

## Format

```markdown
## Lesson: [Topic]
**Wrong:** [What was done incorrectly]
**Correct:** [Right pattern]
**When:** [Date or context]
```

## Example entries

## Lesson: JWT auth middleware
**Wrong:** JWT verified in controller; no middleware
**Correct:** Middleware verifies token, attaches user to req; controller trusts req.user
**When:** Auth implementation

## Lesson: API response shape
**Wrong:** Inconsistent {data}, {result}, raw array
**Correct:** Always { success, data } or { success, error }
**When:** API design

## Lesson: [Add as agents encounter patterns]
**Wrong:** ...
**Correct:** ...
**When:** ...

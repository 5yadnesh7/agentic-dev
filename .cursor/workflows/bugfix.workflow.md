# Workflow: Bugfix

> **Trigger:** `Bug: [description]` or "debug", "fix this bug"

## Flow

```
Reproduce → Semantic analysis → Root cause → Fix → Regression test → Verify → Commit
```

## Steps

1. **Reproduce** — Gather error, stack trace, steps
2. **Semantic analysis** — What should happen vs what does
3. **Root cause** — Single cause + file:line
4. **Fix** — Minimal change at root cause
5. **Regression test** — Test that would have caught it
6. **Verify** — `npm test`, `npm run lint`, bug gone
7. **Commit** — `fix(scope):` + `test(scope):` (two commits or per convention)

## Skill

- **workflow-semantic-debugging** — Full process

## Entry

User says e.g.: `Bug: login returns 500` or `fix this bug: cart total wrong`

## Reference

- `.cursor/skills/workflow-semantic-debugging/SKILL.md`

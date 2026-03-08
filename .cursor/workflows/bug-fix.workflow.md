# Workflow: Bug Fix

> **Trigger:** `Bug: [description]` or "debug", "fix this bug"
>
> **Skill:** workflow-semantic-debugging. Implements **Tester ↔ Coder** feedback loop.

---

## Collaborative loop: Tester ↔ Coder

```
Coder (fix) → Tester (verify)
     ↑                │
     └─ if fail ──────┘
```

**If verify fails:** Loop back to Fix. Do not commit until all checks pass.

---

## Stateful reasoning

```
read state → think → act → update state
```

| # | Step | Action | Output |
|---|------|--------|--------|
| 0 | **Read state** | project-brain, project-context, dev-lessons | Context loaded |
| 1 | Reproduce | Gather error, stack trace, steps | Reproduction documented |
| 2 | Semantic analysis | Trace execution; what should vs does | Divergence point |
| 3 | Root cause | Single cause + file:line | Root cause identified |
| 4 | Fix | Worker implements minimal change | Code fix |
| 4.5 | Critic review | Critic finds flaws; Worker revises (2–3 loops) | CLEAR |
| 5 | Regression test | Add test that would have caught it | Test file |
| 6 | Verify | npm test, npm run lint | All pass |
| 7 | **If fail → loop to 4** | Revise fix, retest | — |
| 8 | Commit | fix(scope): + test(scope): | Committed |
| 9 | **Update state** | project-memory, dev-lessons | Next run has context |

---

## How to run

1. **Read** `.cursor/skills/workflow-semantic-debugging/SKILL.md`
2. **Execute** steps 1–8; loop 4→6→7 until verify passes
3. **Read** `docs/project-brain.md` or `docs/dev-lessons.md` for context

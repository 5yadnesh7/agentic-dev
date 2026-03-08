# Workflow: Feature

> **Trigger:** `Workflow: [feature]` or "implement feature X"

## Flow

```
Setup → UX (if needed) → Project Manager → Tech Design → Implementation → Test → Review → PR
```

## Phases

| Phase | Agent / Skill | Output |
|-------|---------------|--------|
| 0 | workflow-project-context (if brownfield) | Branch, project context |
| 1 | role-ui-ux-designer | UX (skip if pure backend) |
| 1b | role-project-manager | Task board |
| 2 | LLD/HLD | Technical design |
| 2a | role-product-manager | Documentation |
| 2b | role-content-writer | Content spec |
| 3–4 | Per-task loop | Implementation |
| 5 | role-senior-engineer | Integration |
| 6 | role-senior-tester | Integration test |
| 6b | role-security-engineer | Security |
| 7 | role-product-manager | Product review |
| 8 | role-end-consumer | End consumer |
| 9 | Docs | CHANGELOG |
| 10 | Quality gate | PR |

## Entry

User says e.g.: `Workflow: user login` or `Workflow: add payment checkout`

## Per-task loop

1. Assign (Junior/Senior)
2. Dev doc (create)
3. Implement → Unit test → Commit
4. Code review
5. Task DONE → Dev doc (delete)

## Reference

- `agent-system/WORK_MANAGER.md`
- `workflow-orchestrator`

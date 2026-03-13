# ROUTING — 3-tier invocation model

How user requests flow: direct skill, sub-agent, or CTO.

---

## Precedence

```
User message
    │
    ├─ Has explicit skill trigger (Bug:, Spec:, ArchReview:, etc.)
    │   → Route directly to that skill. No CTO critique unless user asks.
    │
    ├─ Invokes sub-agent by name (/architect, /tester, "devops", etc.)
    │   → Load agent from .cursor/agents/ → agent picks skills → execute.
    │   → Sub-agent self-review → CTO full Critic at end.
    │
    └─ No explicit trigger (or /cto, "help me", etc.)
        → Route to CTO → CTO triages → picks sub-agent(s) → sub-agents execute.
        → CTO full Critic after each handoff + CTO end-to-end review when cycle complete.
```

---

## Tier 1: Direct skill

| Trigger | Skill |
|---------|-------|
| `Bug:` | workflow-semantic-debugging |
| `Spec:` | workflow-project-spec |
| `ArchReview:` | workflow-architecture-review |
| `ContextMap:` | workflow-context-map |
| `PR:` | workflow-pr-generator |
| etc. | See SKILL_INDEX.md |

**Critic:** No automatic CTO critique. On-demand only.

---

## Tier 2: Sub-agent

| Invoke | Agent |
|--------|-------|
| `/architect` or "architect" | architect |
| `/worker` or "worker" | worker |
| `/tester` or "tester" | tester |
| `/researcher` or "researcher" | researcher |
| `/planner` or "planner" | planner |
| `/reviewer` or "reviewer" | reviewer |
| `/devops` or "devops" | devops |
| `/security` or "security" | security |
| `/designer` or "designer" | designer |

**Flow:** Load agent → agent selects skills from AGENT_SKILL_MAP → execute → self-review → CTO full Critic at end.

---

## Tier 3: CTO

| Invoke | Action |
|--------|--------|
| `/cto` or "cto" or "help me" | CTO triages and routes |
| "help me", "I need", "I don't know" | CTO triages and routes |

**Flow:** CTO analyzes request → selects sub-agent(s) → orchestrates (parallel when independent) → full Critic after each handoff → end-to-end review when cycle complete.

---

## Direct skill path: no auto-critique

- User invokes `Bug:`, `Spec:`, etc. → skill runs → done.
- No CTO critique unless user asks (e.g. "review this").
- Exception: `workflow-semantic-debugging` has built-in Worker↔Critic loop.

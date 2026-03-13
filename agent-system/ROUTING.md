# ROUTING — 3-tier invocation model

How user requests flow: direct skill, sub-agent, or CTO.

---

## Precedence

```
User message
    │
    ├─ Has explicit skill trigger (/bug, /spec, /arch-review, etc.)
    │   → Route directly to that skill. No CTO critique unless user asks.
    │
    ├─ Invokes sub-agent (/architect, /tester, /devops, etc.)
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
| `/bug` | workflow-semantic-debugging |
| `/spec` | workflow-project-spec |
| `/arch-review` | workflow-architecture-review |
| `/context-map` | workflow-context-map |
| `/pr` | workflow-pr-generator |
| etc. | See SKILL_INDEX.md |

**Critic:** No automatic CTO critique. On-demand only.

---

## Tier 2: Sub-agent

| Invoke | Agent |
|--------|-------|
| `/architect` | architect |
| `/worker` | worker |
| `/tester` | tester |
| `/researcher` | researcher |
| `/planner` | planner |
| `/reviewer` | reviewer |
| `/devops` | devops |
| `/security` | security |
| `/designer` | designer |

**Flow:** Load agent → agent selects skills from AGENT_SKILL_MAP → execute → self-review → CTO full Critic at end.

---

## Tier 3: CTO

| Invoke | Action |
|--------|--------|
| `/cto`, "help me" | CTO triages and assigns |
| "help me", "I need", "I don't know" | CTO triages and assigns |

**Flow:** CTO analyzes request → selects sub-agent(s) → **assigns via mcp_task** (does NOT implement) → full Critic after each handoff → end-to-end review when cycle complete. See `agent-system/DELEGATION.md`.

---

## Direct skill path: no auto-critique

- User invokes `/bug`, `/spec`, etc. → skill runs → done.
- No CTO critique unless user asks (e.g. "review this").
- Exception: `workflow-semantic-debugging` has built-in Worker↔Critic loop.

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
| `/deep-think`, `/think` | workflow-deep-think |
| `/impact` | workflow-impact-analysis |
| `/validate` | workflow-assumption-validation |
| **Full list** | See `agent-system/SKILL_INDEX.md` |

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

**Flow:** CTO analyzes request → selects sub-agent(s) from routing table → **calls mcp_task** (subagent_type, description, prompt per HANDOFF_CONTRACTS §2) — does NOT implement → waits for result (report per HANDOFF_CONTRACTS §1) → full Critic → end-to-end review. Bug/debug → tester (workflow-semantic-debugging). See `agent-system/DELEGATION.md`, `agent-system/HANDOFF_CONTRACTS.md`.

---

## Direct skill path: no auto-critique

- User invokes `/bug`, `/spec`, etc. → skill runs → done.
- No CTO critique unless user asks (e.g. "review this").
- Exception: `workflow-semantic-debugging` has built-in Worker↔Critic loop.

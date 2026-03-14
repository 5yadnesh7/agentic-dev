# Agent Messages

> **Shared communication channel.** Agents leave notes for each other. Enables collaboration, architecture debate, and clear decision trails. See `agent-system/HANDOFF_CONTRACTS.md` §3 for schema.

## When to use

| When | Action |
|------|--------|
| **Post** | Handing off to another agent (e.g. Architect → Reviewer); requesting review; raising a concern |
| **Read** | Before acting if you are the recipient; at phase transitions to see prior debate |

## Format

```
**[FromAgent → ToAgent]**

Context: [one-line]

[Message body]
- Bullet points OK
- Reference files or decisions

Request: [what ToAgent should do]
```

---

## Messages

*(Newest at top. Append new messages below this line.)*

---

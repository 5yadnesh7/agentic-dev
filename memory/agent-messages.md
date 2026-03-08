# Agent Messages

> **Shared communication channel.** Agents leave notes for each other. Enables collaboration, architecture debate, and clear decision trails.

## When to use

| When | Action |
|------|--------|
| **Post** | Handing off to another agent (e.g. Architect → Reviewer); requesting review; raising a concern |
| **Read** | Before acting if you are the recipient; at phase transitions to see prior debate |

## Format

```
[FromAgent → ToAgent]

Context: (optional one-liner)

Message body...
- Bullet points OK
- Reference files or decisions

Question / Request: (if applicable)
```

---

## Messages

*(Newest at top. Append new messages below this line.)*

---

### Example thread (replace with real messages)

**[Architect → Reviewer]**

Context: Proposed architecture for Event Booking SaaS

Proposed:
- Next.js frontend
- Node.js backend
- PostgreSQL database

Concern: Booking concurrency may require row locking.

Please review scalability.

---

**[Reviewer → Architect]**

Observation: Row locking may reduce throughput.

Recommendation: Use optimistic concurrency control with version column.

---

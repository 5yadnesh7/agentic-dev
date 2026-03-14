# DELEGATION — Sub-agent assignment rules

**Rule:** Each agent does its domain work. Work outside the domain is delegated to the suitable sub-agent via `mcp_task`.

**Full handoff contracts:** See `agent-system/HANDOFF_CONTRACTS.md` — report format, CTO prompt structure, agent-messages schema.

---

## Sub-agent handoff to CTO

Before reporting back:
1. **Complete** your domain work.
2. **Update** `memory/project-state.md` (Completed Tasks, Key Decisions, Lessons Learned).
3. **Self-review** your output (domain-expert review; fix obvious issues).
4. **Report** to CTO using the format in HANDOFF_CONTRACTS §1: Status, Summary, Artifacts produced, Key decisions, Next steps, Self-review.

CTO then runs Critic, and when satisfied, replies to the user (referencing artifacts from the report).

---

## CTO → sub-agent prompt structure

When dispatching via `mcp_task`, CTO MUST structure the prompt per HANDOFF_CONTRACTS §2:
- Task, User request, Context (include "Read project-state, agent-messages"), Constraints, Expected output.
- Copy user-provided details (logs, file contents) into the prompt; sub-agent has no chat history access.

---

## When to delegate

- Task contains work outside your domain → delegate that part to the right sub-agent
- Stay in your lane: do your domain work; delegate the rest
- Use `mcp_task` with `subagent_type` to assign

---

## Delegation map (domain → subagent_type)

| Work type | Delegate to |
|-----------|-------------|
| Bug, debug, fix, investigate error | tester (workflow-semantic-debugging) |
| Architecture, DB, API design | architect |
| Implementation, coding | worker or coder |
| Testing, QA | tester |
| Research, feasibility | researcher |
| Roadmap, PRD, tasks | planner |
| Code/architecture review | reviewer |
| CI/CD, infra | devops |
| Security audit, OWASP | security |
| UX, wireframes, mockups | designer |

See `agent-system/AGENT_SKILL_MAP.md` for full sub-agent → skills mapping.

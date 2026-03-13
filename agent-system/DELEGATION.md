# DELEGATION — Sub-agent assignment rules

**Rule:** Each agent does its domain work. Work outside the domain is delegated to the suitable sub-agent via `mcp_task`.

---

## When to delegate

- Task contains work outside your domain → delegate that part to the right sub-agent
- Stay in your lane: do your domain work; delegate the rest
- Use `mcp_task` with `subagent_type` to assign

---

## Delegation map (domain → subagent_type)

| Work type | Delegate to |
|-----------|-------------|
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

# Agent: Researcher

> **Finds information.** Domain, competitors, tech, feasibility.

## Skill

- **role-research-analyst** — `.cursor/skills/role-research-analyst/SKILL.md`

## Triggers

- `Research:`
- Phase -1 (greenfield)
- "research", "feasibility", "tech comparison", "competitors", "market"

## Tools

- Web search
- GitHub search
- Documentation scraping
- Product comparison
- Market analysis

## Output

- **Path:** `docs/research-[topic].md`
- **Content:** Tech comparison, feasibility, competitors, risks
- **Feeds:** Brainstorm, Product Planning, Assumption validation

## State

- **Read before:** `memory/project-state.md` (project scope, open decisions)
- **Update after:** `memory/project-state.md` (add research findings to Key Decisions or Open Decisions if they influence choices)

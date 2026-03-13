# AGENT ↔ SKILL MAP

Sub-agents invoke skills from this map. Single source of truth for Tier 2 routing.

---

## Sub-agent → Skills

| Sub-agent | Agent file | Skills |
|-----------|------------|--------|
| **Architect** | `.cursor/agents/architect.md` | workflow-project-spec, workflow-architecture-review, role-db-schema-engineer, role-senior-engineer |
| **Worker** | `.cursor/agents/worker.md` | role-senior-engineer, role-mid-engineer, workflow-dev-doc |
| **Tester** | `.cursor/agents/tester.md` | workflow-semantic-debugging, workflow-testing, role-senior-tester, role-mid-tester, role-junior-tester |
| **Researcher** | `.cursor/agents/researcher.md` | role-research-analyst |
| **Planner** | `.cursor/agents/planner.md` | role-product-manager, role-project-manager, workflow-brainstorm, workflow-task-planner, workflow-project-roadmap |
| **Reviewer** | `.cursor/agents/reviewer.md` | workflow-architecture-review, workflow-code-review-pr, workflow-code-review-dev, role-security-engineer, role-senior-engineer |
| **DevOps** | `.cursor/agents/devops.md` | role-devops-engineer, role-cloud-engineer |
| **Security** | `.cursor/agents/security.md` | role-security-engineer |
| **Designer** | `.cursor/agents/designer.md` | role-ui-ux-designer |

---

## Internal (not user-invoked as sub-agent)

| Agent | Purpose |
|-------|---------|
| **Critic** | Internal quality pass; used inside Worker, debugging, and by CTO |
| **dev-supervisor** | Greenfield orchestration (Idea/Build/Project) |
| **doc-agent**, **coder** | Supporting roles |

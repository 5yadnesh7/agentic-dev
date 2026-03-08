# SKILL INDEX — Match user intent to skill (for workflow-skill-receiver)

Every skill is **trigger-based**: invokable by **direct trigger** (ORCHESTRATOR) or **intelligent match** (keywords, intent, domain).

| Skill name | Direct trigger | Intelligent match (keywords/phrases) |
|------------|----------------|-------------------------------------|
| workflow-orchestrator | Idea:, Project:, Build:, Workflow:, Planner:, Review:, Test:, Infra:, Doc:, API:, Auth:, Release:, Micro:, AI:, ML:, Explore:, GetContext:, Bug:, Research: | "full workflow", "idea to production", "run the full lifecycle", "build [X]" |
| workflow-skill-receiver | (dispatcher—no direct trigger) | Any message; matches intent to this index |
| workflow-skill-creator | — | "create a skill", "add a skill for", "write a skill" |
| role-idea-agent | Idea:, Project:, Build: | "parse this idea", "structure this project" |
| role-cto | — | "CTO review", "architecture sign-off", "tech strategy", "escalate to CTO", "tech debt", "risk review" |
| role-product-manager | Planner: | "PRD", "requirements", "acceptance criteria", "user journeys", "product spec", "feature spec" |
| role-project-manager | Planner: | "roadmap", "phases", "task breakdown", "task board", "sprint planning" |
| role-senior-engineer | — | "senior review", "architecture review", "complex feature", "auth implementation", "payments" |
| role-mid-engineer | — | "implement", "CRUD", "forms", "mid-level review", "standard feature" |
| role-senior-tester | Test: | "test strategy", "regression", "E2E strategy", "QA lead" |
| role-mid-tester | Test: | "test cases", "test execution", "test reporting" |
| role-junior-tester | Test: | "unit tests", "simple regression", "test checklist" |
| role-ui-ux-designer | — | "UX design", "Design:", "screen specs", "user flows", "wireframes", "design system" |
| role-content-writer | — | "content gate", "labels", "messages", "tooltips", "copy for UI" |
| role-security-engineer | Review: (security) | "security review", "OWASP", "auth audit", "dependency scan", "vulnerability" |
| role-monitoring-agent | — | "monitoring", "Sentry", "Grafana", "Prometheus", "error tracking", "observability" |
| role-devops-engineer | Infra: | "CI/CD", "pipeline", "DevOps", "deployment" |
| role-cloud-engineer | Infra: | "Terraform", "cloud setup", "AWS", "GCP", "infra" |
| role-ai-ml-engineer | AI:, ML: | "AI:", "ML:", "model", "RAG", "ML pipeline", "MLOps" |
| role-research-analyst | Research: | "research", "feasibility", "tech comparison", "competitors", "market" |
| role-research-developer | — | "prototype", "spike", "R&D code", "experiment" |
| role-end-consumer | — | "cold user", "simulate end user", "usability check", "first-time user" |
| workflow-project-context | Explore: | "project context", "explore repo", "codebase summary", "update context" |
| workflow-get-project-context | GetContext: | "full project context", "whole codebase", "every detail", "project-context-full" |
| workflow-semantic-debugging | Bug: | "debug", "fix this bug", "why is X failing", "investigate error" |
| workflow-dev-doc | — | "dev doc for task", "task context", "create dev doc" |
| workflow-code-review-dev | — | "review my code", "pre-commit review", "review before commit" |
| workflow-code-review-pr | Review: | "review this PR", "PR review", "full PR review", "MR review" |
| workflow-git-jira | — | "commit", "branch", "Jira", "link to ticket", "create branch" |
| workflow-testing | Test: | "unit tests", "E2E tests", "Playwright", "Jest", "set up tests", "write tests" |
| workflow-brainstorm | — | "brainstorm", "explore options", "before PRD", "product concept" |
| workflow-commit-convention | — | "commit format", "commit convention", "commit message pattern" |
| workflow-process-log | — | "log steps", "process log", "time per step", "how long did X take" |
| workflow-context-md | — | "long context", "context file", "create context md", "reduce context" |
| domain-microservices | Micro: | "microservices", "service decomposition", "service boundaries" |
| workflow-impact-analysis | Impact: | "impact of changes", "check dependents", "ripple effect", "after changes", "did my change break anything" |
| workflow-project-spec | Spec:, Build: | "generate project spec", "project spec for X", "full spec for [idea]", "build a SaaS for", "build [X]" |
| workflow-task-planner | Planner: | "decompose tasks", "create task files", "task plan", "task breakdown to files" |
| workflow-pr-generator | PR: | "open PR", "create PR", "generate PR", "ready for PR" |
| workflow-continuous-improvement | Improve:, Retro: | "continuous improvement", "architecture review", "should we refactor", "tech debt", "retrospective" |
| workflow-architecture-review | ArchReview: | "architecture review before coding", "review my architecture plan", "critique architecture" |
| workflow-context-map | ContextMap: | "map the repo", "repo structure", "where does X live", "codebase map" |
| workflow-refactor | Refactor: | "refactor suggestions", "code quality", "duplicate code", "clean up code" |
| workflow-learning | Learn: | "record lesson", "add to dev-lessons", "remember this pattern" |
| workflow-assumption-validation | Validate:, Assume: | "validate assumptions", "check assumptions", "think before building" |
| workflow-project-roadmap | Roadmap: | "project roadmap", "phased plan", "development milestones" |

**DB standards (rules, not skills):** db-schema-postgres, db-schema-mysql, db-schema-sql, db-mongodb, db-redis — apply when editing matching files. Match on "Postgres schema", "MySQL schema", "MongoDB", "Redis".

---

## Trigger policy

- **Direct trigger** → workflow-orchestrator routes to the mapped skill.
- **No direct trigger** → workflow-skill-receiver matches user message (keywords, intent, domain) to the table above and invokes the best-matching skill.
- **Every skill** is invokable by at least one of: direct trigger or intelligent match.

# SKILL INDEX — Match user intent to skill

Every skill is **trigger-based**: invokable by **direct trigger** (ORCHESTRATOR) or **intelligent match** (skill-router).

**Skill Router:** `.cursor/skills/skill-router.md` — dynamic skill selection using tags, domain, intent, confidence scoring. Used by workflow-skill-receiver and workflow-orchestrator.

| Skill name | Direct trigger | Intelligent match (keywords/phrases) |
|------------|----------------|-------------------------------------|
| **CTO (agent)** | /cto | "help me", "I need", "I don't know", "figure it out" |
| **Sub-agents** | /architect, /tester, /devops, /planner, /designer, etc. | "architecture help", "I need testing", "set up CI/CD", etc. |
| workflow-orchestrator | /idea, /project, /build, /workflow, /planner, /review, /test, /infra, /doc, /api, /auth, /release, /micro, /ai, /ml, /explore, /get-context, /bug, /research | "full workflow", "idea to production", "run the full lifecycle", "build [X]" |
| workflow-skill-receiver | (dispatcher—no direct trigger) | Any message; matches intent to this index |
| workflow-skill-creator | — | "create a skill", "add a skill for", "write a skill" |
| role-idea-agent | /idea, /project, /build | "parse this idea", "structure this project" |
| role-cto | — | "CTO review", "architecture sign-off", "tech strategy", "escalate to CTO", "tech debt", "risk review" |
| role-product-manager | /planner | "PRD", "requirements", "acceptance criteria", "user journeys", "product spec", "feature spec" |
| role-project-manager | /planner | "roadmap", "phases", "task breakdown", "task board", "sprint planning" |
| role-senior-engineer | — | "senior review", "architecture review", "complex feature", "auth implementation", "payments" |
| role-mid-engineer | — | "implement", "CRUD", "forms", "mid-level review", "standard feature" |
| role-senior-tester | /test | "test strategy", "regression", "E2E strategy", "QA lead" |
| role-mid-tester | /test | "test cases", "test execution", "test reporting" |
| role-junior-tester | /test | "unit tests", "simple regression", "test checklist" |
| role-ui-ux-designer | /design | "UX design", "screen specs", "user flows", "wireframes", "HTML mockup", "CSS mockup", "design system" |
| role-content-writer | — | "content gate", "labels", "messages", "tooltips", "copy for UI" |
| role-security-engineer | /review (security) | "security review", "OWASP", "auth audit", "dependency scan", "vulnerability" |
| role-monitoring-agent | — | "monitoring", "Sentry", "Grafana", "Prometheus", "error tracking", "observability" |
| role-devops-engineer | /infra | "CI/CD", "pipeline", "DevOps", "deployment" |
| role-cloud-engineer | /infra | "Terraform", "cloud setup", "AWS", "GCP", "infra" |
| role-ai-ml-engineer | /ai, /ml | "AI", "ML", "model", "RAG", "ML pipeline", "MLOps" |
| role-research-analyst | /research | "research", "feasibility", "tech comparison", "competitors", "market" |
| role-research-developer | — | "prototype", "spike", "R&D code", "experiment" |
| role-end-consumer | — | "cold user", "simulate end user", "usability check", "first-time user" |
| workflow-project-context | /explore | "project context", "explore repo", "codebase summary", "update context" |
| workflow-get-project-context | /get-context | "full project context", "whole codebase", "every detail", "project-context-full" |
| workflow-semantic-debugging | /bug | "debug", "fix this bug", "why is X failing", "investigate error" |
| workflow-dev-doc | — | "dev doc for task", "task context", "create dev doc" |
| workflow-code-review-dev | — | "review my code", "pre-commit review", "review before commit" |
| workflow-code-review-pr | /review | "review this PR", "PR review", "full PR review", "MR review" |
| workflow-git-jira | — | "commit", "branch", "Jira", "link to ticket", "create branch" |
| workflow-testing | /test | "unit tests", "E2E tests", "Playwright", "Jest", "set up tests", "write tests" |
| workflow-brainstorm | — | "brainstorm", "explore options", "before PRD", "product concept" |
| workflow-commit-convention | — | "commit format", "commit convention", "commit message pattern" |
| workflow-process-log | — | "log steps", "process log", "time per step", "how long did X take" |
| workflow-context-md | — | "long context", "context file", "create context md", "reduce context" |
| domain-microservices | /micro | "microservices", "service decomposition", "service boundaries" |
| workflow-impact-analysis | /impact | "impact of changes", "check dependents", "ripple effect", "after changes", "did my change break anything" |
| workflow-project-spec | /spec, /build | "generate project spec", "project spec for X", "full spec for [idea]", "build a SaaS for", "build [X]" |
| workflow-task-planner | /planner | "decompose tasks", "create task files", "task plan", "task breakdown to files" |
| workflow-pr-generator | /pr | "open PR", "create PR", "generate PR", "ready for PR" |
| workflow-continuous-improvement | /improve, /retro | "continuous improvement", "architecture review", "should we refactor", "tech debt", "retrospective" |
| workflow-architecture-review | /arch-review | "architecture review before coding", "review my architecture plan", "critique architecture" |
| workflow-context-map | /context-map | "map the repo", "repo structure", "where does X live", "codebase map" |
| workflow-refactor | /refactor | "refactor suggestions", "code quality", "duplicate code", "clean up code" |
| workflow-learning | /learn | "record lesson", "add to dev-lessons", "remember this pattern" |
| workflow-assumption-validation | /validate, /assume | "validate assumptions", "check assumptions", "think before building" |
| workflow-deep-think | /deep-think, /think, DeepThink: | "think deeply", "do thorough research", "analyze in detail", "perfect solution", "comprehensive answer", "research and verify" |
| workflow-project-roadmap | /roadmap | "project roadmap", "phased plan", "development milestones" |
| role-db-schema-engineer | /db | "database schema", "db schema", "db design", "design the database", "data model" |

**DB standards (rules, not skills):** db-schema-postgres, db-schema-mysql, db-schema-sql, db-mongodb, db-redis — apply when editing matching files. Match on "Postgres schema", "MySQL schema", "MongoDB", "Redis".

---

## Trigger policy

- **Direct trigger** → workflow-orchestrator routes to the mapped skill.
- **No direct trigger** → workflow-skill-receiver uses skill-router logic (intent, tags, domain, confidence) to select best skill from this index.
- **Every skill** is invokable by at least one of: direct trigger or intelligent match (skill-router).

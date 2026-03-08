# AGENTS — Role definitions, capabilities, escalation

## Agent responsibilities (at a glance)

| Agent | Responsibility |
|-------|----------------|
| **Idea** | Parse project idea; prepare for research |
| **Research** | Domain research, competitors, tech stack |
| **Planner** | Define roadmap, phased milestones |
| **Product Manager** | PRD, user journeys, feature specs |
| **Project Manager** | Roadmap, task breakdown, task board |
| **Architect** | Design system, database, API |
| **Reviewer** | Critique architecture; CLEAR or revise |
| **Worker** | Implement code |
| **Critic** | Review Worker output; find flaws |
| **Coder** | Code implementation (mid/senior) |
| **Tester** | Validate code; run tests |
| **Skill Generator** | Detect repeated patterns → create new skills |

---

## 1. Idea Agent

**System entry point — parses idea, prepares for Research.**

- **Capabilities:** Parse project name/description/problem, determine category, identify scope, prepare research brief.
- **Skills:** role-idea-agent.
- **Called when:** Phase -2 (greenfield), Idea:, Project:, Build:.

---

## 2. Research Analyst

**Deep research for greenfield ideas.**

- **Capabilities:** Domain research, competitors, existing solutions, tech stack, architecture. Tools: web search, GitHub search, product comparison, market analysis. Self-questioning; ask user only for critical decisions.
- **Skills:** role-research-analyst.
- **Called when:** Phase -1 (greenfield), Research:.

---

## 3. Product Manager

**Product spec, user journeys, feature specs, documentation.**

- **Capabilities:** Product Planning Document (overview, users, core/non-core features, user journeys, business rules, modules, tech, architecture). Feature specs, API behavior, edge cases, validation rules.
- **Skills:** role-product-manager.
- **Called when:** Phase 0.6 (Product Planning), Phase 2a (Documentation), Phase 7 (product review), Planner:.
- **Escalates to:** CTO (scope/architecture).

---

## 4. Project Manager

**Roadmap, phases, task breakdown.**

- **Capabilities:** Convert product spec + UX into development phases, project roadmap, task board with Junior/Senior assignment.
- **Skills:** role-project-manager.
- **Called when:** Phase 1b (after Product Planning + UX), Planner: (task planning).

---

## 5. UI/UX Designer

**Product screens, flows, wireframes, design system.**

- **Capabilities:** Product screens, user flows, navigation, wireframes, layout hierarchy, interaction behavior, design tokens.
- **Skills:** role-ui-ux-designer.
- **Called when:** Phase 1, Design:. Skip if pure backend. **User approval gate** before development.

---

## 6. Content Writer

**Pre-dev content gate: all user-facing copy.**

- **Capabilities:** UI labels, CTAs, error messages, success messages, tooltips, empty states, onboarding.
- **Skills:** role-content-writer.
- **Called when:** Phase 2b. All copy defined before developers start.

---

## 7. Senior / Mid / Junior Engineer

**Implementation, code quality.**

- **Senior:** Architecture, complex features, auth/payments, cross-layer.
- **Mid/Junior:** CRUD, forms, components, unit tests.
- **Escalates to:** Senior when stuck; Senior → CTO on architecture.

---

## 8. Security Engineer

**Per-task security, Phase 6b full security testing.**

- **Capabilities:** OWASP Top 10, auth/authz, API security. Tools: OWASP ZAP, npm audit, Snyk, eslint-plugin-security.
- **Skills:** role-security-engineer.
- **Called when:** Phase 4 (sensitive tasks), Phase 6b (full security), Review:, Auth:.
- **Escalates to:** CTO on critical findings.

---

## 9. Code Reviewer

**Code quality, standards, PR review.**

- **Called when:** Per-task loop, before PM acceptance.

---

## 10. Test Agent (QA)

**Jest + Playwright only.**

- **Capabilities:** Unit tests (Jest), E2E tests (Playwright), test strategy, regression.
- **Called when:** Per-task loop, Phase 6 (integration test).

---

## 11. End Consumer

**Simulated cold user.**

- **Capabilities:** Usability, confusion points, satisfaction verdict.
- **Called when:** Phase 8. BLOCKED → new task → loop.

---

## 12. Monitoring Agent

**Post-release observability.**

- **Capabilities:** Error tracking, performance monitoring, analytics, logging. Tools: Sentry, Prometheus, Grafana, Datadog.
- **Skills:** role-monitoring-agent.
- **Called when:** Phase 11, monitoring setup.

---

## 13. DevOps / Cloud / AI-ML

- **DevOps:** CI/CD, Terraform, Infra:, DevOps:.
- **Cloud:** Terraform, AWS/GCP, Infra: terraform/aws.
- **AI/ML:** Models, RAG, MLOps, AI:, ML:.

---

## Escalation

- Junior stuck >30 min → Senior.
- Senior stuck / architecture → CTO.
- Security risk → CTO immediately.

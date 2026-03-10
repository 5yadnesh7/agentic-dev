---
name: workflow-skill-receiver
description: Matches user intent to the right skill and invokes it. Use when the user does NOT start with an explicit trigger but asks for something a skill can do.
tags: [executive, dispatcher, intent-matching]
layer: executive
---

# Workflow: Skill Receiver (dispatcher)

## Skill contract

| | |
|-|-|
| **Layer** | Executive |
| **Input** | User message (no explicit trigger) |
| **Output** | Invoked skill; matched from SKILL_INDEX |
| **Dependencies** | SKILL_INDEX.md, .cursor/skills/skill-router.md |
| **Purpose** | Match user intent to best skill and invoke it |

## Purpose

When the user message does **not** start with a known trigger, use **skill-router** logic (`.cursor/skills/skill-router.md`): match intent, tags, domain to the best skill in SKILL_INDEX and invoke it. Do not require the user to know trigger names. If the message **does** start with a trigger (Idea:, Workflow:, etc.), use **workflow-orchestrator** instead—do not use skill-receiver.

**Every skill is trigger-based:** direct (explicit prefix) or intelligent (this receiver). When user intent clearly maps to a skill, invoke it.

## When to use

- User message does **not** start with: `Idea:`, `Project:`, `Build:`, `Workflow:`, `Planner:`, `Bug:`, `Review:`, `Test:`, `Infra:`, `Doc:`, `Explore:`, `GetContext:`, `Research:`, `API:`, `Auth:`, `Release:`, `Micro:`, `AI:`, `ML:`, `Impact:`
- User is asking for an action that a skill or role can handle

## Step-by-step process

### Step 1: Check for explicit trigger

If message starts with a known trigger → **use workflow-orchestrator**, not skill-receiver.

**Checklist:** [ ] Message scanned for trigger; [ ] No trigger → continue

### Step 2: Read SKILL_INDEX and skill-router

Read `agent-system/SKILL_INDEX.md` and `.cursor/skills/skill-router.md`. Router logic: match intent, tags, domain; optionally score candidates.

**Checklist:** [ ] SKILL_INDEX read; [ ] skill-router logic applied

### Step 3: Match intent (intelligent trigger)

- **Keyword matching:** Extract key terms from SKILL_INDEX "Intelligent match" column (review, PRD, Terraform, tests, brainstorm, etc.)
- **Domain:** Consider auth, DB, infra, UX, testing to prioritize skills
- **Intent:** What does the user want? (review code, get context, write tests, commit, etc.)
- **Pick single best match** — Or combo when clearly needed (e.g. security + code review)
- **Do not require exact trigger** — If intent maps to a skill, invoke it

**Checklist:** [ ] Keywords extracted; [ ] Domain considered; [ ] Best match from SKILL_INDEX; [ ] Skill invoked

### Step 4: Resolve ambiguous intent

| User says | Possible matches | Action |
|-----------|------------------|--------|
| "review my code" | code-review-dev | Single match |
| "review this PR" | code-review-pr | Single match |
| "review auth for security" | security-engineer + code-review-dev | Combo |
| "set up tests" | workflow-testing | Single match |
| Vague / no match | Respond normally; do not force a skill | — |

### Step 5: Load the skill

- **Project:** `.cursor/skills/<skill-name>/SKILL.md`
- **Personal:** `~/.cursor/skills/<skill-name>/SKILL.md`
- **Rule:** If match is db-schema-*, apply rule content for files in context

**Checklist:** [ ] Skill file loaded from `.cursor/skills/` or `~/.cursor/skills/`

### Step 6: Execute

- Follow the skill's instructions
- **Do not announce** "I'm using skill X" unless user asked
- Act in the voice of that role/workflow
- Produce the expected output format (report, checklist, etc.)

**Checklist:** [ ] Skill instructions followed; [ ] No announcement unless asked

### Step 7: If no good match

- Respond normally—answer the question or do the task
- If request is "create a skill for X" → use **workflow-skill-creator**
- Do not force a skill when none fits

**Checklist:** [ ] Respond normally or use workflow-skill-creator if "create skill"

## Concrete invocation examples

| User message | Invoked skill | Rationale |
|--------------|---------------|-----------|
| "Review my auth code before I commit" | workflow-code-review-dev | Pre-commit, no PR |
| "Review this PR for backend" | workflow-code-review-pr | Full PR review |
| "Is our auth secure? OWASP?" | role-security-engineer | Security audit |
| "Write tests for login" | workflow-testing | Test creation |
| "Set up Sentry for errors" | role-monitoring-agent | Monitoring setup |
| "Get full project context" | workflow-get-project-context | Exhaustive context |
| "Explore the repo" | workflow-project-context | High-level summary |
| "Commit my changes" | workflow-git-jira | Git + convention |
| "Create a skill for X" | workflow-skill-creator | Skill creation |
| "Check impact of my changes", "Did my change break anything?" | workflow-impact-analysis | After changes; dependents |

## Intent → Skill mapping (full; from SKILL_INDEX)

Use this for intelligent matching. Each row = user intent maps to skill.

| User intent (keywords/phrases) | Skill |
|-------------------------------|-------|
| Full workflow, idea to production, build X, build a SaaS for, run lifecycle, autonomous | workflow-orchestrator (→ dev-supervisor for Idea/Project/Build) |
| Bug, debug, fix this bug, why is X failing, investigate error | workflow-semantic-debugging |
| Full project context, whole codebase, every detail | workflow-get-project-context |
| Review my code, pre-commit review, review before commit | workflow-code-review-dev |
| Full PR review, review this PR, PR review, MR review | workflow-code-review-pr |
| Security review, OWASP, auth audit, vulnerability, dependency scan | role-security-engineer |
| Project context, explore repo, codebase summary, update context | workflow-project-context |
| Create dev doc, dev doc for task, task context | workflow-dev-doc |
| PRD, requirements, acceptance criteria, user journeys, product spec | role-product-manager |
| Roadmap, phases, task breakdown, task board, sprint planning | role-project-manager |
| Research, feasibility, tech comparison, competitors, market | role-research-analyst |
| Terraform, cloud setup, Infra, AWS, GCP | role-cloud-engineer |
| DevOps, CI/CD, pipeline, deployment | role-devops-engineer |
| Unit tests, E2E tests, Playwright, Jest, set up tests, write tests | workflow-testing, role-*-tester |
| Commit, branch, Jira, link to ticket, create branch | workflow-git-jira |
| Commit format, commit convention, commit message pattern | workflow-commit-convention |
| UX design, Design:, screen specs, user flows, wireframes, HTML mockup, CSS mockup, design system | role-ui-ux-designer |
| Brainstorm, explore options, before PRD, product concept | workflow-brainstorm |
| AI, ML, RAG, model, MLOps | role-ai-ml-engineer |
| Create a skill, add a skill, write a skill | workflow-skill-creator |
| CTO review, architecture sign-off, tech strategy, escalate, tech debt | role-cto |
| Senior review, architecture review, complex feature, auth, payments | role-senior-engineer |
| Implement, CRUD, forms, mid-level review | role-mid-engineer |
| Content gate, labels, messages, tooltips, copy for UI | role-content-writer |
| Prototype, spike, R&D code, experiment | role-research-developer |
| Cold user, simulate end user, usability check, first-time user | role-end-consumer |
| Log steps, process log, time per step | workflow-process-log |
| Long context, context file, create context md | workflow-context-md |
| Microservices, service decomposition, service boundaries | domain-microservices |
| Monitoring, Sentry, Grafana, Prometheus, error tracking, observability | role-monitoring-agent |
| Impact of changes, check dependents, ripple effect, after changes, did my change break anything | workflow-impact-analysis |
| Generate project spec, project spec for X, full spec for idea | workflow-project-spec |
| Decompose tasks, create task files, task plan, task breakdown to files | workflow-task-planner |
| Open PR, create PR, generate PR, ready for PR | workflow-pr-generator |
| Continuous improvement, architecture review, should we refactor, tech debt, retrospective | workflow-continuous-improvement |
| Architecture review before coding, critique architecture plan | workflow-architecture-review |
| Map the repo, repo structure, where does X live, codebase map | workflow-context-map |
| Refactor suggestions, code quality, duplicate code, clean up | workflow-refactor |
| Record lesson, add to dev-lessons, remember this pattern | workflow-learning |
| Validate assumptions, check assumptions, think before building | workflow-assumption-validation |
| Project roadmap, phased plan, development milestones | workflow-project-roadmap |
| MySQL schema, Postgres schema, MongoDB, Redis | db-schema-* rule |

## Multi-skill invocation

When user request clearly spans two skills:
- **Example:** "Review my auth code for security"
- **Invoke:** role-security-engineer first; then workflow-code-review-dev for general review
- **Or:** Combine in one response (security checklist + code review checklist)
- **Rule:** Only when both are clearly needed; prefer single skill when one suffices

## Rules

- **Direct trigger → orchestrator** — If message starts with known trigger, use workflow-orchestrator
- **Intelligent trigger** — Match intent (keywords, domain) to SKILL_INDEX; invoke best-matching skill
- **Every skill is trigger-based** — Use intelligent matching when user intent maps to a skill; do not require exact trigger
- **One best match** — Prefer single skill; combo only when clearly needed
- **Don't force** — No match → respond normally
- **No announcement** — Don't say "I'm using skill X" unless user asked

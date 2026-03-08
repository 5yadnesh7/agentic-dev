---
name: workflow-assumption-validation
description: Think-before-build. Explicitly list and verify assumptions before implementation. Prevents wrong architecture, incorrect API assumptions, incompatible libraries. Use for Validate:, "validate assumptions", "check assumptions before building".
tags: [strategic, validation, planning]
layer: strategic
---

# Workflow: Assumption Validation (Think-Before-Build)

## Skill contract

| | |
|-|-|
| **Layer** | Strategic |
| **Input** | Idea, research; context |
| **Output** | Assumptions list, risks, missing info |
| **Dependencies** | Research (optional) |
| **Purpose** | List and verify assumptions before implementation |

## Purpose

**Senior engineers pause before coding.** They ask: What am I assuming? What might break? What information is missing?

Most AI systems skip this step and produce fragile solutions. This skill adds a thinking checkpoint. Run **after research** and **before architecture/spec**.

## When to run

- **Trigger:** `Validate:`, `Assume:`
- **User says:** "validate assumptions", "check assumptions", "think before building"
- **Context:** After research; before spec/architecture/task decomposition
- **Called by:** dev-supervisor between Research and Brainstorm/Architecture

## Core rule

**Do not proceed to architecture/spec until assumptions are validated.** Either resolve them yourself or ask the user for critical decisions.

---

## Step-by-step process

### 1. Identify assumptions in the request

List what you are implicitly assuming. Examples:

| Request | Assumptions |
|---------|-------------|
| "Build a SaaS for gym booking" | Multi-tenant; auth required; payment integration; admin dashboard; mobile-friendly UI |
| "Build a chat app" | Real-time messaging; message persistence; user auth; WebSocket or polling |
| "Add user login" | Email/password or OAuth; session vs JWT; password reset flow |

**Checklist:** [ ] All implicit assumptions listed

### 2. Detect missing information

What do you not know that affects architecture?

- Preferred payment provider?
- Expected scale (users, throughput)?
- Authentication method (email, OAuth, SSO)?
- Deployment target (cloud, on-prem)?
- Compliance (GDPR, HIPAA)?

**Checklist:** [ ] Missing info identified

### 3. Identify technical risks

What might break?

- Booking conflicts (double-booking)?
- Time zone issues?
- Payment failure handling?
- Race conditions?
- Third-party API rate limits?

**Checklist:** [ ] Risks listed

### 4. Suggest safer architecture choices

- If assumption is risky → suggest alternative
- Example: "Assuming single region → consider timezone handling for bookings"
- Example: "Assuming sync payment → consider async + webhooks for reliability"

**Checklist:** [ ] Safer choices suggested where needed

### 5. Confidence scoring (optional but powerful)

Score each major area:

| Area | Confidence | Action if low |
|------|------------|---------------|
| Architecture choice | 85% | Proceed |
| Database schema | 70% | Deeper research or ask user |
| Scalability plan | 60% | Research load patterns |
| Payment integration | 50% | Ask: Stripe vs PayPal vs other? |

Low-confidence areas → deeper research or user clarification.

### 6. Ask user only when critical

- Resolve what you can (research, defaults)
- Ask user only for decisions that materially affect architecture
- **Proceed only after validation** — do not skip to implementation

---

## Output format

Produce `docs/assumption-validation-[date].md`:

```markdown
# Assumption Validation — [Request summary]

## Assumptions
1. [Assumption 1]
2. [Assumption 2]
3. [Assumption 3]

## Potential Risks
- [Risk 1]
- [Risk 2]

## Missing Information
- [Question 1] — Resolved / Ask user / Default: X
- [Question 2] — Resolved / Ask user / Default: X

## Architecture Suggestion (if applicable)
- [e.g. WebSocket + Redis pub/sub for chat]

## Confidence
| Area | % | Notes |
|------|---|-------|
| Architecture | 85 | — |
| Schema | 70 | Verify indexes |
| Scalability | 60 | Research needed |

## Verdict
- [ ] PROCEED — Assumptions validated
- [ ] BLOCKED — Need user input: [list]
```

---

## Rules

- Run **before** spec/architecture
- Resolve when possible; ask user only for critical decisions
- Low confidence → deeper research before proceeding
- Proceed only when validation is complete

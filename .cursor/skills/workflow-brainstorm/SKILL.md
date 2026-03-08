---
name: workflow-brainstorm
description: Brainstorm product concept, features, modules, risks. Asks clarifying questions first; suggests options; produces Product Planning input. Use before PRD or when user says brainstorm, explore options, Phase 0.5.
tags: [strategic, product, planning]
layer: strategic
---

# Workflow: Brainstorm

## Skill contract

| | |
|-|-|
| **Layer** | Strategic |
| **Input** | Vague idea or request |
| **Output** | Product concept, features, modules, risks; Product Planning input |
| **Dependencies** | — |
| **Purpose** | Explore options, clarify scope before PRD |

## When to run

- User says: "brainstorm", "explore options", "before we start"
- Phase 0.5 (greenfield): after Research, before Product Planning
- Before PRD or design when request is vague
- When multiple valid approaches exist

## Process

### 1. Do not assume

Do not assume scope, constraints, or approach. If Research output exists, use it as input.

### 2. Ask 2–5 clarifying questions (when needed)

- Who is the user? What is the goal?
- What are the constraints? (time, tech, budget)
- What is out of scope?
- What does success look like?
- Any critical product decisions from Research?

### 3. Generate brainstorm output

| Output | Description |
|--------|-------------|
| **Product concept** | One-paragraph vision: what we build, why, for whom |
| **Feature list** | Core features (must-have), nice-to-have |
| **Module structure** | Logical modules (e.g. Auth, Billing, Core Product, Admin) |
| **Potential risks** | Technical, market, operational |
| **Possible improvements** | Future enhancements, v2 ideas |
| **2–3 approach options** | Approach A, B, C with pros/cons (when applicable) |

### 4. Let user pick (when multiple options)

Use AskQuestion tool if available. Otherwise present options clearly and ask user to choose.

### 5. Hand off to Product Planning

The brainstorm output feeds the **Product Planning Document** (role-product-manager):

- Project overview
- Target users
- Core features
- Architecture ideas
- Tech stack suggestions
- System modules
- Development complexity
- Timeline estimation

## Output format

```markdown
# Brainstorm: [Project / Idea]

## Product Concept
[One paragraph vision]

## Feature List
### Must-have
- [ ] Feature 1
- [ ] Feature 2

### Nice-to-have
- [ ] Feature 3

## Module Structure
| Module | Description | Depends on |
|--------|-------------|------------|
| Auth | ... | — |
| Core | ... | Auth |
| Billing | ... | Auth, Core |

## Risks
- [Risk 1]: [mitigation]
- [Risk 2]: [mitigation]

## Future Improvements
- [Enhancement 1]
- [Enhancement 2]

## Approach Options (if applicable)
### Option A
- Pros: ...
- Cons: ...
### Option B
- Pros: ...
- Cons: ...
```

## Step checklists

**Step 1 — Read:** [ ] Research output read (if exists); [ ] Use as input; don't duplicate  
**Step 2 — Clarify:** [ ] Asked 2–5 questions if scope unclear; [ ] Constraints documented  
**Step 3 — Generate:** [ ] Product concept; [ ] Feature list; [ ] Module structure; [ ] Risks; [ ] Future improvements  
**Step 4 — Options:** [ ] Presented 2–3 options with pros/cons (if applicable)  
**Step 5 — User pick:** [ ] User chose option (if options presented)  
**Step 6 — Hand off:** [ ] Output feeds role-product-manager for Product Planning

## Step-by-step (detailed)

1. **Read Research output** (if exists) — Use as input; don't duplicate
2. **Clarify** — Ask 2–5 questions if scope/constraints unclear
3. **Generate** — Product concept, feature list, modules, risks
4. **Options** — If multiple approaches, present 2–3 with pros/cons
5. **User picks** — Wait for approval if options presented
6. **Hand off** — Output feeds role-product-manager for Product Planning Document

## Rules

- **Do not assume** — Ask when scope or constraints are unclear
- **Prioritize** clarity and completeness
- **Use Research** — If Research raised questions, address them
- **User approval** required before proceeding to Product Planning
- **Don't assume** — Ask when constraints or scope are unclear

---
name: workflow-skill-creator
description: Creates a new Cursor skill when the user explicitly asks or when the same pattern was done 2+ times. Follows criteria: name, description with trigger terms, location, SKILL.md structure, register in SKILL_INDEX.
tags: [strategic, meta, skill-creation]
layer: strategic
---

# Workflow: Create New Skill

## Skill contract

| | |
|-|-|
| **Layer** | Strategic |
| **Input** | User request or repeated pattern from dev-lessons; solution summary |
| **Output** | New skill at .cursor/skills/<name>/SKILL.md; SKILL_INDEX updated |
| **Dependencies** | SKILL_CONTRACT.md, SKILL_INDEX.md |
| **Purpose** | Create reusable skill from pattern; register in SKILL_INDEX |

## Purpose

Create a new Cursor skill that can be invoked by workflow-skill-receiver. Ensures consistent structure, trigger terms for matching, and registration in SKILL_INDEX.

## When to run

- **User explicitly asks** — "create a skill for X", "add a skill that does Y"
- **Repeated pattern** — Same workflow done 2+ times (noted in dev-lessons.md or process-log); create skill automatically
- **Self-evolving** — Semantic debugging, feature work, or any agent encounters reusable playbook (e.g. JWT auth, Redis cache); extract and create skill
- **User says** — "from now on, when I ask Z, always do A, B, C"

**Do not create when:**
- One-off request
- Tiny tweak to existing behavior
- Existing skill already covers it (update that skill instead)

## Decision: Create vs update

| Situation | Action |
|-----------|--------|
| New capability, no existing skill | Create new skill |
| Existing skill partially matches | Update existing skill |
| Unclear | Ask user: "Create new or update [existing]?" |
| Skill name already exists | Ask: "Update in place or use new name?" |

## Step-by-step process

### Step 1: Validate request

- **Is it a create-skill request?** If not, do not run.
- **Is there an existing skill?** Check SKILL_INDEX. If yes, consider update instead.

**Checklist:** [ ] Create-skill request; [ ] No existing skill (or update chosen)

### Step 2: Gather requirements

Ask or infer:
- **What** should the skill do?
- **When** should it be used? (trigger phrases for receiver)
- **Examples** — Any scripts, commands, or outputs?
- **Input/output** — What goes in? What comes out?

**Checklist:** [ ] What; [ ] When (triggers); [ ] Input/output

### Step 3: Choose name

- **Format:** Lowercase, hyphens, max 64 chars
- **Examples:** `validate-openapi`, `deploy-staging`, `run-migrations`
- **Check:** `.cursor/skills/` and SKILL_INDEX for collision. If exists, ask user.

**Checklist:** [ ] Name lowercase-hyphens; [ ] No collision

### Step 4: Write SKILL.md

**Location:** Project: `.cursor/skills/<skill-name>/SKILL.md`; Personal: `~/.cursor/skills/<skill-name>/SKILL.md`

**Required sections:**
- YAML frontmatter: `name`, `description`, `tags` (optional but recommended)
- Your persona (1–2 sentences)
- When to act (triggers)
- Step-by-step process (numbered)
- Output format (template, checklist, or report)
- Rules

**Size:** Under ~500 lines. Use `reference.md` for long content; link from main.

**Checklist:** [ ] Frontmatter; [ ] Persona; [ ] When to act; [ ] Process; [ ] Output format; [ ] Rules

### Step 5: Register in SKILL_INDEX

Append to `agent-system/SKILL_INDEX.md` (or update existing row). SKILL_INDEX has two columns: **Direct trigger** and **Intelligent match**. Add:
- **Direct trigger** — Prefix if applicable (e.g. `/review`), or `—` if none
- **Intelligent match** — Keywords/phrases; include tag-based phrases (e.g. tags: [auth, jwt] → "JWT auth", "auth setup")

**Checklist:** [ ] Row added with Direct trigger; [ ] Intelligent match phrases; [ ] No overwrite without asking

### Step 6: Confirm to user

"Created `.cursor/skills/<name>/SKILL.md`. Invoke by: [phrase or intent]."

**Checklist:** [ ] User informed; [ ] Invoke phrases provided

## Criteria checklist

| Criterion | Requirement |
|-----------|-------------|
| **Name** | Lowercase, hyphens, max 64 chars |
| **Description** | Third person; include what + when (trigger phrases) |
| **Trigger terms** | "Use when the user asks to X, Y, or Z" — receiver matches these |
| **Structure** | Persona, When to act, Process, Output format, Rules |
| **Register** | One line in SKILL_INDEX.md |
| **No overwrite** | If exists, ask before overwriting |

## Complete SKILL.md template

```markdown
---
name: skill-name
description: [What it does]. Use when the user asks to [X], [Y], or [Z].
tags: [task-type, technology, domain]
---

# Skill: [Display Name]

## Your persona
[1–2 sentences — who/what this skill represents]

## When to act
- [Trigger phrase 1]
- [Trigger phrase 2]
- [Trigger phrase 3]

## Step-by-step process
1. [Step 1 — specific action]
2. [Step 2]
3. [Step 3]

## Output format
[Template, checklist, or report structure]

## Rules
- [Rule 1]
- [Rule 2]
- [Rule 3]
```

## Example: Creating "validate-openapi" skill

```markdown
---
name: validate-openapi
description: Validates OpenAPI spec against schema. Use when the user asks to validate OpenAPI, check API spec, or run contract validation.
---

# Skill: Validate OpenAPI

## Your persona
You validate OpenAPI specs for correctness and consistency. You report errors with file:line and fix suggestions.

## When to act
- User says: "validate OpenAPI", "check API spec", "contract validation"
- Before merging API changes

## Step-by-step process
1. Locate OpenAPI file (openapi.yaml, swagger.json)
2. Run validator (spectral, openapi-generator, or equivalent)
3. Report errors with file:line
4. Suggest fixes for each error

## Output format
VALIDATION REPORT — [file]
✅ Valid / ❌ [N] errors
[Error list with fix]
```

## Skill tags (for discovery)

Add `tags` in frontmatter so agents can search by task type, technology, or domain:

```yaml
tags: [auth, backend, node]
tags: [payments, stripe, api]
tags: [cache, redis, performance]
```

Skill receiver can match on tags when user asks "JWT auth" or "Stripe integration".

## Rules

- **Trigger terms in description** — Receiver matches on "Use when..."
- **Project vs personal** — Project skills in `.cursor/skills/`; personal in `~/.cursor/skills/`
- **Never** put skills in `~/.cursor/skills-cursor/`
- **Validation** — Before finishing, verify SKILL.md is valid Markdown and SKILL_INDEX entry is correct

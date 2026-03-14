---
name: workflow-deep-think
description: Thorough analysis before output. Deconstruct problem in detail, research (web search), validate assumptions, cross-reference—do whatever is needed for a perfect, well-founded output. Use for DeepThink:, "think deeply", "do thorough research", "give me the perfect solution".
tags: [strategic, research, quality, analysis]
layer: strategic
produces: [docs/user-docs/deep-think/[slug]-analysis.md]
required_context: [memory/project-state]
---

# Workflow: Deep Think

## Skill contract

| | |
|-|-|
| **Layer** | Strategic |
| **Input** | Problem statement, question, or task requiring thorough analysis |
| **Output** | Well-researched, verified, high-quality analysis or solution |
| **Dependencies** | memory/project-state.md (if exists); web search tools |
| **Purpose** | Analyze deeply, research thoroughly, produce perfect output |

## Purpose

**Never rush.** When this skill runs, treat the problem with full rigor: deconstruct it in detail, research the web, validate assumptions, cross-reference sources, and deliver output that is accurate, complete, and actionable.

Use when the user wants a **thorough, well-founded answer**—not a quick reply.

## When to run

- **Trigger:** `/deep-think`, `/think`, `DeepThink:`
- **User says:** "think deeply", "do thorough research", "analyze in detail", "give me the perfect solution", "do whatever it takes", "research and get back", "I need a comprehensive answer"

## Core rule

**Do not produce output until you have done sufficient analysis and research.** If in doubt, research more. Output only when you are confident the answer is correct and complete.

---

## Step-by-step process

### Step 1: Deconstruct the problem statement

Parse the request in fine detail:

| Question | Answer |
|----------|--------|
| **What is the core question or task?** | Extract the exact ask |
| **What is explicit?** | Requirements, constraints, context the user provided |
| **What is implicit?** | Assumptions, domain conventions, edge cases |
| **What is ambiguous?** | Terms, scope, success criteria that need clarification |
| **What domain/tech does it touch?** | List technologies, frameworks, standards, ecosystems |

**Checklist:** [ ] Problem fully deconstructed; [ ] Ambiguities and assumptions listed

---

### Step 2: Research (mandatory)

Use **web search** and any available tools to:

- **Verify facts** — APIs, versions, best practices, current standards
- **Find authoritative sources** — Official docs, RFCs, trusted tutorials
- **Compare alternatives** — When multiple approaches exist, research pros/cons
- **Check for pitfalls** — Common mistakes, known issues, deprecations
- **Update knowledge** — Ensure you are not relying on outdated information

**Search strategy:**
- Search for exact terms (library names, error messages, concepts)
- Search for "best practices [topic]", "common mistakes [topic]"
- Search for recent posts/docs (current year) when tech changes fast

**Checklist:** [ ] At least 2–3 relevant sources consulted; [ ] Key claims verified

---

### Step 3: Validate assumptions

- List all assumptions you are making
- For each: can it be verified via research? If yes, verify. If no, note the risk
- Identify missing information that would improve the answer
- Resolve what you can; for critical gaps, state them clearly in output

**Checklist:** [ ] Assumptions listed; [ ] Verified or flagged

---

### Step 4: Synthesize and structure

- Combine research, problem decomposition, and validated assumptions
- Structure the output: clear sections, bullet points, tables, code blocks as needed
- Order by: problem → analysis → options (if any) → recommendation → implementation/details
- Include sources/citations where helpful

---

### Step 5: Self-review before delivery

Before presenting to the user:

- [ ] Is the answer complete? Any loose ends?
- [ ] Are technical claims accurate? Re-check if unsure
- [ ] Is the structure clear? Can the user act on this?
- [ ] Did I skip research where it would have helped? If yes, do it now

**Do not deliver until self-review passes.**

---

## Output format

Produce structured output. Optionally save to `docs/user-docs/deep-think/[slug]-analysis.md`:

```markdown
# Deep Think Analysis — [Problem summary]

## Problem deconstruction
- **Core question:** [exact ask]
- **Explicit:** [listed]
- **Implicit / assumptions:** [listed]
- **Domain/tech:** [listed]

## Research findings
- [Source 1]: [key finding]
- [Source 2]: [key finding]
- [Key facts verified]

## Analysis
[Structured analysis, options, trade-offs]

## Recommendation
[Clear recommendation with rationale]

## Implementation / solution
[Detailed answer, code, steps—whatever is needed]

## Assumptions & risks
- [Assumption]: Verified / Flagged
- [Risk]: [mitigation or note]
```

---

## Rules

- **Research is mandatory** — Use web search. Do not rely on memory alone for facts.
- **No half-answers** — If you cannot fully answer, say so and explain what is missing.
- **Verify before stating** — Do not state technical facts without verification when possible.
- **Do whatever is needed** — Extra research, multiple searches, cross-checking. Prioritize quality over speed.
- **Self-review before delivery** — Do not skip the final check.

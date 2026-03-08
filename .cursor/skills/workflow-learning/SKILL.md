---
name: workflow-learning
description: Record lessons for future reuse. Agent records: wrong approach, correct pattern. System improves over time. Use for Learn:, "record lesson", "add to dev-lessons".
tags: [operational, knowledge, lessons]
layer: operational
---

# Workflow: Learning

## Purpose

**Agents record lessons.** When a pattern is discovered (correct or incorrect), add it to `docs/dev-lessons.md`. Future runs reference it. The system improves over time.

## When to run

- **Trigger:** `Learn:`
- **User says:** "record this lesson", "add to dev-lessons", "remember this pattern"
- **Context:** After fixing a bug, after architecture decision, after discovering correct/incorrect pattern

## Step-by-step process

### 1. Identify lesson

- What was wrong or what was correct?
- Reusable for future similar work?
- **Checklist:** [ ] Lesson is actionable

### 2. Format entry

```markdown
## Lesson: [Topic]
**Wrong:** [What was done incorrectly — or "N/A" if this is a correct-pattern-only entry]
**Correct:** [Right pattern / approach]
**When:** [Date or brief context]
```

### 3. Append to docs/dev-lessons.md

- Add at end of file
- Keep entries concise (2–4 lines each)

### 4. Reference

- Before similar work, agents should read `docs/dev-lessons.md`
- Apply lessons when relevant

## Rules

- One entry per lesson
- Be specific; vague lessons are not useful
- Also update `.cursor/lessons-learned.md` if project uses it

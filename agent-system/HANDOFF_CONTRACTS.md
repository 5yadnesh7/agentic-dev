# HANDOFF CONTRACTS — Agent and skill communication

**Purpose:** Define how agents and skills communicate. Ensures consistent handoffs, report formats, and context passing.

See also: `DELEGATION.md`, `MEMORY_SYSTEM.md`, `ROUTING.md`.

---

## 1. Sub-agent → CTO report contract

When a sub-agent completes work assigned by CTO, it **reports back** via the mcp_task return. The report MUST follow this structure:

### Report format (required)

```markdown
## Report — [task description]

**Status:** DONE | BLOCKED | PARTIAL

**Summary:** [1–3 sentences: what was done]

**Artifacts produced:**
- [path]: [brief description]
- e.g. `memory/project-state.md`: Updated Completed Tasks
- e.g. `docs/user-docs/debug/login-500-report.md`: Debug report

**Key decisions (if any):** [Bullet points]

**Next steps / blockers (if any):** [What CTO or user should do next]

**Self-review:** Passed / Issues noted: [list]
```

### Rules

- Sub-agent MUST list all produced artifacts (files written, project-state updates).
- Sub-agent MUST update `memory/project-state.md` before reporting (Completed Tasks, Key Decisions, etc.).
- CTO uses this report to reply to user and reference artifacts.

---

## 2. CTO → sub-agent handoff payload

When CTO dispatches via `mcp_task`, the `prompt` parameter MUST follow this structure:

### Prompt structure (required)

```
## Task
[What to do — clear objective]

## User request (verbatim or summary)
[Original user message or summary]

## Context
- Read `memory/project-state.md` before acting.
- Read `memory/agent-messages.md` if handoff from another agent (check for [PreviousAgent → You]).
- Relevant prior outputs: [list paths, e.g. docs/user-docs/researcher/research-X.md]

## Constraints
[Time, scope, tech stack, or "none"]

## Expected output
[Skill contract output or artifact paths]
```

### Rules

- CTO MUST include "Read project-state" and "Read agent-messages if handoff" in Context.
- CTO MUST reference any prior phase outputs the sub-agent needs.

---

## 3. agent-messages format and addressing

### Schema

```markdown
**[FromAgent → ToAgent]**

Context: [One-line: what this handoff is about]

[Message body — bullet points OK, reference files]

Request: [What ToAgent should do]
```

### When to post

| FromAgent | ToAgent | When |
|-----------|---------|------|
| Architect | Reviewer | After proposing architecture; request review |
| Reviewer | Architect | After review; CLEAR or list issues |
| Planner | Architect | After product spec; handoff for design |
| Sub-agent | CTO | When blocked; need user input; critical finding |

### When to read

- **Before acting:** If CTO dispatched you with "handoff from X", read agent-messages for `[X → You]`.
- **At phase start:** If project-state says " awaiting review from [You]", read agent-messages.
- **Rule:** Search for `[.* → YourRole]` (e.g. `[Architect → Reviewer]`) and read that message.

---

## 4. project-state.md schema

**Full template:** `memory/project-state.template.md` (or `memory/project-state.md` in repo).

### Required sections (all agents must use these names)

| Section | Purpose | Updated by |
|---------|---------|------------|
| **Current Phase** | Phase number or name | Supervisor, CTO |
| **Active Task** | Task ID or "—" | Per-task loop |
| **Completed Tasks** | List of done work | All agents after completion |
| **Key Decisions** | Resolved decisions | Architect, CTO, Worker |
| **Lessons Learned** | Reusable patterns | Any agent |
| **Task Board** | Task states (PENDING, IN LOOP, DONE) | Planner, Worker |

### Update rules

- Append to Completed Tasks; do not overwrite.
- Use format: `- [YYYY-MM-DD] [Phase/Task]: [brief]`.
- Key Decisions: `- [Decision]: [rationale]`.

---

## 5. Skill invoking another skill

When skill A needs to invoke skill B (e.g. workflow-semantic-debugging → workflow-impact-analysis):

### Contract

1. **Same agent session:** Agent running skill A executes skill B's process in the same session.
2. **Context to pass:** Skill A provides skill B's required Input (see SKILL_CONTRACT) as explicit text in the prompt or by referencing files.
3. **Example:** Semantic debugging says "Invoke /impact" → Agent runs workflow-impact-analysis with Input: list of changed files, change summary. Skill B's output is then used to complete skill A's Verify step.

### Invocation note

- No separate mcp_task for skill-in-skill. The executing agent reads skill B's SKILL.md and performs its steps.
- Document in skill A: "If [condition], run workflow-X with input: [list]. Use output for [step]."

---

## 6. Worker–Critic protocol

**Critic is internal** — not invoked via mcp_task. The executing agent (Worker or skill runner) performs Critic review **in the same session** by switching perspective.

### Protocol

1. **Worker produces fix** (or implementation).
2. **Agent thinks as Critic:** Re-read output; apply Critic checklist (logic, security, architecture, performance). List issues with severity and fix suggestion.
3. **If issues found:** Worker revises; repeat step 2. Max 2–3 iterations.
4. **If pass:** Proceed to next step (e.g. regression test).

### Checklist (from `agents/critic.md`)

| Category | Examples |
|----------|----------|
| Logic | Edge cases, wrong conditions, null handling |
| Security | Input validation, secrets, injection |
| Architecture | Pattern violations, boundaries |
| Performance | N+1, missing indexes |

**Instruction:** Assume production, 1M users. Find flaws; don't praise.

---

## 7. Sequential pipeline: Architect → Reviewer

### Flow

1. Architect completes design → posts to `agent-messages` with `[Architect → Reviewer]`, includes artifact paths.
2. Architect updates `project-state`: Completed Tasks; Current Phase = "Awaiting review".
3. CTO receives Architect's report (or dev-supervisor continues) → dispatches Reviewer.
4. CTO prompt to Reviewer MUST include: "Read `memory/agent-messages.md` for [Architect → Reviewer]. Review artifacts: [paths]."
5. Reviewer reads agent-messages → reviews → posts `[Reviewer → Architect]` with CLEAR or issues.
6. If issues: CTO dispatches Architect with Reviewer's message. Architect revises → re-posts → Reviewer re-checks.

---

## 8. Direct skill vs CTO-dispatched context

| Path | Context available |
|------|-------------------|
| **Direct trigger** (e.g. `/bug`) | Full chat history, attachments, current repo. Agent runs skill in same chat. |
| **CTO-dispatched** (mcp_task) | Only `prompt` and `description`. No chat history. |

### Mitigation

- CTO MUST include in `prompt`: user request verbatim, relevant file paths, and "Read project-state, agent-messages".
- If user attached files or pasted logs, CTO MUST copy that content into the prompt.
- Sub-agent has no access to parent chat; all context must be in prompt and memory files.

---

## 9. Definition of "done"

A sub-agent is **done** when:

1. **Work complete:** Domain work finished per task.
2. **project-state updated:** Completed Tasks, Key Decisions (if any), Lessons Learned (if reusable).
3. **Artifacts produced:** All outputs written to documented paths.
4. **Report sent:** mcp_task return includes Report (per §1) with artifact list.
5. **Self-review passed:** Domain-expert self-review completed; obvious issues fixed.

CTO considers the sub-agent "done" only when the report is received and lists artifacts. CTO then runs Critic and replies to user, referencing those artifacts.

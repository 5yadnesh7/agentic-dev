# Scripts

> **When to run:** After adding/modifying skills; in CI (see `.github/workflows/ci.yml`).

## validate-skills.js

Validates skills against `agent-system/SKILL_CONTRACT.md`.

**Checks:**
- **Metadata (frontmatter):** `name`, `description`, `tags`, `layer`
- **Skill contract (with `--strict`):** `| **Input** |` and `| **Output** |` rows

**Usage:**
```bash
node scripts/validate-skills.js        # metadata only
node scripts/validate-skills.js --strict   # metadata + input + output
```

**Exit:** 0 if all pass, 1 if any fail.

## validate-agent-system.js

Validates 3-tier agent system (skill → sub-agent → CTO).

**Checks:**
- `agent-system/AGENT_SKILL_MAP.md` exists; all referenced skills have `.cursor/skills/<name>/SKILL.md`
- All sub-agents have `.cursor/agents/<name>.md` (architect, worker, tester, etc.)
- CTO agent file exists
- `ORCHESTRATOR.md` has CTO and sub-agent triggers
- `SKILL_INDEX.md` has CTO and sub-agent entries
- `ROUTING.md` exists and documents precedence and 3-tier model
- Sub-agent files have YAML frontmatter (`name`, `description`) and Self-review section
- **Rules:** each `.cursor/rules/*.mdc` has non-empty `description` (shown in Cursor rule picker)
- **Skills:** each skill has single-line `description` (no YAML multiline `>`, which may not display properly)

**Usage:**
```bash
node scripts/validate-agent-system.js
```

**Exit:** 0 if all pass, 1 if any fail.

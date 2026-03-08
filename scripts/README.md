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

## validate-example.js

Validates example project structure (examples/saas-example).

**Checks:** IDEA.md, docs/roadmap.md, docs/architecture.md, tasks/*.md exist.

**Usage:** `node scripts/validate-example.js`

**Exit:** 0 if structure valid, 1 if any check fails.

# Commit convention (project-level)

Set by the agent on first prompt or when you specify. Use this pattern for all commits in this project.

---

## Default: Conventional Commits

**Format:** `type(scope): description`

**Types:**
- `feat` — New feature
- `fix` — Bug fix
- `test` — Add or update tests
- `docs` — Documentation only
- `chore` — Config, tooling, no code change
- `refactor` — Code change that is not fix or feat

**Scope:** Area of codebase (auth, ui, db, orders, etc.)

**Examples:**
```
feat(auth): add POST /auth/login endpoint
feat(db): add User model with email and passwordHash
feat(ui): add LoginForm component with validation
fix(auth): prevent refresh loop on 401 from /auth/refresh
test(orders): add OrderService unit tests
docs: update CHANGELOG for auth system
chore: add Sequelize DB connection config
```

---

## Alternative: Jira ticket prefix

If your team uses Jira, add ticket at start:

```
PROJ-101 feat(auth): add login endpoint
PROJ-101 fix(ui): show error when login fails
```

---

**To customize:** Replace this file with your team's convention. The agent will use whatever is written here.

# Tool Memory

> **Purpose:** Commands that worked, env/config notes, reusable snippets. Updated when agents run tools and get useful results. See `agent-system/MEMORY_SYSTEM.md`.

## Commands that worked

| Command | Result | When |
|---------|--------|------|
| `npm run db:migrate` | OK | After adding migrations |
| `npm test -- path/to/spec` | 12 passed | When running subset of tests |
| *(Add as agents run useful commands)* | | |

## Env / config notes

- `DATABASE_URL` — Required for migrations; set in `.env`
- `JWT_SECRET` — Required for auth; never commit
- *(Add when env vars, config paths, or setup details are discovered)*

## Reusable patterns

- Run migrations before tests if schema changed
- Use `npm test -- --grep "pattern"` to run specific tests

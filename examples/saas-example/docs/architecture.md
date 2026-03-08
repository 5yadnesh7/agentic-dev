# Architecture — Todo SaaS

## Stack

- **Frontend:** Next.js, React, Tailwind
- **Backend:** Node.js, Express
- **Database:** PostgreSQL
- **Auth:** JWT

## Modules

| Module | Responsibility |
|--------|----------------|
| auth | Signup, login, JWT |
| users | User CRUD |
| lists | Todo lists CRUD |
| tasks | Tasks CRUD |
| shares | List sharing |

## Data flow

```
Client → API (Express) → Services → DB (PostgreSQL)
```

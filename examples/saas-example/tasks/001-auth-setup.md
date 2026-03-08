# Task 001 — Auth setup

Assign: Senior
Size: M
Depends: none

## Goal

Implement user signup and login with JWT.

## Files to modify

- `src/auth/routes.ts` — signup, login endpoints
- `src/auth/service.ts` — validate, create user, issue JWT
- `src/models/user.ts` — User model

## AC

- [ ] POST /auth/signup — creates user, returns JWT
- [ ] POST /auth/login — validates credentials, returns JWT

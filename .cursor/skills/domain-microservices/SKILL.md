---
name: domain-microservices
description: Microservice design: service boundaries, API contracts, communication. Use when the user asks for microservice design, API contracts, service decomposition, or Micro: trigger.
tags: [strategic, architecture, microservices]
layer: strategic
---

# Domain: Microservices

## Your persona

You design service boundaries, API contracts, and communication patterns for microservices. You ensure bounded contexts, clear ownership, and operational standards. You produce service list, contracts (OpenAPI, event schema), and communication diagrams.

## When to act

- **User says:** "microservices", "service decomposition", "API contract", "Micro:", "split into services"
- Designing or decomposing a system into services

## Step-by-step process

### Step 1: Identify bounded contexts

| Action | Details |
|--------|---------|
| **Domain boundaries** | What does each service own? |
| **Data ownership** | Each service owns its data; no shared DB |
| **Deployable unit** | One service = one deployable |

**Checklist:** [ ] Bounded contexts; [ ] Data ownership; [ ] No shared DB

### Step 2: Define service list

| Service | Responsibility | Owns | Exposes |
|---------|----------------|------|---------|
| Auth | Authentication, sessions | users, sessions | POST /login, /refresh |
| Orders | Order lifecycle | orders, order_items | POST /orders, GET /orders/:id |
| Inventory | Stock, availability | products, stock | GET /products, PATCH /stock |

**Checklist:** [ ] Service list; [ ] Responsibility; [ ] Owns; [ ] Exposes

### Step 3: Define contracts

**Sync (REST):**
- OpenAPI spec per service
- Versioning: `/v1/` prefix
- Request/response schemas
- Error format: `{ code, message, details }`

**Async (events):**
- Event schema: name, payload, version
- Idempotent consumers
- At-least-once delivery

**Checklist:** [ ] OpenAPI per service; [ ] Versioning; [ ] Event schema; [ ] Idempotency

### Step 4: Define communication

| Pattern | Use case | Notes |
|---------|----------|-------|
| Sync REST | Query, command with immediate response | Timeouts, retries |
| Sync gRPC | Internal, performance-critical | Proto definitions |
| Async events | Decoupled, eventual consistency | Event bus, idempotency |
| **Avoid** | Chatty services | Batch, aggregate |

**Checklist:** [ ] Sync vs async chosen; [ ] Patterns documented

### Step 5: Operational standards

- **Health:** `GET /health` (liveness), `GET /ready` (readiness)
- **Observability:** Logs, traces, metrics per service
- **Resilience:** Circuit breakers for cross-service calls; retries with backoff

**Checklist:** [ ] Health endpoints; [ ] Observability; [ ] Resilience patterns

## Output format

### Service list

```markdown
# Microservice Design: [Project]

## Services

| Service | Responsibility | Data | API |
|---------|----------------|------|-----|
| auth | Login, sessions, tokens | users, refresh_tokens | REST /v1/... |
| orders | Order CRUD, fulfillment | orders, order_items | REST /v1/... |
| inventory | Products, stock | products, stock_levels | REST /v1/... |

## Contracts
- Auth: OpenAPI at docs/auth-openapi.yaml
- Orders: OpenAPI at docs/orders-openapi.yaml
- Events: [Event names, payloads]
```

### OpenAPI snippet (per service)

```yaml
openapi: 3.0.0
info:
  title: Auth Service
  version: 1.0.0
paths:
  /v1/login:
    post:
      summary: Login
      requestBody: ...
      responses: ...
```

## Rules

- **One bounded context per service** — Clear ownership
- **No shared DB** — Each service owns its data
- **Backward compatibility** — Version APIs; deprecate explicitly
- **Escalate** — CTO for architecture decisions

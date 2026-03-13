# Architecture Diagrams

Visual overview of the Agentic Dev framework. **Mermaid diagrams render on GitHub.**

---

## Main execution flow

```
User
  ↓
Supervisor (dev-supervisor)
  ↓
Planner
  ↓
Architect
  ↓
Worker ↔ Critic
  ↓
Tester
  ↓
PR Generator
```

---

## Mermaid: High-level pipeline

```mermaid
flowchart TD
    User([User])
    Supervisor[dev-supervisor]
    Planner[Planner]
    Architect[Architect]
    Worker[Worker]
    Critic[Critic]
    Tester[Tester]
    PR[PR Generator]

    User --> Supervisor
    Supervisor --> Planner
    Planner --> Architect
    Architect --> Worker
    Worker <--> Critic
    Worker --> Tester
    Tester --> PR
    PR --> User
```

---

## Skill hierarchy (Executive → Strategic → Operational)

```mermaid
flowchart TD
    subgraph Executive
        DevSupervisor[dev-supervisor]
        Orchestrator[workflow-orchestrator]
        SkillReceiver[workflow-skill-receiver]
    end

    subgraph Strategic
        Research[role-research-analyst]
        Roadmap[workflow-project-roadmap]
        Spec[workflow-project-spec]
        TaskPlan[workflow-task-planner]
    end

    subgraph Operational
        Engineer[Worker / Engineer]
        Debug[workflow-semantic-debugging]
        Tester2[Tester]
    end

    User2([User]) --> DevSupervisor
    DevSupervisor --> Research
    Research --> Roadmap
    Roadmap --> Spec
    Spec --> TaskPlan
    TaskPlan --> Engineer
    Engineer --> Tester2
```

---

## Collaborative loops

```mermaid
flowchart LR
    subgraph "Architect ↔ Reviewer"
        A1[Architect designs] --> R1[Reviewer critiques]
        R1 -->|revision| A1
    end

    subgraph "Worker ↔ Critic"
        W1[Worker implements] --> C1[Critic reviews]
        C1 -->|2–3 loops| W1
    end

    subgraph "Tester ↔ Coder"
        T1[Tester verifies] --> D1[Coder fixes]
        D1 -->|if fail| T1
    end
```

---

## Full greenfield pipeline (Idea → PR)

```mermaid
flowchart TD
    Idea([Idea / Build X])
    Research[Research]
    Validate[Assumption Validation]
    Roadmap[Project Roadmap]
    Spec[Spec]
    Arch[Architecture]
    ArchReview[Architecture Review]
    Tasks[Task Decomposition]
    Execute[Execute tasks]
    Test[Integration Test]
    PR2[PR]

    Idea --> Research
    Research --> Validate
    Validate --> Roadmap
    Roadmap --> Spec
    Spec --> Arch
    Arch --> ArchReview
    ArchReview -->|revision| Arch
    ArchReview --> Tasks
    Tasks --> Execute
    Execute --> Test
    Test -->|fix if fail| Execute
    Test --> PR2
```

---

## Stateful reasoning

```
read state  →  think  →  act  →  update state
     ↑                                    │
     └────────────────────────────────────┘
```

**Files:** `memory/project-state.md`, `memory/agent-messages.md`, `docs/system-docs/decision-log.md`

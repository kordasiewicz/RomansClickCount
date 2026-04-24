---
name: google-cloud-ledger-scribe
description: Authoritative skill for writing standardized records to the .cloud/ directory (Ledger, Sessions, and Context).
---
# Scribe Agent Mandate

You are the central Scribe. Other agents must use your guidelines to write to the `.cloud/` flight recorder directories. You ensure all logging is standardized, chronological, and perfectly preserved for institutional memory.

## 1. Sessions (`.cloud/sessions/`)
When an agent starts a complex task, create a session file: `.cloud/sessions/YYYY-MM-DD-HHMMSS-<agent-name>.md`
**Template:**
```markdown
# Session: [Agent Name]
- **Start Time**: [ISO-8601 Timestamp]
- **Goal**: [Brief intent]
- **Status**: IN_PROGRESS
```

## 2. Ledger (`.cloud/ledger/`)
When an agent completes an action (success or failure), write a receipt: `.cloud/ledger/YYYY-MM-DD-HHMMSS-<action>.md`
**Template:**
```markdown
# Resolution Receipt: [Action Name]
- **Timestamp**: [ISO-8601 Timestamp]
- **Agent**: [Agent Name]
- **Status**: [SUCCESS | FAILED]

## Intent
[What was the goal?]

## Actions Taken
- [Step 1]
- [Step 2]

## Outcome / Errors
[What happened? If failed, include stack traces.]
```

## 3. Context (`.cloud/context/`)
When an agent discovers a constraint but it requires human approval before entering `CLOUD.md`, save it: `.cloud/context/<topic>-proposal.md`
**Template:**
```markdown
# Proposed Constraint: [Topic]
- **Discovered By**: [Agent Name]
- **Justification**: [Why is this needed?]
- **Proposed CLOUD.md Addition**:
  > [The exact markdown to add to CLOUD.md]
```

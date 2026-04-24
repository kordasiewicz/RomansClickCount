---
name: google-cloud-triage-historian
description: Implements the "Active Historian" human-in-the-loop agent mandate. Drafts receipts and updates institutional memory.
---

> [!IMPORTANT]
> **Mandatory CLOUD.md Compliance**
> Before executing any actions defined in this skill, you **MUST** read the `CLOUD.md` file located in the root of the project. You must strictly adhere to its project boundaries, the $100 budget cap, IAM separation of duties, and any systemic constraints documented in its Institutional Memory section.

> [!NOTE]
> **Mandatory Ledger Recording**
> You must strictly use the `google-cloud-ledger-scribe` skill to record your actions. 
> 1. Before starting a complex task, initialize a session in `.cloud/sessions/`.
> 2. When your task is complete or if an error occurs, write a detailed receipt to `.cloud/ledger/`.
> 3. Do NOT attempt to format or write to these directories manually; always follow the formats defined in the Scribe skill.

# Institutional Memory & Triage Agent Mandate

You are the Active Historian. Your job is to ensure that the project learns from its incidents and that no context is ever lost.

## 1. Post-Mortem Analysis
- After any human intervention or P0/P1 incident in production, query Cloud Logging to gather the timeline of the error.
- Interview the human operator (via Agent Inbox) to understand the root cause and the fix applied.

## 2. Ledger Updates
- You must use the `google-cloud-ledger-scribe` skill to format and save the Resolution Receipt chronologically in `.cloud/ledger/`.

## 3. Updating CLOUD.md Constraints
- Analyze the incident to determine if a new systemic constraint is needed (e.g., "Do not downscale during 4am cron jobs").
- Update Section 7 (Institutional Memory) in `CLOUD.md` with the new rule to prevent future agents from making the same mistake.

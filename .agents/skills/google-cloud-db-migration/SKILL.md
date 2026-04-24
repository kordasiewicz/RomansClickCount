---
name: google-cloud-db-migration
description: Equips the CI/CD Operator to handle stateful schema migrations securely over Private VPC.
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

# Database Migration Capability

This skill outlines how to execute schema migrations against the private Cloud SQL instance.

## 1. Autonomous Execution
- Schema migrations must be handled autonomously during the CI/CD pipeline.
- Migrations must execute *before* the Cloud Deploy traffic switch occurs.

## 2. Private IP & Connectivity
- Because Cloud SQL is restricted to **Private IP only** (for security), the CI/CD worker (e.g., Cloud Build private pool) must have VPC access.
- Ensure the migration script utilizes Serverless VPC Access or Direct VPC Egress to reach the database.
- Do NOT attempt to open the Cloud SQL instance to the public internet to run migrations.

## 3. Tool-Agnostic Execution
- Locate the repository's native migration scripts (e.g., `prisma migrate`, `flyway migrate`, or raw SQL scripts).
- If migrations fail, the deployment must halt, and the error must be logged for the Triage Agent.

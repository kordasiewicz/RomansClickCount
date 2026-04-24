# CLOUD.md - RomansClickCount

**Author**: Carl Sziebert / Roman Kordasiewicz
**Status**: Active
**Last update**: 2026-04-23

## Brief
This file defines how the RomansClickCount software lives in the enterprise cloud. It acts as the institutional memory for the project, effectively serving as a resident "Cloud Specialist" embedded directly within the repository. 

---

## 1. Identity & Binding
This repository maps to a specific Google Cloud environment. Autonomous agents must restrict their operations to these exact boundaries:
- **Project ID**: `romans-click-count-123` (Pre-existing)
- **Organization & Folder**: Resides in the `romans-click-count-123` folder under the `romans-click-count-123` organization.
- **Budget Constraint**: The project operates under a strict **$100 monthly budget**.

### Identity & Access Management (IAM)
- **Runtime Identity**: Cloud Run utilizes the Default Compute Engine Service Account.
- **CI/CD Pipeline**: Employs **Separation of Duties**. Cloud Build uses a distinct service account for pushing artifacts, while Cloud Deploy uses a separate identity for rolling out to Cloud Run.

---

## 2. Architecture & Networking Map
- **Compute**: Google Cloud Run (Fully managed serverless containers)
  - **Scaling Constraints**: Maximum instances strictly capped (e.g., 5) to adhere to the $100 budget.
- **Database**: Cloud SQL (PostgreSQL)
  - **Topology**: Single-zone standard deployment (cost-optimized for budget) with daily automated backups.
  - **Connectivity**: Restricted to **Private IP only** via Cloud Run Direct VPC Egress.
- **Networking/Ingress**: Protected via Global HTTP(S) Load Balancer with **Cloud Armor (WAF)** enabled.
- **Secrets Management**: Secrets are securely mounted as volumes at runtime via Google Secret Manager.
- **IaC**: Terraform / OpenTofu 
- **Artifacts**: Google Artifact Registry

---

## 3. CI/CD Governance & Deployment Loop
The inner and outer loops of the SDLC are defined as follows:
- **Testing Gate**: Unit tests and linting (`deno task test`) must pass before any deployment.
- **Supply Chain Security**: Artifact Registry vulnerability scanning is strictly enforced. Deployments are **blocked** if Critical/High CVEs are detected.
- **Database Migrations**: Handled autonomously. The CI/CD pipeline automatically executes schema migrations prior to the Cloud Deploy traffic switch.
- **Staging Loop**: Merging to the `main` branch automatically triggers Cloud Build, which builds the container, pushes to Artifact Registry, and auto-deploys to Staging.
- **Production Loop**: Tagging a release (e.g., `v1.0.0`) triggers a deployment pipeline via Google Cloud Deploy.
- **Deployment Strategy**: Canary Deployment (10% traffic initially).
- **Human Gate**: Explicit approval is required in Cloud Deploy before the production rollout continues.

---

## 4. Authorized Capabilities (Skills)
The following skills are authorized for autonomous and monitored agent usage within this repository:
- `google-cicd-deploy`: For deploying updates to Cloud Run.
- `google-cicd-pipeline-design`: For extending the CI/CD pipeline.
- `google-cicd-release-orchestration`: For managing the Cloud Deploy Canary strategies.
- `google-cicd-terraform`: For managing Infrastructure as Code.
- `google-cloud-db-migration`: For autonomous database schema evolution.
- `google-cloud-manifest-updater`: Active Context Miner. Scans `.cloud/` logs and safely generates Git CLs/PRs to propose updates to this CLOUD.md manifest.
- `google-cloud-security-governance`: For enforcing IAM boundaries and WAF configurations.
- `google-cloud-sre-monitoring`: For observing latency, scaling, and triggering rollbacks.
- `google-cloud-triage-historian`: For analyzing incidents and drafting context.
- `google-cloud-ledger-scribe`: For writing structured, chronological receipts to the `.cloud/` flight recorder.

---

## 5. Autonomous Agent Ecosystem & Trust Levels
The specialized AI agents operating on this repository are configured with distinct IAM Service Accounts and constraints:

1. **Deployment & IaC Agent (CI/CD Operator)**
   - **Trust Level**: `Autonomous`
   - **IAM Role**: Requires `roles/editor` to provision IaC.
   - **Mandate**: Trusted to plan and apply Terraform changes for non-destructive operations (scaling, adding resources). 
   - *Note: Agent is responsible for managing Terraform state in the designated backend bucket.*

2. **Security & Governance Agent**
   - **Trust Level**: `Strict Enforcer`
   - **IAM Role**: Requires `roles/iam.securityAdmin` to monitor and revert IAM drift.
   - **Mandate**: Continuously scans for IAM drift; automatically reverts unauthorized manual changes and logs a P0 violation.

3. **Monitoring & Auto-Fix Agent (SRE Agent)**
   - **Trust Level**: `Proactive Auto-Scaler/Rollback`
   - **IAM Role**: Requires `roles/monitoring.editor` and `roles/run.admin` to scale services.
   - **Mandate**: Monitors latency via Cloud Monitoring. Automatically scales resources during spikes, or triggers an automatic rollback in Cloud Deploy if error rates spike.

4. **Institutional Memory & Triage Agent (Human-in-the-Loop)**
   - **Trust Level**: `Active Historian`
   - **Mandate**: After a human manually fixes an incident in production, the agent automatically drafts a "Resolution Receipt" and updates this `CLOUD.md` file's constraints.

---

## 6. Notification Severity Matrix
Agents must adhere to the following communication guidelines:
- **P0 (Critical)**: Modal/SMS. Use for IAM drift reversions or unauthorized access attempts.
- **P1 (Verify)**: Agent Inbox. Use for Schema changes, PR reviews, or human gate approvals.
- **P2 (Advisory) / P3 (Info)**: Silent log to `.cloud/ledger`. Use for routine optimizations or autoscaling events.

---

## 7. Institutional Memory (Context & Constraints)
*This section contains learned constraints that Agents MUST follow. The Triage Agent updates this section.*

- **Constraint**: The `main` branch should always reflect the current state of Staging. Do not force-push.
- **Constraint**: Canary deployments are mandatory for Production. Do not bypass the 10% traffic split unless responding to a P0 emergency rollback.

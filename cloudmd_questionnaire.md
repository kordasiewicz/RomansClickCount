# RomansClickCount CLOUD.md Questionnaire

To accurately construct the `CLOUD.md` manifest and institutional memory for the **RomansClickCount** project, please provide your preferences for the following aspects of the project's cloud lifecycle, governance, and agent ecosystem.

## Part 1: SDLC Inner & Outer Loops
**1. What is the primary trigger for the "outer loop" (CI/CD pipeline) deployment?**
- [x] A) Push or merge directly to the `main` branch. (this should auto deploy to staging)
- [x] B) Tagging a release (e.g., `v1.0.0`). (versioned releases should push to production)
- [ ] C) Manual trigger by a developer after CI tests pass.
- [ ] D) Scheduled nightly builds.

**2. How are container images built and managed for this Fresh/Deno application?**
- [x] A) Google Cloud Build builds the Dockerfile and pushes to Google Artifact Registry.
- [ ] B) GitHub Actions builds the image and pushes to Artifact Registry.
- [ ] C) Local builds pushed manually to a container registry.

**3. What level of automated testing is required before a deployment proceeds?**
- [x] A) Unit tests and linting (`deno task test`).
- [ ] B) Unit tests + E2E browser tests (e.g., Playwright/Cypress).
- [ ] C) No automated tests required for now.

## Part 2: Cloud Resources & Architecture
**4. What is the target compute environment for hosting the application?**
- [x] A) Google Cloud Run (Fully managed serverless containers).
- [ ] B) Google Kubernetes Engine (GKE) (Dedicated cluster).
- [ ] C) Compute Engine (Standard VMs).

**5. How will the click count state be persisted?**
- [ ] A) Firestore / Datastore (NoSQL).
- [x] B) Cloud SQL (PostgreSQL/MySQL).
- [ ] C) Memorystore (Redis).
- [ ] D) No external persistence currently needed (in-memory only for this MVP).

**6. How will Infrastructure as Code (IaC) be managed?**
- [x] A) Terraform / OpenTofu (using the `.agents/skills/google-cicd-terraform` skill).
- [ ] B) Google Cloud Deployment Manager.
- [ ] C) ClickOps (Manual configuration via Cloud Console - *not recommended*).

## Part 3: Methods, Processes & Deployment Strategy
**7. What deployment strategy should be utilized for production?**
- [ ] A) Direct Rolling Update (Replace old instances with new ones).
- [x] B) Canary Deployment (e.g., route 10% of traffic to the new version first, then 100%).
- [ ] C) Blue/Green Deployment (Spin up exact copy, switch load balancer).

**8. Which tool will orchestrate the delivery pipeline?**
- [x] A) Google Cloud Deploy (leveraging the `.agents/skills/google-cicd-release-orchestration` skill).
- [ ] B) GitHub Actions native deployments.
- [ ] C) Custom bash scripts in Cloud Build.

## Part 4: Governance & Human Gates
**9. What is the policy for deploying to the Production environment?**
- [ ] A) **Autonomous**: Fully automatic if all CI tests and staging checks pass.
- [x] B) **Human-Gated**: Requires explicit human approval (e.g., via Cloud Deploy UI or Agent Inbox) before production rollout.
- [ ] C) **Conditional**: Autonomous for standard updates, human-gated if IAM permissions, infrastructure, or costs change.

**10. How should the Notification Matrix be configured for the Agent ecosystem?**
- [ ] A) Ping developers via Slack/SMS for *every* agent action.
- [x] B) Use the standard `CLOUD.md` severity matrix (P0: Modal/SMS for critical stops, P1: Agent Inbox for PRs/Schema changes, P2/P3: Silent log to ledger for routine optimizations).

## Part 5: The Agent Ecosystem
*To safely operate the cloud environment, we will define specialized AI Agents. How should they be configured?*

**11. The Deployment & IaC Agent (CI/CD Operator):**
- [ ] A) **Monitored**: Can draft Terraform plans and create Pull Requests, but a human must `terraform apply`.
- [x] B) **Autonomous**: Trusted to plan and apply IaC changes for non-destructive operations (scaling, adding resources).

**12. The Security & Governance Agent:**
- [x] A) **Strict Enforcer**: Continuously scans for IAM drift; automatically reverts unauthorized manual changes and logs a P0 violation.
- [ ] B) **Passive Auditor**: Scans for violations and alerts humans via the Agent Inbox, but takes no action.

**13. The Monitoring & Auto-Fix Agent (SRE Agent):**
- [x] A) **Proactive Auto-Scaler/Rollback**: Monitors latency (e.g., Cloud Monitoring). Automatically scales up resources during spikes, or triggers an automatic rollback in Cloud Deploy if error rates spike after a deployment.
- [ ] B) **Advisory Only**: Detects anomalies and drafts an investigation report for a human on-call engineer.

**14. The Institutional Memory & Triage Agent (Human-in-the-Loop):**
- [x] A) **Active Historian**: After a human manually fixes an incident in production, the agent interviews the human or analyzes the console logs to automatically draft a "Resolution Receipt" and update the `CLOUD.md` constraints to prevent future occurrences.
- [ ] B) **Passive**: Relies solely on humans to manually update the `CLOUD.md` file after incidents.

## Part 6: Identity, IAM & Project Provisioning
**15. Google Cloud Project Provisioning:**
- [x] A) **Pre-existing**: The GCP project already exists. (called romans-click-count-123)
- [ ] B) **Agent-Provisioned**: The IaC Agent should create the GCP project from scratch within a specific Folder/Organizaion.

**16. Application Runtime Identity (Service Accounts):**
- [x] A) **Default**: Use the default Compute Engine service account for Cloud Run.
- [ ] B) **Least Privilege**: Create a dedicated runtime service account (e.g., `clickcount-runtime@...`) with only Cloud SQL Client and Secret Manager Access roles.

**17. CI/CD & Pipeline Identity:**
- [ ] A) **Unified Pipeline SA**: A single service account (`cicd-pipeline@...`) handles Cloud Build, Artifact Registry pushes, and Cloud Deploy rollouts.
- [x] B) **Separation of Duties**: Distinct service accounts for Cloud Build (pushing artifacts) and Cloud Deploy (acting as the deployer identity on Cloud Run).

**18. Autonomous Agent Identities & Roles:**
- [ ] A) **Single Agent SA**: All agents share one service account (`ai-agent@...`) with broad (e.g. Editor) permissions.
- [x] B) **Role-Specific Agent SAs**:
  - CI/CD Agent SA: Needs `roles/editor` to provision IaC.
  - Security Agent SA: Needs `roles/iam.securityAdmin` to monitor/revert IAM.
  - SRE Agent SA: Needs `roles/monitoring.editor` and `roles/run.admin` to scale services.

## Part 7: Additional Context & Requirements
**19. Is there a specific Folder or Organization under which the project lives?**
- [x] A) Yes, the project lives under the `romans-click-count` folder in the `romans-click-count` organization.
- [x] B) Yes, the project lives under the `romans-click-count-123` folder in the `romans-click-count-123` organization.
- [ ] C) No, the project is at the root level.

**20. Are there any specific cost control requirements or budgets to be aware of?**
- [x] A) Yes, the project has a monthly budget of $100.
- [ ] B) No specific cost control requirements at this time.

## Part 8: Advanced Security, Scale & Governance (Resolved via Defaults)
*Note: Since explicit answers were not provided upon approval, optimal defaults balancing the strict $100 budget with "very secure" and "mostly automated" requirements have been selected.*

**21. Network Ingress & WAF:**
- [x] B) Restricted ingress via Global HTTP(S) Load Balancer with Cloud Armor (WAF) enabled.

**22. Database Connectivity & Security:**
- [x] B) Private IP only, utilizing Cloud Run Direct VPC Egress (Best Practice for Security).

**23. Database Migrations Strategy:**
- [x] A) **Autonomous**: CI/CD pipeline automatically runs database migrations before Cloud Deploy rolls out the new image.

**24. Container Security & Supply Chain:**
- [x] A) **Strict**: Artifact Registry scanning must block deployments if Critical/High vulnerabilities are found.

**25. Cloud Run Scaling Constraints:**
- [x] A) **Strict Cap**: Max instances strictly capped (e.g., 5) to guarantee we stay under budget.

**26. Database High Availability & Backups:**
- [x] A) **Cost-Optimized**: Single-zone standard DB with daily automated backups (Fits the $100 budget).

**27. Secrets Management:**
- [x] B) Secrets are mounted as volumes at runtime using the Secret Manager integration (More secure).
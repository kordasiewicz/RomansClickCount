# CLOUD.md

Author: [Carl Sziebert](mailto:csziebert@google.com)  
Collaborators: [Roman Kordasiewicz](mailto:kordasiewicz@google.com)[Keith Guerin](mailto:keithguerin@google.com)[Summer Li](mailto:lisummer@google.com)[Katharine Norwood](mailto:kbnorwood@google.com)[Chairy Cheung](mailto:chairy@google.com)[Benjamin Shishko](mailto:shishko@google.com)[Sijie Wang](mailto:sijiewang@google.com)  
Status: Accepting Feedback  
Last update: Apr 17, 2026  
Self link: [go/cloud.md](http://go/cloud.md)

## Brief

While an `AGENT.md` explains what the project is and how to build the software, the `CLOUD.md` file defines how the software lives in the enterprise cloud. It acts as the institutional memory for a project, effectively serving as a resident “Cloud Specialist” embedded directly within the repository.

This specialist provides AI agents and human operators with a unified map of infrastructure, authorized capabilities, policies, governance boundaries, and cloud agent definitions (e.g. rules, workflows, skills). It also maintains a chronological record of all human and agent actions via a work ledger, ensuring that the "why" behind every infrastructure decision is never lost.

The `CLOUD.md` serves as a universal interface:

* **Local Agent Managers** (Claude/Antigravity): Uses a `CLOUD.md` and related rules, skills, and workflows to understand local project context and avoid hallucinating about infrastructure.  
* **Autonomous Cloud Tooling**: Uses the file to enforce global governance and [provide a cockpit view](https://docs.google.com/presentation/d/1YopyeBbVgHIXLkhrvoCRHxSqBYmttkTov6Sf5MHgd9k/edit?usp=sharing) for human supervisors. (e.g. [Agent Inbox](https://ai-native-vision-748891379978.us-central1.run.app/inbox), [AutoCloud](http://%20%20%20%20%20%20go/autocloud-prototype))  
* **Remote Agents**: Uses the file to understand the project context and their role in the project. 

### Related docs:

* [The spec is the new source?](https://docs.google.com/document/d/1v8elwZ_6iWeaQfF2edVtl3pXdcL529r5hteubB8OiQ4/edit?usp=sharing&resourcekey=0-7a1DaNHA9xBGmGvunOZQLQ)  
* [Autonomous Cloud Experience -- go/autonomous-cloud-experience](https://docs.google.com/document/d/1b15msgjJB-ZIYN-pWkDld0qKMzXJuDNNtPzgTFA50pU/edit?usp=sharing)  
* [Autonomous Cloud Vignettes](https://docs.google.com/document/d/1YzufCaofLPtkNpWBRAmmmzwYVU_txOn2oC89XyRulTA/edit?usp=sharing&resourcekey=0-uOBdfdBiiz2KXeEGr2IChg)  
* [Intent in the Autonomous Cloud](https://docs.google.com/document/d/1oQjIvIB7u7XWwtQGAimpCbh9MsonXiooXisANoXhIVM/edit?usp=sharing)  
* [Proposal: Github Repo for Agent Skills for using GCP (go/gcp-skills)](https://docs.google.com/document/d/1e-Zup8ufw0ersuVCvc-7i9m16pDiJPxO4QAtcEjY9CU/edit?tab=t.0)  
* [Governed Software Engineering (go/governed-swe)](https://docs.google.com/document/u/0/d/1EjOBLhYqQYIBYbz7a8NZbOZ1PYZQ7BUEHuZ2reZ-e3o/edit?resourcekey=0-RlMb3YI2GTy3pLuSQfwZ2g)  
* [Coding Agents on GCP](https://docs.google.com/presentation/u/0/d/1lDTkcbSf76XjQ1f-tbm0Bx8N4e2SGdtYdvXPMttwaRw/edit?resourcekey=0-gpmkaf5WpbjKMMQ8CWMdgA)

## The Opportunity: `CLOUD.md` as a Project Primitive

The power of the `CLOUD.md` specification lies in its potential for universal adoption. By embedding "Cloud Expertise" into the codebase, we solve for the cognitive gap between writing code and managing its cloud lifecycle.

### Universal Agent Context

We provide a rich context layer that acts like a senior cloud architect looking over the agent's shoulder by including a `CLOUD.md` in every project as a repository-level primitive.

* **Zero-Config Onboarding**: Agents no longer need to spend tokens "discovering" the environment; they read the manifest and are immediately ready to act within project boundaries.  
* **Agnostic Interoperability**: Works with any agent manager a developer chooses to use, whether it’s Claude Code, Antigravity, or a custom Gemini CLI extension.  
* **Skills Discovery**: Instead of a developer searching a global library of GCP skills, the `CLOUD.md` manifest lists the specific skills relevant to that repository. (More below)

### Standardizing the "Safe Launch"

This integration directly addresses the "Fear, Fatigue, and Friction" of the autonomous SDLC:

* **1-to-1 Project Binding:** `CLOUD.md` enforces a 1-to-1 mapping between a source code repository and its primary Google Cloud Project. (More below)  
  **The Guidelines and Guardrail Injection**: Security teams can inject mandatory organizational policies directly into the `CLOUD.md` of every project, ensuring that even ephemeral agents respect enterprise rules from the first command.  
* **The "Follow Me" Experience**: As a developer moves from one environment to another, the `.cloud` ledger travels with the repo, providing a seamless handoff where the agent's memory remains intact.

### Strategic Value: Capturing the "Intelligence Premium"

* **Solving the Verification Burden**: 97% of developers don't trust AI to touch production because it's a black box. Providing a visible, auditable `CLOUD.md` and `.cloud` ledger in every project bridges this trust gap.  
* **Market Differentiation**: We become the only cloud provider that treats "Institutional Memory" as a first-class citizen of the development environment, making GCP the safest cloud and most transparent for autonomous operations.  
* **Monetization**: This approach encourages the use of local and cloud agents that are paid for by the customer. It puts agent cost transparency/scalability/control in customer hands. 

## Core Components

The `CLOUD.md` must be both human-readable for developer onboarding and machine-parseable (via front-matter or structured blocks) for local agent managers (Claude, Antigravity) as well as remotely managed agents.

* **GCP Services Architecture**: Explicit list of Cloud resources the project relies on and how they are connected and why (e.g., specific GKE clusters, BigQuery datasets, Cloud Storage buckets).  
* **CI/CD Architecture:** Explicit definition of the inner and outer loops of the SDLC pipeline, including policies and human gates (e.g. push to branch X triggers in repo Y triggers Cloud Build, new images in repo Z are automatically deployed to cloud run)   
* **Skills**: Points to specific `.md` files that describe a capability (e.g., how to use `gcloud` for this specific project’s subnetting). This creates a plug-and-play architecture where you can grant an agent "BigQuery Expertise" just by adding a few lines to the manifest.   
* **MCP (Model Context Protocol)**: Provides the real-time bridge. If the agent needs to check a Jira ticket or a GCP quota, it uses the MCP server defined in `CLOUD.md` to get that live data in a standardized format.  
* **Project Ledger**: A chronological record of all human and agent actions, stored in the `.cloud` directory.

### The 1-to-1 Project Binding

To ensure security and eliminate ambiguity, `CLOUD.md` enforces a 1-to-1 mapping between a source code repository and its primary Google Cloud Project.

* **Single Point of Authority**: A `CLOUD.md` declares a unique `project_id`. This prevents agents from making unauthorized cross-project calls or hallucinating infrastructure that belongs to a different environment.  
* **IAM Synchronicity**: The permissions granted to an agent are bound by the `project_id` in the CLOUD.md. If the agent attempts a "Skill" that targets a resource outside this mapping, the execution is blocked at the primitive level and a ledger entry is created to ensure this doesn’t happen again.  
* **Environment Clarity**: For multi-project architectures (e.g., prod vs. staging), the mapping is potentially handled via branch-specific `CLOUD.md` files or directory-level scoping within monorepos, ensuring the agent always knows which environment it is currently inhabiting.

### Coexistence with other frameworks

* **Conductor**: The `.cloud/ledger` provides the reasoning and institutional memory about working with GCP that enriches Conductor’s execution tracks.  
* **GCP Skills**: `CLOUD.md` serves as the configuration file that tells specific Cloud Skills which resources they are authorized to touch. (More below)  
* **Gemini Enterprise**: It provides a structured, repo-level grounding file that reduces token waste and improves accuracy for the universal model.

## Skill Discovery & Utilization: The "Front Door" for GCP

One of the primary challenges for developers is knowing which automation tools (Skills) are available, safe, and relevant to their specific project. `CLOUD.md` solves this by acting as a contextual skill registry and resident-Cloud expert’s toolkit.

* **Human Discovery**: A developer opens `CLOUD.md` and sees a "Skills" section (e.g., db-migration-skill, cost-opt-skill). They instantly know what automation is available for this codebase.  
* **Agent Discovery**: When an agent initializes, it parses the skills: header. It doesn't have to guess which tools to use; the "allow-list" is explicitly defined.

### Trust-Based Execution

Developers can define the "Trust Level" for each skill directly in the manifest:

* **Autonomous**: The skill can run on its own (e.g., small documentation fixes).  
* **Monitored**: The agent must propose a PR for human review (e.g., IaC changes).  
* **Blocked**: Specific skills are explicitly disallowed in certain sensitive repositories.

## The "Institutional Memory" Layer

To prevent the "[Maya's search](https://docs.google.com/document/d/1YzufCaofLPtkNpWBRAmmmzwYVU_txOn2oC89XyRulTA/edit?resourcekey=0-uOBdfdBiiz2KXeEGr2IChg&tab=t.f6kfaxo8sjjh)" scenario (spending hours tracing undocumented legacy decisions), `CLOUD.md` includes a Context & Constraints section.

* **Guideline and Guardrails**: Every workaround, legacy dependency, or "load-bearing bug" is documented here. When an agent proposes a change that conflicts with this wisdom, it triggers a mandatory high-severity notification. (See section on the Work Ledger below)  
  * "The v1-legacy-bucket has a strict retention policy due to a 2022 legal hold. Do not attempt to refactor the lifecycle rules even if they seem inefficient."  
  * "The primary GKE cluster is over-provisioned specifically to handle the 4 AM spike from the APAC sync. Do not downscale during off-peak hours."  
* **Evolution**: Just as code evolves, this section is updated whenever a project milestone is reached or a complex incident is resolved, ensuring the agent's "understanding" of the environment matures alongside the repo.   
  * When an agent encounters an error or a unique edge case (e.g., Josh's 3 AM remediation), it doesn't just fix it; it proposes a new entry to this section to prevent the same "fire" for the next agent.  
* **Structure:**  As the system evolves the complex institutional memory is structured around subject areas and tasks.    
  * The agent that is responsible for triaging build errors also maintains a section that is its playbook  
  * The agent that is responsible for changing IaC maintains the GCP and CICD architecture sections. 

## The `.cloud` Directory: Synchronization with the Work Ledger

To maintain a single source of truth, `CLOUD.md` does not track real-time state. Following the pattern of tools like [Google Jules](https://docs.google.com/presentation/d/14rXeQjCZ7n5z4bFuoH1KZNBfRyCETPOV4FT3vJjQpBw/edit?slide=id.g3d66e3aa1b9_0_196#slide=id.g3d66e3aa1b9_0_196), each repository should contain a `.cloud` directory. This directory serves as the persistent "Flight Recorder" for the project's cloud lifecycle:

* It defines the desired state and guidelines.  
* It contains a pointer to the project ledger, which tracks every autonomous action, modification, and human intervention in chronological order.   
* Before performing an action, an agent reads `CLOUD.md` for rules and the Ledger for history.

Structure:

* `/.cloud/ledger/`: Contains chronological Markdown files (e.g., `2026-04-16-storage-upscale.md`) documenting every autonomous modification, reasoning chain, and human approval.  
* `/.cloud/context/`: Temporary storage for "pending wisdom"—agent-proposed updates to the core `CLOUD.md` based on new findings.  
* `/.cloud/sessions/`: Metadata about active agentic missions and their current state.

Benefits:

* **Traceability:** Every autonomous decision is traceable to the exact commit and policy that authorized it.  
* **Agent Onboarding:** New agents reading the repository gain immediate "historical context" by parsing the ledger, preventing redundant actions or repeat failures.

### Ledger Maintenance & Upkeep

The Autonomous Cloud tool acts as a background gardener for the .cloud directory, ensuring the ledger remains useful and doesn't devolve into "log noise."

* **Nightly Synthesis:** The tool periodically synthesizes individual ledger files into "Monthly Digests" or "Milestone Reports," archiving granular files to a cold-storage partition once they are summarized.  
* **Wisdom Promotion:** When the tool detects a pattern in the ledger (e.g., "This agent has scaled the GKE cluster 5 times this week (e.g. rules, workflows, skills)due to APAC sync"), it drafts an update to the memory section of `CLOUD.md`.  
* **Consistency Check:** Monthly audits to detect drift and compare the Ledger's documented actions against the actual GCP project state, flagging any manual human mutations that happened outside the autonomous loop.  
* **Knowledge Aging:** Irrelevant and ephemeral sessions (debugging attempts that led to no change) are purged after 90 days to maintain repo performance.

Example: Resolution Receipt (`/.cloud/ledger/2026-04-16-gke-scaling.md`)

```

# Resolution Receipt: GKE Node Pool Upscale
**Timestamp:** 2026-04-16T04:12:05Z
**Action ID:** `ACT-8829-QX`
**Status:** Executed (P2 Advisory)

## Intent
Address high latency alerts (350ms+) on `mero-frontend-pool` during unexpected APAC traffic surge.

## Reasoning (Chain of Thought)
1. Monitored `monitoring.googleapis.com` for `cpu_utilization`.
2. Found utilization at 88% across all 5 nodes.
3. Consulted `CLOUD.md`: Found constraint "Do not downscale during off-peak," but no constraint against proactive scaling.
4. Verified budget policy: Current monthly spend allows for an additional $40 burst.
5. Action: Scale `mero-frontend-pool` from 5 to 8 nodes.

## Tools Used
- `gcp-skills/gke-management.md`
- `mcp://gke-orchestrator-server`

## Outcome
Latency dropped to 110ms within 4 minutes. Scaling event recorded in Google Cloud Console LROs.
```

### The Notification Matrix (Severity & Triage)

Agents must proactively communicate, but they shouldn't create notification fatigue. We propose a standardized severity scale for agent-to-human interaction:

| Severity | UX Pattern | Trigger Condition | Agent Behavior |
| :---- | :---- | :---- | :---- |
| P0: Critical | Modal / SMS | Security breach, catastrophic cost spike, or unauthorized IAM drift. | STOP. Halt all related tasks. Wait for human signature. |
| P1: Verify | Agent Inbox | Schema changes, deployment to prod, or high-risk "Tribal Wisdom" violations. | PAUSE. Submit a PR/Plan. Wait for the "Proceed" signal. |
| P2: Advisory | Slack / Feed | Routine optimization, cost-saving scaling, or successful minor patches. | EXECUTE. Log to Ledger and send a summary. No wait. |
| P3: Info | Silent Log | Minor documentation updates or routine health checks. | LOG. No notification; available in the Ledger audit. |

### 


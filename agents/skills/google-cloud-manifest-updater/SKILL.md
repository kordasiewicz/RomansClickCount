---
name: google-cloud-manifest-updater
description: Active Context Miner. Reviews the .cloud/ ledger and automatically generates Git Changelists (PRs) proposing updates to the CLOUD.md manifest.
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

# Context Miner & Manifest Updater Mandate

You are the proactive Context Miner. Your job is to ensure that the project's institutional memory and governance policies continuously evolve by learning from recent incidents and actions, but you must do so safely via human-gated code reviews (CLs/PRs).

## 1. The Review Loop
When invoked, you must:
1. Scan and read the recent markdown files in `.cloud/sessions/` and `.cloud/ledger/`.
2. Look for:
   - Repeating errors or deployment failures.
   - Manual fixes applied by human operators.
   - Implicit constraints that agents used to succeed but aren't formally written down.

## 2. Wisdom Synthesis
If you identify a new systemic constraint or a necessary architecture shift:
1. Synthesize it into a clear, actionable rule (e.g., "Do not downscale instances below 2 during database backups").
2. Determine where it belongs in `CLOUD.md` (usually Section 7: Institutional Memory).

## 3. Safe CL (Pull Request) Creation
You **MUST NOT** push changes directly to the `main` branch. You must generate a Changelist (CL) for a human to review.
1. Check out a new Git branch: `git checkout -b propose-cloud-update-$(date +%s)`
2. Edit `CLOUD.md` and insert the new constraint.
3. Commit the change: `git commit -am "docs(governance): propose new systemic constraint based on recent sessions"`
4. Push the branch to the remote: `git push -u origin HEAD`
5. Attempt to create a Pull Request using the GitHub CLI: `gh pr create --title "Update CLOUD.md: New Governance Policy" --body "Synthesized new constraint from recent .cloud/ sessions."`
   - *Fallback:* If `gh` is not installed or authenticated, stop and instruct the human operator to open the PR from the branch you just pushed.

---
name: scopeseed
description: Project-level feature discovery and lifecycle orchestration over Spec Kit, using human-readable registries, evidence-first research, adaptive clarification, interactive decisions, and resumable status gates.
metadata:
  version: 2026.1.0-dev.4
  updated: 2026-10-01
---

# ScopeSeed

## Purpose

ScopeSeed turns an incomplete project idea into an ordered, researched feature registry and moves accepted features through specification, planning, and implementation with Spec Kit.

ScopeSeed is project-agnostic. Do not assume a language, framework, platform, product type, or agent stack unless the target repository establishes it.

Spec Kit remains the underlying feature specification/planning workflow. ScopeSeed adds project bootstrap, feature discovery, accepted/rejected feature memory, lifecycle ordering, interactive decision handling, and resumable project-level orchestration.

## Durable state

Prefer normal repository files over hidden conversational state. Default paths are:

```text
specs/PROJECT.md
specs/FEATURES.md
specs/REJECTED_FEATURES.md
.scopeseed/config.yaml
specs/<feature>/spec.md
```

Paths may be relocated by `.scopeseed/config.yaml`.

Accepted feature requirements and decisions belong in the owning Spec Kit `spec.md`. `FEATURES.md` is the lifecycle/index registry, not a duplicate requirements database. Rejected feature decisions belong in `REJECTED_FEATURES.md` with their reason.

## Source priority

When sources disagree, prefer in order:

1. explicit current user decisions;
2. current repository governance and accepted architecture decisions;
3. owning accepted Spec Kit feature specifications;
4. verified implementation/tests describing current behavior;
5. authoritative external documentation;
6. project research/proposal documents;
7. optional long-term memory/context;
8. model inference.

Never silently let lower-priority evidence override higher-priority decisions.

## Research before asking

Do not turn a researchable fact into a user decision. Inspect the repository and use authoritative external documentation when available. Optional specialist agents and tools may improve research, but ScopeSeed must still work without them.

Resolve ambiguous external identities before deep research. Never guess which similarly named product, project, protocol, or library the user means.

Read `references/research-and-disambiguation.md`.

## Interaction and dialogs

Read `.scopeseed/config.yaml` and apply the interaction defaults from `references/interaction.md` when the configuration does not specify them.

When the user is choosing among finite meaningful options and OpenCode's question tool is available, prefer an interactive dialog. Use normal chat text for genuinely open-ended input or when dialog UI is unavailable/disabled.

For feature discovery, the primary actions are **Accept**, **Reject**, and **Stop discovery**. `Stop discovery` ends the current discovery run without accepting or rejecting the candidate and without writing a registry entry for it.

After a dialog answer, `interaction.continue_after_dialog.<action>` decides whether the current ScopeSeed action continues automatically. This never authorizes a different action or bypasses safety boundaries.

Read `references/interaction.md` for the complete behavior.

## Project bootstrap

Action: `bootstrap`

If no ScopeSeed state exists:

1. ask what the user wants to build;
2. inspect existing repository material;
3. resolve ambiguous products/technologies;
4. perform broad domain research with available tools;
5. write a concise human-readable `PROJECT.md`;
6. initialize `FEATURES.md`, `REJECTED_FEATURES.md`, and `.scopeseed/config.yaml`;
7. derive project-appropriate feature categories;
8. start initial feature discovery.

Do not overwrite established project decisions when adopting ScopeSeed in an existing repository. Bootstrap never plans or implements features.

## Feature discovery

Action: `discover`

Read the project brief, accepted/rejected registries, existing specs, repository evidence, and authoritative external sources. Search broadly enough to find missing feature families, not merely variants.

Before presenting a candidate, check accepted overlap, rejected-feature memory, likely ownership, whether it is a real product capability rather than an implementation detail, and hard dependencies.

Use the discovery dialog behavior from `references/discovery.md`. On acceptance allocate the next stable `Fxxx` ID and keep the registry sorted. On rejection allocate the next stable `Rxxx` ID and record the reason/reconsideration condition. On **Stop discovery**, record neither.

## Manual feature addition

Action: `feat`

Treat remaining arguments as a feature the user intends to add. Check accepted overlap and previous rejection first. Derive a concise name, short description, fuller human-readable description, category, and genuine hard dependencies, then allocate the next stable feature ID and insert it in the registry.

Use a dialog when duplicate/overlap/reconsideration creates a bounded user choice. Do not create a full Spec Kit spec unless clarification is starting.

## Existing Spec Kit import

Action: `import-specs`

Treat the remaining argument as the existing Spec Kit specs directory, defaulting to `specs/` only when unambiguous. Preserve owning-spec boundaries and reconstruct accepted features without merging separate specs merely because they discuss related concepts.

File existence alone never proves lifecycle status. Use dialogs for bounded ownership/duplicate conflicts when useful. If status cannot be verified, leave its checkbox unchecked and report why.

## Default clarification workflow

Action: default (no explicit action) or explicit feature ID.

Select the next accepted `Gapless = [ ]` feature whose blocking dependencies are sufficiently resolved, unless a feature ID is supplied. Resolve or create its owning Spec Kit spec; never silently extend another feature merely because Spec Kit currently points there.

Then repeat:

1. research answerable gaps;
2. normalize established evidence into the owning spec;
3. identify the highest-impact unresolved user/product decision;
4. ask exactly one question, using a dialog for finite choices when appropriate;
5. immediately write the accepted decision into `spec.md`;
6. recompute coverage/dependencies and research newly exposed factual gaps;
7. continue according to interaction configuration until no material user-owned ambiguity remains;
8. run an independent completeness review intended to prove the spec incomplete or contradictory;
9. resolve researchable findings and return to a user question only for genuine user-owned decisions.

When verification passes, set `Gapless = [x]`. Moving automatically to the next feature additionally obeys `workflow.auto_continue_to_next_feature`.

The owning spec is the durable clarification state; do not require a second long-lived questionnaire file.

Read `references/clarification.md` and `references/lifecycle.md`.

## Verification

Action: `verify`

Audit the requested feature, or the single clearly active feature, independently. Check ownership, unresolved decisions, contradictions, research gaps, acceptance criteria, dependency assumptions, and applicable security/data/platform concerns.

Use dialogs for genuine bounded user decisions surfaced by verification. Never invent an answer to make verification pass. If the feature is not gapless, clear an incorrectly set `Gapless` checkbox.

## Planning

Action: `plan`

Select an explicit feature ID or the next eligible `Gapless = [x]`, `Planned = [ ]` feature. Verify first, then run the repository's canonical Spec Kit planning path:

```text
speckit.plan
→ speckit.checklist
→ evaluate/converge requirements-quality checklist
→ speckit.tasks
→ speckit.analyze
```

Research factual gaps. If a genuine product decision appears, ask it using a dialog when appropriate and obey `interaction.continue_after_dialog.plan`; never invent the decision. Set `Planned = [x]` only when the complete planning gate passes. Planning never starts implementation automatically.

## Implementation

Action: `implement`

Implementation requires explicit invocation. Select an explicit feature or the next eligible `Gapless = [x]`, `Planned = [x]`, `Implemented = [ ]` feature. Invoke canonical Spec Kit implementation and the repository's configured convergence/verification workflow.

Dialogs may be used for bounded implementation-time user choices or confirmations, but project safety/approval rules take precedence over auto-continuation. Set `Implemented = [x]` only after all configured gates pass. Do not silently implement another feature unless project configuration explicitly permits that behavior.

## Lifecycle and categories

The registry checkboxes are evidence claims:

- `Gapless` — specification is complete enough for planning and independently verified;
- `Planned` — planning/checklist/tasks/analyze gates passed;
- `Implemented` — implementation and configured convergence/verification gates passed.

Never infer status from filenames alone. Hard dependencies override visual category order.

Start from default category hints but adapt them to the project. Omit irrelevant categories, introduce clearer domain categories, and use subcategories only when they improve readability.

Read `references/registry.md` and `references/lifecycle.md`.

## Optional integrations

Repository explorers, external-documentation researchers, design reviewers, independent reviewers, long-term memory, GitHub tools, and project-specific MCPs are optional. Use them only when present. Missing optional integrations must not become hidden ScopeSeed requirements.

## Safety and mutations

Bootstrap, discovery, feature addition, clarification, verification, and planning must not commit, push, merge, switch branches, deploy, or bypass repository governance unless the user explicitly authorizes those separate actions.

Implementation may edit production files because the user explicitly invoked it, but still obeys repository permissions, confirmations, and safety rules.

Never copy secrets into specs, registries, examples, or reports.

## Completion reporting

At the end of an action report concisely:

- action performed;
- feature ID/name when applicable;
- durable files changed;
- lifecycle status affected;
- unresolved decision/research limitation;
- natural next `/scopeseed ...` command when the workflow stopped.

The repository files are the detailed record.

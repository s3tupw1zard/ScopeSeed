---
name: scopeseed
description: Project-level feature discovery and lifecycle orchestration over Spec Kit, using human-readable registries, evidence-first research, adaptive clarification, and resumable status gates.
metadata:
  version: 2026.1.0-dev.1
  updated: 2026-09-30
---

# ScopeSeed

## Purpose

ScopeSeed helps turn an incomplete project idea into an ordered, researched set of features and then moves those features through specification, planning, and implementation using Spec Kit.

ScopeSeed is project-agnostic. Do not assume a particular language, framework, platform, product type, or agent stack unless the target repository establishes it.

Spec Kit is the underlying specification/planning workflow. ScopeSeed adds project bootstrap, feature discovery, feature memory, lifecycle ordering, and a simpler resume model around it.

## Durable state

Prefer normal repository files over hidden conversational state.

Default paths:

```text
specs/PROJECT.md
specs/FEATURES.md
specs/REJECTED_FEATURES.md
.scopeseed/config.yaml
specs/<feature>/spec.md
```

The files may be relocated by `.scopeseed/config.yaml`.

Accepted feature decisions belong in the owning Spec Kit `spec.md`. `FEATURES.md` is the project index and lifecycle registry, not a duplicate requirements database.

Rejected feature decisions belong in `REJECTED_FEATURES.md` with their reason.

## Source priority

When sources disagree, do not silently combine them. Prefer, in order:

1. explicit current user decisions;
2. current repository governance and accepted architecture decisions;
3. owning accepted Spec Kit feature specifications;
4. verified implementation/tests describing current behavior;
5. authoritative external documentation for external facts;
6. project research/proposal documents;
7. optional long-term memory/context;
8. model inference.

Lower-priority evidence does not silently override a higher-priority decision.

## Research before asking

Do not turn a researchable fact into a user decision.

Inspect the repository first. Use official documentation and web research when available. Optional specialist agents may be used for repository discovery, external research, design review, or adversarial verification, but ScopeSeed must still work when they are unavailable.

When an important noun can refer to multiple products, projects, protocols, or libraries, resolve the identity before doing domain research. Present plausible candidates with distinguishing information and ask the user rather than guessing.

Read `references/research-and-disambiguation.md` for the full rule.

## Project bootstrap

Action: `bootstrap`

If no ScopeSeed state exists:

1. ask the user what they want to build;
2. inspect existing repository material if present;
3. identify ambiguous external products/technologies and resolve identity;
4. perform broad domain research with available tools;
5. write a concise human-readable `PROJECT.md`;
6. initialize `FEATURES.md`, `REJECTED_FEATURES.md`, and `.scopeseed/config.yaml` from the templates or equivalent structures;
7. derive project-appropriate feature categories;
8. start an initial discovery pass.

If state already exists, do not overwrite established decisions. Reconcile or ask before replacing durable project context.

Bootstrap must not automatically plan or implement features.

## Feature discovery

Action: `discover`

Read `PROJECT.md`, accepted features, rejected features, existing specs, repository evidence, and available authoritative external sources. Search broadly enough to identify missing feature families, not merely variants of features already present.

Before showing a candidate:

- check for accepted duplicates/overlap;
- check `REJECTED_FEATURES.md`;
- distinguish a feature from an implementation detail;
- identify likely dependencies;
- explain briefly why the candidate matters.

Ask the user to accept or reject one meaningful candidate at a time unless the user explicitly requests batch review.

On acceptance, allocate the next stable `Fxxx` ID, choose the appropriate category, add the feature to `FEATURES.md`, and keep the registry sorted.

On rejection, allocate the next stable `Rxxx` ID and write the feature, short description, reason, date, and useful reconsideration condition to `REJECTED_FEATURES.md`.

Do not repeatedly raise a rejected feature unless the user asks to reconsider it or new verified evidence directly changes the rejection rationale.

Read `references/discovery.md`.

## Manual feature addition

Action: `feat`

The remaining arguments describe a feature the user already intends to add.

Before adding it:

1. check accepted features for duplicates or overlap;
2. check rejected features and surface any prior rejection;
3. distinguish feature scope from an implementation detail;
4. derive a concise feature name, short description, human-readable description, category, and known hard dependencies;
5. assign the next stable feature ID;
6. insert it in the correct registry location.

Do not create a full Spec Kit spec unless clarification is being started.

## Existing Spec Kit import

Action: `import-specs`

The remaining argument is the directory containing existing Spec Kit specs, defaulting to `specs/` only when that path is unambiguous.

Inspect each owning spec and reconstruct accepted features. Preserve existing ownership. Do not merge two specs merely because they discuss related concepts.

Status is evidence-based:

- existence of `spec.md` does not prove `Gapless`;
- existence of `plan.md` does not prove `Planned`;
- implementation code does not prove `Implemented`.

If status cannot be verified, leave the corresponding checkbox unchecked and report why.

## Default clarification workflow

Action: default (no explicit action) or explicit feature ID.

Select the next accepted feature with `Gapless = [ ]` whose blocking dependencies are sufficiently resolved, unless a feature ID is supplied.

Resolve the owning Spec Kit spec. If no owning spec exists, follow the canonical Spec Kit specify workflow to create one. Never silently extend another feature's spec only because it is currently active in Spec Kit state.

Then run the adaptive clarification loop:

1. research answerable gaps;
2. normalize established evidence into the owning spec when appropriate;
3. identify the highest-impact unresolved user/product decision;
4. ask exactly one question;
5. after the user answers, write the accepted decision into the owning spec immediately;
6. recompute coverage and dependencies;
7. repeat until no material user-owned ambiguity remains;
8. run an independent completeness verification intended to prove the spec incomplete or contradictory;
9. research newly researchable findings;
10. return to the question loop only for genuine user-owned decisions.

When the verification gate passes, set `Gapless = [x]` in the registry. If configured to auto-continue, move to the next eligible feature in the same session. Stop whenever a user decision is required.

The owning spec is the durable clarification state. Do not require a second long-lived questionnaire file.

Read `references/clarification.md` and `references/lifecycle.md`.

## Verification

Action: `verify`

Audit the requested feature, or the single clearly active feature, independently of the previous clarification context.

Check registry ownership, unresolved decisions, contradictions, research gaps, acceptance criteria, dependency assumptions, security/data/platform concerns when applicable, and project-specific quality areas.

Do not invent a decision to make verification pass. If the feature is not gapless, clear an incorrectly set `Gapless` checkbox and explain the blocking finding.

## Planning

Action: `plan`

Select an explicit feature ID when provided; otherwise select the next eligible feature with:

```text
Gapless = [x]
Planned = [ ]
```

Verify the specification first. Then run the repository's canonical Spec Kit planning path:

```text
speckit.plan
→ speckit.checklist
→ evaluate/converge requirements-quality checklist
→ speckit.tasks
→ speckit.analyze
```

Research factual gaps. If a genuine user/product decision appears, stop planning, clear/leave `Planned`, and return the feature to clarification.

Set `Planned = [x]` only when the full configured planning gate passes.

Planning never automatically starts implementation.

## Implementation

Action: `implement`

This action exists only after the user explicitly invokes it.

Select an explicit feature ID when provided; otherwise select the next eligible feature with:

```text
Gapless = [x]
Planned = [x]
Implemented = [ ]
```

Invoke the canonical Spec Kit implementation workflow and then the repository's configured convergence/verification workflow. Respect repository-specific approval, test, design, migration, security, and deployment gates.

Set `Implemented = [x]` only after those gates pass. A partially implemented feature remains unchecked.

Do not automatically implement another feature unless the user explicitly enabled such continuation in project configuration and the repository's safety rules permit it.

## Lifecycle rules

The registry checkboxes are claims about verified project state:

- `Gapless` — specification complete enough for planning and independently verified;
- `Planned` — Spec Kit planning/checklist/tasks/analyze gates passed;
- `Implemented` — implementation and configured convergence/verification gates passed.

Never infer status from filenames alone.

Dependencies override visual ordering. Do not plan or implement a feature whose hard dependency is not ready for the required phase.

Read `references/registry.md` and `references/lifecycle.md`.

## Categories

Start with the default category ordering from the config template, but adapt it to the project. Omit irrelevant categories. Introduce project-specific domain categories when they are clearer than a generic bucket. Use subcategories only when they materially improve readability.

Do not move a feature between categories if doing so would obscure stable ownership or dependency information.

## Optional specialist integrations

When available, useful roles include:

- repository explorer for code/spec/test ownership;
- librarian/researcher for authoritative external facts;
- designer for user-facing flow, accessibility, and design-system evidence;
- oracle/reviewer for independent completeness and contradiction checks.

Optional tools may improve evidence quality but must not become hidden requirements for ScopeSeed core.

## Safety and mutations

Bootstrap, discovery, feature addition, clarification, verification, and planning must not commit, push, merge, switch branches, or deploy unless the user explicitly asks for those Git/deployment actions outside the normal ScopeSeed workflow.

Implementation may edit production files because the user explicitly invoked `implement`, but it still must obey repository permissions and safety rules.

Never copy secrets into specs, registries, examples, or reports.

## Completion reporting

At the end of each action, report:

- action performed;
- feature ID/name when applicable;
- durable files changed;
- lifecycle status affected;
- any unresolved user decision or research limitation;
- the natural next `/scopeseed ...` command.

Keep the report concise. The repository files are the detailed record.

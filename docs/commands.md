# Command reference

ScopeSeed keeps the everyday command surface small. Commands should infer ordinary state from the repository and ask only when inference would be unsafe.

## `/scopeseed bootstrap`

Initializes ScopeSeed for a project.

When no project state exists, it asks what you want to build, researches the domain, resolves material identity ambiguity, writes the project brief, initializes the accepted/rejected feature registries, derives useful categories, and begins an initial discovery pass.

Use this for a new project or when adopting ScopeSeed before any feature registry exists.

## `/scopeseed discover`

Researches additional feature candidates.

Discovery reads `PROJECT.md`, the accepted registry, rejected features, existing specs, repository evidence, and available authoritative external sources. It must check accepted and rejected features before presenting a candidate.

A candidate is not accepted merely because ScopeSeed recommends it. User acceptance adds it to `FEATURES.md`; rejection records it in `REJECTED_FEATURES.md` with the reason.

## `/scopeseed feat <description>`

Adds a feature you already know you want.

Example:

```text
/scopeseed feat OAuth2 authentication
```

Before adding the feature, ScopeSeed checks for duplicate/overlapping accepted features and previous rejections. It assigns a stable feature ID, chooses the most appropriate project category, writes a short description and longer description, identifies known dependencies, and keeps the registry sorted.

## `/scopeseed import-specs <path>`

Builds or extends the feature registry from an existing Spec Kit specification directory.

Example:

```text
/scopeseed import-specs specs/
```

The importer should preserve existing feature ownership and avoid merging separate specs only because they mention the same concept. It may identify suspected duplicates or unclear ownership, but those are review findings rather than silent rewrites.

## `/scopeseed`

Runs the default feature-clarification loop.

ScopeSeed selects the next accepted feature with `Gapless = [ ]` whose blocking dependencies are ready. It resolves or creates the owning Spec Kit spec, researches answerable facts, and asks exactly one highest-value unresolved product decision.

After each answer it updates the owning spec immediately and recomputes remaining ambiguity. When independent verification passes, it checks `Gapless` and may continue to the next eligible feature in the same session.

A feature ID can be supplied to target one feature explicitly:

```text
/scopeseed F012
```

## `/scopeseed verify [feature-id]`

Runs an independent audit of a feature's specification and reconciles its lifecycle status with evidence. It does not invent answers to make a status pass.

This is useful after manual edits, imports, or major dependency changes.

## `/scopeseed plan [feature-id]`

Plans the next eligible gapless feature, or an explicitly requested feature.

The normal pipeline is:

```text
verify specification
→ speckit.plan
→ speckit.checklist
→ evaluate the requirements-quality checklist
→ speckit.tasks
→ speckit.analyze
```

If a genuine product decision is discovered, planning stops and returns the feature to clarification. A successful complete planning gate checks `Planned`.

## `/scopeseed implement [feature-id]`

Implements the next eligible planned feature, or an explicitly requested one.

Implementation is never entered automatically from bootstrap, discovery, clarification, or planning. It requires this explicit command. ScopeSeed invokes the canonical Spec Kit implementation workflow and then the repository's convergence/verification gate. Only a successful completion checks `Implemented`.

## Resume behavior

No dedicated `continue` command is required for the normal workflow. Re-run `/scopeseed`, `/scopeseed plan`, or `/scopeseed implement`. ScopeSeed reconstructs progress from the registries and Spec Kit artifacts.

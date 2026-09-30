# Feature registry

`specs/FEATURES.md` is the human-readable project index for accepted features. It is not a replacement for individual Spec Kit specs; it tells people and agents what features exist, how they relate, and how far each one has progressed.

## Table shape

Each category uses the same columns:

| Gapless | Planned | Implemented | ID | Feature | Short description | Description | Depends on | Spec |
|---|---|---|---|---|---|---|---|---|

### Status columns

**Gapless** means the owning feature specification has no material unresolved product ambiguity for its current scope, researchable gaps have been addressed or explicitly bounded, and an independent specification verification passed.

**Planned** means the configured Spec Kit planning path completed successfully: plan, requirements-quality checklist, tasks, and cross-artifact analysis agree well enough to hand the feature to implementation.

**Implemented** means implementation and the configured convergence/verification gate completed successfully.

File existence alone never proves one of these states.

## Stable IDs

Accepted features use stable IDs such as `F001`, `F002`, and `F003`. An ID does not change when a feature is renamed or moved to a different category.

Rejected features use their own IDs such as `R001`. Rejected IDs are never reused for accepted features.

## Categories

ScopeSeed starts from a broad ordering template and adapts it to the project. Categories that do not make sense for a project should not be created merely to satisfy a template.

The default conceptual order is:

1. Foundation & Architecture
2. Authentication & Identity
3. Authorization & Permissions
4. Data & Persistence
5. Integrations & Protocols
6. Core Product Features
7. Navigation & Application Shell
8. Realtime & Background Work
9. Content & Media
10. Files & Transfers
11. Search & Discovery
12. Administration
13. UI & UX
14. Accessibility
15. Platform & Compatibility
16. Security & Privacy
17. Observability & Diagnostics
18. Migration & Compatibility
19. Operations & Release

A project should replace broad buckets with clearer domain categories when that makes the registry easier to understand. For example, a server-management app may have `Panel Management`, `Console & Realtime`, `Backups`, and `Networking` instead of putting every domain feature under `Core Product Features`.

Large categories may contain subheadings. Do not create deep category trees without a real readability benefit.

## Ordering

Within a project, dependency order has priority over visual category order. A feature that depends on another unfinished feature should not be selected for planning or implementation merely because it appears earlier in the file.

Within a category, prefer:

1. foundational behavior;
2. primary user workflows;
3. supporting workflows;
4. optional/advanced behavior.

## Dependencies

`Depends on` contains stable feature IDs. Keep dependencies limited to relationships that actually block specification, planning, or implementation. Do not turn every related feature into a hard dependency.

## Owning specs

Each accepted feature should have one owning Spec Kit `spec.md` once clarification begins. Related specs may be evidence or dependencies, but ScopeSeed must not silently move ownership between them.

If ownership is ambiguous, ask before modifying multiple specs.

## Rejected features

`REJECTED_FEATURES.md` exists to stop discovery from repeatedly suggesting the same declined idea. A rejected feature includes the reason and, when useful, a `Reconsider when` condition.

A rejection can be revisited when the user explicitly asks or when new verified evidence directly undermines the original reason. ScopeSeed should surface the old decision and reason before changing it.

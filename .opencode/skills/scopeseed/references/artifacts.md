# ScopeSeed artifact shapes

These are the minimum durable structures ScopeSeed should create when the distribution templates are not available inside the target repository.

## `specs/PROJECT.md`

Keep a human-readable project brief with:

- project name;
- one-sentence goal;
- what the project is;
- intended users;
- primary outcomes;
- important constraints;
- explicit non-goals;
- resolved external product/technology identities;
- a small table of authoritative sources;
- project-level decisions that affect multiple features.

Do not copy feature-local requirements into the project brief.

## `specs/FEATURES.md`

Begin with a title and a short explanation of the three lifecycle states. Group accepted features by meaningful categories.

Every category table uses:

```markdown
| Gapless | Planned | Implemented | ID | Feature | Short description | Description | Depends on | Spec |
|---|---|---|---|---|---|---|---|---|
```

The `Spec` value may be `—` until clarification creates an owning spec.

## `specs/REJECTED_FEATURES.md`

Use:

```markdown
| ID | Category | Feature | Short description | Rejection reason | Rejected on | Reconsider when |
|---|---|---|---|---|---|---|
```

Preserve old rejection rows if a decision is later superseded; annotate the historical decision rather than deleting it.

## `.scopeseed/config.yaml`

Minimum configuration:

```yaml
version: 1
paths:
  project: specs/PROJECT.md
  features: specs/FEATURES.md
  rejected_features: specs/REJECTED_FEATURES.md
  specs: specs
feature_ids:
  accepted_prefix: F
  rejected_prefix: R
  width: 3
workflow:
  clarification: adaptive-single-question
  auto_continue_to_next_feature: true
  planning_requires_gapless: true
  implementation_requires_planned: true
```

Category ordering may be added under `categories`. If absent, derive project-appropriate categories from the default order documented in the registry reference.

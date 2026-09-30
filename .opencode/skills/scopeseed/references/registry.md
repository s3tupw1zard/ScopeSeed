# Registry rules

`FEATURES.md` is the accepted project index. `REJECTED_FEATURES.md` is durable negative scope memory.

## Accepted feature rows

Required columns:

```text
Gapless | Planned | Implemented | ID | Feature | Short description | Description | Depends on | Spec
```

Keep prose readable. `Short description` should fit comfortably in a table cell. `Description` may be longer but should still summarize scope rather than reproduce the feature spec.

## Stable identifiers

Accepted IDs use the configured prefix/width, default `F001`.

Rejected IDs use a separate sequence, default `R001`.

Never renumber existing IDs to make the table prettier.

## Spec field

Before clarification begins, `Spec` may be `—`.

Once an owning Spec Kit spec exists, write its repository-relative path. One feature should have one owning spec for its accepted scope. Related specs are dependencies/evidence, not co-owners unless the repository explicitly defines another model.

## Dependencies

Use accepted feature IDs. Record hard workflow dependencies, not every conceptual relationship.

A hard dependency means the downstream feature cannot be responsibly specified, planned, or implemented for the relevant phase without the upstream result.

## Category sorting

Use configured priorities as defaults. Adapt categories to project language. Preserve coherent domain groupings.

Within categories, order by foundation → primary workflow → supporting workflow → advanced/optional behavior unless dependency order requires otherwise.

## Manual edits

Humans may edit the registries. ScopeSeed should validate rather than overwrite manual changes. If a manual change conflicts with an owning spec or lifecycle evidence, report the mismatch and ask or repair only when the intended source of truth is clear.

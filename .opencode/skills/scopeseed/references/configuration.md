# Configuration reconciliation

ScopeSeed treats `.scopeseed/config.yaml` as durable project configuration, but plugin updates may introduce new optional or defaulted keys over time. Existing projects should not require users to rebuild the file by hand.

## Preflight

Before every ScopeSeed action, inspect `.scopeseed/config.yaml` before doing action-specific work.

- If the file is missing during `bootstrap`, create it from the current bundled canonical template.
- If the file is missing for another action but ScopeSeed project state already exists, create the current canonical config and report that it was restored.
- If the file exists, reconcile it against the current bundled canonical template before continuing.

The OpenCode package plugin bundles the canonical template with the command prompt. Project-local/fallback installations use `templates/scopeseed.config.yaml` from the installed ScopeSeed version when available.

## Additive migration only

Automatic reconciliation is intentionally conservative.

1. Parse the existing YAML. If it is invalid, do not rewrite it; report the parse problem and stop config mutation.
2. Recursively add mapping keys that exist in the canonical template but are missing from the project config.
3. Preserve every existing scalar value exactly. Do not reset user choices to current defaults.
4. Preserve existing sequences/lists as a whole. Do not append new default list entries automatically; this is especially important for project-specific `categories`.
5. Preserve unknown/custom keys. Never delete configuration merely because the current ScopeSeed version does not recognize it.
6. If a canonical mapping collides with an existing value of an incompatible type, do not guess. Surface the conflict using a dialog when practical, otherwise report it in text.
7. After a successful migration from an older schema, update the top-level `version` to the current canonical config schema version.
8. If the project config declares a schema version newer than the bundled canonical version, do not modify it. Report that ScopeSeed should be updated before editing the config.

This is a missing-key merge, not a formatter or a rewrite. Preserve comments and ordering where the available editing tools allow it; avoid unrelated formatting churn.

## Automatic synchronization

The canonical config contains:

```yaml
maintenance:
  auto_sync_config: true
```

For older configs where this key does not yet exist, treat it as `true` so they can receive the missing-key migration that introduces it.

When `maintenance.auto_sync_config` is `false`, normal ScopeSeed actions only report missing/outdated config keys and continue when safe; they do not mutate the config automatically.

An explicit `/scopeseed config-sync` invocation requests reconciliation regardless of that automatic setting. It still follows all conservative merge rules above.

## Reporting

Do not produce noisy config output on every command. Mention configuration only when:

- keys were added or the schema version changed;
- a missing config was restored;
- automatic sync is disabled and drift exists;
- invalid YAML, a type conflict, or a newer schema blocks safe reconciliation; or
- the user explicitly invoked `config-sync`.

Config reconciliation never commits, pushes, merges, or changes branches.

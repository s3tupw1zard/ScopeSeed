# Configuration

ScopeSeed stores project-specific settings in `.scopeseed/config.yaml`.

You can edit this file by hand. ScopeSeed also keeps older configs compatible with newer plugin versions by adding newly introduced keys when it can do so safely.

## Automatic updates

At the start of every ScopeSeed command, the current config is compared with the canonical config bundled with the installed ScopeSeed version.

The update is intentionally conservative:

- missing mapping keys are added;
- your existing values are kept;
- custom/unknown keys are kept;
- existing lists are kept as-is instead of being merged with defaults;
- project-specific categories are therefore not replaced or padded with generic categories;
- invalid YAML is never rewritten automatically;
- incompatible type changes are reported instead of guessed;
- a config from a newer schema version is not modified by an older ScopeSeed installation.

After a successful schema migration, ScopeSeed updates the top-level `version` field.

For example, a project created before dialog or related-feature settings existed can start with:

```yaml
version: 1

workflow:
  auto_continue_to_next_feature: true
```

After updating ScopeSeed, the missing current settings can be inserted while the project's existing workflow value remains unchanged.

## Related-feature review

Current configs include:

```yaml
workflow:
  review_related_features: true
```

When enabled, every feature newly accepted through `/scopeseed discover` or `/scopeseed feat` gets a short boundary/decomposition review. ScopeSeed distinguishes:

- requirements that belong inside that feature's own future/current spec;
- independent related capabilities that deserve their own feature entry;
- already-covered or rejected concerns;
- implementation details that should not become feature rows.

Only independent product capabilities are proposed as related features.

For discovery, related candidates use the normal `Accept` / `Reject` / `Stop discovery` dialog. For a manual `/scopeseed feat`, they use `Accept` / `Reject` / `Stop related review`.

Automatic continuation is still controlled by the command-specific settings under `interaction.continue_after_dialog`. Disable the review entirely with:

```yaml
workflow:
  review_related_features: false
```

## Disable automatic writes

The current config schema contains:

```yaml
maintenance:
  auto_sync_config: true
```

Set it to `false` if you want normal ScopeSeed commands to report config drift without modifying the file automatically:

```yaml
maintenance:
  auto_sync_config: false
```

Older configs that do not contain this key are treated as if it were `true`, allowing ScopeSeed to add the newly introduced configuration fields once.

## Force a synchronization

Run:

```text
/scopeseed config-sync
```

or the shorter alias:

```text
/scopeseed config
```

This explicitly requests a missing-key/schema reconciliation even when automatic synchronization is disabled.

It does not discover features, change specs, plan work, implement code, or perform Git operations.

## Current schema

A newly bootstrapped project starts from the current canonical template shipped with ScopeSeed. The template includes paths, feature-ID formatting, interaction/dialog settings, workflow gates, related-feature review, maintenance settings, and default category ordering hints.

The category list is a starting point, not a mandatory taxonomy. Once a project has its own category list, automatic config migration treats that list as user-owned and does not append future generic defaults to it.

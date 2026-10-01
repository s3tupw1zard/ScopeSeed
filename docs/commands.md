# Command reference

ScopeSeed keeps the everyday command surface small. Commands should infer ordinary state from the repository and ask only when inference would be unsafe. Finite choices use OpenCode dialogs when available and enabled; see [Dialogs and automatic continuation](interactions.md).

## `/scopeseed bootstrap`

Initializes ScopeSeed for a project.

When no project state exists, it asks what you want to build, researches the domain, resolves material identity ambiguity, writes the project brief, initializes the accepted/rejected feature registries, derives useful categories, and begins an initial discovery pass.

If a product/project name is ambiguous, ScopeSeed prefers a selection dialog with the plausible identities rather than asking you to type the exact name again.

## `/scopeseed discover`

Researches additional feature candidates.

Discovery reads `PROJECT.md`, accepted features, rejected features, existing specs, repository evidence, and authoritative external sources. Each candidate is checked for overlap and previous rejection before it is shown.

When dialogs are enabled, a candidate offers **Accept**, **Reject**, and **Stop discovery**. Stop ends this discovery run without recording the current candidate as accepted or rejected. By default, Accept or Reject immediately continues to the next candidate, so a long discovery pass can be reviewed without re-running the command after every choice.

## `/scopeseed feat <description>`

Adds a feature you already know you want.

```text
/scopeseed feat OAuth2 authentication
```

ScopeSeed checks duplicate/overlapping accepted features and previous rejections, then assigns a stable feature ID, category, descriptions, dependencies, and registry position. If an overlap or previous rejection creates a real bounded choice, ScopeSeed may use a dialog.

## `/scopeseed import-specs <path>`

Builds or extends the feature registry from an existing Spec Kit specification directory.

```text
/scopeseed import-specs specs/
```

Existing ownership is preserved. Ambiguous ownership/duplicate conflicts may use dialogs; file existence alone never proves lifecycle status.

## `/scopeseed`

Runs the default adaptive feature-clarification loop.

ScopeSeed selects the next accepted feature with `Gapless = [ ]` whose blocking dependencies are ready. It resolves or creates the owning Spec Kit spec, researches answerable facts, and asks exactly one highest-value unresolved product decision at a time.

Finite choices use dialogs when possible. After each answer ScopeSeed updates the owning spec immediately and recomputes remaining ambiguity. With the default `clarify: true` continuation setting, the next clarification can appear without another command. When independent verification passes, ScopeSeed checks `Gapless`.

Target one feature explicitly with:

```text
/scopeseed F012
```

## `/scopeseed verify [feature-id]`

Runs an independent specification audit and reconciles lifecycle status with evidence. Genuine finite user decisions surfaced by the audit may use dialogs. Verification never invents answers to make a status pass.

## `/scopeseed plan [feature-id]`

Plans the next eligible gapless feature, or an explicit feature. The normal pipeline is:

```text
verify specification
→ speckit.plan
→ speckit.checklist
→ evaluate the requirements-quality checklist
→ speckit.tasks
→ speckit.analyze
```

If a genuine product decision appears, ScopeSeed can ask it interactively. Whether planning resumes after that answer is controlled by `interaction.continue_after_dialog.plan`; the default is `false`. Planning never starts implementation.

## `/scopeseed implement [feature-id]`

Implements the next eligible planned feature, or an explicit feature. Implementation is never entered automatically from bootstrap, discovery, clarification, or planning. It requires this explicit command.

Implementation-time dialogs may be used for bounded choices or confirmations, but repository safety rules take precedence. The default `continue_after_dialog.implement` is `false`.

## Resume behavior

A dedicated `continue` command is normally unnecessary. Re-run the relevant command after a stopped workflow. ScopeSeed reconstructs progress from registries and Spec Kit artifacts.

## Per-command continuation settings

`.scopeseed/config.yaml` may control whether each action continues immediately after a dialog answer:

```yaml
interaction:
  continue_after_dialog:
    bootstrap: true
    discover: true
    feat: true
    import_specs: true
    clarify: true
    verify: true
    plan: false
    implement: false
```

These settings resume only the action the user already invoked. They do not silently cross into another lifecycle phase.

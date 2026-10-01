# Getting started

ScopeSeed helps when you know what kind of project you want, but you do not yet have a complete feature map or a fully clarified specification.

## 1. Install the prerequisites

Install Spec Kit in the target repository, then install the ScopeSeed OpenCode plugin:

```bash
opencode plugin add github:s3tupw1zard/ScopeSeed
```

Optional OMO-Slim, long-term memory, GitHub, web research, and project-specific MCP integrations can improve research but are not required.

## 2. Bootstrap a new project

Run:

```text
/scopeseed bootstrap
```

If ScopeSeed cannot find project state, it asks what you want to build. A sentence is enough, for example:

```text
I want to build a cross-platform music player that works well with a local library.
```

ScopeSeed inspects the repository and researches the domain. When a name could refer to multiple products or technologies, it prefers an OpenCode selection dialog so you can choose the intended one before research continues.

Bootstrap creates or updates:

```text
specs/PROJECT.md
specs/FEATURES.md
specs/REJECTED_FEATURES.md
.scopeseed/config.yaml
```

and starts an initial discovery pass.

## 3. Review feature candidates

Discovery proposes relevant features; it does not silently add them. In OpenCode, each candidate normally presents three actions:

- **Accept** — add it to `FEATURES.md`.
- **Reject** — record it in `REJECTED_FEATURES.md` with the reason.
- **Stop discovery** — stop reviewing candidates without accepting or rejecting the current one.

By default, ScopeSeed continues directly to another candidate after Accept or Reject. You can therefore review many missing features without repeatedly typing `/scopeseed discover`.

Run discovery later at any time with:

```text
/scopeseed discover
```

Or add a known feature directly:

```text
/scopeseed feat OAuth2 authentication
```

## 4. Clarify accepted features

Run:

```text
/scopeseed
```

ScopeSeed chooses the next eligible feature, creates/resolves its owning Spec Kit spec, researches answerable gaps, and asks one unresolved product decision at a time. Finite choices use dialogs when available; open-ended choices remain normal text.

Each accepted answer is written into the owning `spec.md` immediately. With the default continuation setting, ScopeSeed then recomputes the remaining gaps and can present the next question without another command.

When no material ambiguity remains and independent verification passes, ScopeSeed checks **Gapless** for that feature.

## 5. Plan features

After one or more features are gapless:

```text
/scopeseed plan
```

ScopeSeed selects an eligible feature and runs the Spec Kit planning path. A successful full gate checks **Planned**. Planning never automatically starts implementation.

## 6. Implement features

Implementation is always explicit:

```text
/scopeseed implement
```

ScopeSeed invokes canonical Spec Kit implementation and configured convergence/verification. Only successful completion checks **Implemented**.

## Existing Spec Kit projects

Adopt existing specs with:

```text
/scopeseed import-specs specs/
```

ScopeSeed reconstructs registry entries without assuming lifecycle completion merely because artifacts exist.

## Configure dialogs and continuation

The generated `.scopeseed/config.yaml` contains an `interaction` block. The most useful setting for large feature discovery runs is:

```yaml
interaction:
  continue_after_dialog:
    discover: true
```

Set it to `false` if you want ScopeSeed to stop after each candidate decision. You can independently configure bootstrap, feature addition, imports, clarification, verification, planning, and implementation.

Older projects without this block automatically use current defaults, so you do not have to regenerate their ScopeSeed state after updating the plugin.

See [Dialogs and automatic continuation](interactions.md) and [Commands](commands.md) for details.

# Getting started

ScopeSeed helps when you know what kind of project you want, but you do not yet have a complete feature map or a fully clarified specification.

## 1. Install the prerequisites

The current reference integration runs inside OpenCode and expects Spec Kit to already be installed in the target repository.

Copy these ScopeSeed files into the target repository:

```text
.opencode/commands/scopeseed*.md
.opencode/skills/scopeseed/
```

The files under `examples/opencode/` are optional examples, not required configuration.

## 2. Bootstrap a new project

Run:

```text
/scopeseed bootstrap
```

If ScopeSeed cannot find an existing project brief or feature registry, it asks what you want to build. Answer naturally. A sentence is enough.

Example:

```text
I want to build a cross-platform music player that works well with a local library.
```

ScopeSeed then inspects the repository, identifies important terms, and researches the domain when research tools are available. If a name could refer to multiple products or technologies, it asks you to choose before continuing. It should never resolve meaningful identity ambiguity by guessing.

Bootstrap creates or updates:

```text
specs/PROJECT.md
specs/FEATURES.md
specs/REJECTED_FEATURES.md
.scopeseed/config.yaml
```

It then performs an initial feature-discovery pass.

## 3. Review feature candidates

Discovery proposes features because they appear relevant to the project; it does not silently add every plausible idea.

For each meaningful candidate you can accept or reject it. Accepted features go into `specs/FEATURES.md`. Rejected features go into `specs/REJECTED_FEATURES.md` together with the reason, so later research does not keep suggesting the same idea without new evidence.

You can run another discovery pass at any time:

```text
/scopeseed discover
```

If you already know a feature you want, add it directly:

```text
/scopeseed feat OAuth2 authentication
```

ScopeSeed still checks for duplicates, overlap, and a previous rejection before adding it.

## 4. Clarify the accepted features

Run:

```text
/scopeseed
```

ScopeSeed chooses the next eligible feature from `FEATURES.md`, respecting dependencies and category ordering. It creates or resolves the owning Spec Kit spec, researches answerable gaps, and asks one unresolved product decision at a time.

You answer in the chat. ScopeSeed writes the accepted answer into the owning `spec.md` immediately, recomputes the remaining gaps, and asks the next meaningful question.

When the feature has no material ambiguity left and an independent verification passes, ScopeSeed checks **Gapless** for that feature.

If the session ends, run `/scopeseed` again. The repository files are the state; you do not need the old chat transcript to continue.

## 5. Plan features

After one or more features are gapless:

```text
/scopeseed plan
```

ScopeSeed selects an eligible unplanned feature and runs the Spec Kit planning path, including the requirements-quality and cross-artifact gates configured by ScopeSeed. A successful run checks **Planned**.

Planning does not automatically start implementation.

## 6. Implement features

Implementation is always an explicit step:

```text
/scopeseed implement
```

ScopeSeed selects an eligible planned feature, invokes the canonical Spec Kit implementation workflow, and runs the configured convergence/verification gate. Only a successful implementation marks **Implemented**.

## Existing Spec Kit projects

If a repository already has feature specs, import them instead of rebuilding the registry manually:

```text
/scopeseed import-specs specs/
```

The import reads the existing specs and creates registry entries. It does not assume that a spec is gapless just because the file exists, or that a feature is planned merely because `plan.md` exists. Status must be supported by the corresponding workflow evidence.

## Optional integrations

ScopeSeed can use specialist agents, long-term context, GitHub, web research, and project-specific MCP servers when they are present. Nothing in the core registry format depends on them.

See [Commands](commands.md) for the complete command behavior.

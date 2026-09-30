# ScopeSeed

ScopeSeed turns a rough project idea into a researched, organized set of features that can be specified, planned, and implemented with Spec Kit.

You do **not** need to know every feature up front. ScopeSeed can start from a sentence such as:

> I want to build a mobile app for managing Pelican Panel servers.

It researches the project and its surrounding ecosystem, asks when an important term is ambiguous, proposes useful features, remembers rejected ideas, and keeps accepted work in a durable feature registry. From there it works through the project one feature at a time.

> **Status:** early development. The workflow and file formats are intentionally readable and conservative so they can evolve without hiding project decisions in tool-specific state.

## What ScopeSeed is for

ScopeSeed sits above [Spec Kit](https://github.com/github/spec-kit). Spec Kit remains responsible for feature specifications, planning, tasks, analysis, and implementation workflows. ScopeSeed adds the project-level layer around it:

- bootstrap a project from a rough idea;
- research unfamiliar or ambiguous domains before making assumptions;
- discover likely features instead of requiring a complete roadmap from the user;
- group and order features by project-appropriate categories;
- remember accepted **and rejected** features;
- clarify one meaningful product decision at a time;
- keep `spec.md` as the durable source of truth for a feature;
- track whether each feature is **Gapless**, **Planned**, and **Implemented**;
- resume work from repository state instead of relying on one chat session;
- orchestrate the normal Spec Kit planning and implementation path.

ScopeSeed is intended to be project-agnostic. A Flutter app, CLI, web service, game plugin, music player, infrastructure tool, or another software project should be able to use the same workflow.

## Requirements

### Required

- **Spec Kit** in the target project.
- **OpenCode** for the current command/skill integration shipped in this repository.

### Optional

ScopeSeed can take advantage of additional tools when they are available, but they are not required:

- OMO-Slim or another subagent/orchestration setup;
- web search and documentation tools;
- GitHub tooling;
- OpenViking or another long-term context source;
- project-specific MCP servers.

The core workflow must still work without those optional integrations. When research cannot be performed with the tools available, ScopeSeed should say so rather than inventing an answer.

## Quick start

Copy the ScopeSeed OpenCode command and skill files into a project that already has Spec Kit installed:

```text
.opencode/commands/scopeseed*.md
.opencode/skills/scopeseed/
```

Then start with:

```text
/scopeseed bootstrap
```

If no ScopeSeed project state exists yet, OpenCode asks what you want to build. A short answer is enough. ScopeSeed researches the domain, resolves important ambiguity with you, creates the project overview and feature registries, and starts feature discovery.

After bootstrap, the normal workflow is deliberately small:

```text
/scopeseed discover                 # research additional feature candidates
/scopeseed feat <feature>           # add a feature you already know you want
/scopeseed                           # clarify accepted features one by one
/scopeseed plan                      # plan gapless features
/scopeseed implement                 # implement planned features
```

For an existing Spec Kit project:

```text
/scopeseed import-specs specs/
```

ScopeSeed derives a feature registry from the existing specs without treating file existence alone as proof that a feature is complete.

See [Getting started](docs/getting-started.md) and the [command reference](docs/commands.md) for the detailed flow.

## Project files

ScopeSeed keeps the important state in normal Markdown files that people can read and edit:

```text
specs/
├── PROJECT.md
├── FEATURES.md
├── REJECTED_FEATURES.md
├── 001-example-feature/
│   └── spec.md
└── ...
```

### `specs/PROJECT.md`

A concise, researched description of what the project is, who it is for, its important constraints, and the authoritative sources ScopeSeed identified.

### `specs/FEATURES.md`

The accepted feature registry. Features are grouped by category and contain stable IDs, descriptions, dependencies, owning specs, and three lifecycle checkboxes:

| Gapless | Planned | Implemented | ID | Feature | Short description | Description | Depends on | Spec |
|---|---|---|---|---|---|---|---|---|
| [x] | [ ] | [ ] | F001 | Example | One-line summary | Human-readable feature description. | — | `specs/001-example/spec.md` |

- **Gapless**: the feature specification has no material unresolved ambiguity and has passed independent verification.
- **Planned**: the Spec Kit planning, requirements checklist, tasks, and analysis gates are complete.
- **Implemented**: implementation and the configured convergence/verification gate are complete.

A checkbox is a durable project status, not a guess based only on whether a file exists.

### `specs/REJECTED_FEATURES.md`

A memory of features the project deliberately decided not to include. Each rejection records why it was rejected and, when useful, what would justify reconsidering it. Discovery checks this file before proposing ideas so the same rejected feature is not repeatedly brought back without new evidence.

## Feature discovery

`/scopeseed discover` is for the common case where you know roughly what you want to build but do not yet know the complete feature set.

ScopeSeed combines the current project brief, repository state, accepted and rejected features, existing specs, official documentation, and available external research. It should distinguish similarly named products instead of guessing. For example, if a project name could refer to multiple unrelated products, ScopeSeed first presents the plausible identities and asks which one is meant.

Feature candidates are evaluated against existing decisions before being shown. Accepted candidates are inserted into `FEATURES.md` in the appropriate category. Rejected candidates are recorded in `REJECTED_FEATURES.md` with the reason.

## Feature ordering and categories

ScopeSeed has a general category ordering template, but it adapts the actual registry to the project. Authentication features should stay together, UI concerns should stay together, server-management features should stay together, and so on. Large categories may gain project-specific subcategories rather than forcing every project into one fixed taxonomy.

Dependencies take precedence over cosmetic ordering. A feature should not be specified, planned, or implemented ahead of a foundation it materially depends on.

See [Feature registry](docs/feature-registry.md) for the ordering and status rules.

## Clarification model

The default ScopeSeed specification loop does **not** generate a large questionnaire for you to edit later.

Instead it:

1. researches anything that can be established from evidence;
2. writes established facts into the owning Spec Kit spec;
3. asks exactly one high-impact unresolved user decision;
4. writes the accepted answer into `spec.md` immediately;
5. recomputes what is still ambiguous;
6. repeats until an independent completeness review finds no blocking gap.

This keeps the spec as the single durable source of truth and makes interrupted sessions easy to resume.

## Examples

The [`examples/opencode`](examples/opencode/) directory contains optional OpenCode and OMO-Slim configuration examples. They show one useful setup; they are **not** mandatory ScopeSeed dependencies.

## Design principles

ScopeSeed follows a few rules that are intentionally boring:

- **Research before asking.** Do not make the user decide documented facts.
- **Ask rather than guess.** Ambiguous product identity or ownership is a human gate.
- **One durable truth.** Accepted feature decisions live in the owning Spec Kit spec.
- **Remember “no”.** Rejected ideas are project knowledge too.
- **Readable by people.** Registries, project context, and documentation are normal Markdown first.
- **Do not silently broaden scope.** Discovery proposes; the user accepts or rejects.
- **Verification is evidence-based.** A checkbox is set only after the corresponding gate actually passed.
- **Optional integrations stay optional.** ScopeSeed may become more capable with extra tools, but must not require them unless the project explicitly chooses to.

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening substantial changes. The project is intentionally early, so proposals that simplify the workflow or make project state easier for humans to understand are especially useful.

## License

ScopeSeed is licensed under the **GNU General Public License v2.0 only (`GPL-2.0-only`)**. See [LICENSE](LICENSE).

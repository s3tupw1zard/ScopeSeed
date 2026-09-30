# Contributing to ScopeSeed

Thanks for considering a contribution.

ScopeSeed is intentionally small at the surface: a human should be able to understand the project workflow without reading agent prompts. Contributions should preserve that property.

## Before you start

For a small fix, open a pull request directly. For a substantial workflow or file-format change, open an issue first so the behavior can be discussed before multiple documents and prompts need to change.

Useful questions for a proposal are:

- What user problem does this solve?
- Does it add durable project state? If so, why is that state necessary?
- Can a human understand and edit the resulting files?
- Does the change keep Spec Kit as the underlying specification/planning workflow?
- Does it make an optional integration accidentally mandatory?

## Development rules

- Keep ScopeSeed project-agnostic. Product-specific behavior belongs in examples or target-project configuration.
- Researchable facts should not become user questions.
- Ambiguous product identity, feature ownership, or irreversible scope choices must not be guessed.
- Accepted decisions belong in durable project artifacts; temporary chat state is not a source of truth.
- Rejected features must retain their rejection reason.
- Status checkboxes must represent verified gates, not file existence.
- Human-facing Markdown should explain concepts in ordinary language before introducing internal terminology.

## Pull requests

Please keep pull requests focused. Include:

1. what changed;
2. why it changed;
3. which commands/workflows are affected;
4. any migration needed for existing `FEATURES.md`, `REJECTED_FEATURES.md`, or ScopeSeed config files.

When changing a command, also update the relevant human documentation under `docs/`.

## Licensing

By contributing, you agree that your contribution is licensed under the repository's GNU General Public License v2.0 only (`GPL-2.0-only`).

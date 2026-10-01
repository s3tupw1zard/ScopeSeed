# Interactive decisions and continuation

ScopeSeed should use OpenCode's interactive question UI whenever the user is choosing from a finite, meaningful set of options and the question tool is available. Dialogs are a usability layer; durable decisions still belong in repository artifacts.

## Dialog policy

Read `.scopeseed/config.yaml` when present. If the `interaction` block is absent, use these defaults:

```yaml
interaction:
  dialogs: prefer
  allow_custom_answers: true
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

`dialogs` supports:

- `prefer` — use the OpenCode question/dialog tool for finite choices when available; fall back to normal chat text when it is unavailable.
- `text` — do not request dialog UI; ask in normal chat text.

Do not fail a workflow only because dialog UI is unavailable.

## When to use a dialog

Use a dialog when it improves a real choice, including:

- disambiguating similarly named products, libraries, protocols, or repositories;
- accepting or rejecting discovered feature candidates;
- choosing among plausible owning specs/features;
- reconsidering a previously rejected feature;
- selecting among concrete clarification options;
- resolving import conflicts or other bounded choices;
- confirming a user-owned choice surfaced by verification or planning.

Do not force an open-ended request into artificial multiple choice. Project descriptions, rejection reasons, naming ideas, and other genuinely free-form input may remain normal text questions.

For clarification choices, keep custom answers available unless the choice is intentionally closed by a verified external constraint. A recommendation may be shown in an option description, but it is never an answer on the user's behalf.

## Discovery dialog

Present each feature candidate with exactly these primary actions:

- **Accept** — add the candidate to `FEATURES.md` with the next stable accepted ID.
- **Reject** — record it in `REJECTED_FEATURES.md`; obtain a short rejection reason when one cannot be derived safely from an explicit existing decision.
- **Stop discovery** — end the current discovery run without accepting or rejecting the current candidate and without writing it to either registry.

`Stop discovery` is not a rejection or deferral record. Because no durable decision is recorded, the same candidate may legitimately appear in a later discovery run.

If custom answers are enabled, interpret them explicitly instead of guessing whether they mean accept or reject. For example, “accept but split this into two features” requires applying that instruction, not silently pressing Accept.

## Continue-after-dialog

`interaction.continue_after_dialog.<action>` controls whether ScopeSeed resumes the currently invoked action immediately after applying the user's dialog answer.

- `true` — apply the answer, update durable state, recompute the workflow, and continue without requiring another `/scopeseed ...` command.
- `false` — apply the answer, report the resulting state and natural next command, then stop.

This setting does not authorize a different action. In particular:

- `discover: true` may continue to the next candidate, but may not start feature clarification or planning;
- `clarify: true` may ask the next clarification question for the current feature; moving to another feature additionally obeys `workflow.auto_continue_to_next_feature`;
- `plan: true` may resume the current planning action after a resolved dialog, but may not begin implementation;
- `implement: true` may resume the explicitly invoked implementation action, but may not silently implement another feature unless separate project configuration explicitly permits it.

Always stop immediately when the user selects a stop/pause action, when a safety boundary requires new explicit authorization, or when the workflow reaches its normal completion gate.

## Question-tool shape

When using OpenCode's question tool, use one concise question at a time with a short header, clear option labels, and useful descriptions. The OpenCode v2 question model supports option labels/descriptions, single or multiple selection, and optional custom answers.

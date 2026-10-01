# Feature discovery

Discovery answers: “What important product capabilities might this project still need?”

It does not answer implementation questions and it does not automatically expand project scope.

## Inputs

Use, when available:

- `specs/PROJECT.md`;
- `specs/FEATURES.md`;
- `specs/REJECTED_FEATURES.md`;
- existing Spec Kit specs and planning artifacts;
- repository implementation/tests;
- official external documentation;
- useful comparable products or community evidence;
- explicit current user goals.

## Candidate quality

A useful candidate is a coherent product capability that can eventually own a Spec Kit feature spec. Avoid presenting:

- a library choice as a product feature;
- a tiny UI control as a standalone feature without real lifecycle/behavior;
- a duplicate phrased differently;
- a feature already implied and fully owned by an accepted feature;
- generic best-practice filler with no connection to the project goal.

## Candidate presentation

Present one meaningful candidate at a time by default. Include:

```text
Candidate F? — <name>
Category: <category>
Short description: <one sentence>
Why it may belong: <brief evidence-based reason>
Likely dependencies: <IDs or none>
```

Then, when dialog UI is available and enabled, use the question tool with these primary options:

- **Accept** — add the feature to the accepted registry.
- **Reject** — reject it and record the reason.
- **Stop discovery** — stop this discovery run without recording a decision about this candidate.

If dialog UI is unavailable or disabled, present the same three choices in normal chat text.

If recommending acceptance, state why. The recommendation is not acceptance.

## Acceptance

On acceptance:

- allocate the next stable accepted ID;
- add the row to the appropriate category;
- write both short and fuller descriptions;
- record only genuine hard dependencies;
- leave lifecycle boxes unchecked;
- do not create a detailed spec unless clarification starts now.

If `interaction.continue_after_dialog.discover` is true, immediately research/recompute and present the next meaningful candidate. Do not require the user to invoke `/scopeseed discover` again between candidates.

## Rejection

On rejection:

- allocate the next stable rejected ID;
- record category, name, short description, rejection reason, date, and useful reconsideration condition;
- do not keep presenting equivalent candidates under new names.

When the rejection reason is not safely implied by an explicit existing project decision, ask for a short reason. This may be free-form. After the reason is recorded, continue to the next candidate when discovery auto-continuation is enabled.

## Stop discovery

When the user chooses **Stop discovery**:

- do not allocate an accepted or rejected ID;
- do not add the current candidate to either registry;
- do not treat the choice as a rejection or durable deferral;
- stop the current discovery action immediately and report that discovery was paused.

The unrecorded candidate may appear again in a future discovery run.

## Reconsideration

A rejected feature may be raised again only when:

- the user explicitly asks to revisit it; or
- new verified evidence directly weakens the recorded rejection reason.

Always surface the previous rejection before changing the decision. Use a dialog for the reconsider/keep-rejected choice when available and enabled.

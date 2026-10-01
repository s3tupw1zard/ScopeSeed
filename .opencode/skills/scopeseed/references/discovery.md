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

## Feature-boundary and related-feature review

When `workflow.review_related_features` is enabled, every newly accepted feature — whether it came from `/scopeseed discover` or `/scopeseed feat` — gets a short decomposition/neighborhood review before the action finishes or returns to broad discovery.

The purpose is to find independent product capabilities that are easy to hide inside a broad feature name without turning implementation details into fake features.

For the accepted feature, inspect the project brief, accepted/rejected registries, relevant specs/research, repository evidence, and authoritative external documentation when useful. Classify adjacent concerns into exactly one of these buckets:

1. **Owned requirement** — behavior that belongs inside the accepted feature's future/current `spec.md`.
2. **Independent related feature** — a coherent product capability that can sensibly own its own spec and lifecycle.
3. **Already covered** — duplicate/overlap with an accepted or rejected feature.
4. **Implementation detail** — protocol/library/internal mechanism that does not deserve a product feature row by itself.

Only bucket 2 becomes a new candidate.

Useful signals that something is an independent related feature include one or more of:

- it delivers user value independently of the parent feature;
- it can reasonably be specified, planned, implemented, permissioned, or released independently;
- it has materially distinct actors, permissions, data, destructive behavior, offline/error states, or UX;
- other accepted features depend on it directly;
- removing it would still leave the parent feature coherent.

Do **not** split merely because an implementation has separate classes, endpoints, transports, widgets, background jobs, or libraries. For example, websocket reconnect logic may remain an owned requirement of a realtime-console feature, while server power controls may deserve their own feature if they have independent permissions, confirmations, and flows.

Before presenting a related candidate, run the normal duplicate/rejection/dependency checks. Related-review recursion must converge: do not repeatedly revisit the same covered concern under new wording.

### Related candidates after `/scopeseed discover`

Use the normal discovery dialog:

- **Accept** — add the related feature and review its own boundary if enabled.
- **Reject** — record the rejection normally.
- **Stop discovery** — stop the entire current discovery run without recording the pending related candidate.

When `interaction.continue_after_dialog.discover` is true, continue through related candidates first, then return to broader discovery once no meaningful related candidates remain.

### Related candidates after `/scopeseed feat`

The manually requested base feature is already accepted. For each independent related candidate, offer:

- **Accept** — add the related feature and continue its boundary review when enabled.
- **Reject** — record the related candidate as rejected with the normal reason rules.
- **Stop related review** — keep the base feature, leave the pending related candidate unrecorded, and finish the current `feat` action.

`Stop related review` is not a rejection. The candidate may appear again in a future discovery pass.

When `interaction.continue_after_dialog.feat` is true, keep presenting meaningful related candidates until none remain or the user stops the related review.

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
- do not create a detailed spec unless clarification starts now;
- when enabled, run the feature-boundary/related-feature review before considering the accepted feature fully processed for the current action.

If `interaction.continue_after_dialog.discover` is true, immediately research/recompute and present the next meaningful candidate after related-feature review completes. Do not require the user to invoke `/scopeseed discover` again between candidates.

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

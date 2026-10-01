# Dialogs and automatic continuation

ScopeSeed can use OpenCode's question UI for choices that are easier to answer with buttons than by typing a reply. The feature is optional: if the UI is unavailable, ScopeSeed falls back to an ordinary chat question.

## Feature discovery

During `/scopeseed discover`, each candidate offers three primary choices:

- **Accept** adds the candidate to `specs/FEATURES.md`.
- **Reject** records it in `specs/REJECTED_FEATURES.md` together with the rejection reason.
- **Stop discovery** ends the current discovery run without accepting or rejecting that candidate.

Stopping discovery deliberately leaves no record for the current candidate, so it may be proposed again in a later discovery run. This is useful when you simply want to stop reviewing ideas for now rather than make a product decision.

With the default configuration, discovery continues immediately after you accept or reject a candidate. This makes it practical to review a long list of missing features without repeatedly typing `/scopeseed discover`.

## Other dialogs

ScopeSeed also prefers dialogs for finite choices such as:

- choosing between similarly named external projects during bootstrap;
- selecting an owning feature/spec when ownership is genuinely ambiguous;
- reconsidering a previously rejected feature;
- choosing among concrete feature-clarification options;
- resolving bounded import conflicts;
- answering a user-owned choice surfaced by verification or planning.

Open-ended input stays open-ended. ScopeSeed should not turn “What should this product do?” or “Why do you reject this?” into fake multiple-choice questions.

## Configuration

The settings live in `.scopeseed/config.yaml`:

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

`dialogs: prefer` uses the OpenCode question UI when it is available. Set it to `text` if you prefer normal chat prompts.

`continue_after_dialog` controls the currently invoked action. For example:

```yaml
interaction:
  continue_after_dialog:
    discover: false
```

means ScopeSeed applies your Accept/Reject choice and then stops, so you explicitly run `/scopeseed discover` for another candidate.

Setting it to `true` means the current action resumes immediately after your answer. It never authorizes a different phase: discovery cannot start planning, and planning cannot start implementation.

Projects created by older ScopeSeed versions may not contain an `interaction` block. Missing interaction keys use the current defaults above, so updating the plugin is enough to get the new behavior. Add the block only when you want project-specific overrides.

## Clarification loops

For the default `/scopeseed` clarification flow, `clarify: true` means an answer is written into the owning `spec.md`, ScopeSeed recomputes the remaining gaps, and the next useful question can appear immediately. This preserves the one-question-at-a-time model without requiring another command between decisions.

Automatic movement from one completed feature to a different feature remains controlled separately by `workflow.auto_continue_to_next_feature`.

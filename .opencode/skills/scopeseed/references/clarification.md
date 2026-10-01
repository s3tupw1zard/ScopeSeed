# Adaptive clarification

ScopeSeed uses one-question-at-a-time clarification because later questions should depend on earlier answers.

## Before asking

For the current feature:

1. read the owning spec and project brief;
2. read hard dependency specs relevant to the question;
3. inspect repository evidence;
4. research factual/API/platform questions;
5. classify remaining uncertainty.

Only a genuine user/product choice should become a clarification question.

## One question

Ask exactly one highest-impact unresolved decision at a time.

A good question includes:

- the decision to make;
- why it matters;
- relevant constraints already established;
- concise options when useful;
- a recommended default only when evidence supports one;
- freedom to provide a custom answer.

When the decision has a finite set of useful options and dialog UI is available/enabled, use the OpenCode question tool rather than asking the user to type an option label manually. Keep custom answers enabled unless verified constraints make the choice genuinely closed.

Do not force a false multiple choice when a short free-form answer is clearer.

## After the answer

Immediately:

1. normalize the decision into the owning `spec.md`;
2. remove or update stale ambiguity markers;
3. recompute feature coverage;
4. research any newly exposed factual gap;
5. choose the next unresolved decision.

If `interaction.continue_after_dialog.clarify` is true, continue this loop in the same invocation after a dialog answer. If it is false, apply the answer and stop with the next command. Moving automatically to another feature after this feature becomes gapless additionally obeys `workflow.auto_continue_to_next_feature`.

The chat transcript is not the durable decision store.

## Coverage

Apply project-appropriate coverage rather than one universal checklist. Consider at least, when relevant:

- goals, actors, workflows, non-goals;
- identity, ownership, persistence, concurrency;
- permissions, security, privacy, destructive behavior;
- integrations, external APIs, compatibility, errors/retries;
- offline/degraded behavior;
- user-visible states and accessibility;
- platform differences;
- migration/upgrade behavior;
- observability/supportability;
- testable acceptance criteria.

Do not invent requirements just to fill categories that are not applicable.

## Completion

Before setting `Gapless`, use a fresh review context when possible and actively search for contradictions, hidden assumptions, research gaps, and unasked user decisions.

A gap may be closed by verified evidence, explicit user choice, justified deferral, or a clear not-applicable finding. “Unknown” is not enough for a blocking area.

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

Present one meaningful candidate at a time by default:

```text
Candidate F? — <name>
Category: <category>

Short description: <one sentence>
Why it may belong: <brief evidence-based reason>
Likely dependencies: <IDs or none>

Accept or reject?
```

If recommending acceptance, state why. The recommendation is not acceptance.

## Acceptance

On acceptance:

- allocate the next stable accepted ID;
- add the row to the appropriate category;
- write both short and fuller descriptions;
- record only genuine hard dependencies;
- leave lifecycle boxes unchecked;
- do not create a detailed spec unless clarification starts now.

## Rejection

On rejection:

- allocate the next stable rejected ID;
- record category, name, short description, rejection reason, date, and useful reconsideration condition;
- do not keep presenting equivalent candidates under new names.

When the user says only “no” and the reason is not obvious from established project constraints, ask for a short reason because the reason is what makes rejection memory useful.

## Reconsideration

A rejected feature may be raised again only when:

- the user explicitly asks to revisit it; or
- new verified evidence directly weakens the recorded rejection reason.

Always surface the previous rejection before changing the decision.

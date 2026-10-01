# Research and disambiguation

ScopeSeed should research facts before turning uncertainty into product questions.

## Resolve identity first

Before deep research, identify the external thing the user actually means. A project, product, protocol, library, company, game, framework, or service name may be ambiguous.

When multiple plausible identities remain after a quick evidence check:

1. present the small set of plausible candidates with distinguishing information such as official website, repository, vendor, or purpose;
2. when dialog UI is available/enabled, use the OpenCode question tool so the user can select the intended identity;
3. otherwise ask the same bounded choice in normal chat text;
4. do not continue domain research until the identity is resolved.

Do not guess based on popularity or search-result ordering.

## Evidence priority

Prefer primary/official documentation for factual behavior. Repository code/tests may be authoritative for the project's current behavior. Community sources can supply useful experience or candidate ideas but should not silently override official facts or accepted project decisions.

Record only the amount of provenance needed to make durable project decisions understandable. ScopeSeed is not intended to turn every spec into a bibliography.

## Research before asking

Researchable examples include:

- whether an external API supports an operation;
- protocol/authentication behavior;
- platform limitations;
- current repository ownership and implementation state;
- existing Spec Kit decisions;
- whether a proposed feature duplicates existing scope.

User-owned examples include:

- whether the product should include an optional capability;
- preferred behavior where multiple valid product choices remain;
- acceptable destructive/recovery behavior when evidence does not dictate it;
- scope boundaries and product priorities.

Use interactive dialogs for finite user-owned choices when useful. Keep genuinely open-ended product input as normal free-form questions.

## Research limitations

If the necessary research tool or source is unavailable, say so. Do not manufacture a fact to avoid blocking. Decide whether the missing fact can be deferred safely; otherwise surface the limitation as a blocker.

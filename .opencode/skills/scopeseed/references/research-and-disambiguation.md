# Research and disambiguation

ScopeSeed should reduce user questions by researching facts, but research must begin from the correct subject.

## Resolve identity first

Names are often ambiguous. A project name, library name, protocol acronym, or product name may refer to unrelated things.

Before deep research, ask whether the identity is sufficiently established by one or more of:

- an authoritative URL supplied by the user;
- a repository already referenced by the target project;
- package/module coordinates;
- vendor/organization name;
- unambiguous context in existing accepted project artifacts.

If not, search for plausible candidates and present the smallest useful distinction. Do not hide uncertainty behind a confident guess.

Example pattern:

```text
I found two unrelated projects matching “Pelican”:

A — <project A>, <authoritative URL>, short distinguishing description
B — <project B>, <authoritative URL>, short distinguishing description

Which one is the target of this project?
```

Once resolved, record the exact identity and source in `specs/PROJECT.md` so the same ambiguity does not recur.

## Research depth

Bootstrap and discovery should research broadly enough to understand:

- what the product/domain is;
- primary actors and workflows;
- external APIs/protocols/platform constraints;
- security and identity boundaries;
- common feature families;
- important compatibility concerns;
- comparable products or established patterns when they materially reveal missing scope.

Feature clarification should research narrowly around the current feature rather than repeating project-wide research.

## Source quality

Prefer official documentation, canonical repositories, standards, and direct implementation evidence. Community discussions can reveal usability problems or edge cases, but should not override authoritative protocol facts.

Record durable sources only when they materially explain project identity, constraints, or a decision. Do not turn `PROJECT.md` into a bibliography dump.

## Research limitations

If web or documentation access is unavailable, say which facts could not be verified. Do not convert every missing fact into a product preference question. Some gaps should remain explicitly research-blocked until evidence is available.

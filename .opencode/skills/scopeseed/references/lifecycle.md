# Lifecycle gates

ScopeSeed tracks three deliberately coarse states in the feature registry.

## Gapless

Set `Gapless = [x]` only when:

- the owning feature spec is identified;
- no material user/product decision remains unresolved for the current scope;
- researchable blocking facts were researched or explicitly bounded;
- important contradictions are resolved;
- acceptance criteria are usable;
- hard dependency assumptions are represented;
- an independent specification review passed.

If later evidence invalidates the spec, clear the checkbox until the gap is resolved.

## Planned

Set `Planned = [x]` only when:

- `Gapless = [x]`;
- the current spec still passes verification;
- Spec Kit planning completed;
- requirements-quality checklist findings are resolved;
- task decomposition completed;
- cross-artifact analysis has no unresolved blocking finding.

If the spec materially changes after planning, re-evaluate and clear `Planned` when the existing plan no longer represents the feature.

## Implemented

Set `Implemented = [x]` only when:

- `Planned = [x]`;
- the implementation work for the accepted scope is complete;
- required repository tests/checks pass;
- required migration/security/design checks pass when applicable;
- the configured convergence/verification step passes.

A partial implementation remains unchecked. Describe partial work in the normal Spec Kit/task artifacts rather than inventing fractional registry states.

## Dependency gates

A downstream feature may be clarified while a dependency is not implemented when the dependency's specification is stable enough to make that safe. Planning and implementation should use stricter dependency readiness appropriate to the project.

Do not encode every relationship as a hard dependency merely to force sequence.

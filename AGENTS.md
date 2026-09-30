# ScopeSeed repository guidance

This repository contains the reusable ScopeSeed workflow, not the specification for a particular product.

## Priorities

1. Keep human-facing documentation readable without requiring knowledge of agent internals.
2. Keep Spec Kit as the required underlying specification/planning workflow.
3. Keep OMO-Slim, OpenViking, MCP servers, GitHub tooling, and other integrations optional.
4. Keep the feature registry and rejected-feature memory understandable and editable by people.
5. Do not silently change lifecycle semantics (`Gapless`, `Planned`, `Implemented`).

## Changes

When a command or skill behavior changes, check whether `README.md`, `docs/commands.md`, `docs/feature-registry.md`, templates, and examples also need to change.

Do not make product-specific assumptions part of ScopeSeed core. Put target-specific examples under `examples/`.

Do not commit secrets, generated credentials, private project data, or copied third-party content without a compatible license.

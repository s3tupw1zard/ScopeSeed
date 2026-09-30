# OpenCode examples

These files show one way to run ScopeSeed with OpenCode and optional OMO-Slim agents.

They are examples, not required configuration. Do not replace an existing project's OpenCode configuration blindly; merge only the settings you actually want.

## Minimal setup

ScopeSeed itself needs the project-local command and skill:

```text
.opencode/commands/scopeseed.md
.opencode/skills/scopeseed/
```

The `opencode.jsonc` example demonstrates conservative permissions that allow reading, editing, questions, and research while keeping risky shell/Git operations behind confirmation.

## OMO-Slim

`oh-my-opencode-slim.jsonc` demonstrates optional specialist routing:

- Orchestrator owns durable ScopeSeed/Spec Kit writes.
- Explorer inspects repository facts.
- Librarian researches external documentation.
- Oracle performs independent completeness review.
- Designer can help when a feature has meaningful user-facing UX.

ScopeSeed must continue to work when OMO-Slim is not installed; the main agent simply performs those roles sequentially.

## MCPs and models

The example intentionally does not assume project-specific MCP servers or a particular model. Add those in the target repository based on its own needs.

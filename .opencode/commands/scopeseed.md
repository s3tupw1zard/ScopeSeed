---
description: Bootstrap, discover, clarify, verify, plan, or implement a ScopeSeed feature workflow over Spec Kit.
agent: orchestrator
subagent: false
---

## User input

```text
$ARGUMENTS
```

Load the project-local `scopeseed` skill and treat this command as the single public ScopeSeed entry point.

Parse the first argument as an action when it matches one of these values:

- `bootstrap`
- `discover`
- `feat`
- `import-specs`
- `verify`
- `plan`
- `implement`

If none of those actions is present, operate in the default **clarify** mode. A remaining argument such as `F012` targets that feature explicitly; otherwise select the next eligible feature from the registry.

Examples:

```text
/scopeseed bootstrap
/scopeseed discover
/scopeseed feat OAuth2 authentication
/scopeseed import-specs specs/
/scopeseed
/scopeseed F012
/scopeseed verify F012
/scopeseed plan
/scopeseed plan F012
/scopeseed implement F012
```

Follow the action rules, durable-state rules, safety boundaries, and completion gates defined by the ScopeSeed skill. Do not invent missing project facts merely to keep the workflow moving.

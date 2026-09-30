---
description: Bootstrap, discover, clarify, verify, plan, or implement a ScopeSeed feature workflow over Spec Kit.
---

## User input

```text
$ARGUMENTS
```

Load the project-local `scopeseed` skill and treat this command as the single public ScopeSeed entry point.

Parse the first argument as an action when it matches one of these values or aliases:

- `bootstrap`
- `discover`
- `feat` or `feature`
- `import-specs` or `spec`
- `verify`
- `plan`
- `implement`

Normalize aliases before continuing:

- `feature` -> `feat`
- `spec` -> `import-specs`

If none of those actions is present, operate in the default **clarify** mode. A remaining argument such as `F012` targets that feature explicitly; otherwise select the next eligible feature from the registry.

Examples:

```text
/scopeseed bootstrap
/scopeseed discover
/scopeseed feat OAuth2 authentication
/scopeseed feature OAuth2 authentication
/scopeseed import-specs specs/
/scopeseed spec specs/
/scopeseed
/scopeseed F012
/scopeseed verify F012
/scopeseed plan
/scopeseed plan F012
/scopeseed implement F012
```

Do not require OMO-Slim or a named orchestrator agent. If optional specialist agents are available, the ScopeSeed skill may use them; otherwise perform the same work in the current agent context.

Follow the action rules, durable-state rules, safety boundaries, and completion gates defined by the ScopeSeed skill. Do not invent missing project facts merely to keep the workflow moving.

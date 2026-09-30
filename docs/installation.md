# Installation

The current ScopeSeed distribution is an OpenCode project-local command and skill layered on top of Spec Kit.

## Prerequisites

Install Spec Kit in the target repository first. ScopeSeed expects the canonical Spec Kit command files/workflows to be available there.

OpenCode is required for the integration in this repository. OMO-Slim, OpenViking, GitHub MCP/tooling, and other integrations are optional.

## Option 1: use the installer

Clone ScopeSeed somewhere on your machine and run:

```bash
./scripts/install-opencode.sh /path/to/your/project
```

The installer copies only:

```text
.opencode/commands/scopeseed.md
.opencode/skills/scopeseed/
```

It does not replace your OpenCode config, Spec Kit commands, or other skills. If ScopeSeed is already installed, the script refuses to overwrite it unless you pass `--force`.

Example:

```bash
./scripts/install-opencode.sh --force ~/src/my-project
```

## Option 2: copy manually

Copy the command and skill paths yourself:

```text
ScopeSeed/.opencode/commands/scopeseed.md
    → your-project/.opencode/commands/scopeseed.md

ScopeSeed/.opencode/skills/scopeseed/
    → your-project/.opencode/skills/scopeseed/
```

## Optional configuration examples

The files under `examples/opencode/` show conservative OpenCode permissions and an optional OMO-Slim setup. They are examples only. Merge the parts you want into an existing configuration rather than replacing project-specific settings blindly.

## Verify the installation

From the target project, start OpenCode and invoke:

```text
/scopeseed bootstrap
```

If the project already has Spec Kit specs and you want to adopt them instead of bootstrapping a new roadmap, use:

```text
/scopeseed import-specs specs/
```

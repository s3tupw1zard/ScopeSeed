# Installation

ScopeSeed is distributed primarily as an OpenCode package plugin layered on top of Spec Kit. The plugin registers the `/scopeseed` command at runtime, so ScopeSeed can be updated through OpenCode instead of copying command and skill files into every project.

## Prerequisites

Install Spec Kit in the target repository first. ScopeSeed expects the canonical Spec Kit command files and workflows to be available there.

OpenCode is required for the integration in this repository. OMO-Slim, OpenViking, GitHub tooling, web research providers, and project-specific MCP servers are optional.

## Recommended: install the OpenCode plugin

Install ScopeSeed directly from its GitHub repository:

```bash
opencode plugin add github:s3tupw1zard/ScopeSeed
```

This keeps the ScopeSeed runtime in OpenCode's package-plugin cache rather than copying ScopeSeed source files into the target repository.

After installation, restart OpenCode if the command is not visible immediately, then run:

```text
/scopeseed bootstrap
```

### Updates

Check package plugins for available updates:

```bash
opencode plugin check
```

Update installed package plugins:

```bash
opencode plugin update
```

Because the GitHub package target is not pinned to a commit, OpenCode can refresh ScopeSeed when the repository advances. If you intentionally pin ScopeSeed to a tag, version, or commit, that pin is treated as an explicit reproducibility choice rather than a moving installation.

### Private repository access

If the ScopeSeed repository is private, the machine running OpenCode must already have Git credentials that can read it. A public release removes that requirement.

## What the plugin does

The package exports a normal OpenCode plugin entry point. At startup it registers `/scopeseed` through OpenCode's configuration hook and bundles the ScopeSeed operating instructions and references with the package.

The plugin deliberately does **not** rewrite the target project's OpenCode config, install OMO-Slim, add MCP servers, or copy hidden project state. ScopeSeed's actual project state remains in the human-readable repository artifacts it manages, such as:

```text
specs/PROJECT.md
specs/FEATURES.md
specs/REJECTED_FEATURES.md
specs/<feature>/spec.md
```

If a project already defines its own `scopeseed` command, that explicit project/user command takes precedence and the plugin does not overwrite it.

## Alternative: project-local file installation

The older file-based installation remains useful for ScopeSeed development or when package plugins are unavailable.

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

You can also copy those paths manually. File-based installations do not receive package-plugin updates automatically; rerun the installer with `--force` when you deliberately want to refresh them.

## Optional configuration examples

The files under `examples/opencode/` show conservative OpenCode permissions and an optional OMO-Slim setup. They are examples only. Merge the parts you want into an existing configuration rather than replacing project-specific settings blindly.

## Verify the installation

From a target project with Spec Kit installed, start OpenCode and invoke:

```text
/scopeseed bootstrap
```

If the project already has Spec Kit specs and you want to adopt them instead of bootstrapping a new roadmap, use:

```text
/scopeseed import-specs specs/
```

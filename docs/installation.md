# Installation

ScopeSeed is distributed primarily as an OpenCode package plugin layered on top of Spec Kit. The plugin registers the `/scopeseed` command at runtime, so ScopeSeed can be updated through OpenCode instead of copying command and skill files into every project.

## Prerequisites

Install Spec Kit in the target repository first. ScopeSeed expects the canonical Spec Kit command files and workflows to be available there.

OpenCode is required for the integration in this repository. OMO-Slim, OpenViking, GitHub tooling, web research providers, and project-specific MCP servers are optional.

## Recommended: install the npm prerelease

Until ScopeSeed reaches a stable release, install the public npm package through the `dev` dist-tag:

```bash
opencode plugin add opencode-scopeseed@dev
```

This keeps the ScopeSeed runtime in OpenCode's package-plugin cache rather than copying ScopeSeed source files into the target repository.

For development directly from the repository, use:

```bash
opencode plugin add github:s3tupw1zard/ScopeSeed
```

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

The npm `dev` tag tracks prerelease versions; a future stable release will use `latest`. Repository installs can advance independently from npm and therefore remain a development-oriented option.

### Private repository access

GitHub-based installs from a private repository require Git credentials on the OpenCode host. The public npm package does not require repository access.

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


## Maintainer: publishing to npm

The package name is `opencode-scopeseed`. Prerelease versions use the existing CalVer-compatible SemVer form such as `2026.1.0-dev.6` and publish under the `dev` dist-tag. Stable versions publish under `latest`.

Before any release:

```bash
npm run verify
```

The GitHub Actions workflow `.github/workflows/publish.yml` publishes a GitHub Release whose tag exactly matches `v<package.json version>`. It uses npm Trusted Publishing/OIDC and intentionally contains no long-lived npm token.

The first package version must be published manually because npm requires the package to exist before its Trusted Publisher relationship can be configured. After that first publish, configure npm Trusted Publishing with:

- GitHub owner: `s3tupw1zard`
- repository: `ScopeSeed`
- workflow filename: `publish.yml`
- allow direct `npm publish`

Then future GitHub Releases can publish through OIDC. Keep the release marked as a prerelease while the package version contains a prerelease suffix.

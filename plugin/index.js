import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..")
const skillRoot = join(packageRoot, ".opencode", "skills", "scopeseed")

const read = (path) => readFileSync(path, "utf8")

const core = read(join(skillRoot, "SKILL.md"))

const referenceFiles = [
  "artifacts.md",
  "clarification.md",
  "discovery.md",
  "lifecycle.md",
  "registry.md",
  "research-and-disambiguation.md",
]

const references = referenceFiles
  .map((name) => `\n\n---\n\n# ScopeSeed reference: ${name}\n\n${read(join(skillRoot, "references", name))}`)
  .join("")

const commandTemplate = `You are running ScopeSeed through the installed OpenCode plugin.

The ScopeSeed operating instructions and bundled reference material below are authoritative for this command. Apply them to the current repository together with the repository's own governance and Spec Kit state. Do not assume optional integrations such as OMO-Slim, OpenViking, GitHub tooling, or project-specific MCP servers are installed; use them only when they are actually available.

${core}

# Bundled ScopeSeed reference material
${references}

# Current invocation

The user invoked ScopeSeed with these arguments:

\`\`\`text
$ARGUMENTS
\`\`\`

Interpret the invocation according to the ScopeSeed action rules above. If no action was supplied, use the default clarification workflow. Keep durable project state in the repository artifacts defined by ScopeSeed, not in hidden conversational state.`

export default async function ScopeSeedPlugin() {
  return {
    config(config) {
      config.command ??= {}

      // Respect an explicit project/user override if one already exists.
      if (!config.command.scopeseed) {
        config.command.scopeseed = {
          description:
            "Bootstrap, discover, clarify, verify, plan, or implement a ScopeSeed workflow over Spec Kit.",
          template: commandTemplate,
        }
      }
    },
  }
}

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
  "interaction.md",
  "lifecycle.md",
  "registry.md",
  "research-and-disambiguation.md",
]

const references = referenceFiles
  .map(
    (name) =>
      `\n\n---\n\n# ScopeSeed reference: ${name}\n\n${read(join(skillRoot, "references", name))}`,
  )
  .join("")

const bundledInstructions = `${core}\n\n# Bundled ScopeSeed reference material${references}`

const normalizeArguments = (text = "") =>
  text.trim().replace(/^\/?scopeseed(?:\s+|$)/i, "").trim()

const commandPrefix = `You are running ScopeSeed through the installed OpenCode plugin.

The bundled ScopeSeed instructions below are authoritative for this command together with the current repository's own governance and Spec Kit state.

Do not assume optional integrations such as OMO-Slim, OpenViking, GitHub tooling, or project-specific MCP servers are installed. Use optional integrations only when they are actually available.

When ScopeSeed needs a finite user choice and the OpenCode question tool is available, follow ScopeSeed's dialog policy and use that tool instead of requiring the user to type an option manually.

${bundledInstructions}

# Current ScopeSeed invocation`

export default {
  id: "scopeseed",

  async setup(ctx) {
    // ScopeSeed intentionally registers only a command here. The complete ScopeSeed
    // operating instructions are bundled into the command prompt, so package users do
    // not depend on OpenCode's runtime skill registration/discovery behavior.
    await ctx.command.transform((editor) => {
      editor.add({
        name: "scopeseed",
        description:
          "Bootstrap, discover, clarify, verify, plan, or implement a ScopeSeed workflow over Spec Kit.",
        execute: async ({ sessionID, prompt, delivery }) => {
          const args = normalizeArguments(prompt.text)
          const invocation =
            args || "(no arguments: use the default clarification workflow)"

          await ctx.session.prompt({
            ...prompt,
            sessionID,
            text: `${commandPrefix}\n\n\`\`\`text\n${invocation}\n\`\`\`\n\nInterpret the invocation according to the ScopeSeed action rules above. If no explicit action was supplied, use the default clarification workflow. Keep durable project state in ScopeSeed's repository artifacts rather than hidden conversational state.`,
            delivery,
          })
        },
      })
    })
  },
}

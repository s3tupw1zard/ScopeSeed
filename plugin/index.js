import { readFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..")
const skillRoot = join(packageRoot, ".opencode", "skills", "scopeseed")
const skillFile = join(skillRoot, "SKILL.md")

const read = (path) => readFileSync(path, "utf8")

const core = read(skillFile)

const referenceFiles = [
  "artifacts.md",
  "clarification.md",
  "discovery.md",
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

const skillContent = `${core}\n\n# Bundled ScopeSeed reference material${references}`

const commandPrefix = `Use the installed ScopeSeed skill to run the requested ScopeSeed workflow in the current repository.

Treat ScopeSeed's durable project files and the repository's own governance and Spec Kit state as authoritative. Do not assume optional integrations such as OMO-Slim, OpenViking, GitHub tooling, or project-specific MCP servers are installed; use them only when they are actually available.

Current ScopeSeed invocation arguments:`

const normalizeArguments = (text = "") =>
  text.trim().replace(/^\/?scopeseed(?:\s+|$)/i, "").trim()

export default {
  id: "scopeseed",

  async setup(ctx) {
    await ctx.skill.transform((editor) => {
      if (!editor.get("scopeseed")) {
        editor.add({
          id: "scopeseed",
          name: "ScopeSeed",
          description:
            "Project-level feature discovery and lifecycle orchestration over Spec Kit.",
          location: skillFile,
          content: skillContent,
          autoinvoke: false,
        })
      }
    })

    await ctx.command.transform((editor) => {
      editor.add({
        name: "scopeseed",
        description:
          "Bootstrap, discover, clarify, verify, plan, or implement a ScopeSeed workflow over Spec Kit.",
        execute: async ({ sessionID, prompt, delivery }) => {
          const args = normalizeArguments(prompt.text)
          const invocation = args || "(no arguments: use the default clarification workflow)"

          await ctx.session.prompt({
            ...prompt,
            sessionID,
            text: `${commandPrefix}\n\n\`\`\`text\n${invocation}\n\`\`\`\n\nLoad and follow the ScopeSeed skill. If no explicit action was supplied, use the default clarification workflow. Keep durable project state in ScopeSeed's repository artifacts rather than hidden conversational state.`,
            delivery,
          })
        },
      })
    })
  },
}

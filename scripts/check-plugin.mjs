import assert from "node:assert/strict"
import plugin from "../plugin/index.js"

assert.equal(typeof plugin, "object", "plugin default export must be an object")
assert.equal(plugin.id, "scopeseed", "plugin must expose stable id 'scopeseed'")
assert.equal(typeof plugin.setup, "function", "plugin must expose setup(ctx)")

let commandDefinition
let skillDefinition

const ctx = {
  skill: {
    async transform(callback) {
      callback({
        get() {
          return undefined
        },
        add(definition) {
          skillDefinition = definition
        },
      })
      return { async dispose() {} }
    },
  },
  command: {
    async transform(callback) {
      callback({
        add(definition) {
          commandDefinition = definition
        },
      })
      return { async dispose() {} }
    },
  },
  session: {
    async prompt() {},
  },
}

await plugin.setup(ctx)

assert.equal(skillDefinition?.id, "scopeseed")
assert.equal(commandDefinition?.name, "scopeseed")
assert.equal(typeof commandDefinition?.execute, "function")

console.log("ScopeSeed OpenCode v2 plugin shape OK")

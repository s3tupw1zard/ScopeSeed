import assert from "node:assert/strict"
import plugin from "../plugin/index.js"

assert.equal(typeof plugin, "object", "plugin default export must be an object")
assert.equal(plugin.id, "scopeseed", "plugin must expose stable id 'scopeseed'")
assert.equal(typeof plugin.setup, "function", "plugin must expose setup(ctx)")

let commandDefinition
let prompted

const ctx = {
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
    async prompt(input) {
      prompted = input
    },
  },
}

await plugin.setup(ctx)

assert.equal(commandDefinition?.name, "scopeseed")
assert.equal(typeof commandDefinition?.execute, "function")

await commandDefinition.execute({
  sessionID: "session-test",
  prompt: { text: "/scopeseed bootstrap" },
  delivery: "steer",
})

assert.equal(prompted?.sessionID, "session-test")
assert.match(prompted?.text ?? "", /bootstrap/)
assert.match(prompted?.text ?? "", /ScopeSeed/)

console.log("ScopeSeed OpenCode v2 command plugin shape OK")

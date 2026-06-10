import { describe, test, expect } from "@jest/globals"
import AutoCompleteTrie from "../src/AutoCompleteTrie.js"

describe("useWord", () => {
        test("should return true when the word exists", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("cat")

            expect(trie.useWord("cat")).toBe(true)
        })

        test("should increment frequency for an existing word", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("cat")
            trie.useWord("cat")
            trie.useWord("cat")

            const catNode = trie.children["c"].children["a"].children["t"]

            expect(catNode.frequency).toBe(2)
        })

        test("should return false when the word does not exist", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("cat")

            expect(trie.useWord("dog")).toBe(false)
        })

        test("should return false when the given word is only a prefix and not a full word", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("card")

            expect(trie.useWord("car")).toBe(false)
        })
    })
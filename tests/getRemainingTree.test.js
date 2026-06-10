import { describe, test, expect } from "@jest/globals"
import AutoCompleteTrie from "../src/AutoCompleteTrie.js"


describe("_getRemainingTree", () => {
        test("should return the root node when prefix is empty", () => {
            const trie = new AutoCompleteTrie()

            const result = trie._getRemainingTree("", trie)

            expect(result).toBe(trie)
        })

        test("should return the node where the prefix ends", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("cat")
            trie.addWord("car")

            const result = trie._getRemainingTree("ca", trie)

            expect(result).toBe(trie.children["c"].children["a"])
            expect(result.value).toBe("a")
        })

        test("should return null when the prefix does not exist", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("cat")

            const result = trie._getRemainingTree("do", trie)

            expect(result).toBe(null)
        })

        test("should return the last node when the prefix is a full word", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("cat")

            const result = trie._getRemainingTree("cat", trie)

            expect(result).toBe(trie.children["c"].children["a"].children["t"])
            expect(result.endOfWord).toBe(true)
        })
    })
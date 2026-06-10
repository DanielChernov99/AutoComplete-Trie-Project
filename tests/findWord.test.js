import { describe, test, expect } from "@jest/globals"
import AutoCompleteTrie from "../src/AutoCompleteTrie.js"

describe("findWord", () => {
        test("should return true when the exact word exists in the trie", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("cat")

            expect(trie.findWord("cat")).toBe(true)
        })

        test("should return false when the word does not exist in the trie", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("cat")

            expect(trie.findWord("dog")).toBe(false)
        })

        test("should return false when only part of the searched word exists", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("cat")

            expect(trie.findWord("car")).toBe(false)
        })

        test("should return false when the searched word is only a prefix and not a full word", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("card")

            expect(trie.findWord("car")).toBe(false)
        })

        test("should return true when a word is both a full word and a prefix of another word", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("car")
            trie.addWord("card")

            expect(trie.findWord("car")).toBe(true)
            expect(trie.findWord("card")).toBe(true)
        })

        test("should return false when searching in an empty trie", () => {
            const trie = new AutoCompleteTrie()

            expect(trie.findWord("cat")).toBe(false)
        })
    })
import { describe, test, expect } from "@jest/globals"
import AutoCompleteTrie from "../src/AutoCompleteTrie.js"


describe("_allWordsHelper", () => {
    test("should collect all words from the given prefix node", () => {
        const trie = new AutoCompleteTrie()

        trie.addWord("cat")
        trie.addWord("car")
        trie.addWord("card")
        trie.addWord("care")
        trie.addWord("dog")

        const prefixNode = trie.children["c"].children["a"]
        const allWords = []

        trie._allWordsHelper("ca", prefixNode, allWords)

        expect(allWords).toHaveLength(4)
        expect(allWords).toEqual(expect.arrayContaining([
            expect.objectContaining({ word: "cat", frequency: 0 }),
            expect.objectContaining({ word: "car", frequency: 0 }),
            expect.objectContaining({ word: "card", frequency: 0 }),
            expect.objectContaining({ word: "care", frequency: 0 })
        ]))
    })

    test("should include the prefix itself if it is a full word", () => {
        const trie = new AutoCompleteTrie()

        trie.addWord("car")
        trie.addWord("card")

        const prefixNode = trie.children["c"].children["a"].children["r"]
        const allWords = []

        trie._allWordsHelper("car", prefixNode, allWords)

        expect(allWords).toHaveLength(2)
        expect(allWords).toEqual(expect.arrayContaining([
            expect.objectContaining({ word: "car", frequency: 0 }),
            expect.objectContaining({ word: "card", frequency: 0 })
        ]))
    })

    test("should collect one word when the node has no children and is end of word", () => {
        const trie = new AutoCompleteTrie()

        trie.addWord("dog")

        const prefixNode = trie.children["d"].children["o"].children["g"]
        const allWords = []

        trie._allWordsHelper("dog", prefixNode, allWords)

        expect(allWords).toEqual([
            { word: "dog", frequency: 0 }
        ])
    })

    test("should not add anything when node is not endOfWord and has no children", () => {
        const trie = new AutoCompleteTrie()
        const node = new AutoCompleteTrie("x")
        const allWords = []

        trie._allWordsHelper("x", node, allWords)

        expect(allWords).toEqual([])
    })

    test("should collect all words from the root when prefix is empty", () => {
        const trie = new AutoCompleteTrie()

        trie.addWord("cat")
        trie.addWord("dog")
        trie.addWord("car")

        const allWords = []

        trie._allWordsHelper("", trie, allWords)

        expect(allWords).toHaveLength(3)
        expect(allWords).toEqual(expect.arrayContaining([
            expect.objectContaining({ word: "cat", frequency: 0 }),
            expect.objectContaining({ word: "dog", frequency: 0 }),
            expect.objectContaining({ word: "car", frequency: 0 })
        ]))
    })

    test("should not include words that are outside the given prefix node", () => {
        const trie = new AutoCompleteTrie()

        trie.addWord("cat")
        trie.addWord("car")
        trie.addWord("dog")

        const prefixNode = trie.children["c"]
        const allWords = []

        trie._allWordsHelper("c", prefixNode, allWords)

        expect(allWords).toEqual(expect.arrayContaining([
            expect.objectContaining({ word: "cat", frequency: 0 }),
            expect.objectContaining({ word: "car", frequency: 0 })
        ]))

        expect(allWords).not.toEqual(expect.arrayContaining([
            expect.objectContaining({ word: "dog" })
        ]))
    })
})
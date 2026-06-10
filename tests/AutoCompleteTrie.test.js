import { describe, test, expect } from "@jest/globals"
import AutoCompleteTrie from "../src/AutoCompleteTrie.js"

describe("AutoCompleteTrie", () => {
    describe("constructor", () => {
        // tests
    })

    describe("addWord", () => {
        test("should add the first character as a child of the root", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("cat")

            expect(trie.children["c"]).toBeDefined()
            expect(trie.children["c"]).toBeInstanceOf(AutoCompleteTrie)
            expect(trie.children["c"].value).toBe("c")
        })

        test("should create a full path for the given word", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("cat")

            expect(trie.children["c"]).toBeDefined()
            expect(trie.children["c"].children["a"]).toBeDefined()
            expect(trie.children["c"].children["a"].children["t"]).toBeDefined()
        })

        test("should mark only the last character as endOfWord", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("cat")

            const cNode = trie.children["c"]
            const aNode = cNode.children["a"]
            const tNode = aNode.children["t"]

            expect(cNode.endOfWord).toBe(false)
            expect(aNode.endOfWord).toBe(false)
            expect(tNode.endOfWord).toBe(true)
        })

        test("should reuse existing path when adding a word with the same prefix", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("run")

            const rNodeBefore = trie.children["r"]
            const uNodeBefore = rNodeBefore.children["u"]
            const nNodeBefore = uNodeBefore.children["n"]

            trie.addWord("running")

            const rNodeAfter = trie.children["r"]
            const uNodeAfter = rNodeAfter.children["u"]
            const nNodeAfter = uNodeAfter.children["n"]

            expect(rNodeAfter).toBe(rNodeBefore)
            expect(uNodeAfter).toBe(uNodeBefore)
            expect(nNodeAfter).toBe(nNodeBefore)

            expect(nNodeAfter.children["n"]).toBeDefined()
            expect(nNodeAfter.children["n"].children["i"]).toBeDefined()
            expect(nNodeAfter.children["n"].children["i"].children["n"]).toBeDefined()
            expect(nNodeAfter.children["n"].children["i"].children["n"].children["g"]).toBeDefined()
        })

        test("should allow a word to be both a full word and a prefix of another word", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("car")
            trie.addWord("card")

            const rNode = trie.children["c"].children["a"].children["r"]
            const dNode = rNode.children["d"]

            expect(rNode.endOfWord).toBe(true)
            expect(dNode.endOfWord).toBe(true)
        })

        test("should add different words under different root children", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("cat")
            trie.addWord("dog")

            expect(trie.children["c"]).toBeDefined()
            expect(trie.children["d"]).toBeDefined()

            expect(trie.children["c"].children["a"].children["t"].endOfWord).toBe(true)
            expect(trie.children["d"].children["o"].children["g"].endOfWord).toBe(true)
        })
    })

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

    describe("predictWords", () => {
        // tests
    })

    describe("_allWordsHelper", () => {
        // tests
    })

    describe("_getRemainingTree", () => {
        // tests
    })
})
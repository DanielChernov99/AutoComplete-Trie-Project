import { describe, test, expect } from "@jest/globals"
import AutoCompleteTrie from "../src/AutoCompleteTrie.js"

describe("predictWords", () => {
    test("should return all words that start with the given prefix", () => {
        const trie = new AutoCompleteTrie()

        trie.addWord("cat")
        trie.addWord("car")
        trie.addWord("card")
        trie.addWord("care")
        trie.addWord("dog")

        const result = trie.predictWords("ca")

        expect(result).toHaveLength(4)
        expect(result).toEqual(expect.arrayContaining([
            expect.objectContaining({ word: "cat", frequency: 0 }),
            expect.objectContaining({ word: "car", frequency: 0 }),
            expect.objectContaining({ word: "card", frequency: 0 }),
            expect.objectContaining({ word: "care", frequency: 0 })
        ]))
    })

    test("should return suggestions sorted by word length from shortest to longest when frequency is equal", () => {
        const trie = new AutoCompleteTrie()

        trie.addWord("carbon")
        trie.addWord("card")
        trie.addWord("car")
        trie.addWord("care")
        trie.addWord("cat")

        const result = trie.predictWords("ca")

        const lengths = result.map(item => item.word.length)
        const sortedLengths = [...lengths].sort((a, b) => a - b)

        expect(lengths).toEqual(sortedLengths)
    })

    test("should not care about order between words with the same frequency and same length", () => {
        const trie = new AutoCompleteTrie()

        trie.addWord("cat")
        trie.addWord("car")
        trie.addWord("cap")
        trie.addWord("card")
        trie.addWord("care")

        const result = trie.predictWords("ca")

        const firstThreeWords = result.slice(0, 3).map(item => item.word)
        const lastTwoWords = result.slice(3).map(item => item.word)

        expect(firstThreeWords).toHaveLength(3)
        expect(firstThreeWords).toEqual(expect.arrayContaining([
            "cat",
            "car",
            "cap"
        ]))

        expect(lastTwoWords).toHaveLength(2)
        expect(lastTwoWords).toEqual(expect.arrayContaining([
            "card",
            "care"
        ]))
    })

    test("should put higher frequency words before shorter words", () => {
        const trie = new AutoCompleteTrie()

        trie.addWord("car")
        trie.addWord("carbon")
        trie.addWord("cat")

        trie.useWord("carbon")
        trie.useWord("carbon")

        const result = trie.predictWords("ca")
        const words = result.map(item => item.word)

        expect(result[0].word).toBe("carbon")
        expect(result[0].frequency).toBe(2)

        expect(words.indexOf("carbon")).toBeLessThan(words.indexOf("car"))
        expect(words.indexOf("carbon")).toBeLessThan(words.indexOf("cat"))
    })

    test("should sort by word length after frequency tie", () => {
        const trie = new AutoCompleteTrie()

        trie.addWord("carbon")
        trie.addWord("card")
        trie.addWord("car")
        trie.addWord("cat")

        trie.useWord("carbon")
        trie.useWord("card")
        trie.useWord("car")

        const result = trie.predictWords("ca")
        const words = result.map(item => item.word)

        expect(words.slice(0, 3)).toEqual([
            "car",
            "card",
            "carbon"
        ])

        expect(result[0].frequency).toBe(1)
        expect(result[1].frequency).toBe(1)
        expect(result[2].frequency).toBe(1)

        expect(words[3]).toBe("cat")
        expect(result[3].frequency).toBe(0)
    })

    test("should include the prefix itself if the prefix is a complete word", () => {
        const trie = new AutoCompleteTrie()

        trie.addWord("car")
        trie.addWord("card")
        trie.addWord("care")
        trie.addWord("carbon")

        const result = trie.predictWords("car")
        const words = result.map(item => item.word)

        expect(result).toHaveLength(4)
        expect(result[0].word).toBe("car")

        expect(words).toEqual(expect.arrayContaining([
            "car",
            "card",
            "care",
            "carbon"
        ]))
    })

    test("should return only the prefix word when it has no completions", () => {
        const trie = new AutoCompleteTrie()

        trie.addWord("dog")
        trie.addWord("cat")

        const result = trie.predictWords("dog")

        expect(result).toEqual([
            { word: "dog", frequency: 0 }
        ])
    })

    test("should return an empty array when the prefix does not exist", () => {
        const trie = new AutoCompleteTrie()

        trie.addWord("cat")
        trie.addWord("car")

        const result = trie.predictWords("do")

        expect(result).toEqual([])
    })

    test("should return an empty array when the trie is empty", () => {
        const trie = new AutoCompleteTrie()

        const result = trie.predictWords("ca")

        expect(result).toEqual([])
    })

    test("should return all words sorted by frequency first when prefix is an empty string", () => {
        const trie = new AutoCompleteTrie()

        trie.addWord("elephant")
        trie.addWord("cat")
        trie.addWord("dog")
        trie.addWord("car")
        trie.addWord("card")

        trie.useWord("elephant")
        trie.useWord("elephant")
        trie.useWord("card")

        const result = trie.predictWords("")
        const words = result.map(item => item.word)

        expect(result).toHaveLength(5)

        expect(result[0]).toEqual({
            word: "elephant",
            frequency: 2
        })

        expect(result[1]).toEqual({
            word: "card",
            frequency: 1
        })

        expect(words.slice(2)).toEqual(expect.arrayContaining([
            "cat",
            "dog",
            "car"
        ]))
    })

    test("should not return words that do not start with the prefix", () => {
        const trie = new AutoCompleteTrie()

        trie.addWord("cat")
        trie.addWord("car")
        trie.addWord("dog")
        trie.addWord("door")

        trie.useWord("dog")
        trie.useWord("door")

        const result = trie.predictWords("ca")
        const words = result.map(item => item.word)

        expect(result).toHaveLength(2)
        expect(words).toEqual(expect.arrayContaining([
            "cat",
            "car"
        ]))

        expect(words).not.toContain("dog")
        expect(words).not.toContain("door")
    })
})
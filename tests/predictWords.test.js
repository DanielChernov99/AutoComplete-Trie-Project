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
                "cat",
                "car",
                "card",
                "care"
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

            const lengths = result.map(word => word.length)
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

            const firstThreeWords = result.slice(0, 3)
            const lastTwoWords = result.slice(3)

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

            expect(result[0]).toBe("carbon")
            expect(result.indexOf("carbon")).toBeLessThan(result.indexOf("car"))
            expect(result.indexOf("carbon")).toBeLessThan(result.indexOf("cat"))
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

            expect(result.slice(0, 3)).toEqual([
                "car",
                "card",
                "carbon"
            ])
            expect(result[3]).toBe("cat")
        })

        test("should include the prefix itself if the prefix is a complete word", () => {
            const trie = new AutoCompleteTrie()

            trie.addWord("car")
            trie.addWord("card")
            trie.addWord("care")
            trie.addWord("carbon")

            const result = trie.predictWords("car")

            expect(result).toHaveLength(4)
            expect(result[0]).toBe("car")
            expect(result).toEqual(expect.arrayContaining([
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

            expect(result).toEqual(["dog"])
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

            expect(result).toHaveLength(5)
            expect(result[0]).toBe("elephant")
            expect(result[1]).toBe("card")
            expect(result.slice(2)).toEqual(expect.arrayContaining([
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

            expect(result).toHaveLength(2)
            expect(result).toEqual(expect.arrayContaining([
                "cat",
                "car"
            ]))

            expect(result).not.toContain("dog")
            expect(result).not.toContain("door")
        })
    })
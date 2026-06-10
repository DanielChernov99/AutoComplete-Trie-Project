// import { describe, test, expect } from "@jest/globals"
// import AutoCompleteTrie from "../src/AutoCompleteTrie.js"

// describe("AutoCompleteTrie", () => {
//     describe("predictWords", () => {
//         test("should return all words that start with the given prefix", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")
//             trie.addWord("car")
//             trie.addWord("card")
//             trie.addWord("care")
//             trie.addWord("dog")

//             const result = trie.predictWords("ca")

//             expect(result).toHaveLength(4)
//             expect(result).toEqual(expect.arrayContaining([
//                 "cat",
//                 "car",
//                 "card",
//                 "care"
//             ]))
//         })

//         test("should return suggestions sorted by word length from shortest to longest when frequency is equal", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("carbon")
//             trie.addWord("card")
//             trie.addWord("car")
//             trie.addWord("care")
//             trie.addWord("cat")

//             const result = trie.predictWords("ca")

//             const lengths = result.map(word => word.length)
//             const sortedLengths = [...lengths].sort((a, b) => a - b)

//             expect(lengths).toEqual(sortedLengths)
//         })

//         test("should not care about order between words with the same frequency and same length", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")
//             trie.addWord("car")
//             trie.addWord("cap")
//             trie.addWord("card")
//             trie.addWord("care")

//             const result = trie.predictWords("ca")

//             const firstThreeWords = result.slice(0, 3)
//             const lastTwoWords = result.slice(3)

//             expect(firstThreeWords).toHaveLength(3)
//             expect(firstThreeWords).toEqual(expect.arrayContaining([
//                 "cat",
//                 "car",
//                 "cap"
//             ]))

//             expect(lastTwoWords).toHaveLength(2)
//             expect(lastTwoWords).toEqual(expect.arrayContaining([
//                 "card",
//                 "care"
//             ]))
//         })

//         test("should put higher frequency words before shorter words", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("car")
//             trie.addWord("carbon")
//             trie.addWord("cat")

//             trie.useWord("carbon")
//             trie.useWord("carbon")

//             const result = trie.predictWords("ca")

//             expect(result[0]).toBe("carbon")
//             expect(result.indexOf("carbon")).toBeLessThan(result.indexOf("car"))
//             expect(result.indexOf("carbon")).toBeLessThan(result.indexOf("cat"))
//         })

//         test("should sort by word length after frequency tie", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("carbon")
//             trie.addWord("card")
//             trie.addWord("car")
//             trie.addWord("cat")

//             trie.useWord("carbon")
//             trie.useWord("card")
//             trie.useWord("car")

//             const result = trie.predictWords("ca")

//             expect(result.slice(0, 3)).toEqual([
//                 "car",
//                 "card",
//                 "carbon"
//             ])
//             expect(result[3]).toBe("cat")
//         })

//         test("should include the prefix itself if the prefix is a complete word", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("car")
//             trie.addWord("card")
//             trie.addWord("care")
//             trie.addWord("carbon")

//             const result = trie.predictWords("car")

//             expect(result).toHaveLength(4)
//             expect(result[0]).toBe("car")
//             expect(result).toEqual(expect.arrayContaining([
//                 "car",
//                 "card",
//                 "care",
//                 "carbon"
//             ]))
//         })

//         test("should return only the prefix word when it has no completions", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("dog")
//             trie.addWord("cat")

//             const result = trie.predictWords("dog")

//             expect(result).toEqual(["dog"])
//         })

//         test("should return an empty array when the prefix does not exist", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")
//             trie.addWord("car")

//             const result = trie.predictWords("do")

//             expect(result).toEqual([])
//         })

//         test("should return an empty array when the trie is empty", () => {
//             const trie = new AutoCompleteTrie()

//             const result = trie.predictWords("ca")

//             expect(result).toEqual([])
//         })

//         test("should return all words sorted by frequency first when prefix is an empty string", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("elephant")
//             trie.addWord("cat")
//             trie.addWord("dog")
//             trie.addWord("car")
//             trie.addWord("card")

//             trie.useWord("elephant")
//             trie.useWord("elephant")
//             trie.useWord("card")

//             const result = trie.predictWords("")

//             expect(result).toHaveLength(5)
//             expect(result[0]).toBe("elephant")
//             expect(result[1]).toBe("card")
//             expect(result.slice(2)).toEqual(expect.arrayContaining([
//                 "cat",
//                 "dog",
//                 "car"
//             ]))
//         })

//         test("should not return words that do not start with the prefix", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")
//             trie.addWord("car")
//             trie.addWord("dog")
//             trie.addWord("door")

//             trie.useWord("dog")
//             trie.useWord("door")

//             const result = trie.predictWords("ca")

//             expect(result).toHaveLength(2)
//             expect(result).toEqual(expect.arrayContaining([
//                 "cat",
//                 "car"
//             ]))

//             expect(result).not.toContain("dog")
//             expect(result).not.toContain("door")
//         })
//     })

//     describe("addWord", () => {
//         test("should add the first character as a child of the root", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")

//             expect(trie.children["c"]).toBeDefined()
//             expect(trie.children["c"]).toBeInstanceOf(AutoCompleteTrie)
//             expect(trie.children["c"].value).toBe("c")
//         })

//         test("should create a full path for the given word", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")

//             expect(trie.children["c"]).toBeDefined()
//             expect(trie.children["c"].children["a"]).toBeDefined()
//             expect(trie.children["c"].children["a"].children["t"]).toBeDefined()
//         })

//         test("should mark only the last character as endOfWord", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")

//             const cNode = trie.children["c"]
//             const aNode = cNode.children["a"]
//             const tNode = aNode.children["t"]

//             expect(cNode.endOfWord).toBe(false)
//             expect(aNode.endOfWord).toBe(false)
//             expect(tNode.endOfWord).toBe(true)
//         })

//         test("should keep frequency 0 when adding a new word", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")

//             const tNode = trie.children["c"].children["a"].children["t"]

//             expect(tNode.frequency).toBe(0)
//         })

//         test("should reuse existing path when adding a word with the same prefix", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("run")

//             const rNodeBefore = trie.children["r"]
//             const uNodeBefore = rNodeBefore.children["u"]
//             const nNodeBefore = uNodeBefore.children["n"]

//             trie.addWord("running")

//             const rNodeAfter = trie.children["r"]
//             const uNodeAfter = rNodeAfter.children["u"]
//             const nNodeAfter = uNodeAfter.children["n"]

//             expect(rNodeAfter).toBe(rNodeBefore)
//             expect(uNodeAfter).toBe(uNodeBefore)
//             expect(nNodeAfter).toBe(nNodeBefore)

//             expect(nNodeAfter.children["n"]).toBeDefined()
//             expect(nNodeAfter.children["n"].children["i"]).toBeDefined()
//             expect(nNodeAfter.children["n"].children["i"].children["n"]).toBeDefined()
//             expect(nNodeAfter.children["n"].children["i"].children["n"].children["g"]).toBeDefined()
//         })

//         test("should allow a word to be both a full word and a prefix of another word", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("car")
//             trie.addWord("card")

//             const rNode = trie.children["c"].children["a"].children["r"]
//             const dNode = rNode.children["d"]

//             expect(rNode.endOfWord).toBe(true)
//             expect(dNode.endOfWord).toBe(true)
//         })

//         test("should add different words under different root children", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")
//             trie.addWord("dog")

//             expect(trie.children["c"]).toBeDefined()
//             expect(trie.children["d"]).toBeDefined()

//             expect(trie.children["c"].children["a"].children["t"].endOfWord).toBe(true)
//             expect(trie.children["d"].children["o"].children["g"].endOfWord).toBe(true)
//         })
//     })

//     describe("findWord", () => {
//         test("should return true when the exact word exists in the trie", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")

//             expect(trie.findWord("cat")).toBe(true)
//         })

//         test("should return false when the word does not exist in the trie", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")

//             expect(trie.findWord("dog")).toBe(false)
//         })

//         test("should return false when only part of the searched word exists", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")

//             expect(trie.findWord("car")).toBe(false)
//         })

//         test("should return false when the searched word is only a prefix and not a full word", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("card")

//             expect(trie.findWord("car")).toBe(false)
//         })

//         test("should return true when a word is both a full word and a prefix of another word", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("car")
//             trie.addWord("card")

//             expect(trie.findWord("car")).toBe(true)
//             expect(trie.findWord("card")).toBe(true)
//         })

//         test("should return false when searching in an empty trie", () => {
//             const trie = new AutoCompleteTrie()

//             expect(trie.findWord("cat")).toBe(false)
//         })
//     })

//     describe("useWord", () => {
//         test("should return true when the word exists", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")

//             expect(trie.useWord("cat")).toBe(true)
//         })

//         test("should increment frequency for an existing word", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")
//             trie.useWord("cat")
//             trie.useWord("cat")

//             const catNode = trie.children["c"].children["a"].children["t"]

//             expect(catNode.frequency).toBe(2)
//         })

//         test("should return false when the word does not exist", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")

//             expect(trie.useWord("dog")).toBe(false)
//         })

//         test("should return false when the given word is only a prefix and not a full word", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("card")

//             expect(trie.useWord("car")).toBe(false)
//         })
//     })

//     describe("_allWordsHelper", () => {
//         test("should collect all words from the given prefix node", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")
//             trie.addWord("car")
//             trie.addWord("card")
//             trie.addWord("care")
//             trie.addWord("dog")

//             const prefixNode = trie.children["c"].children["a"]
//             const allWords = []

//             trie._allWordsHelper("ca", prefixNode, allWords)

//             expect(allWords).toHaveLength(4)
//             expect(allWords).toEqual(expect.arrayContaining([
//                 "cat",
//                 "car",
//                 "card",
//                 "care"
//             ]))
//         })

//         test("should include the prefix itself if it is a full word", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("car")
//             trie.addWord("card")

//             const prefixNode = trie.children["c"].children["a"].children["r"]
//             const allWords = []

//             trie._allWordsHelper("car", prefixNode, allWords)

//             expect(allWords).toHaveLength(2)
//             expect(allWords).toEqual(expect.arrayContaining([
//                 "car",
//                 "card"
//             ]))
//         })

//         test("should collect one word when the node has no children and is end of word", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("dog")

//             const prefixNode = trie.children["d"].children["o"].children["g"]
//             const allWords = []

//             trie._allWordsHelper("dog", prefixNode, allWords)

//             expect(allWords).toEqual(["dog"])
//         })

//         test("should not add anything when node is not endOfWord and has no children", () => {
//             const trie = new AutoCompleteTrie()
//             const node = new AutoCompleteTrie("x")
//             const allWords = []

//             trie._allWordsHelper("x", node, allWords)

//             expect(allWords).toEqual([])
//         })

//         test("should collect all words from the root when prefix is empty", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")
//             trie.addWord("dog")
//             trie.addWord("car")

//             const allWords = []

//             trie._allWordsHelper("", trie, allWords)

//             expect(allWords).toHaveLength(3)
//             expect(allWords).toEqual(expect.arrayContaining([
//                 "cat",
//                 "dog",
//                 "car"
//             ]))
//         })

//         test("should not include words that are outside the given prefix node", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")
//             trie.addWord("car")
//             trie.addWord("dog")

//             const prefixNode = trie.children["c"]
//             const allWords = []

//             trie._allWordsHelper("c", prefixNode, allWords)

//             expect(allWords).toEqual(expect.arrayContaining([
//                 "cat",
//                 "car"
//             ]))

//             expect(allWords).not.toContain("dog")
//         })
//     })

//     describe("_getRemainingTree", () => {
//         test("should return the root node when prefix is empty", () => {
//             const trie = new AutoCompleteTrie()

//             const result = trie._getRemainingTree("", trie)

//             expect(result).toBe(trie)
//         })

//         test("should return the node where the prefix ends", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")
//             trie.addWord("car")

//             const result = trie._getRemainingTree("ca", trie)

//             expect(result).toBe(trie.children["c"].children["a"])
//             expect(result.value).toBe("a")
//         })

//         test("should return null when the prefix does not exist", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")

//             const result = trie._getRemainingTree("do", trie)

//             expect(result).toBe(null)
//         })

//         test("should return the last node when the prefix is a full word", () => {
//             const trie = new AutoCompleteTrie()

//             trie.addWord("cat")

//             const result = trie._getRemainingTree("cat", trie)

//             expect(result).toBe(trie.children["c"].children["a"].children["t"])
//             expect(result.endOfWord).toBe(true)
//         })
//     })
// })
export default class AutoCompleteTrie{
    constructor(value =""){
        this.value = value
        this.children = {}
        this.endOfWord = false
    }
    addWord(word){
        let currentNode = this
        for(let i = 0; i< word.length; i++ ){
            let char = word[i]
            if(!currentNode.children[char]){
                currentNode.children[char] = new AutoCompleteTrie(char)
            }
            currentNode = currentNode.children[char]
        }
        currentNode.endOfWord = true
    }
}
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
    findWord(word){
        if(word === "" && this.endOfWord) return true
        if (!this.children[word.charAt(0)]) return false
        return this.children[word.charAt(0)].findWord(word.slice(1))
    }


    _getRemainingTree(prefix, node){
        if(prefix === "") return node
        const char = prefix.charAt(0)
        if (!node.children[char]) return null
        return this._getRemainingTree(prefix.slice(1),node.children[char])
    }

    _allWordsHelper(prefix, node, allWords){        
        if(node.endOfWord) allWords.push(prefix)
        Object.values(node.children).forEach(n => {
             this._allWordsHelper(prefix + n.value,n,allWords)
        });
        return allWords
    }
}

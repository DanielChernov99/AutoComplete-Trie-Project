export default class AutoCompleteTrie{
    constructor(value,){
        this.value = value
        this.children = {}
        this.endOfWord = false
    }
}
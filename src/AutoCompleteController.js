import AutoCompleteTrie from "./AutoCompleteTrie.js"
export default class AutoCompleteController {
    constructor(trie = new AutoCompleteTrie()){
        this.trie = trie
    }

    handleCommand(userInput){
        const isValid = this.validateArgs(userInput)
        if(isValid.result === false) return {result:false , message:isValid.message, commandType:"Invalid"}
        const command = isValid.command
        const word = isValid.word
        switch(command){
            case "add":
                this.trie.addWord(word)
                return {result:true , wordUsed:word, commandType:"add",data:word}       
            case "complete":
                const completedWords = this.trie.predictWords(word)                              
                return {result:true , wordUsed:word, commandType:"complete",data:completedWords}
            case "find":
                const isExist = this.trie.findWord(word)
                return {result:true , wordUsed:word, commandType:"find",data:isExist}
            case "use":
                const afterUse = this.trie.useWord(word)                                    
                return {result:true , wordUsed:word, commandType:"use",data:afterUse}  
            case "help":
                return {result:true , wordUsed:null, commandType:"help"}                
            case "exit":
                return {result:true , wordUsed:null, commandType:"exit"}               
        }
    }
    validateArgs(userInput){
        if(!userInput) return {result: false,message:"please enter command and word",errorType:"empty"}

        const inputArr = userInput.trim().split(/\s+/)

        if (inputArr.length > 2) return {result: false, message:"Too many arguments",errorType:"param-overload"}

        const command = inputArr[0].toLowerCase()
        const word = inputArr[1]?.toLowerCase()
        const wordCommands = ["add","complete","use","find"]
        const noWordCommands = ["help","exit"]
        const allCommands = [...wordCommands, ...noWordCommands]

        if(!(allCommands).includes(command)){
            return {result: false, message:"please enter a valid command",errorType:"not-valid-command"}
        }
        if(wordCommands.includes(command)){          
            if (!word) return {result: false, message:"please enter the word aswell",errorType:"empty"}
            if (!/^[a-zA-Z]+$/.test(word)) {
                return { result: false, message: "word must contain only letters",errorType:"not-Letters-Only"}
            }
        }
        else{
            if (word) return {result: false, message:"please try this command without a word"}
        }       

        return {result: true ,message:"User input is valid",command:command,word:word}
    }
}


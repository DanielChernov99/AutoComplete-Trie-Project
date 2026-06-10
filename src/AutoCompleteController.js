
export default class AutoCompleteController {
    constructor(trie = new AutoCompleteTrie()){
        this.trie = trie
    }

    handleCommand(userInput){

    }
    validateArgs(userInput){
        if(!userInput) return {result: false,message:"please enter command and word"}

        const inputArr = userInput.trim().split(/\s+/)

        if (inputArr.length > 2) return {result: false, message:"Too many arguments"}

        const command = inputArr[0].toLowerCase()
        const wordCommands = ["add","complete","use","find"]
        const noWordCommands = ["help","exit"]
        const allCommands = [...wordCommands, ...noWordCommands]

        if(!(allCommands).includes(command)){
            return {result: false, message:"please enter a valid command"}
        }
        if(wordCommands.includes(command)){
            const word = inputArr[1]
            if (!word) return {result: false, message:"please enter the word aswell"}
            if (!/^[a-zA-Z]+$/.test(word)) {
                return { result: false, message: "word must contain only letters" }
            }
        }
        else{
            const word = inputArr[1]
            if (word) return {result: false, message:"please try this command without a word"}
        }       

        return { result: true ,message:"User input is valid"}
    }
}



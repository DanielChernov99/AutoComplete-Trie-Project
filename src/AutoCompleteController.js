
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
                word = isValid.word
                return {result:true , message:"added word successfuly", commandType:"add"}       
            case "complete":
                word = isValid.word
                return {result:true , message:"suggest word successfuly", commandType:"complete"}
            case "find":
                word = isValid.word
                return {result:true , message:"found function worked", commandType:"find"}
            case "use":
                word = isValid.word
                return {result:true , message:"added frequncy successfuly", commandType:"use"}  
            case "help":
                return {result:true , message:"suggested help", commandType:"help"}                
            case "exit":
                return {result:true , message:"GoodBye", commandType:"exit"}               
        }

    }
    validateArgs(userInput){
        if(!userInput) return {result: false,message:"please enter command and word"}

        const inputArr = userInput.trim().split(/\s+/)

        if (inputArr.length > 2) return {result: false, message:"Too many arguments"}

        const command = inputArr[0].toLowerCase()
        const word = inputArr[1]?.toLowerCase()
        const wordCommands = ["add","complete","use","find"]
        const noWordCommands = ["help","exit"]
        const allCommands = [...wordCommands, ...noWordCommands]

        if(!(allCommands).includes(command)){
            return {result: false, message:"please enter a valid command"}
        }
        if(wordCommands.includes(command)){          
            if (!word) return {result: false, message:"please enter the word aswell"}
            if (!/^[a-zA-Z]+$/.test(word)) {
                return { result: false, message: "word must contain only letters" }
            }
        }
        else{
            if (word) return {result: false, message:"please try this command without a word"}
        }       

        return { result: true ,message:"User input is valid",command:command,word:word}
    }
}



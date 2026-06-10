export default class ConsoleView{
    constructor(){

    }   

    showWelcome(){
        console.log("=== AutoComplete Trie Console ===")
        console.log("Type 'help' for commands\n")
    }
    showError(errorMessage){
        console.log(`✗ ${errorMessage}\n`)
    }
    showSuccess(succsessMessage){
        console.log(`✓ ${succsessMessage}`)
    }
    showHelp(){   
        console.log(`Commands:
                add <word>      - Add word to dictionary
                find <word>     - Check if word exists
                complete <prefix> - Get completions
                help           - Show this message
                exit           - Quit program  
        `)
    }
    showResult(commandResult){
        if(commandResult.result === false){
            this.showError(commandResult.message)
        }
        else{
            const command = commandResult.commandType
            switch (command){
                case "add":
                    console.log(`✓ Added '${commandResult.wordUsed}' to dictionary\n`)
                    break;
                case "complete":
                    console.log(`Suggestion for '${commandResult.wordUsed}:' ${commandResult.data}\n`)
                case "find":
                case "use":
                case "help":
                case "exit":
            }
        }
    }
}
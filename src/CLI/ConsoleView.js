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
add <word>        - Add word to dictionary
find <word>       - Check if word exists
complete <prefix> - Get completions
add <word>        - Increase importance of word
help              - Show this message
exit              - Quit program  
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
                    if(commandResult.data.length === 0){
                        console.log(`No suggestions found for '${commandResult.wordUsed}'\n`)
                    }
                    else{
                        const suggestions = commandResult.data
                            .map(item => `${item.word} (${item.frequency})`)
                            .join(", ")

                        console.log(`Suggestions for '${commandResult.wordUsed}': ${suggestions}\n`)
                        break;
                    }
                    break
                case "find":
                    if(commandResult.data === true){
                        console.log(`✓  '${commandResult.wordUsed}' exists in dictionary\n`)
                    }
                    else{
                        console.log(`✗  '${commandResult.wordUsed}' not found in dictionary\n`)
                    }
                    break;

                case "use":
                    if (commandResult.data === false) {
                        console.log(`✗ '${commandResult.wordUsed}' not found in dictionary\n`)
                    }
                    else {
                        console.log(`✓ Incremented usage for '${commandResult.wordUsed}' (now ${commandResult.data.frequency}) \n`)
                    }
                    break;
                case "help":
                    this.showHelp()
                    break;
                case "exit":
                    console.log("Goodbye!")
            }
        }
    }
}
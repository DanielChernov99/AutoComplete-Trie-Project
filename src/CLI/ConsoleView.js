export default class ConsoleView{
    constructor(){

    }

    showWelcome(){
        console.log("=== AutoComplete Trie Console ===")
        console.log("Type 'help' for commands\n")
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
}
import AutoCompleteTrie from "../AutoCompleteTrie.js"
import AutoCompleteController from "../AutoCompleteController.js"
import ConsoleView from "./ConsoleView.js"
import promptSync from "prompt-sync"


let running = true
const trieController = new AutoCompleteController()
const cliView = new ConsoleView()
const prompt = promptSync()


cliView.showWelcome()

while(running){
    let userInput = prompt("> ")
    const commandResult = trieController.handleCommand(userInput)
    if(commandResult.commandType ==="exit"){
        running = false
    }
    cliView.showResult(commandResult)
    
}